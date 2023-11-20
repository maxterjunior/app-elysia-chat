import Elysia from "elysia";
import { socketsStore } from "../core/store";

export const wsRegister = new Elysia()
    .ws('/', {
        open(ws) {
            const { uuid, topic } = ws.data.query

            if (!uuid) { ws.send({ message: 'uuid is required' }); ws.close(); return; }
            if (!topic) { ws.send({ message: 'topic is required' }); ws.close(); return; }

            socketsStore.set(uuid, { ws })

            console.log('open', uuid, socketsStore.size)

            ws.subscribe(topic)

            ws.send({
                message: 'Welcome to Elysia',
                time: Date.now(),
                id: ws.id
            })

        },
        message(ws, message) {
            const { uuid, topic } = ws.data.query
            console.log('message', uuid, message)
            ws.publish(topic, message)
        },
        close(ws) {
            const uuid = ws.data.query.uuid
            socketsStore.delete(uuid)
            console.log('close', socketsStore.size)
        },
    })