
import { Elysia } from "elysia";
import { cron } from '@elysiajs/cron'
import { tokensStore } from "../core/store";
import { verifyToken } from "../core/jwt";

export const jobsRegister = new Elysia()
    .use(
        cron({
            name: 'heartbeat',
            pattern: '* * * * *',
            run() {
                const date = new Date()
                console.log("Heartbeat", date.toLocaleTimeString())
            }
        }))
    .get('/stop', ({ store: { cron: { heartbeat } } }: any) => {
        heartbeat.stop()
        return 'Stop heartbeat'
    })
    .use(
        cron({
            name: 'clear-tokens',
            pattern: '* * * * *',
            run() {
                tokensStore.forEach((value, key) => {
                    try {
                        verifyToken(key)
                    } catch (error) {
                        console.log(error.message)
                    }
                })
            }
        }))