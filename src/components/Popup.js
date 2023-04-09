import { useEffect } from 'react';

export default function Popup({ isOpen, onClose, children, name }) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    function handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('mousedown', handleOverlayClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
        document.removeEventListener('mousedown', handleOverlayClose);
      };
    }
  }, [isOpen]);

  return (
    <>
      <aside
        className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
        id="popup-edit"
      >
        {children}
      </aside>
    </>
  );
}
