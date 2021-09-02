import React, { useState } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { CLEAR_ORDER, CLEAR_CONSTRUCTOR } from '../../systems/actions/index';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProfilePage from '../../pages/Profile/Profile'
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import {MainPage, Register, Login, IngredientView, ForgotPassword, ResetPassword, PageNotFound} from '../../pages';

const ModalSwitch = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    let background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;;

    const [modalOrder, setModalOrder] = useState(false);

    const [modalIngredientsDetailsIsOpened, setModalIngredientsDetailsIsOpened] = React.useState(false);
    const [modalOrderDetailsIsOpened, setModalOrderDetailsIsOpened] = React.useState(false);

    const handleClickOnCard = () => {
        setModalIngredientsDetailsIsOpened(true);
    }

    const handleCloseModal = () => {
        setModalOrderDetailsIsOpened(false);
        setModalIngredientsDetailsIsOpened(false);
        if (modalOrder) {
            dispatch({type: CLEAR_ORDER});
            dispatch({type: CLEAR_CONSTRUCTOR});
            setModalOrder(false);
        }
        if (!modalOrder) {
            history.goBack();

        }
    }

    const handleClickOnButton = () => {
        setModalOrder(true);
        setModalOrderDetailsIsOpened(true);
    }

    return (
        <>
            <Switch location={background || location}>
                <Route exact path="/">
                    <MainPage handleClickOnCard={handleClickOnCard} handleClickOnButton={handleClickOnButton} />
                </Route>
                <Route path={`/ingredients/:id`}>
                    <IngredientView />
                </Route>

                <ProtectedRoute component={Login} path="/login" />
                <ProtectedRoute path="/profile" component={ProfilePage} />
                <ProtectedRoute path="/forgot-password" component={ForgotPassword} />
                <ProtectedRoute path="/reset-password" component={ResetPassword} />
                <ProtectedRoute component={Register} path="/register" />
                <Route>
                    <PageNotFound />
                </Route>
            </Switch>

            {background && <Route path='/ingredients/:id'><IngredientDetails
            modalOrder={modalOrder}
            isOpened={modalIngredientsDetailsIsOpened}
            onClose={handleCloseModal}
            /></Route>}

            <OrderDetails
                modalOrder={modalOrder}
                isOpened={modalOrderDetailsIsOpened}
                onClose={handleCloseModal}
            />
        </>
    )

}

export default ModalSwitch;