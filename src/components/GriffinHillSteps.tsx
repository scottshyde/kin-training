'use client';

const steps = [
  { abbr: 'Co', label: 'Case\nOpen', color: '#B53A2E' },
  { abbr: 'Na', label: 'Needs\nAudit', color: '#D4A03A' },
  { abbr: 'Sp', label: 'Solution\nPresentation', color: '#B8B830' },
  { abbr: 'As', label: 'Adapted\nSolution', color: '#7DA82B' },
  { abbr: 'Ci', label: 'Closing\nInteractions', color: '#2E5E1A' },
  { abbr: 'Ff', label: 'Fulfillment &\nFollow Up', color: '#2C3A6B' },
];

interface GriffinHillStepsProps {
  highlight?: string[];
}

export default function GriffinHillSteps({ highlight }: GriffinHillStepsProps) {
  const allActive = !highlight || highlight.length === 0;

  return (
    <div style={{ marginBottom: '3rem' }}>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.5)',
        marginBottom: '1.25rem',
        letterSpacing: '-0.02em',
      }}>
        Six Steps of the Sales Process
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '6px',
        maxWidth: '420px',
      }}>
        {steps.map((step) => {
          const isActive = allActive || highlight?.includes(step.abbr);
          return (
            <div
              key={step.abbr}
              style={{
                background: isActive ? step.color : 'rgba(255,255,255,0.04)',
                borderRadius: '6px',
                padding: 'clamp(0.75rem, 2vw, 1.25rem)',
                textAlign: 'center',
                opacity: isActive ? 1 : 0.25,
                transition: 'opacity 0.3s',
              }}
            >
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1,
                marginBottom: '0.25rem',
              }}>
                {step.abbr}
              </div>
              <div style={{
                fontSize: 'clamp(0.5rem, 1.5vw, 0.6875rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.3,
                whiteSpace: 'pre-line',
              }}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
