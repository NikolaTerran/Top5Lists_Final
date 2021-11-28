import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";

    function handleCreateNewList() {
        store.createNewList();
    }

    if (store.currentList){
        text = store.currentList.name;
        return (
            <div id="top5-statusbar">
                <Typography variant="h4">{text}</Typography>
            </div>
        );
    }else{
        return(
        <div id="top5-statusbar">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                >
                <AddIcon />
            </Fab>
            <Typography variant="h2">Your Lists</Typography>
        </div>
        )
    }
}

export default Statusbar;