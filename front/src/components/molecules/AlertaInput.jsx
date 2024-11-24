const AlertaInput = ({ alertName, value, onAlertChange }) => {
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onAlertChange(newValue);
  };

  return (
    <div className="mb-3">
      <label className="form-label">{alertName}</label>
      <div>
        <input
          type="number"
          className="form-control form-control-sm"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AlertaInput;
