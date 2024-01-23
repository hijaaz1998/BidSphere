import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RightSideComponent = () => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showSetAuctionModal, setShowSetAuctionModal] = useState(false);
  const [auctionDate, setAuctionDate] = useState(new Date());

  const handleRemoveClick = () => {
    setShowRemoveModal(true);
  };

  const handleConfirmRemove = () => {
    setShowRemoveModal(false);
  };

  const handleCancelRemove = () => {
    setShowRemoveModal(false);
  };

  const handleSetAuctionClick = () => {
    setShowSetAuctionModal(true);
  };

  const handleConfirmSetAuction = () => {
    // Implement the logic to handle setting the auction date here
    // For now, let's just log the selected date
    console.log('Selected Auction Date:', auctionDate);

    setShowSetAuctionModal(false);
  };

  const handleCancelSetAuction = () => {
    setShowSetAuctionModal(false);
  };

  return (
    <div className="bg-gray-400 p-4 rounded-md shadow-md w-full mb-4">
      <h2 className="text-lg font-semibold mb-2">Card Title</h2>

      {/* Buttons Section */}
      <div className="flex flex-col items-center">
        <button
          className="bg-blue-500 text-white w-36 px-4 py-2 rounded-md mb-2"
          onClick={() => setShowSetAuctionModal(true)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white w-36 px-4 py-2 rounded-md mb-2"
          onClick={handleRemoveClick}
        >
          Remove
        </button>
        <button
          className="bg-green-500 text-white w-36 px-4 py-2 rounded-md"
          onClick={handleSetAuctionClick}
        >
          Set for Auction
        </button>
      </div>

      {/* Remove Confirmation Modal */}
      {/* Remove Confirmation Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            {/* Modal Content */}
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white p-4">
                <h3 className="text-lg font-semibold mb-4">Remove Item</h3>
                <p>Are you sure you want to remove this item?</p>
              </div>
              <div className="bg-gray-100 p-4">
                <button
                  onClick={handleConfirmRemove}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelRemove}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Set Auction Date Modal */}
      {showSetAuctionModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            {/* Modal Content */}
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              style={{ maxHeight: '80vh' }} // Adjust the maximum height as needed
            >
              <div className="bg-white p-4">
                <h3 className="text-lg font-semibold mb-4">Set Auction Date</h3>
                {/* Datepicker */}
                <DatePicker
                  selected={auctionDate}
                  onChange={(date) => setAuctionDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="bg-gray-100 p-4">
                <button
                  onClick={handleConfirmSetAuction}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelSetAuction}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSideComponent;
