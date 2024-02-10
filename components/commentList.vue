<template>
  <div v-if="fetchedComment && fetchedComment.length > 0">
    <div
      class="media mb-4"
      v-for="(comment, index) in fetchedComment"
      :key="index"
    >
      <img
        style="width: 20%"
        src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
        class="d-flex mr-3 fa fa-user-circle-o fa-3x"
      />
      <div class="media-body">
        <h5 class="mt-0 font400 clearfix">
          <span
            class="float-right"
            style="cursor: pointer"
            @click="changeReplyStatus(comment)"
            >Reply</span
          >
          {{ getUserName(comment.id) }}
        </h5>
        {{ comment.comment }}
        <div
          class="media mt-5 ml-4 mb-4 bg-light bg-gradient p-3"
          v-for="subcomment in comment.subcomment"
          :key="subcomment.id"
        >
          <img
            style="width: 10%"
            src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
            class="d-flex mr-3 fa fa-user-circle-o fa-3x"
          />
          <div class="media-body">
            <h5 class="mt-0 font400 clearfix">
              {{ getUserName(subcomment.id) }}
            </h5>
            {{ subcomment.comment }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Henüz Yorum Eklenmemiş</div>
</template>
<script>
export default {
  methods: {
    getUserName(id) {
      console.log(id)
      let user = this.$store.getters.getUser
      if (user && Array.isArray(user)) {
        user = user.find((user) => user.id === id)
        return user ? user.firstname + ' ' + user.lastname : 'İsimsiz'
      } else {
        return []
      }
    },
    async changeReplyStatus(comment) {
      await this.$store.dispatch('changeReplyStatus')
      await this.$store.dispatch('addParentComment', comment)
    },
  },
  computed: {
    fetchedComment() {
      return this.$store.getters.getBlogComment
    },
  },
}
</script>