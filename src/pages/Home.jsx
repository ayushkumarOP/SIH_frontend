import React from 'react';
import styled from 'styled-components';
import Adddetails from '../components/Adddetails';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Home = () => {
    return (
        <Container>
            <Adddetails/>
        </Container>
    );
}

export default Home;
