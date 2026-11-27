export default function Popup({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div className={`popup ${type || 'info'}`}>
      <span>{message}</span>
      <button type="button" onClick={onClose} className="popup-close">
        &times;
      </button>
    </div>
  );
}
