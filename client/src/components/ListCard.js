import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Stack, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Collapse } from '@mui/material';
import { Box } from '@mui/system';
import { List } from '@mui/material';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [expandedId, setExpandedId] = useState(-1);

    const { Obj } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive(newActive);
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }
    function handleBlur(event) {
        let id = event.target.id.substring("list-".length);
        if(text !== ""){
            store.changeListName(id, text)
        }
        toggleEdit();
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur(event)
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function toggleExpand(event){
        event.preventDefault()
        event.stopPropagation()
        setExpandedId(expandedId === 1 ? -1 : 1);
        if(expandedId === 1 && Obj.dislikes[0] !== "-1"){
            store.increaseView(Obj)
        }
    }
    
    function handleAddComment(event) {
        event.stopPropagation()
    }
    function handleSubmitComment(event){
        if (event.code === "Enter") {
            if(event.target.value !== ""){
                store.submitComment(Obj, event.target.value)
            }
        }
    }
    function handleLike(event){
        event.stopPropagation()
        store.like(Obj)
    }
    function handleDislike(event){
        event.stopPropagation()
        store.dislike(Obj)
    }

    let likeColor = 'default'
    let dislikeColor = 'default'

    if(Obj.likes.indexOf(auth.user.email) > -1){
        likeColor = 'primary'
    }

    if(Obj.dislikes.indexOf(auth.user.email) > -1){
        dislikeColor = 'primary'
    }

    let bgColor = '#dd90dd'
    let clickBehavior = toggleExpand
    let bottomLeft = <Typography>Published: {Obj.updatedAt.substring(0,Obj.updatedAt.indexOf('T'))}</Typography>
    let bottomRight = <ExpandMoreIcon/>


    if(Obj.dislikes[0] === "-1"){
        bgColor = '#8de971'
        clickBehavior = handleLoadList
        bottomLeft = <IconButton color='primary' onClick={handleToggleEdit} aria-label='edit' sx={{justifyContent:'left', fontSize:'15pt',width:'10%'}}>
        <EditIcon /> edit
     </IconButton> 
    }

    if(expandedId === 1){
        bottomRight = <ExpandLessIcon/>
    }

    let listItems = <List  sx={{ width: '100%', height:'100%', bgcolor: '#e1e4cb', borderRadius: '0px 15px 15px 0px'}}>
                {
                    Obj.items.map((item) => (
                        <Typography variant='h2'>
                        {item}
                        </Typography>
                    ))
                }
            </List>

    let commentItems = <List  sx={{ width: '100%', height:'100%', bgcolor: 'linen', borderRadius: '15px', overflow: 'auto', maxHeight: 300, maxWidth:'100%'}}>
                {
                    Obj.comments.map((comment) => (
                        <Stack sx={{marginLeft:'3%'}}>
                        <Typography color='primary' variant='h6'>
                        {comment.user}
                        </Typography>
                        <Typography variant='h4'>
                        {comment.words}
                        </Typography>
                        </Stack>
                    ))
                }
            </List>

    


    let cardElement =
        <ListItem
            id={Obj._id}
            key={Obj._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            onClick={(event) => {
                clickBehavior(event, Obj._id)
            }
            }
            style={{
                fontSize: '48pt',
                width: '100%',
                backgroundColor: bgColor,
                borderRadius: '15px'
            }}
        >
            <Grid container>
                <Grid item xs={10}>
                    <Stack>
                        <Typography variant='h5'> {Obj.name} </Typography>
                        <Typography variant='h6'> by {Obj.userName} </Typography>
                    </Stack>
                </Grid>

                <Grid item xs={2}>
                    <Stack direction='row'>
                        <IconButton color={likeColor} onClick={handleLike} aria-label='edit' sx={{justifyContent:'left', fontSize:'15pt'}}>
                            <ThumbUpIcon /> {Obj.likes.length}
                        </IconButton> 
                        <IconButton color={dislikeColor} onClick={handleDislike} aria-label='edit' sx={{justifyContent:'left', fontSize:'15pt'}}>
                            <ThumbDownIcon /> {Obj.dislikes[0] === "-1" ? 0 : Obj.dislikes.length}
                        </IconButton> 
                        <IconButton onClick={(event) => {
                                handleDeleteList(event, Obj._id)
                            }} aria-label='delete'>
                                <DeleteIcon style={{fontSize:'20pt'}} />
                        </IconButton>
                    </Stack>
                </Grid>
               
               <Grid item xs={6}>
                <Collapse in={expandedId === 1} unmountOnExit sx={{height:'1000px'}}>
                    <Grid item xs={12}>
                        <Box sx={{height:"200%"}}>
                        <Stack direction='row' sx={{ height:'90%'}}>
                        <List sx={{height:'100%', backgroundColor:'linen',width: '15%', alignItems: 'center', position:'relative', borderRadius: '15px 0px 0px 15px'}}>
                            <ListItem sx={{height:'20%', display:'flex', justifyContent:'center'}}><Typography variant="h3" >1.</Typography></ListItem>
                            <ListItem sx={{height:'20%', display:'flex', justifyContent:'center'}}><Typography variant="h3" >2.</Typography></ListItem>
                            <ListItem sx={{height:'20%', display:'flex', justifyContent:'center'}}><Typography variant="h3" >3.</Typography></ListItem>
                            <ListItem sx={{height:'20%', display:'flex', justifyContent:'center'}}><Typography variant="h3" >4.</Typography></ListItem>
                            <ListItem sx={{height:'20%', display:'flex', justifyContent:'center'}}><Typography variant="h3" >5.</Typography></ListItem>
                        </List>
                        {listItems}
                        </Stack>
                        </Box>
                    </Grid>
                </Collapse>
                </Grid>
                <Grid item xs={6}>
                <Collapse in={expandedId === 1} unmountOnExit sx={{height:'1000px'}}>
                    <Grid item xs={12}>
                        {commentItems}
                        <TextField id="outlined-basic" label="Add Comment" variant="outlined" sx={{backgroundColor:'white',width:'100%'}} onClick={handleAddComment} onKeyPress={handleSubmitComment}/>
                    </Grid>
                </Collapse>
                </Grid>
                
                <Grid item xs={10}>
                    {bottomLeft}
                </Grid>
                <Grid item xs={2}>
                    <Typography> views {Obj.views}<IconButton onClick={toggleExpand}>{bottomRight}</IconButton></Typography>
                </Grid>                
            </Grid>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + Obj._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                onChange={handleUpdateText}
                defaultValue={Obj.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;