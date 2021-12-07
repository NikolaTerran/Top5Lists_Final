import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const {text, index} = props
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);
    const [newText, setNewText] = useState(text);

    function handleDragStart(event, targetId) {
        event.dataTransfer.setData("item", targetId);
        store.setIsItemEditActive(true)
        store.unsave()
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        console.log("entering");
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        console.log("leaving");
        setDraggedTo(false);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
        store.unsave()
        event.target.blur()
    }
    function toggleEdit() {
        let newActive = !editActive;
        store.setIsItemEditActive(newActive);
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            event.preventDefault();
            handleBlur(event)
        }
    }
    function handleBlur(event) {
        if(newText !== "" && newText !== text){
            store.addUpdateItemTransaction(index,event.target.value.trim())
            toggleEdit();
        }else{
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        event.preventDefault();
        setNewText(event.target.value)
    }

    function handleDrop(event, targetId) {
        event.preventDefault();
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        console.log("handleDrop (sourceId, targetId): ( " + sourceId + ", " + targetId + ")");

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
        store.setIsItemEditActive(false)
    }

    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    if(editActive){
        return <ListItem
        id={'item-' + (index+1)}
        key={props.key}
        className={itemClass}
        sx={{ display: 'flex', p: 1 }}
        
        >
        <TextField 
            label="Top5Item" 
            variant="outlined" 
            style={{
                fontSize: '48pt',
                width: '61.8%'
            }}
            type='text'
            value={newText}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            onChange={handleUpdateText}
            autoFocus/>
            </ListItem>
    }else{
    return (
            <ListItem
                id={'item-' + (index+1)}
                key={props.key}
                className={itemClass}
                onDragStart={(event) => {
                    handleDragStart(event, (index+1))
                }}
                onDragOver={(event) => {
                    handleDragOver(event, (index+1))
                }}
                onDragEnter={(event) => {
                    handleDragEnter(event, (index+1))
                }}
                onDragLeave={(event) => {
                    handleDragLeave(event, (index+1))
                }}
                onDrop={(event) => {
                    handleDrop(event, (index+1))
                }}
                draggable="true"
                sx={{ display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}
            >
            <Box sx={{ p: 1 }}>
                <IconButton aria-label='edit' onClick={handleToggleEdit} onKeyPress={handleKeyPress} onBlur={handleBlur} onChange={handleUpdateText}>
                    <EditIcon style={{fontSize:'48pt'}}  />
                </IconButton>
            </Box>
                <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
            </ListItem>
    )}
}

export default Top5Item;