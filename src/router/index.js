import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/notebooks',  // alias,别名
      component: () => import('@/components/NotebookList.vue')
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue')
    },
    {
      path: '/note',
      component: () => import('@/components/NoteDetail.vue')
    },
    {
      path: '/trash',
      component: () => import('@/components/TrashDetail.vue')
    }
  ]
})

// 上下两种写法都是可以的，上面的写法会更简练一点



// import Vue from 'vue'
// import Router from 'vue-router'
// import Login from '@/components/Login'
// import Notebooks from '@/components/NotebookList.vue'
// import NoteDetail from '@/components/NoteDetail.vue'
// import TrashDetail from '@/components/TrashDetail.vue'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     },
//     {
//       path: '/notebooks',
//       name: 'Notebooks',
//       component: Notebooks
//     },
//     {
//       path: '/note',
//       name: 'Note',
//       component: NoteDetail
//     },
//     {
//       path: '/trash',
//       name: 'Trash',
//       component: TrashDetail
//     }
//   ]
// })


