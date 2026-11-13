import React, { useState, useMemo } from 'react';
import { ArrowLeft, RotateCcw, Star, CheckCircle2, Link2 } from 'lucide-react';
import { CORE_FIVE_MOVEMENTS, MovementId } from '../../data/learningData';
import { MovementAnimation } from '../MovementAnimation';
import { LokoGuide } from '../LokoGuide';
import { soundEngine } from '../../utils/audio';

interface GamePasangkanProps {
  onBack: () => void;
  onComplete: (stars: number) => void;
}

const RIGHT_ORDER: MovementId[] = [
  'meloncat',
  'berjalan',
  'berjingkat',
  'berlari',
  'melompat',
];

export const GamePasangkan: React.FC<GamePasangkanProps> = ({
  onBack,
  onComplete,
}) => {
  const [matchedIds, setMatchedIds] = useState<MovementId[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<MovementId | null>(null);
  const [draggedLeft, setDraggedLeft] = useState<MovementId | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [lokoMsg, setLokoMsg] = useState(
    'Klik gambar di sebelah kiri lalu klik tulisan nama gerakan yang cocok di sebelah kanan, atau seret gambar ke namanya!'
  );
  const [lokoMood, setLokoMood] = useState<'explain' | 'cheer' | 'encourage'>('explain');

  const rightItems = useMemo(
    () =>
      RIGHT_ORDER.map(
        (id) => CORE_FIVE_MOVEMENTS.find((m) => m.id === id)!
      ),
    []
  );

  const isFinished = matchedIds.length === CORE_FIVE_MOVEMENTS.length;
  const earnedStars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;

  const tryMatch = (leftId: MovementId, rightId: MovementId) => {
    if (matchedIds.includes(rightId)) return;

    if (leftId === rightId) {
      soundEngine.playSuccess();
      const next = [...matchedIds, leftId];
      setMatchedIds(next);
      setSelectedLeft(null);
      setDraggedLeft(null);
      setLokoMsg(`Pasangan tepat! Gambar tersebut adalah gerakan ${leftId.toUpperCase()}!`);
      setLokoMood('cheer');

      if (next.length === CORE_FIVE_MOVEMENTS.length) {
        const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
        onComplete(stars);
        soundEngine.playFanfare();
        soundEngine.speak('Hebat! Semua pasangan gambar dan kata berhasil kamu temukan!');
      }
    } else {
      soundEngine.playTryAgain();
      soundEngine.speak('Ups, belum cocok! Ayo coba pasangan lain!');
      setMistakes((m) => m + 1);
      setLokoMsg('Pasangan belum cocok. Perhatikan lagi gerak kakinya ya!');
      setLokoMood('encourage');
    }
  };

  const handleReset = () => {
    soundEngine.playClick();
    setMatchedIds([]);
    setSelectedLeft(null);
    setDraggedLeft(null);
    setMistakes(0);
    setLokoMsg(
      'Klik gambar di sebelah kiri lalu klik tulisan nama gerakan yang cocok di sebelah kanan, atau seret gambar ke namanya!'
    );
    setLokoMood('explain');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Daftar Game</span>
        </button>

        <div className="text-sm font-bold text-slate-700 tabular-nums">
          Pasangan Ditemukan: {matchedIds.length} / {CORE_FIVE_MOVEMENTS.length}
        </div>
      </div>

      <LokoGuide message={lokoMsg} mood={lokoMood} />

      {isFinished ? (
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-10 text-center max-w-2xl mx-auto shadow-sm">
          <div className="flex items-center justify-center gap-3 mb-5">
            {[1, 2, 3].map((n) => (
              <Star
                key={n}
                className={`w-12 h-12 anim-star-pop ${
                  n <= earnedStars
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-200 fill-slate-200'
                }`}
              />
            ))}
          </div>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 mb-2">
            Semua Pasangan Cocok!
          </h2>
          <p className="text-lg text-slate-700 mb-6">
            Kamu hebat sekali membedakan gambar berjalan, berlari, melompat, meloncat, dan berjingkat!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-display font-bold text-base cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Main Lagi</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onBack();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display font-bold text-base cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Pilih Game Lain</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {/* Left Column: Pictures */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-extrabold text-slate-900 mb-2">
                Gambar Gerakan (Kiri)
              </h3>
              {CORE_FIVE_MOVEMENTS.map((m) => {
                const isMatched = matchedIds.includes(m.id);
                const isSelected = selectedLeft === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    disabled={isMatched}
                    draggable={!isMatched}
                    onDragStart={(e) => {
                      setDraggedLeft(m.id);
                      setSelectedLeft(m.id);
                      e.dataTransfer.setData('text/plain', m.id);
                    }}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedLeft((prev) => (prev === m.id ? null : m.id));
                    }}
                    className={`w-full flex items-center justify-between gap-4 p-3 rounded-2xl border-2 transition-colors cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-400 opacity-75 cursor-default'
                        : isSelected
                          ? 'bg-amber-50 border-amber-500 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:border-sky-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <MovementAnimation
                        movement={m.id}
                        character="kid"
                        size="sm"
                        showGroundLabel={false}
                      />
                      <span className="font-display font-bold text-base text-slate-800">
                        {isMatched ? `Cocok: ${m.name}` : isSelected ? 'Terpilih!' : 'Pilih Gambar'}
                      </span>
                    </div>
                    {isMatched ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mr-2" />
                    ) : (
                      <Link2 className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Labels */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-extrabold text-slate-900 mb-2">
                Nama Gerakan (Kanan)
              </h3>
              {rightItems.map((m) => {
                const isMatched = matchedIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    disabled={isMatched}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const leftId = (e.dataTransfer.getData('text/plain') ||
                        draggedLeft) as MovementId | null;
                      if (leftId) {
                        tryMatch(leftId, m.id);
                      }
                    }}
                    onClick={() => {
                      if (selectedLeft) {
                        tryMatch(selectedLeft, m.id);
                      } else {
                        soundEngine.playClick();
                        setLokoMsg('Pilih gambar di sebelah kiri terlebih dahulu ya!');
                      }
                    }}
                    className={`w-full min-h-[124px] flex items-center justify-between gap-4 px-6 py-5 rounded-2xl border-2 transition-colors cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 cursor-default'
                        : selectedLeft
                          ? 'bg-sky-50 border-sky-400 hover:bg-sky-100 text-slate-900'
                          : 'bg-slate-50 border-slate-200 hover:border-sky-300 text-slate-900'
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-display text-2xl sm:text-3xl font-extrabold tracking-wide">
                        {m.name.toUpperCase()}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {isMatched
                          ? 'Pasangan berhasil ditemukan!'
                          : selectedLeft
                            ? 'Ketuk untuk memasangkan!'
                            : 'Pasangkan dengan gambar di kiri'}
                      </p>
                    </div>
                    {isMatched && (
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
