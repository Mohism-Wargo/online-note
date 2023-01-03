import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Notebooks from '@/components/NotebookList'
import Note from '@/components/NoteDetail'
import Trash from '@/components/TrashDetail'

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
      path: '/note/:noteId',
      name: 'Note',
      component: Note
    },
    {
      path: '/trash/:noteId',
      name: 'Trash',
      component: Trash
    }
  ]
})
