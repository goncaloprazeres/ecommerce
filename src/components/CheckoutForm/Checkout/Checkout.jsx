import React, {useState, useEffect} from 'react'
import {CssBaseline,Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'
import useStyles from './styles'
import AddresForm from '../AddresForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce'
import { Link, useHistory } from 'react-router-dom';

const steps = ['Endereço de faturação', 'Pagamento'];

function Checkout({cart,order,onCaptureCheckout,error}) {
    const classes = useStyles();    
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const url_emoji= "https://st2.depositphotos.com/1001911/7965/v/600/depositphotos_79658338-stock-illustration-laughing-with-closed-eyes-emoticon.jpg";
    const img = <img height='20px' width='20px' src={url_emoji} alt="emoji_happyface" />;
    const history = useHistory()

    useEffect(()=>{
        const generateToken = async ()=>{
            try {
                const token = await commerce.checkout.generateToken(cart.id,{type: 'cart'});
                
                setCheckoutToken(token);
            } catch (error) {
                if (activeStep !== steps.length)  history.push('/');
            }
        }
        generateToken();
    },[cart]);

    const nextStep = () => setActiveStep((prevActiveStep)=>prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep)=>prevActiveStep - 1);

    const next = (data) =>{
        setShippingData(data);

        nextStep();
    }

    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Obrigado pela sua compra, {order.customer.firstname} {order.customer.lastname}!</Typography><br />
            <Typography variant="h5">Agora é só aguardar notícias nossas no seu email.</Typography><br />
            <Typography variant="subtitle1" >Não se esqueça de verificar o seu correio de spam {img}</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Voltar à página principal</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
      if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Voltar à página principal</Button>
          </>
        );
      }

    const Form = () => activeStep === 0 ? 
    <AddresForm checkoutToken={checkoutToken} next={next} /> 
    : <PaymentForm shippingData={shippingData} 
    checkoutToken={checkoutToken} 
    backStep={backStep}
    onCaptureCheckout={onCaptureCheckout}
    nextStep={nextStep}
     />

    
    return (
        <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Finalizando...</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
    )
}

export default Checkout
