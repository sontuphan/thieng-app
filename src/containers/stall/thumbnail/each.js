import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

import { useData } from './module';

const useStyles = makeStyles(theme => ({
  each: {
    cursor: 'pointer',
  }
}));

function Each(props) {
  const classes = useStyles();
  const { fileId, selected, onClick } = props;
  const data = useData(fileId);
  if (!data) return null;
  return <Badge overlap="rectangle" variant="dot" color="primary" invisible={!selected}>
    <Avatar variant="square" onClick={onClick} src={data.source} className={classes.each} />
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