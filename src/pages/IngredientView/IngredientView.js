import React, {useEffect}  from 'react';
import {useDispatch,  useSelector } from 'react-redux';
import {getIngredients} from '../../systems/actions'

import {useParams} from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader';



import styles from './IngredientView.module.css'

const IngredientView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    const {id} = useParams();


    const {ingredients, ingredientsRequest} = useSelector(store => ({
        ingredients: store.ingredients.ingredients,
        ingredientsRequest: store.ingredients.ingredientsRequest,
    }))
    const card = ingredients.find(item => item._id === id)
    if (ingredients.length > 0) {
        return (
            <>
            { ingredientsRequest ? <Preloader /> :
                <div className={`${styles.content} pt-10 pl-10 pb-15`}>
                <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
                <img className={`${styles.container__image} mb-4`} src={card.image_large} alt={`Изображение ${card.name}`} />
                <p className="text text_type_main-medium mb-8">{card.name}</p>
                <ul className={`${styles.container__attributes} mb-15`}>
                    <li className={`${styles.container__attribute}`}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className={`${styles.value} text text_type_digits-default text_color_inactive`}>{card.calories}</p>
                    </li>
                    <li className={`${styles.container__attribute} ml-5`}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className={`${styles.value} text text_type_digits-default text_color_inactive`}>{card.proteins}</p>
                    </li>
                    <li className={`${styles.container__attribute} ml-5`}>
                    <p className="text text_type_main-default text_color_inactive">Жири, г</p>
                    <p className={`${styles.value} text text_type_digits-default text_color_inactive`}>{card.fat}</p>
                    </li>
                    <li className={`${styles.container__attribute} ml-5`}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className={`${styles.value} text text_type_digits-default text_color_inactive`}>{card.carbohydrates}</p>
                    </li>
                </ul>
            </div>
            }
            </>
        )
    }
    return <></>
    
}

export default IngredientView;