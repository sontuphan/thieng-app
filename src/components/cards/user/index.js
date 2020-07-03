import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { useStyles } from './styles';
import { useData } from './module';

function UserCard(props) {
  const classes = useStyles();
  const data = useData(props.userId);

  if (!data) return null;
  return <Grid container alignItems="center" spacing={2} className={classes.noWrap}>
    <Grid item className={classes.link} component={RouterLink} to={'#'}>
      <Avatar alt={data.displayname} src={data.avatar} />
    </Grid>
    <Grid item xs={8} className={classes.stretch} component={RouterLink} to={'#'}>
      <Typography style={{ color: props.color }} noWrap>{data.displayname}</Typography>
    </Grid>
  </Grid>
}

UserCard.defaultProps = {
  color: '#000000'
}

UserCard.propTypes = {
  userId: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default UserCard;