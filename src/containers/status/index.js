import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';


import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { ShoppingCartRounded, ShareRounded, ExpandMoreRounded } from '@material-ui/icons';

import { StatusCard } from 'components/cards';
import Gallery from 'components/gallery';
import { BottomDrawer } from 'components/drawers';
import { SingleRichComment, RichComment } from 'components/comments';
import Drain from 'components/drain';

import { getProjects } from 'modules/projects.reducer';

import styles from './styles';

class Status extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      isLoading: false,
    }
  }

  onComment = (comment) => {
    console.log(comment);
  }

  onBuy = () => {
    this.props.history.push(`/mall/${this.props.project.id}`);
  }

  onBookmark = () => {
    console.log(this.props.id)
  }

  onMore = () => {
    this.setState({ isLoading: true }, () => {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 3000);
    });
  }

  renderFullStatus = () => {
    let { classes, project } = this.props;
    let comments = project.comments;

    return <BottomDrawer
      visible={this.state.visible}
      onClose={() => this.setState({ visible: false })}
    >
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} md={11} lg={10}>
          <Grid container spacing={this.props.ui.width >= 960 ? 4 : 2}>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Gallery project={project} />
                </Grid>
                <Grid item xs={12}>
                  <Drain />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={10} md={12}>
                  <Grid container justify="space-between" alignItems="center" spacing={2}>
                    <Grid item>
                      <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ShoppingCartRounded fontSize="small" />}
                            onClick={this.onBuy}
                            size="small"
                          >
                            <Typography noWrap>Mua</Typography>
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="outlined"
                            startIcon={<ShareRounded fontSize="small" />}
                            onClick={this.onBookmark}
                            size="small"
                          >
                            <Typography noWrap>Chia sẻ</Typography>
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <IconButton size="small">
                        <ExpandMoreRounded fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10} md={12}>
                  <Divider />
                </Grid>
                <Grid item xs={10} md={12}>
                  <SingleRichComment
                    avatar={this.props.auth.avatar}
                    displayname={this.props.auth.displayname}
                    comment={project.status}
                    createdAt={project.createdAt}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Drain small />
                </Grid>
                <Grid item xs={10} md={12}>
                  <RichComment
                    user={this.props.auth}
                    comments={comments}
                    onSend={this.onComment}
                    onMore={this.onMore}
                    isLoading={this.state.isLoading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Drain small />
                </Grid>
              </Grid>
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
        auth={this.props.auth}
        project={this.props.project}
        onClick={() => this.setState({ visible: true })}
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