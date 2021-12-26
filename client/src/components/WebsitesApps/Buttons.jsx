import React from 'react';

const Buttons = ({ handleChangeLang }) => {
  return (
    <div className="d-flex gap-5">
      <button
        type="button"
        className="btn btn-danger col-1.5"
        onClick={handleChangeLang}
      >
        All
      </button>
      <button
        type="button"
        className="btn btn-danger col-1.5"
        onClick={handleChangeLang}
      >
        Russian
      </button>
      <button
        type="button"
        className="btn btn-danger col-1.5"
        onClick={handleChangeLang}
      >
        English
      </button>
      <button
        type="button"
        className="btn btn-danger col-1.5"
        onClick={handleChangeLang}
      >
        French
      </button>
      <button
        type="button"
        className="btn btn-danger col-1.5"
        onClick={handleChangeLang}
      >
        German
      </button>
      <button
        type="button"
        className="btn btn-danger col-1.5"
        onClick={handleChangeLang}
      >
        Arabic
      </button>
      <button
        type="button"
        className="btn btn-danger col-1.5"
        onClick={handleChangeLang}
      >
        Spanish
      </button>
    </div>
  );
};

export default Buttons;
