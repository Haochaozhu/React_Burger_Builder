import React from 'react';
import classes from './Order.css';

const Order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: Salad:{props.salad}, Meat:{props.meat}, Bacon:{props.bacon}, Cheese:{props.cheese}</p>
        <p>Price : {props.price}</p>
    </div>
);

export default Order