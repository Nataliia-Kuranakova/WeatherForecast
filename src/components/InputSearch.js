import search from '../svg/app-icons/search.svg';

const InputSearch = ({ searchTerm, onChange }) => {
  return (
    <div className="search-input-container">
      <img className="search-input-icon" src={search} alt="serch-glas"></img>
      <input
        className="input input-search"
        placeholder="search your trip"
        type="text"
        value={searchTerm}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default InputSearch;
