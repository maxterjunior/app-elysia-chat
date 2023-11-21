import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

function App() {

  const [user, setUser] = useState<{ id: number, name: string } | null>(null)
  const [users, setUsers] = useState<{
    id: number, name: string,
    status?: 'online' | 'offline'
    lastMessage?: Date
  }[]>([])
  const [messages, setMessages] = useState<{
    id: number, message: string,
    from: { id: number, name: string }, to: { id: number, name: string }
    date: Date
  }[]>([])

  useEffect(() => {

    setUser({ id: 1, name: 'User 1' })

    const users: {
      id: number, name: string,
      status?: 'online' | 'offline'
      lastMessage?: Date
    }[] = []
    for (let i = 0; i < 10; i++) {
      users.push({ id: i, name: `User ${i}`, status: i % 2 === 0 ? 'online' : 'offline', lastMessage: new Date() })
    }
    setUsers(users)

    setMessages([
      {
        id: 1, message: 'Hello', from: { id: 1, name: 'User 1' }, to: { id: 2, name: 'User 2' },
        date: new Date()
      },
      {
        id: 2, message: 'Hi', from: { id: 2, name: 'User 2' }, to: { id: 1, name: 'User 1' },
        date: new Date()
      },
      {
        id: 3, message: 'How are you?', from: { id: 1, name: 'User 1' }, to: { id: 2, name: 'User 2' },
        date: new Date()
      },
      {
        id: 4, message: 'I am fine', from: { id: 2, name: 'User 2' }, to: { id: 1, name: 'User 1' },
        date: new Date()
      },
      {
        id: 5, message: 'How about you?', from: { id: 2, name: 'User 2' }, to: { id: 1, name: 'User 1' },
        date: new Date()
      },
      {
        id: 6, message: 'I am fine too', from: { id: 1, name: 'User 1' }, to: { id: 2, name: 'User 2' },
        date: new Date()
      },
      {
        id: 7, message: 'Good to hear that', from: { id: 2, name: 'User 2' }, to: { id: 1, name: 'User 1' },
        date: new Date()
      },
      {
        id: 8, message: 'Bye', from: { id: 1, name: 'User 1' }, to: { id: 2, name: 'User 2' },
        date: new Date()
      },
      {
        id: 9, message: 'Bye', from: { id: 2, name: 'User 2' }, to: { id: 1, name: 'User 1' },
        date: new Date()
      },
      {
        id: 10, message: 'Bye', from: { id: 1, name: 'User 1' }, to: { id: 2, name: 'User 2' },
        date: new Date()
      },
    ])
  }, [])

  return (
    <Container>
      <h1 className="my-3 text-center" >Chat App</h1>
      <Container style={{ height: '80vh' }} >
        <Row style={{ height: '100%' }}>
          <Col xs={3}>
            <div className="input-group">
              <button type="button" className="btn btn-primary"><i className="fa fa-search"></i></button>
              <input type="search" className="form-control" placeholder="Search..." />
            </div>
            <hr />
            <ListGroup>
              {users.map((user) => (
                <ListGroup.Item key={user.id}>
                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                  <div className="about w-75">
                    <div className="name">{user.name}</div>
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
          <Col xs={9}>
            {!messages.length ?
              <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }} >
                <h1 className="text-muted" >Select a user to start chat</h1>
              </div> : (
                <div className="chat-space">
                  {messages.map((message) => (
                    <div key={message.id} className={`d-flex justify-content-${message.from.id === user?.id ? 'end' : 'start'} align-items-center`}>
                      <div className="d-flex flex-column justify-content-start align-items-start" >
                        <div className={`rounded p-2 m-2 w-100 ${message.from.id === user?.id ? 'bg-primary text-white' : 'bg-light'}`}>
                          <div className="d-flex justify-content-between" >
                            <div className="font-weight-bold" >{message.from.name}</div>
                            <div className="text-muted" >{message.date.toLocaleString()}</div>
                          </div>
                          <div>{message.message}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            <div className="input-group mb-0">
              <button type="button" className="btn btn-primary"><i className="fa fa-send"></i></button>
              <input type="text" className="form-control" placeholder="Enter text here..." />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default App


{/* <ul className="list-unstyled chat-list mt-2 mb-0">
                <li className="clearfix">
                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                  <div className="about">
                    <div className="name">Vincent Porter</div>
                    <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>
                  </div>
                </li>
                <li className="clearfix active">
                  <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                  <div className="about">
                    <div className="name">Aiden Chavez</div>
                    <div className="status"> <i className="fa fa-circle online"></i> online </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />
                  <div className="about">
                    <div className="name">Mike Thomas</div>
                    <div className="status"> <i className="fa fa-circle online"></i> online </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                  <div className="about">
                    <div className="name">Christian Kelly</div>
                    <div className="status"> <i className="fa fa-circle offline"></i> left 10 hours ago </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="avatar" />
                  <div className="about">
                    <div className="name">Monica Ward</div>
                    <div className="status"> <i className="fa fa-circle online"></i> online </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />
                  <div className="about">
                    <div className="name">Dean Henry</div>
                    <div className="status"> <i className="fa fa-circle offline"></i> offline since Oct 28 </div>
                  </div>
                </li>
              </ul> */}