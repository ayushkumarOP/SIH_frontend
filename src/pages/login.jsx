import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  margin-top: 10px;
  padding: 20px;
  background-color: #ffffff8e;
`;

const Title = styled.p`
  margin: 0;
  font-family: Poppins;
  font-style: normal;
  color: rgb(51, 51, 51);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 33px; 
  font-weight: 500;
`;

const SubTitle = styled.p`
  margin: 0 0 32px 0;
  font-family: Poppins;
  font-style: normal;
  color: rgb(51, 51, 51);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const InputButton = styled.input`
  font-size: 22px;
  width: 100%;
  font-family: 'Poppins';
  border: none;
  margin-top: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #c0c0be;
  border-radius: 40px;
  color: white;
  cursor: pointer;
`;

const linkStyle = {
  textDecoration: 'underline',
  color: 'inherit',
};

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [user, setUserState] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`User ${data.name} logged in successfully`);

        setUser(true);
        navigate("/home");
        alert("Login Successful!!");
      } else {
        navigate("/login");
        alert("Invalid username or password. Please try again.");
        setUserState({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong.");
    }
  };

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
        <SubTitle>
          Don't have an account?
          <Link to="/register" style={linkStyle}>Sign up</Link>
        </SubTitle>
        <Form onSubmit={loginUser}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleInput}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInput}
            required
          />
          <InputButton type="submit" value="Log in" />
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
