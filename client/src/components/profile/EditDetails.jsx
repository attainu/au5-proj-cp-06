import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';

import MyButton from '../../utils/MyButton';

import { editUserDetails } from '../../Redux/ActionCreators';

const useStyles = makeStyles(() => ({
  button: {
    float: 'right'
  }
}));

const EditDetails = (props) => {
  const { editUserDetails, credentials } = props;
  const classes = useStyles();
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);

  const mapUserDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : '');
    setWebsite(credentials.website ? credentials.website : '');
    setLocation(credentials.location ? credentials.location : '');
  };
  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };
  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location
    };
    editUserDetails(userDetails);
    setOpen(false);
  };

  useEffect(() => {
    let mounted = true;
    const { credentials } = props;
    if (mounted) mapUserDetailsToState(credentials);
    return () => {
      mounted = false;
    };
  }, [props]);
  return (
    <>
      <MyButton
        tip='Edit Details'
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color='primary' />
      </MyButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='bio'
              tpye='text'
              label='Bio'
              multiline
              rows='3'
              placeholder='A short bio about yourself'
              className={classes.textField}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
            />
            <TextField
              name='website'
              tpye='text'
              label='Website'
              placeholder='Your personal/professinal website'
              className={classes.textField}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              fullWidth
            />
            <TextField
              name='location'
              tpye='text'
              label='Location'
              placeholder='Where you live'
              className={classes.textField}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ editUserDetails }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDetails);
