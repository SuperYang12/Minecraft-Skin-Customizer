'use client';
import {
  FiUpload, FiDownload, FiGrid, FiUser,
  FiCheck, FiTrash2
} from 'react-icons/fi';
import SkinViewerCanvas from './components/SkinViewerCanvas';
import { useState, useEffect, useRef, useCallback } from 'react';
import Modal from 'react-modal';
import { SkinViewer } from 'skinview3d';

type ViewDirection = 'Front' | 'Behind' | 'Left' | 'Right';

export default function SkinDesign() {
  const [skinUrl, setSkinUrl] = useState<string>("https://i.imgur.com/4MOqhGZ.png");
  const [activeCosmetics, setActiveCosmetics] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const viewerRef = useRef<SkinViewer | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('body');
    }
  }, []);

  const cosmeticsList = [
    { id: 'hat-arab', name: 'Arab Hat', icon: <FiUser />, url: '/cosmetics/arab.png', type: 'head' },
    { id: 'santa-hat', name: 'Santa Hat', icon: <FiUser />, url: '/cosmetics/santa_hat.png', type: 'head' },
  ];

  const toggleCosmetic = (url: string) => {
    setActiveCosmetics(prev =>
      prev.includes(url)
        ? prev.filter(c => c !== url)
        : [...prev, url]
    );
  };

  const setCamera = (direction: ViewDirection) => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    switch (direction) {
      case 'Front': viewer.camera.rotation.y = 0; break;
      case 'Behind': viewer.camera.rotation.y = Math.PI; break;
      case 'Left': viewer.camera.rotation.y = Math.PI / 2; break;
      case 'Right': viewer.camera.rotation.y = -Math.PI / 2; break;
    }
  };

  const handleViewerReady = useCallback((v: SkinViewer) => {
    viewerRef.current = v;
  }, []);

  const generateFinalSkinBlob = async (): Promise<Blob | null> => {
    const base = await loadImage(skinUrl);
    const layers = await Promise.all(activeCosmetics.map(loadImage));
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(base, 0, 0);
    for (const layer of layers) ctx.drawImage(layer, 0, 0);
    return new Promise(resolve => canvas.toBlob(blob => resolve(blob), 'image/png'));
  };

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'>
      {/* Header */}
      <header className='sticky top-0 z-50 backdrop-blur-lg bg-gray-800/70 border-b border-gray-700/30 py-4 px-6 shadow-xl'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='flex items-center'>
            <div className='w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mr-3 shadow-lg'>
              <span className='text-xl'>🛠️</span>
            </div>
            <h1 className='text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent'>
              SkinForge
            </h1>
          </div>
          <div className='flex space-x-3'>
            <button onClick={() => setIsModalOpen(true)}
              className='px-5 py-2.5 rounded-xl bg-gray-700/50 border border-gray-600/30 flex items-center'>
              <FiUser className='mr-2' /> NameMc
            </button>
            <div className='relative'>
              <input id="skin-upload" type="file" accept='image/png'
                className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setSkinUrl(URL.createObjectURL(file));
                }} />
              <button className='px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center pointer-events-none'>
                <FiUpload className='mr-2' /> Upload
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className='container mx-auto py-8 px-4'>
        <div className='flex flex-col xl:flex-row gap-8'>
          {/* Preview */}
          <div className='xl:w-2/5 bg-gray-800/40 rounded-2xl p-6 shadow-2xl border border-gray-700/20'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-semibold text-emerald-400'>Preview</h2>
              <div className='flex space-x-2'>
                {(['Front', 'Behind', 'Left', 'Right'] as ViewDirection[]).map((view) => (
                  <button key={view}
                    onClick={() => setCamera(view)}
                    className="px-3 py-1 text-xs rounded-lg bg-gray-700/50 border border-gray-600/30 text-gray-300">
                    {view}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative h-96 flex items-center justify-center">
              <div className='w-64 h-64 rounded-lg border border-gray-600/30 flex items-center justify-center relative'>
                <SkinViewerCanvas
                  skinUrl={skinUrl}
                  cosmeticUrls={activeCosmetics}
                  onViewerReady={handleViewerReady}
                />
              </div>
            </div>

            {/* Active Cosmetics */}
            <div className='mt-6 bg-gray-800/50 rounded-xl p-4 border border-gray-700/30'>
              <h3 className='font-medium mb-3 text-emerald-400'>Active Cosmetics</h3>
              {activeCosmetics.length === 0 ? (
                <p className="text-gray-400 text-sm">No cosmetics selected.</p>
              ) : (
                <div className='space-y-2'>
                  {activeCosmetics.map((url) => {
                    const cosmetic = cosmeticsList.find(c => c.url === url);
                    if (!cosmetic) return null;
                    return (
                      <div key={cosmetic.id} className='flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20'>
                        <div className='flex items-center'>
                          <div className='w-8 h-8 bg-emerald-500/10 rounded-md flex items-center justify-center mr-3'>
                            {cosmetic.icon}
                          </div>
                          <span className='text-sm'>{cosmetic.name}</span>
                        </div>
                        <button onClick={() => toggleCosmetic(url)} className='text-gray-300 hover:text-white'>
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Cosmetics Panel */}
          <div className='xl:w-3/5 bg-gray-800/40 rounded-2xl p-6 shadow-2xl border border-gray-700/20'>
            <div className='flex border-b border-gray-700/30 mb-6'>
              <button className='px-4 py-2 font-medium text-emerald-400 relative'>
                Cosmetics
                <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400'></div>
              </button>
            </div>

            <div className='overflow-y-auto pr-2 max-h-[500px]'>
              {/* Head Cosmetics */}
              <div className='mb-6'>
                <h3 className='font-medium text-emerald-400 flex items-center mb-3 px-2'>
                  <FiUser className='mr-2' /> Head Cosmetics
                </h3>
                <div className='space-y-2'>
                  {cosmeticsList.filter(c => c.type === 'head').map(item => (
                    <div key={item.id}
                      onClick={() => toggleCosmetic(item.url)}
                      className={`flex items-center p-3 rounded-lg border transition-all cursor-pointer ${activeCosmetics.includes(item.url)
                          ? 'bg-emerald-500/10 border-emerald-500'
                          : 'bg-gray-700/30 border-gray-600/20 hover:bg-gray-600/50'
                        }`}>
                      <div className='w-10 h-10 bg-gray-600/30 rounded-md flex items-center justify-center mr-3'>
                        {item.icon}
                      </div>
                      <span className='flex-grow text-sm'>{item.name}</span>
                      {activeCosmetics.includes(item.url) && (
                        <div className='w-5 h-5 rounded-full border border-emerald-400 flex items-center justify-center'>
                          <FiCheck className='text-emerald-400' />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 pt-6 border-t border-gray-700/30 flex justify-between">
              <button onClick={() => {
                setSkinUrl("https://i.imgur.com/4MOqhGZ.png");
                setActiveCosmetics([]);
              }} className="px-6 py-3 rounded-xl bg-gray-700/50 border border-gray-600/30 text-gray-300 flex items-center cursor-pointer" disabled>
                <FiTrash2 className="mr-2" /> Reset
              </button>

              <button
                onClick={async () => {
                  const blob = await generateFinalSkinBlob();
                  if (!blob) return alert("Failed to generate skin.");
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "custom_skin.png";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg flex items-center cursor-pointer"
              >
                <FiDownload className="mr-2" /> Download Skin
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-gray-800 p-8 rounded-2xl max-2-md mx-auto mt-32 shadow-2xl border border-gray-700 text-gray-200"
        overlayClassName="fixed inset-0 bg-black/70 flex items-center justify-center"
      >
        <h2 className='text-xl font-bold mb-4 text-emerald-400'>Load skin from NameMC</h2>
        <input
          type="text"
          placeholder='Enter Minecraft username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 border border-gray-600'
        />
        <div className='flex justify-end gap-3'>
          <button onClick={() => setIsModalOpen(false)} className='px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600'>
            Cancel
          </button>
          <button
            onClick={async () => {
              if (!username) return;
              const skinFromNameMC = `https://mc-heads.net/skin/${username}`;
              try {
                const test = await fetch(skinFromNameMC, { method: 'HEAD' });
                if (test.ok) {
                  setSkinUrl(skinFromNameMC);
                  setIsModalOpen(false);
                } else {
                  alert("User not found or no skin.");
                }
              } catch {
                alert("Failed to fetch skin.");
              }
            }}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-medium"
          >
            Load Skin
          </button>
        </div>
      </Modal>
    </div>
  );
}
