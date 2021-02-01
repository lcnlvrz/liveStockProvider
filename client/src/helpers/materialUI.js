import MuiAlert from '@material-ui/lab/Alert';

export const handleClose = (event, reason, setOpen) => {
    if (reason === 'clickaway') {
    return;
    }

    setOpen(false);
};

export function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};



export const handleOpenModal = ( setOpen ) => {
    setOpen(true);
};

export const handleCloseModal = ( setOpen, setCloseModal ) => {
    setCloseModal( false );
    setOpen(false);
};