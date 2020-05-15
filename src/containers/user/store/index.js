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

import { getItem } from 'modules/items.reducer';

import styles from './styles';


class UserStore extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      items: [],
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
    this.props.getItem().then(re => {
      let { items } = this.state;
      if (re) items = items.concat(re);
      return this.setState({ items });
    }).catch(er => {
      return console.error(er);
    });
  }

  renderItems = () => {
    let { items } = this.state;
    if (!items || !items.length) return null;

    return <Grid container spacing={2}>
      {
        items.map(obj => <Grid key={obj._id} item xs={6} sm={4} md={3} lg={2}>
          <ProductCard {...obj} />
        </Grid>)
      }
    </Grid>
  }

  render() {
    let { classes } = this.props;

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
        {this.renderItems()}
      </Grid>

    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItem,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserStore)));