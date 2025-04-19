import './css/App.css';
import './css/addCardForm.css';
import ResponsiveCardGrid from './partials/cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireExtinguisher, faSearch, faList, faTh, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, ChangeEvent } from 'react';
import CardDetailPage from './partials/detailCard';
import cardsDataObject from './data/cardsData';

const { cardsData: initialCardsData, saveCardsDataToLocalStorage } = cardsDataObject;

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  detailImageUrl?: string; // Tambah properti untuk gambar detail
  health?: number;
  maxHealth?: number;
  attack?: number;
  defense?: number;
  smallImageUrl?: string;
}

const AddCardForm: React.FC<{ onAddCard: (newCard: CardProps) => void; onCancel: () => void }> = ({ onAddCard, onCancel }) => {
  // ... (kode AddCardForm tidak berubah)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const [cardPreviewImage, setCardPreviewImage] = useState<string | null>(null);
  const [detailImageFile, setDetailImageFile] = useState<File | null>(null);
  const [detailPreviewImage, setDetailPreviewImage] = useState<string | null>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCardImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCardImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCardImageFile(null);
      setCardPreviewImage(null);
    }
  };

  const handleDetailImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDetailImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetailPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setDetailImageFile(null);
      setDetailPreviewImage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Judul dan deskripsi harus diisi.');
      return;
    }

    const newCard: CardProps = {
      id: Date.now(),
      title,
      description,
      imageUrl: cardPreviewImage,
      detailImageUrl: detailPreviewImage, // Simpan data URL untuk gambar detail
    };
    onAddCard(newCard);
    setTitle('');
    setDescription('');
    setCardImageFile(null);
    setCardPreviewImage(null);
    setDetailImageFile(null);
    setDetailPreviewImage(null);
  };

  return (
    <div className="add-card-form-container">
      <h3>Tambah Card Baru</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Judul:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Deskripsi:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cardImage">Gambar Card (Opsional):</label>
          <input type="file" id="cardImage" accept="image/*" onChange={handleCardImageChange} />
          {cardPreviewImage && (
            <div className="image-preview">
              <img src={cardPreviewImage} alt="Preview Card" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="detailImage">Gambar Detail (Opsional):</label>
          <input type="file" id="detailImage" accept="image/*" onChange={handleDetailImageChange} />
          {detailPreviewImage && (
            <div className="image-preview">
              <img src={detailPreviewImage} alt="Preview Detail" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </div>
          )}
        </div>
        <div className="form-actions">
          <button type="submit">Simpan</button>
          <button type="button" onClick={onCancel}>Batal</button>
        </div>
      </form>
    </div>
  );
};

function App() {
  const [gridColumns, setGridColumns] = useState(2);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [cardsData, setCardsData] = useState<CardProps[]>(initialCardsData);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>('default');

  useEffect(() => {
    setCardsData(initialCardsData);
  }, []);

  const toggleGridColumns = (columns: number) => {
    setGridColumns(columns);
  };

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  const handleAddCardClick = () => {
    setIsAddingCard(true);
  };

  const handleAddCard = (newCard: CardProps) => {
    const updatedCards = [...cardsData, newCard];
    setCardsData(updatedCards);
    saveCardsDataToLocalStorage(updatedCards);
    setIsAddingCard(false);
  };

  const handleCancelAddCard = () => {
    setIsAddingCard(false);
  };

  const sortCardsByIndex = (order: 'asc' | 'desc') => {
    const sortedCards = [...cardsData].sort((a, b) => {
      const indexA = initialCardsData.findIndex(card => card.id === a.id);
      const indexB = initialCardsData.findIndex(card => card.id === b.id);
      if (order === 'asc') {
        return indexA - indexB;
      } else {
        return indexB - indexA;
      }
    });
    setCardsData(sortedCards);
    setSortOrder(order);
  };

  const resetSort = () => {
    setCardsData(initialCardsData);
    setSortOrder('default');
  };

  return (
    <Router>
      <div className="App">
        {navbarVisible && (
          <nav className="navbar">
            <div className="navbar-left">
              <FontAwesomeIcon icon={faFireExtinguisher} className="navbar-icon" />
              <span className="navbar-text">Fire Force</span>
            </div>
            <div className="navbar-right">
              <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
            </div>
          </nav>
        )}
        <hr className="hr-blue" />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <header>
                    <div className="controls">
                      <div className="sort-by">
                        <select
                          id="sortBy"
                          className="sort-select"
                          value={sortOrder}
                          onChange={(e) => {
                            if (e.target.value === 'asc') {
                              sortCardsByIndex('asc');
                            } else if (e.target.value === 'desc') {
                              sortCardsByIndex('desc');
                            } else {
                              resetSort();
                            }
                          }}
                        >
                          <option value="default">Urutkan</option>
                          <option value="asc">ASC</option>
                          <option value="desc">DESC</option>
                        </select>
                      </div>
                      <div className="column-toggle">
                        <button
                          className={`column-button ${gridColumns === 2 ? 'active' : ''}`}
                          onClick={() => toggleGridColumns(2)}
                        >
                          <FontAwesomeIcon icon={faTh} className="column-icon" />
                        </button>
                        <button
                          className={`column-button ${gridColumns === 1 ? 'active' : ''}`}
                          onClick={() => toggleGridColumns(1)}
                        >
                          <FontAwesomeIcon icon={faList} className="column-icon" />
                        </button>
                      </div>
                      <button className="add-card-button" onClick={handleAddCardClick}>
                        <FontAwesomeIcon icon={faPlus} className="add-icon" /> Tambah Card
                      </button>
                    </div>
                  </header>
                  {isAddingCard && <AddCardForm onAddCard={handleAddCard} onCancel={handleCancelAddCard} />}
                  <div className="card-grid-wrapper">
                    <ResponsiveCardGrid cards={cardsData} columns={gridColumns} />
                  </div>
                </>
              }
            />
            <Route path="/card/:id" element={<CardDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;