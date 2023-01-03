<template>
     <span :title="user.username">{{ slug }}</span>
    </template>

<script>

      export default {
 data() {
          return {
 user: {
                 username: 'Mr.White'
                    },
           slug: 'W'
             }
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
    font-size: 18px;
    margin-top: 20px;
    
}
</style>