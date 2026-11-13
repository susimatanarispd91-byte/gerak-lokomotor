import React from 'react';
import { VisualSceneId } from '../data/learningData';

interface MovementAnimationProps {
  movement: VisualSceneId;
  character?: 'kid' | 'loko';
  size?: 'sm' | 'md' | 'lg';
  showGroundLabel?: boolean;
}

export const MovementAnimation: React.FC<MovementAnimationProps> = ({
  movement,
  character = 'kid',
  size = 'md',
  showGroundLabel = true,
}) => {
  const sizeClass =
    size === 'sm'
      ? 'w-28 h-28'
      : size === 'lg'
        ? 'w-56 h-56 sm:w-64 sm:h-64'
        : 'w-40 h-40';

  const isLoko = character === 'loko';

  const renderMotionTrails = () => {
    if (movement === 'berlari' || movement === 'berderap') {
      return (
        <g opacity="0.55" stroke="#0284C7" strokeWidth="3" strokeLinecap="round">
          <line x1="18" y1="88" x2="38" y2="88" />
          <line x1="12" y1="102" x2="34" y2="102" />
          <line x1="22" y1="116" x2="40" y2="116" />
        </g>
      );
    }
    if (movement === 'melompat' || movement === 'meloncat') {
      return (
        <g opacity="0.45" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="5 5" fill="none">
          <path d="M 48 148 Q 98 112 148 148" />
        </g>
      );
    }
    return null;
  };

  const renderGroundObstacle = () => {
    if (movement === 'melompat') {
      return (
        <g>
          {/* Clear floor line to jump over with 1 foot */}
          <rect x="86" y="156" width="28" height="7" rx="3.5" fill="#F97316" />
          {showGroundLabel && (
            <text x="100" y="176" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0F172A">
              Tolak 1 Kaki
            </text>
          )}
        </g>
      );
    }
    if (movement === 'meloncat') {
      return (
        <g>
          <ellipse cx="100" cy="158" rx="34" ry="5" fill="#CBD5E1" />
          {showGroundLabel && (
            <text x="100" y="176" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0F172A">
              Tolak 2 Kaki
            </text>
          )}
        </g>
      );
    }
    if (movement === 'berjingkat') {
      return (
        <g>
          <ellipse cx="100" cy="158" rx="30" ry="4" fill="#CBD5E1" />
          {showGroundLabel && (
            <text x="100" y="176" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0F172A">
              Ujung Kaki
            </text>
          )}
        </g>
      );
    }
    if (movement === 'berderap') {
      return (
        <g>
          <ellipse cx="100" cy="158" rx="38" ry="4.5" fill="#CBD5E1" />
          {showGroundLabel && (
            <text x="100" y="176" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0F172A">
              Gerak Kuda
            </text>
          )}
        </g>
      );
    }
    return <ellipse cx="100" cy="158" rx="34" ry="5" fill="#CBD5E1" />;
  };

  // Non-locomotor scenes for quiz distractors
  if (movement === 'duduk' || movement === 'membaca' || movement === 'menulis') {
    return (
      <svg viewBox="0 0 200 185" className={sizeClass} aria-label={movement}>
        <rect x="12" y="14" width="176" height="156" rx="24" fill="#F0F9FF" />
        <line x1="26" y1="156" x2="174" y2="156" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        {/* Chair */}
        <rect x="64" y="114" width="44" height="8" rx="4" fill="#D97706" />
        <rect x="68" y="86" width="8" height="70" rx="4" fill="#B45309" />
        <rect x="98" y="120" width="8" height="36" rx="4" fill="#B45309" />
        {/* Kid sitting */}
        <circle cx="94" cy="68" r="18" fill="#FDBA74" />
        <path d="M 76 64 Q 94 42 112 64 Z" fill="#1E293B" />
        <circle cx="99" cy="68" r="2.2" fill="#0F172A" />
        <path d="M 96 75 Q 100 78 104 75" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="80" y="86" width="24" height="30" rx="8" fill="#EF4444" />
        <rect x="96" y="110" width="26" height="10" rx="5" fill="#1E3A8A" />
        <rect x="114" y="116" width="10" height="32" rx="5" fill="#FDBA74" />
        <rect x="112" y="144" width="18" height="8" rx="4" fill="#0284C7" />
        {(movement === 'membaca' || movement === 'menulis') && (
          <g>
            {/* Desk & Book */}
            <rect x="122" y="102" width="44" height="8" rx="4" fill="#0284C7" />
            <rect x="138" y="110" width="8" height="46" rx="4" fill="#0369A1" />
            <rect x="126" y="92" width="28" height="10" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
            {movement === 'menulis' && (
              <line x1="136" y1="84" x2="146" y2="95" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
            )}
          </g>
        )}
      </svg>
    );
  }

  if (movement === 'tidur') {
    return (
      <svg viewBox="0 0 200 185" className={sizeClass} aria-label="tidur">
        <rect x="12" y="14" width="176" height="156" rx="24" fill="#F0F9FF" />
        {/* Bed */}
        <rect x="30" y="120" width="140" height="22" rx="6" fill="#0284C7" />
        <rect x="34" y="142" width="10" height="16" rx="3" fill="#0369A1" />
        <rect x="156" y="142" width="10" height="16" rx="3" fill="#0369A1" />
        {/* Pillow */}
        <rect x="36" y="104" width="32" height="16" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        {/* Sleeping kid */}
        <circle cx="58" cy="96" r="15" fill="#FDBA74" />
        <path d="M 43 96 Q 48 80 68 86" fill="#1E293B" />
        <path d="M 55 96 Q 59 99 63 96" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="74" y="98" width="82" height="22" rx="10" fill="#38BDF8" />
        <text x="125" y="72" fontSize="16" fontWeight="800" fill="#0284C7">
          Zzz...
        </text>
      </svg>
    );
  }

  if (movement === 'berdiri') {
    return (
      <svg viewBox="0 0 200 185" className={sizeClass} aria-label="berdiri diam">
        <rect x="12" y="14" width="176" height="156" rx="24" fill="#F0FDF4" />
        <ellipse cx="100" cy="156" rx="32" ry="5" fill="#CBD5E1" />
        <circle cx="100" cy="52" r="18" fill="#FDBA74" />
        <path d="M 82 48 Q 100 28 118 48 Z" fill="#1E293B" />
        <circle cx="94" cy="52" r="2.2" fill="#0F172A" />
        <circle cx="106" cy="52" r="2.2" fill="#0F172A" />
        <path d="M 95 60 Q 100 64 105 60" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="85" y="72" width="30" height="40" rx="10" fill="#EF4444" />
        <rect x="74" y="76" width="9" height="34" rx="4.5" fill="#FDBA74" />
        <rect x="117" y="76" width="9" height="34" rx="4.5" fill="#FDBA74" />
        <rect x="86" y="112" width="12" height="38" rx="5" fill="#1E3A8A" />
        <rect x="102" y="112" width="12" height="38" rx="5" fill="#1E3A8A" />
        <rect x="83" y="146" width="16" height="8" rx="4" fill="#0284C7" />
        <rect x="101" y="146" width="16" height="8" rx="4" fill="#0284C7" />
      </svg>
    );
  }

  // Locomotor animations (Kid or LOKO)
  const bodyAnimClass =
    movement === 'berjalan'
      ? 'anim-walk-bob'
      : movement === 'berlari'
        ? 'anim-run-lean'
        : movement === 'melompat'
          ? 'anim-jump-arc'
          : movement === 'meloncat'
            ? 'anim-hop-two-feet'
            : movement === 'berjingkat'
              ? 'anim-tiptoe'
              : 'anim-gallop';

  const legAClass =
    movement === 'berjalan'
      ? 'anim-walk-leg-a'
      : movement === 'berlari' || movement === 'berderap'
        ? 'anim-run-leg-a'
        : '';

  const legBClass =
    movement === 'berjalan'
      ? 'anim-walk-leg-b'
      : movement === 'berlari' || movement === 'berderap'
        ? 'anim-run-leg-b'
        : '';

  return (
    <svg viewBox="0 0 200 185" className={sizeClass} aria-label={movement}>
      {/* Clean outdoor sunlit meadow backdrop */}
      <rect x="10" y="10" width="180" height="166" rx="26" fill="#EFF6FF" />
      <path d="M 10 135 Q 100 125 190 135 L 190 150 Q 190 176 164 176 L 36 176 Q 10 176 10 150 Z" fill="#DCFCE7" />
      <circle cx="158" cy="36" r="12" fill="#FDE047" />

      {renderMotionTrails()}
      {renderGroundObstacle()}

      {/* Animated Character */}
      <g className={bodyAnimClass}>
        {/* Back Arm */}
        <g transform="translate(86, 78)" className={legBClass}>
          <rect x="-5" y="0" width="10" height="30" rx="5" fill={isLoko ? '#FFFFFF' : '#FDBA74'} stroke={isLoko ? '#94A3B8' : 'none'} strokeWidth="1.5" />
        </g>

        {/* Back Leg */}
        <g
          transform={
            movement === 'melompat'
              ? 'translate(92, 108) rotate(32)'
              : movement === 'meloncat'
                ? 'translate(92, 108) rotate(-14)'
                : 'translate(92, 108)'
          }
          className={legBClass}
        >
          <rect x="-6" y="0" width="12" height="34" rx="6" fill={isLoko ? '#E2E8F0' : '#1E3A8A'} />
          <rect
            x="-7"
            y="30"
            width="18"
            height="9"
            rx="4.5"
            transform={movement === 'berjingkat' ? 'rotate(24)' : ''}
            fill="#F97316"
          />
        </g>

        {/* Front Leg */}
        <g
          transform={
            movement === 'melompat'
              ? 'translate(106, 108) rotate(-28)'
              : movement === 'meloncat'
                ? 'translate(106, 108) rotate(-14)'
                : movement === 'berjingkat'
                  ? 'translate(104, 108)'
                  : 'translate(104, 108)'
          }
          className={legAClass}
        >
          <rect x="-6" y="0" width="12" height="34" rx="6" fill={isLoko ? '#FFFFFF' : '#2563EB'} stroke={isLoko ? '#CBD5E1' : 'none'} strokeWidth="1.5" />
          <rect
            x="-7"
            y="30"
            width="18"
            height="9"
            rx="4.5"
            transform={movement === 'berjingkat' ? 'rotate(26)' : ''}
            fill="#0284C7"
          />
        </g>

        {/* Torso */}
        <rect
          x="84"
          y="72"
          width="32"
          height="40"
          rx="12"
          fill={isLoko ? '#0284C7' : '#EF4444'}
        />
        {/* Sporty stripe */}
        <rect x="96" y="72" width="8" height="40" fill={isLoko ? '#38BDF8' : '#FFFFFF'} opacity="0.85" />

        {/* Front Arm */}
        <g
          transform={
            movement === 'melompat' || movement === 'meloncat'
              ? 'translate(110, 76) rotate(-125)'
              : movement === 'berjingkat'
                ? 'translate(112, 78) rotate(-48)'
                : 'translate(110, 78)'
          }
          className={legAClass}
        >
          <rect x="-5" y="0" width="10" height="30" rx="5" fill={isLoko ? '#FFFFFF' : '#FDBA74'} stroke={isLoko ? '#94A3B8' : 'none'} strokeWidth="1.5" />
        </g>

        {/* Head: LOKO Rabbit vs Kid Athlete */}
        {isLoko ? (
          <g>
            {/* Rabbit Ears */}
            <ellipse cx="91" cy="28" rx="6.5" ry="18" transform="rotate(-10 91 28)" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
            <ellipse cx="91" cy="29" rx="3.2" ry="12" transform="rotate(-10 91 29)" fill="#FDA4AF" />
            <ellipse cx="109" cy="28" rx="6.5" ry="18" transform="rotate(10 109 28)" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
            <ellipse cx="109" cy="29" rx="3.2" ry="12" transform="rotate(10 109 29)" fill="#FDA4AF" />
            {/* Rabbit Head */}
            <circle cx="100" cy="54" r="19" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Orange Sweatband */}
            <path d="M 82 47 Q 100 41 118 47 L 118 53 Q 100 47 82 53 Z" fill="#F97316" />
            {/* Eyes & Smile */}
            <circle cx="94" cy="55" r="2.5" fill="#0F172A" />
            <circle cx="107" cy="55" r="2.5" fill="#0F172A" />
            <ellipse cx="101" cy="59" rx="3" ry="2" fill="#FB7185" />
            <path d="M 96 63 Q 101 67 106 63" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Fluffy Tail */}
            <circle cx="80" cy="102" r="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          </g>
        ) : (
          <g>
            {/* Kid Head */}
            <circle cx="100" cy="52" r="18" fill="#FDBA74" />
            {/* Hair */}
            <path d="M 82 48 Q 100 28 118 48 Q 112 36 100 36 Q 88 36 82 48 Z" fill="#1E293B" />
            <path d="M 82 48 Q 92 34 112 40 Q 116 44 118 48 Z" fill="#1E293B" />
            {/* Eyes & Big Smile */}
            <circle cx="95" cy="53" r="2.3" fill="#0F172A" />
            <circle cx="107" cy="53" r="2.3" fill="#0F172A" />
            <circle cx="90" cy="57" r="3" fill="#FB7185" opacity="0.45" />
            <path d="M 96 60 Q 101 65 106 60" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}
      </g>
    </svg>
  );
};
