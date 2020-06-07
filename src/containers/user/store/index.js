import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Drain from 'components/drain';
import Creation from './creation';
import Selling from './selling';
import Archive from './archive';

import styles from './styles';

const SUBPAGES = [
  { value: 'selling', name: 'Cửa hàng', body: <Selling /> },
  { value: 'creating', name: 'Xưởng', body: <Creation /> },
  { value: 'archived', name: 'Thùng rác', body: <Archive /> },
]


class UserStore extends Component {
  constructor() {
    super();

    this.state = {
      value: SUBPAGES[0].value,
    }
  }

  setSubpage = (value) => {
    return this.setState({ value });
  }

  renderHeader = () => {
    const { value } = this.state;
    return SUBPAGES.map(subpage => <Grid item key={subpage.value}>
      <Button
        color="secondary"
        onClick={() => this.setSubpage(subpage.value)}
      >
        <Typography variant={value === subpage.value ? 'h3' : 'body1'}>{subpage.name}</Typography>
      </Button>
    </Grid>)
  }

  renderBody = () => {
    const { value } = this.state;
    for (let i = 0; i < SUBPAGES.length; i++) {
      const subpage = SUBPAGES[i];
      if (value === subpage.value) return subpage.body;
    }
  }

  render() {
    const { classes } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" justify="flex-end" spacing={2}>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          {this.renderHeader()}
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {this.renderBody()}
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
    </Grid>

  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserStore)));