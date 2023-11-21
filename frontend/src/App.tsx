import { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import ChatPage, { User } from "./pages/chat.page";
import { login } from "./services/auth";

function App() {

  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.currentTarget));

    console.log(form)

    if (!form.username) return

    setLoading(true)
    login(form.username as string).then((res: any) => {
      const { data: { username, uuid }, token } = res as any
      console.log({ username, uuid, token })
      setUser({ username, uuid, token })
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Container>
      <h1 className="my-3 text-center d-flex align-items-center justify-content-center">
        {user ? <button className="btn btn-none fs-3 text-primary" onClick={() => setUser(undefined)}><i className="fa fa-arrow-left"></i></button> : ''}
        Chat App
      </h1>

      {!user ?
        <Form className="input-group" onSubmit={handleSubmit}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {
              loading ?
                <Spinner animation="border" role="status" style={{ width: '1rem', height: '1rem' }}></Spinner>
                : <i className="fa fa-send"></i>
            }
          </button>
          <input type="text" className="form-control" placeholder="Usernanme" name="username" disabled={loading} />
        </Form> :
        <ChatPage user={user} />
      }

    </Container>
  )
}

export default App