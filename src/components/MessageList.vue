<template>
    <el-row>
        <SimpleMessage v-for="message of messages.items" v-bind:key="message.id" v-bind:message="message"></SimpleMessage>
        <div class="more" @click="loadMore" v-show="(messages.currentPage+1) <= messages.totalPage">
            <span> -- 点击加载更多 --</span>
        </div>
    </el-row>
</template>


<script>
    import SimpleMessage from './SimpleMessage';
    export default {
        components: {
            SimpleMessage
        },
        props: ['messages'],
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