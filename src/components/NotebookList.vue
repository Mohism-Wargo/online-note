<template>
    <div class="detail" id="notebook-list">
        <header>
            <a href="#" class="btn" @click.prevent="onCreate"> 添加笔记本</a>
        </header>
        <main>
            <div class="layout">
                <h3>笔记本目录  【 {{ notebooks.length }} 】 </h3>
                <div class="book-list">
                    <router-link v-for="notebook in notebooks" :key="notebook.id" :to="`/note?notebookId=${notebook.id}`" class="notebook">
                        <div>
                            <span class="iconfont icon-notebook"></span>
                             {{ notebook.title }}
                            <span >{{ notebook.noteCounts }}</span>
                            <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
                            <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
                            <span class="date">{{ notebook.createdAtFriendly }}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

import { friendlyDate } from '@/helpers/util'
import { mapState, mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {}
    },

    created() {
        this.checkLogin({ path: '/login' })
        this.getNotebooks()
    },

    computed: {
        ...mapGetters(['notebooks'])
    },

    methods: {
        ...mapActions([
            'getNotebooks',
            'addNotebook',
            'updateNotebook',
            'deleteNotebook',
            'checkLogin',
        ]),

        onCreate() {    
            this.$prompt('请输入新的笔记本标题', '添加新笔记本' , {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^.{1,30}$/ ,
                inputErrorMessage: '标题不能为空，且不超过30个字符！'
            }).then(( { value } ) => {
                this.addNotebook({ title: value })
            })
        },

        onEdit(notebook) {
            let title = ''
            this.$prompt('输入新笔记本标题', '修改笔记本名' , {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^.{1,30}$/,
                inputValue: notebook.title,
                inputErrorMessage: '标题不能为空，且不超过30个字符！'
            }).then(({ value }) => {
                this.updateNotebook({ notebookId: notebook.id, title: value })
            })
        },

        onDelete(notebook) {
            this.$confirm('确定要删除这个笔记本吗？', '删除笔记本',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteNotebook({ notebookId: notebook.id })
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>