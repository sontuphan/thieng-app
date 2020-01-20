import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { Favorite, Message, Bookmark } from '@material-ui/icons';

import Comment from 'components/comment';
import Drain from 'components/drain';

import utils from 'helpers/utils';

import styles from './styles';

class Project extends Component {

  onSend = (msg) => {
    console.log(msg);
  }

  render() {
    let { classes } = this.props;
    let { status, imgs, author } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item xs={12} md={10}>
            <Paper className={classes.project}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar alt={author.displayname} src={author.avatar} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">{author.displayname}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify="flex-end" alignItems="center" spacing={2}>
                    <Grid item>
                      <Typography>{dateformat()}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography>{status}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <div className={classes.image}
                        style={{
                          backgroundImage: `url('${imgs[0]}')`,
                          backgroundPosition: 'center top',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover'
                        }} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify="flex-end" alignItems="center" spacing={2}>
                    <Grid item>
                      <IconButton size="small">
                        <Favorite color="primary" fontSize="small" />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton size="small">
                        <Message fontSize="small" />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton size="small">
                        <Bookmark fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={8}>
            <Comment user={this.props.auth} comments={utils.dummy()[0].comments} onSend={this.onSend} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
    </Grid >

  }
}

Project.propTypes = {
  author: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  imgs: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
}

export default withStyles(styles)(Project);