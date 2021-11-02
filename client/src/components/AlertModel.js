import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function AlertModal(){
    const { auth } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true)
    const handleClose = function(){
        auth.clearAlert()
        console.log(auth.alert)}

    let msg = auth.alert

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {msg}
            </Typography>
        </Box>
        </Modal>
    )
}
