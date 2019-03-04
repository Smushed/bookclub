import React from 'react';
import { Button } from 'reactstrap';
import { withFirebase } from './Firebase';

const textsize = {
  fontSize: "25px"
}

const SignOutButton = ({ firebase }) => (
  <Button style={textsize} color='link' onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);