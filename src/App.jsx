
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {


  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Criamos o estado do tema (iniciando como falso/claro)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. Usamos o useEffect para monitorar a mudança e injetar a classe no HTML
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 3. Função simples para inverter o estado atual
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-indigo-100 via-slate-100 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500'>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar collapsed = {sideBarCollapsed} onToggle = {()=> setSideBarCollapsed(!sideBarCollapsed)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} sideBarCollapsed={sideBarCollapsed}
          onToggleSidebar = {()=> setSideBarCollapsed(!sideBarCollapsed)} isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          />

          <main className="flex-1 overflow-y-auto bg-transparent -mt-16 pt-16">
            <div className="p-6 space-y-6">
              {currentPage === "dashboard" && <Dashboard searchTerm={searchTerm} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App