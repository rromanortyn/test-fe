import Axios from 'axios'

const noteService = {
  async addNote(input) {
    const path = `${import.meta.env.VITE_BACKEND_URL}/notes`

    const response = await Axios.post(
      path,
      input,
    )

    return response.data
  },

  async getNotes() {
    const path = `${import.meta.env.VITE_BACKEND_URL}/notes`

    const response = await Axios.get(path)

    return response.data
  },

  async updateNote(id, input) {
    const path = `${import.meta.env.VITE_BACKEND_URL}/notes/${id}`

    const response = await Axios.put(
      path,
      input,
    )

    return response.data
  }, 

  async deleteNote(id) {
    const path = `${import.meta.env.VITE_BACKEND_URL}/notes/${id}`

    const response = await Axios.delete(path)

    return response.data
  },
}

export default noteService
