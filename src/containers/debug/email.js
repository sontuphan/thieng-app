import React, { Component } from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';


class Email extends Component {

  render() {
    let { user } = this.props;
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={11} md={10}>
        <Typography>Email: {user.email}</Typography>
      </Grid>
    </Grid>
  }
}

export default createFragmentContainer(Email, {
  user: graphql`
    fragment email_user on User {
      email
    }
  `,
});