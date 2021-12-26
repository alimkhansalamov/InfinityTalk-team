import React, { useEffect, useState } from 'react';
import Buttons from './Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { loadUtilities } from './../../redux/features/UtilitiesReducer';
import UtilitiesItem from './UtilitiesItem';
import cl from './index.css';
import Game from '../Game/Game';

const Utilities = () => {
  const dispatch = useDispatch();
  const utilities = useSelector((state) => state.utilities.utilities);
  const loading = useSelector((state) => state.utilities.loading);
  const [lang, setLang] = useState('All');

  const handleChangeLang = (ev) => {
    setLang(ev.target.textContent);
  };

  useEffect(() => {
    dispatch(loadUtilities());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const filteredUtilities = utilities.filter((utility) => {
    if (lang === 'All') {
      return true;
    }
    return utility.utilityCategory === lang;
  });

  return (
    <div className={cl.mainDiv}>
      <div className="d-flex justify-content-center ">
        <Buttons handleChangeLang={handleChangeLang} />
      </div>
      <div className="d-flex flex-wrap justify-content-center text-center mt-5">
        {utilities &&
          filteredUtilities.map((utility) => {
            return (
              <UtilitiesItem
                key={utility._id}
                utilityImage={utility.utilityImage}
                utilityTitle={utility.utilityTitle}
                utilityCategory={utility.utilityCategory}
                utilityLink={utility.utilityLink}
              />
            );
          })}
      </div>
      <Game />
    </div>
  );
};

export default Utilities;
