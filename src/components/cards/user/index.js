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

  if (!data || data instanceof Error) return null;
  return <Grid container alignItems="center" spacing={2} className={classes.noWrap}>
    <Grid item className={classes.link} component={RouterLink} to={`/user/${data._id}`}>
      <Avatar alt={data.displayname} src={data.avatar} className={classes[props.size]} />
    </Grid>
    <Grid item className={classes.stretch} component={RouterLink} to={`/user/${data._id}`}>
      <Grid container spaing={2} justify={props.fullWidth ? "flex-end" : "flex-start"}>
        <Grid item>
          <Typography style={{ color: props.color }} noWrap>{data.displayname}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}

UserCard.defaultProps = {
  size: 'medium',
  color: '#000000',
  fullWidth: false,
}

UserCard.propTypes = {
  userId: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
}

export default UserCard;