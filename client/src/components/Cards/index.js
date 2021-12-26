import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUsers } from "../../redux/features/User";
import CardsItem from "./CardsItem";
import styles from "./cards.module.css";

const Cards = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.userList);
  const mainUser = useSelector((state) => state.userProfile.user);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div className={styles.main}>
      {users.map((user) => {
        if (user._id !== mainUser._id)
           if (user.defaultLanguage._id === mainUser.learnLanguage)
            return (
              <CardsItem
                key={user._id}
                img={!user.img ? "http://localhost:4000/uploads/default-photo.png" : `http://localhost:4000/${user.img}`}
                name={user.name}
                description={!user.description ? `Hey! I speak ${user.defaultLanguage.name} fluently. Help me learn ${user.learnLanguage.name}!` : user.description}
                whatsapp={user.whatsapp}
                instagram={user.instagram}
                telegram={user.telegram}
                mainUser={mainUser}
                id={user._id}
                rating={user.rating}
              />
            );
      })}
    </div>
  );
};

export default Cards;
