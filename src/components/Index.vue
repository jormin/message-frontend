<template>
    <el-tabs v-model="activeTab" @tab-click="handleClick" stretch>
        <el-tab-pane label="公共留言" name="common">
            <SendMessageButton></SendMessageButton>
            <MessageList ref="commonMessages" v-bind:messages="commonMessages" v-show="commonMessages.items.length > 0" @more="getMessages"></MessageList>
        </el-tab-pane>
        <el-tab-pane label="我发送的" name="sender">
            <SendMessageButton></SendMessageButton>
            <MessageList ref="senderMessages" v-bind:messages="senderMessages" v-show="senderMessages.items.length > 0" @more="getMessages"></MessageList>
        </el-tab-pane>
        <el-tab-pane label="我接收的" name="receiver">
            <SendMessageButton></SendMessageButton>
            <MessageList ref="receiverMessages" v-bind:messages="receiverMessages" v-show="receiverMessages.items.length > 0" @more="getMessages"></MessageList>
        </el-tab-pane>
        <el-tab-pane label="个人中心" name="ucenter">
            <UserInfo></UserInfo>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import UserInfo from './UserInfo.vue'
    import MessageList from './MessageList.vue'
    import SendMessageButton from './SendMessageButton.vue';
    export default {
        components: {
            UserInfo,
            MessageList,
            SendMessageButton
        },
        data() {
            return {
                activeTab: 'common',
                commonMessages: {
                    items: [],
                    currentPage: 0,
                    totalPage: 0,
                    total: 0
                },
                senderMessages: {
                    items: [],
                    currentPage: 0,
                    totalPage: 0,
                    total: 0
                },
                receiverMessages: {
                    items: [],
                    currentPage: 0,
                    totalPage: 0,
                    total: 0
                }
            };
        },
        methods: {
            handleClick(tab) {
                if(tab.name !== 'ucenter'){
                    let messagesVar = this.activeTab+"Messages";
                    if(this[messagesVar].items.length == 0){
                        this.getMessages();
                    }
                }
            },
            getMessages(){
                let apiUrl = '/message/'+this.activeTab+'-messages';
                let messagesVar = this.activeTab+"Messages";
                let _this = this;
                this.$get(apiUrl, {page:this[messagesVar].currentPage})
                    .then(response => {
                        if(response.items.length > 0){
                            response.items.map(function(item,index){
                                _this[messagesVar].items.push(item);
                            });
                            _this[messagesVar].currentPage += 1;
                        }
                    });
            }
        },
        mounted: function () {
            this.getMessages();
        }

    };
</script>