import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Banknote } from 'lucide-react';
import { Language } from '../types';
import { t } from '../data/translations';

interface TrustBadgesProps {
  lang: Language;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ lang }) => {
  const currentT = t[lang];

  const badges = [
    {
      icon: Banknote,
      title: currentT.codTitle,
      desc: currentT.codDesc,
    },
    {
      icon: Truck,
      title: currentT.fastDeliveryTitle,
      desc: currentT.fastDeliveryDesc,
    },
    {
      icon: RotateCcw,
      title: currentT.easyReturnTitle,
      desc: currentT.easyReturnDesc,
    },
    {
      icon: ShieldCheck,
      title: currentT.authenticTitle,
      desc: currentT.authenticDesc,
    },
  ];

  return (
    <section className="border-y border-slate-200/80 bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3 sm:p-4 rounded-xl bg-slate-50/70 border border-slate-100 transition-all hover:bg-slate-50"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-900/10 text-blue-900 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
