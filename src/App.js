import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './entform';
import NavBasicExample from './Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import { DefaultPalette, Stack, IStackStyles, IStackTokens, IStackItemStyles } from 'office-ui-fabric-react';
import Profile from './Profile';
import Header from './Header';
import DetailsLists from './contactlist';
// Styles definition
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
function App(props) {

 
  
  return (
    <div className="App" >
      {/* {  window.location.pathname === '/login' || window.location.pathname === '/'   ? null
       : <Header/>
          } */}
     
    <React.Fragment>
    
      <Router>
        <Switch>
           
          
       
         
         
            <Route path="/" exact={true} component={Login}/>
            <Route path="/login"  component={Login}/>
            <Route path="/" component={NavBasicExample}>
            <Route path="/Weather" component={Weather}/>
              <Route path="/ContactList" component={DetailsLists} />
             
            </Route>
          
        
        </Switch>
      </Router>
    </React.Fragment>
    
      {/* <Login/> */}
      {/* <Stack horizontal  styles={itemAlignmentsStackStyles} tokens={itemAlignmentsStackTokens}>
        <Stack.Item align="auto" styles={stackItemStyles}>
        <NavBasicExample/> 
        </Stack.Item>
        <Stack.Item align="center" styles={stackItemStyles}>
         <Weather/>
        </Stack.Item>
      
              
            </Stack.Item>
      </Stack>
       */}
    
     
    </div>
  );
}

export default App;
