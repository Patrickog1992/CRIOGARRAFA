"use client";

import { useEffect, useState, type FC } from 'react';

type VturbPlayerProps = {
  playerId: string;
};

export const VturbPlayer: FC<VturbPlayerProps> = ({ playerId }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return null;
  }

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
