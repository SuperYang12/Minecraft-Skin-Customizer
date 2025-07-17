'use client';

import { useEffect, useRef } from 'react';
import { SkinViewer, IdleAnimation } from 'skinview3d';

interface Props {
  skinUrl: string;
  cosmeticUrls?: string[];
  onViewerReady?: (viewer: SkinViewer) => void;
}

export default function SkinViewerCanvas({ skinUrl, cosmeticUrls = [], onViewerReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<SkinViewer | null>(null);

  const cosmeticKey = cosmeticUrls.join(',');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    viewerRef.current?.dispose();

    const resize = async () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      const combinedSkin = await generateCombinedSkin(skinUrl, cosmeticUrls);

      const viewer = new SkinViewer({
        width,
        height,
        skin: combinedSkin,
      });

      viewer.zoom = 1;
      viewer.animation = new IdleAnimation();

      viewerRef.current = viewer;
      container.innerHTML = '';
      container.appendChild(viewer.canvas);

      if (onViewerReady) onViewerReady(viewer);
    };

    resize();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      viewerRef.current?.dispose();
    };
  }, [skinUrl, cosmeticKey, onViewerReady]); 

  return <div ref={containerRef} className="w-full h-full relative" />;
}

async function generateCombinedSkin(baseUrl: string, layerUrls: string[]): Promise<string> {
  const base = await loadImage(baseUrl);
  const layers = await Promise.all(layerUrls.map(loadImage));

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(base, 0, 0);
  for (const layer of layers) {
    ctx.drawImage(layer, 0, 0);
  }

  return new Promise<string>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) throw new Error("Failed to generate skin blob");
      const url = URL.createObjectURL(blob);
      resolve(url);
    }, 'image/png');
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}
