import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
  FormatAlignLeftRounded, FormatAlignCenterRounded,
  FormatAlignRightRounded, FormatAlignJustifyRounded,
  DeleteRounded,
} from '@material-ui/icons';

import styles from './styles';
import { DEFAULT_TEXT } from '../tree/constants';

const DEFAULT_DATA = {
  variant: DEFAULT_TEXT.variant,
  align: DEFAULT_TEXT.align,
  contents: DEFAULT_TEXT.contents,
}


class TextBar extends Component {
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

  onVariant = (e) => {
    return this.setState({ variant: e.target.value }, () => {
      this.props.onChange(this.state);
    });
  }

  onAlign = (e, value) => {
    return this.setState({ align: value }, () => {
      this.props.onChange(this.state);
    });
  }

  onContent = (e) => {
    return this.setState({ contents: e.target.value }, () => {
      this.props.onChange(this.state);
    });
  }

  render() {
    let { classes } = this.props;
    return <Paper className={classes.paper}>
      <Grid container className={classes.noWrap} spacing={1}>
        <Grid item>
          <IconButton size="small" onClick={this.props.onDelete}>
            <DeleteRounded fontSize="small" />
          </IconButton>
        </Grid>

        <Grid item>
          <Divider orientation="vertical" />
        </Grid>

        <Grid item>
          <Select
            onChange={this.onVariant}
            value={this.state.variant}
            classes={{ root: classes.select }}
          >
            <MenuItem value={'h1'}>
              <Typography>h1</Typography>
            </MenuItem>
            <MenuItem value={'h2'}>
              <Typography>h2</Typography>
            </MenuItem>
            <MenuItem value={'h3'}>
              <Typography>h3</Typography>
            </MenuItem>
            <MenuItem value={'h4'}>
              <Typography>h4</Typography>
            </MenuItem>
            <MenuItem value={'h5'}>
              <Typography>h5</Typography>
            </MenuItem>
            <MenuItem value={'h6'}>
              <Typography>h6</Typography>
            </MenuItem>
            <MenuItem value={'body1'}>
              <Typography>body1</Typography>
            </MenuItem>
            <MenuItem value={'body2'}>
              <Typography>body2</Typography>
            </MenuItem>
          </Select>
        </Grid>

        <Grid item>
          <Divider orientation="vertical" />
        </Grid>

        <Grid item>
          <ToggleButtonGroup
            value={this.state.align}
            onChange={this.onAlign}
            size="small"
            exclusive
          >
            <ToggleButton value="left" classes={{ sizeSmall: classes.btnGroup }}>
              <FormatAlignLeftRounded fontSize="small" />
            </ToggleButton>
            <ToggleButton value="center" classes={{ sizeSmall: classes.btnGroup }}>
              <FormatAlignCenterRounded fontSize="small" />
            </ToggleButton>
            <ToggleButton value="right" classes={{ sizeSmall: classes.btnGroup }}>
              <FormatAlignRightRounded fontSize="small" />
            </ToggleButton>
            <ToggleButton value="justify" classes={{ sizeSmall: classes.btnGroup }}>
              <FormatAlignJustifyRounded fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

      </Grid>
    </Paper>
  }
}

TextBar.defaultProps = {
  defaultData: { ...DEFAULT_DATA },
  onChange: () => { },
  onDelete: () => { },
}

TextBar.propTypes = {
  defaultData: PropTypes.object,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
}

export default withStyles(styles)(TextBar);