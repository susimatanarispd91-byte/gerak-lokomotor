import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const LOKO_IMAGE_PATH = '/src/assets/images/loko_mascot_1794554295730.jpg';
export const HERO_PLAYGROUND_PATH = '/src/assets/images/hero_playground_1794554296869.jpg';
export const ADVENTURE_MAP_PATH = '/src/assets/images/adventure_park_map_1794554296840.jpg';
export const TROPHY_IMAGE_PATH = '/src/assets/images/trophy_celebration_1794554296843.jpg';

interface LokoGuideProps {
  message: string;
  audioText?: string;
  mood?: 'cheer' | 'explain' | 'encourage';
}

export const LokoGuide: React.FC<LokoGuideProps> = ({
  message,
  audioText,
  mood = 'explain',
}) => {
  const [imgError, setImgError] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    soundEngine.playClick();
    soundEngine.speak(audioText || message, setIsSpeaking);
  };

  const containerStyle =
    mood === 'cheer'
      ? 'bg-emerald-50 border-emerald-200'
      : mood === 'encourage'
        ? 'bg-amber-50 border-amber-200'
        : 'bg-white border-sky-200';

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-2xl border ${containerStyle} shadow-sm`}
    >
      <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-sky-100 border border-sky-200 flex items-center justify-center">
        {!imgError ? (
          <img
            src={LOKO_IMAGE_PATH}
            alt="Kelinci LOKO"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-display font-bold text-sky-700 text-lg">LOKO</span>
        )}
      </div>

      <div className="flex-1 text-center sm:text-left">
        <p className="text-xs font-semibold text-sky-700 mb-1">
          Kelinci LOKO berkata:
        </p>
        <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
          “{message}”
        </p>
      </div>

      <button
        type="button"
        onClick={handleSpeak}
        aria-label="Dengarkan suara LOKO"
        className={`shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
          isSpeaking
            ? 'bg-amber-500 text-white'
            : 'bg-sky-600 hover:bg-sky-700 text-white'
        }`}
      >
        <Volume2 className="w-5 h-5" />
        <span>{isSpeaking ? 'Berbicara...' : 'Dengarkan'}</span>
      </button>
    </div>
  );
};
