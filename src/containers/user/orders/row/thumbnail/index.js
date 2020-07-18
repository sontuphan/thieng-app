import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';

import { useData } from './module';

function OrderThumbnail(props, ref) {
  const data = useData(props.itemId);
  if (!data || data instanceof Error) return null;
  
  const { className, style } = props; // from GroupAvatar
  return <Avatar className={className} style={style} alt={data.name} src={data.source} />
};

OrderThumbnail.defaultProps = {

}

OrderThumbnail.propTypes = {
  itemId: PropTypes.string.isRequired
}

export default OrderThumbnail;