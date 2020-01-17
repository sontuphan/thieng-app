import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { ArrowForwardIos } from '@material-ui/icons';

import Drain from 'components/drain';
import Showcase from 'components/showcase';
import MiniShowcase from 'components/minishowcase';
import Comment from 'components/comment';

import utils from 'helpers/utils';

import styles from './styles';

const DEFAULT_STATE = {
  amount: 1,
  recommendation: [0, 1, 2, 3, 4, 5],
  showing: 0,
  objects: utils.dummy(),
}
class Item extends Component {
  constructor() {
    super();

    this.state = { ...DEFAULT_STATE }
  }

  handleId = () => {
    let { match: { params: { id } } } = this.props;
    id = Number(id)
    if (typeof id !== 'number') id = 0;
    this.setState({ ...DEFAULT_STATE, showing: id });
  }

  componentDidMount() {
    this.handleId();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.match) !== JSON.stringify(this.props.match)) {
      this.handleId();
    }
  }

  on3D = () => {
    console.log('Turn on 3D');
  }

  onSend = () => {
    console.log('Submit comment');
  }

  onMore = () => {
    let recommendation = JSON.parse(JSON.stringify(this.state.recommendation));
    let last = recommendation[recommendation.length - 1];
    for (let i = 0; i < 6; i++) {
      recommendation.push(last + i + 1);
    }
    this.setState({ recommendation });
  }

  render() {
    // let { classes } = this.props;
    let { objects, showing } = this.state;

    return <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12} md={6}>
        <Showcase author={objects[showing].author} objects={objects[showing].images} on3D={this.on3D} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Drain />
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Grid container spacing={1}>
              {
                objects[showing].tags.map(tag => <Grid item key={tag}>
                  <Chip color="primary" label={tag} size="small" />
                </Grid>)
              }
            </Grid>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">{objects[showing].name}</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>{objects[showing].description1}</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>{objects[showing].description2}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">{objects[showing].price} {objects[showing].unit}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
          <Grid item xs={10} md={8}>
            <TextField label="Số lượng" size="small" variant="outlined" color="secondary" value={this.state.amount} fullWidth />
          </Grid>
          <Grid item xs={10} md={8}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" size="large" fullWidth>
                  <Typography>Mua</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary" size="large" fullWidth>
                  <Typography>Huỷ</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1">Gợi ý</Typography>
          </Grid>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
          {this.state.recommendation.map(i => <Grid key={i} item xs={4} md={2} xl={1}>
            <MiniShowcase object={objects[1 - showing]} />
          </Grid>)}
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" spacing={2}>
              <Grid item>
                <Button variant="outlined" color="primary" size="large" endIcon={<ArrowForwardIos />} onClick={this.onMore}>
                  <Typography>Nhiều hơn</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={10}>
        <Comment user={this.props.auth} comments={objects[showing].comments} onSend={this.onSend} />
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Item)));