import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { TopDrawer } from 'components/drawers';
import Drain from 'components/drain';
import SearchField from 'components/search';
import { ProductCard } from 'components/cards';

import { toggleSearch, searchText } from 'modules/search.reducer';

import styles from './styles';


class Search extends Component {
  constructor() {
    super();

    this.state = {
      waiting: false
    }
  }

  componentDidUpdate(prevProps) {
    const { location, toggleSearch } = this.props;
    if (!isEqual(prevProps.location, location) && prevProps.search.visible) {
      toggleSearch();
    }
  }

  onSearch = (value) => {
    const condition = { $text: { $search: value }, status: 'selling' }
    return this.setState({ waiting: true }, () => {
      return this.props.searchText(condition).then(() => {
        return this.setState({ waiting: false });
      }).catch(er => {
        return this.setState({ waiting: false });
      });
    });
  }

  renderFeedback = () => {
    const { search: { data } } = this.props;
    const { waiting } = this.state;
    if (waiting) return <Grid item xs={12}>
      <CircularProgress size={16} />
    </Grid>
    if (!data.length) return <Grid item xs={12}>
      <Typography>Chưa tìm thấy sản phẩm <span aria-label="emoji" role="img">😣</span></Typography>
    </Grid>
    return data.map((item, i) => <Grid item key={i} xs={6} sm={4} md={3} lg={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProductCard itemId={item._id} />
        </Grid>
      </Grid>
    </Grid>);
  }

  render() {
    const { classes } = this.props;
    const { search: { visible }, toggleSearch } = this.props;
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <TopDrawer visible={visible} onClose={toggleSearch}>
          <Grid container spacing={2} justify="center">

            <Grid item xs={12}>
              <Drain small />
            </Grid>

            <Grid item xs={11} md={10}>
              <Grid container alignItems="center" className={classes.noWrap} spacing={2}>
                <Grid item>
                  <Typography variant="h3">Tìm kiếm</Typography>
                </Grid>
                <Grid item className={classes.stretch} xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <SearchField
                    variant='outlined'
                    placeholder="Tên sản phẩm"
                    onSearch={this.onSearch}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Drain small />
            </Grid>

            <Grid item xs={11} md={10}>
              <Grid container spacing={2}>
                {this.renderFeedback()}
              </Grid>
            </Grid>
          </Grid>
        </TopDrawer>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  search: state.search,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSearch, searchText,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Search)));