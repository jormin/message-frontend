<template>
    <div class="box-card message-card">
        <div id="messageWrap">
            <div slot="header" class="header clearfix">
                <span class="title">{{ message.title }}</span>
                <div class="bottom clearfix">
                    <span class="sender">{{ message.sender }}</span>
                    <span class="sender" v-show="message.receiver != null"><i class="el-icon-d-arrow-right"></i></span>
                    <span class="receiver">{{ message.receiver }}</span>
                    <time class="time" style="float: right">{{ message.created_at }}</time>
                </div>
            </div>
            <div class="text item">
                <img :src="message.attachment" class="image" v-show="message.attachment !== null">
                <span class="content">
                {{ message.content }}
            </span>
            </div>
        </div>
        <div id="commentWrap">
            <div id="commentBtnWrap">
                <el-button type="primary" round @click="sendComment">写评论</el-button>
            </div>
            <div id="commentListWrap">
                <CommentList ref="comments" v-bind:comments="comments" v-show="comments.items.length > 0" @more="getComments"></CommentList>
            </div>
        </div>
    </div>
</template>

<script>
    import CommentList from './CommentList';
    export default {
        components: {
            CommentList
        },
        data() {
          return {
              message: {},
              comments: {
                  items: [],
                  currentPage: 0,
                  totalPage: 0,
                  total: 0
              },
          }
        },
        methods: {
            getComments(){
                let _this = this;
                this.$get('/message/comments', {id:this.$route.params.id})
                    .then(response => {
                        if(response.items.length > 0){
                            response.items.map(function(item,index){
                                _this.comments.items.push(item);
                            });
                            _this.comments.currentPage += 1;
                        }
                    });
            },
            sendComment(){
                this.$router.push('/sendComment/'+this.$route.params.id);
            }
        },
        mounted: function () {
            this.$get('/message/detail', {id:this.$route.params.id})
                .then(response => {
                    if(response.code == 1){
                        this.message = response.message;
                    }
                });
            this.getComments()
        }
    }
</script>

<style scoped>
    .header{
        margin-bottom: 30px;
    }
    .title{
        color: #000;
        font-size: 18px;
    }
    .message-card{
        text-align: left !important;
        width: auto !important;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
    .time,.sender,.receiver {
        font-size: 13px;
        color: #999;
        margin-right: 20px;
    }
    .content{
        color: #000;
        font-size: 16px;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .image {
        width: 100%;
        display: block;
        margin-bottom: 20px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    #messageWrap{
        margin-bottom: 50px;
    }
    #commentWrap{
        background-color: #eeeeee;
        margin: -20px;
        min-height: 250px;
    }
    #commentBtnWrap{
        text-align: center;
        margin: 20px;
        padding-top: 40px;
        padding-bottom: 20px;
    }
</style>