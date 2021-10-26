
import { Button, Form, Col, Alert, Container } from 'react-bootstrap';
import { useRealmApp } from "../RealmApp";
import * as Realm from "realm-web";
import { useRef, useState } from 'react';


export const Login: React.FC = () => {
  const app = useRealmApp()
  const [loginError, setLoginError] = useState(null);
  const inputUsername = useRef<HTMLInputElement | null>()
  const inputPassword = useRef<HTMLInputElement | null>()

  const handleLogin = async () => {
    try {
      await app.logIn(Realm.Credentials.emailPassword(inputUsername.current.value, inputPassword.current.value))
      // await app.logIn(Realm.Credentials.apiKey(inputApiKey.current.value))
    } catch (error) {
      console.log(`got error! ${error}`,);
      setLoginError(`The username/password provided is not valid.`);
    }
  }

  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      handleLogin();
      event.preventDefault();
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  // const plants = mongodb.db("example").collection<Plant>("plants");
console.log(`mongodb`, mongodb)
    }
  }

  const renderErrorMessage = () => {
    return loginError ? <Alert variant='danger'>{loginError}</Alert> : null
  }

  return <Container className="my-auto  mx-auto ">
    {renderErrorMessage()}
    <Form >
      <Col >
        <Form.Row className="my-4 align-items-center">
          <Form.Text className="mb-1" muted>
            Username
          </Form.Text>
          <Form.Control  ref={inputUsername} onKeyDown={handleKeyDown}/>
        </Form.Row>
        <Form.Row className="my-4 align-items-center">
          <Form.Text className="mb-1" muted>
            Password
          </Form.Text>
          <Form.Control ref={inputPassword} onKeyDown={handleKeyDown}/>
        </Form.Row>
        <Form.Row className="my-4 align-items-center">
          <Button onClick={handleLogin}>Log In</Button>
        </Form.Row>
      </Col>
    </Form>
  </Container>
}

export const Logout: React.FC = () => {
  const app = useRealmApp();

  const handleLogout = async () => {
    try {
      await app.logOut()
    } catch (error) {
      console.log(`An error ocurred during log out.`, error);
    }
  }

  return <Button onClick={handleLogout}>Log Out</Button>

}

// // Create a component that displays the given user's details
// const UserDetail: React.FC<{ user: Realm.User }> = ({ user }) => {
//   return (
//     <div>
//       <h1>Logged in with anonymous id: {user.id}</h1>
//     </div>
//   );
// }