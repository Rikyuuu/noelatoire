import React from 'react';

interface WinnerDisplayProps {
  winner: string | null;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner }) => {
  return (
    <div className="winner-display">
      {winner ? (
        <h2 className="text-2xl font-bold text-center">
          Le gagnant est : <span className="text-green-500">{winner}</span>
        </h2>
      ) : (
        <h2 className="text-2xl font-bold text-center">Aucun gagnant encore</h2>
      )}
    </div>
  );
};

export default WinnerDisplay;