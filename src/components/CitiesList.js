import { useRef, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

import chevronLeft from '../svg/app-icons/chevron-left.svg';
import chevronRight from '../svg/app-icons/chevron-right.svg';

import Modal from './Modal';

const CitiesList = ({ onFetchWeather, searchTerm }) => {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [showModal, setShowModal] = useState(false);
  const [localState, setLocalState] = useState([
    {
      name: 'Porto',
      img: 'https://www.guidesulysse.com/images/destinations/iStock-871640368.jpg',
      start: '2023-09-10',
      end: '2023-09-14',
      id: '45jk',
    },
  ]);
  const containerRef = useRef();

  useEffect(() => {
    const localStorage = getLocalStorage();
    if (localStorage.length === 0) {
      setLocalStorage(localState);
    } else if (localStorage.length > localState.length) {
      setLocalState(localStorage);
    }
  }, [localState, getLocalStorage, setLocalStorage]);

  const scroll = (scrollOffset) => {
    containerRef.current.scrollBy({
      top: 0,
      left: scrollOffset,
      behavior: 'smooth',
    });
  };

  const handleLocalState = (obj) => {
    setLocalState([...localState, obj]);
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const handelClose = () => {
    setShowModal(false);
  };

  const filteredTrips = localState.filter((trip) => {
    return trip.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
  });

  const sortedData = [...filteredTrips].sort((a, b) => {
    let aData = new Date(a.start);
    let bData = new Date(b.start);
    return aData - bData;
  });

  const modal = (
    <Modal onClose={handelClose} onHandleLocalState={handleLocalState} />
  );
  return (
    <>
      <div className="scrolling-cities-list">
        <button
          className="scroll-btn scroll-btn--left"
          onClick={() => scroll(-200)}
        >
          <img src={chevronLeft} alt="chevron-left"></img>
        </button>
        <button
          className="scroll-btn scroll-btn--right"
          onClick={() => scroll(200)}
        >
          <img src={chevronRight} alt="chevron-right"></img>
        </button>
        <div className="scrolling-wrapper" ref={containerRef}>
          {sortedData.map((city) => (
            <div
              className="city"
              key={city.id}
              onClick={() => onFetchWeather(city)}
            >
              <img className="city-img" src={city.img} alt={city.name}></img>
              <div className="city-content">
                <p>{city.name}</p>
                <div>
                  <span>{city.start.split('-').reverse().join('.')}</span> -{' '}
                  <span>{city.end.split('-').reverse().join('.')}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="city city-btn--add" onClick={handleClick}>
            <div>+</div>
            <div>Add trip</div>
          </div>
        </div>
      </div>
      {showModal && modal}
    </>
  );
};

export default CitiesList;
