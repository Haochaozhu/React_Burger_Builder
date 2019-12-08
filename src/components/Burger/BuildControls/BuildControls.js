import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label : 'Salad', type : 'salad'},
    {label : 'Cheese', type : 'cheese'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Meat', type : 'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total price: <strong>{props.totalPrice}</strong></p>
        {controls.map(ele => 
            < BuildControl 
            key={ele.label} 
            label={ele.label}
            addIngredient={() => props.addIngredient(ele.type)}
            removeIngredient = {() => props.removeIngredient(ele.type)}
            disabledInfo = {props.disabledInfo[ele.type]}
            />
        )}
         <button onClick={props.orderClicked} disabled={props.ingredientsAmount === 0} className={classes.OrderButton}>Order now</button>
    </div>
)

export default buildControls;

