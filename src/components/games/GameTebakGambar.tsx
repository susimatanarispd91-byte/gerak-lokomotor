import React, { useState } from 'react';
import { ArrowLeft, Star, RotateCcw, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { GAME1_QUESTIONS, MovementId } from '../../data/learningData';
import { MovementAnimation } from '../MovementAnimation';
import { LokoGuide } from '../LokoGuide';
import { soundEngine } from '../../utils/audio';

interface GameTebakGambarProps {
  onBack: () => void;
  onComplete: (stars: number) => void;
}

export const GameTebakGambar: React.FC<GameTebakGambarProps> = ({
  onBack,
  onComplete,
}) => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [firstTryClean, setFirstTryClean] = useState(true);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [selectedValue, setSelectedValue] = useState<MovementId | null>(null);
  const [finished, setFinished] = useState(false);

  const currentQ = GAME1_QUESTIONS[questionIdx];
  const optionLetters = ['A', 'B', 'C'];

  const handleSelect = (val: MovementId) => {
    if (feedback === 'correct') return;
    soundEngine.playClick();
    setSelectedValue(val);

    if (val === currentQ.correctAnswer) {
      setFeedback('correct');
      const earned = firstTryClean ? 20 : 10;
      setScore((prev) => prev + earned);
      soundEngine.playSuccess();
      soundEngine.speak('Hebat! Jawabanmu benar!');
    } else {
      setFeedback('wrong');
      setFirstTryClean(false);
      soundEngine.playTryAgain();
      soundEngine.speak('Ayo coba lagi! Kamu pasti bisa!');
    }
  };

  const handleNext = () => {
    soundEngine.playClick();
    if (questionIdx < GAME1_QUESTIONS.length - 1) {
      setQuestionIdx((prev) => prev + 1);
      setFeedback('idle');
      setSelectedValue(null);
      setFirstTryClean(true);
    } else {
      const stars = score >= 80 ? 3 : score >= 50 ? 2 : 1;
      onComplete(stars);
      setFinished(true);
      soundEngine.playFanfare();
      soundEngine.speak('Luar biasa! Kamu berhasil menyelesaikan game tebak gambar!');
    }
  };

  const handleRestart = () => {
    soundEngine.playClick();
    setQuestionIdx(0);
    setScore(0);
    setFirstTryClean(true);
    setFeedback('idle');
    setSelectedValue(null);
    setFinished(false);
  };

  if (finished) {
    const stars = score >= 80 ? 3 : score >= 50 ? 2 : 1;
    return (
      <div className="bg-white rounded-3xl border border-amber-200 p-8 sm:p-10 text-center max-w-2xl mx-auto shadow-sm">
        <div className="flex items-center justify-center gap-3 mb-5">
          {[1, 2, 3].map((n) => (
            <Star
              key={n}
              className={`w-12 h-12 anim-star-pop ${
                n <= stars
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200 fill-slate-200'
              }`}
            />
          ))}
        </div>
        <h2 className="font-display text-3xl font-extrabold text-slate-900 mb-2">
          Hebat! Game Tebak Gambar Selesai!
        </h2>
        <p className="text-lg text-slate-700 mb-6 tabular-nums">
          Skor Kamu: <strong className="text-sky-700 text-2xl">{score} / 100</strong>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleRestart}
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
    );
  }

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

        <div className="flex items-center gap-4 text-sm font-bold text-slate-700 tabular-nums">
          <span>
            Soal {questionIdx + 1} / {GAME1_QUESTIONS.length}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-600">Skor: {score}</span>
        </div>
      </div>

      <LokoGuide
        message={
          feedback === 'correct'
            ? 'Hebat! Jawabanmu benar!'
            : feedback === 'wrong'
              ? `Ayo coba lagi! Kamu pasti bisa! Petunjuk: ${currentQ.hint}`
              : 'Perhatikan gambar gerakan di bawah ini, lalu pilih jawaban yang benar!'
        }
        mood={feedback === 'correct' ? 'cheer' : feedback === 'wrong' ? 'encourage' : 'explain'}
      />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-sky-50 border border-sky-200">
            <MovementAnimation
              movement={currentQ.movement}
              character="kid"
              size="lg"
              showGroundLabel={false}
            />
          </div>

          <div className="md:col-span-7 space-y-5">
            <div>
              <p className="text-xs font-bold text-sky-700 mb-1">
                GAME 1 · GERAKAN APA INI?
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentQ.prompt}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedValue === opt.value;
                const isCorrect =
                  feedback === 'correct' && opt.value === currentQ.correctAnswer;
                const isWrongSelected =
                  feedback === 'wrong' && isSelected && opt.value !== currentQ.correctAnswer;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    disabled={feedback === 'correct'}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border-2 text-left font-display font-bold text-xl transition-colors cursor-pointer ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : isWrongSelected
                          ? 'bg-amber-50 border-amber-400 text-amber-900'
                          : 'bg-slate-50 border-slate-200 hover:border-sky-400 hover:bg-sky-50 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-extrabold shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-600 text-white'
                            : isWrongSelected
                              ? 'bg-amber-500 text-white'
                              : 'bg-white border border-slate-300 text-slate-800'
                        }`}
                      >
                        {optionLetters[i]}
                      </span>
                      <span>{opt.label}</span>
                    </div>

                    {isCorrect && <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />}
                    {isWrongSelected && <HelpCircle className="w-7 h-7 text-amber-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {feedback === 'correct' && (
              <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-amber-400 fill-amber-400 anim-star-pop shrink-0" />
                  <p className="font-display font-bold text-lg text-emerald-900">
                    Hebat! Jawabanmu benar!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-base cursor-pointer shrink-0"
                >
                  <span>
                    {questionIdx < GAME1_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
