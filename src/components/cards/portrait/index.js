import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import {
  FavoriteRounded, LocalFloristRounded, LocalGroceryStoreRounded,
  VisibilityRounded, MessageRounded
} from '@material-ui/icons';

import styles from './styles';
import utils from 'helpers/utils';

class PortraitCard extends Component {
  constructor() {
    super();

    this.state = {
      color: '#ffffff'
    }
  }

  componentDidMount() {
    utils.getAccessibleTextColor(this.props.image).then(color => {
      this.setState({ color });
    });
  }

  renderIcon = (type) => {
    switch (type) {
      case 'like':
        return <FavoriteRounded fontSize="small" />;
      case 'flower':
        return <LocalFloristRounded fontSize="small" />;
      case 'product':
        return <LocalGroceryStoreRounded fontSize="small" />;
      default:
        return null;
    }
  }

  renderContent = (content) => {
    return content.map((item, i) => <Grid container key={i} alignItems="center" spacing={1}>
      <Grid item xs={8}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            {this.renderIcon(item.icon)}
          </Grid>
          <Grid item>
            <Typography>{item.key}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container justify="flex-end" alignItems="center" spacing={1}>
          <Typography>{item.value}</Typography>
        </Grid>
      </Grid>
    </Grid>);
  }

  render() {
    let { classes } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card className={classes.card} style={{ filter: this.props.disabled ? 'grayscale()' : null }}>
          <CardActionArea className={classes.cardAction}>
            <CardMedia image={this.props.image} className={classes.cardMedia} />
          </CardActionArea>
          <CardHeader className={classes.cardHeader}
            title={<Typography variant="body2" style={{ color: this.state.color }}>{this.props.title}</Typography>}
            disableTypography
          />
          <CardContent className={classes.cardContent}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={12}>
                {this.renderContent(this.props.content)}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="space-between" alignItems="center" spacing={1}>
                  <IconButton color="secondary" size="small">
                    <MessageRounded fontSize="small" />
                  </IconButton>
                  <IconButton color="secondary" size="small">
                    <VisibilityRounded fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  }
}

PortraitCard.defaultProps = {
  title: '',
  content: null,
  disabled: false
}

PortraitCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string.isRequired,
  content: PropTypes.array,
  disabled: PropTypes.bool,
}

export default withStyles(styles)(PortraitCard);