import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { FavoriteRounded, ShareRounded, MoreHorizRounded } from '@material-ui/icons';

import { ImageCard } from 'components/cards';
import { LiteComment } from 'components/comments';

import styles from './styles';
import utils from 'helpers/utils';

class StatusCard extends Component {

  render() {
    let { classes } = this.props;
    let { author, auth, project } = this.props;

    return <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper elevation={0} className={classes.paper}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={10}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Avatar className={classes.avatar} alt={author.displayname} src={author.avatar} />
                </Grid>
                <Grid item>
                  <Typography>{author.displayname}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="flex-end" alignItems="center" spacing={2}>
                <Grid item>
                  <IconButton size="small">
                    <MoreHorizRounded fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} onClick={this.props.onClick}>
                  <ImageCard image={project.thumbnail} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Typography style={{ fontWeight: "bold" }}>{utils.prettyNumber(12345, 'short')} lượt thích</Typography>
            </Grid>
            <Grid item xs={4}>
              <Grid container justify="flex-end" alignItems="center" spacing={1}>
                <Grid item>
                  <IconButton size="small">
                    <FavoriteRounded color="primary" fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton size="small">
                    <ShareRounded fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>{project.createdAt}</strong> - {project.status}</Typography>
            </Grid>
            <Grid item xs={12}>
              <LiteComment
                user={auth}
                comments={project.comments}
                onSend={this.props.onComment}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid >
  }
}

StatusCard.defaultProps = {
  onClick: () => { },
  onComment: () => { },
}

StatusCard.propTypes = {
  auth: PropTypes.object,
  author: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onComment: PropTypes.func,
}

export default withStyles(styles)(StatusCard);