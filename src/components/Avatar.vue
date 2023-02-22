<template>
     <span :title="username">{{ slug }}</span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

      export default {
 data() {
      return {
    }
 },
 
 created() {
    this.setUser()
    },

 methods: {
   ...mapActions({
     'setUser': 'checkLogin'
   })
},

 computed: {
    ...mapGetters([
      'username',
      'slug'
    ])
  }
 }

</script>

<style scoped>
span {
    display: inline-block;
    width: 56px;
    height: 54px;
    text-align: center;
    line-height: 62px;
    border-radius: 24%;
    background: #59c9a7;
    color: #fff;
    text-shadow: 1px 0 1px #243d36;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
    margin-top: 12px;
    border: 2px solid #91b6ce;
    
}
</style>