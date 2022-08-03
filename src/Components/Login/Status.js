import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from './Account';

const Status = () => {
    const [ status, setStatus ] = useState(false);

    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(session => {
                console.log('Session: ', session);
                setStatus(true)
            })
    },[])
  return (
    <div>
        {status ? 'You are logged in' : 'Please Login'}
    </div>
  )
}

export default Status