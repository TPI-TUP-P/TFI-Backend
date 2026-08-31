import { useModalStore } from '../Components/stores/useModalStore';

/**
 * Custom hook para usar modales globales en cualquier componente
 * 
 * @returns {Object} Objeto con las acciones del modal
 * @property {Function} openModal - Abre un modal con configuración
 * @property {Function} closeModal - Cierra un modal por ID
 * 
 * @example
 * const { openModal } = useModal();
 * 
 * openModal({
 *   type: 'danger',
 *   title: '¿Eliminar?',
 *   description: 'No se puede deshacer',
 *   onConfirm: () => console.log('Confirmado'),
 *   onCancel: () => console.log('Cancelado')
 * });
 */
export const useModal = () => {
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  return {
    openModal,
    closeModal,
  };
};

export default useModal;
