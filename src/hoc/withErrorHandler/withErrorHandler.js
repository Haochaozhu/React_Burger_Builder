import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHanlder = (WrapppedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error : null
            }
        }
        UNSAFE_componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error : null});
                return req
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error : error});
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        clearErrorModalHandler = () => {
            this.setState({error : null})
        }
        render() {
            return (
                <Aux>
                <Modal show={this.state.error} clicked={this.clearErrorModalHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrapppedComponent {...this.props}/>
            </Aux>
            )
        }
    }
}

export default withErrorHanlder