'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Download, FileText, X } from 'lucide-react';
import './resume-preview.css';

const resumeUrl = '/Krishnendu-Majumder-CV.pdf?v=fa3dd5eb';

export function ResumePreview() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const closeFromBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog?.close();
    };
    dialog?.addEventListener('click', closeFromBackdrop);
    return () => {
      dialog?.removeEventListener('click', closeFromBackdrop);
      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current;
      }
    };
  }, []);

  const restorePage = () => {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    setIsOpen(false);
  };

  return <>
    <a className="text-link" href={resumeUrl} target="_blank" rel="noreferrer"
      aria-haspopup="dialog" aria-controls="resume-preview" onClick={(event) => {
        if (!dialogRef.current || dialogRef.current.open) return;
        event.preventDefault();
        dialogRef.current.showModal();
        previousOverflow.current = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        setIsOpen(true);
      }}>View résumé <FileText size={17} aria-hidden="true"/></a>

    <dialog ref={dialogRef} id="resume-preview" className="resume-preview-dialog"
      aria-labelledby="resume-preview-title" aria-describedby="resume-preview-description"
      onClose={restorePage}>
      <div className="resume-preview-shell">
        <div className="resume-preview-toolbar">
          <div className="resume-preview-heading">
            <span>KRISHNENDU MAJUMDER</span>
            <h2 id="resume-preview-title">Résumé</h2>
          </div>
          <div className="resume-preview-actions">
            <a className="resume-download" href={resumeUrl} download="Krishnendu-Majumder-CV.pdf">
              <Download size={17} aria-hidden="true"/> Download résumé
            </a>
            <button className="resume-close" type="button" autoFocus
              aria-label="Close résumé preview" onClick={() => dialogRef.current?.close()}>
              <X size={21} aria-hidden="true"/>
            </button>
          </div>
        </div>
        {/* Keyboard focus allows arrow/Page Down scrolling within the document. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <section className="resume-preview-document" tabIndex={0} aria-label="Résumé document preview">
          {isOpen && <Image src="/resume-preview.png?v=fa3dd5eb" width={1273} height={1800} unoptimized
            alt="Krishnendu Majumder’s résumé, including profile, education, skills, professional experience, training, and projects."/>}
        </section>
        <div className="resume-preview-footer">
          <p id="resume-preview-description">Read the preview or open the PDF for selectable text and zoom.</p>
          <a href={resumeUrl} target="_blank" rel="noreferrer">Open PDF <ArrowUpRight size={15} aria-hidden="true"/></a>
        </div>
      </div>
    </dialog>
  </>;
}
