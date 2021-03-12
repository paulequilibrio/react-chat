import httpClient from './httpClient'

const host = 'localhost'
const service = `conference.${host}`

const rooms = {
  create: async name => {
    try {
      const { data, error } = await httpClient.post('create_room', {
        name,
        service,
        host
      })
      return { data, error }
    } catch (error) {
      return { error }
    }
  },

  list: async () => {
    try {
      const { data, error } = await httpClient.post('muc_online_rooms', {
        service
      })
      return { data, error }
    } catch (error) {
      return { error }
    }
  },

  delete: async name => {
    try {
      const { data, error } = await httpClient.post('destroy_room', {
        name,
        service
      })
      return { data, error }
    } catch (error) {
      return { error }
    }
  }
}

export default rooms
