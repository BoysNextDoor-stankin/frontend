<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Face Recognising</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/add"><b>Добавить изображение</b></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal ref="modal" title="Внимание!">
      <p class="my-4">Добро пожаловать на демо-версию проекта <b>EMOTION RECOGNISING</b></p>
      <p class="my-4">В данный момент ведутся работы по дополнению функциональности, в связи с этим возможны перебои в работе, в частности может не работать сохранение изображений на сервер</p>
    </b-modal>
    <router-view />
    <notifications group="notify" position="top left"/>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        path: this.$route && this.$route.path
      };
    },
    mounted() {
      this.$refs.modal.show();
    },
    watch: {
      $route(route) {
        this.path = route.path;
      }
    }
  };
</script>
<style lang="scss">
  .page {
    padding: 20px;
    margin: 0 auto;
  }
  button,
  .btn.btn-primary {
    margin-right: 10px !important;
  }
  .button-toolbar {
    margin-bottom: 10px;
  }
</style>
