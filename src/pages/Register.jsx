import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
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

const linkStyle = {
  textDecoration: 'underline', 
  color: 'inherit'
};

const InputBox = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-right: 10px;
`;

const PrivacyPolicy = styled.b`
  margin-left: 37px;
`;

const InputButton = styled.input`
  font-size:22px;
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

const Register = () => {
  const navigate = useNavigate();

  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
  });

	async function registerUser(event) {
    event.preventDefault()
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if(response.ok){
        setUser({name:"", email:"", password:""});
        navigate("/login");
      }
	}
  
  const handleInput = (e) =>{
    let name=e.target.name;
    let value= e.target.value;
    console.log(e);

    setUser({
      ...user,
      [name]:value,
    });
  };

  

  return (
    <div>
      <Container>
      <Wrapper>
        <Title>Sign up</Title>
        
        <SubTitle>Already have an account?<Link to="/Login" style={linkStyle}>Log in</Link></SubTitle>
        <Form onSubmit={registerUser}>
          <Input value={user.name} onChange={handleInput} name="name" type="text" placeholder="name" />
          <Input value={user.email} onChange={handleInput } name="email" type="email" placeholder="email" />
          <Input value={user.password} onChange={handleInput} name="password" type="password" placeholder="password" />
          
          <InputButton
              type="submit"
              value="Create Account"
            />
        </Form>
      </Wrapper>
    </Container>
    </div>
  )
}

export default Register