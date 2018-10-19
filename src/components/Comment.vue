<template>
    <div class="box-card comment-card">
        <div class="comment-header">
            <span class="sender">{{ comment.user }}</span>
            <time class="time" style="float: right">{{ comment.created_at }}</time>
        </div>
        <span class="content">{{ comment.comment }}</span>
    </div>
</template>

<script>
    export default {
        props: ['comment']
    }
</script>

<style scoped>
    .comment-card{
        text-align: left !important;
        width: auto !important;
        padding: 0 20px;
        font-size: 14px;
        margin-bottom: 30px;
    }
    .comment-header{
        margin-bottom: 5px;
    }
    .time,.sender,.receiver {
        color: #8C8B8B;
    }
    .content{
        font-size: 15px;
        color: #000;
    }
</style>