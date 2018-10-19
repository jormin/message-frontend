<template>
    <el-row>
        <Comment v-for="comment of comments.items" v-bind:key="comment.id" v-bind:comment="comment"></Comment>
        <div class="more" @click="loadMore" v-show="(comments.currentPage+1) <= comments.totalPage">
            <span> -- 点击加载更多 --</span>
        </div>
    </el-row>
</template>


<script>
    import Comment from './Comment';
    export default {
        components: {
            Comment
        },
        props: ['comments'],
        methods: {
            loadMore: function () {
                this.$emit('more')
            }
        }
    }
</script>
<style scoped>
    #registerWrap{
        margin-top: 60px;
        text-align: left;
    }
    .more{
        text-align: center;
        margin: 20px;
    }
</style>