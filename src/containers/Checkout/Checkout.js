import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = ({
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        },
        totalPrice : 0
    })

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let params of query.entries()) {
            if (params[0] === 'price') {
                price = params[1];
            } else {
                ingredients[params[0]] = +params[1];
            }
        }
        this.setState({ ingredients: ingredients, totalPrice : price });
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>This is your burger!</h1>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancelClicked={this.cancelCheckoutHandler}
                    continueClicked={this.continueCheckoutHandler}>
                </CheckoutSummary>
                <Route path={this.props.match.path + '/contact-data'}
                render={(props) => (<ContactData 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice} {...props}></ContactData>)}>
                </Route>
            </div>
        )
    }
}
export default Checkout;