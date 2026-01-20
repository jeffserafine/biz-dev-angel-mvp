interface MomentumMeterProps {
  score: number; // 0-100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function MomentumMeter({ score, showLabel = true, size = 'md' }: MomentumMeterProps) {
  // Determine health color based on score
  const getHealthClass = (score: number) => {
    if (score >= 70) return 'momentum--healthy';
    if (score >= 40) return 'momentum--at-risk';
    return 'momentum--critical';
  };

  const healthClass = getHealthClass(score);

  return (
    <div className={`momentum-meter momentum-meter--${size}`}>
      <div className="momentum-track">
        <div
          className={`momentum-fill ${healthClass}`}
          style={{ width: `${score}%` }}
        />
      </div>
      {showLabel && (
        <span className={`momentum-score ${healthClass}`}>{score}</span>
      )}
    </div>
  );
}

// Simple numeric indicator for compact views
export function MomentumIndicator({ score }: { score: number }) {
  const getClass = (score: number) => {
    if (score >= 70) return 'text-success';
    if (score >= 40) return 'text-warning';
    return 'text-danger';
  };

  return <span className={`momentum-indicator ${getClass(score)}`}>{score}</span>;
}
