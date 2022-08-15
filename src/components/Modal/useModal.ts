import { useState } from "react";

const useModal = (show = false) => {
  const [isOpen, setIsOpen] = useState(show);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  return {
    close,
    isOpen,
    open,
    toggle,
  };
};

export default useModal;
