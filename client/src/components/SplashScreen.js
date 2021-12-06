import { useContext } from 'react';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

export default function SplashScreen() {

    const { store } = useContext(GlobalStoreContext)
    const { auth } = useContext(AuthContext)

    const buttonStyle = {
        bgcolor: '#8de971',
        color: 'black',
        border: '2px solid #000',
        boxShadow: 24,
        margin: "20px",
        fontSize: '24px',
        width: '170px',
        height: '90px',
        p: 2,
      };

    const handleGuest = (event) =>{
        event.preventDefault();
        auth.guest(store)
    }

    return (
        <div id="splash-screen" >
            <Typography variant="h2" component="h2" sx={{margin:'20px'}}> Welcome To </Typography>
            <Typography variant="h1" component="h2" sx={{margin:'20px'}}> The Top 5 Lister </Typography>
            <Typography variant="h4" component="h2" sx={{margin:'50px'}}> A Site Where You Can Make Lists About Your Favorite Items! </Typography>
            <Typography variant="h6" component="h2" sx={{margin:'40px'}}> A CSE316 Student Project <br></br>by Tianrun Liu</Typography>
            <Link to='/register/'><Button variant="contained" sx={buttonStyle}>Create Account</Button></Link>
            <Link to='/login/'><Button variant="contained" sx={buttonStyle}>Log in</Button></Link>
            <Button onClick={handleGuest} variant="contained" sx={buttonStyle}>Continue As Guest</Button>
        </div>
    )
}