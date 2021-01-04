import React,{useState, useEffect} from 'react'
import Cart from './components/Cart/Cart'
import Navbar from './components/Navbar/Navbar'
import Products from './components/Products/Products'
import {commerce} from './lib/commerce'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './components/CheckoutForm/Checkout/Checkout'


function App() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const fetchProducts = async () =>{
        const {data} = await commerce.products.list();

        setProducts(data)
    }

    const fetchCart = async () =>{
        const cart = await commerce.cart.retrieve();

        setCart(cart)
    }

    const handleAddToCart = async(productid, quantity) =>{
        const response = await commerce.cart.add(productid,quantity);

        setCart(response.cart);
    }

    const handleUpdateCartQty = async(productId, quantity) =>{
        const response  = await commerce.cart.update(productId, {quantity});

        setCart(response.cart)
    }

    const handleRemoveFromCart = async(productId) =>{
        const response = await commerce.cart.remove(productId);

        setCart(response.cart);
    }

    const handleEmptyCart = async() =>{
        const response = await commerce.cart.empty();

        setCart(response.cart);
    }
    
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
    
        setCart(newCart);
      };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
          const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
    
          setOrder(incomingOrder);
    
          refreshCart();
        } catch (error) {
          setErrorMessage(error.data.error.message);
        }
      };
    
    useEffect(()=>{
        fetchProducts();
        fetchCart();
    },[])

    
    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                         <Products products ={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route path="/carrinho">
                         <Cart cart={cart} 
                         handleUpdateCartQty ={handleUpdateCartQty}
                         handleRemoveFromCart ={handleRemoveFromCart}
                          handleEmptyCart ={handleEmptyCart}
                          />   
                    </Route >
                    <Route path="/finalizar">
                        <Checkout cart={cart}
                         order={order} 
                         onCaptureCheckout={handleCaptureCheckout} 
                         error={errorMessage}
                         />
                    </Route>
                </Switch>
                        
         </div>
        </Router>
       
    )
}

export default App
