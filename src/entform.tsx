import React, { useState, useEffect } from 'react';
import { TextField, PrimaryButton, DefaultButton, IconButton, mergeStyleSets, getTheme } from 'office-ui-fabric-react';
import axios from 'axios';
import { Card, ICardTokens } from '@uifabric/react-cards';
import Image, { Shimmer } from 'react-shimmer'
import './App.css';
import {
  FontWeights,
  Stack,
  IStackTokens,
  Text,
  ITextStyles,
  DefaultPalette
} from 'office-ui-fabric-react';
import NavBasicExample from './Nav';
import LoadingSpinner from './loadingspinner';
import Search from './Search';
import { mergeStyles } from '@fluentui/react';
import { Link, MessageBar, MessageBarButton, MessageBarType } from 'office-ui-fabric-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useId, useBoolean } from '@uifabric/react-hooks';
import { Dialog, DialogType, } from 'office-ui-fabric-react/lib/Dialog';
import { initializeIcons } from '@uifabric/icons';
import {
  Modal,
  IDragOptions,
  IIconProps,
} from 'office-ui-fabric-react';
const Weather = (props: any) => {
  initializeIcons();
  const [session, setSession] = useState<any>(localStorage.getItem('userId'));
  const [errormsg, setErrorMsg] = useState('Please Login First');
  const [login, setLogin] = useState(localStorage.getItem('loggedIn'));
  const [showModal, setShowModal] = useState(false);
  React.useEffect(() => {
    if ((localStorage.getItem('userId')) !== '' && (localStorage.getItem('userId') != null)) {
      setSession(localStorage.getItem('userId'));
      setLogin(localStorage.getItem('loggedIn'));
    }
    else {
     
      setSession('');
    localStorage.clear();
    }
  })
  // const theme = getTheme();
  // const contentStyles = mergeStyleSets({
  //   container: {
  //     display: 'flex',
  //     flexFlow: 'column nowrap',
  //     alignItems: 'stretch',
  //   },
  //   header: [
      
  //     theme.fonts.xLargePlus,
  //     {
  //       flex: '1 1 auto',
  //       borderTop: `4px solid ${theme.palette.themePrimary}`,
  //       color: theme.palette.neutralPrimary,
  //       display: 'flex',
  //       alignItems: 'center',
  //       fontWeight: FontWeights.semibold,
  //       padding: '12px 12px 14px 24px',
  //     },
  //   ],
  //   body: {
  //     flex: '4 4 auto',
  //     padding: '0 24px 24px 24px',
  //     overflowY: 'hidden',
  //     selectors: {
  //       p: { margin: '14px 0' },
  //       'p:first-child': { marginTop: 0 },
  //       'p:last-child': { marginBottom: 0 },
  //     },
  //   },
  // });

  const titleId = useId('title');
  const cancelIcon: IIconProps = { iconName: 'Cancel' };
  const descriptionTextStyles: ITextStyles = {
    root: {
      color: '#333333',
      fontWeight: FontWeights.semibold,
    },
  };


  const subduedTextStyles: ITextStyles = {
    root: {
      color: '#666666',

    },
  };

  const wrapperClass = mergeStyles({
    marginLeft: 128,


  });
  const stackStyles = {
    root: {
      background: "#f1f1f1",
    },
  };
  const stackItemStyles = {
    root: {
      background: DefaultPalette.themeLighter,
      // color: DefaultPalette.white,
      padding: 5,
    },
  };
  const itemAlignmentsStackStyles = {
    root: {
      background: '#f1f1f1',
    },
  };

  // Tokens definition

  const itemAlignmentsStackTokens = {
    childrenGap: 400,
    padding: 10,
  };
  const clickableStackTokens = {
    padding: 10,
  };
  const stackTokens = { childrenGap: 10 };
  const apiKey = "8ddceeacaf8b95fe943c88fc8389dee0";
  const theme = getTheme();
  const contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
      width:'500px',

    },
    header: [
    
      theme.fonts.xLargePlus,
      {
        flex: '1 1 auto',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: 'flex',
        alignItems: 'center',
        fontWeight: FontWeights.semibold,
        padding: '12px 12px 14px 24px',
      },
    ],
    body: {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
     
      selectors: {
        p: { margin: '14px 0' },
        'p:first-child': { marginTop: 0 },
        'p:last-child': { marginBottom: 0 },
      },
    },
  });
  const toggleStyles = { root: { marginBottom: '20px' } };
  const iconButtonStyles = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: 'auto',
      marginTop: '4px',
      marginRight: '2px',
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
  };


  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [description, setDescription] = useState('');
  const [showResults, setShowResults] = React.useState(false);
  const [load, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const[token,setToken]=useState(localStorage.getItem('token'));
  const [profile,setProfileData]=useState<any[]>([]);

  const dialogStyles = { main: { maxWidth: 450 ,width:600 } };
  const dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
    keepInBounds: true,
  };
  const dialogContentProps = {
    type: DialogType.close,
    title: 'Profile',
    closeButtonAriaLabel: 'Close',

  };
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(true);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');
  const [open, setOpenDialog] = useState(false);
 
 const[fullName,setFullName] =useState('');
 const[ uname,setUserName]=useState('');
 const[fname ,setFirstName]=useState('');
 const[lname ,setLastName]=useState('');
 const[ gender,setGender]=useState('');
 const[ email,setEmail]=useState('');
 const[ address,setAddress]=useState('');

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId],
  );
  const sectionStackTokens: IStackTokens = { childrenGap: 30 };
  const cardTokens: ICardTokens = { childrenMargin: 12 };
  function handleLogout(history: any) {
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

  function handleSubmit(e: any) {
    debugger;
    //const proxyurl="https://cors-anywhere.herokuapp.com/";
    const url = `https://api.openweathermap.org/data/2.5/weather/?q=${city},${country}&appid=${apiKey}&units=metric`;
    e.preventDefault();

    setLoading(true);

    axios.get(url)
      .then(res => {
        setLoading(false);
        setData(res.data);
        setTemperature(res.data.main.temp);
        setDescription(res.data.weather[0].description)
        setHumidity(res.data.main.humidity)
        setShowResults(true);
      })
      .catch(error => {
        console.log(error.response)
      });

  };
  const onOpenModal = (e: any) => {
    setOpenDialog(true);



  }
  const onCloseModal = (e: any) => {
    setOpenDialog(false);
    // setEmail('');
    // setShowModal(true);
    // setShowButton(true);

  }
function Profile(e:any){
  debugger;
  const url = 'https://apiuat.actingoffice.com/Auth/Profile';
  e.preventDefault();

 
  const userObject = {
    headers: { Authorization: `Bearer ${token}`,
 }
    
  };
  axios.get(url,userObject)
    .then((res) => {
      if (res.data.status == true) {
        onOpenModal(e);
        setFullName(res.data.result.fullName);
        setUserName(res.data.result.userName);
        setFirstName(res.data.result.name.first);
        setLastName(res.data.result.name.last);
        setGender(res.data.result.gender);
        setEmail(res.data.result.email);
        setAddress(res.data.result.address);
        console.log('Successfully Login');


        // const timer = setTimeout(() => (<MessageBar/>
        // ), 10000);
        // return () => clearTimeout(timer);
      }

      else {
        setLoading(false);
       

      }


      console.log(res)
    }).catch(error => {
      
     //setMsg(error.message);
      

      console.log(error);


    });


};

function UpdateProfile(e:any){
  debugger
  const url = 'https://apiuat.actingoffice.com/Auth/Profile';
  e.preventDefault();

  const headers= { "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}` }
  const userObject = {
  
   
      firstName: fname,
      lastName: lname,
      address: {
        building: "",
        street: "",
        city: "",
        county: "",
        postcode: "",
        country: ""
      },
      gender: gender,
      birthDate: "",
      email: email,
      phone: ""
    
    
  };
  axios.post(url,userObject,{headers})
    .then((res) => {
      if (res.data.status == true) {
        
        alert('Values Updated Successfully');
            setOpenDialog(false);

        // const timer = setTimeout(() => (<MessageBar/>
        // ), 10000);
        // return () => clearTimeout(timer);
      }

      else {
        setLoading(false);
       

      }


      console.log(res)
    }).catch(error => {
      
     //setMsg(error.message);
      

      console.log(error);


    });

};
  return (
    <>

      { session==null || session ==''  ?
       props.history.push('/login')
      :   <div>
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

          <Modal
        titleAriaId={titleId}
        isOpen={open}
        onDismiss={onCloseModal}
        isBlocking={false}
        containerClassName={contentStyles.container}
        dragOptions={isDraggable ? dragOptions : undefined}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Profile</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={onCloseModal}
          />
        </div>
        <div className={contentStyles.body}>
     
     
             
             <TextField label="Full Name"  className="txtfield" value={fullName} onChange={(e, v) => {
                      setFullName(v || "");

                    }}  required />
             <TextField label="Username"  className="txtfield" value={uname} onChange={(e, v) => {
                      setUserName(v || "");

                    }} required  />
           
             <TextField label="First Name"  className="txtfield" value={fname} onChange={(e, v) => {
                      setFirstName(v || "");

                    }} required />
             <TextField label="Last Name"  className="txtfield" value={lname} onChange={(e, v) => {
                      setLastName(v || "");

                    }} required />
            
             <TextField label="Gender"  className="txtfield" value={gender} onChange={(e, v) => {
                      setGender(v || "");

                    }} required />
             <TextField label="Address"  className="txtfield" onChange={(e, v) => {
                      setAddress(v || "");

                    }} required />
            
             <TextField label="Email"  className="txtfield" value={email} onChange={(e, v) => {
                      setEmail(v || "");

                    }} required />
            
            
          
        
        </div>
        <Stack className="modalclass">
        <PrimaryButton onClick={UpdateProfile} text="Update" />
        </Stack>
      </Modal>
          {/* <Dialog
            hidden={hideDialog}
            onDismiss={onCloseModal}
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
            isOpen={open}
           
          >
              <Stack style={{overflow:'hidden',width:'100%'}}>
             
              <TextField label="Full Name"  className="txtfield" value={fullName}  required />
              <TextField label="Username"  className="txtfield" value={uname} required  />
            
              <TextField label="First Name"  className="txtfield" value={fname} required />
              <TextField label="Last Name"  className="txtfield" value={lname} required />
             
              <TextField label="Gender"  className="txtfield" value={gender} required />
              <TextField label="Address"  className="txtfield" required />
             
              <TextField label="Email"  className="txtfield" value={email} required />
             
              </Stack>

            
            <hr></hr>

            <Stack className="modalclass">
            
                <PrimaryButton onClick={Profile} text="Update" />
              
              
            </Stack>

          </Dialog> */}
         
          <Stack horizontal styles={itemAlignmentsStackStyles} tokens={itemAlignmentsStackTokens}>

            <Stack.Item align="auto" styles={stackItemStyles}>
              <NavBasicExample />
            </Stack.Item>

            <div>
              <Stack.Item align="center" styles={stackItemStyles}>
                <form >
                  <div style={{ width: 480 }} >
                    <TextField label="City" value={city} onChange={(e, v) => {
                      setCity(v || "");

                    }} />
                    <TextField label="Country" value={country} onChange={(e, v) => {
                      setCountry(v || "");

                    }} />
                    <PrimaryButton text="Submit" onClick={handleSubmit} style={{ marginTop: 20 }} allowDisabledFocus />
                  </div>
                </form>
              </Stack.Item>

      {


                load ? <Shimmer width={200} height={300} className={wrapperClass} />
                  : showResults && <Stack horizontal tokens={sectionStackTokens} style={{ marginLeft: 128, marginTop: 50 }} >

                    <Card
                      aria-label="Clickable vertical card with image bleeding at the top of the card"

                      tokens={cardTokens}
                    >
                      <Card.Section>
                        <Text variant="small" styles={subduedTextStyles}>
                          City
              </Text>
                        <Text styles={descriptionTextStyles}>{city}</Text>
                      </Card.Section>
                      <Card.Section>
                        <Text variant="small" styles={subduedTextStyles}>
                          Temperature
              </Text>
                        <Text styles={descriptionTextStyles}>{temperature}</Text>
                      </Card.Section>
                      <Card.Section>
                        <Text variant="small" styles={subduedTextStyles}>
                          Humidity
              </Text>
                        <Text styles={descriptionTextStyles}>{humidity}</Text>
                      </Card.Section>

                      <Card.Section>
                        <Text variant="small" styles={subduedTextStyles}>
                          Description
              </Text>
                        <Text styles={descriptionTextStyles}>{description}</Text>
                      </Card.Section>

                      <Card.Item grow={1}>
                        <span />
                      </Card.Item>

                    </Card>
                  </Stack>

              }

            </div>

          </Stack>

        </div>
        // : <MessageBar
        //     actions={
        //       <div>

        //       </div>
        //     }
        //     messageBarType={MessageBarType.error}
        //     isMultiline={false}
        //   >
       
        //     <p>{errormsg}</p>
        //   </MessageBar>
}
    </>

  )

}
export default Weather;


