import { useState, useEffect } from 'react';
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import { processWeatherData } from '../../utils/weatherApi';
import { getWeather } from '../../utils/weatherApi';
import { coordinates, APIkey } from '../../utils/constants';
import Footer from '../Footer/Footer';

function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: 0, city: "" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState();
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const onClose = () => {
    setActiveModal("");
  }
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const processData = processWeatherData(data);
        setWeatherData(processData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  return (
    <div className='page'>
      <div className='page__content'>
        <Header handleAddClick={handleAddClick}
         handleCardClick={handleCardClick} 
         weatherData={weatherData} />
        <Main weatherData={weatherData} 
        handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm 
      title="New garment"
       buttonText="Add garment" 
       isOpen={activeModal === "add-garment"}
       onClose={onClose}>
        <label htmlFor="name" className="modal__label">
          Name{""}
          <input className="modal__input" 
          type="text" 
          id="name" 
          placeholder="Name" />
        </label>
        <label htmlFor="imageurl" className="modal__label">
          Image{""}
          <input className="modal__input" 
          type="url" 
          id="imageurl" 
          placeholder="Image Url" />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="legend">Select weather type:</legend>
          <div className="modal__radio-button">
            <input
              className="modal__radio-input"
              type="radio"
              id="hot"
              name="weather"
              value="hot"
            />
            <label className="modal__radio-label" htmlFor="hot">Hot</label>
          </div>
          <div className="modal__radio-button">
            <input
              className="modal__radio-input"
              type="radio"
              id="warm"
              name="weather"
              value="warm"
            />
            <label className="modal__radio-label" htmlFor="warm">Warm</label>
          </div>
          <div className="modal__radio-button">
            <input
              className="modal__radio-input"
              type="radio"
              id="cold"
              name="weather"
              value="cold"
            />
            <label className="modal__radio-label" htmlFor="cold">Cold</label>
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal activeModal={activeModal} card={selectedCard} onClose={onClose} />
      <Footer />
    </div>


  )
}

export default App
