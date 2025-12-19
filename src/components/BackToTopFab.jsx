import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTopFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-500 transition flex items-center justify-center"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}

