import PopupIsSuccess from '../../images/PopupSuccess.svg';
import PopupIsUnsuccess from '../../images/PopupUnsuccess.svg';
import './PopupSuccess.css';

function PopupSuccess({
   onClose,
   isOpen,
   message
}) {

   return (

      <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
         <div className='popup__container popup_type_tooltip'>
            <button
               className='popup__close'
               onClick={onClose}
               type='button'
            ></button>
            <img
               className='popup__status-image'
               src={message.status ? PopupIsSuccess : PopupIsUnsuccess}
               alt='статус успеха'
            ></img>
            <p className='popup__status-text'>{message.text}</p>
         </div>
      </div>
   );
};

export default PopupSuccess;