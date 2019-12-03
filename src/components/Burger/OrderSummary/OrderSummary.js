import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

    render() {
        const items = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {this.props.ingredients[igKey]}
            </li>
        })    
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Your burger contains the following ingredients</p>
                <ul>
                    {items}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <Button btnType='Danger' clicked={this.props.cancelOrder}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continueOrder}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;