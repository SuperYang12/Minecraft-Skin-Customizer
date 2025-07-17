'use client';
import { FiUpload, FiDownload, FiGrid, FiLayers, FiUser, FiSearch, FiCheck, FiPlus, FiTrash2, FiSave } from 'react-icons/fi'
import SkinViewerCanvas from './components/SkinViewerCanvas'
import { useState } from 'react';



export default function SkinDesign() {
  const [skinUrl, setSkinUrl] = useState<string>("https://i.imgur.com/4MOqhGZ.png")

  return (

    <div className='min-h-screen bg-gradient-to-br from-grey-900 via-gray-800 to-gray-900 text-gray-100'>
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

          <div className='relative w-full md:w-96'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
              <FiSearch />
            </div>
            <input type="text" placeholder='Search cosmetics' className='pl-10 pr-4 py-2.5 w-full bg-gray-700/40 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all placeholder-gray-400 disabled' />
          </div>

          <div className='flex space-x-3'>
            <button className='px-5 py-2.5 rounded-xl bg-gray-700/50 border border-gray-600/30 hover:bg-gray-600/60 transition-all flex items-center text-grat-300'>
              <FiUser className='mr-2' /> NameMc
            </button>
            <div className='relative'>
              <input id="skin-upload" type="file" accept='image/png' className='absolute inset-0 opacity-0 w-full h-full cursor-pointer' onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setSkinUrl(url);
                }
              }} />
              <button
                className='px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center pointer-events-none'
              >
                <FiUpload className='mr-2' /> Upload
              </button>
            </div>
          </div>

        </div>
      </header>

      <main className='container mx-auto py-8 px-4'>
        <div className='flex flex-col xl:flex-row gap-8'>
          {/* Skin Preview Panel */}
          <div className='xl:w-2/5 bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/20'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>
                Preview
              </h2>
              <div className='flex space-x-2'>
                {['Front', 'Behind', 'Left', 'Right'].map((view) => (
                  <button key={view} className="px-3 py-1 text-xs rounded-lg bg-gray-700/50 border border-gray-600/30 text-gray-300" disabled>
                    {view}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border-2 border-dashed border-gray-700/40 flex items-center justify-center mb-6 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className='w-64 h-64 bg-gray-700/20 rounded-lg border border-gray-600/30 flex items-center justify-center'>
                  <div className="absolute inset-0">
                    <SkinViewerCanvas skinUrl={skinUrl} />
                  </div>

                </div>
              </div>



            </div>
            {/* Active Cosmetics */}
            <div className='bg-gray-800/50 rounded-xl p-4 border border-gray-700/30'>
              <h3 className='font-medium mb-3 text-emerald-400'>Active Cosmetics</h3>
              <div className='space-y-2'>
                <div className='flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20'>
                  <div className='flex items-center'>
                    <div className='w-8 h-8 bg-emerald-500/10 rounded-md flex items-center justify-center mr-3'>
                      <FiUser className='text-emerald-400' size={14} />
                    </div>
                    <span className='text-sm'> Cosmetic #1</span>
                  </div>
                  <button className='text-gray-300 hover:text-white'>
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <div className='flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20'>
                  <div className='flex items-center'>
                    <div className='w-8 h-8 bg-emerald-500/10 rounded-md flex items-center justify-center mr-3'>
                      <FiLayers className='text-emerald-400' size={14} />
                    </div>
                    <span className='text-sm'>Cosmetic #2</span>
                  </div>
                  <button className='text-gray-300 hover:text-white'>
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cosmetic List */}
          <div className='xl:w-3/5 bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/20'>
            <div className='flex border-b border-gray-700/30 mb-6'>
              <button className='px-4 py-2 font-medium text-emerald-400 relative'>
                Cosmetics
                <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400'></div>
              </button>
            </div>

            {/* Cosmetics List */}
            <div className='overflow-y-auto pr-2 max-h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/30'>
              <div className='mb-6'>
                <h3 className='font-medium text-emerald-400 flex items-center mb-3 px-2'>
                  <FiUser className='mr-2' />
                  Head Cosmetics
                </h3>
                <div className='space-y-2'>
                  {['Hat 1', 'Hat 2', 'Hat 3', 'Hat 4', 'Hat 5', 'Hat 6', 'Hat 7', 'Hat 8'].map((item) => (
                    <div key={item} className='flex items-center p-3 rounded-lg bg-gray-700/30 hover:bg-gray-600/50 border border-gray-600/20 transition-all cursor-pointer'>
                      <div className='w-10 h-10 bg-gray-600/30 rounded-md flex items-center justify-center mr-3'>
                        <FiUser className='text-gray-400' />
                      </div>
                      <span className='flex-grow text-sm'>{item}</span>
                      <div className='w-5 h-5 rounded-full broder border-emerald-400 flex items-center justify-center'>
                        <FiCheck className='text-emerald-400' />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mb-6'>
                <h3 className='font-medium text-emerald-400 flex items-center mb-3 px-2'>
                  <FiGrid className='mr-2' />
                  Outfits
                </h3>
                <div className='space-y-2'>
                  {['Outfit 1', 'Outfit 2', 'Outfit 3', 'Outfit 4', 'Outfit 5', 'Outfit 6', 'Outfit 7', 'Outfit 8'].map((item) => (
                    <div key={item} className='flex items-center p-3 rounded-lg bg-gray-700/30 hover:bg-gray-600:50 border border-gray-600/20 transition-all cursor-pointer'>
                      <div className='w-10 h-10 bg-gray-600/30 rounded-md flex items-center justify-center mr-3'>
                        <FiGrid className='text-gray-400' />
                      </div>
                      <span className='flex-grow text-sm'>{item}</span>
                      <div className='w-5 h-5 rounded-full broder border-emerald-400 flex items-center justify-center'>
                        <FiCheck className='text-emerald-400' />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700/30 flex justify-between">
              <button className="px-6 py-3 rounded-xl bg-gray-700/50 border border-gray-600/30 text-gray-300 flex items-center" disabled>
                <FiTrash2 className="mr-2" /> Reset
              </button>
              <div className="flex space-x-4">
                <button className="px-6 py-3 rounded-xl bg-gray-700/50 border border-gray-600/30 text-gray-300 flex items-center" disabled>
                  <FiSave className="mr-2" /> Save Schematic
                </button>
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20 flex items-center" disabled>
                  <FiDownload className="mr-2" /> Download Skin
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  )
}