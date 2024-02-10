<template>
  <div>
    <div class="alert alert-primary" role="alert" v-if="replyStatus">
      Yoruma Cevap Veriyorsunuz

      <div class="p-3">{{ allReply.parentComment.comment }}</div>
    </div>
    <div class="form-group">
      <label>isim</label>
      <input
        v-model="comment.firstname"
        type="text"
        class="form-control"
        placeholder="İsmail"
      />
    </div>
    <div class="form-group">
      <label>Soyisim</label>
      <input
        v-model="comment.lastname"
        type="text"
        class="form-control"
        placeholder="Narin"
      />
    </div>
    <div class="form-group">
      <label>Comment</label>
      <textarea
        v-model="comment.comment"
        class="form-control"
        rows="5"
        placeholder="Yorum"
      ></textarea>
    </div>
    <div class="clearfix float-right">
      <button
        @click="submitComment"
        type="button"
        class="btn btn-primary btn-lg"
      >
        Gönder
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: {
        id: Date.now(),
        firstname: '',
        lastname: '',
        comment: '',
        postId: '',
      },
    }
  },
  computed: {
    replyStatus() {
      return this.$store.getters.getReply
    },
    allReply() {
      return this.$store.getters.getAllReply
    },
  },
  methods: {
    submitComment() {
      this.comment.postId = this.$store.getters.getBlogDetail.id
      if (!this.replyStatus) {
        this.$store.dispatch('addComment', this.comment)
      } else {
        this.$store.dispatch('addReplyComment', this.comment)
      }
      console.log(this.comment)
      this.comment = {
        id: Date.now(),
        firstname: '',
        lastname: '',
        comment: '',
        postId: '',
      }
    },
  },
}
</script>