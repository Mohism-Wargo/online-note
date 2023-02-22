<template>
    <div id="trash" class="detail">
        <div class="note-sidebar">
            <h3 class="notebook-title">回收站</h3>
            <div class="menu">
                <div>标题</div>
                <div>更新时间</div>
            </div>
            <ul class="notes">
                <li v-for="note in trashNotes" :key="note.id">
                    <router-link :to="`/trash?noteId=${note.id}`">
                        <span class="title">{{ note.title }}</span>
                        <span class="date">{{ note.updatedAtFriendly }}</span>    
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="note-detail">
            <div class="note-bar" v-if="true">
                <span class="status"> 所属笔记本: {{ belongTo }} </span>
                <span class="status"> 创建日期: {{ curTrashNote.createdAtFriendly }}</span>
                <span class="status"> 更新日期: {{ curTrashNote.updatedAtFriendly }}</span>

                <a class="btn action" @click="onDelete">彻底删除</a>
                <a class="btn action" @click="onRevert">恢复</a>     
            </div>
            <div class="note-title">
                <span>{{ curTrashNote.title }}</span>
            </div>
            <div class="editor">
                <div class="preview markdown-body" v-html="compiledMarkdown"></div>
            </div>
        </div>
    </div>
</template>

<script>

import MarkdownIt from 'markdown-it'
import { mapGetters, mapMutations, mapActions } from 'vuex'

let md = new MarkdownIt()

export default {
    data() {
        return {}
    },

    created() {
        this.checkLogin({ path: '/login' })
        this.getNotebooks()
        this.getTrashNotes()
          .then(() => {
                this.setCurTrashNote({ curTrashNoteId: this.$route.query.noteId})
                this.$router.replace({
                    path: '/trash',
                    query: { noteId: this.curTrashNote.id }
                })
            })
    },

    computed:{
        ...mapGetters([
            'trashNotes',
            'curTrashNote',
            'belongTo'
        ]),

        compiledMarkdown () {
            return md.render(this.curTrashNote.content || '')
        }
    },

    methods: {
        ...mapMutations([
            'setCurTrashNote'
        ]),

        ...mapActions([
            'checkLogin',
            'deleteTrashNote',
            'revertTrashNote',
            'getTrashNotes',
            'getNotebooks'
        ]),

        onDelete() {
            this.$confirm('笔记删除后将无法恢复', '确定要删除吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return this.deleteTrashNote({ noteId: this.curTrashNote.id})
            }).then(() => {
                this.setCurTrashNote()
                this.$router.replace({
                    path: '/trash',
                    query: { noteId: this.curTrashNote.id }
                })
            })
        },

        onRevert() {
            this.revertTrashNote({ noteId: this.curTrashNote.id })
              .then(() => {
                this.setCurTrashNote()
                this.$router.replace({
                    path: '/trash',
                    query: {noteId: this.curTrashNote.id }
                })
              })
        }
    },

    beforeRouteUpdate (to, from, next) {
        this.setCurTrashNote({ curTrashNoteId: to.query.noteId})
        next()
    }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;

    .note-bar {
        .action {
            float: right;
            margin-left: 2px;
            padding: 2px 10px;
            font-size: 14px;
            font-weight: bold;
        }
    }
}

</style>