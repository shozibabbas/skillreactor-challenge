import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function SRNavbar() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>SkillReactor Challenge</Navbar.Brand>
        <Nav className='me-auto'>
          <NavLink className={'nav-link'} to={'/'}>Home</NavLink>
          <NavLink className={'nav-link'} to={'/upload'}>Upload Images</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default SRNavbar;