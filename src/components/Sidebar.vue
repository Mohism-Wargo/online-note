<template>
    <div id="sidebar">
        <avatar/>
        <div class="icons">
            <router-link to="/note" title="笔记目录"><i class="iconfont icon-note"></i></router-link>
            <router-link to="/notebooks" title="笔记详情"><i class="iconfont icon-notebook"></i></router-link>
            <router-link to="/trash" title="回收站"><i class="iconfont icon-trash"></i></router-link>
            </div>
         <div class="logout">
             <i class="iconfont icon-logout" @click="onLogout"></i>
             </div>
         </div>
    </template>

<script> 
import avatar from '@/components/Avatar.vue'
import { mapActions } from 'vuex'

export default {
    components:{
        avatar
    },

    methods: {
        ...mapActions(['logout']),

        onLogout() {
            this.logout({ path: '/login' })
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