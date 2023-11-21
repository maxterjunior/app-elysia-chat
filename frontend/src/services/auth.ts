// const api = 'http://localhost:3000/api'
const api = 'https://existence-etc-italiano-connected.trycloudflare.com/api'

export const login = (username: string) => {
    return new Promise((resolve, reject) => {
        return fetch(api + '/login-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username })
        })
            .then(async res => {
                const json = await res.json()
                if (res.status > 200) {
                    return reject(json)
                }
                return resolve(json)
            })
            .catch(err => {
                return reject(err)
            })
    })
}