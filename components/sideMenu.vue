<template>
  <b-sidebar id="sidebar-no-header" shadow title="Son Yazılanlar" visible>
    <div v-for="post in fetchedBlogs" :key="post.id" class="mb-3">
      <b-card
        :title="post.title"
        :img-src="post.thumbnail"
        img-alt="Card image"
        img-top
      >
        <b-card-text class="clamp">{{ post.content }}</b-card-text>
        <p class="text-muted">Tarih: {{ post.updatedAt }}</p>
        <b-button variant="primary" @click="showDetail(post.id)"
          >Detaylar</b-button
        >
      </b-card>
    </div>
  </b-sidebar>
</template>
<script>
export default {
  methods: {
    showDetail(id) {
      this.$store.dispatch('fetchBlogDetail', id)
    },
  },
  computed: {
    fetchedBlogs() {
      return this.$store.getters.getBlogs
    },
  },
}
</script>

<style scoped>
.clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
}
</style>