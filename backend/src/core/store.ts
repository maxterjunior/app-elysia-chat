import { ElysiaWS } from "elysia/dist/ws";

export const socketsStore = new Map<string, { ws: ElysiaWS<any> }>()

export const tokensStore = new Map<string, { token: string, data: any }>()