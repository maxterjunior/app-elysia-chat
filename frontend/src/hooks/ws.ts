import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { environment } from '../enviroments';

const useWebSocket = (topic: string, token: string) => {
    const [socket, setSocket] = useState<WebSocket>();
    const [connected, setConnected] = useState<boolean>(false);
    const enabled = useRef(true)

    useEffect(() => {
        const connectWebSocket = () => {

            if (socket) { socket.close(); }

            const url = environment.wsUrl + '?token=' + token + '&topic=' + topic + '&uuid=' + uuid();

            const newSocket = new WebSocket(url);

            newSocket.onopen = (e) => {
                console.log('Conexión abierta', e);
                setConnected(true);
            };

            newSocket.onmessage = (event) => {
                console.log('Mensaje recibido:', event.data.length, 'bytes');
                // Manejar el mensaje según sea necesario
            };

            newSocket.onclose = (e) => {
                setConnected(false);
                console.log('Conexión cerrada', e);
                if (enabled.current) {
                    console.log('Intentando reconectar...', e);
                    setTimeout(connectWebSocket, 2000); // Intentar reconectar después de 2 segundos
                }
            };

            setSocket(newSocket);
        };

        connectWebSocket();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const closeConnection = () => {
        if (socket && socket.readyState === socket.OPEN) {
            enabled.current = false;
            socket.close();
        }
    };

    const openConnection = () => {
        if (socket && socket.readyState === socket.CLOSED) {
            enabled.current = true;
            socket.close();
        }
    }

    return { socket, closeConnection, openConnection, connected };
};

export default useWebSocket;
