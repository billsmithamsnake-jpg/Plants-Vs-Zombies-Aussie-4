import React, { useEffect } from 'react';
import { soundFx } from '../utils/audio';

interface AcknowledgementOfCountryModalProps {
  onClose: () => void;
}

export const AcknowledgementOfCountryModal: React.FC<AcknowledgementOfCountryModalProps> = ({
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950 border-4 border-amber-600/90 rounded-3xl shadow-2xl p-6 sm:p-8 text-stone-200 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cultural emblem / decorative ribbon */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-4 h-4 rounded-full bg-stone-950 border border-amber-400/50 shadow" title="First Nations homage" />
          <span className="w-5 h-5 rounded-full bg-yellow-400 shadow-md ring-2 ring-yellow-500/50" />
          <span className="w-4 h-4 rounded-full bg-red-700 border border-amber-400/50 shadow" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-amber-300 uppercase tracking-wider mb-1 drop-shadow">
          Acknowledgement of Country
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-amber-500 tracking-widest uppercase mb-6">
          Always Was, Always Will Be
        </p>

        {/* Decorative divider */}
        <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6 opacity-70" />

        <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed font-sans text-center max-w-lg">
          <p>
            We acknowledge the <strong className="text-amber-200 font-bold">Traditional Custodians</strong> of the lands, waters, skies, and communities across Australia upon which we live, learn, play, and create.
          </p>
          <p>
            We pay our deepest respects to Elders past, present, and emerging, and extend that respect to all Aboriginal and Torres Strait Islander peoples.
          </p>
          <p className="text-xs sm:text-sm text-stone-400 italic pt-1 border-t border-amber-900/60">
            In celebrating the unique native flora, fauna, and outback landscapes featured in this game, we honour over 65,000 years of continuous culture, custodianship, and care for Country. Sovereignty was never ceded.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-8 w-full max-w-xs">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-full py-3 bg-gradient-to-b from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 border-2 border-amber-400/80 rounded-2xl text-white font-black text-base uppercase tracking-wider shadow-xl transition active:scale-95 cursor-pointer"
          >
            Respect & Close
          </button>
        </div>
      </div>
    </div>
  );
};
