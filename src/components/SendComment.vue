<template>
    <div class="box-card message-card">
        <div id="messageWrap">
            <div slot="header" class="header clearfix">
                <span class="title">{{ message.title }}</span>
            </div>
            <div class="text item">
                <el-form :model="sendCommentForm" :rules="rules" ref="sendCommentForm" class="demo-ruleForm">
                    <el-form-item prop="comment">
                        <el-input :rows="6" v-model="sendCommentForm.comment" placeholder="请输入评论内容" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center">
                        <el-button type="primary" @click="sendComment('sendCommentForm')" id="commentBtn">评论</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                message: {},
                sendCommentForm: {
                    comment: '',
                    id: this.$route.params.id
                },
                receiverOptions: [],
                rules: {
                    comment: [
                        { required: true, message: '请输入内容', trigger: 'blur' },
                        { min:1, max:500, message: '请输入1-140位字符'},
                    ]
                }
            };
        },
        methods: {
            sendComment(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = this.sendCommentForm;
                        this.$post('/message/send-comment', params)
                            .then(response => {
                                let _this = this;
                                this.$message({
                                    message: response.message,
                                    type: 'success'
                                });
                                _this.$router.push('/message/'+this.$route.params.id);
                            });
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted: function () {
            this.$get('/message/detail', {id:this.$route.params.id})
                .then(response => {
                    if(response.code == 1){
                        this.message = response.message;
                    }
                });
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
    }    .clearfix:before,
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
    #commentBtn{
        width: 100%;
    }
</style>