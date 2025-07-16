import { FiUpload, FiDownload, FiGrid, FiLayers, FiUser, FiSearch, FiCheck, FiPlus, FiTrash2, FiSave} from 'react-icons/fi'

export default function SkinDesign() {
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
            <input type="text" placeholder='Search cosmetics' className='pl-10 pr-4 py-2.5 w-full bg-gray-700/40 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all placeholder-gray-400 disabled'       />
          </div>

          <div className='flex space-x-3'>
            <button className='px-5 py-2.5 rounded-xl bg-gray-700/50 border border-gray-600/30 hover:bg-gray-600/60 transition-all flex items-center text-grat-300'>
              <FiUser className='mr-2' /> NameMc
            </button>
            <button className='px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center'>
              <FiUpload className='mr-2' /> Upload
            </button>
          </div>

        </div>
      </header>
    </div>
  )
}