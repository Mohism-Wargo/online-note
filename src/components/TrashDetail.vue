<template>
    <div id="trashDetail">
        <h1>{{ msg }} : {{ $route.params.noteId }}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '回收站笔记详情页'
        }
    }
}
</script>

<style scoped>
h1 {
    color: rgb(103, 169, 230);
}
</style>