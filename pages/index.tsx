import { useRef, useState } from "react";
import type { MouseEventHandler } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { random } from "lodash";
import { FoxCard } from "../components/FoxCard";

const FOX_NAMES = [
  "Vulpes vulpes",
  "Zorro ártico",
  "Zorro fennec",
  "Zorro gris",
  "Zorro rojo",
  "Zorro del desierto",
  "Zorro tibetano",
  "Zorro de las pampas",
  "Zorro plateado",
  "Zorro corsac",
];

const HABITATS = [
  "Bosque boreal",
  "Nevada montaña",
  "Desierto árido",
  "Pradera verde",
  "Tundra ártica",
  "Bosque templado",
];

const pickRandom = <T,>(list: readonly T[]): T => list[random(0, list.length - 1)];

const generateId = (): string => Math.random().toString(36).substr(2, 9);

const formatTime = (): string =>
  new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });

const Home: NextPage = () => {
  const [images, setImages] = useState<Array<IFoxImageItem>>([]);
  const [loading, setLoading] = useState(false);
  const usedFoxIds = useRef<Set<number>>(new Set());

  const getRandomFoxId = (): number => {
    let candidate: number;
    do {
      candidate = random(1, 123);
    } while (usedFoxIds.current.has(candidate) && usedFoxIds.current.size < 123);
    usedFoxIds.current.add(candidate);
    return candidate;
  };

  const addImage: MouseEventHandler<HTMLButtonElement> = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700 + random(0, 400)));

    const foxId = getRandomFoxId();
    const newImage: IFoxImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${foxId}.jpg`,
      name: pickRandom(FOX_NAMES),
      habitat: pickRandom(HABITATS),
      time: formatTime(),
      fav: false,
    };

    setImages((prev) => [...prev, newImage]);
    setLoading(false);
    window.plausible("add_fox");
  };

  const toggleFav = (id: string) => {
    setImages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, fav: !item.fav } : item)),
    );
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((item) => item.id !== id));
    window.plausible("remove_fox");
  };

  const clearAll = () => {
    setImages([]);
    usedFoxIds.current.clear();
  };

  const countLabel = `${images.length} ${images.length === 1 ? "imagen" : "imágenes"}`;

  return (
    <>
      <Head>
        <title>Fox Gallery</title>
        <meta
          name="description"
          content="Galería de imágenes de zorros creada con React y TypeScript."
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          data-domain="yourdomain.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>

      <header className="site-header">
        <div className="logo">
          <svg
            className="logo-icon"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="19" cy="19" r="19" fill="oklch(0.65 0.18 45 / 0.15)" />
            <ellipse cx="19" cy="21" rx="10" ry="9" fill="oklch(0.65 0.18 45)" />
            <polygon points="11,14 8,5 15,12" fill="oklch(0.65 0.18 45)" />
            <polygon points="27,14 30,5 23,12" fill="oklch(0.65 0.18 45)" />
            <polygon points="11.5,13 9.5,7 14,11.5" fill="oklch(0.85 0.12 15)" />
            <polygon points="26.5,13 28.5,7 24,11.5" fill="oklch(0.85 0.12 15)" />
            <ellipse cx="19" cy="24" rx="5.5" ry="4" fill="oklch(0.92 0.04 60)" />
            <ellipse cx="19" cy="22.5" rx="1.4" ry="1" fill="#2a1a0a" />
            <ellipse cx="15.5" cy="19.5" rx="1.5" ry="1.6" fill="#1a1208" />
            <ellipse cx="22.5" cy="19.5" rx="1.5" ry="1.6" fill="#1a1208" />
            <circle cx="16" cy="19" r="0.5" fill="white" />
            <circle cx="23" cy="19" r="0.5" fill="white" />
          </svg>
          <span className="logo-text">
            Fox<span>Gallery</span>
          </span>
        </div>
        <span className="header-badge">TypeScript · React</span>
      </header>

      <section className="hero">
        <p className="hero-label">🦊 Generador de imágenes</p>
        <h1>
          Captura la <em>astucia</em>
          <br />
          del zorro
        </h1>
        <p>
          Añade imágenes únicas de zorros con un solo clic. Cada imagen trae
          consigo la esencia salvaje y curiosa de estos fascinantes animales.
        </p>
      </section>

      <div className="controls">
        <button
          type="button"
          className={`btn-add ${loading ? "loading" : ""}`}
          onClick={addImage}
          disabled={loading}
        >
          <svg
            className="btn-icon"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="1.5" />
            <path
              d="M9 5.5V12.5M5.5 9H12.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="btn-label">Agregar zorro</span>
          <div className="spinner" />
        </button>
        <button type="button" className="btn-clear" onClick={clearAll}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 2L12 12M12 2L2 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Limpiar
        </button>
        <span className="count-badge">{countLabel}</span>
      </div>

      <main className="gallery-wrap">
        {images.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect
                x="8"
                y="16"
                width="48"
                height="36"
                rx="6"
                stroke="oklch(0.65 0.18 45)"
                strokeWidth="2"
              />
              <circle
                cx="24"
                cy="30"
                r="5"
                stroke="oklch(0.65 0.18 45)"
                strokeWidth="2"
              />
              <path
                d="M8 42L20 30L28 38L38 26L56 42"
                stroke="oklch(0.65 0.18 45)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>
              Presiona <strong>&quot;Agregar zorro&quot;</strong> para comenzar tu
              galería.
            </p>
          </div>
        ) : (
          <div className="gallery">
            {images.map((fox, index) => (
              <FoxCard
                key={fox.id}
                fox={fox}
                index={index}
                onToggleFav={toggleFav}
                onRemove={removeImage}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
