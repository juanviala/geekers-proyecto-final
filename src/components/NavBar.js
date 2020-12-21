import React from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../images/logo.png';
import CartIcon from './CartIcon';

const NavBar = ({categories}) => {
    
  return (
    <div>
    <nav className="navbar sticky-top navbar-dark danger-color" style={ { backgroundColor: '#d31b36' } }>
            <NavLink className="navbar-brand" to={"/"}>
                <img src={logo} alt="logo"/>
            </NavLink>
            <ul>
                <li><NavLink to={"/"}>Home</NavLink></li>
                <li><NavLink to={"/tienda"}>Tienda</NavLink></li>
                                
                <li><NavLink to={"/cart"}><CartIcon /></NavLink></li>
            </ul>
    </nav>
    <nav className="mb-5" style={ { backgroundColor: '#851021' } }>
            <ul className="nav justify-content-center">
              {categories.map((category, index) => (
                <li key={index}>
                  <NavLink to={`/categories/${category.name}`}>{category.name}</NavLink>
                </li>
              ))}
            </ul>
    </nav>
    </div>
  );
}

export default NavBar;