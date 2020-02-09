import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { Close, ShoppingCart, Bookmark } from '@material-ui/icons';

import Drain from 'components/drain';
import Divider from 'components/divider';
import Card from 'components/card';
import Project from 'components/project';
import Gallery from 'components/gallery';
import Comment from 'components/comment';

import { getUserByCode } from 'modules/users.reducer';
import { getProjects } from 'modules/projects.reducer';

import styles from './styles';
import human1 from 'static/images/human-1.svg';
import human2 from 'static/images/human-2.svg';
import human3 from 'static/images/human-3.svg';
import human4 from 'static/images/human-4.svg';
import human5 from 'static/images/human-5.svg';

const MENU = [
  {
    title: "Xưởng thiết kế",
    subtitle: "Tạo ra những ý tưởng sáng tạo và cảm hứng cho mọi người.",
    color: "linear-gradient(71.34deg, #9B51E0 0%, #BB6BD9 100%)",
    img: human1,
    disabled: false,
  },
  {
    title: "Kệ hàng",
    subtitle: "Quản lý sản phẩm, tối ưu hoá quá trình kinh doanh.",
    color: "linear-gradient(71.34deg, #2D9CDB 0%, #56CCF2 100%)",
    img: human2,
    disabled: false,
  },
  {
    title: "Tin nhắn",
    subtitle: "Kết nối, trò chuyện với khách hàng và chuyên gia.",
    color: "linear-gradient(71.34deg, #27AE60 0%, #6FCF97 100%)",
    img: human3,
    disabled: false,
  },
  {
    title: "Ví",
    subtitle: "Quản lý tài khoản và lịch sử thanh toán. (Comming soon)",
    color: "linear-gradient(71.34deg, #F2994A 0%, #F2C94C 100%)",
    img: human4,
    disabled: true,
  },
  {
    title: "Cài đặt",
    subtitle: "Điều chỉnh thông tin cá nhân và cài đặt dữ liệu bảo mật.",
    color: "linear-gradient(71.34deg, #DB2721 0%, #FF3E3C 100%)",
    img: human5,
    disabled: false,
  }
]

class User extends Component {
  constructor() {
    super();

    this.state = {
      likes: '12.853',
      products: 32,
      code: null,
      projects: []
    }
  }

  onTheEnd = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
      return this.loadData();
  }

  componentDidMount() {
    this.handleParams();
    window.addEventListener('scroll', this.onTheEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onTheEnd);
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.match) !== JSON.stringify(this.props.match))
      this.handleParams();
    if (prevState.code !== this.state.code)
      this.loadData();
  }

  handleParams = () => {
    let { match: { params: { code } } } = this.props;
    this.setState({ code });
  }

  loadData = () => {
    this.props.getUserByCode(this.state.code).then(re => {
      let user = re.data[0];
      return this.props.getProjects(user.id).then(re => {
        let newData = this.state.projects.concat(re.data);
        return this.setState({ projects: newData });
      }).catch(er => {
        return console.error(er);
      });
    }).catch(er => {
      return console.error(er);
    });
  }

  onToogleGallery = (projectId) => {
    if (typeof projectId !== 'string') {
      if (this.state.goBack)
        return this.props.history.goBack();
      return this.props.history.push(`/user/${this.state.code}`);
    }
    this.setState({ goBack: true });
    return this.props.history.push(`/user/${this.state.code}/${projectId}`);
  }

  onComment = (comment) => {
    console.log(comment);
  }

  onBuy = (projectId) => {
    this.props.history.push(`/mall/${projectId}`);
  }

  onBookmark = (projectId) => {
    console.log(projectId)
  }


  renderGallery = () => {
    let { projectId } = this.props.match.params;
    if (!projectId) return null;

    let project = this.state.projects[Number(projectId)];
    let author = project.user;
    let comments = project.comments;
    if (!author) return null;

    let { classes } = this.props;
    return <Dialog
      open={true}
      onClose={this.onToogleGallery}
      fullScreen
    >
      <DialogTitle className={classes.padding}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar alt={author.displayname} src={author.avatar} />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h3" noWrap>{author.displayname}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <IconButton color="secondary" size="small" onClick={() => this.onBuy(project.id)}>
                  <ShoppingCart />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton color="secondary" size="small" onClick={() => this.onBookmark(project.id)}>
                  <Bookmark />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton color="secondary" size="small" onClick={this.onToogleGallery}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Gallery project={project} />
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1">Nhận xét</Typography>
          </Grid>
          <Grid item xs={12}>
            <Comment user={this.props.auth} comments={comments} onSend={this.onComment} />
          </Grid>
          <Grid item xs={12}>
            <Drain small/>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  }

  render() {
    let { classes } = this.props;
    let user = this.props.users.data[0];
    let { projects } = this.state;

    if (!user) return null;
    if (!projects || !projects.length) return null;

    return <Fragment>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Drain />
        </Grid>
        <Grid item xs={10} md={5}>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            <Grid item>
              <Avatar alt={user.displayname} src={user.avatar} className={classes.avatar} />
            </Grid>
            <Grid item>
              <Typography variant="h1">{user.displayname}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} md={5}>
          <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
            <Grid item>
              <Typography>{user.hearts} Thích - {user.products} Sản phẩm</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Drain />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="center" spacing={2}>
            {
              MENU.map(
                (card, i) => <Grid key={i} item xs={10} md={2}>
                  <Card {...card} width={this.props.ui.width} />
                </Grid>
              )
            }
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Drain />
        </Grid>
        <Grid item xs={10}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1">Bảng tin</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={10}>
          <Grid container direction="row" spacing={2}>
            {
              projects.map((project, index) => {
                if (!project.user || !project.comments) return null;
                return <Grid item key={index} xs={12} sm={6} md={4}>
                  <Project
                    author={project.user}
                    project={project}
                    comments={project.comments}
                    auth={this.props.auth}
                    onClick={() => this.onToogleGallery(`${project.id}`)}
                    onSend={this.onComment} />
                </Grid>
              })
            }
          </Grid>
        </Grid>
      </Grid>
      {this.renderGallery()}
    </Fragment>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  users: state.users,
  projects: state.projects,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserByCode,
  getProjects,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(User)));