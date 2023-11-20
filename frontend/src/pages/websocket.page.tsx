import { useEffect, useState } from "react";
import useWebSocket from "../hooks/ws";

const TOPIC = 'topic1';

const WebSocketComponent = () => {
    const [message, setMessage] = useState('');
    const { socket, openConnection, closeConnection } = useWebSocket(TOPIC);
    const [text, setText] = useState('');

    const sendMessage = () => {
        if (socket && socket.readyState === socket.OPEN) {
            socket.send(JSON.stringify({ message }));
        }
    };

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                console.log(1, event.data);
                setText(event.data);
            };
        }
    }, [socket]);

    useEffect(() => {
        openConnection();
    }, []);


    return (
        <div>
            <h1>WebSocket</h1>
            <h2>{text}</h2>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Enviar Mensaje</button>
            <button onClick={closeConnection}>Cerrar Conexión</button>
        </div>
    );
}
export default WebSocketComponent;