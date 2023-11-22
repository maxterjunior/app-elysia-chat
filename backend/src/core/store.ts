import { ElysiaWS } from "elysia/dist/ws";
import { Message, User } from "./types";

export const socketsStore = new Map<string, { ws: ElysiaWS<any> }>()

export const tokensStore = new Map<string, { token: string, data: any }>()

export const usersChatStore = new Map<string, User>()

export const messagesStore = new Map<string, Message[]>()