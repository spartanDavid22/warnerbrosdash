import React, {useState, useContext, useEffect } from 'react';
import './App.css';
import Login from './components/authentication/Login';
import Header from './components/header/Header';
import AuthContext from './context/authContext';
import HomeDash from './components/home/HomeDash';
import WatchStream from './pages/WatchStream';
import {Redirect, Route, Switch} from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import FileContext from './context/fileContext';

import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const getFilesURL = "https://gr7vpjoo9l.execute-api.us-east-1.amazonaws.com/default/getImages";

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [files, setFiles] = useState([]);
   
  useEffect(()=>{
    fetch(getFilesURL,{
        method: "GET"
    }).then(res =>{
        return res.json();
    }).then(data=>{
        let temp = [];
        data.map(item=>{
            temp.push(item);
        })
        setFiles(temp);
    })
  },[])

  function logoutHandler(){
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      setIsLoggedIn: setIsLoggedIn,
      onLogout: logoutHandler
    }}>

      <Header/>
    <FileContext.Provider value={{files:[]}}>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/login'/>
        </Route>
        <Route path='/login'><Login/></Route>
        {isLoggedIn && <Route path='/dashboard' exact><HomeDash files={files}/></Route>}
        {isLoggedIn && <Route path='/dashboard/:videoId'><WatchStream/></Route>}
        <Route path='*'><PageNotFound/></Route>
      </Switch>
    </FileContext.Provider>

      
    </AuthContext.Provider>
  );
}

export default App;
