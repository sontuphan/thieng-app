import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import styles from './styles';


const DEFAULT_DATA = {
  variant: 'body1',
  content: '',
}


class TextTool extends Component {
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
    this.setState({ variant: e.target.value });
  }

  onContent = (e) => {
    this.setState({ content: e.target.value });
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
                  <Typography variant="h3">Text</Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel color="secondary">Variant</InputLabel>
                  <Select
                    onChange={this.onVariant}
                    value={this.state.variant}
                    fullWidth
                  >
                    <MenuItem value={'h1'}>
                      <Typography variant="h1">h1</Typography>
                    </MenuItem>
                    <MenuItem value={'h2'}>
                      <Typography variant="h2">h2</Typography>
                    </MenuItem>
                    <MenuItem value={'h3'}>
                      <Typography variant="h3">h3</Typography>
                    </MenuItem>
                    <MenuItem value={'h4'}>
                      <Typography variant="h4">h4</Typography>
                    </MenuItem>
                    <MenuItem value={'h5'}>
                      <Typography variant="h5">h5</Typography>
                    </MenuItem>
                    <MenuItem value={'h6'}>
                      <Typography variant="h6">h6</Typography>
                    </MenuItem>
                    <MenuItem value={'body1'}>
                      <Typography variant="body1">body1</Typography>
                    </MenuItem>
                    <MenuItem value={'body2'}>
                      <Typography variant="body2">body2</Typography>
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Content"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={this.state.content}
                    onChange={this.onContent}
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

TextTool.defaultProps = {
  visible: false,
  defaultData: { ...DEFAULT_DATA },
  onChange: () => { },
  onClose: () => { },
}

TextTool.propTypes = {
  visible: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  anchorEl: PropTypes.object,
  defaultData: PropTypes.object,
}

export default withStyles(styles)(TextTool);