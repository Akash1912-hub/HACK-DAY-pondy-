import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Users, Zap, Terminal, Cpu } from 'lucide-react'
 import { cn } from "./util"
// import imge from '@/assets/OPENMIC.png'

const GlitchText = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span 
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>
      {isHovered && (
        <>
          <span className="absolute top-0 left-0 -ml-0.5 -mt-0.5 text-[#ff00ff] opacity-70 animate-glitch1">{children}</span>
          <span className="absolute top-0 left-0 ml-0.5 mt-0.5 text-[#00ffff] opacity-70 animate-glitch2">{children}</span>
        </>
      )}
    </span>
  )
}

const CyberpunkEventCard = ({ event, dur, im }) => {
  const [isHovered, setIsHovered] = useState(false)

  const truncateText = (text, maxWords) => {
    const words = text.split(' ')
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...'
    }
    return text
  }

  return (
    <Link to={`./${event.id}`} className="block w-full">
      <div 
        className={cn(
          "bg-[#c3ff00] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 transition-all duration-300",
          "sm:h-[440px] md:h-[460px] lg:h-[480px]", // Further decreased height for larger screens
          "flex flex-col",
          isHovered && "translate-x-[-2px] translate-y-[-2px]"
        )}
        style={{
          boxShadow: isHovered ? '6px 6px 0px 0px rgba(0,0,0,1)' : '4px 4px 0px 0px rgba(0,0,0,1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold truncate flex-1 mr-2">
            <GlitchText>{event.eventName}</GlitchText>
          </h3>
          {event.type === "Technical" ? (
            <Cpu className="w-6 h-6 flex-shrink-0" />
          ) : (
            <Terminal className="w-6 h-6 flex-shrink-0" />
          )}
        </div>
        <div className="relative mb-4 overflow-hidden" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
          <img
            src={event.image || imge} // Use default image if event.image is missing
            alt={event.eventName}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          <div className={cn(
            "absolute inset-0 bg-[#c3ff00] opacity-0 transition-opacity duration-300",
            isHovered && "opacity-30"
          )}></div>
        </div>
        <div className="flex-grow flex flex-col justify-between">
          <div className="mb-2"> {/* Reduced margin-bottom */}
            <p className="text-sm overflow-hidden">
              <span className="line-clamp-3"> {/* Always use 2 lines for consistency */}
                {truncateText(event.overall_overview || '', 30)}
              </span>
            </p>
          </div>
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider">{event.type}</span>
              <div className="flex items-center gap-2 group">
                <Clock className="w-5 h-5 group-hover:text-[#00ffff] transition-colors duration-300" />
                <span className="group-hover:text-[#00ffff] transition-colors duration-300">{event.day} - {dur}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between border-t-2 border-black pt-2"> {/* Reduced margin-top */}
              <span className="text-sm font-semibold">{event.eventType}</span>
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes glitch1 {
          0% { clip-path: inset(80% 0 0 0); }
          20% { clip-path: inset(20% 0 0 0); }
          40% { clip-path: inset(60% 0 0 0); }
          60% { clip-path: inset(40% 0 0 0); }
          80% { clip-path: inset(0% 0 80% 0); }
          100% { clip-path: inset(100% 0 0 0); }
        }
        @keyframes glitch2 {
          0% { clip-path: inset(0 0 80% 0); }
          20% { clip-path: inset(0 0 20% 0); }
          40% { clip-path: inset(0 0 60% 0); }
          60% { clip-path: inset(0 0 40% 0); }
          80% { clip-path: inset(80% 0 0 0); }
          100% { clip-path: inset(0 0 100% 0); }
        }
        .animate-glitch1 { animation: glitch1 0.3s infinite linear alternate-reverse; }
        .animate-glitch2 { animation: glitch2 0.3s infinite linear alternate-reverse; }
      `}</style>
    </Link>
  )
}

const CyberpunkEventGrid = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map(event => (
        <CyberpunkEventCard key={event.id} event={event} dur="2h" />
      ))}
    </div>
  )
}

export { CyberpunkEventCard, CyberpunkEventGrid }