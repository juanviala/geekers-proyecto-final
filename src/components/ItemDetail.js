import React, { useContext, useEffect, useState } from 'react'
import Button from './Button'
import ItemCount from '../components/ItemCount';
import { CartContext } from "../context/cartContext";

const ItemDetail = ( { productoSeleccionado } ) => {
  const {count, setCount, addItem} = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [image, setImage] = useState('');
  const [path, setPath] = useState('');
  const [stock, setStock] = useState(0);
  const [finalPath, setFinalPath] = useState('');

  useEffect(() => {
    setImage(productoSeleccionado.image)
  },[productoSeleccionado])

  useEffect(() => {
    setCount(0)
  },[stock])

  useEffect(() => {
    if(productoSeleccionado && productoSeleccionado.details) {
      let colorKeys = [];
      if(selectedSize === 'large') {
        colorKeys = Object.keys(productoSeleccionado.details.large);
        document.getElementById('large').style.backgroundColor = 'black';
        document.getElementById('medium').style.backgroundColor = 'gray';
        document.getElementById('small').style.backgroundColor = 'gray';
        setPath(productoSeleccionado.details.large);
      } else if (selectedSize === 'medium') {
        colorKeys = Object.keys(productoSeleccionado.details.medium);
        document.getElementById('large').style.backgroundColor = 'gray';
        document.getElementById('medium').style.backgroundColor = 'black';
        document.getElementById('small').style.backgroundColor = 'gray';
        setPath(productoSeleccionado.details.medium);
      } else if (selectedSize === 'small') {
        colorKeys = Object.keys(productoSeleccionado.details.small);
        document.getElementById('large').style.backgroundColor = 'gray';
        document.getElementById('medium').style.backgroundColor = 'gray';
        document.getElementById('small').style.backgroundColor = 'black';
        setPath(productoSeleccionado.details.small);
      }
      setColors(colorKeys);
      setSelectedColor([]);
      setCount(0);
    }
  },[selectedSize]);

  useEffect(() => {
    switch(selectedColor) {
      case 'gray':
        setImage(path.gray.image);
        setStock(path.gray.stock);
        setFinalPath(path.gray)
        break;
      case 'white':
        setImage(path.white.image);
        setStock(path.white.stock);
        setFinalPath(path.white)
        break;
      case 'black':
        setImage(path.black.image);
        setStock(path.black.stock);
        setFinalPath(path.black)
        break;
      case 'yellow':
        setImage(path.yellow.image);
        setStock(path.yellow.stock);
        setFinalPath(path.yellow)
        break;
      case 'red':
        setImage(path.red.image);
        setStock(path.red.stock);
        setFinalPath(path.red)
        break;
      case 'aqua':
        setImage(path.aqua.image);
        setStock(path.aqua.stock);
        setFinalPath(path.aqua)
        break;
    }    
  },[selectedColor]);

 return (
    
      <div className="row no-gutters">
        <div className="col-md-6">
          {productoSeleccionado && productoSeleccionado.image
            ? <img src={`../images/products/${image}`} className="card-img" alt="..." />
            : ''
          }
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{productoSeleccionado.name}</h5>
            <Button idProp={"small"} classes={"btn btn-secondary btn-sm m-1"} handleClick={() => setSelectedSize("small")} texto={"S"} />
            <Button idProp={"medium"} classes={"btn btn-secondary btn-sm m-1"} handleClick={() => setSelectedSize("medium")} texto={"M"} />
            <Button idProp={"large"} classes={"btn btn-secondary btn-sm m-1"} handleClick={() => setSelectedSize("large")} texto={"L"} />
            {
              colors && colors !== []
              ? colors.map(colorSelect => <Button key={colorSelect} styles={{backgroundColor: colorSelect, borderColor: 'black'}} classes={"btn btn-sm m-1 rounded"} handleClick={() => setSelectedColor(colorSelect)} texto={colorSelect.toUpperCase()} />)
              
              : ''
            }
            <h3 className="card-text">${productoSeleccionado.price}</h3>
            <hr />
              <ItemCount initial='0' max={stock} />
              {
                count === 0
                ? <button disabled type="button" className="btn btn-danger">COMPRAR {count}</button>              
                : <Button classes={"btn btn-danger"} handleClick={() => addItem(productoSeleccionado, selectedSize, selectedColor, finalPath, count)} texto={`COMPRAR ${count}`} />                
              }
          </div>
        </div>
      </div>
    
  )
}

export default ItemDetail;