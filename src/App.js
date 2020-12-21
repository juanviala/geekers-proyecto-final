import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import HomeContainer from './containers/HomeContainer';
import TiendaContainer from './containers/TiendaContainer';
import FilteredCategoryContainer from './containers/FilteredCategoryContainer'
import ItemDetailContainer from './containers/ItemDetailContainer'
import CartContainer from './containers/CartContainer'

import { CartProvider } from './context/cartContext'
import { getFirestore } from './index'

function App() {

  // const [details, setDetails] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const db = getFirestore();
    const categoriesCollection = db.collection('categories');
    categoriesCollection.get().then((querySnapshot) => {
      if(querySnapshot.size === 0) {
        console.log('No categories result!');
      }
      setCategories(querySnapshot.docs.map(doc => doc.data()));
    }).catch((error) => {
      console.log('Ocurrió un error en categorías', error);
    }).finally(() => {
      //setear loading
    })
}, []);

  return (
    <CartProvider>
      <BrowserRouter>
      <div className="App">
        <NavBar categories={categories}/>
        <Switch>
          <Route exact path="/">
            <HomeContainer />
          </Route>
          <Route path="/tienda">
            <TiendaContainer />
          </Route>
          <Route path="/cart">
            <CartContainer />
          </Route>
          <Route path="/categories/:categoryId">
            <FilteredCategoryContainer />
          </Route>
          <Route path="/item/:id">
            <ItemDetailContainer />
          </Route>
        </Switch>
      </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
