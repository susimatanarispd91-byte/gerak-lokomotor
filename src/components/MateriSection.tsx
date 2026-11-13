import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Volume2, CheckCircle2, BookOpen } from 'lucide-react';
import { MOVEMENTS, MovementId } from '../data/learningData';
import { MovementAnimation } from './MovementAnimation';
import { LokoGuide } from './LokoGuide';
import { soundEngine } from '../utils/audio';

interface MateriSectionProps {
  onBackToMenu: () => void;
  onGoToPractice: () => void;
  onCompleteMateri: () => void;
}

const DAILY_EXAMPLES: { id: MovementId; label: string; sentence: string }[] = [
  { id: 'berjalan', label: 'Berjalan', sentence: 'Berjalan menuju sekolah di pagi hari.' },
  { id: 'berlari', label: 'Berlari', sentence: 'Berlari saat bermain kejar-kejaran.' },
  { id: 'melompat', label: 'Melompat', sentence: 'Melompat melewati garis di lapangan.' },
  { id: 'meloncat', label: 'Meloncat', sentence: 'Meloncat riang seperti kelinci LOKO.' },
  { id: 'berjingkat', label: 'Berjingkat', sentence: 'Berjingkat pelan seperti penari.' },
];

export const MateriSection: React.FC<MateriSectionProps> = ({
  onBackToMenu,
  onGoToPractice,
  onCompleteMateri,
}) => {
  const [tab, setTab] = useState<'pengertian' | 'macam'>('pengertian');
  const [selectedExample, setSelectedExample] = useState<MovementId>('berjalan');
  const [activeMovementIdx, setActiveMovementIdx] = useState(0);
  const [listenedIds, setListenedIds] = useState<string[]>([]);

  const activeMovement = MOVEMENTS[activeMovementIdx];

  const handleListenMovement = (id: string, script: string) => {
    soundEngine.playClick();
    soundEngine.speak(script);
    if (!listenedIds.includes(id)) {
      const next = [...listenedIds, id];
      setListenedIds(next);
      if (next.length >= 3) {
        onCompleteMateri();
      }
    }
  };

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
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu</span>
        </button>

        {/* Segmented Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/75 rounded-xl">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setTab('pengertian');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
              tab === 'pengertian'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Materi 1: Pengertian
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setTab('macam');
              onCompleteMateri();
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
              tab === 'macam'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Materi 2: Macam-Macam Gerak
          </button>
        </div>
      </div>

      {tab === 'pengertian' ? (
        <div className="space-y-6">
          <LokoGuide
            message="Gerak lokomotor adalah gerakan tubuh yang membuat kita berpindah tempat!"
            audioText="Halo teman-teman! Ayo kita belajar! Gerak lokomotor adalah gerakan tubuh yang membuat kita berpindah tempat. Ketuk gambar gerakan di bawah untuk melihat contohnya!"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Stage: Interactive Animated Demo */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col items-center justify-between text-center shadow-sm">
              <div className="w-full flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-sky-700">
                  Peragaan Gerakan
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const item = DAILY_EXAMPLES.find((d) => d.id === selectedExample)!;
                    handleListenMovement(item.id, `${item.label}. ${item.sentence}`);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-sm transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dengar Contoh</span>
                </button>
              </div>

              <div className="my-2">
                <MovementAnimation movement={selectedExample} character="kid" size="lg" />
              </div>

              <div className="mt-4 max-w-md">
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {DAILY_EXAMPLES.find((d) => d.id === selectedExample)?.label}
                </h2>
                <p className="mt-2 text-lg font-medium text-slate-700">
                  {DAILY_EXAMPLES.find((d) => d.id === selectedExample)?.sentence}
                </p>
              </div>
            </div>

            {/* Right Control Deck: Explanation & 5 Everyday Examples */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-sky-700 font-bold text-sm mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Apa itu Gerak Lokomotor?</span>
                </div>
                <h3 className="font-display text-2xl font-extrabold text-slate-900 leading-tight mb-3">
                  Tubuh Bergerak dan Berpindah Tempat
                </h3>
                <p className="text-base text-slate-700 leading-relaxed mb-5">
                  Jika kamu bergerak dari satu tempat ke tempat lain, itu disebut{' '}
                  <strong className="text-sky-700">gerak lokomotor</strong>. Ayo pilih contohnya di bawah ini:
                </p>

                <div className="space-y-2.5">
                  {DAILY_EXAMPLES.map((item) => {
                    const isSelected = selectedExample === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedExample(item.id);
                        }}
                        className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50 border-sky-500 text-slate-900'
                            : 'bg-slate-50 border-slate-200 hover:border-sky-300 text-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-display font-bold text-base text-slate-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-slate-600">{item.sentence}</p>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setTab('macam');
                  onCompleteMateri();
                }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-lg transition-colors cursor-pointer"
              >
                <span>Lanjut ke Materi 2</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <LokoGuide
            message="Ada 5 gerak lokomotor utama dan 1 gerakan pengayaan. Ketuk setiap gerakan untuk melihat dan mendengar penjelasannya!"
            audioText="Ayo mengenal macam-macam gerak lokomotor! Ada berjalan, berlari, melompat, meloncat, berjingkat, dan materi pengayaan berderap."
          />

          {/* Selector Strip for all 6 movements */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {MOVEMENTS.map((m, idx) => {
              const isActive = idx === activeMovementIdx;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveMovementIdx(idx);
                    onCompleteMateri();
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-sky-600 border-sky-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 hover:border-sky-300 text-slate-900'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-1 ${
                      isActive ? 'text-sky-100' : 'text-slate-500'
                    }`}
                  >
                    {m.badgeText}
                  </p>
                  <p className="font-display font-bold text-lg truncate">{m.name}</p>
                </button>
              );
            })}
          </div>

          {/* Detail Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-200">
                <MovementAnimation
                  movement={activeMovement.id}
                  character={activeMovement.id === 'meloncat' ? 'loko' : 'kid'}
                  size="lg"
                />
              </div>

              <div className="md:col-span-7 space-y-5">
                <div>
                  <p className="text-sm font-bold text-sky-700 mb-1">
                    {activeMovement.badgeText}
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                    {activeMovement.name}
                  </h2>
                </div>

                <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200">
                  <p className="text-xs font-bold text-sky-800 mb-1">Penjelasan</p>
                  <p className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
                    {activeMovement.shortDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <p className="text-xs font-bold text-emerald-800 mb-1">
                      Contoh Sehari-hari
                    </p>
                    <p className="text-base font-medium text-slate-800">
                      {activeMovement.dailyExample}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <p className="text-xs font-bold text-amber-800 mb-1">
                      Tips Aman LOKO
                    </p>
                    <p className="text-base font-medium text-slate-800">
                      {activeMovement.tip}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleListenMovement(activeMovement.id, activeMovement.audioScript)
                    }
                    className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display font-bold text-base transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>Dengarkan Penjelasan</span>
                  </button>

                  {activeMovementIdx < MOVEMENTS.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setActiveMovementIdx((prev) => prev + 1);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-display font-bold text-base transition-colors cursor-pointer"
                    >
                      <span>Gerakan Berikutnya</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        soundEngine.stopSpeech();
                        onGoToPractice();
                      }}
                      className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-base transition-colors cursor-pointer"
                    >
                      <span>Ayo Praktik Bergerak!</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
