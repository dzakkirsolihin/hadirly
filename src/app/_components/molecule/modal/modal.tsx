import React from 'react';
import ModalIcon from '../../atoms/Icon';

interface ModalProps {
  title: string;
  content: string;
  type: 'success' | 'error' | 'warning';
  isOpen: boolean;
  buttonText1?: string;
  buttonType1?: 'primary' | 'secondary';
  buttonText2?: string;
  buttonType2?: 'primary' | 'secondary';
  onConfirm?: () => void;
  onClose?: () => void;
}

function Modal(props: Readonly<ModalProps>) {
  const {
    title,
    content,
    type,
    isOpen,
    buttonText1,
    buttonType1,
    buttonText2,
    buttonType2,
    onClose,
    onConfirm,
  } = props;

  return (
    <div
      className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-50"
      style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className="w-screen h-screen fixed top-0 left-0 bg-[var(--primary)]/60 backdrop-blur-sm z-40 flex items-center justify-center"></div>
      <div className="bg-white dark:bg-[var(--background)] rounded-2xl shadow-2xl p-6 w-80 md:w-96 flex flex-col items-center z-50 border border-[var(--disable)] transition-colors duration-300">
        <ModalIcon type={type} />
        <h2 className="text-xl font-bold mb-2 text-[var(--primary)] text-center">{title}</h2>
        <p className="mb-4 text-[var(--disable)] text-center font-normal">{content}</p>
        <div className="flex justify-end space-x-2 mt-4 w-full">
          {buttonText1 && (
            <button
              className={`px-4 py-2 rounded-2xl min-w-24 font-semibold shadow transition-all duration-200
                ${buttonType1 === 'primary' ? 'bg-[var(--danger)] text-white hover:bg-[var(--primary)]' : 'bg-[var(--disable)] text-[var(--foreground)] hover:bg-[var(--accent)]/40'}`}
              onClick={onConfirm}>
              {buttonText1}
            </button>
          )}
          {buttonText2 && (
            <button
              className={`px-4 py-2 rounded-2xl min-w-24 font-semibold shadow transition-all duration-200
                ${buttonType2 === 'primary' ? 'bg-[var(--primary)] text-white hover:bg-[var(--secondary)]' : 'bg-[var(--disable)] text-[var(--foreground)] hover:bg-[var(--accent)]/40'}`}
              onClick={onClose}>
              {buttonText2}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
