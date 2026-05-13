import { Bell, Settings, Sun, Plus, Filter, Menu, Moon, Search, ChevronDown, Package, Loader2, User } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

function Header({ sideBarCollapsed, onToggleSidebar, isDarkMode, toggleTheme, searchTerm, setSearchTerm }) {
  
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [searchResults, setSearchResults] = useState({ products: [], users: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debouncedGlobalTerm = useDebounce(searchTerm, 500);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      if (!debouncedGlobalTerm || debouncedGlobalTerm.length < 2) {
        setSearchResults({ products: [], users: [] });
        setShowDropdown(false);
        return;
      }

      setIsSearching(true);
      setShowDropdown(true);

      try {
        const [prodRes, usersRes] = await Promise.all([
          fetch(`https://dummyjson.com/products/search?q=${debouncedGlobalTerm}&limit=5`),
          fetch(`https://dummyjson.com/users/search?q=${debouncedGlobalTerm}&limit=5`)
        ]);

        const prodData = await prodRes.json();
        const usersData = await usersRes.json();

        setSearchResults({
          products: prodData.products || [],
          users: usersData.users || []
        });
      } catch (error) {
        console.error("Erro na busca global:", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchGlobalData();
  }, [debouncedGlobalTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchBarContent = (
    <div className='relative w-full' ref={dropdownRef}>
      <Search className='w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400'/>
      <input 
        type="text" 
        placeholder='Search Products or Users...' 
        value={searchTerm}
        onFocus={() => searchTerm.length > 1 && setShowDropdown(true)}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className='w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' 
      />

      <div className='absolute right-10 top-1/2 transform -translate-y-1/2'>
        {isSearching && <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />}
      </div>

      <button className='absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'>
        <Filter className='w-4 h-4' />
      </button>

      {/* DROPDOWN */}
      {showDropdown && (debouncedGlobalTerm.length > 1) && (
        <div className='absolute top-full left-0 right-0 mt-2 z-[100]'>
          
          {/* Caixa do Dropdown */}
          <div className='border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-slate-900/80'>
            
            <div className='max-h-[400px] overflow-y-auto p-2 custom-scrollbar'>
              
              <div className='mb-2'>
                <h3 className='px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider'>Users</h3>
                {searchResults.users.length > 0 ? searchResults.users.map(user => (
                  <div key={user.id} className='flex items-center space-x-3 p-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer rounded-xl transition-colors group'>
                    <div className='w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center'>
                       <User className='w-4 h-4 text-blue-600' />
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600'>{user.firstName} {user.lastName}</p>
                      <p className='text-xs text-slate-500'>{user.email}</p>
                    </div>
                  </div>
                )) : !isSearching && <p className='px-3 py-2 text-xs text-slate-400 italic'>No users found</p>}
              </div>

              <div className='border-t border-slate-100 dark:border-slate-800/50' />

              <div className='mt-2'>
                <h3 className='px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider'>Products</h3>
                {searchResults.products.length > 0 ? searchResults.products.map(product => (
                  <div key={product.id} className='flex items-center space-x-3 p-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer rounded-xl transition-colors group'>
                    <div className='w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center'>
                      <Package className='w-4 h-4 text-purple-600' />
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-purple-600'>{product.title}</p>
                      <p className='text-xs text-slate-500'>${product.price} - {product.category}</p>
                    </div>
                  </div>
                )) : !isSearching && <p className='px-3 py-2 text-xs text-slate-400 italic'>No products found</p>}
              </div>
            </div>

            <div className='bg-slate-50/50 dark:bg-slate-800/30 p-3 text-center border-t border-slate-100 dark:border-slate-800/50'>
              <button className='text-xs font-medium text-blue-600 hover:underline'>View all search results</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className='sticky top-0 z-30'>
      
      <div className='absolute inset-0 -z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-slate-300/60 dark:border-slate-700/50' />

      {/* 3. CONTEÚDO DO HEADER */}
      <div className='px-4 md:px-6 py-4'>
        <div className='flex items-center justify-between'>
          
          <div className='flex items-center space-x-4'>
            <button className='p-2 rounded-lg text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors' onClick={onToggleSidebar}>
              <Menu className='w-5 h-5'/>
            </button>
            <div className='hidden md:block'>
              <h1 className='text-2xl font-black text-slate-800 dark:text-white'>Dashboard</h1>
              <p className='text-sm text-slate-500 dark:text-slate-400'>Welcome back, Alex! Here's what's happening today</p>
            </div>
          </div>

          <div className='hidden md:block flex-1 max-w-md mx-8'>
            {searchBarContent}
          </div>

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

        {/* MOBILE DROPDOWN CONTAINER */}
        <div 
          className={`w-full md:hidden transition-all duration-300 ease-in-out relative ${
            isMobileSearchOpen 
              ? 'max-h-[600px] opacity-100 mt-4 overflow-visible z-50' 
              : 'max-h-0 opacity-0 mt-0 overflow-hidden'
          }`}
        >
          {searchBarContent}
        </div>
      </div>
    </header>
  )
}

export default Header