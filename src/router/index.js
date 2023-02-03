import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Notebooks from '@/components/NotebookList.vue'
import Note from '@/components/NoteDetail.vue'
import TrashDetail from '@/components/TrashDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/notebooks',
      name: 'Notebooks',
      component: Notebooks
    },
    {
      path: '/note',
      name: 'Note',
      component: Note
    },
    {
      path: '/trash',
      name: 'Trash',
      component: TrashDetail
    }
  ]
})
