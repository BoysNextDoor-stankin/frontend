<template>
    <b-form>
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
        <b-button variant="primary" @click="test()">Определить лицо 😺</b-button>
    </b-form>
</template>

<script>
    import PictureInput from 'vue-picture-input'
    import { requestsMixin } from "../mixins/api.js";

    export default {
        name: 'app',
        mixins: [requestsMixin],
        data () {
            return {
            }
        },
        components: {
            PictureInput
        },
        methods: {
            // @todo отдельная загрузка файлов!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ПОКА НЕ РАБОТАЕТ
            async test() {
                const {data} = await this.getImage(2);
                this.image = data.data.image;
                console.log(this.image);
                this.$refs.pictureInput.file = this.image;
                this.onChange(this.image);
                console.log('clicked');
            },
            onChange (image) {
                if (image) {
                    this.image = image;
                    const data = {
                        image,
                        ownerId: 1,
                        params: {},
                    };
                    this.addImage(data);
                } else {
                    console.log('FileReader API not supported: use the <form>, Luke!');
                }
            }
        }
    }
</script>
