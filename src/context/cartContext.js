import React, { useState, useEffect } from 'react'

export const CartContext = React.createContext([]);

export const CartProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([]);
    const [cartAmount, setCartAmount] = useState(0);
    const [fullTotal, setFullTotal] = useState(0);

    useEffect(() => {
      if(localStorage.getItem('geekersReactCart')) {
        setItems(JSON.parse(localStorage.getItem('geekersReactCart')))
      }
    },[])

    useEffect(() => {
      localStorage.setItem('geekersReactCart', JSON.stringify(items));
      let amountInCart = 0;
      let amountTotal = 0;

      if(items.length === 0) {
        setCartAmount(amountInCart)
        setFullTotal(0);
      } else {
        items.forEach(elem => {
          amountInCart = elem.amount + amountInCart;
          amountTotal = (elem.amount * elem.price) + amountTotal;
          setCartAmount(amountInCart);
          setFullTotal(amountTotal);
        });
      }        
        
    },[items])

    const removeItem = (item, amount) => {
      items.splice(item, amount);
      setItems([...items]);
      localStorage.clear();
    }

    const addItem = (item, size, color, finalPath, amount) => {
      let newItem = { ...item, size: size, color: color };
      
      if (items.some(elem => elem.id === newItem.id && elem.size === newItem.size && elem.color === newItem.color)) {
        const repeatedIndex = items.findIndex(elem => elem.id === newItem.id && elem.size === newItem.size && elem.color === newItem.color);
        const itemsCopy = [...items];
        const finalAmount = itemsCopy[repeatedIndex].amount + amount > finalPath.stock ? finalPath.stock : itemsCopy[repeatedIndex].amount + amount
        itemsCopy[repeatedIndex] = {
          ...itemsCopy[repeatedIndex],
          amount: finalAmount
          
        };
        setItems([...itemsCopy]);
        setCount(0);
      } else {
        setItems([
          ...items,
          {
            ...newItem,
            amount,
          }
        ]);
        setCount(0);
      }
    }

  return (
    <CartContext.Provider value={{count, setCount, addItem, removeItem, items, setItems, cartAmount, fullTotal}}>
      {children}
    </CartContext.Provider>
  );
};