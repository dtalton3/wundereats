import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import {Link} from 'react-router-dom';
import grub from './grub.jpeg';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    //attempt1
<div className="Login-header">  
      <Form className="Form" onSubmit={handleSubmit}>

        <img src={grub}></img>
        <br />

        <Form.Group size="lg" controlId="email">
          <Form.Label className="Login-titles">Username</Form.Label>
          <br/>
          <Form.Control className="Input" type="email" placeholder="Enter username or email" />
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label className="Login-titles">Password</Form.Label>
          <br/>
          <Form.Control className="Input" type="password" placeholder="Enter password" />
        </Form.Group>

        <Link className="Login-subtitles">Forgot username or password?</Link>
        <br />
        <br />
        
        <Button className="Login-button" variant="primary" type="submit" disabled={!validateForm()}>
          <Link className="Link-style" to="/home">LOG IN</Link>
        </Button>

        <Link className="Login-subtitles">New user? Create an account</Link>

      </Form> 
      
      {/* Remmber me label*/
        /* <Form.Group>
          <Form.Check className="Login-subtitles" type="checkbox" label="Remember me" />
        </Form.Group> */}
    </div>
  );
}
export default Login;