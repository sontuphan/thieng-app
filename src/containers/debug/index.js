import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import environment from 'relay/enviroment';
import Drain from 'components/drain';


class Debug extends Component {

  render() {
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={11} md={10}>
        <Typography>Hello</Typography>

        <QueryRenderer
          environment={environment}
          query={graphql`
            query debugQuery($userId: String!) {
              getUser(userId: $userId) {
                email
              }
            }
          `}
          variables={{ userId: "7354b3c1df8cbc309e1c688e26a9beaf7eef320b9b0058ec8b1ae0c9c6569ae7" }}
          render={({ er, props }) => {
            if (er) return <Typography>Error!</Typography>;
            if (!props) return <Typography>Loading...</Typography>;
            return <Typography>Email: {props.getUser.email}</Typography>;
          }}
        />

      </Grid>
    </Grid>
  }
}

export default withRouter(Debug);