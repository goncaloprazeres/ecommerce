import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import {LocalLibraryTwoTone, ShoppingCart} from '@material-ui/icons';
import logo from '../../assets/logo.png';
import useStyles from './styles';
import {Link, useLocation} from 'react-router-dom'

function Navbar({totalItems}) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
          <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce shop" height="25px" className={classes.image}/>
                        Nome da loja
                    </Typography>
                    <div className={classes.grow}></div>
                     {location.pathname === '/' && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/carrinho" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                    )}
                </Toolbar>
          </AppBar>  
        </>
    )
}

export default Navbar
