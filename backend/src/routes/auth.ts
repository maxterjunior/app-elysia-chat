import { randomUUID } from "crypto";
import { Elysia, t } from "elysia";
import { generateToken, decodeToken, verifyToken } from "../core/jwt";
import { tokensStore, usersChatStore } from "../core/store";

interface BodyLogin {
    username: string
    password: string
}

const user = {
    id: randomUUID(),
    username: 'admin',
    password: '12345',
    role: 'admin'
}

export const authRegister = new Elysia()
    .post('/login', (req) => {

        const body = req.body as BodyLogin

        if (body.username === user.username && body.password === user.password) {
            const data = {
                id: user.id,
                username: user.username,
                role: user.role
            }

            const token = generateToken(data)

            const token_data = decodeToken(token)

            tokensStore.set(token, { token, data })

            return { data, token, token_data }
        }

        return { error: 'Usuario o contraseña incorrectos' }

    },
        {
            body: t.Object({
                username: t.String(),
                password: t.String()
            })
        }
    )
    .post('/verify-token', (req) => {
        const token = req.headers.authorization?.split(' ')[1] || ''

        try {
            const token_data = verifyToken(token)
            return { token_data }
        } catch (error) {
            return { error: error.message }
        }
    })
    .post('/logout', (req) => {
        return { message: 'Logout' }
    })
    .post('/login-chat', (req) => {
        const body = req.body as BodyLogin

        const uuid = randomUUID()

        const data = {
            uuid,
            username: body.username
        }

        const token = generateToken(data)

        const token_data = decodeToken(token)

        usersChatStore.set(token, { token, uuid, ws: null, username: body.username })

        return { data, token, token_data }
    })



