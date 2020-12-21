import React from 'react';
import { Link } from 'react-router-dom';

const ItemList = ({ productsJson }) => {
   
    return (
        <ul className='list-group list-group-horizontal list-inline'>
            {productsJson.map(product => product.featured ? <Link to={`/item/${product.id}`}><li className='list-group-item list-inline-item' key={product.id}>{product.name}</li></Link> : '')}
        </ul>        
        );
    }

export default ItemList;