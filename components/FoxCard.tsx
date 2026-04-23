import React, { useState } from "react";
import { LazyImage } from "./RandomFox";

type FoxCardProps = {
  fox: IFoxImageItem;
  index: number;
  onToggleFav: (id: string) => void;
  onRemove: (id: string) => void;
};

export const FoxCard = ({
  fox,
  index,
  onToggleFav,
  onRemove,
}: FoxCardProps): React.JSX.Element => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    if (event.currentTarget.src === fox.url) {
      setLoaded(true);
    }
  };

  const animationDelay = `${Math.min(index * 0.05, 0.3)}s`;

  return (
    <div className="card" style={{ animationDelay }}>
      <div className="card-img-wrap">
        <LazyImage
          src={fox.url}
          alt={fox.name}
          onLoad={handleLoad}
        />
        <div className={`card-skeleton ${loaded ? "hidden" : ""}`} />
      </div>
      <div className="card-body">
        <div className="card-tag">🦊 Zorro salvaje</div>
        <div className="card-title">{fox.name}</div>
        <div className="card-meta">
          {fox.habitat} · Añadido {fox.time}
        </div>
        <div className="card-actions">
          <button
            type="button"
            className={`card-btn fav ${fox.fav ? "active" : ""}`}
            onClick={() => onToggleFav(fox.id)}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill={fox.fav ? "currentColor" : "none"}
            >
              <path
                d="M6 10.5L1.5 6C0.5 5 0.5 3.5 1.5 2.5C2.5 1.5 4 1.5 5 2.5L6 3.5L7 2.5C8 1.5 9.5 1.5 10.5 2.5C11.5 3.5 11.5 5 10.5 6L6 10.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            {fox.fav ? "Favorito" : "Guardar"}
          </button>
          <button
            type="button"
            className="card-btn"
            onClick={() => onRemove(fox.id)}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 2L10 10M10 2L2 10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            Quitar
          </button>
        </div>
      </div>
    </div>
  );
};
