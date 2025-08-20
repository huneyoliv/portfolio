"use client"

import { useEffect, useState } from "react"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Força scroll para o topo
    window.scrollTo(0, 0)
    
    // Mostra o loading por 2.5 segundos
    const timer = setTimeout(() => {
      setIsComplete(true)
      setTimeout(() => {
        // Garante que esteja no topo antes de completar
        window.scrollTo(0, 0)
        onComplete()
      }, 500) // Delay extra para transição suave
    }, 2500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-all duration-500 ${
      isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="text-center">
        {/* SVG Loading Animation - Adaptada */}
        <div className="animate-fade-in-up">
          <svg 
            className="loading-worm mx-auto" 
            viewBox="-10 -10 148 148" 
            width="80px" 
            height="80px" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
            <circle 
              className="loading-ring" 
              r="56" 
              cx="64" 
              cy="64" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="12" 
              strokeLinecap="round" 
            />
            <path 
              className="loading-path" 
              d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z" 
              fill="none" 
              stroke="url(#pl-grad)" 
              strokeWidth="10" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeDasharray="44 1111" 
              strokeDashoffset="10" 
            />
          </svg>
        </div>

        {/* Loading text */}
        <p className="mt-6 text-muted-foreground animate-fade-in-up animation-delay-300 text-base">
          Carregando portfólio...
        </p>


      </div>

      <style jsx>{`
        .loading-worm {
          animation: bump 3s linear infinite;
          filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.3));
        }
        
        .loading-path {
          animation: worm 3s cubic-bezier(0.42, 0.17, 0.75, 0.83) infinite;
        }

        .loading-ring {
          animation: ring-pulse 2s ease-in-out infinite;
          color: hsl(var(--muted-foreground) / 0.3);
        }

        @keyframes bump {
          from, 42%, 46%, 51%, 55%, 59%, 63%, 67%, 71%, 74%, 78%, 81%, 85%, 88%, 92%, to {
            transform: translate(0, 0);
          }
          44% { transform: translate(1.33%, 6.75%); }
          53% { transform: translate(-16.67%, -0.54%); }
          61% { transform: translate(3.66%, -2.46%); }
          69% { transform: translate(-0.59%, 15.27%); }
          76% { transform: translate(-1.92%, -4.68%); }
          83% { transform: translate(9.38%, 0.96%); }
          90% { transform: translate(-4.55%, 1.98%); }
        }

        @keyframes worm {
          from { stroke-dashoffset: 10; }
          25% { stroke-dashoffset: 295; }
          to { stroke-dashoffset: 1165; }
        }

        @keyframes ring-pulse {
          0%, 100% { 
            stroke-opacity: 0.1; 
            transform: scale(1);
          }
          50% { 
            stroke-opacity: 0.3; 
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  )
}
