import React from 'react';
import { Link } from 'react-router-dom'

const Item = ({ productsJson }) => {
   return (
        <div className="row">
                {productsJson.map(product => 
                    <div className="col-xs-3 col-md-3 mb-3" key={product.id}>
                        <Link to={`/item/${product.id}`} style={{color:'black'}}>
                            <img className="card-img-top" src={`../../public/images/products/${product.image}`} alt={product.name} />
                            <h5>{product.name}</h5>
                            <h6>${product.price}</h6>
                        </Link>
                        <hr />
                    </div>
            )}
        </div>
  );
}

export default Item;
