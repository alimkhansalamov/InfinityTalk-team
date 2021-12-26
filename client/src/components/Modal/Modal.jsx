import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Profile from "../../assets/images/ProfileLogo.png";
import editIcon from "../../assets/images/edit-foto-image.png";
import InstaIcon from "../../assets/images/instagram.png";
import TeleIcon from "../../assets/images/TeleIcon.png";
import WhatsAppIcon from "../../assets/images/whatsUpIcon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import css from "./modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfile,
  fetchUserProfile,
  uploadAvatar,
} from "../../redux/features/ProfileReducer";
import { loadChats } from '../../redux/features/Chat';

const ModalWindow = ({ name, ...props }) => {
  const user = useSelector((state) => state.userProfile.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const [file, setFile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);

  const [userNameEditText, setUserNameEditText] = useState("");
  const [userEmailEditText, setUserEmailEditText] = useState("");
  const [userSurnameEditText, setUserSurnameEditText] = useState("");
  const [userWhatsUpEditText, setUserWhatsUpEditText] = useState ("");
  const [userTelegramEditText, setUserTelegramEditText] = useState ("");
  const [userInstagramEditText, setUserInstagramEditText] = useState ("");
  const [userDescriptionEditText, setUserDescriptionEditText] = useState("");

  const handleEdit = () => setEdit(true);
  const handleEditClose = () => setEdit(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  const handleChangeImage = (e) => {
    setFile(e.target.files[0]);
    dispatch(uploadAvatar(e.target.files[0]));
  };

  const handleChangeNameInput = (e) => {
    setUserNameEditText(e.target.value);
  };

  const handleChangeEmailInput = (e) => {
    setUserEmailEditText(e.target.value);
  };

  const handleChangeSurnameInput = (e) => {
    setUserSurnameEditText(e.target.value);
  };

  const handleChangeInstagramInput = (e) => {
    setUserInstagramEditText(e.target.value);
  };

  const handleChangeDescriptionInput = (e) => {
    setUserDescriptionEditText(e.target.value);
  };

  const handleChangeTelegramInput = (e) => {
    setUserTelegramEditText(e.target.value);
  };

  const handleChangeWhatsUpInput = (e) => {
    setUserWhatsUpEditText(e.target.value)
  }

  function logout () {
      localStorage.clear()
      window.location.href = '/';
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className={css.modalBtn}>
        <img src={Profile} className={css.profileModal} />
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>

        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={css.profileMain}>
            <div className={css.profileImg}>
              <img
                  src={!user.img ? 'http://localhost:4000/uploads/default-photo.png' : `http://localhost:4000/${user.img}`}
                className={css.image}
              />
              <div className={css.editAvatar}>
                <label className="filebutton">
                  <span>
                    <input
                        className="form-control"
                      type="file"
                      id="formFile"
                      accept="image/*"
                      onChange={handleChangeImage}
                      name="img"
                    />
                    <img src={editIcon} className={css.editIcon} />
                  </span>
                </label>
              </div>
            </div>
          </div>
          {edit ? (
            <div className={css.editBlockMain}>
              <div className={css.inputBlock}>
                <span className={css.editTitle}>Имя:</span>
                <input
                  type="text"
                  className={css.editInput}
                  value={!userNameEditText ? user.name : userNameEditText}
                  onChange={handleChangeNameInput}
                />
                <span className={css.editTitle}>Фамилия:</span>
                <input
                  type="text"
                  className={css.editInput}
                  value={
                    !userSurnameEditText ? user.surname : userSurnameEditText
                  }
                  onChange={handleChangeSurnameInput}
                />
                <span className={css.editTitle}>Е-майл:</span>
                <input
                  type="text"
                  className={css.editInput}
                  value={!userEmailEditText ? user.email : userEmailEditText}
                  onChange={handleChangeEmailInput}
                />
                <span className={css.editTitle}>О себе: </span>
                <textarea
                  type="text"
                  className={css.editInput}
                  value={
                    !userDescriptionEditText
                      ? user.description
                      : userDescriptionEditText
                  }
                  onChange={handleChangeDescriptionInput}
                />
                <span className={css.editTitle}>Инстаграм:</span>
                <input
                  type="text"
                  className={css.editInput}
                  value={
                    !userInstagramEditText
                      ? user.instagram
                      : userInstagramEditText
                  }
                  onChange={handleChangeInstagramInput}
                />
                <span className={css.editTitle}>Телеграм:</span>
                <input
                  type="text"
                  className={css.editInput}
                  value={
                    !userTelegramEditText ? user.telegram : userTelegramEditText
                  }
                  onChange={handleChangeTelegramInput}
                />
                <span className={css.editTitle}>Ватсап:</span>
                <input
                  type="text"
                  className={css.editInput}
                  value={
                    !userWhatsUpEditText ? user.whatsapp : userWhatsUpEditText
                  }
                  onChange={handleChangeWhatsUpInput}
                />
              </div>
              <div className={css.buttonsBlock}>
                <Button variant="primary" onClick={handleEditClose} className={css.closeButton}>
                  Закрыть
                </Button>{" "}
                <LoadingButton
                  name={!userNameEditText ? user.name : userNameEditText}
                  email={!userEmailEditText ? user.email : userEmailEditText}
                  surname={!userSurnameEditText ? user.surname : userSurnameEditText}
                  whatsapp={!userWhatsUpEditText ? user.whatsapp : userWhatsUpEditText}
                  telegram={!userTelegramEditText ? user.telegram : userTelegramEditText}
                  instagram={!userInstagramEditText ? user.instagram : userInstagramEditText}
                  description={!userDescriptionEditText ? user.description : userDescriptionEditText}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className={css.userInfoBlock}>
                <p className={css.userInfo}>
                  {" "}
                  <span> Имя: </span> {user.name}
                </p>
                <p className={css.userInfo}>
                  {" "}
                  <span> Фамилия: </span> {user.surname}
                </p>
                <p className={css.userInfo}>
                  {" "}
                  <span> E-mail: </span> {user.email}{" "}
                </p>
                <p className={css.userInfo}>
                  {" "}
                  <span> О себе: </span> {user.description}{" "}
                </p>
                <hr/>
                <div className={css.socialNetworkIcons}>
                  {user.instagram ? (
                    <a href={user.instagram}>
                      {" "}
                      <img src={InstaIcon} className={css.socialIcon} />{" "}
                    </a>
                  ) : null}
                  {user.telegram ? (
                    <a href={user.telegram}>
                      {" "}
                      <img src={TeleIcon} className={css.socialIcon} />{" "}
                    </a>
                  ) : null}
                  {user.whatsapp ? (
                    <a href={user.whatsapp}>
                      {" "}
                      <img src={WhatsAppIcon} className={css.socialIcon} />{" "}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          )}
          <div className={css.editClick}>
            <button
              onClick={() => handleEdit(true)}
              disabled={edit}
              className={edit ? css.editButton_dis : css.editButton}
            >
              {" "}
              Редактировать{" "}
            </button>
            {edit ? (null) : (
              <button
                className={css.exitButton}
                onClick={() => logout()}>Выход</button>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

function LoadingButton({
  name,
  surname,
  email,
  description,
  instagram,
  telegram,
  whatsapp,
}) {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      editUserProfile(
        name,
        surname,
        email,
        description,
        instagram,
        telegram,
        whatsapp
      )
    );
    setLoading(true);
  };

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      className={css.loadingBtn}
    >
      {isLoading ? "Loading…" : "Сохранить"}
    </Button>
  );
}

function ShowModal() {
  return (
    <>
      {["end"].map((placement, idx) => (
        <ModalWindow key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default ShowModal;
