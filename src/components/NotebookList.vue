<template>
    <div class="detail" id="notebook-list">
        <header>
            <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 创建笔记</a>
        </header>
        <main>
            <div class="layout">
                <h3>笔记目录({{ notebooks.length }})</h3>
                <div class="book-list">
                    <router-link v-for="notebook in notebooks" :key="notebook.id" :to="'/note?notebookId = ${notebook.id}'" class="notebook">
                        <div>
                            <span class="iconfont icon-notebook"></span> {{ notebook.title }}
                            <span>{{ notebook.noteCounts }}</span>
                            <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
                            <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
                            <span class="date">{{ notebook.friendlyCreatedAt }}</span>
                        </div>
                    </router-link>
                </div>
            </div>

        </main>

    </div>
</template>

<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'
import { friendlyDate } from '@/helpers/util'

export default {
    data() {
        return {
            notebooks: []
        }
    },
    created() {
        Auth.getInfo()
          .then(res=> {
            if(!res.isLogin) {
                this.$router.push({ path: '/login'})
            }
          })
          Notebooks.getAll()
            .then(res => {
                this.notebooks = res.data
            })
    },
    methods: {
        onCreate() {
            
            this.$prompt('请输入新的笔记标题', '创建笔记' , {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^.{1,30}$/ ,
                inputErrorMessage: '标题不能为空，且不超过30个字符！'
            }).then(( { value } ) => {
                return Notebooks.addNotebook({ title: value })
            }).then(res => {
                res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
                this.notebooks.unshift(res.data)
                this.$message.success(res.msg)
            })

            // let title = window.prompt('创建笔记')
            // if (title.trim() === '') {
            //     alert('笔记名不能为空')
            //     return
            // }
            // Notebooks.addNotebook({ title })
            //     .then(res => {
            //         console.log(res)
            //         res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
            //         this.notebooks.unshift(res.data)
            //         alert(res.msg)
            //     })
        },

        onEdit(notebook) {

            let title = ''
            this.$prompt('输入新笔记的标题', '修改笔记名' , {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^.{1,30}$/,
                inputValue: notebook.title,
                inputErrorMessage: '标题不能为空，且不超过30个字符！'
            }).then(({ value }) => {
                title = value 
                return Notebooks.updateNotebook(notebook.id, { title })
            }).then(res => {
                notebook.title = title
                this.$message.success(res.msg)
            })

            // let title = window.prompt('修改笔记标题', notebook.title)
            // Notebooks.updateNotebook(notebook.id, { title })
            //     .then(res => {
            //         notebook.title = title
            //         alert(res.msg)
            //     })
        },

        onDelete(notebook) {

            this.$confirm('确定要删除这个笔记吗？', '删除笔记',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return Notebooks.deleteNotebook(notebook.id)
            }).then(res => {
                this.notebooks.splice(this.notebooks.indexOf(notebook),1)
                this.$message.success(res.msg)
            })

            // console.log('delete', notebook)
            // let isConfirm = window.confirm('你确定要删除吗?')
            // if (isConfirm) {
            //     Notebooks.deleteNotebook(notebook.id)
            //         .then(res => {
            //             console.log(res)
            //             this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
            //             alert(res.msg)
            //         })
            // }
        }
    }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>