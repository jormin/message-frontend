<template>
    <el-card class="box-card message-card">
        <div @click="messageDetail">
            <span class="title">{{ message.title }}</span>
            <div class="bottom clearfix">
                <div class="bottom clearfix">
                    <span class="sender">{{ message.sender }}</span>
                    <span class="sender" v-show="message.receiver != null"><i class="el-icon-d-arrow-right"></i></span>
                    <span class="receiver">{{ message.receiver }}</span>
                    <time class="time" style="float: right">{{ message.created_at }}</time>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        props: ['message'],
        methods: {
            messageDetail(id) {
                this.$router.push('/message/'+this.message.id);
            }
        }
    }
</script>

<style scoped>
    .title{
        color: #000;
        font-size: 16px;
    }
    .message-card{
        text-align: left !important;
        margin-top: 20px;
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
        color: #999;
        font-size: 14px;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
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
</style>