const DeleteModal = ({ isOpen, onCancel, productId, deleteProducts }) => {
    return (
      <div
        className={`fixed inset-0 flex justify-center z-10 ${
          isOpen ? "" : "hidden"
        }`}
        style={{ backgroundColor: "rgba(212, 212, 212, 0.712)" }}
      >
        <div className="bg-white p-8 rounded shadow-lg h-[30%] mt-[10%]">
          <h2 className="text-lg font-bold mb-4">Confirmation</h2>
          <p className="mb-6">Are you sure you want to delete?</p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white ml-4"
              onClick={()=> deleteProducts(productId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteModal;