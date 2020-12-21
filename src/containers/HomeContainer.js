import React from 'react';
import Home from '../components/Home';
import portada from '../images/landing-image-opacity.jpg';

class HomeContainer extends React.Component {

  componentWillMount(){
    document.body.style.background = `url(${portada}) no-repeat top center fixed`
    document.body.style.backgroundSize = 'cover'
  }
    componentWillUnmount(){
      document.body.style.background = 'none';
  }

  render() {
    return (
      <div className='container' >
        <div className='row'> 
          <Home />
        </div>
      </div>
    );
  }
}

export default HomeContainer;