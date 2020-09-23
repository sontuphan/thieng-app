import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

// UI redux helper
import { setScreen } from 'modules/ui.reducer';


class UiUx extends Component {

  componentDidMount() {
    this.scrollToHash();
    this.listenResizeEvents();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { location: prevLocation } = prevProps;
    if (!isEqual(prevLocation, location)) {
      const ok = this.scrollToHash();
      if (!ok) return this.scrollToTop();
    }
  }

  listenResizeEvents = () => {
    const { setScreen } = this.props;
    setScreen(window.innerWidth); // Init
    return window.onresize = () => {
      return setScreen(window.innerWidth);
    }
  }

  scrollToTop = () => {
    // return window.scrollTo(0, 0);
  }

  scrollToHash = () => {
    const { location: { hash } } = this.props;
    if (!hash) {
      console.warn('Invalid hashtag');
      return false;
    }
    const id = hash.replace('#', '');
    const ele = window.document.getElementById(id);
    if (!ele) {
      console.error('Invalid component');
      return false;
    }
    setTimeout(() => ele.scrollIntoView(), 300);
    return true;
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setScreen,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UiUx));