import React from 'react';
import Navbar from './Navbar';
import Content from './Content';

const Home = ({ username, onLogout }) => {
  return (
    <>
      <Navbar username={username} />
      <Content />
     
    </>
  );
};

export default Home;
