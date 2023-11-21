import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

function App() {

  const [users, setUsers] = useState<{ id: number, name: string }[]>([])

  useEffect(() => {
    const users: { id: number, name: string }[] = []
    for (let i = 0; i < 10; i++) {
      users.push({ id: i, name: `User ${i}` })
    }
    setUsers(users)
  }, [])

  return (
    <Container>
      <h1 className="my-3 text-center" >Chat App</h1>
      <Container style={{ height: '80vh' }} >
        <Row style={{ height: '100%' }}>
          <Col xs={4}>
            <h2>Usuarios</h2>
            <ListGroup>
              {users.map((user) => (
                <ListGroup.Item key={user.id} >{user.name}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col xs={8} className="border">
            Mensajes
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default App
