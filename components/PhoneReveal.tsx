'use client';

import { Phone } from 'lucide-react';
import { useState } from 'react';

type PhoneRevealProps = {
  href: string;
  number: string;
  label: string;
};

export function PhoneReveal({ href, number, label }: PhoneRevealProps) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return <a className="revealed-phone" href={href} aria-label={`Call ${label} at ${number}`}><Phone size={16}/><span>{number}</span></a>;
  }

  return <button className="phone-symbol" type="button" onClick={() => setRevealed(true)} aria-label={`Reveal ${label}`} title={`Reveal ${label}`}><Phone size={20}/><span className="sr-only">Reveal {label}</span></button>;
}
