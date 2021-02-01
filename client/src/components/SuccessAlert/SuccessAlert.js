import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SuccessAlert( props ) {

  const { message, severity, setCloseModal } = props;

  const classes = useStyles();

  const handleClose = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }

    setCloseModal( false );

  };

  return (
    <div className={classes.root}>
      <Snackbar open={ true } 
      autoHideDuration={6000} 
      onClose={handleClose}>
        <Alert onClose={handleClose} severity={ severity }>
          { message }
        </Alert>
      </Snackbar>
    </div>
  );
};