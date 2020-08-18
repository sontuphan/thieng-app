import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import styles from './styles';
import configs from 'configs';

function Categories(props) {
  const { classes } = props;

  return <Grid item xs={12}>
    <FormControl variant="outlined" fullWidth>
      <InputLabel color="secondary">Category</InputLabel>
      <Select
        label="Category"
        color="secondary"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      >
        {configs.category.pureList.map(category => <MenuItem key={category.value} value={category.value}>
          <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
            <Grid item>{category.icon}</Grid>
            <Grid item className={classes.stretch}>
              <Typography>{category.name}</Typography>
            </Grid>
          </Grid>
        </MenuItem>)}
      </Select>
    </FormControl>
  </Grid>
}

Categories.defaultProps = {
  value: 'others',
  onChange: () => { },
}

Categories.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default withStyles(styles)(Categories);