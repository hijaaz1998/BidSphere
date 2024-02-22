import React from 'react';

const ChatBox = () => {
  // Sample list of users
  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
    // Add more users as needed
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center justify-between border-b border-gray-200 mb-4">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
          />
          {/* You can add a search icon here if needed */}
        </div>
        <div>
          <p className="text-lg font-semibold mb-2">Recent Chats:</p>
          <ul>
            {users.map(user => (
              <li key={user.id} className="flex items-center py-2">
                <div className="rounded-full h-8 w-8 bg-gray-300 mr-2"></div>
                <p>{user.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
