import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from "../Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
    state = {
        showSideDraw: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({showSideDraw : false});
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return {showSideDraw : !prevState.showSideDraw};
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar showSideDrawer={this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDraw} closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout;