<template>
    <div id="note" class="detail">
        <note-sidebar @update:notes="val => notes = val"></note-sidebar>
        <div class="note-detail">
            <div class="note-empty" v-show="!curBook.id">请创建笔记本后</div>
            <div class="note-empty" v-show="!curNote.id">选择或创建笔记</div>
            <div class="note-detail-ct" v-show="curNote.id">
                <div class="note-bar">
                    <span class="status">创建日期：{{ curNote.createdAtFriendly }}</span>
                    <span class="status">更新日期：{{ curNote.updatedAtFriendly }}</span>
                    <span class="status">{{ statusText }}</span>
                    <span class="action delete" @click="onDeleteNote">删除</span>
                    <span class="action fullscreen" @click="isShowPreview = !isShowPreview">展示</span>
                </div>
                <div class="note-title">
                    <input type="text" v-model="curNote.title"  @input="onUpdateNote" @keydown="statusText ='正在输入...'" placeholder="请输入标题">
                </div>
                <div class="editor">
                    <codemirror v-model="curNote.content" :options="cmOptions" v-if="!isShowPreview" @input="onUpdateNote" @inputRead="statusText='正在输入...'" ></codemirror>
                    <!-- <textarea v-if="!isShowPreview" v-model="curNote.content" @input="updateNote" @keydown="statusText ='正在输入...'"  placeholder="请输入内容，支持 Markdown 语法"></textarea> -->
                    <div class="preview markdown-body" v-html="previewContent " v-else></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar'
import _ from 'lodash'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import MarkdownIt from 'markdown-it'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/theme/neat.css'

let md = new MarkdownIt()

export default {
    components:{
        NoteSidebar,
        codemirror
    },
    
    data() {
        return {
            statusText:'笔记未改动',
            isShowPreview: false,
            cmOptions: {
                tabSize: 4,
                mode: 'text/x-markdown',
                theme: 'neat',
                lineNumbers: false,
                line: true,
                // more codemirror options, 更多 codemirror 的高级配置...
            }
        }
    },
    created() {
        this.checkLogin({ path: '/login' })
    },

    computed: {
        ...mapGetters([
            'notes',
            'curNote',
            'curBook'
        ]),

        previewContent() {
            return md.render(this.curNote.content || '')
        }
    },

    methods: {
        ...mapMutations([
            'setCurNote'
        ]),

        ...mapActions([
            'updateNote',
            'deleteNote',
            'checkLogin'
        ]),

        onUpdateNote: _.debounce(function() {
            if(!this.curNote.id) return
            this.updateNote({ noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content})
            .then(data => {
                this.statusText = '已保存'
            }).catch(data => {
                this.statusText = '保存失败'
            })
        }, 400),

        onDeleteNote() {
            this.deleteNote({ noteId: this.curNote.id })
              .then(data => {
                this.$router.replace({ path: '/note' })
              })
        }
    },

    beforeRouteUpdate (to, from, next) {
        this.setCurNote({ curNoteId: to.query.noteId })
        next()
    }
}
</script>

<style lang="less">
@import url(../assets/css/note-detail.less);

#note {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;
}

</style>