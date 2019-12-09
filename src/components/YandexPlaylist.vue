<template>
    <div>
        <div v-if="emotion">
            <h2 style="text-align: center">С такими эмоциями вам может подойти: </h2>
            <div v-if="emotion === 'sad'">
                <iframe frameborder="0" style="border:none;width:50%;height:450px;position:" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/music-blog/1563">Слушайте <a href='https://music.yandex.ru/users/music-blog/playlists/1563'>Для созерцания бренного мира</a> — <a href='https://music.yandex.ru/users/music-blog'>Яндекс.Музыка</a> на Яндекс.Музыке</iframe>
                <iframe frameborder="0" style="border:none;width:50%;height:450px;" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/that-feeling/1005">Слушайте <a href='https://music.yandex.ru/users/that-feeling/playlists/1005'>Приуныл</a> — <a href='https://music.yandex.ru/users/that-feeling'>То чувство, когда...</a> на Яндекс.Музыке</iframe>
            </div>
            <div v-if="emotion === 'neutral'">
                <iframe frameborder="0" style="border:none;width:100%;height:450px;" width="100%" height="450" src="https://music.yandex.ru/iframe/#playlist/music-blog/2054">Слушайте <a href='https://music.yandex.ru/users/music-blog/playlists/2054'>Электроника для офиса</a> — <a href='https://music.yandex.ru/users/music-blog'>Яндекс.Музыка</a> на Яндекс.Музыке</iframe>
            </div>
            <div v-if="emotion === 'happy'">
                <iframe frameborder="0" style="border:none;width:50%;height:450px;" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/ya.playlist/1262">Слушайте <a href='https://music.yandex.ru/users/ya.playlist/playlists/1262'>Радостная музыка</a> — <a href='https://music.yandex.ru/users/ya.playlist'>Музыкальные подборки</a> на Яндекс.Музыке</iframe>
                <iframe frameborder="0" style="border:none;width:50%;height:450px;" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/music-blog/1410">Слушайте <a href='https://music.yandex.ru/users/music-blog/playlists/1410'>Песни, которым хочется подпевать</a> — <a href='https://music.yandex.ru/users/music-blog'>Яндекс.Музыка</a> на Яндекс.Музыке</iframe>
            </div>
            <div v-if="emotion === 'angry'">
                <iframe frameborder="0" style="border:none;width:50%;height:450px;" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/music-blog/2063">Слушайте <a href='https://music.yandex.ru/users/music-blog/playlists/2063'>Легенды метала</a> — <a href='https://music.yandex.ru/users/music-blog'>Яндекс.Музыка</a> на Яндекс.Музыке</iframe>
                <iframe frameborder="0" style="border:none;width:50%;height:450px;" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/music-blog/2059">Слушайте <a href='https://music.yandex.ru/users/music-blog/playlists/2059'>Тяжёлые кавер-версии известных песен</a> — <a href='https://music.yandex.ru/users/music-blog'>Яндекс.Музыка</a> на Яндекс.Музыке</iframe>
            </div>
            <div v-if="emotion === 'fearful'">
                <iframe frameborder="0" style="border:none;width:50%;height:450px;" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/vanillakidsmusic/1000">Слушайте <a href='https://music.yandex.ru/users/vanillakidsmusic/playlists/1000'>Слушать из-под одеялка</a> — <a href='https://music.yandex.ru/users/vanillakidsmusic'>Мятный сахарок</a> на Яндекс.Музыке</iframe>
                <iframe frameborder="0" style="border:none;width:50%;height:450px;" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/music.partners/1867">Слушайте <a href='https://music.yandex.ru/users/music.partners/playlists/1867'>Мягкая и успокаивающая музыка</a> — <a href='https://music.yandex.ru/users/music.partners'>Музыкальная редакция</a> на Яндекс.Музыке</iframe>
            </div>
            <div v-if="emotion === 'disgusted'">
                <iframe frameborder="0" style="border:none;width:50%;height:450px;" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/music-blog/1436">Слушайте <a href='https://music.yandex.ru/users/music-blog/playlists/1436'>Песни, от которых тепло на душе</a> — <a href='https://music.yandex.ru/users/music-blog'>Яндекс.Музыка</a> на Яндекс.Музыке</iframe>
                <iframe frameborder="0" style="border:none;width:50%;height:450px;" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/music.partners/1887">Слушайте <a href='https://music.yandex.ru/users/music.partners/playlists/1887'>Песни для лёгкого начала года</a> — <a href='https://music.yandex.ru/users/music.partners'>Музыкальная редакция</a> на Яндекс.Музыке</iframe>
            </div>
            <div v-if="emotion === 'surprised'">
                <iframe frameborder="0" style="border:none;width:50%;height:450px;" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/music-blog/1777">Слушайте <a href='https://music.yandex.ru/users/music-blog/playlists/1777'>Рассвет</a> — <a href='https://music.yandex.ru/users/music-blog'>Яндекс.Музыка</a> на Яндекс.Музыке</iframe>
                <iframe frameborder="0" style="border:none;width:50%;height:450px;" width="50%" height="450" src="https://music.yandex.ru/iframe/#playlist/music.partners/1737">Слушайте <a href='https://music.yandex.ru/users/music.partners/playlists/1737'>Песни для дорожного приключения</a> — <a href='https://music.yandex.ru/users/music.partners'>Музыкальная редакция</a> на Яндекс.Музыке</iframe>
            </div>
        </div>
        <div v-if="!emotion">
            <h2 style="text-align: center">Если не удалось определить эмоцию, то не расстраивайтесь и послушайте хиты навека: </h2>
            <div>
                <iframe frameborder="0" style="border:none;width:100%;height:450px;" width="100%" height="450" src="https://music.yandex.ru/iframe/#playlist/ya.playlist/1250">Слушайте <a href='https://music.yandex.ru/users/ya.playlist/playlists/1250'>Вечные хиты</a> — <a href='https://music.yandex.ru/users/ya.playlist'>Музыкальные подборки</a> на Яндекс.Музыке</iframe>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "yandex-playlist",
        props: {
            emotion: String,
        },
    }
</script>

<style scoped>

</style>
