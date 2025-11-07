"use client";

import Script from 'next/script';

export function VturbPlayer({ playerId }: { playerId: string }) {
  const scriptSrc = `https://scripts.converteai.net/82b0f5b7-3ef8-4fad-9a6a-1e700b3d750b/players/${playerId}/v4/player.js`;

  // This component will dynamically create the vturb-smartplayer tag
  // and then load the script. This ensures the element exists before the script runs.
  return (
    <div style={{ margin: '0 auto', width: '100%', maxWidth: '800px' }}>
        <vturb-smartplayer 
            id={`vid-${playerId}`} 
            style={{display: 'block', margin: '0 auto', width: '100%', maxWidth: '800px'}}
        ></vturb-smartplayer>
        <Script src={scriptSrc} strategy="lazyOnload" />
    </div>
  );
}

    