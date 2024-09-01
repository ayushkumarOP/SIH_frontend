import React from 'react';
import styled from 'styled-components';
import Adddetails from '../components/Adddetails';
import Header from '../components/Header';
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Home = () => {
    return (
        <Container>
            <Header/>
            <Adddetails/>
        </Container>
    );
}

export default Home;
