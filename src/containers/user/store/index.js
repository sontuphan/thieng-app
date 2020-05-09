import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { AddBoxRounded, } from '@material-ui/icons';

import { ProductCard } from 'components/cards';
import Editor from './editor';

import { getItems } from 'modules/items.reducer';

import styles from './styles';


class UserStore extends Component {
  constructor() {
    super();

    this.state = {
      visible: true,
      items: [],
      page: 0,
      limit: 12,
    }
  }

  componentDidMount() {
    this.loadData();
    window.addEventListener('scroll', this.onTheEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onTheEnd);
  }

  onTheEnd = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
      return this.loadData();
  }

  loadData = () => {
    this.props.getItems(this.state.page, this.state.limit).then(re => {
      let newData = this.state.items.concat(re.data);
      return this.setState({ items: newData });
    }).catch(er => {
      return console.error(er);
    });
  }

  render() {
    let { classes } = this.props;
    let { items } = this.state;
    if (!items || !items.length) return null;

    return <Grid container justify="center" spacing={2}>

      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" justify="flex-end" spacing={2}>
          <Grid item>
            <Typography variant="h3">Store</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddBoxRounded />}
              onClick={() => this.setState({ visible: true })}
            >
              <Typography>New</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Editor
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {
            items.map((obj, i) => <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
              <ProductCard object={obj} />
            </Grid>)
          }
        </Grid>
      </Grid>

    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItems,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserStore)));