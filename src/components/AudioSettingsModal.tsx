import React from 'react';
import { Volume2, VolumeX, Music, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sfxEnabled: boolean;
  musicEnabled: boolean;
  onToggleSfx: () => void;
  onToggleMusic: () => void;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
  sfxEnabled,
  musicEnabled,
  onToggleSfx,
  onToggleMusic,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="audio-modal-title"
    >
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 id="audio-modal-title" className="font-display text-2xl font-bold text-slate-900">
            Pengaturan Suara
          </h2>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            aria-label="Tutup pengaturan suara"
            className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-sky-50 border border-sky-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                {sfxEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </div>
              <div>
                <p className="font-display font-bold text-slate-900 text-base">
                  Suara LOKO & Efek Tombol
                </p>
                <p className="text-sm text-slate-600">
                  Suara penjelasan bahasa Indonesia & bunyi tombol
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleSfx}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sfxEnabled
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {sfxEnabled ? 'AKTIF' : 'MATI'}
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-900 text-base">
                  Musik Latar Ceria
                </p>
                <p className="text-sm text-slate-600">
                  Alunan nada ceria saat bermain dan belajar
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleMusic}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                musicEnabled
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {musicEnabled ? 'AKTIF' : 'MATI'}
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base transition-colors cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
