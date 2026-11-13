import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  Gamepad2,
  Award,
  Volume2,
  Star,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';
import { soundEngine } from './utils/audio';
import {
  HERO_PLAYGROUND_PATH,
  LOKO_IMAGE_PATH,
  LokoGuide,
} from './components/LokoGuide';
import { AudioSettingsModal } from './components/AudioSettingsModal';
import { MateriSection } from './components/MateriSection';
import { PracticeSection } from './components/PracticeSection';
import { GamesHub, GameKey } from './components/GamesHub';
import { QuizSection } from './components/QuizSection';

type PageView = 'beranda' | 'menu' | 'materi' | 'praktik' | 'game' | 'kuis';

export default function App() {
  const [page, setPage] = useState<PageView>('beranda');
  const [studentNameInput, setStudentNameInput] = useState('');
  const [studentName, setStudentName] = useState('Teman LOKO');

  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [audioModalOpen, setAudioModalOpen] = useState(false);

  const [materiDone, setMateriDone] = useState(false);
  const [practiceDone, setPracticeDone] = useState(false);
  const [gameStars, setGameStars] = useState<Record<GameKey, number>>({
    tebak: 0,
    kelompok: 0,
    pasang: 0,
    petualangan: 0,
  });
  const [lastQuizScore, setLastQuizScore] = useState<number | null>(null);

  const [heroImgErr, setHeroImgErr] = useState(false);
  const [lokoImgErr, setLokoImgErr] = useState(false);

  const navigateTo = (target: PageView) => {
    soundEngine.playClick();
    soundEngine.stopSpeech();
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = studentNameInput.trim();
    const finalName = cleaned.length > 0 ? cleaned : 'Teman LOKO';
    setStudentName(finalName);
    soundEngine.playSuccess();
    soundEngine.speak(
      `Halo ${finalName}! Selamat datang di Petualangan Gerak Lokomotor! Ayo belajar dan bermain bersama kelinci LOKO!`
    );
    setPage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSfx = () => {
    const next = !sfxEnabled;
    setSfxEnabled(next);
    soundEngine.setSfxEnabled(next);
    if (next) {
      soundEngine.playClick();
    }
  };

  const handleToggleMusic = () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    soundEngine.setMusicEnabled(next);
    if (sfxEnabled) {
      soundEngine.playClick();
    }
  };

  const handleEarnStars = (game: GameKey, stars: number) => {
    setGameStars((prev) => ({
      ...prev,
      [game]: Math.max(prev[game], stars),
    }));
  };

  const totalStars =
    gameStars.tebak + gameStars.kelompok + gameStars.pasang + gameStars.petualangan;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6FAFD] text-slate-900">
      {/* Three-Zone Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark */}
          <button
            type="button"
            onClick={() => navigateTo('beranda')}
            className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-sky-700 hover:text-sky-800 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Petualangan LOKO
          </button>

          {/* Zone 2: Concise single-line nav links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600"
          >
            <button
              type="button"
              onClick={() => navigateTo('menu')}
              className={`hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                page === 'menu' ? 'text-sky-700 underline underline-offset-4' : ''
              }`}
            >
              Menu Utama
            </button>
            <button
              type="button"
              onClick={() => navigateTo('materi')}
              className={`hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                page === 'materi' ? 'text-sky-700 underline underline-offset-4' : ''
              }`}
            >
              Materi
            </button>
            <button
              type="button"
              onClick={() => navigateTo('praktik')}
              className={`hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                page === 'praktik' ? 'text-sky-700 underline underline-offset-4' : ''
              }`}
            >
              Praktik
            </button>
            <button
              type="button"
              onClick={() => navigateTo('game')}
              className={`hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                page === 'game' ? 'text-sky-700 underline underline-offset-4' : ''
              }`}
            >
              Game
            </button>
            <button
              type="button"
              onClick={() => navigateTo('kuis')}
              className={`hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                page === 'kuis' ? 'text-sky-700 underline underline-offset-4' : ''
              }`}
            >
              Kuis
            </button>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setAudioModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Pengaturan Suara</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {page === 'beranda' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              {/* Left Column: Title, LOKO Greeting, Student Name Input & CTA */}
              <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div className="space-y-5">
                  <div className="text-sm font-bold text-sky-700 flex flex-wrap items-center gap-2">
                    <span>PJOK</span>
                    <span aria-hidden="true">·</span>
                    <span>Kelas 1 SD</span>
                    <span aria-hidden="true">·</span>
                    <span>Game Interaktif</span>
                  </div>

                  <div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-[1.12] tracking-tight">
                      PETUALANGAN GERAK LOKOMOTOR
                    </h1>
                    <p className="mt-3 font-display text-xl sm:text-2xl font-bold text-orange-600">
                      Ayo Bergerak, Ayo Bermain!
                    </p>
                  </div>

                  {/* LOKO Mascot Greeting */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-sky-50 border border-sky-200">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border border-sky-200 shrink-0 flex items-center justify-center">
                      {!lokoImgErr ? (
                        <img
                          src={LOKO_IMAGE_PATH}
                          alt="Kelinci LOKO"
                          referrerPolicy="no-referrer"
                          onError={() => setLokoImgErr(true)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-display font-extrabold text-sky-700 text-lg">
                          LOKO
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-display font-bold text-slate-900 text-base sm:text-lg">
                        “Halo teman-teman! Aku LOKO!”
                      </p>
                      <p className="text-sm sm:text-base text-slate-700 mt-0.5">
                        Ayo belajar berjalan, berlari, melompat, meloncat, dan berjingkat bersama!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Student Name Form + Start & Sound Settings */}
                <form onSubmit={handleStartLearning} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="student-name"
                      className="block font-display font-bold text-base text-slate-900 mb-2"
                    >
                      Siapa namamu?
                    </label>
                    <input
                      id="student-name"
                      type="text"
                      value={studentNameInput}
                      onChange={(e) => setStudentNameInput(e.target.value)}
                      placeholder="Tulis namamu di sini..."
                      maxLength={30}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-300 focus:border-sky-500 focus:outline-none text-lg font-semibold text-slate-900 bg-slate-50"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-extrabold text-lg transition-colors cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      <span>MULAI BELAJAR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setAudioModalOpen(true);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-display font-bold text-base transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="w-5 h-5" />
                      <span>PENGATURAN SUARA</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Playground Kids Illustration */}
              <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-slate-200 bg-sky-100 flex flex-col shadow-sm">
                <div className="flex-1 min-h-[280px] relative">
                  {!heroImgErr ? (
                    <img
                      src={HERO_PLAYGROUND_PATH}
                      alt="Anak-anak SD berolahraga di taman bermain sekolah"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgErr(true)}
                      className="w-full h-full lg:h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-8 text-center bg-gradient-to-br from-sky-100 to-emerald-100">
                      <p className="font-display font-bold text-xl text-sky-900">
                        Taman Bermain & Lapangan Olahraga Kelas 1 SD
                      </p>
                    </div>
                  )}
                </div>
                <div className="bg-white p-5 border-t border-slate-200">
                  <p className="font-display font-bold text-base text-slate-900">
                    Belajar Sambil Bermain di Taman Olahraga
                  </p>
                  <p className="text-sm text-slate-600 mt-0.5">
                    Materi bergambar, suara bahasa Indonesia, praktik gerak, 4 game seru, dan kuis berhadiah bintang.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 'menu' && (
          <div className="space-y-6">
            <LokoGuide
              message={`Halo ${studentName}! Ayo pilih kegiatan belajar yang kamu suka hari ini!`}
              audioText={`Halo ${studentName}! Ayo pilih kegiatan belajar yang kamu suka hari ini! Kamu bisa mulai dari Materi Belajar!`}
            />

            {/* Session Progress Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Materi Belajar</p>
                  <p className="font-display font-extrabold text-lg text-slate-900 mt-0.5">
                    {materiDone ? 'Sudah Dipelajari' : 'Belum Selesai'}
                  </p>
                </div>
                <CheckCircle2
                  className={`w-7 h-7 ${materiDone ? 'text-emerald-600' : 'text-slate-300'}`}
                />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Praktik Gerak</p>
                  <p className="font-display font-extrabold text-lg text-slate-900 mt-0.5">
                    {practiceDone ? 'Sudah Praktik' : 'Ayo Coba!'}
                  </p>
                </div>
                <CheckCircle2
                  className={`w-7 h-7 ${practiceDone ? 'text-emerald-600' : 'text-slate-300'}`}
                />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Bintang Game</p>
                  <p className="font-display font-extrabold text-lg text-slate-900 tabular-nums mt-0.5">
                    {totalStars} / 12
                  </p>
                </div>
                <Star className="w-7 h-7 text-amber-400 fill-amber-400" />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Nilai Kuis</p>
                  <p className="font-display font-extrabold text-lg text-slate-900 tabular-nums mt-0.5">
                    {lastQuizScore !== null ? `${lastQuizScore} / 100` : 'Belum Ujian'}
                  </p>
                </div>
                <Award className="w-7 h-7 text-sky-600" />
              </div>
            </div>

            {/* 4 Big Friendly Menu Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => navigateTo('materi')}
                className="text-left bg-white rounded-3xl border-2 border-sky-200 hover:border-sky-500 p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-sm cursor-pointer group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center mb-4">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-bold text-sky-700 mb-1">Langkah 1 · Materi</p>
                  <h2 className="font-display text-2xl font-extrabold text-slate-900 mb-2">
                    Materi Gerak Lokomotor
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Pelajari pengertian gerak lokomotor dan 6 contoh gerakan dengan animasi serta suara LOKO.
                  </p>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 font-display font-bold text-sky-700 group-hover:translate-x-1 transition-transform">
                  <span>Buka Materi</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('praktik')}
                className="text-left bg-white rounded-3xl border-2 border-emerald-200 hover:border-emerald-500 p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-sm cursor-pointer group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                    <Play className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-bold text-emerald-700 mb-1">Langkah 2 · Praktik</p>
                  <h2 className="font-display text-2xl font-extrabold text-slate-900 mb-2">
                    Ayo Praktik Bergerak!
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Berdiri di tempat aman dan tirukan gerakan berjalan, berlari, melompat, meloncat, dan berjingkat bersama LOKO.
                  </p>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 font-display font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                  <span>Mulai Praktik</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('game')}
                className="text-left bg-white rounded-3xl border-2 border-orange-200 hover:border-orange-500 p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-sm cursor-pointer group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-4">
                    <Gamepad2 className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-bold text-orange-700 mb-1">Langkah 3 · Bermain</p>
                  <h2 className="font-display text-2xl font-extrabold text-slate-900 mb-2">
                    4 Game Edukasi Seru
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Mainkan Tebak Gambar, Kelompokkan Gerakan, Pasangkan Gambar, dan Petualangan Kelinci LOKO.
                  </p>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 font-display font-bold text-orange-700 group-hover:translate-x-1 transition-transform">
                  <span>Mainkan Game</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('kuis')}
                className="text-left bg-white rounded-3xl border-2 border-amber-200 hover:border-amber-500 p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-sm cursor-pointer group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-4">
                    <Award className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-bold text-amber-700 mb-1">Langkah 4 · Evaluasi</p>
                  <h2 className="font-display text-2xl font-extrabold text-slate-900 mb-2">
                    Kuis Evaluasi & Piala
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Jawab 10 soal pilihan ganda dan kumpulkan bintang serta piala juara gerak lokomotor!
                  </p>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 font-display font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
                  <span>Mulai Kuis</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </div>
          </div>
        )}

        {page === 'materi' && (
          <MateriSection
            onBackToMenu={() => navigateTo('menu')}
            onGoToPractice={() => navigateTo('praktik')}
            onCompleteMateri={() => setMateriDone(true)}
          />
        )}

        {page === 'praktik' && (
          <PracticeSection
            onBackToMenu={() => navigateTo('menu')}
            onGoToGames={() => navigateTo('game')}
            onCompletePractice={() => setPracticeDone(true)}
          />
        )}

        {page === 'game' && (
          <GamesHub
            gameStars={gameStars}
            onEarnStars={handleEarnStars}
            onBackToMenu={() => navigateTo('menu')}
            onGoToQuiz={() => navigateTo('kuis')}
          />
        )}

        {page === 'kuis' && (
          <QuizSection
            studentName={studentName}
            onSaveScore={(score) => setLastQuizScore(score)}
            onBackToMenu={() => navigateTo('menu')}
            onGoToMateri={() => navigateTo('materi')}
            onGoToGames={() => navigateTo('game')}
            onGoHome={() => navigateTo('beranda')}
          />
        )}
      </main>

      {/* Mobile Compact Bottom Navigation (only on small screens when past Beranda, keeps <=15% height) */}
      {page !== 'beranda' && (
        <nav
          aria-label="Navigasi seluler"
          className="md:hidden sticky bottom-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 grid grid-cols-5 gap-1"
        >
          {(
            [
              { id: 'menu', label: 'Menu' },
              { id: 'materi', label: 'Materi' },
              { id: 'praktik', label: 'Praktik' },
              { id: 'game', label: 'Game' },
              { id: 'kuis', label: 'Kuis' },
            ] as { id: PageView; label: string }[]
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateTo(item.id)}
              className={`py-2 px-1 rounded-xl text-xs font-bold text-center whitespace-nowrap cursor-pointer ${
                page === item.id
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}

      <AudioSettingsModal
        isOpen={audioModalOpen}
        onClose={() => setAudioModalOpen(false)}
        sfxEnabled={sfxEnabled}
        musicEnabled={musicEnabled}
        onToggleSfx={handleToggleSfx}
        onToggleMusic={handleToggleMusic}
      />
    </div>
  );
}
