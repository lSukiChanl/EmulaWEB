type Game = {
    name: string
    rom: string
    core: string
  }
  
  const games: Game[] = [
    { name: '1- Super Mario Bros', rom: 'Super Mario Bros.nes', core: 'nestopia' },
    { name: '2- The Legend of Zelda', rom: 'The Legend of Zelda.nes', core: 'nestopia' },
    { name: '3- Contra', rom: 'Contra.nes', core: 'nestopia' },
  ]
  
  const GameList: React.FC<{ onSelectGame: (core: string, rom: string) => void }> = ({ onSelectGame }) => {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
        {games.map((game) => (
          <li key={game.rom} className="bg-neutral-800 p-4 rounded-md hover:bg-neutral-700 transition">
            <button
              className="text-lg font-semibold text-amber-300 hover:underline"
              onClick={() => onSelectGame(game.core, game.rom)}
            >
              {game.name}
            </button>
          </li>
        ))}
      </ul>
    )
  }
  
  export default GameList
  