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
import { TextInput, NumericInput, ParagraphInput } from 'components/inputs';
import Shelf from './shelf';
import Tags from './tags';
import Categories from './categories';
import Thumbnail from './thumbnail';
import Discount from './discount';
import { EditableButtonGroup, BuyableButtonGroup } from './buttons';

import { getFile, getItem } from 'modules/bucket.reducer';
import { setCart } from 'modules/cart.reducer';
import { runEditor } from 'modules/editor.reducer';
import {
  setInstorageFile, updateInstorageFile, pushInstorageFile,
  updateFile, unsetInstorageFile,
} from 'modules/file.reducer';

import styles from './styles';
import utils from 'helpers/utils';

class Stall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      object: {
        tags: ['New'],
        fileIds: [],
        thumbnailId: null,
        category: 'others',
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
  calculatePrice = (object) => {
    const { price, tags } = object || {};
    if (!price) return 0;
    let discount = 0;
    tags.forEach(tag => {
      if (tag.slice(-1) === '%')
        discount = parseInt(tag.slice(0, -1)) / 100 || 0;
    });
    return price * (1 - discount);
  }

  /**
   * Create a new item
   */
  onAddFile = (file) => {
    return this.props.setInstorageFile(file).then(re => {
      return this.props.runEditor(re);
    }).then(re => {
      return this.props.updateInstorageFile(re);
    }).then(re => {
      return this.props.pushInstorageFile();
    }).then(re => {
      if (!re) return console.error('No file added');
      let { object } = this.state;
      if (!object.fileIds) object.fileIds = [];
      object.fileIds.push(re._id);
      if (!object.thumbnailId) object.thumbnailId = re._id;
      return this.setState({ object });
    }).catch(er => {
      return this.props.unsetInstorageFile();
    });
  }
  onEditFile = (index) => {
    let { object } = this.state;
    let fileId = object.fileIds[index];
    return this.props.getFile(fileId).then(file => {
      return this.props.runEditor(file);
    }).then(re => {
      return this.props.updateFile(re);
    }).then(() => {
      // Nothing
    }).catch(console.error);
  }
  onThumbnail = (index) => {
    let { object } = this.state;
    object.thumbnailId = object.fileIds[index];
    return this.setState({ object });
  }
  onDiscount = (value) => {
    let { object } = this.state;
    const existed = object.tags.some(tag => utils.discountTagToNumber(tag));
    if (existed) object.tags = object.tags.filter(tag => !utils.discountTagToNumber(tag));
    object.tags.push(`${value}%`);
    return this.setState({ object });
  }
  onName = (value) => {
    return this.setState({
      object: { ...this.state.object, name: value }
    });
  }
  onDescriptions = (value) => {
    return this.setState({
      object: { ...this.state.object, descriptions: value }
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
    const { setCart, history, location } = this.props;
    const { amount, object } = this.state;
    return setCart({
      _id: object._id,
      price: object.price,
      userId: object.userId,
      amount,
    }).then(() => {
      return history.push(location.pathname + '#header');
    }).catch(console.error);
  }
  onCancel = () => {
    const { setCart, history, location } = this.props;
    const { object } = this.state;
    return setCart({ _id: object._id, amount: 0, }).then(() => {
      return history.push(location.pathname + '#header');
    }).catch(console.error);
  }

  render() {
    const { classes } = this.props;
    const { object, userId, step } = this.state;

    if (!object || !userId) return null;
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      {/* Shelf */}
      <Grid item xs={12} md={6}>
        <Shelf
          userId={userId}
          step={step}
          fileIds={[...object.fileIds]} /* Tricky copy array to update component */
          editable={this.props.editable}
          onAdd={this.onAddFile}
          onEdit={this.onEditFile}
        />
      </Grid>
      {/* Contents */}
      <Grid item xs={12} md={6}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Tags tags={object.tags} />
          </Grid>
          <Grid item xs={10} md={8}>
            <TextInput
              variant="h4"
              value={object.name}
              onChange={this.onName}
              placeholder="Tên sản phẩm"
              readOnly={!this.props.editable}
            />
          </Grid>
          <Grid item xs={10} md={8}>
            <ParagraphInput
              value={object.descriptions}
              onChange={this.onDescriptions}
              placeholder="Viết gì đó vào đây nào 😀"
              readOnly={!this.props.editable}
            />
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography
              variant="h6"
              className={classes.originalPrice}
            >{utils.prettyNumber(object.price, 'long') || '0'} ₫</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <TextInput
              variant="h4"
              value={utils.prettyNumber(this.state.amount * this.calculatePrice(object), 'long') + ' ₫'}
              placeholder="0"
              onBlur={this.onPrice}
              readOnly={!this.props.editable}
            />
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
      {/* Drain */}
      <Grid item xs={12}>
        <Drain />
      </Grid>
      {/* Additional settings */}
      {this.props.editable ? <Grid item xs={12} md={6}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Typography variant="h5">Cài đặt khác</Typography>
          </Grid>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
          <Grid item xs={10} md={8}>
            <Thumbnail
              fileIds={object.fileIds}
              onChange={this.onThumbnail}
              value={object.fileIds.indexOf(object.thumbnailId)}
            />
          </Grid>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
          <Grid item xs={10} md={8}>
            <Discount
              onChange={this.onDiscount}
              value={object.tags.map(tag => utils.discountTagToNumber(tag)).filter(discount => discount)[0]}
            />
          </Grid>
        </Grid>
      </Grid> : null}
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
  setInstorageFile, updateInstorageFile, pushInstorageFile, updateFile, unsetInstorageFile,
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