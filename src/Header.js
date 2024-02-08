import React, { useState, useEffect } from 'react';
import loginObservable from './LoginObs';
import logo from './logo.svg';

const Header = () => {
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
    <div className="header flex py-2 px-3 bg-slate-100 text-white shadow-lg">
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="flex-1"></div>
      <div className="user-info flex items-center gap-4">
        {loggedIn ? (
          <button
            onClick={() => {
              loginObservable.notify(false);
            }}
            className="bg-black py-1.5 px-3 rounded-sm text-sm text-white hover:opacity-75"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              loginObservable.notify(true);
            }}
            className="bg-black py-1.5 px-3 rounded-sm text-sm text-white hover:opacity-75"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
