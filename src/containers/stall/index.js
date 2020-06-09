import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';
import { TextInput, NumericInput } from 'components/inputs';
import Shelf from './shelf';
import Tags from './tags';
import Categories from './categories';

import { getFile, getItem } from 'modules/bucket.reducer';
import { setCart } from 'modules/cart.reducer';
import { runEditor } from 'modules/editor.reducer';
import { EditableButtonGroup, BuyableButtonGroup } from './buttons';

import styles from './styles';
import utils from 'helpers/utils';

class Stall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      object: {
        tags: ['New'],
        fileIds: [],
      },
      userId: props.auth._id,
      amount: 1,
    }
  }

  componentDidMount() {
    return this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { itemId } = this.props;
    if (!isEqual(prevProps.itemId, itemId)) {
      this.loadData();
    }
  }

  /**
   * Data loader
   */
  loadData = () => {
    const { itemId, editable } = this.props;
    if (!this.props.itemId) return;
    return this.props.getItem(itemId).then(object => {
      if (editable) return this.setState({ object });
      return this.setState({ object, userId: object.userId });
    }).catch(console.error);
  }

  /**
   * Create a new item
   */
  onAdd = () => {
    return this.props.runEditor().then(re => {
      if (!re) return console.log('No file added');
      let { object } = this.state;
      if (!object.fileIds) object.fileIds = [];
      object.fileIds.push(re._id);
      return this.setState({ object });
    }).catch(console.error);
  }
  onEdit = (index) => {
    let { object } = this.state;
    let fileId = object.fileIds[index];
    return this.props.getFile(fileId).then(file => {
      return this.props.runEditor(file);
    }).then(re => {
      if (!re.source) object.fileIds = object.fileIds.filter((f, i) => i !== index);
      else object.fileIds[index] = re._id;
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
    const object = { ...this.state.object, price: parseInt(value) }
    return this.setState({ object });
  }
  onCategory = (value) => {
    return this.setState({
      object: { ...this.state.object, category: value }
    });
  }

  /**
   * Creation actions
   */
  onPublish = () => {
    const { itemId, onAdd, onUpdate } = this.props;
    let { object } = this.state;
    object = { ...object, status: 'selling' }
    if (itemId) return onUpdate(object);
    return onAdd(object);
  }
  onSave = () => {
    const { itemId, onAdd, onUpdate } = this.props;
    let { object } = this.state;
    object = { ...object, status: 'creating' }
    if (itemId) return onUpdate(object);
    return onAdd(object);
  }
  onDelete = () => {
    const { itemId, onAdd, onUpdate } = this.props;
    let { object } = this.state;
    object = { ...object, status: 'archived' }
    if (itemId) return onUpdate(object);
    return onAdd(object);
  }

  /**
   * Selling actions 
   */
  onAmount = (amount) => {
    return this.setState({ amount });
  }
  onBuy = () => {
    const { setCart } = this.props;
    const { amount, object } = this.state;
    return setCart({
      _id: object._id,
      price: object.price,
      userId: object.userId,
      amount,
    });
  }
  onCancel = () => {
    return console.log('onCancel');
  }

  render() {
    const { classes } = this.props;
    const { object, userId } = this.state;

    if (!object || !userId) return null;
    return <Grid container spacing={2}>
      {/* Shelf */}
      <Grid item xs={12} md={6}>
        <Shelf
          userId={userId}
          fileIds={[...object.fileIds]} /* Tricky copy array to update component */
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
            <Tags tags={object.tags} />
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
            <Grid container spacing={2}>
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
            {this.props.editable ? <Categories
              value={object.category}
              onChange={this.onCategory}
            /> : <NumericInput
                variant="outlined"
                value={this.state.amount}
                onChange={this.onAmount}
                disabled={this.props.editable}
              />}
          </Grid>
          <Grid item xs={10} md={8}>
            {this.props.editable ?
              <EditableButtonGroup
                onPublish={this.onPublish}
                onSave={this.onSave}
                onDelete={this.onDelete}
              /> : <BuyableButtonGroup
                onBuy={this.onBuy}
                onCancel={this.onCancel}
              />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  editor: state.editor,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getFile, getItem,
  setCart,
  runEditor,
}, dispatch);

Stall.defaultProps = {
  onAdd: () => { },
  onUpdate: () => { },
  editable: false,
}

Stall.propTypes = {
  itemId: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  onUpdate: PropTypes.func,
  editable: PropTypes.bool,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Stall)));