import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { FaChair, FaTableTennis, FaTree, FaDice } from 'react-icons/fa';
import { GiDesk, GiBedLamp, GiCookingPot, GiCeilingLight } from 'react-icons/gi';
import { MdTexture } from 'react-icons/md';

const useStyles = makeStyles(theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  icon: {
    height: 32,
  }
}));

const categories = [
  {
    value: 'chairs',
    name: 'Chairs',
    icon: <FaChair />
  },
  {
    value: 'desks',
    name: 'Desks',
    icon: <GiDesk />
  },
  {
    value: 'floor',
    name: 'Floor',
    icon: <MdTexture />
  },
  {
    value: 'light',
    name: 'Light',
    icon: <GiCeilingLight />
  },
  {
    value: 'bedroom',
    name: 'Bedroom',
    icon: <GiBedLamp />
  },
  {
    value: 'playground',
    name: 'Playground',
    icon: <FaTableTennis />
  },
  {
    value: 'kitchen',
    name: 'Kitchen',
    icon: <GiCookingPot />
  },
  {
    value: 'garden',
    name: 'Garden',
    icon: <FaTree />
  },
  {
    value: 'others',
    name: 'Others',
    icon: <FaDice />
  }
]

function Categories(props) {
  const classes = useStyles();

  return <Grid item xs={12}>
    <FormControl variant="outlined" fullWidth>
      <InputLabel color="secondary">Category</InputLabel>
      <Select
        label="Category"
        color="secondary"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      >
        {categories.map(category => <MenuItem key={category.value} value={category.value}>
          <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
            <Grid item className={classes.icon}>
              {category.icon}
            </Grid>
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

export default Categories;