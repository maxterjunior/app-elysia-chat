import Elysia from "elysia";
import { socketsStore, messagesStore, usersChatStore } from "../core/store";
import { Message, User } from "../core/types";
import { verifyToken } from "../core/jwt";

export const wsRegister = new Elysia()
    .ws('/', {
        open(ws) {
            const { uuid, topic, token } = ws.data.query

            if (!topic) { ws.send({ message: 'topic is required' }); ws.close(); return; }
            if (!token) { ws.send({ message: 'token is required' }); ws.close(); return; }

            try {
                const user = verifyToken(token) as User
                console.log('user', user)
                socketsStore.set(uuid, { ws })
                usersChatStore.set(uuid, { uuid, username: user.username, status: 'online', ws })

                ws.subscribe(topic)

                const messages = messagesStore.get(topic)
                if (messages) ws.send({ type: 'messages', data: messages })

                const users = Array.from(usersChatStore.values())

                console.log('users', users.length)

                for (const u of users) {
                    if (u.status === 'online') u?.ws?.send({ type: 'users', data: users.map(u => ({ ...u, ws: null })) })
                }


            } catch (error) {
                console.log('error', error.message)
                ws.close()
            }
        },
        message(ws, { data, type }) {
            const { uuid, topic } = ws.data.query

            ws.publish(topic, { type, data })

            if (topic === 'chat-topic') {
                if (type === 'message') {
                    const message = data as Message
                    if (!messagesStore.has('chat-topic')) messagesStore.set('chat-topic', [])
                    const messages = messagesStore.get('chat-topic')
                    messages.push(message as Message)

                    const user = usersChatStore.get(uuid)
                    user.lastMessage = message.date

                    const users = Array.from(usersChatStore.values())
                    for (const u of users) {
                        if (u.status === 'online') u?.ws?.send({ type: 'users', data: users.map(u => ({ ...u, ws: null })) })
                    }
                }
            }

        },
        close(ws) {
            const uuid = ws.data.query.uuid
            socketsStore.delete(uuid)

            const user = usersChatStore.get(uuid)
            user.status = 'offline'
            const users = Array.from(usersChatStore.values())
            for (const u of users) {
                if (u.status === 'online') u?.ws?.send({ type: 'users', data: users.map(u => ({ ...u, ws: null })) })
            }

        },
    })