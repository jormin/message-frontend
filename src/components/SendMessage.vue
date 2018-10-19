<template>
    <el-row id="sendMessageWrap">
        <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple-dark">
                <el-form :model="sendMessageForm" :rules="rules" ref="sendMessageForm" :label-position="labelPosition" label-width="100px" class="demo-ruleForm">
                    <el-form-item prop="title">
                        <el-input v-model="sendMessageForm.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item prop="content">
                        <el-input v-model="sendMessageForm.content" placeholder="请输入留言内容" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item prop="path">
                        <Uploader ref="uploader"></Uploader>
                    </el-form-item>
                    <el-form-item prop="receiver_id">
                        <el-select
                            v-model="sendMessageForm.receiverID"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请输入收信人姓名"
                            :remote-method="searchUser"
                            :loading="searchUserLoading">
                            <el-option
                                    v-for="item in receiverOptions"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="sendMessage('sendMessageForm')">留言</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>


<script>
    import Uploader from './Uploader';
    export default {
        components: {
            Uploader
        },
        data() {
            return {
                labelPosition: 'top',
                codeButton: {
                    name: '发送',
                    disabled: false,
                    time: 60
                },
                sendMessageForm: {
                    title: '',
                    content: '',
                    path: '',
                    receiverID: '',
                },
                searchUserLoading: false,
                receiverOptions: [],
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min:1, max:80, message: '请输入1-80位字符'},
                    ],
                    content: [
                        { required: true, message: '请输入内容', trigger: 'blur' },
                        { min:1, max:500, message: '请输入1-500位字符'},
                    ]
                }
            };
        },
        methods: {
            sendMessage(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = this.sendMessageForm;
                        params.path = this.$refs.uploader.path;
                        this.$post('/message/send', params)
                            .then(response => {
                                let _this = this;
                                this.$message({
                                    message: response.message,
                                    type: 'success',
                                    onClose: function () {
                                        _this.$router.push('/');
                                    }
                                });
                            });
                    } else {
                        return false;
                    }
                });
            },
            searchUser(query) {
                if (query !== '') {
                    this.searchUserLoading = true;
                    setTimeout(() => {
                        this.searchUserLoading = false;
                        let _this = this;
                        this.$get('/user/search', {keyword: query})
                            .then(response => {
                                this.receiverOptions = response.users;
                            });
                    }, 200);
                }
            }
        }
    }
</script>
<style scoped>
 #sendMessageWrap{
     margin-top: 60px;
     text-align: left;
 }
</style>