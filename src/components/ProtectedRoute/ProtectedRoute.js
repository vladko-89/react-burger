import React from 'react';
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import Preloader from '../Preloader/Preloader'


const ProtectedRoute = ({ component: Component, ...props }) => {
    const { user, reset, userRequest } = useSelector(store => ({
        user: store.user.userData,
        reset: store.user.requestResetPassword,
        userRequest: store.user.userRequest
    }));
    const location = useLocation();

    return (<>
        {userRequest ? <Preloader /> :
            <Route path={props.path} exact>
                { props.path === '/login' ? 
                
                (
                    () => user === null ? <Component {...props} /> : <Redirect to={location.state?.from.pathname || '/'} />
                )
                
                : props.path === '/register' ? 
                
                    (
                        () => user === null ? <Component {...props} /> : <Redirect to="/" />
                    )

                : props.path === '/reset-password' ? 
                    (
                        () => reset ? <Component {...props} /> : <Redirect to="/forgot-password" />
                    )
                    
                : props.path === '/forgot-password' ? 
                    (
                        () => !user ? <Component {...props} /> : <Redirect to="/" />
                    )
                :
                    (
                        () => localStorage.getItem('token') ? <Component {...props} /> : <Redirect to={{pathname: '/login', state: {from: location}}} />
                    )
                }
            </Route>} </>
    )
}

export default ProtectedRoute;