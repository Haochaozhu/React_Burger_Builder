import React, { Component }from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.css';

class CheckoutSummary extends Component {
    
    render () {
        return (
            <div className={classes.CheckoutSummary}>
                <Burger ingredients={this.props.ingredients}></Burger>
                <Button clicked={this.props.continueClicked} btnType='Success'>Continue</Button>
                <Button clicked={this.props.cancelClicked}btnType='Danger'>Cancel</Button>
            </div>
        )
    }
}
export default CheckoutSummary;