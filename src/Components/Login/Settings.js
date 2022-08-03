import React, { useEffect, useContext, useState, Fragment } from 'react';
import { AccountContext } from './Account';

const Settings = () => {

    const { getSession } = useContext(AccountContext);

    const [ loggedIn, setLoggedIn ] = useState(false);

    // useEffect(() => {
    //     getSession()
    //         .then(() => {
    //             setLoggedIn(true);
    //         })
    // },[])
  return (
    <div>
        {/* {loggedIn && (
            <Fragment>
                <h1>
                    Logged In
                </h1>
            </Fragment>
        )} */}
    </div>
  )
}

export default Settings