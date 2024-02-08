import React, { useState, useEffect } from 'react';
import loginObservable from './LoginObs';
const Footer = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const onLoginStateChanged = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
    console.log('Login state changed in Footer', isLoggedIn);
  };

  useEffect(() => {
    loginObservable.subscribe(onLoginStateChanged);
    return () => {
      loginObservable.unsubscribe(onLoginStateChanged);
    };
  }, [loginObservable]);
  return (
    <div className="p-2 bg-gray-800 text-white text-center">
      This is a footer. <span>{loggedIn ? 'Enjoy' : 'You need to log in'}</span>
    </div>
  );
};

export default Footer;
