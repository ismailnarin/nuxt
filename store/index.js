import Vuex from "vuex";
import Vue from 'vue';
const createStore=()=>{
    return new Vuex.Store({
        state:{
            blogs:null,
            blogDetail:null,
            comments:null,   
            users:{},  
            blogComment:null,
            reply:{
                status:false,
                parentComment:'',
                replyComment: {
                    id:'',
                    firstname:'',
                    lastname:'',
                    comment:''
                }
            }
        },
        mutations:
        {
            RESET_REPLY(state){
                state.reply={
                    status:false,
                    parentComment:'',
                    replyComment: {
                        id:'',
                        firstname:'',
                        lastname:'',
                        comment:''
                    }
                }
            },
            SET_BLOGLIST(state,blogs){
                state.blogs=blogs;
            },
            SET_BLOG_DETAIL(state,blog){
                state.blogDetail=blog;
            },
            SET_ALL_COMMENT(state,comment){
                state.comments=comment
            },
            SET_ALL_USER(state,user){
                state.users=user
            },
            SET_BLOG_COMMENT(state) {
                state.blogComment = state.comments.filter(comment => comment.postId == state.blogDetail.id);
            },
            ADD_COMMENT(state,comment){
                state.blogComment.push(comment)
            },
            ADD_USER(state,comment){
                const user = {
                    firstname: comment.firstname,
                    lastname: comment.lastname,
                    id: comment.id
                };
                state.users.push(user)
            },
            CHANGE_REPLY_STATUS(state){
                state.reply.status=!state.reply.status
            },
            ADD_PARENT_COMMENT(state,comment){
                state.reply.parentComment=comment
           
            },
            ADD_REPLY_COMMENT(state,comment){
            
            state.reply.replyComment.id=comment.id
            state.reply.replyComment.firstname=comment.firstname
            state.reply.replyComment.lastname=comment.lastname
            state.reply.replyComment.comment=comment.comment
            state.blogComment.forEach(comment => {
                if (comment.id === state.reply.parentComment.id) {
                    if (!comment.subcomment) {
                        // Eğer alt yorum dizisi henüz tanımlanmamışsa, Vue.set ile tanımlıyoruz
                        Vue.set(comment, 'subcomment', []);
                    }
                    // Alt yorum dizisine yeni yanıtı ekliyoruz
                    comment.subcomment.push(Object.assign({}, state.reply.replyComment)); 
                }
            });
            
            ;}


            
        },
        actions:{
            async nuxtServerInit ({ commit }, { $axios }) {
                const blogList = await $axios.$get('https://jsonplaceholder.org/posts')
                commit('SET_BLOGLIST', blogList)
              },
            async fetchBlogDetail(context,id){
                 const blogDetail = await this.$axios.$get(`https://jsonplaceholder.org/posts/${id}`)
                 context.commit('SET_BLOG_DETAIL', blogDetail);
                 await context.dispatch('fetchAllComment');
                 context.commit('SET_BLOG_COMMENT');
                 await context.dispatch('fetchAllUser');
                 context.commit('RESET_REPLY');
            },
            async fetchAllComment({commit}){
                const allComment = await this.$axios.$get(`https://jsonplaceholder.org/comments`)
                commit('SET_ALL_COMMENT', allComment);
           },

           async fetchAllUser({commit},id){
            const users = await this.$axios.$get(`https://jsonplaceholder.org/users/`)
            commit('SET_ALL_USER', users);
           },

           addComment({commit},comment){
            commit('ADD_COMMENT',comment);
            commit('ADD_USER',comment);
           },

           changeReplyStatus({commit}){
            commit('CHANGE_REPLY_STATUS')
           },

           addParentComment({commit},comment){
            commit('ADD_PARENT_COMMENT',comment)
           },
           addReplyComment({commit},comment){
            commit('ADD_REPLY_COMMENT',comment)
            commit('ADD_USER',comment);
            commit('RESET_REPLY');
           }
        },

        getters:{
            getBlogs:state=>state.blogs,

            getBlogDetail:state=>state.blogDetail,

            getBlogComment:state=>state.blogComment,

            getUser: state => state.users,
            
            getReply:state=>state.reply.status,

            getAllReply:state=>state.reply
        }
    })

}
export default createStore