import React from 'react';
import { Switch, Route } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import FormEditProfile from '../../components/FormEditProfile/FormEditProfile';
import { PageNotFound } from '../index'
import styles from './Profile.module.css';

const ProfilePage = () => {
    return (
        <div className={`${styles.container} mt-30`}>
            <NavBar />
            <Switch>
                <Route exact path='/profile'>
                    <FormEditProfile />
                </Route>
                <Route exact path='/profile/orders'>
                    <PageNotFound />
                </Route>
            </Switch>
        </div>
    )
}

export default ProfilePage;