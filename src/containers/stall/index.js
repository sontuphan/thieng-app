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

import { getItemById, addItem } from 'modules/items.reducer';
import { getUser } from 'modules/user.reducer';
import { setCart } from 'modules/cart.reducer';
import { runEditor } from 'modules/editor.reducer';

import styles from './styles';
import utils from 'helpers/utils';

class Stall extends Component {
  constructor() {
    super();

    this.state = {
      object: {},
      author: {},
      name: '',
      amount: 1,
    }
  }

  componentDidMount() {
    return this.loadData();
  }

  loadData = () => {
    if (this.props.editable) {
      return this.setState({
        object: {},
        author: this.props.auth,
      });
    }
    else {
      return this.props.getItemById(this.props.id).then(re => {
        let item = re.data[0];
        return this.props.getUser(item.author);
      }).then(re => {
        let object = this.props.items.data[0];
        let author = this.props.users.data[0];
        this.setState({ object, author });
      }).catch(console.error);
    }
  }

  onAdd = () => {
    return this.props.runEditor().then(re => {
      if (!re) return console.log('No file added');
      let { object } = this.state;
      if (!object.files) object.files = [];
      object.files.push(re);
      return this.setState({ object });
    }).catch(console.error);
  }

  onEdit = (index) => {
    let { object } = this.state;
    let file = object.files[index];
    return this.props.runEditor(file).then(re => {
      if (!re) object.files = object.files.filter((o, i) => i !== index);
      else object.files[index] = re;
      return this.setState({ object });
    }).catch(console.error);
  }

  onName = (value) => {
    return this.setState({
      object: { ...this.state.object, name: value }
    });
  }

  onDescription1 = (value) => {
    return this.setState({
      object: { ...this.state.object, description1: value }
    });
  }

  onDescription2 = (value) => {
    return this.setState({
      object: { ...this.state.object, description2: value }
    });
  }

  onPrice = (value) => {
    if (value) value = value.split(',').join('');
    return this.setState({
      object: { ...this.state.object, price: parseInt(value) }
    });
  }

  onAmount = (amount) => {
    return this.setState({ amount });
  }

  onPublish = () => {
    let { object } = this.state;
    object = { ...object, tags: ['New'] }
    console.log(object);
  }

  onSave = () => {
    let { object } = this.state;
    object.files = object.files.map(file => file._id);
    return this.props.addItem(object).then(console.log).catch(console.error);
  }

  onDelete = () => {

  }

  onBuy = () => {
    let object = this.props.items.data[0];
    let { amount } = this.state;
    let item = { ...object, amount }
    this.props.setCart(item);
  }

  renderTag = () => {
    if (this.props.editable) {
      return <Grid container spacing={1}>
        <Grid item>
          <Chip color="primary" label="New" size="small" />
        </Grid>
      </Grid>
    }
    else {
      const { object: { tags } } = this.state;
      if (!tags) return null;
      return <Grid container spacing={1}>
        {
          tags.map(tag => <Grid item key={tag}>
            <Chip color="primary" label={tag} size="small" />
          </Grid>)
        }
      </Grid>
    }
  }

  renderAction = () => {
    if (this.props.editable) {
      return <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.onPublish}
            fullWidth
          >
            <Typography>Publish</Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={this.onSave}
            fullWidth
          >
            <Typography>Save</Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={this.onDelete}
            fullWidth
          >
            <Typography>Delete</Typography>
          </Button>
        </Grid>
      </Grid>
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
      {/* Shelf */}
      <Grid item xs={12} md={6}>
        <Shelf
          author={author}
          files={object.files}
          editable={this.props.editable}
          onAdd={this.onAdd}
          onEdit={this.onEdit}
        />
      </Grid>
      {/* Contents */}
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
              onChange={this.onName}
              placeholder="Tên sản phẩm"
            />
          </Grid>
          <Grid item xs={10} md={8}>
            <TextInput
              value={object.description1}
              onChange={this.onDescription1}
              placeholder="Giới thiệu sản phẩm"
            />
          </Grid>
          <Grid item xs={10} md={8}>
            <TextInput
              value={object.description2}
              onChange={this.onDescription2}
              placeholder="Mô tả kỹ thuật"
            />
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography
              variant="h4"
              className={classes.originalPrice}
            >{utils.prettyNumber(object.price, 'long') || '0'} vnd</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Grid container className={classes.noWrap} spacing={2}>
              <Grid item>
                <TextInput
                  variant="h1"
                  value={utils.prettyNumber(this.state.amount * object.price, 'long')}
                  placeholder="0"
                  onBlur={this.onPrice}
                />
              </Grid>
              <Grid item>
                <Typography variant="h1">vnd</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
          <Grid item xs={10} md={8}>
            <NumericInput
              variant="outlined"
              value={this.state.amount}
              onChange={this.onAmount}
              disabled={this.props.editable}
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
  editor: state.editor,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItemById, addItem,
  getUser,
  setCart,
  runEditor,
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