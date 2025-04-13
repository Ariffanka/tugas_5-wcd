import './css/App.css';
import ResponsiveCardGrid from './partials/cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireExtinguisher, faSearch, faList, faTh } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import CardDetailPage from './partials/detailCard';
import cardsDataObject from './data/cardsData'; // Import sebagai objek

const { cardsData } = cardsDataObject;

function App() {
  const [gridColumns, setGridColumns] = useState(2);
  const [navbarVisible, setNavbarVisible] = useState(true); // State untuk mengontrol visibilitas navbar

  const toggleGridColumns = (columns: number) => {
    setGridColumns(columns);
  };

  // Fungsi untuk mengubah visibilitas navbar (contoh)
  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
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
                <> {/* Gunakan Fragment untuk membungkus header dan card grid */}
                  <header>
                    <div className="controls">
                      <div className="sort-by">
                        <select id="sortBy" className="sort-select">
                          <option value="default">Sort By</option>
                          <option value="title">Title</option>
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
                    </div>
                  </header>
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