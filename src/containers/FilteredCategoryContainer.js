import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore } from '../index'
import Tienda from '../components/Tienda';

function FilteredCategoryContainer() {

    const { categoryId } = useParams()

    const [productsDb, setProductsDb] = useState([]);
    const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const itemCollection = db.collection('items');
    
    let filteredCollection;
    categoryId === 'Destacado'
        ? filteredCollection = itemCollection.where('featured', '==', true)
        : filteredCollection = itemCollection.where('categoryId', '==', categoryId);    
        
    filteredCollection.get().then((querySnapshot) => {
      if(querySnapshot.size === 0) {
        console.log('No results!');
      }
      setProductsDb(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
    }).catch((error) => {
      console.log('Ocurrió un error', error);
    }).finally(() => {
      setLoading(false);
    })
}, [categoryId]);

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
          <div className='row'> 
            <Tienda listaDeProductos={productsDb}/>
          </div>
        </div>
    )
}

export default FilteredCategoryContainer;