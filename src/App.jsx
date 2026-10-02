import React, { useEffect, useState } from "react";
import Waves from "./components/Waves";
import Day from "./components/Day";
import DateWidget from "./components/Date";
import { getCurrentWindow } from '@tauri-apps/api/window';

function App() {
  const [isMidnight, setIsMidnight] = useState(() => new Date().getHours() === 0);

  useEffect(() => {
    const handleRightClick = async (e) => {
      e.preventDefault();
      try {
        await getCurrentWindow().close();
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener('contextmenu', handleRightClick);
    return () => window.removeEventListener('contextmenu', handleRightClick);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsMidnight(new Date().getHours() === 0);
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative flex flex-row items-start justify-between gap-2 h-screen w-screen p-3 overflow-hidden box-border main-container scrollbar-hide ${isMidnight ? 'midnight-mode' : ''}`} data-tauri-drag-region="true">
      <Day />
      <Waves isMidnight={isMidnight} />
      <DateWidget />
    </div>
  );
}

export default App;
