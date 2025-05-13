import { useState } from 'react'
import GameList from './components/GameList'
import WebRetroFrame from './components/WebRetroFrame'

function WebRetro () {
  const [selectedGame, setSelectedGame] = useState<{
    core: string
    rom: string
  } | null>(null)

  const handlePlay = (core: string, rom: string) => {
    setSelectedGame({ core, rom })
  }

  return (
    <div className="w-full min-h-screen bg-neutral-900 text-white flex flex-col items-center p-4 gap-6">
      <h1 className="text-3xl font-bold text-amber-400"> GameList </h1>
      <GameList onSelectGame={handlePlay} />
      {selectedGame && (
        <WebRetroFrame core={selectedGame.core} rom={selectedGame.rom} />
      )}
    </div>
  )
}

export default WebRetro