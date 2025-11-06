"use client";

import type { FC } from 'react';

type VturbPlayerProps = {
  playerId: string;
};

export const VturbPlayer: FC<VturbPlayerProps> = ({ playerId }) => {
  const smartPlayerId = `vid-${playerId}`;

  return (
      <div
        id={smartPlayerId}
        style={{
          display: "block",
          margin: "0 auto",
          width: "100%",
          maxWidth: "800px",
        }}
      ></div>
  );
};
