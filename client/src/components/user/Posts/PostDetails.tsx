import React from 'react'
import imageUrl from '../assets/Old globe.jpg'

const PostDetails = () => {
  return (
    <div className="flex min-h-screen bg-white">
        {/* Feeds Section */}
        <div className="flex-1 overflow-hidden">
            <div className="px-6">
            <div className="bg-white">
                {/* Feed Content */}
                <div
                className="max-w-xl mx-auto bg-white rounded-md overflow-hidden shadow-lg my-4 "
                >
                {/* User Profile Section */}
                <div className="flex flex-col p-4">
                    <div className="flex items-center">
                    <img
                        src={imageUrl}
                        alt="User Profile"
                        className="w-12 h-12 object-cover rounded-full"
                    />
                    <div className="ml-4">
                        <button>
                        <h2 className="text-lg font-semibold">
                            John Doe
                        </h2>
                        </button>
                        {/* Other user information can go here */}
                    </div>
                    </div>
                    {/* Post Name Section */}
                    <div className="mt-4">
                    <h2 className="text-xl font-semibold">
                        Dummy Product Name
                    </h2>
                    </div>
                </div>

                {/* Post Image Section */}
                <img
                    src={imageUrl}
                    alt="Post"
                    className="w-full h-full object-contain min-h-48"
                />
                </div>
            </div>
            </div>
        </div>
    </div>

  )
}

export default PostDetails