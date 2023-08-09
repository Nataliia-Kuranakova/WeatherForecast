const InputDate = ({ value, onChange, label, name }) => {
  const inputDate =
    value === '' ? (
      'Select date'
    ) : (
      <span className="filled-input-value">{value}</span>
    );

  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;

    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  const future = new Date();
  future.setDate(today.getDate() + 15);

  return (
    <label>
      {label}
      <div className="input input-date">
        {inputDate}
        <div className="datepicker-toggle">
          <div className="datepicker-toggle-button"></div>
          <input
            required
            name={name}
            className="datepicker-input"
            value={value}
            onChange={onChange}
            type="date"
            min={formatDate(today)}
            max={formatDate(future)}
          />
        </div>
      </div>
    </label>
  );
};

export default InputDate;
