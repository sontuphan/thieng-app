import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

import { useData } from './module';

const useStyles = makeStyles(theme => ({
  fullWidth: {
    width: '100%',
  },
  each: {
    width: '100%',
    cursor: 'pointer',
  },
  img: {
    borderRadius: theme.shape.borderRadius
  }
}));

function Each(props) {
  const classes = useStyles();
  const { fileId, selected, onClick } = props;
  const data = useData(fileId);
  if (!data || data instanceof Error) return null;
  
  return <Badge
    overlap="rectangle"
    variant="dot"
    color="primary"
    invisible={!selected}
    className={classes.fullWidth}
  >
    <Avatar
      variant="square"
      onClick={onClick}
      src={data.source}
      className={classes.each}
      classes={{ img: classes.img }}
    />
  </Badge>
}

Each.defaultProps = {
  onClick: () => { },
  selected: false,
}

Each.propTypes = {
  onChange: PropTypes.func,
  selected: PropTypes.bool,
  fileId: PropTypes.string.isRequired,
}

export default Each;