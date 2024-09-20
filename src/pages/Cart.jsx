import React, { useContext, useState } from "react";
import {Button} from 'react-bootstrap';
import Product from '../components/Product.jsx';
import FormatoMiles from '../components/FormatoMiles.jsx';

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Cart = () => {
  const enviarFormulario = (e) => {
    e.preventDefault()
  }

  const {
    agregarPizza
    ,eliminarPizza
    ,cart
    ,pizzaCart
    ,amount
  } = useContext(CartContext)

  const{token}=useContext(AuthContext)
    return (
      <div>
        <form onSubmit={enviarFormulario}>
            <div className="cls-carrito">
                <div className="cls-columna-pizzas">
                  <h3>Carta Pizzas</h3>
                  {pizzaCart.map(product => (
                    <Product
                      key={product.id}
                      product={product}
                      quantity={cart[product.id]?.cantidad || 0}
                      onAdd={agregarPizza}
                      onRemove={eliminarPizza}
                    />
                  ))}
                </div>

                <div className="cls-columna-detalle">
                  <h3>Detalle de la compra</h3>
                  {Object.values(cart).length === 0 ? (
                    <p>El carrito está vacío</p>
                  ) : (
                    Object.values(cart).map(item => (
                                                      <div key={item.id} className="cls-item-detalle">
                                                        <p>Pizza {item.name}</p>
                                                        <p>Cantidad: {item.cantidad}</p>
                                                        <p>Total: $<FormatoMiles numero={item.price * item.cantidad}/></p>
                                                      </div>
                    ))
                  )}
                  <h4>Total General: $<FormatoMiles numero={amount}/></h4>
                  {/* La propiedad "disabled" funciona al reves del estado del token */}
                  <Button variant="primary" disabled={!token}>Pagar</Button>
                </div>
            </div>
        </form>
      </div>
    );
  };

export default Cart;
