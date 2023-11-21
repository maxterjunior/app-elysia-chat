

// const api = window._routeApi

const api = 'http://localhost:3000/api'

interface OptionsExtraRequest {
    msgSuccess?: string
    msgError?: string
    params?: any
}

export const getToken = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        window.location.href = '/login'
    }
    return token
}

export const GET = (url: string, options?: OptionsExtraRequest) => {

    const params = options?.params || {}
    const paramsArray: string[] = []
    const token = getToken()

    if (params) {
        Object.keys(params)
            .filter(key => params[key] !== undefined && params[key] !== null)
            .forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }

    return new Promise((resolve, reject) => {
        return fetch(api + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
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

export const POST = (url: string, options: OptionsExtraRequest) => {
    const token = getToken()
    return new Promise((resolve, reject) => {
        return fetch(api + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(options?.params || {})
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

export const PUT = (url: string, options: OptionsExtraRequest) => {
    const token = getToken()
    return new Promise((resolve, reject) => {
        return fetch(api + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(options?.params || {})
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