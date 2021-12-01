import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import { ListItem } from '@mui/material';
import { Fab } from '@mui/material';
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
    if(auth.loggedIn){
    return (
        
        <Box id="top5-workspace">
        <Typography variant="h5">{store.currentList.name}</Typography>
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
        <Fab color="primary" variant="extended" disabled={!store.canUndo()} onClick={() => handleSaveButton()} sx={{width:'13%',height:'7%',marginLeft:'72%',marginRight:'1%'}}>
            <Typography variant="h4" >Save</Typography>
        </Fab>
        <Fab color="secondary" variant="extended" disabled={store.saveState !== store.currentList._id} onClick={() => handlePublishButton()} sx={{width:'13%',height:'7%'}}>
            <Typography variant="h4" >Publish</Typography>
        </Fab>
        </Box>
            
    )}else{
        return <SplashScreen />
    }
}

export default WorkspaceScreen;
