<template>
    <div id="login">
        <div class="modal-mask">
             <div class="modal-wrapper">
                 <div class="modal-container">
                     <div class="main"></div>
                     <div class="form">
                        <h3 @click="showLogin">登录</h3>
                        <div v-show="isShowLogin" class="login">
                            <input type="text" v-model="login.username" placeholder="输入用户名">
                            <input type="password" v-model="login.password" placeholder="密码">
                            <p v-bind:class="{Error:login.isError}">{{ login.notice }}</p>
                            <div class="button" @click="onLogin"> 登录</div>  
                        </div>
                        <h3 @click="showRegister">注册</h3>
                        <div v-show="isShowRegister" class="register">
                             <input type="text" v-model="register.username" placeholder="用户名">
                             <input type="password" v-model="register.password" placeholder="密码">
                            <p v-bind:class="{ Error: register.isError}">{{ register.notice }}</p>
                             <div class="button" @click="onRegister">注册</div>    
                        </div>
                        </div>
                     </div>
                 </div>
             </div>       
         </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return{
            isShowLogin:true,
            isShowRegister:false,
            login:{
                username:'',
                password:'',
                notice:'请输入您的用户名和密码!',
                isError:true
            },
            register: {
                username: '',
                password: '',
                notice: '请记住您创建的账号和密码！',
                isError: false
            }
        }
    },
    methods:{
        showLogin(){
            this.isShowLogin = true
            this.isShowRegister = false
        },
        showRegister() {    
            this.isShowLogin = false
            this.isShowRegister = true
        },
        onLogin(){
            console.log('login')
            let result1 = this.validUsername(this.login.username)
            if (!result1.isValid) {
                this.login.isError = true
                this.login.notice = result1.notice
                return
            }
            let result2 = this.validPassword(this.login.password)
            if (!result2.isValid) {
                this.login.isError = true
                this.login.notice = result2.notice
                return
            }
        },
         onRegister() {
            console.log('register...')
            let result1 = this.validUsername(this.register.username)
            if(!result1.isValid){
                this.register.isError = true
                this.register.notice = result1.notice
                return
            }
             let result2 = this.validPassword(this.register.password)
             if (!result2.isValid) {
                 this.register.isError = true
                 this.register.notice = result2.notice
                 return
             }
        },
        validUsername(username){
            return{
                isValid:/^[a-zA-Z_0-9\u4e00-\u9fa5]{3,15}$/.test(username),
                notice:'用户名必须是3~15个字符，仅限于字母数字下划线及中文'
            }
        },
        validPassword(password) {
            return {
                isValid: /^.{8,16}$/.test(password),
                notice: '密码长度为8~16个字符'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.modal-mask {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(90, 112, 110, 0.4);
    display: table;
    transition: opacity .3s ease;
    
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    
}

.modal-container {
    width: 740px;
    height: 500px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(100, 100, 100, 0.33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    display: flex;

    .main {
        flex: 1;
        background: #1ea4ad url(//img95.699pic.com/xsj/14/3b/4l.jpg!/fh/300) center center no-repeat;
        background-size: contain;
        
    }

    .form {
        width: 310px;
        background-color: rgb(241, 245, 246);
        border-left: 1px solid rgb(160, 159, 159);

        h3 {
            padding: 10px 20px;
            font-weight: normal;
            font-size: 16px;
            border-top: 1px solid #eee;
            cursor: pointer;

            &:nth-of-type(2) {
                border-bottom: 1px solid #eee;
            }

        }

       .button {
            background-color: #1ea4ad;
            height: 36px;
            line-height: 36px;
            text-align: center;
            font-weight: bold;
            color: #fff;
            border-radius: 4px;
            margin-top: 18px;
            cursor: pointer;
            
        }

        .login,
        .register {
            padding: 10px 20px;
            border-top: 1px solid #eee;

            input {
                display: block;
                width: 100%;
                height: 35px;
                line-height: 35px;
                padding: 0 6px;
                border-radius: 4px;
                border: 1px solid #ccc;
                outline: none;
                font-size: 14px;
                margin-top: 10px;
                
            }

            input:focus {
                border: 3px solid #9dcaf8;
                
            }

            p {
                font-size: 12px;
                margin-top: 10px;
                color: #444;
                
            }

            .error {
                color: red;
                
            }
        }

        .login {
            border-top: 0;
            
        }
    }
}
</style>