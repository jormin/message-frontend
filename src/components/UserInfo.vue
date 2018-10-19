<template>
    <div>
        <el-row id="userInfoWrap">
            <el-col :span="18" :offset="3">
                <div class="grid-content bg-purple-dark">
                    <el-form :model="userInfo" ref="userInfo" :label-position="labelPosition" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="userInfo.name" placeholder="姓名" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="userInfo.gender" placeholder="请选择性别" disabled>
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="userInfo.phone" placeholder="请输入手机号" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="userInfo.email" placeholder="请输入邮箱" readonly>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="邮箱验证" prop="email">
                            <el-input v-model="userInfo.email_verify === '1' ? '已验证' : '未验证'" placeholder="请输入邮箱" readonly>
                                <el-button slot="append" v-show="userInfo.email_verify === '0'" @click="sendValidateEmail" :disabled="codeButton.disabled">{{codeButton.name}}</el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="注册时间" prop="created_at">
                            <el-input v-model="userInfo.created_at" placeholder="注册时间" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="注册IP" prop="ip">
                            <el-input v-model="userInfo.ip" placeholder="注册IP" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="IP区域" prop="ip_address">
                            <el-input v-model="userInfo.ip_address" placeholder="IP区域" readonly></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>

        <el-row id="logoutWrap">
            <el-button type="danger" id="logoutBtn" @click="logout">退出登录</el-button>
        </el-row>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                labelPosition: 'left',
                codeButton: {
                    name: '重新发送',
                    disabled: false,
                    time: 180
                },
                userInfo: {
                    name: '',
                    gender: '1',
                    phone: '',
                    email: '',
                    email_verify: '',
                    created_at: '',
                    ip: '',
                    ip_address: ''
                }
            };
        },
        methods: {
            logout(){
                let _this = this;
                this.$get('/account/logout')
                    .then(response => {
                        localStorage.removeItem('token');
                        _this.$message({
                            message: response.message,
                            type: 'success'
                        })
                        _this.$router.push('/login');
                    });
            },
            sendValidateEmail(){
                let _this = this;
                this.$get('/account/send-validate-email')
                    .then(response => {
                        this.$message({
                            message: response.message,
                            type: 'success',
                        });
                        this.codeButton.disabled = true;
                        let _this = this;
                        let interval = window.setInterval(function() {
                            _this.codeButton.name = '（' + _this.codeButton.time + '秒）后重新发送';
                            --_this.codeButton.time;
                            if(_this.codeButton.time < 0) {
                                _this.codeButton.name = "重新发送";
                                _this.codeButton.time = 180;
                                _this.codeButton.disabled = false;
                                window.clearInterval(interval);
                            }
                        }, 1000);

                    });
            }
        },
        created: function () {
            let _this = this;
            this.$get('/account/info')
                .then(response => {
                    _this.userInfo = response.user;
                });
        }
    }
</script>
<style scoped>
    #userInfoWrap{
        margin-top: 30px;
    }
    #logoutWrap{
        text-align: center;
    }
    #logoutBtn{
        width: 80%;
    }
</style>