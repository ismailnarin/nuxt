
  <template>
  <div class="container pb50" v-if="fetchedBlogDetails">
    <div class="row">
      <div class="col-md-9 mb40">
        <article>
          <img :src="fetchedBlogDetails.image" alt="" class="img-fluid mb30" />
          <div class="post-content mt-2">
            <h3>{{ fetchedBlogDetails.title }}</h3>
            <ul class="post-meta list-inline">
              <li class="list-inline-item">
                <i class="fa fa-user-circle-o"></i> İsmail Narin
              </li>
              <li class="list-inline-item">
                <i class="fa fa-calendar-o"></i> Güncelleme ->
                {{ fetchedBlogDetails.updatedAt }}
              </li>
            </ul>
            <p>
              {{ fetchedBlogDetails.content }}
            </p>
            <hr class="mb40" />
            <h4 class="mb40 text-uppercase font500 mb-3">Yorumlar</h4>
            <commentList />
            <hr class="mb40" />
            <h4 class="mb40 text-uppercase font500">yorum ekle</h4>
            <addComment />
          </div>
        </article>
        <!-- post article-->
      </div>
    </div>
  </div>
  <div v-else>Lütfen Görüntülemek istediğiniz Blog konusunu seçiniz</div>
</template>
  <script>
import commentList from './commentList.vue'
import addComment from './addComment.vue'

export default {
  computed: {
    fetchedBlogDetails() {
      return this.$store.getters.getBlogDetail
    },
  },
  components: {
    commentList,
    addComment,
  },
}
</script>
  
  <style scoped>
.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
  