import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ingredients: {
            //     salad: 0,
            //     meat: 0,
            //     bacon: 0,
            //     cheese: 0
            // },
            // totalPrice: 4,
            ingredientsAmount: 0,
            orderNow: false,
            loading: false
        }
    }

    componentDidMount() {
    }

    // addIngredient = (type) => {
    //     const updatedIngredientsAmount = this.state.ingredientsAmount + 1;
    //     const oldCount = this.state.ingredients[type]
    //     const unpdatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = unpdatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     let newPrice = (oldPrice + priceAddition);
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients,
    //         ingredientsAmount: updatedIngredientsAmount
    //     });
    // }

    // removeIngredient = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     if (oldCount === 0) return;
    //     const unpdatedCount = oldCount - 1;
    //     const updatedIngredientsAmount = this.state.ingredientsAmount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = unpdatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     let newPrice = (oldPrice - priceDeduction);
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients,
    //         ingredientsAmount: updatedIngredientsAmount
    //     })
    // }

    orderClicked = () => {
        this.setState({ orderNow: true });
    }

    orderCanceled = () => {
        this.setState({ orderNow: false });
    }

    orderContinue = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        let orderSummary = null;
        if (this.props.ings) {
            orderSummary = (
                < OrderSummary ingredients={this.props.ings}
                    cancelOrder={this.orderCanceled}
                    continueOrder={this.orderContinue}
                    price={this.props.price.toFixed(1)} />
            )
        }

        let burger = < Spinner />;
        let burgerControl = < Spinner />
        if (this.props.ings) {
            burger = (
                < Burger ingredients={this.props.ings} />
            )
            burgerControl = (
                < BuildControls
                    addIngredient={this.props.onIngredientAdded}
                    removeIngredient={this.props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    totalPrice={this.props.price.toFixed(1)}
                    ingredientsAmount={this.props.ingredientAmount}
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

const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.totalPrice,
        ingredientAmount : state.ingredientAmount
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch({type : actionType.ADD_INGREDIENT, ingredientName : ingName}),
        onIngredientRemoved : (ingName) => dispatch({type : actionType.REMOVE_INGREDIENT, ingredientName : ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
