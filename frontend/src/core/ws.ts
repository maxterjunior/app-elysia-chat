// interface WsParams {
//     topic: string
//     [key: string]: string
// }

// export const useSocket = (params: WsParams) => {
//     const token = getToken()
//     const query = params ? '&' + Object.keys(params).map(key => key + '=' + params[key]).join('&') : ''
//     return new WebSocket(window._routeWs + '?token=' + token + query)
// }