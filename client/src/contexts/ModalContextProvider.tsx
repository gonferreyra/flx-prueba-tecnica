import { createContext, useState } from 'react';

type ModalContextStore = {
  isModalOpen: boolean;
  mode: string;
  handleOpenModal: (mode: string) => void;
  handleCloseModal: () => void;
};

export const ModalContext = createContext<ModalContextStore | null>(null);

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('add');

  const handleOpenModal = (mode: string) => {
    setMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, mode, handleOpenModal, handleCloseModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
