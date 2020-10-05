import React, { useState } from 'react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { initializeIcons } from '@uifabric/icons';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import * as ReactIcons from '@fluentui/react-icons';
import { Label } from 'office-ui-fabric-react/lib/Label';
import axios from 'axios';
import { DefaultButton, Link, MessageBar, MessageBarButton, MessageBarType, PrimaryButton } from 'office-ui-fabric-react';
import LoadingSpinner from './loadingspinner';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useId, useBoolean } from '@uifabric/react-hooks';
import { Dialog, DialogType, } from 'office-ui-fabric-react/lib/Dialog';

const Login = (props: any) => {
  initializeIcons();
  const dialogStyles = { main: { maxWidth: 450 } };
  const dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
    keepInBounds: true,
  };
  const dialogContentProps = {
    type: DialogType.close,
    title: 'Forgot Password',
    closeButtonAriaLabel: 'Close',

  };
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(true);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');
  const [open, setOpenDialog] = useState(false);


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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [umsg, setUmsg] = useState('');
  const [pmsg, setPmsg] = useState('');
  const [msg, setMsg] = useState<any>('');
  const [load, setLoading] = useState(false);
  const [showMessageBar, setMessageBar] = useState<any>(false);
  const [modalmsg, showModalMsg] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(true);
  const iconProps = { iconName: 'Accounts' };
  const iconProps1 = { iconName: 'Permissions' };
  const [hidebutton, setShowButton] = useState(true);
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 5 },
    styles: { root: { width: 350 } },

  };

  const stackTokens = { childrenGap: 10 };
  const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };


  function onSubmit(e: any) {
    debugger;
    if (username == undefined || username == null || username == "") {
      setUmsg("Please enter username or email");
      return false;
    }
    else if (password == undefined || password == null || password == "") {
      setPmsg("Please enter  password");
      return false;
    }
    else {

      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://apiuat.actingoffice.com/Auth/SignIn"
      e.preventDefault();

      setLoading(true);

      const userObject = {
        username: username,
        password: password
      };

      axios.post(url, userObject)

        .then((res) => {

          if (res.data.status == true) {

            setLoading(false);
            localStorage.setItem('userId', res.data.result.userId);
            localStorage.setItem('loggedIn', res.data.result.name);
            localStorage.setItem('token',res.data.result.token);
            props.history.push({
              pathname: "/Weather",
              appState: {
                user: res.data.result.name,
                message: 'You are Successfully Logged in'

              }
            });
            console.log('Successfully Login');


            // const timer = setTimeout(() => (<MessageBar/>
            // ), 10000);
            // return () => clearTimeout(timer);
          }

          else {
            setLoading(false);
            setMessageBar(true);
            setMsg(res.data.message);
            setPmsg('');
            setUmsg('');

          }


          console.log(res)
        }).catch(error => {
          setLoading(false);
          setMessageBar(true);
          setMsg(error.message);
          setPmsg('');
          setUmsg('');

          console.log(error);


        });

    };
  }
  function Forgotpassword(e: any) {
    debugger
    const url = "https://apiuat.actingoffice.com/Auth/ForgotPassword"
    e.preventDefault();
    const userObject = {
      email: email,
    };


    axios.post(url, userObject)

      .then((res) => {

        if (res.data.status == true) {
          setShowModal(false);
          setShowButton(false);
          showModalMsg('Please check your email to reset your password.');

        }

        else {
          showModalMsg('');
          setShowModal(true);
          setShowButton(true);
        }


        console.log(res)
      }).catch(error => {




        console.log(error);


      });

  }
  const onOpenModal = (e: any) => {
    setOpenDialog(true);



  }
  const onCloseModal = (e: any) => {
    setOpenDialog(false);
    setEmail('');
    setShowModal(true);
    setShowButton(true);

  }
  return (
    <div>

      { load == true ? <LoadingSpinner />
        :


        <Stack horizontal tokens={stackTokens} style={{ paddingTop: '5%' }}>
          <Dialog
            hidden={hideDialog}
            onDismiss={onCloseModal}
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
            isOpen={open}

          >
            {showModal ?

              <TextField label="Username or email address" iconProps={iconProps} className="txtfield" required errorMessage={umsg} value={email} onChange={(e, v) => {
                setEmail(v || "");
              }} />
              : <p> {modalmsg}</p>

            }
            <hr></hr>

            <Stack className="modalclass">
              {hidebutton ?
                <PrimaryButton onClick={Forgotpassword} text="Submit" />
                : null
              }
              <label>Already have password?<Link href="/login"><b>Sign In</b></Link></label>
            </Stack>

          </Dialog>

          <Card aria-label="Basic vertical card" style={{ margin: 'auto', maxWidth: '400px' }}>

            <Card.Item className="wrapper">
              <Label style={{ fontSize: 20 }}>Sign In</Label>
              <Stack {...columnProps} >
                <TextField label="Username or email address" iconProps={iconProps} errorMessage={umsg} value={username} onChange={(e, v) => {
                  setUsername(v || "");
                  setUmsg("");


                }} />
                <TextField type="Password" label="Password" iconProps={iconProps1} errorMessage={pmsg} value={password} onChange={(e, v) => {
                  setPassword(v || "");
                  setPmsg("");

                }} />


                {/* Message Bar */}

                {showMessageBar == true ? (
                  <MessageBar

                    messageBarType={MessageBarType.error}

                  >

                    <p>{msg}</p>
                  </MessageBar>
                )
                  : null}
              </Stack>
              <Stack className="btnclass">
                <PrimaryButton text="Sign in" onClick={onSubmit} />
                <DefaultButton text="Forgot Password?" style={{ border: 'none' }} onClick={onOpenModal} />
                {/* <Label>Forgot Password?</Label> */}
              </Stack>

            </Card.Item>
          </Card>

        </Stack>
        // <MessageBar
        //     actions={
        //       <div>

        //       </div>
        //     }
        //     messageBarType={MessageBarType.success}
        //     isMultiline={false}
        //   >

        //     <p>{msg}</p>
        //   </MessageBar>
      }

    </div>
  )

}

export default Login;