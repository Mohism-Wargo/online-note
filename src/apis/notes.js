import request from '@/helpers/request'
import { friendlyDate } from '@/helpers/util'

const URL = {
    GET: '/notes/from/:notebookId',
    ADD: '/note/to/:notebookId',
    UPDATE: '/notes/:noteId',
    DELETE: '/notes/:noteId'
}

export default {
    getAll({ notebookId }) {
        return new Promise((resolve, reject) => {
            request(URL.GET.replace(':notebookId', notebookId))
                .then(res => {
                    res.data = res.data.map(note => {
                        note.createdAtFriendly = friendlyDate(note.createdAt)
                        note.updatedAtFriendly = friendlyDate(note.updateAt)
                        return note
                    }).sort((note1, note2) => {
                        return note1.updatedAt < note2.updateAt
                    })
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },

    updateNote({ noteId }, { title, content }) {
        return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', { title, content })
    },

    deleteNote({ noteId }) {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    },

    addNote({ notebookId }, { title = '', content = '' } = { title: '', content: '' }) {
        return new Promise((resolve, reject) => {
            request(URL.ADD.replace(':notebookId', notebookId), 'POST', { title, content })
                .then(res => {
                    res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
                    res.data.updatedAtFriendly = friendlyDate(res.data.updateAt)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    }

}