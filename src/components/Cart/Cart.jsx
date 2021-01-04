import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './styles';
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'

function Cart({cart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}) {
    const classes = useStyles();
    const url_emoji= "https://st2.depositphotos.com/1001911/7965/v/600/depositphotos_79658338-stock-illustration-laughing-with-closed-eyes-emoticon.jpg";

    const EmptyCart = () =>(
        <Typography variant="subtitle1">O carrinho está vazio
            <Link to="/" className={classes.link}> Comece por adicionar alguns produtos <img style={{height: 20, width:20}} src={url_emoji} alt="happyface_emoji" /></Link>
        </Typography>
    );
    
    const FilledCart = () =>(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        Sub-Total: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton}
                        size="large" 
                        type="button" 
                        variant="contained"
                        color="secondary"
                        onClick={handleEmptyCart}
                        >
                        Limpar Carrinho
                        </Button>
        
                        <Button component={Link} to="finalizar" className={classes.checkoutButton}
                        size="large" 
                        type="button" 
                        variant="contained"
                        color="primary"
                        >
                            Próximo passo
                        </Button>
                     </div>
            </div>
        </>
    );
    
    if(!cart.line_items) return 'Loading...';

   
    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.tittle} variant="h3" gutterBottom>Carrinho</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
