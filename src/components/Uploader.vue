<template>
    <el-upload
        v-loading="uploading"
        class="attachment-uploader"
        action="//up-z2.qiniup.com/"
        ref="upload"
        :show-file-list="false"
        :data="uploadParams"
        :on-success="handleSuccess"
        :on-change="handleChange"
        :auto-upload="false"
        :limit="1"
        :before-upload="beforeUpload">
        <img v-if="imgUrl" :src="imgUrl" class="attachment">
        <i v-else class="el-icon-plus attachment-uploader-icon"></i>
    </el-upload>
</template>


<style>
    .attachment-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .attachment-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .attachment-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .attachment {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<script>

    export default {
        data () {
            return {
                domain: '',
                uploadParams: {},
                uploading: false,
                imgUrl: '',
                path: ''
            }
        },
        methods: {
            handleSuccess(res, file) {
                var key = res.key;
                this.path = key;
                this.imgUrl = this.domain+'/'+key;
                this.uploading = false;
            },
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt10M = file.size / 1024 / 1024 < 20;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt10M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return isJPG && isLt10M;
            },
            handleChange(file, fileList){
                if(this.uploading === false){
                    var _this = this;
                    this.$get('/upload/token')
                        .then(response => {
                            _this.domain = response.domain;
                            _this.uploadParams = {
                                token: response.token
                            }
                            _this.uploading = true;
                            setTimeout(function () {
                                _this.$refs.upload.submit()
                            }, 500);
                        });
                }
            },
        }
    }


</script>