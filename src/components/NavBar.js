import React, { Component } from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" style={{ marginBottom:"20px" }}>
                <Container>
                    <Navbar.Brand target="_blank" href="https://www.youtube.com/watch?v=zhf1pIl007o&list=LL&index=1">PokemonAPI</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}