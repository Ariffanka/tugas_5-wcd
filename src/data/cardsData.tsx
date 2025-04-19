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

const LOCAL_STORAGE_KEY = 'fireForceCardsData';

const manualTitles = [
  "Shinra Kusakabe",
  "Arthur Boyle",
  "Shinmo Benimaru",
  "Joker",
  "Takamura Hinawa",
  "Kurono",
];

const generateRandomStat = () => Math.floor(Math.random() * 100) + 50;
const generateRandomHealth = () => Math.floor(Math.random() * 500) + 500;

const createInitialCardsData = (): CardProps[] => {
  return Array.from({ length: manualTitles.length }, (_, index) => {
    const health = generateRandomHealth();
    return {
      id: index + 1,
      title: manualTitles[index],
      description: `Ini adalah deskripsi untuk card ${manualTitles[index]}.`,
      imageUrl: `/img/cards/ff-${index + 1}.jpg`,
      detailImageUrl: `/img/details/ff-detail-${index + 1}.png`,
      health: health,
      maxHealth: health + generateRandomHealth(),
      attack: generateRandomStat(),
      defense: generateRandomStat(),
      smallImageUrl: `/img/icons/ff-icon-${index + 1}.png`,
    };
  });
};

const getCardsDataFromLocalStorage = (): CardProps[] | null => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData) as CardProps[];
    } catch (error) {
      console.error("Error parsing cards data from localStorage:", error);
      return null;
    }
  }
  return null;
};

const saveCardsDataToLocalStorage = (data: CardProps[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving cards data to localStorage:", error);
  }
};

const initialCardsData = getCardsDataFromLocalStorage() || createInitialCardsData();
saveCardsDataToLocalStorage(initialCardsData);

const cardsDataDetail: CardProps[] = initialCardsData.map(card => ({
  ...card,
  description: `Ini adalah deskripsi detail untuk ${card.title}.`,
  imageUrl: card.detailImageUrl,
  smallImageUrl: `/img/icons/ff-icon-${card.id}-small.png`,
}));

export default { cardsData: initialCardsData, cardsDataDetail, saveCardsDataToLocalStorage, cardsData: initialCardsData };