<template>
    <div>
        <b-form>
            <div v-if="!detected">
            <picture-input
                        ref="pictureInput"
                        @change="onChange"
                        width="600"
                        height="600"
                        margin="16"
                        accept="image/jpeg,image/png"
                        size="10"
                        buttonClass="btn"
                        :customStrings="{
                upload: '<h1>Bummer!</h1>',
                drag: 'Поместите сюда фотокарточку с лицом'
              }">
                </picture-input>
                <img ref="photo" v-if="this.image" style="display: none" :src="this.image" alt="">
                <b-button style="margin-top: 20px" block variant="primary" @click="detectFace">Определить лицо 😺</b-button>
            </div>
            <div class="card">
                <b-card
                        title=""
                        :img-src="this.image"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="width: 30%;"
                        class="mb-2"
                        v-if="detected"
                >
                    <b-card-text>
                        <b-input-group prepend="Комментарий" class="mt-3">
                            <b-form-input v-model="comment"></b-form-input>
                                <b-button variant="outline-success" @click="saveComment">Сохранить</b-button>
                        </b-input-group>
                    </b-card-text>

                    <b-card-text v-if="withFace">
                        <div v-if="detections">
                            <b-list-group horizontal="" class="detection">
                                <b-list-group-item>Возраст: {{detections.age.toFixed(0)}}</b-list-group-item>
                                <b-list-group-item>Пол: {{translateGender(detections.gender)}}</b-list-group-item>
                                <b-list-group-item>Вероятность верного определения пола: {{(detections.genderProbability*100).toFixed(2)}}%</b-list-group-item>
                            </b-list-group>
                            <b-list-group>
                                    <b-list-group-item>
                                        Выражения лица:
                                        <b-list-group-item
                                                v-for="key of Object.keys(detections.expressions)"
                                                :key="key"
                                        >{{translateExpressions(key)}}: {{(detections.expressions[key]*100).toFixed(2)}}%</b-list-group-item>
                                    </b-list-group-item>
                                </b-list-group>
                        </div>
                    </b-card-text>
                    <b-card-text v-if="!withFace">
                        <p><b>НЕ УДАЛОСЬ ОПРЕДЕЛИТЬ ЛИЦО 😓</b></p>
                    </b-card-text>
                    <b-button @click="$router.push(`/image/${currentImageId}/feedback`)" variant="primary">Не согласны с анализом?</b-button>
                    <b-button @click="newImageInit" variant="warning">Загрузить новое изображение</b-button>
                </b-card>
            </div>
        </b-form>
        <yandex-playlist v-if="emotion !== null" v-bind:emotion="emotion"/>
    </div>
</template>

<script>
    import PictureInput from 'vue-picture-input'
    import { requestsMixin } from "../mixins/api.js";
    import YandexPlaylist from "./YandexPlaylist";
    import * as faceapi from "face-api.js";
    const WEIGHTS_URL = process.env.VUE_APP_WEIGHTS_URL || "http://localhost:3002/static/models";

    export default {
        name: 'app',
        mixins: [requestsMixin],
        data () {
            return {
                currentImageId: null,
                detected: false,
                image: '',
                detections: {},
                comment: '',
                withFace: false,
                emotion: null,
            }
        },
        components: {
            PictureInput,
            YandexPlaylist,
        },
        async beforeMount() {
            await faceapi.loadTinyFaceDetectorModel(WEIGHTS_URL);
            await faceapi.loadFaceLandmarkTinyModel(WEIGHTS_URL);
            await faceapi.loadFaceLandmarkModel(WEIGHTS_URL);
            await faceapi.loadFaceRecognitionModel(WEIGHTS_URL);
            await faceapi.loadFaceExpressionModel(WEIGHTS_URL);
            await faceapi.loadAgeGenderModel(WEIGHTS_URL);
            await faceapi.loadFaceDetectionModel(WEIGHTS_URL);
        },
        methods: {
            saveComment() {
                const data = {
                    id: this.currentImageId,
                    comment: this.comment,
                };
                if (this.detections) {
                    data.params = this.detections;
                } else {
                    data.params = {};
                }
                this.editImage(data);
                this.$notify({
                    group: 'notify',
                    type: 'success',
                    text: '<b>Комментарий сохранен!</b>',
                });
            },
            newImageInit() {
                this.detected = false;
                this.detections = {};
                this.image = '';
                this.comment = null;
                this.currentImageId = null;
                this.withFace = false;
                this.emotion = null;
            },
            async detectFace() {
                const self = this;
                if (!self.image) {
                    console.log('Image not found');
                    this.$notify({
                        group: 'notify',
                        type: 'warn',
                        title: 'Изображение не найдено',
                    });
                    return;
                }
                const input = self.$refs['photo'];
                const options = new faceapi.TinyFaceDetectorOptions({
                    inputSize: 256,
                    scoreThreshold: 0.3
                });
                const detections = await faceapi
                    .detectAllFaces(input, options)
                    .withFaceLandmarks()
                    .withFaceExpressions()
                    .withAgeAndGender()
                    .withFaceDescriptors();
                self.detections = detections[0];
                self.detected = true;
                self.withFace = !!detections.length;
                if (this.withFace) {
                    const data = {
                        id: self.currentImageId,
                        params: self.detections,
                        comment: self.comment,
                    };
                    self.editImage(data);
                    let tempEmotion = '';
                    let tempEmotionValue = -1;
                    const {expressions} = self.detections;
                    for (const emotion in expressions) {
                        if (expressions[emotion] > tempEmotionValue) {
                            tempEmotion = emotion;
                            tempEmotionValue = expressions[emotion];
                        }
                    }
                    self.emotion = tempEmotion;
                } else {
                    self.emotion = '';
                }
            },
            async onChange (image) {
                if (image) {
                    this.image = image;
                    const data = {
                        image,
                        ownerId: 1,
                        params: {},
                        comment: this.comment,
                    };
                    const result = await this.addImage(data);
                    this.currentImageId = result.data.data.imageId;
                } else {
                    console.log('FileReader API not supported: use the <form>, Luke!');
                }
            },
            translateGender(gender) {
                const genders = {
                    'male': 'мужской',
                    'female': 'женский',
                };
                return genders[gender] || gender;
            },
            translateExpressions(expression) {
                const expressions = {
                    'neutral': 'Нейтральное',
                    'happy': 'Счастливое',
                    'sad': 'Грустное',
                    'angry': 'Злое',
                    'fearful': 'Напуганное',
                    'disgusted': 'Отвращающее',
                    'surprised': 'Удивленное',
                };
                return expressions[expression] || expression;
            },
        }
    }
</script>
<style scoped>
    .card {
        float: none; /* Added */
        margin: 0 auto 10px;
    }
</style>
