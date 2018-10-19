<template>
    <el-row id="registerWrap">
        <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple-dark">
                <el-form :model="registerForm" :rules="rules" ref="registerForm" :label-position="labelPosition" label-width="100px" class="demo-ruleForm">
                    <el-form-item prop="name">
                        <el-input v-model="registerForm.name" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item prop="gender">
                        <el-select v-model="registerForm.gender" placeholder="请选择性别">
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input v-model="registerForm.code" placeholder="请输入验证码">
                            <el-button slot="append" @click="sendCode" :disabled="codeButton.disabled">{{codeButton.name}}</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="registerForm.password" placeholder="请输入密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPassword">
                        <el-input v-model="registerForm.confirmPassword" placeholder="请输入确认密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register('registerForm')">注册</el-button>
                        <el-button type="default" @click="login()">已有账号？登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>


<script>
    export default {
        data() {
            var validatePhone = (rule, value, callback) => {
                var reg=/^1[3456789]\d{9}$/;
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if(!reg.test(value)){
                    callback(new Error('请输入正确格式的手机号码'));
                }else{
                    callback();
                }
            };
            var validateEmail = (rule, value, callback) => {
                var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                }else if(!reg.test(value)){
                    callback(new Error('请输入正确格式的邮箱'));
                }else{
                    callback();
                }
            };
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else{
                    if(this.registerForm.confirmPassword !== ''){
                        this.$refs.registerForm.validateField('confirmPassword');
                    }
                    callback();
                }
            };
            var validateConfirmPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                }else{
                    callback();
                }
            };
            return {
                labelPosition: 'top',
                codeButton: {
                    name: '发送',
                    disabled: false,
                    time: 60
                },
                registerForm: {
                    name: '',
                    gender: '1',
                    phone: '',
                    code: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validatePhone }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { validator: validateEmail }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min:6, max:20, message: '请输入6-20位密码'},
                        { validator: validatePassword }
                    ],
                    confirmPassword: [
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min:6, max:20, message: '请输入6-20位密码'},
                        { validator: validateConfirmPassword }
                    ]
                }
            };
        },
        methods: {
            sendCode() {
                this.$refs.registerForm.validateField('phone', (prop) => {
                    if (!prop) {
                        this.$post('/auth/register-code', {phone: this.registerForm.phone})
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
                                        _this.codeButton.time = 60;
                                        _this.codeButton.disabled = false;
                                        window.clearInterval(interval);
                                    }
                                }, 1000);
                            });
                    } else {
                        return false;
                    }
                });
            },
            register(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post('/auth/register', this.registerForm)
                            .then(response => {
                                if(response.code == 1){
                                    localStorage.setItem('token', response.token);
                                    let _this = this;
                                    this.$message({
                                        message: response.message,
                                        type: 'success',
                                    });
                                    _this.$router.push('/');
                                }else{
                                    this.$message({
                                        message: response.message,
                                        type: 'error',
                                    });
                                }
                            });
                    } else {
                        return false;
                    }
                });
            },
            login() {
                this.$router.push('/login');
            }
        }
    }
</script>
<style scoped>
 #registerWrap{
     margin-top: 60px;
     text-align: left;
 }
</style>