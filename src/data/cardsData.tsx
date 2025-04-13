interface CardProps {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    health?: number;
    maxHealth?: number;
    attack?: number;
    defense?: number;
    smallImageUrl?: string; // Tambahkan properti smallImageUrl jika diperlukan
  }
  
  const manualTitles = [
    "Shinra Kusakabe",
    "Arthur Boyle",
    "Shinmo Benimaru",
    "Joker",
    "Takamura Hinawa",
    "Kurono",
  ];
  
  const generateRandomStat = () => Math.floor(Math.random() * 100) + 50; // Nilai antara 50-149
  const generateRandomHealth = () => Math.floor(Math.random() * 500) + 500; // Nilai antara 500-999
  
  const cardsData: CardProps[] = Array.from({ length: manualTitles.length }, (_, index) => {
    const health = generateRandomHealth();
    return {
      id: index + 1,
      title: manualTitles[index],
      description: `Ini adalah deskripsi untuk card ${manualTitles[index]}.`,
      imageUrl: `/img/cards/ff-${index + 1}.jpg`,
      health: health,
      maxHealth: health + generateRandomHealth(),
      attack: generateRandomStat(),
      defense: generateRandomStat(),
      smallImageUrl: `/img/icons/ff-icon-${index + 1}.png`, // Contoh smallImageUrl
    };
  });
  
  const cardsDataDetail: CardProps[] = Array.from({ length: manualTitles.length }, (_, index) => {
    const health = generateRandomHealth();
    return {
      id: index + 1,
      title: manualTitles[index],
      description: `Ini adalah deskripsi detail untuk ${manualTitles[index]}.`,
      imageUrl: `/img/details/ff-detail-${index + 1}.png`,
      health: health,
      maxHealth: health + generateRandomHealth(),
      attack: generateRandomStat(),
      defense: generateRandomStat(),
      smallImageUrl: `/img/icons/ff-icon-${index + 1}-small.png`, // Contoh smallImageUrl detail
    };
  });
  
  export default { cardsData, cardsDataDetail };