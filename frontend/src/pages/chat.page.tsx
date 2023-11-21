import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import useWebSocket from "../hooks/ws";

export interface User {
    uuid: string
    username: string
    status?: 'online' | 'offline'
    lastMessage?: Date
    token?: string
}

interface Message {
    id: number
    message: string
    from: User
    date: Date
}

const TOPIC = 'chat-topic';

interface Props {
    user: User
}

function ChatPage({ user }: Props) {

    const [users, setUsers] = useState<User[]>([])
    const [messages, setMessages] = useState<Message[]>([])

    const { socket, connected, closeConnection } = useWebSocket(TOPIC);

    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formProps = Object.fromEntries(new FormData(event.currentTarget));

        console.log(formProps)

        const message = formProps.message as string

        if (message) {
            const newMessage: Message = {
                id: messages.length + 1,
                message,
                from: user,
                date: new Date()
            }

            setMessages([...messages, newMessage])
        }

        event.currentTarget.reset()

        if (socket && socket.readyState === socket.OPEN) {
            socket.send(JSON.stringify({ message }));
        }

    }

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                console.log(1, event.data);
            };
        }
    }, [socket]);

    useEffect(() => {
        return () => {
            console.log('Desmontando Chat')
            socket?.close()
        }
    }, [])

    return (
        <Container style={{ height: '80vh' }} >
            <Row style={{ height: '100%' }}>
                <Col xs={3}>
                    <div className="input-group">
                        <button type="button" className="btn btn-primary"><i className="fa fa-search"></i></button>
                        <input type="search" className="form-control" placeholder="Search..." />
                    </div>
                    <hr />
                    <ListGroup>

                        {users.length === 0 && (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }} >
                                <span className="text-muted h4">
                                    Esperando usuarios...
                                </span>
                            </div>
                        )}

                        {users.map((user) => (
                            <ListGroup.Item key={user.uuid}>
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                                <div className="about w-75">
                                    <div className="name">{user.username}</div>
                                    <div className="d-flex justify-content-between">
                                        <div className="status"> <i className={user.status === 'online' ? 'fa fa-circle online' : 'fa fa-circle offline'}></i>
                                            {user.status === 'online' ? 'online' : 'offline'}
                                        </div>
                                        {user.lastMessage && (
                                            <div className="status"> <i className="fa fa-clock-o"></i>
                                                {user.lastMessage.toLocaleString()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col xs={9}
                    className={
                        `d-flex flex-column justify-content-end align-items-center
                        ${!connected ? 'bg-secondary' : ''}
                        `
                    }
                >

                    {/* {connected ?
                        <div className="alert alert-success" role="alert"> Conectado </div> :
                        <div className="alert alert-danger" role="alert"> Desconectado </div>
                    } */}

                    {!messages.length ?
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }} >
                            <h1 className="text-muted">
                                Envie un mensaje para comenzar
                            </h1>
                        </div> : (
                            <div className="chat-space">
                                {messages.map((message) => (
                                    <div key={message.id} className={`d-flex justify-content-${message.from.uuid === user?.uuid ? 'end' : 'start'} align-items-center`}>
                                        <div className="d-flex flex-column justify-content-start align-items-start" >
                                            <div className={`rounded p-2 m-2 w-100 ${message.from.uuid === user?.uuid ? 'bg-primary text-white' : 'bg-light'}`}>
                                                <div className="d-flex justify-content-between">
                                                    {message.from.uuid !== user?.uuid && (
                                                        <div className="font-weight-bold">{message.from.username}</div>
                                                    )}
                                                    <div className="text-date">{message.date.toLocaleString()}</div>
                                                </div>
                                                <div>{message.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    <form className="input-group mb-0" onSubmit={sendMessage}>
                        <button type="submit" className="btn btn-primary"><i className="fa fa-send"></i></button>
                        <input type="text" className="form-control" placeholder="Enter text here..." name="message" />
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default ChatPage