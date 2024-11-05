import { boot } from 'quasar/wrappers'
import { io, Socket } from 'socket.io-client'
import { LocalStorage } from 'quasar'

class Websocket {
  private socket: null | Socket = null

  async connect() {
    if (this.socket) {
      return
    }

    const token = LocalStorage.getItem('token')
    const wsUrl = 'http://localhost:3333'

    this.socket = io(wsUrl, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  getSocket() {
    if (!this.socket) this.connect()
    return this.socket as Socket
  }
}

export default boot((/* { app, router, ... } */) => {
  // something to do
})

export const Ws = new Websocket()
