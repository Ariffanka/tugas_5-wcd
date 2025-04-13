// detailCard.tsx
import cardsDataObject from '../data/cardsData';
const { cardsDataDetail } = cardsDataObject;
import { Link, useParams } from 'react-router-dom';
import styles from '../css/detailCard.module.css';

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  // Add stats properties
  health?: number;
  maxHealth?: number;
  attack?: number;
  defense?: number;
  // Optional small image for the card icon
  smallImageUrl?: string;
}

 const navbar:boolean = false;

const CardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const card = cardsDataDetail.find((c: CardProps) => c.id === parseInt(id, 10));

  if (!card) {
    return <div>Card tidak ditemukan.</div>;
  }

  // Default values for stats if not provided
  const health = card.health || 100;
  const maxHealth = card.maxHealth || 1000;
  const attack = card.attack || 50;
  const defense = card.defense || 50;

  return (
    <div className={styles.detailCardContainer}>
      {/* <h2 className={styles.detailCardTitle}>Detail Card</h2> */}
      
      {card.imageUrl && (
        <div className={styles.detailCardImageContainer}>
          <img src={card.imageUrl} alt={card.title} className={styles.detailCardImage} />
        </div>
      )}

      <h2>{card.title}</h2>
      
      <div className={styles.detailCardContent}>
        <div className={styles.titleContainer}>
          {/* <h2>{card.title}</h2> */}
          {/* {card.smallImageUrl && (
            <img 
              src={card.smallImageUrl} 
              alt={`${card.title} icon`} 
              className={styles.smallIcon} 
            />
          )} */}
        </div>
        
        {/* Stats Section */}
        <div className={styles.statsContainer}>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Health</span>
            <div className={styles.statBarContainer}>
              <div 
                className={styles.statBar} 
                style={{ width: `${(health / maxHealth) * 100}%` }}
              ></div>
            </div>
            <span className={styles.statValue}>{health} from {maxHealth}</span>
          </div>
          
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Attack</span>
            <span className={styles.statValue}>{attack}</span>
          </div>
          
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Defense</span>
            <span className={styles.statValue}>{defense}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CardDetailPage;