import React from "react";
import styles from "./cards.module.css";
import { Link } from "react-router-dom";
import insta from "../../assets/images/instagram.png";
import teleg from "../../assets/images/telegram.png";
import whats from "../../assets/images/whatsapp.png";
import { Rating } from '@mui/material';
import { startChat } from '../../redux/features/Chat';
import { useDispatch, useSelector } from 'react-redux';

const CardsItem = ({
  name,
  img,
  description,
  whatsapp,
  instagram,
  telegram,
  mainUser,
  id,
  rating
}) => {

  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.userChats);

  const handleSendClick = (partnerId) => {
    if (!chats.some((chat) => chat.members.map((member) => member._id).includes(mainUser._id) && chat.members.map((member) => member._id).includes(partnerId))) {
      dispatch(startChat(mainUser._id, partnerId))
    }
  }

  return (
    <div className="mb-3 w-100">
      <div className="row g-0 justify-content-center mt-5">
        <div className={`col-md-2 m-2 text-center ${styles.imgBlock}`}>
          <img className={`rounded-circle ${styles.img}`} src={img} alt="..." />
          <div className={styles.Link}>
            <Link to="/message" onClick={() => handleSendClick(id)}>SEND</Link>
          </div>
        </div>
        <div className={`col-md-8 m-2 ${styles.textContent}`}>
          <div className="card-body w-25">
            <h2 className="card-title fw-bold">{name}</h2>
            <p className="card-text fs-4">{description}</p>
          </div>
          <div className="p-3">
            <div  className="text-center">
              <Rating name="size-large" defaultValue={rating} precision={0.5} size="large" />

            </div>
            <div className="mt-4 text-center">
              <a href={instagram}>
                <img src={insta} className={styles.ikon} alt="..." />
              </a>
              <a href={whatsapp}>
                <img src={whats} className={styles.ikon2} alt="..." />
              </a>
              <a href={telegram}>
                <img src={teleg} className={styles.ikon3} alt="..." />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsItem;
