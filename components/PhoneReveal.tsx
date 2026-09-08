'use client';

import { Phone } from 'lucide-react';
import { useState } from 'react';

type PhoneRevealProps = {
  numbers: Array<{ href: string; number: string; label: string }>;
};

export function PhoneReveal({ numbers }: PhoneRevealProps) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return <div className="revealed-phones"><Phone size={18}/><div>{numbers.map(({href, number, label}) => <a key={href} href={href} aria-label={`Call ${label} at ${number}`}>{number}</a>)}</div></div>;
  }

  return <button className="phone-symbol" type="button" onClick={() => setRevealed(true)} aria-label="Reveal both phone numbers" title="Reveal phone numbers"><Phone size={20}/><span className="sr-only">Reveal both phone numbers</span></button>;
}
