import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { EditRounded, } from '@material-ui/icons';

import { ProductCard } from 'components/cards';

import { getItems } from 'modules/items.reducer';

import styles from './styles';


class Selling extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
    }
  }

  renderItems = () => {
    let { items: { data } } = this.props;
    if (!data || !data.length) return null;

    return <Grid container spacing={2}>
      {
        data.map(obj => <Grid key={obj._id} item xs={6} sm={4} md={3} lg={2}>
          <ProductCard _id={obj._id} />
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
            <Typography variant="h3">Selling</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditRounded />}
              onClick={() => this.setState({ visible: true })}
            >
              <Typography>Edit</Typography>
            </Button>
          </Grid>
        </Grid>
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
  getItems,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Selling)));