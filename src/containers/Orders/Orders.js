import React, { Component }from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
    state = {
        orders : [],
        loading : true
    }

    componentDidMount() {
        axios.get('/orders.json').then( res => {
            let fetchedOrder = [];
            for (let key in res.data) {
                fetchedOrder.push({
                    ...res.data[key],
                })
            }
            this.setState({orders : fetchedOrder, loading : false})
        }
        ).catch(
            error => {
                this.setState({loading : false})
            }
        )
    }
    render () {
        let orders = this.state.orders.map((key, idx) => {
            return <Order
                    salad = {this.state.orders[idx]['salad']}
                    meat={this.state.orders[idx]['meat']}
                    bacon={this.state.orders[idx]['bacon']}
                    cheese={this.state.orders[idx]['cheese']}
                    price={this.state.orders[idx]['price']}
                    key = {idx}
                    />
        })
       
        return (
            <div>
                {/* <Order salad={this.state.orders[0]['salad']}
                meat={this.state.orders[0]['meat']}
                bacon={this.state.orders[0]['bacon']}
                cheese={this.state.orders[0]['cheese']}
                /> */}
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);