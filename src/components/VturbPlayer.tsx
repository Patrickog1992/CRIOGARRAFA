"use client";
import Script from "next/script";
import type { FC } from 'react';

type VturbPlayerProps = {
  playerId: string;
};

const VTURB_USER_ID = "82b0f5b7-3ef8-4fad-9a6a-1e700b3d750b";

export const VturbPlayer: FC<VturbPlayerProps> = ({ playerId }) => {
  const playerSrc = `https://scripts.converteai.net/${VTURB_USER_ID}/players/${playerId}/v4/player.js`;
  const smartPlayerId = `vid-${playerId}`;

  return (
    <>
      <div
        style={{
          display: "block",
          margin: "0 auto",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div id={smartPlayerId}></div>
      </div>
      <Script src={playerSrc} strategy="lazyOnload" />
    </>
  );
};
