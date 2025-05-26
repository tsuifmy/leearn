import React from 'react';

interface CardProps {
  title: string;
  description: string;
  author?: string;
  likes?: number;
  tags?: string[];
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  author, 
  likes = 0, 
  tags = [], 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        {author && <span>作者: {author}</span>}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:text-red-500">
            ❤️ {likes}
          </button>
          <button className="hover:text-blue-500">分享</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
