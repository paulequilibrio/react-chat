import httpClient from './httpClient'

const host = 'localhost'

const users = {
  register: async (user) => {
    try {
      const { data, error } = await httpClient.post('register', { ...user, host })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  list: async () => {
    try {
      const { data, error } = await httpClient.post('registered_users', { host })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },
  
  connected: async () => {
    try {
      const { data, error } = await httpClient.post('connected_users_vhost', { host })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },
  
  update: async (userToUpdate) => {
    try {
      const { user, password: newpass } = userToUpdate
      const { data, error } = await httpClient.post('change_password', { user, newpass, host })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  unregister: async (user) => {
    try {
      const { data, error } = await httpClient.post('unregister', { user, host })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  checkPassword: async (user) => {
    try {
      const { data, error } = await httpClient.post('check_password', { ...user, host })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  getLast: async (user) => {
    try {
      const { data, error } = await httpClient.post('get_last', { user, host })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }
}

export default users
