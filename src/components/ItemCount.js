import React, { useContext } from 'react';
import Button from './Button'
import { CartContext } from "../context/cartContext";

const ItemCount = ({max}) => {
  const {count, setCount} = useContext(CartContext);
  
  return (
    <div>        
            <div className='row'>
                <div className='col-xs-4 col-md-4'>
                    <Button classes={"btn btn-light"} handleClick={() => count > 0 ? setCount(count-1) : ''} texto={`-`} />
                </div>
                <div className='col-xs-4 col-md-4'>
                    <p>{count}</p>
                </div>
                <div className='col-xs-4 col-md-4'>
                    <Button classes={"btn btn-light"} handleClick={() => count < max ? setCount(count+1) : ''} texto={`+`} />
                </div>
                              
            </div>
    </div>
  );
}

export default ItemCount;