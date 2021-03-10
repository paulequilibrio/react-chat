import rooms from './rooms'

const newroom = {
  name: 'room',
  service: 'localhost'
}

describe('multi-user chat', () => {
  it('should list all rooms', async () => {
    const list = await rooms.list()
    expect(list).toEqual([])
  })

  it('should create a new room', async () => {
    const status = await rooms.create(newroom)
    expect(status).toBe(0)
    await rooms.delete(newroom)
  })

  it('should delete a room', async () => {
    await rooms.create(newroom)
    const listBefore = await rooms.list()

    await rooms.delete(newroom)
    const listAfter = await rooms.list()

    expect(listBefore).toContain('room@localhost')
    expect(listAfter).not.toContain('room@localhost')
  })

})
