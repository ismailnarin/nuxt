<template>
  <div class="container d-flex justify-content-center flex-column">
    <sideMenu />
    <b-button class="btn btn-primary mb-4 mt-4" v-b-toggle.sidebar-no-header>
      Son Yazılanlar
    </b-button>
    <div>
      <blogDetail />
    </div>
  </div>
</template>

<script>
import blogDetail from '../components/blogDetail.vue'
import sideMenu from '../components/sideMenu.vue'
export default {
  components: {
    blogDetail,
    sideMenu,
  },
}
</script>
