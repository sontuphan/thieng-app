import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';


import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { ShoppingCart, Share } from '@material-ui/icons';

import Drain from 'components/drain';
import { StatusCard } from 'components/cards';
import Gallery from 'components/gallery';
import Comment from 'components/comment';
import { BottomDrawer } from 'components/drawers';

import { getProjects } from 'modules/projects.reducer';

import styles from './styles';

class Status extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
    }
  }

  onComment = (comment) => {
    console.log(comment);
  }

  onBuy = () => {
    this.props.history.push(`/mall/${this.props.id}`);
  }

  onBookmark = () => {
    console.log(this.props.id)
  }

  renderFullStatus = () => {
    let project = this.props.project;
    let comments = project.comments;

    return <BottomDrawer
      visible={this.state.visible}
      onClose={() => this.setState({ visible: false })}
    >
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} md={10} lg={8}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar alt={this.props.auth.displayname} src={this.props.auth.avatar} />
                </Grid>
                <Grid item xs={8}>
                  <Typography noWrap>{this.props.auth.displayname}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end" spacing={2}>
                <Grid item>
                  <IconButton color="secondary" size="small" onClick={this.onBuy}>
                    <ShoppingCart />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="secondary" size="small" onClick={this.onBookmark}>
                    <Share />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <Gallery project={project} />
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <Drain />
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography variant="h1">Nhận xét</Typography>
            </Grid>
            <Drain small />
            <Grid item xs={12} md={10}>
              <Comment user={this.props.auth} comments={comments} onSend={this.onComment} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </BottomDrawer >
  }

  render = () => {
    return <Fragment>
      <StatusCard
        author={this.props.auth}
        project={this.props.project}
        onClick={() => this.setState({ visible: true })}
        commentSession={<Grid item xs={12}>
          <Comment
            user={this.props.auth}
            comments={this.props.project.comments}
            onSend={this.onComment}
            dense
          />
        </Grid>}
      />
      {this.renderFullStatus()}
    </Fragment>
  }

}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProjects,
}, dispatch);

Status.propTypes = {
  project: PropTypes.object.isRequired,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Status)));