import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${backgroundImage}) no-repeat center center;
    background-size: cover; /* Ensure the image covers the viewport */
    opacity: 0.75; /* Adjust opacity for transparency effect */
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
  margin: 0;
  font-family: 'Poppins', sans-serif;
  color: #333;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
`;

const SubTitle = styled.p`
  margin-top: 10px;
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
  color: #555;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-family: 'Poppins', sans-serif;
  outline: none;

  &:focus {
    border-color: #2575fc;
    box-shadow: 0 0 8px rgba(37, 117, 252, 0.2);
  }
`;

const InputButton = styled.button`
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  border: none;
  padding: 15px;
  background-color: #2575fc;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1a5bb8;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: #2575fc;
  font-weight: 500;
  &:hover {
    color: #1a5bb8;
  }
`;

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [user, setUserState] = useState({
    email: "",
    password: "",
  });

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.ok) {
      setUser(true);
      navigate("/home");
      alert("Login Successful!!");
    } else {
      navigate("/login");
      alert("Invalid username or password. Please try again.");
      setUserState({ email: "", password: "" });
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserState({
      ...user,
      [name]: value,
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <SubTitle>Don't have an account? <StyledLink to="/register">Sign up</StyledLink></SubTitle>
        <Form onSubmit={loginUser}>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleInput}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInput}
          />
          <InputButton type="submit">Log in</InputButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
