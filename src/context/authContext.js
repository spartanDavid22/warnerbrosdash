import React from 'react';

const authContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: () =>{ }
});

export default authContext;