import { Bell, Settings, Sun, Plus, Filter, Menu, Moon, Search, ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

function Header({ sideBarCollapsed, onToggleSidebar, isDarkMode, toggleTheme, searchTerm, setSearchTerm }) {
  
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // CORREÇÃO AQUI: Em vez de ser uma função '() => ()', 
  // agora é apenas uma variável que guarda o HTML. Isso impede o React de recriar o input!
  const searchBarContent = (
    <div className='relative w-full'>
      <Search className='w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400'/>
      <input 
        type="text" 
        placeholder='Search Anything' 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className='w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' 
      />
      <button className='absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'>
        <Filter className='w-4 h-4' />
      </button>
    </div>
  );

  return (
    <div className='sticky top-0 z-30 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-slate-300/60 dark:border-slate-700/50 px-4 md:px-6 py-4'>
      
      <div className='flex items-center justify-between'>
        
        {/* Lado Esquerdo */}
        <div className='flex items-center space-x-4'>
          <button className='p-2 rounded-lg text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors' onClick={onToggleSidebar}>
            <Menu className='w-5 h-5'/>
          </button>

          <div className='hidden md:block'>
            <h1 className='text-2xl font-black text-slate-800 dark:text-white'>Dashboard</h1>
            <p className='text-sm text-slate-500 dark:text-slate-400'>Welcome back, Alex! Here's what's happening today</p>
          </div>
        </div>

        {/* Centro (Desktop) */}
        <div className='hidden md:block flex-1 max-w-md mx-8'>
          {/* CORREÇÃO: Usando a variável com as chaves {} */}
          {searchBarContent}
        </div>

        {/* Lado Direito */}
        <div className='flex items-center space-x-1 md:space-x-3'>
          
          <button 
            className='md:hidden p-2 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            <Search className='w-5 h-5'/>
          </button>
          
          <button className='hidden lg:flex items-center space-x-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all'>
            <Plus className='w-4 h-4'/>
            <span className='text-sm font-medium'>New</span>
          </button>
          
          <button className='p-2 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors' onClick={toggleTheme}>
            {isDarkMode ? <Sun className='w-5 h-5'/> : <Moon className='w-5 h-5'/>}
          </button>

          <button className='relative p-2 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'>
            <Bell className='w-5 h-5'/>
            <span className='absolute top-1.5 right-1.5 w-2.5 h-2.5 md:w-4 md:h-4 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center'>
              <span className='hidden md:block text-[10px] text-white font-bold'>3</span>
            </span>
          </button>

          <button className='hidden sm:block p-2 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'>
            <Settings className='w-5 h-5'/>
          </button>

          <div className='flex items-center space-x-2 pl-2 md:pl-3 border-l border-slate-300/60 dark:border-slate-700'>
            <img src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2" alt="User" className='w-8 h-8 rounded-full ring-2 ring-slate-100 dark:ring-slate-800 shrink-0' />
            <div className='hidden md:block'>
              <p className='text-sm font-medium text-slate-800 dark:text-white'>Alex Johnson</p>
              <p className='text-xs text-slate-500 dark:text-slate-400'>Administrator</p>
            </div>
            <ChevronDown className='hidden sm:block w-4 h-4 text-slate-400' />
          </div>
        </div>
      </div>

      <div 
        className={`w-full md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileSearchOpen ? 'max-h-24 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        {/* CORREÇÃO: Usando a variável com as chaves {} */}
        {searchBarContent}
      </div>

    </div>
  )
}

export default Header