import React from 'react';
import './Home.css';
import Welcome from './Welcome';
import { Helmet } from 'react-helmet-async';

const Home = () => {

    return (
        <>
        <Helmet>
            <title> Inicio - Live Stock Provider </title>
        </Helmet>
        <Welcome/>
        </>
    );
};

export default Home;
