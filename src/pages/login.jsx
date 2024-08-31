// import React, { useState, useEffect } from 'react'
// import { Form, Input, message } from "antd";  
// import { Link,useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Spinner from '../components/Spinner';

// const Login = () => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);

//     // form submit
//     const submitHandler = async (values) => {
//         try {
//             setLoading(true);
//             const {data} = await axios.post('users/login',values)
//             setLoading(false);
//             message.success("Login Success");
//             localStorage.setItem('user',JSON.stringify({...data.user,password:''}))   //not storing password in local storage
//             navigate('/');
//         } catch (error) {
//             setLoading(false);
//             message.error('something went wrong');
//         }
//     };

//     //prevent for logged in user
//     useEffect(() => {
//         if(localStorage.getItem("user")){
//             navigate('/')
//         }
//     }, [navigate]);

//     return (
//         <div className='register-page-container'>
//             <h1>Invoice App</h1>
//             <div className="register-page">
//                 { loading && <Spinner /> }
//                 <Form layout="vertical" onFinish={submitHandler}>
//                     <h1>Login</h1>
//                     <Form.Item label="Email" name="email" rules={[{required: true, message: 'Please input your email!'}]}>
//                         <Input type="email" />
//                     </Form.Item>
//                     <Form.Item label="Password" name="password" rules={[{required: true, message: 'Please input your password!'}]}>
//                         <Input type="password" />
//                     </Form.Item>
//                     <div className="d-flex justify-content-between">
//                         <Link to="/register">Not a user? Click here to register</Link>
//                         <button className="btn btn-primary" type="submit" style={{margin:'5px'}}>Login</button>
//                     </div>
//                 </Form>
//             </div>
//         </div>        
//     )
// }

// export default Login

import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  color: rgb(25, 24, 24);
  font-size: 16px;
  font-family: Noto Sans;
  flex: 1;
  padding: 10px;
  width: 38vw; 
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

const Label = styled.label`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  font-family: 'Poppins', sans-serif;
  color: rgb(102, 102, 102);
  background-color: rgba(0, 0, 0, 0);
  text-align: left;
  text-indent: 0px;
  line-height: normal;
  text-decoration: none solid rgb(102, 102, 102);
`;
const Labelbox = styled.label`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  font-family: 'Poppins';
  text-align: left;
  text-indent: 0px;
  line-height: normal;
`;
const InputBox = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-right: 10px;
`;

const DivIn = styled.div`
  margin-top: 32px;
`;

const linkStyle = {
  marginTop: '10px',
  marginLeft: '390px',
  textDecoration: 'underline', 
  color: 'inherit',
  fontSize: '16px',      
  fontFamily: 'Poppins'    
};
const linkStyle2 = {
  textDecoration: 'underline', 
  color: 'inherit'   
};

const Login = () => {
  const navigate = useNavigate();

  const [user,setUser]=useState({
    email:"",
    password:"",
  });
  
  async function loginUser(event) {
    event.preventDefault()
		const response = await fetch('http://localhost:8080/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
    console.log(response);  
		const data = await response.json()
    console.log(data);

		if(response.ok){
      setUser({email:"", password:""});
      navigate("/");
      alert("Login Successful!!")
    }
    else {
      
      navigate("/login");
      alert("Invalid username or password. Please try again.");
      setUser({ email: "", password: "" });
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
        <Title>Log in</Title>
        <SubTitle>Don't have an account?<Link to="/Signup" style={linkStyle2}>Sign up</Link></SubTitle>
        <Form onSubmit={loginUser}>
          <DivIn>
          <Label>Email address or Username</Label>
          <Input value={user.email} onChange={handleInput} type="text" name="email"/>
          </DivIn>
          <DivIn>
          <Label>Password</Label>
          <Input value={user.password} onChange={handleInput} type="password" name="password"/>
          </DivIn>
            <InputButton type="submit" value="Log in" />
        </Form>
      </Wrapper>
    </Container>
    </div>
  )
}

export default Login