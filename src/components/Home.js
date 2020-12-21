import React from 'react';
import MainSlider from './MainSlider';
  
const Home = () => {

  return (
    <div className='col-xs-12 col-md-12'>
      
      <h1 style={{fontFamily:'Helvetica', fontWeight:900, textAlign:'left', fontSize:'6rem', lineHeight:'5rem', padding:'1rem'}}>LA MEJOR COLECCIÓN DE REMERAS ENCONTRALAS ACÁ</h1>
      <hr />
      <MainSlider />
    </div>
  );  
}

export default Home;