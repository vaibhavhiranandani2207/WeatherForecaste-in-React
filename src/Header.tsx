import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField, PrimaryButton, DefaultButton, IconButton } from 'office-ui-fabric-react';
import { makeStyles } from '@material-ui/core';
import Profile from './Profile';
const Header=(props:any)=>{
    const [session, setSession] = useState(localStorage.getItem('userId'));
    const [errormsg, setErrorMsg] = useState('Please Login First');
    const [login, setLogin] = useState(localStorage.getItem('loggedIn'));
    const[hideHeader,setHideHeader]=useState('');
    function handleLogout(history:any) {
      localStorage.clear();
      setSession('');
      props.history.push('/login');
    };
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    }));
    const classes = useStyles();
    return(
    <AppBar position="static" style={{ background: 'bleeding' }}>
            <Toolbar style={{ marginLeft: 300 }}>

              <Typography variant="h6" className={classes.title}>
                Weather Forecast App
          </Typography>
              <Button color="inherit">Welcome::::: <h4>{ login}</h4></Button>
              <DefaultButton text="Profile" onClick={Profile} />
              <DefaultButton text="Logout" onClick={handleLogout} />
            </Toolbar>
          </AppBar>
);
}
export default  Header;