import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrop, useDrag } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_ORDER,
  INGREDIENT_COUNT_DECREMENT
  } from '../../systems/actions/index';
import { card } from '../../utils/data';
import styles from './FilingConstructor.module.css';

const  FilingConstructor = ({id, index, moveCard, item}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0.3 : 1;
    drag(drop(ref));

    const handleDelete = (uuid, id) => {
      dispatch({
        type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
        uuid: uuid
      })
      dispatch({
        type: INGREDIENT_COUNT_DECREMENT,
        id: id,
        counter: 1
      })
      dispatch({type: DELETE_INGREDIENT_FROM_ORDER, id: id})
    }

  return (
    <li className={`${styles.filling} mb-2`} style={{opacity}} ref={ref} index={index} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => handleDelete(item.uuid, item._id)}
      />
    </li>
  )
}

FilingConstructor.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
  item: card
}

export default FilingConstructor;