import React from 'react';

const LiveAuctions = () => {
  const dummyData = [
    {
      title: 'Card 1',
      description: 'This is the description for Card 1.',
      imageUrl: 'https://placekitten.com/300/200', // Placeholder image
    },
    {
      title: 'Card 2',
      description: 'This is the description for Card 2.',
      imageUrl: 'https://placekitten.com/300/201', // Placeholder image
    },
    {
      title: 'Card 3',
      description: 'This is the description for Card 3.',
      imageUrl: 'https://placekitten.com/300/202', // Placeholder image
    },
    {
        title: 'Card 3',
        description: 'This is the description for Card 3.',
        imageUrl: 'https://placekitten.com/300/202', // Placeholder image
      },
  ];

  return (
    <div className="container mx-auto grid grid-cols-4 mt-20">
      {dummyData.map((data, index) => (
        <div key={index} className="card mx-auto px-6 bg-white mb-10 flex flex-col items-center py-5 drop-shadow-lg">
            <div className='flex justify-center'>
              <img src={data.imageUrl} alt={data.title} className="fixed-size-image-auction" />
            </div>
            <div className="card-content">
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">Bid Now</button>
        </div>
      ))}
    </div>
  );
};

export default LiveAuctions;
