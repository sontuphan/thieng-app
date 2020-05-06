import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Drain from 'components/drain';
import Shelf from 'components/shelf';
import { TextInput, NumericInput } from 'components/inputs';

import { getItemById } from 'modules/items.reducer';
import { getUser } from 'modules/user.reducer';
import { setCart } from 'modules/cart.reducer';

import styles from './styles';
import utils from 'helpers/utils';

class Stall extends Component {
  constructor(props) {
    super();

    this.state = {
      id: props.id,
      amount: 1,
      isLoading: false,
    }
  }

  loadData = () => {
    if (this.props.editable) {
      return this.setState({
        object: {},
        author: { ...this.props.auth, link: '#' },
      });
    }
    else {
      return this.props.getItemById(this.state.id).then(re => {
        let item = re.data[0];
        return this.props.getUser(item.author);
      }).then(re => {
        let object = this.props.items.data[0];
        let author = this.props.users.data[0];
        this.setState({ object, author });
      }).catch(er => {
        return console.error(er);
      });
    }
  }

  componentDidMount() {
    return this.loadData();
  }

  onAmount = (amount) => {
    return this.setState({ amount });
  }

  onBuy = () => {
    let object = this.props.items.data[0];
    let { amount } = this.state;
    let item = { ...object, amount }
    this.props.setCart(item);
  }

  renderTag = () => {
    if (this.props.editable) {
      return null;
    }
    else {
      return <Grid container spacing={1}>
        {
          this.state.object.tags.map(tag => <Grid item key={tag}>
            <Chip color="primary" label={tag} size="small" />
          </Grid>)
        }
      </Grid>
    }
  }

  renderAction = () => {
    if (this.props.editable) {
      return null;
    }
    else {
      return <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.onBuy}
            fullWidth
          >
            <Typography>Mua</Typography>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
          >
            <Typography>Huỷ</Typography>
          </Button>
        </Grid>
      </Grid>

    }
  }

  render() {
    let { classes } = this.props;
    let { object, author } = this.state;

    if (!object || !author) return null;
    return <Grid container spacing={2}>

      <Grid item xs={12} md={6}>
        <Shelf
          author={author}
          objects={object.images}
          editable={this.props.editable}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Drain />
          </Grid>
          <Grid item xs={10} md={8}>
            {this.renderTag()}
          </Grid>
          <Grid item xs={10} md={8}>
            <TextInput
              variant="h1"
              value={object.name}
            />
          </Grid>
          {/* <Grid item xs={10} md={8}>
            <Typography>{object.description1}</Typography>
          </Grid> */}
          {/* <Grid item xs={10} md={8}>
            <Typography>{object.description2}</Typography>
          </Grid> */}
          {/* <Grid item xs={12}>
            <Drain />
          </Grid> */}
          {/* <Grid item xs={10} md={8}>
            <Typography variant="h4" className={classes.originalPrice}>{utils.prettyNumber(object.price, 'long')} {object.unit}</Typography>
          </Grid> */}
          {/* <Grid item xs={10} md={8}>
            <Typography variant="h1">{utils.prettyNumber(this.state.amount * object.price, 'long')} {object.unit}</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <Drain />
          </Grid>
          <Grid item xs={10} md={8}>
            <NumericInput
              variant="outlined"
              value={this.state.amount}
              onChange={this.onAmount}
            />
          </Grid>
          <Grid item xs={10} md={8}>
            {this.renderAction()}
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items,
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItemById,
  getUser,
  setCart,
}, dispatch);

Stall.defaultProps = {
  editable: false
}

Stall.propTypes = {
  id: PropTypes.number.isRequired,
  editable: PropTypes.bool,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Stall)));