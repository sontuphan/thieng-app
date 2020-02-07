import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { Favorite, Message, Bookmark } from '@material-ui/icons';

import Comment from 'components/comment';

import styles from './styles';

class Project extends Component {

  onSend = (msg) => {
    console.log(msg);
  }

  render() {
    let { classes } = this.props;
    let { author, project, comments } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.project}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={8}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar alt={author.displayname} src={author.avatar} />
                </Grid>
                <Grid item>
                  <Typography variant="h3">{author.displayname}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container justify="flex-end" alignItems="center" spacing={2}>
                <Grid item>
                  <Typography>{project.createdAt}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className={classes.image}
                    style={{
                      backgroundImage: `url('${project.images[0]}')`,
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
            <Grid item xs={12}>
              <Typography>{project.status}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Comment user={this.props.auth} comments={comments} onSend={this.onSend} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid >

  }
}

Project.propTypes = {
  author: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
}

export default withStyles(styles)(Project);