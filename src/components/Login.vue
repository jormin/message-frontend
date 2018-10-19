<template>
    <el-row id="loginWrap">
        <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple-dark">
                <el-form :model="loginForm" :rules="rules" ref="loginForm" :label-position="labelPosition" label-width="100px" class="demo-loginForm">
                    <el-form-item prop="account">
                        <el-input v-model="loginForm.account" placeholder="请输入手机号或邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login('loginForm')">登录</el-button>
                        <el-button type="default" @click="register()">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>


<script>
    export default {
        data() {
            return {
                labelPosition: 'top',
                loginForm: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        { required: true, message: '请输入手机号或邮箱', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min:6, max:20, message: '请输入6-20位密码'}
                    ]
                }
            };
        },
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post('/auth/login', this.loginForm)
                            .then(response => {
                                localStorage.setItem('token', response.token);
                                let _this = this;
                                this.$message({
                                    message: response.message,
                                    type: 'success',
                                });
                                _this.$router.push('/');
                            });
                    } else {
                        return false;
                    }
                });
            },
            register() {
                this.$router.push('/register');
            }
        }
    }
</script>

<style scoped>
    #loginWrap{
        margin-top: 60px;
    }
</style>