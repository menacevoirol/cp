// src/pages/Game.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import für Link, obwohl im Spiel nicht verwendet, ist es für Konsistenz gut
import "../Doom.css"; // Für das Layout-Styling

const runes = ["𖤐", "⸸", "⚸", "🜍", "⚔", "∞", "⛤", "☥"]; // 8 Paare okkulter Symbole

// Helper zum Mischen der Karten
const initializeCards = () => {
  const deck = [...runes, ...runes]
    .sort(() => 0.5 - Math.random())
    .map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
      matched: false,
    }));
  return deck;
};

export default function Game() {
  const [cards, setCards] = useState(initializeCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [lockBoard, setLockBoard] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setLockBoard(true);
      setMoves((m) => m + 1);

      const [firstIndex, secondIndex] = flippedCards;
      const card1 = cards[firstIndex];
      const card2 = cards[secondIndex];

      if (card1.symbol === card2.symbol) {
        // MATCH: Karten auf 'matched' setzen
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstIndex || card.id === secondIndex
              ? { ...card, matched: true }
              : card
          )
        );
        setScore((s) => s + 1);
        setFlippedCards([]);
        setLockBoard(false);
      } else {
        // NO MATCH: Karten nach 1 Sekunde wieder umdrehen
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstIndex || card.id === secondIndex
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setLockBoard(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleFlip = (id) => {
    if (lockBoard || flippedCards.includes(id) || cards[id].matched) return;

    // Karte umdrehen
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      )
    );
    setFlippedCards((f) => [...f, id]);
  };

  const handleRestart = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setLockBoard(false);
  };

  // Game Over: Alle Karten gematcht (Score 8)
  const isGameOver = score === runes.length;

  return (
    <div className="site-wrapper">
      {/* HEADER und FOOTER sind in App.jsx */}

      <section
        id="game"
        className="section fade-section max-w-5xl mx-auto px-4 pt-24 min-h-screen"
      >
        <h2 className="section-title text-3xl font-bold mb-8 uppercase text-purple-300 tracking-widest">
          The Rune Match
        </h2>

        <div className="text-center mb-8 text-lg font-mono">
          <span className="text-gray-400 mr-8">
            Matches: <span className="text-red-400 font-bold">{score} / 8</span>
          </span>
          <span className="text-gray-400">
            Moves: <span className="text-red-400 font-bold">{moves}</span>
          </span>
        </div>

        {isGameOver ? (
          <div className="text-center p-10 bg-gray-900 border border-red-700 rounded-lg shadow-2xl animate-fadeIn">
            <h3 className="text-5xl font-bold text-green-400 mb-4">VICTORY!</h3>
            <p className="text-xl text-gray-300 mb-6">
              The ancient ritual is complete in {moves} moves.
            </p>
            <button
              onClick={handleRestart}
              className="px-8 py-3 border border-purple-800 rounded-md text-purple-300
                               bg-purple-900/30 hover:bg-purple-900/50 transition-all tracking-[0.2em] uppercase font-bold"
            >
              SUMMON AGAIN
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleFlip(card.id)}
                  className={`memory-card ${card.flipped ? "flipped" : ""} ${
                    card.matched ? "matched" : ""
                  }`}
                >
                  <div className="card-inner">
                    <div className="card-face card-front bg-gray-700">
                      <span className="text-xl font-bold text-red-500">?</span>
                    </div>
                    <div className="card-face card-back bg-gray-800 border-2 border-red-700">
                      <span
                        className="text-5xl"
                        style={{ color: card.matched ? "#4ade80" : "#c084fc" }}
                      >
                        {card.symbol}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={handleRestart}
                className="text-sm text-gray-500 hover:text-red-500 transition-all"
              >
                [ Reset Ritual ]
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
