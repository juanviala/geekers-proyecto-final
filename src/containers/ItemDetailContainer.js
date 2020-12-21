import React, { useState, useEffect } from 'react';
import ItemDetail from '../components/ItemDetail';
import Button from '../components/Button'
import { useParams, NavLink } from 'react-router-dom'
import { getFirestore } from '../index'

const ItemDetailContainer = () => {
    
    const { id } = useParams()
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const db = getFirestore();
        const itemCollection = db.collection('items');
        
        const filteredItem = itemCollection.doc(id);
                    
        filteredItem.get().then((querySnapshot) => {
          querySnapshot.exists === false
          ? setDetails(false)
          : setDetails({id:querySnapshot.id, ...querySnapshot.data()});
        }).catch((error) => {
          console.log('Ocurrió un error', error);
        }).finally(() => {
          setLoading(false);
        })
    }, []);

    useEffect(() => {
      
    }, [details]);

    if(loading) {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>   
      )
    }

    if(!details) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-12 alert alert-warning" role="alert">
                <h2 className="alert-heading" >SE PRODUJO UN ERROR</h2>
                <NavLink to={"/tienda"}>
                    <Button classes={"btn btn-danger"} texto={`VOLVÉ A INTENTARLO EN LA TIENDA`} />
                </NavLink>
            </div>
          </div>
        </div> 
      )
    }

    return (       
      <div className="container">
        <div className="row  justify-content-center align-middle">
          <div className="col-xs-12 col-md-12">
            <ItemDetail productoSeleccionado={details} />
          </div>
        </div>
      </div>
      )
}

export default ItemDetailContainer;