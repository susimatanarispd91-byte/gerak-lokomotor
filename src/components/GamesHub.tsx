import React, { useState } from 'react';
import { ArrowLeft, Star, Play, Image, Layers, Link2, Map } from 'lucide-react';
import { LokoGuide } from './LokoGuide';
import { GameTebakGambar } from './games/GameTebakGambar';
import { GameKelompokkan } from './games/GameKelompokkan';
import { GamePasangkan } from './games/GamePasangkan';
import { GamePetualanganLoko } from './games/GamePetualanganLoko';
import { soundEngine } from '../utils/audio';

export type GameKey = 'tebak' | 'kelompok' | 'pasang' | 'petualangan';

interface GamesHubProps {
  gameStars: Record<GameKey, number>;
  onEarnStars: (game: GameKey, stars: number) => void;
  onBackToMenu: () => void;
  onGoToQuiz: () => void;
}

const GAME_CARDS: {
  key: GameKey;
  numberLabel: string;
  title: string;
  subtitle: string;
  description: string;
  accentBg: string;
  accentText: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  {
    key: 'tebak',
    numberLabel: 'Game 1',
    title: 'GERAKAN APA INI?',
    subtitle: 'Tebak Gambar',
    description: 'Lihat animasi gerakannya, lalu pilih nama gerakan yang benar (A, B, atau C).',
    accentBg: 'bg-sky-600',
    accentText: 'text-sky-700',
    icon: Image,
  },
  {
    key: 'kelompok',
    numberLabel: 'Game 2',
    title: 'AYO KELOMPOKKAN!',
    subtitle: 'Kelompokkan Gerakan',
    description: 'Masukkan 8 kartu gambar gerakan ke dalam 5 kotak kategori yang tepat.',
    accentBg: 'bg-emerald-600',
    accentText: 'text-emerald-700',
    icon: Layers,
  },
  {
    key: 'pasang',
    numberLabel: 'Game 3',
    title: 'PASANGKAN GAMBAR!',
    subtitle: 'Pasangkan Gerakanku',
    description: 'Cocokkan gambar gerakan di sebelah kiri dengan nama gerakan di sebelah kanan.',
    accentBg: 'bg-orange-500',
    accentText: 'text-orange-700',
    icon: Link2,
  },
  {
    key: 'petualangan',
    numberLabel: 'Game 4',
    title: 'BANTU LOKO KE FINISH!',
    subtitle: 'Petualangan Kelinci LOKO',
    description: 'Jawab 5 tantangan seru di taman bermain untuk mengantar LOKO sampai garis Finish.',
    accentBg: 'bg-amber-500',
    accentText: 'text-amber-700',
    icon: Map,
  },
];

export const GamesHub: React.FC<GamesHubProps> = ({
  gameStars,
  onEarnStars,
  onBackToMenu,
  onGoToQuiz,
}) => {
  const [activeGame, setActiveGame] = useState<GameKey | null>(null);

  if (activeGame === 'tebak') {
    return (
      <GameTebakGambar
        onBack={() => setActiveGame(null)}
        onComplete={(stars) => onEarnStars('tebak', stars)}
      />
    );
  }

  if (activeGame === 'kelompok') {
    return (
      <GameKelompokkan
        onBack={() => setActiveGame(null)}
        onComplete={(stars) => onEarnStars('kelompok', stars)}
      />
    );
  }

  if (activeGame === 'pasang') {
    return (
      <GamePasangkan
        onBack={() => setActiveGame(null)}
        onComplete={(stars) => onEarnStars('pasang', stars)}
      />
    );
  }

  if (activeGame === 'petualangan') {
    return (
      <GamePetualanganLoko
        onBack={() => setActiveGame(null)}
        onComplete={(stars) => onEarnStars('petualangan', stars)}
      />
    );
  }

  const totalStars =
    gameStars.tebak + gameStars.kelompok + gameStars.pasang + gameStars.petualangan;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onBackToMenu();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu</span>
        </button>

        <div className="inline-flex items-center gap-2 text-base font-bold text-slate-800 tabular-nums">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>Total Bintang Game: {totalStars} / 12</span>
        </div>
      </div>

      <LokoGuide
        message="Pilih salah satu game di bawah ini untuk bermain sambil belajar gerak lokomotor!"
        audioText="Ayo bermain game edukasi bersama kelinci LOKO! Ada empat permainan seru yang bisa kamu mainkan!"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GAME_CARDS.map((card) => {
          const Icon = card.icon;
          const stars = gameStars[card.key];
          return (
            <div
              key={card.key}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-sky-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${card.accentBg} text-white flex items-center justify-center shrink-0`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="flex items-center gap-1" aria-label={`${stars} dari 3 bintang`}>
                    {[1, 2, 3].map((n) => (
                      <Star
                        key={n}
                        className={`w-6 h-6 ${
                          n <= stars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200 fill-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className={`text-xs font-bold ${card.accentText} mb-1`}>
                  {card.numberLabel} · {card.subtitle}
                </p>
                <h3 className="font-display text-2xl font-extrabold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setActiveGame(card.key);
                }}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl ${card.accentBg} hover:opacity-95 text-white font-display font-bold text-lg transition-opacity cursor-pointer`}
              >
                <Play className="w-5 h-5" />
                <span>Mainkan Game</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-sky-50 border border-sky-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-extrabold text-slate-900">
            Sudah siap menguji kemampuanmu?
          </h3>
          <p className="text-base text-slate-700">
            Ayo kerjakan Kuis Evaluasi 10 soal untuk mendapatkan piala dan bintang!
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onGoToQuiz();
          }}
          className="shrink-0 px-7 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display font-bold text-base transition-colors cursor-pointer"
        >
          Buka Kuis Evaluasi
        </button>
      </div>
    </div>
  );
};
