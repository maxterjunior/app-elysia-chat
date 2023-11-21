// import { useEffect, useState } from "react";
// import { Col, Container, ListGroup, Row } from "react-bootstrap";

// function App() {

//   const [users, setUsers] = useState<{ id: number, name: string }[]>([])

//   useEffect(() => {
//     const users: { id: number, name: string }[] = []
//     for (let i = 0; i < 10; i++) {
//       users.push({ id: i, name: `User ${i}` })
//     }
//     setUsers(users)
//   }, [])

//   return (
//     <Container>
//       <h1 classNameName="my-3 text-center" >Chat App</h1>
//       <Container style={{ height: '80vh' }} >
//         <Row style={{ height: '100%' }}>
//           <Col xs={4}>
//             <h2>Usuarios</h2>
//             <ListGroup>
//               {users.map((user) => (
//                 <ListGroup.Item key={user.id} >{user.name}</ListGroup.Item>
//               ))}
//             </ListGroup>
//           </Col>
//           <Col xs={8} classNameName="border">
//             Mensajes
//           </Col>
//         </Row>
//       </Container>
//     </Container>
//   )
// }

// export default App


function App() {

  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group">
                {/* <span className="input-group-text"><i className="fa fa-search"></i></span> */}
                <button type="button" className="btn btn-primary"><i className="fa fa-search"></i></button>
                <input type="text" className="form-control" placeholder="Search..." />
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
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
              </ul>
            </div>
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">Aiden Chavez</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>
                  <div className="col-lg-6 hidden-sm text-right">
                    <a href="javascript:void(0);" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                    <a href="javascript:void(0);" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                    <a href="javascript:void(0);" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                    <a href="javascript:void(0);" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
                  </div>
                </div>
              </div>
              <div className="chat-history">
                <ul className="m-b-0">
                  <li className="clearfix">
                    <div className="message-data text-right">
                      <span className="message-data-time">10:10 AM, Today</span>
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                    </div>
                    <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                  </li>
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">10:12 AM, Today</span>
                    </div>
                    <div className="message my-message">Are we meeting today?</div>
                  </li>
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">10:15 AM, Today</span>
                    </div>
                    <div className="message my-message">Project has been already finished and I have results to show you.</div>
                  </li>
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <button type="button" className="btn btn-primary"><i className="fa fa-send"></i></button>
                  <input type="text" className="form-control" placeholder="Enter text here..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App