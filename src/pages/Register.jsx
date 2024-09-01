import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../assets/background.jpg';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top:0;
  left:0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${backgroundImage}) no-repeat center center;
    background-size: cover; 
    opacity: 0.75; 
    z-index: -1;
  }
`;


const Wrapper = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 40px 30px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;


const Title = styled.h1`
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
  color: rgb(51, 51, 51);
  text-align: center;
  font-size: 2rem; 
  font-weight: 600;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
`;


const Input = styled.input`
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #679bff;
    outline: none;
  }
`;


const SubTitle = styled.p`
  font-family: 'Poppins', sans-serif;
  color: rgb(51, 51, 51);
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 30px;
`;

const linkStyle = {
  textDecoration: 'underline', 
  color: '#679bff',
};


const InputButton = styled.input`
  font-size: 18px;
  padding: 15px 0;
  font-family: 'Poppins', sans-serif;
  border: none;
  background-color: #2575fc;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1a5bb8;
  }
`;

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      setUser({ name: "", email: "", password: "" });
      navigate("/login");
    }
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign Up</Title>
        <SubTitle>Already have an account? <Link to="/login" style={linkStyle}>Log in</Link></SubTitle>
        <Form onSubmit={registerUser}>
          <Input
            value={user.name}
            onChange={handleInput}
            name="name"
            type="text"
            placeholder="Name"
            required
          />
          <Input
            value={user.email}
            onChange={handleInput}
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <Input
            value={user.password}
            onChange={handleInput}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <InputButton type="submit" value="Create Account" />
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
