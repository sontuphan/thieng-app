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

import { Shuffle } from '@material-ui/icons';

import Drain from 'components/drain';
import Shelf from 'components/shelf';
import Minishelf from 'components/minishelf';
import Comment from 'components/comment';

import { getItemById } from 'modules/items.reducer';
import { getComments } from 'modules/comments.reducer';
import { getUser } from 'modules/user.reducer';
import { recommendItems } from 'modules/recommendation.reducer';

import styles from './styles';

class Item extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      amount: 1
    }
  }

  handleId = () => {
    let { match: { params: { id } } } = this.props;
    id = Number(id)
    if (typeof id !== 'number') id = 0;
    this.setState({ id });
  }

  loadData = () => {
    let item = null;
    this.props.getItemById(this.state.id).then(re => {
      item = re.data[0];
      return this.props.getUser(item.author);
    }).then(re => {
      return this.props.getComments(item.id);
    }).then(re => {
      return this.props.recommendItems(6);
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

  on3D = () => {
    console.log('Turn on 3D');
  }

  onSend = () => {
    console.log('Submit comment');
  }

  onShuffle = () => {
    this.props.recommendItems(6);
  }

  render() {
    let { classes } = this.props;
    let object = this.props.items.data[0];
    let comments = this.props.comments.data;
    let author = this.props.users.data[0];
    let recommendation = this.props.recommendation.data;

    if (!object || !comments || !author || !recommendation) return null;

    return <Grid container direction="row" justify="center" spacing={2}>
      <Grid item xs={12} md={6}>
        <Shelf author={author} objects={object.images} on3D={this.on3D} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Drain />
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Grid container spacing={1}>
              {
                object.tags.map(tag => <Grid item key={tag}>
                  <Chip className={classes.font} color="primary" label={tag} size="small" />
                </Grid>)
              }
            </Grid>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">{object.name}</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>{object.description1}</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>{object.description2}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">{object.price} {object.unit}</Typography>
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
          {recommendation.map((obj, index) => <Grid key={index} item xs={4} md={2} xl={1}>
            <Minishelf object={obj} />
          </Grid>)}
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" spacing={2}>
              <Grid item>
                <Button variant="outlined" color="primary" size="large" endIcon={<Shuffle />} onClick={this.onShuffle}>
                  <Typography>Khác</Typography>
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
            <Typography variant="h1">Nhận xét</Typography>
          </Grid>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
        </Grid>
        <Comment user={this.props.auth} comments={comments} onSend={this.onSend} />
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items,
  users: state.users,
  comments: state.comments,
  recommendation: state.recommendation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItemById,
  getComments,
  getUser,
  recommendItems,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Item)));