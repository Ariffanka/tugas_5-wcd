// detailCard.tsx
import React, { useState, ChangeEvent } from 'react';
import cardsDataObject from '../data/cardsData';
const { cardsDataDetail, saveCardsDataToLocalStorage, cardsData: allCardsData } = cardsDataObject;
import { useParams } from 'react-router-dom';
import styles from '../css/detailCard.module.css';

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  detailImageUrl?: string;
  health?: number;
  maxHealth?: number;
  attack?: number;
  defense?: number;
  smallImageUrl?: string;
}

const CardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const card = cardsDataDetail.find((c: CardProps) => c.id === parseInt(id, 10));
  const originalCardData = allCardsData.find(c => c.id === parseInt(id, 10)); // Ambil data card utama
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(card?.imageUrl || null);

  if (!card || !originalCardData) {
    return <div>Card tidak ditemukan.</div>;
  }

  const handleImageError = () => {
    setShowImageUpload(true);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrl = reader.result as string;
        setUploadedImageUrl(newImageUrl);
        setShowImageUpload(false);

        // Perbarui data di localStorage
        const updatedCardsData = allCardsData.map(c =>
          c.id === originalCardData.id ? { ...c, imageUrl: newImageUrl, detailImageUrl: newImageUrl } : c
        );
        saveCardsDataToLocalStorage(updatedCardsData);

        // Mungkin perlu cara untuk memicu pembaruan pada cardsDataDetail jika digunakan di komponen lain
        // Untuk kesederhanaan, kita akan fokus pada pembaruan tampilan di detail card ini.
      };
      reader.readAsDataURL(file);
    }
  };

  const health = card.health || 100;
  const maxHealth = card.maxHealth || 1000;
  const attack = card.attack || 50;
  const defense = card.defense || 50;

  return (
    <div className={styles.detailCardContainer}>
      <div className={styles.detailCardImageContainer}>
        <img
          src={uploadedImageUrl || `/img/details/ff-detail-${card.id}.png`}
          alt={card.title}
          className={styles.detailCardImage}
          onError={handleImageError}
        />
        {showImageUpload && (
          <div className={styles.imageUploadContainer}>
            <label htmlFor="uploadImage" className={styles.uploadLabel}>Unggah Gambar Baru:</label>
            <input type="file" id="uploadImage" accept="image/*" onChange={handleImageUpload} className={styles.uploadInput} />
          </div>
        )}
      </div>

      <h2>{card.title}</h2>

      <div className={styles.detailCardContent}>
        <div className={styles.titleContainer}>
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