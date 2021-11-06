import React, { useContext} from 'react'
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function AlertModal(){
    const { auth } = useContext(AuthContext);
    const handleClose = function(){
        auth.clearAlert()
    }

    let msg = auth.alert
    if(!msg){
        msg = ""
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        p: 4,
    };
    return (
        <Modal
        open = {msg === "" ? false : true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Collapse in={msg === "" ? false : true}>
                    <Alert severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            auth.clearAlert()
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    {msg}
                    </Alert>
                </Collapse>
            </Box>
        </Modal>
    )
}
