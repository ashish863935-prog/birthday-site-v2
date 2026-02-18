"use client"

import { useRef, useState, useEffect } from "react"
import { AnimatePresence } from "motion/react"
import Loader from "./components/Loader"
import Countdown from "./components/Countdown"
import Celebration from "./components/Celebration"
import HappyBirthday from "./components/HappyBirthday"
import PhotoGallery from "./components/PhotoGallery"
import Letter from "./components/Letter"
import { motion } from "motion/react"

export default function Page() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const birthdayDate = new Date("2025-07-16T00:00:00")
  const [isBirthdayOver, setIsBirthdayOver] = useState(
    new Date().getTime() >= birthdayDate.getTime()
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const fadeIn = () => {
  const audio = audioRef.current
  if (!audio) return

  audio.volume = 0
  audio.play()

  let vol = 0
  const interval = setInterval(() => {
    if (vol < 1) {
      vol = Math.min(vol + 0.05, 1)   // 🔥 prevents going above 1
      audio.volume = vol
    } else {
      clearInterval(interval)
    }
  }, 100)
}

const toggleMusic = () => {
  const audio = audioRef.current
  if (!audio) return

  if (isPlaying) {
    audio.pause()
  } else {
    fadeIn()
  }

  setIsPlaying(!isPlaying)
}

  const screens = [
    !isBirthdayOver
      ? <Countdown key="countdown" onComplete={() => setIsBirthdayOver(true)} birthdayDate={birthdayDate} />
      : <Celebration key="celebration" onNext={() => setCurrentScreen(1)} onStartMusic={() => {
    if (!isPlaying) {
      fadeIn()
      setIsPlaying(true)
    }
  }} />,
    <HappyBirthday key="happy" onNext={() => setCurrentScreen(2)} />,
    <PhotoGallery key="gallery" onNext={() => setCurrentScreen(3)} />,
    <Letter key="letter" />,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950/30 via-black to-purple-950/30 overflow-hidden relative">

      {/* 🎵 AUDIO */}
<audio ref={audioRef} src="/music/song.mp3" loop />

{/* 🎶 Floating Music Icon */}
<motion.button
  onClick={toggleMusic}
  animate={{
    scale: isPlaying ? [1, 1.15, 1] : 1,
  }}
  transition={{
    duration: 1.2,
    repeat: isPlaying ? Infinity : 0,
  }}
  className={`fixed top-5 right-5 z-[9999] 
    w-14 h-14 rounded-full flex items-center justify-center 
    text-2xl shadow-xl transition-all duration-300
    ${isPlaying 
      ? "bg-pink-500 shadow-pink-500/60" 
      : "bg-white/20 backdrop-blur-md"}
  `}
>
  {isPlaying ? "🎶" : "🔇"}
</motion.button>


      <AnimatePresence mode="wait">
        {isLoading ? <Loader key="loader" /> : screens[currentScreen]}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light"
      >
        From ashh 🐈🐾
      </motion.div>

    </div>
  )
}
