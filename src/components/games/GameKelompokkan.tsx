import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Star, CheckCircle2, Hand } from 'lucide-react';
import { CORE_FIVE_MOVEMENTS, GAME2_CARDS, MovementId, SortCard } from '../../data/learningData';
import { MovementAnimation } from '../MovementAnimation';
import { LokoGuide } from '../LokoGuide';
import { soundEngine } from '../../utils/audio';

interface GameKelompokkanProps {
  onBack: () => void;
  onComplete: (stars: number) => void;
}

function shuffleCards(cards: SortCard[]) {
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const GameKelompokkan: React.FC<GameKelompokkanProps> = ({
  onBack,
  onComplete,
}) => {
  const [remainingCards, setRemainingCards] = useState<SortCard[]>(() =>
    shuffleCards(GAME2_CARDS)
  );
  const [placedByCategory, setPlacedByCategory] = useState<Record<MovementId, SortCard[]>>({
    berjalan: [],
    berlari: [],
    melompat: [],
    meloncat: [],
    berjingkat: [],
    berderap: [],
  });
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [lokoMsg, setLokoMsg] = useState(
    'Seret kartu ke kotak gerakan yang tepat, atau ketuk kartu lalu ketuk kotaknya!'
  );
  const [lokoMood, setLokoMood] = useState<'explain' | 'cheer' | 'encourage'>('explain');

  const isFinished = remainingCards.length === 0;

  const tryPlaceCard = (cardId: string, targetCategory: MovementId) => {
    const card = remainingCards.find((c) => c.id === cardId);
    if (!card) return;

    if (card.category === targetCategory) {
      soundEngine.playSuccess();
      const nextRemaining = remainingCards.filter((c) => c.id !== cardId);
      setRemainingCards(nextRemaining);
      setPlacedByCategory((prev) => ({
        ...prev,
        [targetCategory]: [...prev[targetCategory], card],
      }));
      setSelectedCardId(null);
      setDraggedCardId(null);
      setScore((prev) => prev + 10);
      setLokoMsg(`Benar! "${card.title}" termasuk gerakan ${targetCategory}!`);
      setLokoMood('cheer');

      if (nextRemaining.length === 0) {
        const stars = mistakes <= 1 ? 3 : mistakes <= 3 ? 2 : 1;
        onComplete(stars);
        soundEngine.playFanfare();
        soundEngine.speak('Hebat sekali! Semua gambar sudah dikelompokkan dengan benar!');
      }
    } else {
      soundEngine.playTryAgain();
      soundEngine.speak('Ayo coba lagi! Perhatikan gerakannya ya!');
      setMistakes((m) => m + 1);
      setLokoMsg(`Belum tepat! Perhatikan lagi gambar "${card.title}" ya, ayo coba kotak lain!`);
      setLokoMood('encourage');
    }
  };

  const handleReset = () => {
    soundEngine.playClick();
    setRemainingCards(shuffleCards(GAME2_CARDS));
    setPlacedByCategory({
      berjalan: [],
      berlari: [],
      melompat: [],
      meloncat: [],
      berjingkat: [],
      berderap: [],
    });
    setSelectedCardId(null);
    setDraggedCardId(null);
    setScore(0);
    setMistakes(0);
    setLokoMsg('Seret kartu ke kotak gerakan yang tepat, atau ketuk kartu lalu ketuk kotaknya!');
    setLokoMood('explain');
  };

  const earnedStars = mistakes <= 1 ? 3 : mistakes <= 3 ? 2 : 1;

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

        <div className="flex items-center gap-4 text-sm font-bold text-slate-700 tabular-nums">
          <span>Tersisa: {remainingCards.length} kartu</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-700">Skor: {score}</span>
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
            Semua Gerakan Berhasil Dikelompokkan!
          </h2>
          <p className="text-lg text-slate-700 mb-6 tabular-nums">
            Skor Kamu: <strong className="text-emerald-700 text-2xl">{score} Poin</strong>
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
        <div className="space-y-6">
          {/* Cards Pool */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h3 className="font-display text-lg font-extrabold text-slate-900">
                1. Pilih atau Seret Gambar Gerakan (8 Kartu)
              </h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700">
                <Hand className="w-4 h-4" />
                <span>Klik kartu lalu klik kotak kategori di bawah</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {remainingCards.map((card) => {
                const isSelected = selectedCardId === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    draggable
                    onDragStart={(e) => {
                      setDraggedCardId(card.id);
                      setSelectedCardId(card.id);
                      e.dataTransfer.setData('text/plain', card.id);
                    }}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedCardId((prev) => (prev === card.id ? null : card.id));
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center transition-transform cursor-grab active:cursor-grabbing ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 scale-[1.02] shadow-md'
                        : 'bg-slate-50 border-slate-200 hover:border-sky-400'
                    }`}
                  >
                    <MovementAnimation
                      movement={card.category}
                      character="kid"
                      size="sm"
                      showGroundLabel={false}
                    />
                    <p className="font-display font-bold text-sm text-slate-900 mt-2 leading-tight">
                      {card.title}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">{card.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5 Category Drop Zones */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
            <h3 className="font-display text-lg font-extrabold text-slate-900 mb-4">
              2. Masukkan ke Kotak Gerakan yang Tepat
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {CORE_FIVE_MOVEMENTS.map((cat) => {
                const items = placedByCategory[cat.id];
                return (
                  <div
                    key={cat.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const cardId = e.dataTransfer.getData('text/plain') || draggedCardId;
                      if (cardId) {
                        tryPlaceCard(cardId, cat.id);
                      }
                    }}
                    onClick={() => {
                      if (selectedCardId) {
                        tryPlaceCard(selectedCardId, cat.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && selectedCardId) {
                        e.preventDefault();
                        tryPlaceCard(selectedCardId, cat.id);
                      }
                    }}
                    className={`min-h-[168px] p-4 rounded-2xl border-2 border-dashed flex flex-col justify-between transition-colors cursor-pointer ${
                      selectedCardId
                        ? `${cat.surfaceClass} border-sky-500 hover:bg-sky-100/60`
                        : `${cat.surfaceClass} ${cat.borderClass}`
                    }`}
                  >
                    <div>
                      <p className={`font-display font-extrabold text-lg ${cat.textClass}`}>
                        {cat.name}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {selectedCardId ? 'Ketuk kotak ini!' : 'Taruh kartu di sini'}
                      </p>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-xs font-bold text-emerald-900"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
