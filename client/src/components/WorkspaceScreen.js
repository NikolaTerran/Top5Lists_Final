import { useContext,useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { TextField, Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import { ListItem } from '@mui/material';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);


    function handleSaveButton(){
        store.save()
    }

    function handlePublishButton(){
        store.publish()
    }

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List  sx={{ width: '100%', height:'100%', bgcolor: '#e1e4cb'}}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }

    const [nameActive, setNameActive] = useState(false);
    const [text, setText] = useState("");
    function handleNameEdit(event){
        event.stopPropagation();
        toggleNameEdit();
    }

    function toggleNameEdit() {
        let newActive = !nameActive;
        if (newActive) {
            store.setIsListNameEditActive(newActive);
        }
        setNameActive(newActive);
    }

    function handleNameBlur(event) {
        //let id = event.target.id.substring("list-".length);
        if(text !== ""){
            store.changeListName(store.currentList._id, text.trim())
        }
        toggleNameEdit();
    }

    function handleNameKeyPress(event) {
        if (event.code === "Enter") {
            handleNameBlur(event)
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    if(auth.loggedIn){
    return (
        
        <Box id="top5-workspace">
        {nameActive? <TextField sx={{top:'-2%',height:'5%',width:"40%"}}label="change list name" onBlur={handleNameBlur} onChange={handleUpdateText} onKeyPress={handleNameKeyPress}></TextField> :<Typography variant="h4" color="primary" onClick={handleNameEdit} >{store.currentList.name}<EditIcon/></Typography>}
        <Stack direction='row' sx={{ height:'90%'}}>
        <List sx={{height:'100%', backgroundColor:'linen',width: '15%', alignItems: 'center', position:'relative'}}>
            <ListItem sx={{height:'20%', display:'flex', justifyContent:'center'}}><Typography variant="h3" >1.</Typography></ListItem>
            <ListItem sx={{height:'20%', display:'flex', justifyContent:'center'}}><Typography variant="h3" >2.</Typography></ListItem>
            <ListItem sx={{height:'20%', display:'flex', justifyContent:'center'}}><Typography variant="h3" >3.</Typography></ListItem>
            <ListItem sx={{height:'20%', display:'flex', justifyContent:'center'}}><Typography variant="h3" >4.</Typography></ListItem>
            <ListItem sx={{height:'20%', display:'flex', justifyContent:'center'}}><Typography variant="h3" >5.</Typography></ListItem>
        </List>
        {editItems}
        </Stack>
        <Fab color="primary" variant="extended" disabled={!store.canSave()} onClick={() => handleSaveButton()} sx={{bottom:'1%',width:'13%',height:'7%',marginLeft:'72%',marginRight:'1%'}}>
            <Typography variant="h4" >Save</Typography>
        </Fab>
        <Fab color="secondary" variant="extended" disabled={store.saveState !== store.currentList._id} onClick={() => handlePublishButton()} sx={{bottom:'1%', width:'13%',height:'7%'}}>
            <Typography variant="h4" >Publish</Typography>
        </Fab>
        </Box>
            
    )}else{
        return <SplashScreen />
    }
}

export default WorkspaceScreen;
