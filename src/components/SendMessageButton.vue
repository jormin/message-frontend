<template>
    <el-button type="primary" @click="sendMessage()" icon="el-icon-plus">发布留言</el-button>
</template>


<script>
    export default {
        methods: {
            sendMessage() {
                this.$router.push('/sendMessage');
            }
        }
    }
</script>