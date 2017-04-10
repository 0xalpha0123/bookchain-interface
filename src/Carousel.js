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
    const slideShow = this.props.books.map((book) => 
      <div 
        className="book-slide"
        key={book.isdn}
        >
        <h3 tabIndex="0">{book.title}</h3>
        <h4>by: {book.author}</h4>
        isdn:{book.isdn}
      </div>
    )
    return (
      <Slider {...settings}>
        {slideShow}
      </Slider>
    );
  }
}

export default Carousel;