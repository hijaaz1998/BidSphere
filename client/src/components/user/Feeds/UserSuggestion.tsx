// UserSuggestions.tsx
import React from "react";
import userImage from "../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg"; // replace with actual path

interface UserSuggestionsProps {
  suggestions: string[];
}

const UserSuggestions: React.FC<UserSuggestionsProps> = ({ suggestions }) => {
  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
      <ul>
        {suggestions.map((user, index) => (
          <li key={index} className="flex items-center space-x-2 mb-2">
            <img
              src={userImage} // Replace with the actual data property for the user image
              alt={`User ${index + 1}`}
              className="w-8 h-8 object-cover rounded-full"
            />
            <span className="text-gray-700">{user}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSuggestions;
