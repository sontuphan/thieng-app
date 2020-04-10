import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import styles from './styles';

const DEFAULT_DATA = {
  height: 24,
}


class ContainerTool extends Component {
  constructor() {
    super();

    this.state = {
      ...DEFAULT_DATA,
    }
  }

  componentDidMount() {
    this.setState(this.props.defaultData);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.defaultData) !== JSON.stringify(this.props.defaultData)) {
      this.setState(this.props.defaultData);
    }
  }

  onHeight = (e) => {
    if (!parseInt(e.target.value)) return this.setState({ height: 0 });
    return this.setState({ height: parseInt(e.target.value) });
  }

  onOk = () => {
    this.props.onChange(this.state);
    this.onDefault();
  }

  onDefault = () => {
    this.setState({ ...DEFAULT_DATA });
  }

  render() {
    let { classes } = this.props;
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Popover
          open={this.props.visible}
          anchorEl={this.props.anchorEl}
          onClose={this.props.onClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
          transformOrigin={{ vertical: 'top', horizontal: 'center', }}
        >
          <List className={classes.list}>
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Drain</Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel color="secondary">Height</InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={this.state.height}
                    onChange={this.onHeight}
                    InputProps={{
                      classes: {
                        input: classes.font,
                      }
                    }} multiline fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} justify="flex-end">
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={this.onOk}>
                        <Typography>OK</Typography>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={this.onDefault}>
                        <Typography>Default</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Popover>
      </Grid>
    </Grid>
  }
}

ContainerTool.defaultProps = {
  visible: false,
  defaultData: { ...DEFAULT_DATA },
  onChange: () => { },
  onClose: () => { },
}

ContainerTool.propTypes = {
  visible: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  anchorEl: PropTypes.object,
  defaultData: PropTypes.object,
}

export default withStyles(styles)(ContainerTool);