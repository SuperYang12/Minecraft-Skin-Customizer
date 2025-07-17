'use client';

import { useEffect, useRef } from 'react';
import { SkinViewer, IdleAnimation } from 'skinview3d';

interface Props {
  skinUrl: string;
}

export default function SkinViewerCanvas({ skinUrl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<SkinViewer | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    viewerRef.current?.dispose();

    const resize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      const viewer = new SkinViewer({
        width,
        height,
        skin: skinUrl,
      });

      viewer.zoom = 0.6; 
      viewer.animation = new IdleAnimation();

      viewerRef.current = viewer;
      container.innerHTML = ''; 
      container.appendChild(viewer.canvas);
    };

    resize(); 

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      viewerRef.current?.dispose();
    };
  }, [skinUrl]);

  return (
    <div ref={containerRef} className="w-full h-full relative" />
  );
}
