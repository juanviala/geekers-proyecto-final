import React, { useState, useContext, useEffect } from 'react';
import Button from './Button'
import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from '../index'

function Cart() {
    const {removeItem, items, setItems, fullTotal} = useContext(CartContext);
    const [isCart, setIsCart] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        items.length > 0
        ? setIsCart(true)
        : setIsCart(false);
    }, [items]);

    const addOrder = () => {
        if(document.getElementById('form-email').value === document.getElementById('check-email').value) {
            setLoading(true);

            const db = getFirestore();        
            const orders = db.collection('orders');

            const products = items.map(item => ({
                title: item.name,
                price: item.price,
                quantity: item.amount,
                id: item.id,
                color: item.color,
                size: item.size
            }));

            const newOrder = {
                buyer: {
                    name: document.getElementById('form-name').value,
                    phone: document.getElementById('form-phone').value,
                    email: document.getElementById('form-email').value,
                    address: document.getElementById('form-address').value
                    },
                items: products,
                total: fullTotal,
                date: firebase.firestore.Timestamp.fromDate(new Date())
            };
            
            orders.add(newOrder)
                .then(({ id }) => {
                    setOrderId(id);
                }).catch((error) => {
                    console.log(error)
                }).finally(() => {
                    updateStock();
                    setLoading(false);
                });
        } else {
            document.getElementById('check-label').style.display = 'block'
        }
    }

    const updateStock = () => {
        const db = getFirestore();
        items.forEach((item, index) => {
            const itemDoc = db.collection('items').doc(item.id)
            const newAmount = item.details[item.size][item.color].stock - items[index].amount;
            const size = item.size;
            const color = item.color;
            const actualizarStock = itemDoc.update( {[`details.${size}.${color}.stock`]: newAmount} );             
        })
        localStorage.clear();
        setItems([]); 
    }      

    if(orderId !== '') {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-12 alert alert-warning" role="alert">
                    <h1 className="alert-heading" >Ya estamos procesando tu pedido.</h1>
                    <h3 className="alert-heading" >Tu código de seguimiento es {orderId}</h3>
                    <hr />
                    <NavLink to={"/"}>
                        <Button classes={"btn btn-danger"} texto={`HOME`} />
                    </NavLink>
                </div>
            </div>
        )
    }

    if(loading) {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-12 alert alert-warning" role="alert">
                    <h1 className="alert-heading">Cargando tu pedido</h1>
                </div>
            </div>
        )
    }

    if(isCart === false) {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-12 alert alert-warning" role="alert">
                    <h2 className="alert-heading" >NO HAY PRODUCTOS EN TU CARRITO</h2>
                    <NavLink to={"/tienda"}>
                        <Button classes={"btn btn-danger"} texto={`¿No te vas a llevar nada?`} />
                    </NavLink>
                </div>
            </div>
        )
    }

    return (
        <div className="row">
            <div className="col-xs-12 col-md-8">
                <table className="table table-hover table-responsive">
                    <tbody>
                {items.map((product, index) => 
                    <tr key={index}>
                        <td className="w-25 align-middle"><img className="img-fluid img-thumbnail" src={`./public/images/products/${product.image}`} alt={product.name} /></td>
                        <td className="align-middle"><h5>{product.name}</h5><h6>({product.color} {product.size})</h6></td>
                        {   
                            product.amount && product.amount === product.details[product.size][product.color].stock
                            ? <td className="align-middle"><p>{product.amount} ud. MAX</p><h6>${product.price} c/u</h6></td>
                            : <td className="align-middle"><p>{product.amount} ud.</p><h6>${product.price} c/u</h6></td>
                        }
                        <td className="align-middle"><Button classes={"btn btn-danger align-middle"} handleClick={()=>removeItem(index, 1)} texto={`REMOVER`} /></td>
                    </tr>
                )}
                </tbody>
                </table>
            </div>
            <div className="col-xs-12 col-md-4">
                <form>
                    <input className="form-control mb-1" id="form-name" type="text" placeholder="Nombre" />
                    <input className="form-control mb-1" id="form-phone" type="tel" placeholder="Teléfono" />
                    <input className="form-control mb-1" id="form-email" type="email" placeholder="E-mail" />
                    <input className="form-control mb-1" id="check-email" type="email" placeholder="E-mail" />
                    <label id="check-label" style={{display:'none'}}>Las direcciones de mail deben coincidir</label>
                    <input className="form-control mb-1" id="form-address" type="text" placeholder="Dirección" />
                </form>
                <Button classes={"btn btn-warning w-100"} handleClick={addOrder} texto={`CHECKOUT $${fullTotal}`} />
            </div>
        </div>
    )
}

export default Cart;
