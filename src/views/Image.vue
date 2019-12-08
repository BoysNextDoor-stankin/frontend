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
                <b-card-text v-if="this.comment">
                    <p><b>Комментарий: </b>{{comment}}</p>
                </b-card-text>
                <b-card-text v-if="detections">
                    <div>
                        <b>Результат анализа лица:</b>
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
                comment: null,
            }
        },
        components: {
            PictureInput
        },
        async beforeMount() {
            const {data} = await this.getImage(this.$route.params.id);
            this.image = data.data.image;
            this.comment = data.data.comment;
            if (data.data.params.age) {
                this.detections = data.data.params;
            } else {
                this.withoutFace = true;
            }
            this.loading = false;
        },
        methods: {
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
