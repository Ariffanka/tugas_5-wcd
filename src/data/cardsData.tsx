interface CardProps {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
  }
  
  const cardsData: CardProps[] = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    title: `Card ${index + 1}`,
    description: `Ini adalah deskripsi untuk card ${index + 1}.`,
    imageUrl: `/img/cards/ff-${index + 1}.jpg`,
  }));
  const cardsDataDetail: CardProps[] = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    title: `Card ${index + 1}`,
    description: `Ini adalah deskripsi untuk card ${index + 1}.`,
    imageUrl: `/img/details/ff-detail-${index + 1}.png`,
  }));
  
  export default { cardsData, cardsDataDetail };