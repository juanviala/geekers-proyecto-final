import React from 'react';
import { NavLink } from 'react-router-dom' 
import portada from '../images/portada.jpg';
import Button from './Button'

const MainSlider = () => {
  
  return (
        <div>
          <img src={portada} alt="Portada" className="img-fluid w-100 h-20 border-bottom border-warning"/>
          <NavLink to={"/tienda"}>
            <Button styles={{fontWeight:700, color:'black', height:'6rem', fontSize:'2rem'}} classes={'btn btn-warning w-100 mb-5'} texto='NO ESPERES MÁS Y ANDÁ A LA TIENDA' />
          </NavLink>
        </div>
  );
}

export default MainSlider;