<template>
    <b-card-group deck>
        <div v-for="img in images">
            <a style="margin: 20px" @click="goToImage(img.imageId)">
                <img class="item" :src="img.image" alt="zzzz">
            </a>
        </div>
    </b-card-group>
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
            this.images = data.data;
        },
        data() {
            return {
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
