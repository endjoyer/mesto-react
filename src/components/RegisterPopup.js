import Popup from './Popup';

function RegisterPopup({ onClose, isOpenOk, isOpenError }) {
  const isOpen = () => {
    return isOpenOk;
  };
  return (
    <Popup
      isOpen={isOpenOk || isOpenError}
      onClose={onClose}
      name="registerPopup"
    >
      <div className="popup__container">
        <div
          className={`popup__reg-img ${
            isOpenError ? 'popup__reg-img_error' : ''
          }`}
        ></div>
        <p className="popup__reg-text">
          {isOpenOk
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </Popup>
  );
}

export default RegisterPopup;
