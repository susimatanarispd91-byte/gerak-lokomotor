import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, ArrowRight, ShieldCheck, Volume2, CheckCircle2 } from 'lucide-react';
import { PRACTICE_STEPS } from '../data/learningData';
import { MovementAnimation } from './MovementAnimation';
import { LokoGuide } from './LokoGuide';
import { soundEngine } from '../utils/audio';

interface PracticeSectionProps {
  onBackToMenu: () => void;
  onGoToGames: () => void;
  onCompletePractice: () => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  onBackToMenu,
  onGoToGames,
  onCompletePractice,
}) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [isPracticing, setIsPracticing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(PRACTICE_STEPS[0].durationSeconds);
  const [stepDone, setStepDone] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const currentStep = PRACTICE_STEPS[stepIdx];

  useEffect(() => {
    if (!isPracticing) return;
    if (timeLeft <= 0) {
      setIsPracticing(false);
      setStepDone(true);
      soundEngine.playSuccess();
      soundEngine.speak('Hebat! Kamu berhasil mempraktikkan gerakan ini!');
      if (stepIdx === PRACTICE_STEPS.length - 1) {
        onCompletePractice();
      }
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [isPracticing, timeLeft, stepIdx, onCompletePractice]);

  const handleStartPractice = () => {
    soundEngine.playClick();
    setStepDone(false);
    setTimeLeft(currentStep.durationSeconds);
    setIsPracticing(true);
    soundEngine.speak(currentStep.audioInstruction);
  };

  const handleRepeat = () => {
    soundEngine.playClick();
    setStepDone(false);
    setTimeLeft(currentStep.durationSeconds);
    setIsPracticing(true);
    soundEngine.speak(currentStep.audioInstruction);
  };

  const handleNext = () => {
    soundEngine.playClick();
    soundEngine.stopSpeech();
    if (stepIdx < PRACTICE_STEPS.length - 1) {
      const nextIdx = stepIdx + 1;
      setStepIdx(nextIdx);
      setIsPracticing(false);
      setStepDone(false);
      setTimeLeft(PRACTICE_STEPS[nextIdx].durationSeconds);
    } else {
      onCompletePractice();
      setAllDone(true);
      soundEngine.playFanfare();
      soundEngine.speak('Luar biasa! Kamu sudah selesai praktik semua gerak lokomotor bersama LOKO!');
    }
  };

  if (allDone) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-10 text-center shadow-sm max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-11 h-11" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            Hebat! Praktik Selesai!
          </h2>
          <p className="text-lg text-slate-700 mb-8">
            Kamu sudah menirukan 5 gerakan lokomotor bersama kelinci LOKO. Tubuh jadi sehat dan bugar! Sekarang ayo bermain game edukasi!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setStepIdx(0);
                setAllDone(false);
                setIsPracticing(false);
                setStepDone(false);
                setTimeLeft(PRACTICE_STEPS[0].durationSeconds);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-display font-bold text-base transition-colors cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Ulangi Praktik</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onGoToGames();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-display font-bold text-lg transition-colors cursor-pointer"
            >
              <span>Main Game Edukasi</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round(
    ((currentStep.durationSeconds - timeLeft) / currentStep.durationSeconds) * 100
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            soundEngine.stopSpeech();
            setIsPracticing(false);
            onBackToMenu();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu</span>
        </button>

        <div className="text-sm font-bold text-slate-700 tabular-nums">
          Gerakan {currentStep.stepNumber} dari {PRACTICE_STEPS.length}
        </div>
      </div>

      {/* Safety Banner */}
      <div className="flex items-start sm:items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
        <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-sm sm:text-base font-medium">
          <strong>Pesan Keselamatan:</strong> Lakukan di tempat yang aman, lantai tidak licin, ruang gerak cukup, dan ikuti arahan Bapak/Ibu Guru.
        </p>
      </div>

      <LokoGuide
        message={currentStep.command}
        audioText={currentStep.audioInstruction}
        mood={stepDone ? 'cheer' : 'explain'}
      />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* LOKO Demonstration Stage */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-sky-50 border border-sky-200">
            <p className="text-xs font-bold text-sky-800 mb-2">
              Contoh Gerakan Kelinci LOKO
            </p>
            <MovementAnimation movement={currentStep.id} character="loko" size="lg" />
          </div>

          {/* Controls & Timer */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <p className="text-sm font-bold text-emerald-700 mb-1">
                Ayo Tirukan Gerakan Ini
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                {currentStep.command}
              </h2>
              <p className="mt-2 text-base text-slate-600">
                {currentStep.safetyNote}
              </p>
            </div>

            {/* Visual Timer Bar */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-base font-bold text-slate-900">
                <span>
                  {stepDone
                    ? 'Selesai! Bagus sekali!'
                    : isPracticing
                      ? 'Sedang Praktik... Ayo Bergerak!'
                      : 'Siap untuk bergerak?'}
                </span>
                <span className="tabular-nums text-sky-700 text-xl">
                  {timeLeft} detik
                </span>
              </div>
              <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    stepDone ? 'bg-emerald-500' : 'bg-sky-500'
                  }`}
                  style={{ width: `${stepDone ? 100 : progressPercent}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleStartPractice}
                disabled={isPracticing}
                className={`inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-display font-bold text-base transition-colors cursor-pointer ${
                  isPracticing
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <Play className="w-5 h-5" />
                <span>MULAI PRAKTIK</span>
              </button>

              <button
                type="button"
                onClick={handleRepeat}
                className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-display font-bold text-base transition-colors cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>ULANGI</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  soundEngine.speak(currentStep.audioInstruction);
                }}
                aria-label="Putar instruksi suara"
                className="inline-flex items-center gap-2 px-4 py-4 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-base transition-colors cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>Suara</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display font-bold text-base transition-colors cursor-pointer ml-auto"
              >
                <span>LANJUTKAN</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
