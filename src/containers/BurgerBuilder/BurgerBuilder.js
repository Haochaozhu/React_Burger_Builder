import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                meat: 0,
                bacon: 0,
                cheese: 0
            },
            totalPrice: 4,
            ingredientsAmount: 0,
            orderNow: false,
            loading: false
        }
    }

    componentDidMount() {
    }
    addIngredient = (type) => {
        const updatedIngredientsAmount = this.state.ingredientsAmount + 1;
        const oldCount = this.state.ingredients[type]
        const unpdatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = unpdatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let newPrice = (oldPrice + priceAddition);
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
            ingredientsAmount: updatedIngredientsAmount
        });
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount === 0) return;
        const unpdatedCount = oldCount - 1;
        const updatedIngredientsAmount = this.state.ingredientsAmount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = unpdatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let newPrice = (oldPrice - priceDeduction);
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
            ingredientsAmount: updatedIngredientsAmount
        })
    }

    orderClicked = () => {
        this.setState({ orderNow: true });
    }

    orderCanceled = () => {
        this.setState({ orderNow: false });
    }

    orderContinue = () => {
        // this.setState({ loading: true })
        // const data = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'haochao',
        //         address: '10 Galloway Street',
        //         email: 'test@test.com'
        //     }
        // }
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' +
                encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        // axios.post('orders.json', data)
        //     .then(res => {
        //         console.log(res);
        //         this.setState({ loading: false, orderNow: false })
        //         this.props.history.push({
        //             pathname : '/checkout',
        //             search : '?' + queryString
        //         });
        //     }).catch();
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        let orderSummary = null;
        if (this.state.ingredients) {
            orderSummary = (
                < OrderSummary ingredients={this.state.ingredients}
                    cancelOrder={this.orderCanceled}
                    continueOrder={this.orderContinue}
                    price={this.state.totalPrice.toFixed(1)} />
            )
        }

        let burger = < Spinner />;
        let burgerControl = < Spinner />
        if (this.state.ingredients) {
            burger = (
                < Burger ingredients={this.state.ingredients} />
            )
            burgerControl = (
                < BuildControls
                    addIngredient={this.addIngredient}
                    removeIngredient={this.removeIngredient}
                    disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice.toFixed(1)}
                    ingredientsAmount={this.state.ingredientsAmount}
                    orderClicked={this.orderClicked}
                />
            )
        }
        if (this.state.loading) {
            orderSummary = (<Spinner></Spinner>)
        }

        return (
            <Aux>
                <Modal show={this.state.orderNow}
                    clicked={this.orderCanceled}>
                    {orderSummary}
                </Modal>
                {burger}
                {burgerControl}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
