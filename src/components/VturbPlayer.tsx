"use client";

import Script from 'next/script';

export function VturbPlayer({ playerId }: { playerId: string }) {
  const embedUrl = `https://scripts.converteai.net/82b0f5b7-3ef8-4fad-9a6a-1e700b3d750b/players/${playerId}/v4/embed.html`;

  return (
    <>
      <Script 
        src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js" 
        strategy="lazyOnload"
      />
      <div id={`ifr_${playerId}_wrapper`} style={{ margin: '0 auto', width: '100%', maxWidth: '800px' }}>
        <div style={{ position: 'relative', padding: '177.77777777777777% 0 0 0' }} id={`ifr_${playerId}_aspect`}>
          <iframe
            id={`ifr_${playerId}`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            frameBorder="0"
            allowFullScreen
            referrerPolicy="origin"
            onLoad={(e) => {
              const iframe = e.target as HTMLIFrameElement;
              if (iframe.src === 'about:blank') {
                iframe.src = `${embedUrl}?${location.search || ''}&vl=${encodeURIComponent(location.href)}`;
              }
            }}
            src="about:blank"
          ></iframe>
        </div>
      </div>
    </>
  );
}
