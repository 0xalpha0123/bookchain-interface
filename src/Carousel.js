import React, { Component } from 'react';
import Slider from 'react-slick';


class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div className="book-slide"><h3>1</h3></div>
        <div className="book-slide"><h3>2</h3></div>
        <div className="book-slide"><h3>3</h3></div>
        <div className="book-slide"><h3>4</h3></div>
        <div className="book-slide"><h3>5</h3></div>
      </Slider>
    );
  }
}

export default Carousel;