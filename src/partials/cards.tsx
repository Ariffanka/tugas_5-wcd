import React from 'react';
import '../css/cards.css';
import { Link } from 'react-router-dom';

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}

interface ResponsiveCardGridProps {
  cards: CardProps[];
  columns: number;
}

const ResponsiveCardGrid: React.FC<ResponsiveCardGridProps> = ({ cards, columns }) => {
  return (
    <div className="card-grid-container" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {cards.map((card, index) => (
        <Link
          key={card.id}
          to={`/card/${card.id}`}
          className="card-link"
        >
          <div className="card full-image-card">
            <div className="card-index">{index + 1}</div>
            {card.imageUrl && (
              <div className="card-image-container">
                <img src={card.imageUrl} alt={card.title} className="card-image" />
              </div>
            )}
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ResponsiveCardGrid;