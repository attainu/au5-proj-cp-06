import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';

import MyButton from '../../utils/MyButton';
import ProfileSkeleton from '../../utils/ProfileSkeleton';
import { uploadImage } from '../../Redux/ActionCreators';
import { bindActionCreators } from 'redux';
import EditDetails from './EditDetails';

// const useStyles = makeStyles(() => ({
//   paper: {
//     padding: 20,
//     height: '100%'
//   },
//   profile: {
//     '& .image-wrapper': {
//       textAlign: 'center',
//       position: 'relative',
//       '& button': {
//         position: 'absolute',
//         top: '80%',
//         left: '70%'
//       }
//     },
//     '& .profile-image': {
//       width: 200,
//       height: 200,
//       objectFit: 'cover',
//       maxWidth: '100%',
//       borderRadius: '50%'
//     },
//     '& .profile-details': {
//       textAlign: 'center',
//       '& span, svg': {
//         verticalAlign: 'middle'
//       },
//       '& a': {
//         color: '#00bcd4'
//       }
//     },
//     '& hr': {
//       border: 'none',
//       margin: '0 0 10px 0'
//     },
//     '& svg.button': {
//       '&:hover': {
//         cursor: 'pointer'
//       }
//     }
//   },
//   buttons: {
//     textAlign: 'center',
//     '& a': {
//       margin: '20px 10px'
//     }
//   }
// }));

const styles = (theme) => ({
  ...theme.spreadThis
});

const Profile = (props) => {
  const {
    uploadImage,
    user: {
      credentials: { handle, createdAt, imageUrl, bio, website, location },
      loading,
      authenticated
    },
    classes
  } = props;

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    uploadImage(formData);
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            <img src={imageUrl} alt='profile.' className='profile-image' />
            <input
              type='file'
              id='imageInput'
              hidden='hidden'
              onChange={handleImageChange}
            />
            <MyButton
              tip='Edit profile picture'
              onClick={handleEditPicture}
              ClassName='button'
            >
              <EditIcon color='primary' />
            </MyButton>
          </div>
          <hr />
          <div className='profile-details'>
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color='primary'
              variant='h5'
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant='body2'>{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color='primary' />
                <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color='primary' />
                <a href={website} target='_blank' rel='noopener noreferrer'>
                  {' '}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color='primary' />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant='body2' align='center'>
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/signin'
          >
            Sign In
          </Button>
          <Button
            variant='contained'
            color='secondary'
            component={Link}
            to='/signup'
          >
            Sign Up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );
  return profileMarkup;
};

const mapStateToProps = (state) => ({
  user: state.user
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ uploadImage }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
