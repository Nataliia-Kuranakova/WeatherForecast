import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

import { nanoid } from '@reduxjs/toolkit';

import InputDate from './InputDate';
import Dropdown from './Dropdown';

import { ReactComponent as XIcon } from '../svg/app-icons/x-button.svg';

const Modal = ({ onClose, onHandleLocalState }) => {

  const { addToLoacalStorage } = useLocalStorage();
  const [selectedCity, setSelectedCity] = useState({});
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleAddTrip = (e) => {
    e.preventDefault();

    const trip = {
      name: selectedCity.name,
      img: selectedCity.img,
      start: date.startDate,
      end: date.endDate,
      id: nanoid(),
    };
    onHandleLocalState(trip);
    addToLoacalStorage(trip);
    onClose();
  };

  useEffect(() => {
    document.body.classList.add('modal-visibillity');

    return () => {
      document.body.classList.remove('modal-visibillity');
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <form onSubmit={(e) => handleAddTrip(e)}>
        <div onClick={onClose} className="screen"></div>
        <div className="modal">
          <div className="modal-header-wrapper">
            <h3 className="modal-sections modal-sections--header">
              Create trip
            </h3>
            <button className="modal-x-btn" onClick={onClose}>
              <XIcon />
            </button>
          </div>
          <div className="modal-content">
            <label>
              City
              <Dropdown
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
              />
            </label>
            <InputDate
              name="startDate"
              label="Start date"
              value={date.startDate}
              onChange={handleChange}
            />
            <InputDate
              name="endDate"
              label="End date"
              value={date.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="modal-sections modal-sections--footer">
            <div>
              <button className="modal-btn modal-btn--cancel" onClick={onClose}>
                Cansel
              </button>
            </div>
            <div>
              <button type="submit" className="modal-btn modal-btn--save">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>,
    document.querySelector('.modal-container')
  );
};

export default Modal;
