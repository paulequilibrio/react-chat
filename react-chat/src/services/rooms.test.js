import rooms from './rooms'
import { JID } from 'stanza'

const newroom = 'newroom'

describe('multi-user chat', () => {
  it('should list all rooms', async () => {
    const { data: list } = await rooms.list()
    expect(Array.isArray(list)).toBe(true)
  })

  it('should create a new room', async () => {
    const { data: status } = await rooms.create(newroom)
    expect(status).toBe(0)
    await rooms.delete(newroom)
  })

  it('should delete a room', async () => {
    await rooms.create(newroom)
    const { data: listBefore } = await rooms.list()

    await rooms.delete(newroom)
    const { data: listAfter } = await rooms.list()

    const room = JID.create({ local: newroom, domain: 'conference.localhost' })
    expect(listBefore).toContain(room)
    expect(listAfter).not.toContain(room)
  })
})
