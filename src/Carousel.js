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
        key={book.id}
        >
        <h3 tabIndex="0">{book.title}</h3>
        <img src={book.img_url} alt="Image Not Found"/>
        <h4>by: {book.author}</h4>
        <br/>
        id:{book.id}
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