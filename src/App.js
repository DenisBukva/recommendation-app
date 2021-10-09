import React, { useState } from 'react';
import './App.css';
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Modal,
  Spinner,
  Card
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import BookCard from './BookCard';

function App() {


  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  const handleSubmit = () => {
    setLoading(true);
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(res => {
        if (res.data.items.length > 0) {
          setCards(res.data.items);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(true);
        console.log(err.response);
      });
  }

  const mainHeader = () => {
    return (
      <div className='main-image d-flex justify-content-center align-items-center flex-column'>

        <h1
          className='display-2 text-center text-white mb-3'
          style={{ zIndex: 2 }}
        >
          Book Recommender
        </h1>
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup size='lg' className='mb-3'>
            <Input
              placeholder='Enter the book title'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <InputGroupAddon addonType='append'>
              <Button style={{ display: 'inline-block' }} color='secondary' onClick={handleSubmit}>
                <i className='fas fa-search'></i>
              </Button>
            </InputGroupAddon>

            <InputGroupAddon style={{ marginLeft: '200px', marginTop: '20px', width: '70%' }} addonType='append'  >
              <Button color='primary' onClick={toggle}>
                Recommended
              </Button>
            </InputGroupAddon>


          </InputGroup>

        </div>
      </div>
    );
  };

  const handleCards = () => {
    if (loading) {
      return (
        <div className='d-flex justify-content-center mt-3'>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      );
    } else {
      const items = cards.map((item, i) => {
        let thumbnail = '';
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }

        return (
          <div className='col-lg-3 mb-3' key={item.id}>
            <BookCard
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              publisher={item.volumeInfo.publisher}
              pageCount={item.volumeInfo.pageCount}
              authors={item.volumeInfo.authors}
              averageRating={item.volumeInfo.averageRating}
              ratingCount={item.volumeInfo.ratingCount}
              InputGroup={InputGroupAddon}

            />
            <Card style={{ width: '233px' }} className='m-auto '>

              <Modal isOpen={modal} toggle={toggle}>
                <div >
                  <h5 className='modal-title text-center' id='exampleModalLabel'>
                    {item.volumeInfo.title}
                  </h5>

                </div>
                <div className='modal-body'>
                  <div className='d-flex justify-content-between ' style={{ height: '280px' }}>
                    <img src={thumbnail} alt={item.volumeInfo.title} style={{ height: '233px' }} />
                    <div>
                      <p>Publisher : {item.volumeInfo.publisher}</p>
                      <p>Author : {item.volumeInfo.authors}</p>
                      <p>Page Count : {item.volumeInfo.pageCount}</p>

                      <div className='left-silde' style={{ marginTop: '90px' }}>
                        <a
                          href={item.volumeInfo.previewLink}
                          className='btn-link'
                          color='default'
                          type='button'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Read this book online
                        </a>
                      </div>
                      <button
                        aria-label='Close'
                        className='detail-btn'
                        style={{marginTop:'20px'}}
                        type='button'
                        onClick={toggle}
                        
                      >
                         Close
                      </button>
                    </div>
                  </div>

                </div>

              </Modal>
            </Card>
          </div>
        );
      });
      return (
        <div className='container my-5'>
          <div className='row'>{items}</div>
        </div>
      );
    }
  };
  return (
    <div className='w-100 h-100'>
      {mainHeader()}
      {handleCards()}
      <ToastContainer />
    </div>
  );
}

export default App;
