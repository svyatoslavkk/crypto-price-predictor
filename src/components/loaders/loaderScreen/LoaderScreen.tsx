import React from 'react';
import './loaderScreen.scss';

export default function LoaderScreen() {
  return (
    <div className="loader-screen">
      <div className="loader">
        <div className="orbe" style={{ "--index": 0 } as React.CSSProperties}></div>
        <div className="orbe" style={{ "--index": 1 } as React.CSSProperties}></div>
        <div className="orbe" style={{ "--index": 2 } as React.CSSProperties}></div>
        <div className="orbe" style={{ "--index": 3 } as React.CSSProperties}></div>
        <div className="orbe" style={{ "--index": 4 } as React.CSSProperties}></div>
      </div>
    </div>
  )
}