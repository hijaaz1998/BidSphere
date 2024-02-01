import React from 'react';

interface Post {
  id: number;
  image: string;
  caption: string;
}

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
    {posts.map((post) => (
      <div key={post.id} className="bg-green-300 p-4 rounded-md">
        <img src={post.image} alt="" />
        <p>{post.caption}</p>
      </div>
    ))}
  </div>
);

export default Posts;
