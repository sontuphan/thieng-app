import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';
import { RichComment } from 'components/comments';
import Stall from 'containers/stall';
import Recommendation from 'containers/recommendation';

import { getItemById } from 'modules/items.reducer';
import { getComments } from 'modules/comments.reducer';

import styles from './styles';

class Item extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      amount: 1,
      isLoading: false,
    }
  }

  handleId = () => {
    let { match: { params: { id } } } = this.props;
    id = Number(id)
    if (typeof id !== 'number') id = 0;
    this.setState({ id });
  }

  loadData = () => {
    this.props.getItemById(this.state.id).then(re => {
      let item = re.data[0];
      return this.props.getComments(item.id);
    }).catch(er => {
      return console.error(er);
    });
  }

  componentDidMount() {
    this.handleId();
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.match) !== JSON.stringify(this.props.match))
      this.handleId();
    if (prevState.id !== this.state.id)
      this.loadData();
  }

  onSend = () => {
    console.log('Submit comment');
  }

  onMore = () => {
    this.setState({ isLoading: true }, () => {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 3000);
    });
  }

  render() {
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Stall id={this.state.id} />
      </Grid>

      <Grid item xs={12}>
        <Drain />
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={10}>
            <Recommendation id={this.state.id} quatity={6} />
          </Grid>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
        </Grid>
      </Grid>


      <Grid item xs={12} md={6}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Typography variant="h2">Nhận xét</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <RichComment
              user={this.props.auth}
              comments={this.props.comments.data}
              onSend={this.onSend}
              onMore={this.onMore}
              isLoading={this.state.isLoading}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Drain small />
        </Grid>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  comments: state.comments,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItemById,
  getComments,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Item)));