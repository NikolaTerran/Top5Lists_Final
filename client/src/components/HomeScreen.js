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
        store.loadIdNamePairs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    color="inherit"
                >
                    <HomeIcon sx={{fontSize: '40px'}}/>
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    color="inherit"
                >
                    <PersonIcon sx={{fontSize: '40px'}}/>
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    color="inherit"
                >
                    <GroupIcon sx={{fontSize: '40px'}}/>
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    color="inherit"
                >
                    <FunctionsIcon sx={{fontSize: '40px'}}/>
                </IconButton>
            </Box>
            <TextField id="outlined-basic" label="Search" variant="outlined" sx={{marginLeft:'20px',width:'50%'}}/>
            <Stack sx={{ display: { xs: 'none', md: 'flex', marginLeft: 'auto' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
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
                <MenuItem >Publish Date (Newest)</MenuItem>
                <MenuItem >Publish Date (Oldest)</MenuItem>
                <MenuItem >Views</MenuItem>
                <MenuItem >Likes</MenuItem>
                <MenuItem >Dislikes</MenuItem>
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