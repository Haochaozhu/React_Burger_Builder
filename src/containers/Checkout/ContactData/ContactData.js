import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value : '',
                validation : {
                    required: true
                },
                valid : false
            },
            email: {
                elementType : 'input',
                elementConfig : {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value : '',
                validation : {
                    required: true
                },
                valid : false
            },
            street: {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Your Street address'
                },
                value : '',
                validation : {
                    required: true
                },
                valid : false
            },
            postalCode: {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Your post code'
                },
                value : '',
                validation : {
                    required: true
                },
                valid : false
            },
            delieveryMethod: {
                elementType : 'select',
                elementConfig : {
                    options : [{value:'fast', displayValue:'Fast'},
                    {value:'regular', displayValue:'Regular'}
                ]
                },
                value : 'fast'
            }
        },
        loading: false
    }

    checkValidity = (value, rules) => {
        let isValid = false;
        
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    orderNowHandler = (event) => {
        console.log('hi')
        event.preventDefault();
        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
            console.log(formData[formElement])
        }

        this.setState({ loading: true })

        const data = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            customerData : formData
        }

        axios.post('orders.json', data)
            .then(res => {
                this.setState({ loading: false })
                this.props.history.push('/');
            }).catch();
    }

    inputChangeHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        let updatedForm = {
            ...this.state.orderForm
        }
        updatedForm[inputIdentifier].valid = this.checkValidity(event.target.value, updatedForm[inputIdentifier].validation)
        updatedForm[inputIdentifier].value = event.target.value;
        this.setState({orderForm : updatedForm});
        console.log(updatedForm[inputIdentifier].valid);
    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id : key,
                config:this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderNowHandler}>
                {formElementsArray.map(ele => (
                    <Input 
                    changed={(event) => this.inputChangeHandler(event, ele.id)}
                    key = {ele.id}
                    elementType={ele.config.elementType}
                    elementConfig={ele.config.elementConfig}
                    value={ele.config.value}>
                    </Input>
                ))}
                <Button btnType='Success'>Order Now</Button>
            </form>
        )

        if (this.state.loading) {
            form = (<Spinner></Spinner>);
        } else {

        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;