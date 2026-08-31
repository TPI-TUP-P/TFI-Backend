import { useState, useCallback } from 'react';
import ConfirmationModal from '../Components/ui/ConfirmationModal';

const useModalConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    type: 'danger',
    title: '',
    description: '',
    buttonConfirmText: 'Confirmar',
    buttonCancelText: 'Cancelar',
    onConfirm: () => {},
    onCancel: () => {},
  });


  const openModal = useCallback((options) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      ...options,
      onConfirm: options.onConfirm || (() => {}),
      onCancel: options.onCancel || (() => {}),
    }));
    setIsOpen(true);
  }, []);

  /**
   * Cierra el modal
   */
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Maneja la confirmación y cierra el modal
   */
  const handleConfirm = useCallback(() => {
    config.onConfirm();
    closeModal();
  }, [config, closeModal]);

  /**
   * Maneja la cancelación y cierra el modal
   */
  const handleCancel = useCallback(() => {
    config.onCancel?.();
    closeModal();
  }, [config, closeModal]);

  /**
   * Componente Modal renderizado
   */
  const Modal = (
    <ConfirmationModal
      isOpen={isOpen}
      type={config.type}
      title={config.title}
      description={config.description}
      buttonConfirmText={config.buttonConfirmText}
      buttonCancelText={config.buttonCancelText}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return {
    Modal,
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModalConfirm;
