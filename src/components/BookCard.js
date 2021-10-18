import React, { useState } from 'react';
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap';
const BookCard = ({
  thumbnail,
  title,
  pageCount,
  averageRating,
  ratingCount,
  authors,
  publisher,

}) => {
  // States
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Card style={{ width: '233px'}} className='m-auto '>
      <CardImg
        top
        style={{ width: '80%', height: '233px' ,marginLeft:'25px' }}
        src={thumbnail}
        alt={title}
      />
      <CardBody>
        <CardTitle className='card-title'>{title}</CardTitle>
        <Button className='detail-btn' onClick={toggle}>Details</Button>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle}>
        <div className='modal-header d-flex justify-content-center'>
          <h5 className='modal-title text-center' id='exampleModalLabel'>
            {title}
          </h5>
          <button
            aria-label='Close'
            className='close'
            type='button'
            onClick={toggle}
          >
            <span aria-hidden={true}>X</span>
          </button>
        </div>
        <div className='modal-body'>
          <div className='d-flex justify-content-between ml-3'>
            <img src={thumbnail} alt={title} style={{ height: '233px' }} />
            <div>
              <p>Publisher : {publisher}</p>
              <p>Author : {authors}</p>
              <p>Page Count : {pageCount}</p>
              <p>Average Rating : {averageRating} </p>
              <p>Rating Count : {ratingCount} </p>
            </div>
          </div>

        </div>

      </Modal>
    </Card>
  );
};

export default BookCard;
