import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Star,
  RotateCcw,
  BookOpen,
  Home,
  Trophy,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/learningData';
import { MovementAnimation } from './MovementAnimation';
import { LokoGuide, TROPHY_IMAGE_PATH } from './LokoGuide';
import { soundEngine } from '../utils/audio';

interface QuizSectionProps {
  studentName: string;
  onSaveScore: (score: number) => void;
  onBackToMenu: () => void;
  onGoToMateri: () => void;
  onGoToGames: () => void;
  onGoHome: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  studentName,
  onSaveScore,
  onBackToMenu,
  onGoToMateri,
  onGoToGames,
  onGoHome,
}) => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [trophyError, setTrophyError] = useState(false);

  const currentQ = QUIZ_QUESTIONS[questionIdx];
  const hasAnswered = selectedKey !== null;
  const isCurrentCorrect = selectedKey === currentQ.correctKey;

  const handleChooseOption = (key: 'A' | 'B' | 'C') => {
    if (hasAnswered) return;
    soundEngine.playClick();
    setSelectedKey(key);

    if (key === currentQ.correctKey) {
      setCorrectCount((c) => c + 1);
      soundEngine.playSuccess();
      soundEngine.speak('Hebat! Jawabanmu benar!');
    } else {
      setWrongCount((w) => w + 1);
      soundEngine.playTryAgain();
      soundEngine.speak(`Jawaban yang tepat adalah ${currentQ.correctKey}. ${currentQ.explanation}`);
    }
  };

  const handleNext = () => {
    soundEngine.playClick();
    soundEngine.stopSpeech();
    if (questionIdx < QUIZ_QUESTIONS.length - 1) {
      setQuestionIdx((i) => i + 1);
      setSelectedKey(null);
    } else {
      const finalScore = correctCount * 10;
      onSaveScore(finalScore);
      setFinished(true);
      soundEngine.playFanfare();
      if (finalScore >= 90) {
        soundEngine.speak(`Luar biasa ${studentName}! Kamu juara gerak dengan nilai ${finalScore}!`);
      } else if (finalScore >= 80) {
        soundEngine.speak(`Hebat ${studentName}! Kamu sudah paham dengan nilai ${finalScore}!`);
      } else if (finalScore >= 70) {
        soundEngine.speak(`Bagus ${studentName}! Terus berlatih ya, nilaimu ${finalScore}!`);
      } else {
        soundEngine.speak(`Tetap semangat ${studentName}! Ayo belajar lagi bersama LOKO!`);
      }
    }
  };

  const handleRestartQuiz = () => {
    soundEngine.playClick();
    setQuestionIdx(0);
    setSelectedKey(null);
    setCorrectCount(0);
    setWrongCount(0);
    setFinished(false);
  };

  if (finished) {
    const finalScore = correctCount * 10;
    const starCount =
      finalScore >= 90 ? 5 : finalScore >= 80 ? 4 : finalScore >= 70 ? 3 : finalScore >= 50 ? 2 : 1;

    let motivationTitle = 'TETAP SEMANGAT! AYO BELAJAR LAGI!';
    let motivationTone = 'text-amber-700';
    if (finalScore >= 90) {
      motivationTitle = 'LUAR BIASA! KAMU JUARA GERAK!';
      motivationTone = 'text-emerald-700';
    } else if (finalScore >= 80) {
      motivationTitle = 'HEBAT! KAMU SUDAH PAHAM!';
      motivationTone = 'text-sky-700';
    } else if (finalScore >= 70) {
      motivationTitle = 'BAGUS! TERUS BERLATIH!';
      motivationTone = 'text-orange-700';
    }

    return (
      <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-10 max-w-3xl mx-auto shadow-sm text-center space-y-6">
        <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-3xl overflow-hidden bg-amber-50 border border-amber-200 flex items-center justify-center">
          {!trophyError ? (
            <img
              src={TROPHY_IMAGE_PATH}
              alt="Piala Juara Gerak Lokomotor"
              referrerPolicy="no-referrer"
              onError={() => setTrophyError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <Trophy className="w-20 h-20 text-amber-500" />
          )}
        </div>

        {/* Animated Stars */}
        <div className="flex items-center justify-center gap-2" aria-label={`${starCount} dari 5 bintang`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              className={`w-10 h-10 sm:w-12 sm:h-12 anim-star-pop ${
                n <= starCount
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200 fill-slate-200'
              }`}
            />
          ))}
        </div>

        <div>
          <p className="text-sm font-bold text-slate-600 mb-1">
            Hasil Evaluasi Belajar · {studentName}
          </p>
          <h2 className={`font-display text-2xl sm:text-4xl font-extrabold ${motivationTone}`}>
            {motivationTitle}
          </h2>
        </div>

        {/* 4 Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
            <p className="text-xs font-bold text-sky-800">Nilai Akhir</p>
            <p className="font-display text-3xl font-extrabold text-sky-700 tabular-nums mt-1">
              {finalScore}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <p className="text-xs font-bold text-emerald-800">Jawaban Benar</p>
            <p className="font-display text-3xl font-extrabold text-emerald-700 tabular-nums mt-1">
              {correctCount}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200">
            <p className="text-xs font-bold text-orange-800">Jawaban Salah</p>
            <p className="font-display text-3xl font-extrabold text-orange-700 tabular-nums mt-1">
              {wrongCount}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <p className="text-xs font-bold text-amber-800">Bintang</p>
            <p className="font-display text-3xl font-extrabold text-amber-600 tabular-nums mt-1">
              {starCount} / 5
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onGoToGames();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-display font-bold text-base transition-colors cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>ULANGI GAME</span>
          </button>

          <button
            type="button"
            onClick={handleRestartQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display font-bold text-base transition-colors cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>ULANGI KUIS</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onGoToMateri();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-base transition-colors cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>BELAJAR LAGI</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onGoHome();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-display font-bold text-base transition-colors cursor-pointer"
          >
            <Home className="w-5 h-5" />
            <span>KEMBALI KE BERANDA</span>
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
            onBackToMenu();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu</span>
        </button>

        <div className="flex items-center gap-4 text-sm font-bold text-slate-700 tabular-nums">
          <span>
            Soal {questionIdx + 1} dari {QUIZ_QUESTIONS.length}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-sky-700">Nilai Sementara: {correctCount * 10}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-600 transition-all duration-300"
          style={{ width: `${((questionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <LokoGuide
        message={
          !hasAnswered
            ? `Soal nomor ${questionIdx + 1}. Dengarkan atau baca soal dengan teliti ya, ${studentName}!`
            : isCurrentCorrect
              ? 'Hebat! Jawabanmu benar! Kamu mendapat 10 poin!'
              : `Hampir benar! ${currentQ.explanation}`
        }
        audioText={
          !hasAnswered
            ? `Soal nomor ${questionIdx + 1}. ${currentQ.question}`
            : undefined
        }
        mood={!hasAnswered ? 'explain' : isCurrentCorrect ? 'cheer' : 'encourage'}
      />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Supporting Illustration */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-sky-50 border border-sky-200">
            <MovementAnimation
              movement={currentQ.scene}
              character="kid"
              size="lg"
              showGroundLabel={false}
            />
          </div>

          {/* Question & A/B/C Buttons */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <p className="text-xs font-bold text-sky-700 mb-1">
                Kuis Evaluasi · Soal {currentQ.id}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {currentQ.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedKey === opt.key;
                const isRight = hasAnswered && opt.key === currentQ.correctKey;
                const isWrong = hasAnswered && isSelected && opt.key !== currentQ.correctKey;

                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleChooseOption(opt.key)}
                    disabled={hasAnswered}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border-2 text-left font-display font-bold text-lg sm:text-xl transition-colors cursor-pointer ${
                      isRight
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : isWrong
                          ? 'bg-red-50 border-red-400 text-red-900'
                          : 'bg-slate-50 border-slate-200 hover:border-sky-400 hover:bg-sky-50 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-extrabold shrink-0 ${
                          isRight
                            ? 'bg-emerald-600 text-white'
                            : isWrong
                              ? 'bg-red-600 text-white'
                              : 'bg-white border border-slate-300 text-slate-800'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </div>

                    {isRight && <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />}
                    {isWrong && <XCircle className="w-7 h-7 text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-sm sm:text-base font-semibold text-slate-800">
                  {currentQ.explanation}
                </p>
                <button
                  type="button"
                  onClick={handleNext}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-display font-bold text-base cursor-pointer"
                >
                  <span>
                    {questionIdx < QUIZ_QUESTIONS.length - 1
                      ? 'Soal Berikutnya'
                      : 'Lihat Nilai Akhir'}
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
