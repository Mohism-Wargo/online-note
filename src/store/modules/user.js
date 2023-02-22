import Auth from '@/apis/auth'
import router from '@/router'


const state = {
    user: null
}

const getters = {
    username: state => state.user === null ? '请登录...' : state.user.username,

    slug: state => state.user === null ? '请登录...' : (state.user.username.charAt(0) + state.user.username.charAt(1) + state.user.username.charAt(2) + '...')
}

const mutations = {
    setUser(state, payload) {
        state.user = payload.user
    }
}

const actions = {
    login({ commit }, { username, password }) {
        return Auth.login({ username, password })
            .then(res => {
                commit('setUser', { user: res.data })
            })
    },

    register({ commit }, { username, password }) {
        return Auth.register({ username, password })
            .then(res => {
                commit('setUser', { user: null })
            })
    },

    logout({ commit }, payload = { path: '/login' }) {
        return Auth.logout()
            .then(res => {
                commit('setUser', { user: null })
                console.log(payload)
                router.push(payload)
            })
    },


    checkLogin({ commit, state }, payload = { path: '/' }) {
        if (state.user !== null) return Promise.resolve()
        return Auth.getInfo()
            .then(res => {
                if (!res.isLogin) {
                    console.log('payload')
                    router.push(payload)
                } else {
                    commit('setUser', { user: res.data })
                }
            })
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}