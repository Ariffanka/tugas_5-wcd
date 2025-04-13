// PokemonCard.tsx
import React from 'react';
import '../css/card.css';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  smallImage?: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  image,
  smallImage,
  health,
  maxHealth,
  attack,
  defense
}) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-card-header">
        <span className="pokemon-id">#{id}</span>
      </div>
      
      <div className="pokemon-image-container">
        <img src={image} alt={name} className="pokemon-image" />
      </div>
      
      <div className="pokemon-info">
        <div className="pokemon-name-container">
          <h2 className="pokemon-name">{name}</h2>
          {smallImage && (
            <img src={smallImage} alt={name} className="pokemon-small-image" />
          )}
        </div>
        
        <div className="pokemon-stats">
          <div className="stat-row">
            <span className="stat-label">Health</span>
            <div className="stat-bar-container">
              <div 
                className="stat-bar health-bar" 
                style={{ width: `${(health / maxHealth) * 100}%` }}
              ></div>
            </div>
            <span className="stat-value">{health} from {maxHealth}</span>
          </div>
          
          <div className="stat-row">
            <span className="stat-label">Attack</span>
            <span className="stat-value attack-value">{attack}</span>
          </div>
          
          <div className="stat-row">
            <span className="stat-label">Defense</span>
            <span className="stat-value defense-value">{defense}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;