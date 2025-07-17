import React from 'react';

const ScoreProgress = ({ score }) => {
  if (!score || score < 1 || score > 5) return null;

  const getProgressColor = (score) => {
    if (score <= 2) return 'progress-error';
    if (score === 3) return 'progress-warning';
    return 'progress-success';
  };

  return (
    <div className="flex items-center gap-3">
      <span className="font-semibold text-gray-700 text-sm font-tilt-neon-title">
        Quality: {score}/5
      </span>
      <progress 
        className={`progress w-32 h-2 transition-all duration-300 ease-in-out ${getProgressColor(score)}`} 
        value={score} 
        max="5"
      />
    </div>
  );
};

export default ScoreProgress; 