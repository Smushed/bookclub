import React from 'react';
import '../App.css';

import * as Routes from '../constants/routes';
import SignOutButton from './SignOutButton';
import { HomeLink } from './Home';
import { CreateGroupLink } from './CreateGroup';

import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import { Row, Col } from 'reactstrap';

const textsize = {
    fontSize: '25px',
    color: 'white',
};

const navStyle = {
    borderRadius: '0'
}

const padding = {
    marginLeft: '40px'
};

const padding2 = {
    textAlign: 'left',
};

const NavBar = (props) => {
    return (
        <Navbar color="dark" dark expand="md" style={navStyle}>
            <div style={textsize}>
                <Row>
                    <Col sm={{ size: '3', offset: 1 }}>
                        Logo Goes Here
                    </Col>
                    <Col xs={{ size: '4', offset: '1' }}>
                        {props.authUser ? (<section>
                            <Nav navbar>
                                <NavItem >
                                    <HomeLink />
                                </NavItem>
                                <NavItem >
                                    <CreateGroupLink />
                                </NavItem>
                                <NavItem>
                                    <SignOutButton />
                                </NavItem>
                            </Nav>
                        </section>
                        ) : (
                                <section>
                                    <Nav style={textsize}  >
                                        <div style={padding2}>
                                            <NavItem>
                                                <NavLink href={Routes.signin}>Sign In </NavLink>
                                            </NavItem>
                                        </div>
                                        <div style={padding}>
                                            <NavItem>
                                                <NavLink href={Routes.signup}>Sign Up</NavLink>
                                            </NavItem>
                                        </div>
                                    </Nav>
                                </section>
                            )
                        }
                    </Col>
                </Row>
            </div>
        </Navbar>
    );
};


export default NavBar;