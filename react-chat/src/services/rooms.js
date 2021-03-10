import httpClient from './httpClient'

const service = 'localhost'
const host = 'localhost'

const rooms = {
  create: async (room) => {
    const response = await httpClient.post('create_room', { ...room, host })
    return response.data
  },

  list: async () => {
    const response = await httpClient.post('muc_online_rooms', { service })
    return response.data
  },

  delete: async (room) => {
    const response = await httpClient.post('destroy_room', room)
    return response.data
  }

}

export default rooms
