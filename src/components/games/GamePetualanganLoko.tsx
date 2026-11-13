import React, { useState } from 'react';
import { ArrowLeft, Flag, RotateCcw, Star, CheckCircle2 } from 'lucide-react';
import { ADVENTURE_STATIONS } from '../../data/learningData';
import { MovementAnimation } from '../MovementAnimation';
import { ADVENTURE_MAP_PATH, LOKO_IMAGE_PATH, LokoGuide } from '../LokoGuide';
import { soundEngine } from '../../utils/audio';

interface GamePetualanganLokoProps {
  onBack: () => void;
  onComplete: (stars: number) => void;
}

export const GamePetualanganLoko: React.FC<GamePetualanganLokoProps> = ({
  onBack,
  onComplete,
}) => {
  const [stationIdx, setStationIdx] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [mapError, setMapError] = useState(false);

  const currentStation = ADVENTURE_STATIONS[stationIdx];

  const handleChoose = (optIdx: number) => {
    if (feedback === 'correct') return;
    soundEngine.playClick();
    setSelectedOpt(optIdx);

    if (optIdx === currentStation.correctIndex) {
      setFeedback('correct');
      soundEngine.playSuccess();
      soundEngine.speak(currentStation.lokoCheer);

      window.setTimeout(() => {
        if (stationIdx < ADVENTURE_STATIONS.length - 1) {
          setStationIdx((prev) => prev + 1);
          setFeedback('idle');
          setSelectedOpt(null);
        } else {
          const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
          onComplete(stars);
          setFinished(true);
          soundEngine.playFanfare();
          soundEngine.speak('Selamat! Kamu berhasil menyelesaikan petualangan bersama kelinci LOKO!');
        }
      }, 1300);
    } else {
      setFeedback('wrong');
      setMistakes((m) => m + 1);
      soundEngine.playTryAgain();
      soundEngine.speak('Jangan menyerah, ayo coba lagi!');
    }
  };

  const handleRestart = () => {
    soundEngine.playClick();
    setStationIdx(0);
    setMistakes(0);
    setFeedback('idle');
    setSelectedOpt(null);
    setFinished(false);
  };

  const earnedStars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            soundEngine.stopSpeech();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Daftar Game</span>
        </button>

        <div className="text-sm font-bold text-slate-700 tabular-nums">
          Pos {finished ? 5 : stationIdx + 1} dari 5 · Menuju Garis Finish
        </div>
      </div>

      {/* Playground Trail Progress Map */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-200 bg-emerald-50 shadow-sm">
        {!mapError && (
          <img
            src={ADVENTURE_MAP_PATH}
            alt="Peta Taman Bermain Petualangan LOKO"
            referrerPolicy="no-referrer"
            onError={() => setMapError(true)}
            className="w-full h-44 sm:h-52 object-cover opacity-90"
          />
        )}
        <div
          className={`${
            mapError ? 'p-6 bg-emerald-100' : 'absolute inset-0 bg-slate-900/35 p-4 sm:p-6'
          } flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 font-display font-bold text-sm shadow-sm">
              Taman Olahraga Kelinci LOKO
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-display font-extrabold text-sm shadow-sm">
              <Flag className="w-4 h-4" />
              <span>FINISH</span>
            </span>
          </div>

          {/* 5-Station Stepping Trail */}
          <div className="grid grid-cols-6 gap-2 items-center bg-white/95 rounded-2xl p-3 shadow-sm">
            {[0, 1, 2, 3, 4, 5].map((pos) => {
              const isLokoHere = finished ? pos === 5 : pos === stationIdx;
              const isCleared = finished || pos < stationIdx;
              return (
                <div key={pos} className="flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-display font-extrabold text-sm border-2 transition-transform ${
                      isLokoHere
                        ? 'bg-orange-500 border-white text-white scale-110 shadow-md overflow-hidden'
                        : isCleared
                          ? 'bg-emerald-500 border-emerald-600 text-white'
                          : 'bg-slate-100 border-slate-300 text-slate-600'
                    }`}
                  >
                    {isLokoHere ? (
                      <img
                        src={LOKO_IMAGE_PATH}
                        alt="LOKO"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : isCleared ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : pos === 5 ? (
                      <Flag className="w-4 h-4" />
                    ) : (
                      pos + 1
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 mt-1">
                    {pos === 5 ? 'Finish' : `Pos ${pos + 1}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {finished ? (
        <div className="bg-white rounded-3xl border border-amber-200 p-8 sm:p-10 text-center max-w-2xl mx-auto shadow-sm">
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
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-emerald-700 mb-3">
            SELAMAT! KAMU BERHASIL MENYELESAIKAN PETUALANGAN!
          </h2>
          <p className="text-lg text-slate-700 mb-7">
            Kelinci LOKO berhasil melewati 5 pos taman bermain hingga garis FINISH berkat bantuanmu!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-display font-bold text-base cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Petualangan Lagi</span>
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
        <div className="space-y-5">
          <LokoGuide
            message={
              feedback === 'correct'
                ? currentStation.lokoCheer
                : feedback === 'wrong'
                  ? 'Jangan menyerah, ayo coba lagi!'
                  : `Bantu LOKO melewati ${currentStation.title} dengan menjawab tantangan ini!`
            }
            mood={
              feedback === 'correct'
                ? 'cheer'
                : feedback === 'wrong'
                  ? 'encourage'
                  : 'explain'
            }
          />

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-emerald-50 border border-emerald-200">
                <MovementAnimation
                  movement={currentStation.scene}
                  character={currentStation.station === 4 ? 'loko' : 'kid'}
                  size="lg"
                />
              </div>

              <div className="md:col-span-7 space-y-5">
                <div>
                  <p className="text-xs font-bold text-emerald-700 mb-1">
                    {currentStation.title}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                    {currentStation.question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {currentStation.options.map((opt, idx) => {
                    const isSelected = selectedOpt === idx;
                    const isRight =
                      feedback === 'correct' && idx === currentStation.correctIndex;
                    const isWrong =
                      feedback === 'wrong' && isSelected && idx !== currentStation.correctIndex;

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleChoose(idx)}
                        disabled={feedback === 'correct'}
                        className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-display font-bold text-lg transition-colors cursor-pointer ${
                          isRight
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                            : isWrong
                              ? 'bg-amber-50 border-amber-400 text-amber-900'
                              : 'bg-slate-50 border-slate-200 hover:border-sky-400 hover:bg-sky-50 text-slate-900'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
