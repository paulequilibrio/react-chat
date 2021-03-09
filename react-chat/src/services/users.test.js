import users from './users'

const newuser = {
  user: 'newuser',
  password: 'passw0rd'
}

describe('users', () => {
  afterEach(async () => {
    await users.unregister(newuser.user)
  })

  it('should list all users', async () => {
    const { data } = await users.list()
    expect(data).toContain('admin')
  })  
  
  it('should register a new user', async () => {
    const { data, error } = await users.register(newuser)
    expect(error).toBeUndefined()
    expect(data).toBe('User newuser@localhost successfully registered')
  })

  it('should unregister an user', async () => {
    await users.register(newuser)
    const { data: listBefore } = await users.list()

    await users.unregister(newuser.user)
    const { data: listAfter } = await users.list()

    expect(listBefore).toContain('newuser')
    expect(listAfter).not.toContain('newuser')
  })

  it('should update an user', async () => {
    await users.register(newuser)

    const updateUser = { ...newuser, password: 'newp4ssword' }
    const { data: updateStatus } = await users.update(updateUser)
    const { data: checkStatus } = await users.checkPassword(updateUser)

    expect(updateStatus).toBe(0)
    expect(checkStatus).toBe(0)
  })
})
