"use client";

import type { FC } from 'react';
import Script from 'next/script';

type VturbPlayerProps = {
  playerId: string;
};

export const VturbPlayer: FC<VturbPlayerProps> = ({ playerId }) => {
  const smartPlayerId = `vid-${playerId}`;
  const scriptSrc = `https://scripts.converteai.net/82b0f5b7-3ef8-4fad-9a6a-1e700b3d750b/players/${playerId}/v4/player.js`;

  return (
    <>
      <Script src={scriptSrc} strategy="lazyOnload" />
      <div
        id={smartPlayerId}
        style={{
          display: "block",
          margin: "0 auto",
          width: "100%",
          maxWidth: "800px",
        }}
      ></div>
    </>
  );
};
