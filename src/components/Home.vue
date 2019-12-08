<template>
    <div>
        <b-card-group deck>
            <div v-for="img in images">
                <a style="margin: 20px" @click="goToImage(img.imageId)">
                    <img class="item" :src="img.image" alt="zzzz">
                </a>
            </div>
        </b-card-group>
        <b-card-text v-if="loading">
            <img src="../assets/preloader.gif" alt="">
        </b-card-text>
    </div>
</template>
<script>
    import { requestsMixin } from "../mixins/api.js";
    export default {
        name: "Home",
        mixins: [requestsMixin],
        computed: {
        },
        async beforeMount() {
            const {data} = await this.getImages();
            this.loading = false;
            this.images = data.data;
        },
        data() {
            return {
                loading: true,
                form: {},
                images: null,
                detections: {},
            };
        },
        methods: {
            goToImage(id) {
                this.$router.push(`/image/${id}`);
            },
        }
    };
</script>
<style scoped>
    img {
        max-width: 100%;
        height: auto;
    }
    .item {
        width: 300px;
        min-height: 400px;
        max-height: auto;
        float: left;
        margin: 3px;
        padding: 3px;
    }
</style>
