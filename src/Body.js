import React, { useState, useEffect } from 'react';
import loginObservable from './LoginObs';
const Body = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);

  const onLoginStateChanged = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
    console.log('Login state changed in Header', isLoggedIn);
  };

  useEffect(() => {
    loginObservable.subscribe(onLoginStateChanged);
    return () => {
      loginObservable.unsubscribe(onLoginStateChanged);
    };
  }, [loginObservable]);
  return (
    <div className="p-2 flex-1">
      <span>
        {loggedIn ? 'This is the best app ever' : 'You need to log in'}
      </span>
    </div>
  );
};

export default Body;
