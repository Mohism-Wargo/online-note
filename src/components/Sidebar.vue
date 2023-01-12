<template>
    <div id="sidebar">
        <avatar/>
        <div class="icons">
            <router-link to="/note/1" title="笔记"><i class="iconfont icon-note"></i></router-link>
            <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>
            <router-link to="/trash/2" title="回收站"><i class="iconfont icon-trash"></i></router-link>
            </div>
         <div class="logout">
             <i class="iconfont icon-logout" @click="logout"></i>
             </div>
         </div>
    </template>

<script> 
import avatar from "@/components/Avatar.vue"; 
import Auth from "@/apis/auth";

export default {
    components:{
        avatar
    },
    methods: {
        logout(){
            console.log('logout')
            Auth.logout()
            .then(data =>{
                console.log(data)
            })
        }
    }
}
</script>
<style lang="less" scoped>
#sidebar {
position: relative;
width: 86px;
text-align: center;
background-color: #4491a0;

.icons {
margin-top: 20px;
a {
        padding: 16px 0;
        display: block;

    }
        .router-link-active {
            background-color: #89a7b9;
    
        }
}
.logout {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
    cursor: pointer;

  }
.iconfont {

color: rgb(233, 241, 248);

  }
}
</style>