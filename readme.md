## 简介

使用 [Vue](https://cn.vuejs.org/) 和 [Element](http://element.eleme.io/#/zh-CN) 开发的留言板用户端，提供如下功能：

### 用户端

- 用户注册

    注册时需要填写姓名、手机号、邮箱、性别信息，系统会对手机号和邮箱进行验证码验证。
    
    手机短信使用的是 `阿里云短信` 服务，使用前需要配置阿里云账号信息。
    
    邮件发送使用的是 `Swift Mailer`， 使用前需要配置自己的邮箱账号信息。

- 用户登录\个人信息查看\退出

    支持手机号和邮箱登录，邮箱登录前提是邮箱必须经过验证（点击激活邮件中的链接进行激活）

- 发送留言

    允许用户填写留言标题(80个字符以内) ，留言内容(500个字符以内)，上传一张图片，发送留给给指定用户
    
    上传图片使用的是 `七牛云` 服务，使用前需要配置七牛账号信息
    
    留言时允许用户通过搜索姓名的方式来检索出特定用户
    
- 留言列表
    
    留言列表需要登录后才可查看，分为 `公共留言`、`我发送的留言`、`我收到的留言`

    公共留言为没有接收者的留言
    
- 查看留言、评论列表及发表评论

    允许用户查看留言后发表评论，评论内容限定140个字符以内
    
## 安装

- 克隆代码

    ```
    git clone git@github.com:jormin/message-frontend.git
    ```

- 安装扩展

    ```
    yarn install
    ```

- 修改配置

    ```
    # 修改接口地址
    vim src/utils/request.js
    ```

- 启动服务

    ```
    # 开发时编译及热加载
    yarn run serve
    
    # 编译生产版本
    yarn run build    
    ```