import { useState } from 'react';
import { cities } from '../arrays/cities';

import { ReactComponent as ChewronDown } from '../svg/app-icons/chevron-down.svg';

const Dropdown = ({ onSelectCity }) => {
  const [dropdownValue, setDropDownValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  const handleCitySelect = (city) => {
    onSelectCity(city);
    setDropDownValue(city.name);
  };

  const handleChange = (e) => {
    setDropDownValue(e.target.value);
  };

  return (
    <div className="dropdown">
      <div onClick={toggling} className="dropdown-container">
        <span>
          <ChewronDown />
        </span>
        <input
          className="dropdown-header "
          onChange={handleChange}
          value={dropdownValue}
          required
          placeholder="Please select a city"
        ></input>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          <li className="dropdown-list-item">Please select a city</li>
          {cities.map((city, index) => (
            <li
              className="dropdown-list-item"
              key={index}
              onClick={() => handleCitySelect(city)}
            >
              <img src={city.img} alt={city.name} />
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
