import React from 'react'
import {Typography, List, ListItem, ListItemText} from '@material-ui/core'

function Review({shippingData,checkoutToken}) {
    const sD = [{
        city: `${shippingData.city}`,
        address: `${shippingData.address1}`,
        email: `${shippingData.email}`
         }]
        
    return (
            <>

        <Typography variant="h6" gutterBottom>Está tudo correcto?</Typography>
        <List disablePadding>
          {checkoutToken.live.line_items.map((product) => (
            <ListItem style={{ padding: '10px 0' }} key={product.name}>
              <ListItemText primary={product.name} secondary={`Quantidade: ${product.quantity}`} />
              <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
            </ListItem>
          ))} 

          <ListItemText align="center" primary="Dados de envio:"/>
         
            <ListItem style={{ padding: '10px 0'}}>
                <ListItemText align='center' primary="Cidade" secondary={sD.map((d)=>d.city)}/> 
                <ListItemText align='center' primary="Rua" secondary={sD.map((d)=>d.address)}/>
                <ListItemText align='center' primary="Email" secondary={sD.map((d)=>d.email)}/>
            </ListItem>              
           

          <ListItem style={{ padding: '10px 0'}}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              {checkoutToken.live.subtotal.formatted_with_symbol}
            </Typography>
          </ListItem>
        </List>
      </>
    )
}

{/**/}
export default Review
