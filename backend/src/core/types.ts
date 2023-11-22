import { ElysiaWS } from "elysia/dist/ws"

export interface Message {
    id: number
    message: string
    from: User
    date: Date
}

export interface User {
    uuid: string
    username: string
    status?: 'online' | 'offline'
    lastMessage?: Date
    token?: string
    ws?: ElysiaWS<any>
}