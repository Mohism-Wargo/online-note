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
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    background: #59c9a7;
    color: rgb(253, 253, 253);
    text-shadow: 1px 0 1px #243d36;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px;
    margin-top: 20px;
    
}
</style>