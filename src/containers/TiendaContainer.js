import React, { useState, useEffect } from 'react';
import Tienda from '../components/Tienda';
import { getFirestore } from '../index'

const TiendaContainer = () => {

  const [productsDb, setProductsDb] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const itemCollection = db.collection('items');
    itemCollection.get().then((querySnapshot) => {
      if(querySnapshot.size === 0) {
        console.log('No results!');
      }
      setProductsDb(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
    }).catch((error) => {
      console.log('Ocurrió un error', error);
    }).finally(() => {
      setLoading(false);
    })
}, []);

if(loading) {
  return (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>        
  )
} 
  
  return (
        <div className='container'>
            <Tienda listaDeProductos={productsDb}/>
        </div>
  );
}

export default TiendaContainer;