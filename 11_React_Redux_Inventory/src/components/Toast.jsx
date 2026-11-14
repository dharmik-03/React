import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../feature/InventorySlice';
import { IconCheck, IconAlertTriangle, IconClose } from './Icons';

const Toast = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.inventory.notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  const isError = notification.type === 'error';
  const isInfo = notification.type === 'info';

  return (
    <div className={`toast-pill ${notification.type || 'success'}`}>
      <div className="toast-icon-wrap">
        {isError ? (
          <IconAlertTriangle size={15} />
        ) : isInfo ? (
          <IconAlertTriangle size={15} />
        ) : (
          <IconCheck size={15} />
        )}
      </div>
      <div className="toast-message-wrap">
        <span className="toast-msg">{notification.message}</span>
      </div>
      <button
        type="button"
        className="toast-dismiss-btn"
        onClick={() => dispatch(clearNotification())}
        aria-label="Dismiss notification"
      >
        <IconClose size={13} />
      </button>
    </div>
  );
};

export default Toast;
