<template>
    <b-form>
        <div class="card">
            <b-card
                    title=""
                    :img-src="this.image"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style=""
                    class="mb-2"
            >
                <b-card-text v-if="detections">
                    <div>
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
                <b-card-text v-if="loading">
                    <img src="../assets/preloader.gif" alt="">
                </b-card-text>
                <b-card-text v-if="withoutFace">
                    <p><b>НЕ УДАЛОСЬ ОПРЕДЕЛИТЬ ЛИЦО 😓</b></p>
                </b-card-text>
            </b-card>
        </div>
    </b-form>
</template>

<script>
    import PictureInput from 'vue-picture-input'
    import { requestsMixin } from "../mixins/api.js";
    import * as faceapi from "face-api.js";
    const WEIGHTS_URL = "http://localhost:3002/static/models";

    export default {
        name: 'imageCard',
        mixins: [requestsMixin],
        data () {
            return {
                loading: true,
                currentImageId: null,
                image: '',
                detections: null,
                withoutFace: false,
            }
        },
        components: {
            PictureInput
        },
        async beforeMount() {
            await faceapi.loadTinyFaceDetectorModel(WEIGHTS_URL);
            await faceapi.loadFaceLandmarkTinyModel(WEIGHTS_URL);
            await faceapi.loadFaceLandmarkModel(WEIGHTS_URL);
            await faceapi.loadFaceRecognitionModel(WEIGHTS_URL);
            await faceapi.loadFaceExpressionModel(WEIGHTS_URL);
            await faceapi.loadAgeGenderModel(WEIGHTS_URL);
            await faceapi.loadFaceDetectionModel(WEIGHTS_URL);
            const {data} = await this.getImage(this.$route.params.id);
            this.image = data.data.image;
            if (data.data.params.age) {
                this.detections = data.data.params;
            } else {
                this.withoutFace = true;
            }
            this.loading = false;
        },
        methods: {
            async detectFace() {
                if (!this.image) {
                    console.log('Image not found');
                    return;
                }
                const input = this.$refs['photo'];
                const options = new faceapi.TinyFaceDetectorOptions({
                    inputSize: 128,
                    scoreThreshold: 0.3
                });
                const detections = await faceapi
                    .detectAllFaces(input, options)
                    .withFaceLandmarks()
                    .withFaceExpressions()
                    .withAgeAndGender()
                    .withFaceDescriptors();
                this.detections = detections[0];
                this.withFace = !!detections.length;
                if (this.withFace) {
                    const data = {
                        id: this.currentImageId,
                        params: this.detections,
                    };
                    this.editImage(data);
                }
            },
            async onChange (image) {
                if (image) {
                    this.image = image;
                    const data = {
                        image,
                        ownerId: 1,
                        params: {},
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
