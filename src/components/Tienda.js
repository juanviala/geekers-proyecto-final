import React from 'react';
import Item from './Item';

const Tienda = ({listaDeProductos}) => {
  
  return (                            
    <div className="row">
      <Item productsJson={listaDeProductos} />
    </div>        
  );
}

export default Tienda;