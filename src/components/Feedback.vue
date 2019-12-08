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
                            <b-list-group-item>Возраст: <b-input type="text" :value="detections.age.toFixed(0)"></b-input></b-list-group-item>
                            <b-list-group-item>
                                <b-form-group label="Пол">
                                    <b-form-radio v-model="gender" name="radios" value="male">Мужской</b-form-radio>
                                    <b-form-radio v-model="gender" name="radios" value="female">Женский</b-form-radio>
                                </b-form-group>
                            </b-list-group-item>
                        </b-list-group>
                        <b-list-group>
                            <b-list-group-item>
                                Выражения лица:
                                <b-list-group-item
                                        v-for="key of Object.keys(detections.expressions)"
                                        :key="key"
                                >{{translateExpressions(key)}}:
                                    <b-input-group append="%">
                                        <b-input type="number" min="0" max="100" :value="(detections.expressions[key]*100).toFixed(2)">%</b-input>
                                    </b-input-group>
                                </b-list-group-item>
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </b-card-text>
                <b-button variant="success" @click="createFeedback">Предложить свой вариант</b-button>


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
    import { requestsMixin } from "../mixins/api.js";

    export default {
        name: 'feedback',
        mixins: [requestsMixin],
        data () {
            return {
                gender: null,
                loading: false,
                currentImageId: null,
                image: '',
                detections: {
                    age: 1,
                    gender: 'male',
                    genderProbability: 69,
                    expressions: {
                        neutral: 0,
                        happy: 0,
                        sad: 1,
                        angry: 0,
                        fearful: 0,
                        disgusted: 0,
                        surprised: 0,
                    }

                },
                withoutFace: false,
                comment: null,
            }
        },
        async beforeMount() {
            const {data} = await this.getImage(this.$route.params.id);
            this.image = data.data.image;
            this.comment = data.data.comment;
        },
        methods: {
            createFeedback() {
                this.$notify({
                    group: 'notify',
                    title: 'Спасибо!',
                    text: 'Ваше исправление будет рассмотрено!'
                });
                this.$router.push('/')
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
