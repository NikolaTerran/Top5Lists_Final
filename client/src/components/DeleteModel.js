import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: 'center',
    p: 4,
};

function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    let open = false;
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
        open = true
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleClose(event) {
        store.unmarkListForDeletion();
    }
    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style} >
        <Typography id="modal-modal-title" variant="h5" component="h2">
        Delete the {name} Top 5 List?
        </Typography>
        <Button variant="contained" onClick={handleDeleteList} sx={{ m: 1}}>Confirm</Button>
        <Button variant="outlined" onClick={handleClose} sx={{ m: 1}}>Cancel</Button>
        </Box>
        </Modal>
    )
}

export default DeleteModal;