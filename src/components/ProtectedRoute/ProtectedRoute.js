import React, { useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import Preloader from '../Preloader/Preloader'


const ProtectedRoute = ({ component: Component, ...props }) => {
    const { user, reset, userRequest } = useSelector(store => ({
        user: store.user.userData,
        reset: store.user.requestResetPassword,
        userRequest: store.user.userRequest
    }));

    useEffect(() => {
        console.log(user)
    }, [user])



    return (<>
        {userRequest ? <Preloader /> :
            <Route path={props.path} exact>
                {props.path === '/login' || props.path === '/register'
                ?
                    (
                        () => user === null ? <Component {...props} /> : <Redirect to="/" />
                    )
                : props.path === '/reset-password' ? 
                    (
                        () => reset ? <Component {...props} /> : <Redirect to="/forgot-password" />
                    )
                :
                    (
                        () => localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/login" />
                    )
                }
            </Route>} </>
    )
}

export default ProtectedRoute;