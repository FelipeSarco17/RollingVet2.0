import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./modalAnimations.css"; // Assuming this file contains the animations

const Modal = ({ isVisible, onClose, onAccept, children, closeOnOutsideClick = true }) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center transition-opacity duration-300"
      onClick={closeOnOutsideClick ? onClose : undefined} // Conditional close on outside click
    >
      <div
        className="bg-gradient-to-br from-indigo-400 to-blue-500 p-8 rounded-lg shadow-2xl relative w-3/4 md:w-1/2 lg:w-1/3 animate-fade-in"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
      >
        <button
          className="absolute top-3 right-3 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={onAccept}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>,
    document.body // Render modal at the root of the DOM
  );
};

// const App = () => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const openModal = () => setModalVisible(true);
//   const closeModal = () => setModalVisible(false);
//   const handleAccept = () => {
//     console.log("Formulario enviado exitosamente");
//     closeModal();
//   };

//   return (
//     <div className="p-4">
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded-md"
//         onClick={openModal}
//       >
//         Open Modal
//       </button>

//       <Modal
//         isVisible={isModalVisible}
//         onClose={closeModal}
//         onAccept={handleAccept}
//         closeOnOutsideClick={true} // Modal can be closed by clicking outside
//       >
//         <h2 className="text-2xl font-bold text-white">Confirmación de Envío</h2>
//         <p className="mt-4 text-white">¿Estás seguro de enviar este formulario?</p>
//       </Modal>
//     </div>
//   );
// };

export default App;
