import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SortIcon from '@mui/icons-material/Sort';
import FunctionsIcon from '@mui/icons-material/Functions';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { Stack } from '@mui/material';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        if(store.tab === 0){
            store.loadListObjs()
        }else if(store.tab === 1){
            store.loadAll()
        }else if(store.tab === 3){
            store.loadCom()
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNewest = (event) => {
        store.sort(0)
        handleMenuClose()
    }
    const handleOldest = (event) => {
        store.sort(1)
        handleMenuClose()
    }
    const handleViews = (event) => {
        store.sort(2)
        handleMenuClose()
    }
    const handleLikes = (event) => {
        store.sort(3)
        handleMenuClose()
    }
    const handleDislikes = (event) => {
        store.sort(4)
        handleMenuClose()
    }

    const handleAll = (event) => {
        store.loadAll()
    }

    const handleHome = (event) => {
        store.loadListObjs()
    }

    const handleUser = (event) => {
        store.clearObjs()
    }

    const handleCom = (event) => {
        store.loadCom()
    }

    const handleSearchUser = (event) =>{
        if(event.code === "Enter"){
            store.loadUserLists(event.target.value)
            event.target.blur()
        }
    }

    const handleOwnedList = (event) =>{
        if(event.code === "Enter"){
            store.filterOwned(event.target.value)
            event.target.blur()
        }
    }

    const handleAllList = (event) =>{
        if(event.code === "Enter"){
            store.filterAll(event.target.value)
            event.target.blur()
        }
    }

    const handleCommunityList = (event) =>{
        if(event.code === "Enter"){
            store.filterCom(event.target.value)
            event.target.blur()
        }
    }


    const menuId = 'primary-search-account-menu';

    let listCard = "";
    if (store.listObjs) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'light-gray' }}>
                
            {
                store.listObjs.map((obj) => (
                    <ListCard
                        key={obj._id}
                        Obj={obj}
                        selected={false}
                    />
                ))
            }
            </List>;
    }


    let homeColor = "inherit"
    let userColor = "inherit"
    let comColor = "inherit"
    let sumColor = "inherit"

    let searchPrompt

    if(store.tab === 0){
        homeColor = 'primary'
        searchPrompt = <TextField id="outlined-basic" onKeyPress={handleOwnedList} label="Search Within Your Lists" variant="outlined" sx={{marginLeft:'20px',width:'50%',backgroundColor:'white'}}/>
    }else if(store.tab === 1){
        comColor = 'primary'
        searchPrompt = <TextField id="outlined-basic" onKeyPress={handleAllList} label="Search Within All Published Lists" variant="outlined" sx={{marginLeft:'20px',width:'50%',backgroundColor:'white'}}/>
    }else if(store.tab === 2){
        userColor = 'primary'
        searchPrompt = <TextField id="outlined-basic" onKeyPress={handleSearchUser} label="Search Users" variant="outlined" sx={{marginLeft:'20px',width:'50%',backgroundColor:'white'}}/>
    }else if(store.tab === 3){
        sumColor = 'primary'
        searchPrompt = <TextField id="outlined-basic" onKeyPress={handleCommunityList} label="Search Community Lists" variant="outlined" sx={{marginLeft:'20px',width:'50%',backgroundColor:'white'}}/>
    }

    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="home"
                    color={homeColor}
                    onClick={handleHome}
                    disabled={store.guest? true: false}
                >
                    <HomeIcon sx={{fontSize: '40px'}}/>
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="all"
                    color={comColor}
                    onClick={handleAll}
                >
                    <GroupIcon sx={{fontSize: '40px'}}/>
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="user"
                    color={userColor}
                    onClick={handleUser}
                >
                    <PersonIcon sx={{fontSize: '40px'}}/>
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="community"
                    color={sumColor}
                    onClick={handleCom}
                >
                    <FunctionsIcon sx={{fontSize: '40px'}}/>
                </IconButton>
            </Box>
            {searchPrompt}
            <Stack sx={{ display: { xs: 'none', md: 'flex', marginLeft: 'auto' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    /*aria-controls={menuId}*/
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    SORT BY <SortIcon sx={{fontSize: '40px'}}/>
                </IconButton>
            </Stack>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                id={menuId}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleNewest}>Publish Date (Newest)</MenuItem>
                <MenuItem onClick={handleOldest}>Publish Date (Oldest)</MenuItem>
                <MenuItem onClick={handleViews}>Views</MenuItem>
                <MenuItem onClick={handleLikes}>Likes</MenuItem>
                <MenuItem onClick={handleDislikes}>Dislikes</MenuItem>
            </Menu>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;