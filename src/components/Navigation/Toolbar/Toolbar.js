import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggler from '../Sidedrawer/SideDrawToggler/SideDrawToggler';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawToggler clicked={props.showSideDrawer}></DrawToggler>
        <div className={classes.Logo}><Logo height="80%" /> </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems></NavigationItems>
        </nav>
    </header>
);

export default toolbar;
