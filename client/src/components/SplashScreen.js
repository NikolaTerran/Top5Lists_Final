import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SplashScreen() {

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

    return (
        <div id="splash-screen" >
            <Typography variant="h2" component="h2" sx={{margin:'20px'}}> Welcome To </Typography>
            <Typography variant="h1" component="h2" sx={{margin:'20px'}}> The Top 5 Lister </Typography>
            <Typography variant="h4" component="h2" sx={{margin:'50px'}}> A Site Where You Can Make Lists About Your Favorite Items! </Typography>
            <Typography variant="h6" component="h2" sx={{margin:'40px'}}> A CSE316 Student Project <br></br>by Tianrun Liu</Typography>
            <Button variant="contained" sx={buttonStyle}><Link to='/register/'>Create Account</Link></Button>
            <Button variant="contained" sx={buttonStyle}><Link to='/login/'>Log in</Link></Button>
            <Button variant="contained" sx={buttonStyle}><Link to='/guest/'>Continue As Guest</Link></Button>
        </div>
    )
}