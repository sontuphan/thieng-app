import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { EmailRounded, PhoneRounded } from '@material-ui/icons';

import styles from './styles';

class Support extends Component {
  constructor() {
    super();

    this.state = {
      email: 'thiengviet@gmail.com',
      phone: '078.3333.689'
    }
  }

  render() {
    const { classes } = this.props;
    return <Grid container className={classes.action} spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} justify="center" spacing={2}>
          <Grid item>
            <Button
              color="primary"
              href={`mailto:${this.state.email}`}
              target="_blank"
              startIcon={<EmailRounded />}
            >
              <Typography className={classes.text}>Gửi email hỗ trợ</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              href={`tel:${this.state.phone}`}
              startIcon={<PhoneRounded />}
            >
              <Typography className={classes.text}>Gọi hỗ trợ</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.footer} justify="center" spacing={2}>
          <Grid item>
            <Typography
              color="textSecondary"
              align="center"
              className={classes.text}
            >Email: {this.state.email} - Điện thoại: {this.state.phone}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  }
}

export default withStyles(styles)(Support);