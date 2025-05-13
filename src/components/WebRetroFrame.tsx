import { useEffect, useRef, useState } from 'react'

type Props = {
  core: string
  rom: string
}

const WebRetroFrame: React.FC<Props> = ({ core, rom }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const romUrl = `${window.location.origin}/Roms/Nes/${rom}`
  const webretroUrl = `/WebRetro/index.html?core=${core}&rom=${encodeURIComponent(romUrl)}`

  // Activar fullscreen al cargar
  useEffect(() => {
    const enterFullscreen = () => {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch((err) => {
          console.warn('No se pudo activar pantalla completa:', err)
        })
      }
    }

    const timer = setTimeout(enterFullscreen, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!document.fullscreenElement
      setIsFullscreen(isFull)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const reEnterFullscreen = () => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen()
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl aspect-[4/3] "
    >
      {/* Emulador (alineado al área negra del marco) */}
      <iframe
        ref={iframeRef}
        id="webretro"
        src={webretroUrl}
        title="WebRetro Emulator"
        className="absolute top-[13%] left-[15%] w-[70%] h-[72%] z-30"
        allowFullScreen
      />


      {/* Overlay NES — SIEMPRE visible 
              className="absolute top-[12.5%] left-[17%] w-[65%] h-[50%] z-30"

      */}
      <img
        src="/Overlays/Nes/NESScreenV.png"
        alt="NES overlay"
        className="absolute inset-0 z-20 w-full h-full object-contain pointer-events-none"
      />

      {/* Botón pantalla completa (solo si está fuera) */}
      {!isFullscreen && (
        <div className="absolute bottom-4 right-4 z-30">
          <button
            onClick={reEnterFullscreen}
            className="px-4 py-2 bg-amber-500 text-black font-bold rounded hover:bg-amber-400"
          >
            Pantalla completa
          </button>
        </div>
      )}
    </div>
  )
}

export default WebRetroFrame
