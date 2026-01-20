interface RelationshipStrengthProps {
  strength: 1 | 2 | 3 | 4 | 5;
  showLabel?: boolean;
}

export function RelationshipStrength({ strength, showLabel = false }: RelationshipStrengthProps) {
  const labels = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];

  return (
    <div className="relationship-strength">
      <div className="strength-dots">
        {[1, 2, 3, 4, 5].map(level => (
          <span
            key={level}
            className={`strength-dot ${level <= strength ? 'strength-dot--filled' : ''}`}
          />
        ))}
      </div>
      {showLabel && (
        <span className="strength-label">{labels[strength - 1]}</span>
      )}
    </div>
  );
}

// Influence level indicator for stakeholders
interface InfluenceLevelProps {
  level: 1 | 2 | 3 | 4 | 5;
}

export function InfluenceLevel({ level }: InfluenceLevelProps) {
  const labels = ['Minimal', 'Low', 'Moderate', 'High', 'Decision Maker'];

  return (
    <div className="influence-level">
      <span className="influence-bars">
        {[1, 2, 3, 4, 5].map(l => (
          <span
            key={l}
            className={`influence-bar ${l <= level ? 'influence-bar--filled' : ''}`}
          />
        ))}
      </span>
      <span className="influence-label">{labels[level - 1]}</span>
    </div>
  );
}
