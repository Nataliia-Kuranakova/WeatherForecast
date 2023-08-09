const useLocalStorage = () => {
  
  const getLocalStorage = () => {
    const item = localStorage.getItem('trips');
    if (item) {
      return JSON.parse(item);
    } else {
      return [];
    }
  };

  const setLocalStorage = (trips) => {
    return localStorage.setItem('trips', JSON.stringify(trips));
  };

  const addToLoacalStorage = (trip) => {
    const localStorage = getLocalStorage();
    localStorage.push(trip);
    setLocalStorage(localStorage);
  };

  return {
    getLocalStorage,
    setLocalStorage,
    addToLoacalStorage,
  };
};

export default useLocalStorage;
