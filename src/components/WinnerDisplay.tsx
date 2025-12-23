import React, { useEffect, useState } from 'react'
import { Crown, Trophy, RotateCcw, Share2, Sparkles, Gift } from 'lucide-react'

interface WinnerDisplayProps {
    winner: string | null
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner }) => {
    const [showConfetti, setShowConfetti] = useState(false)
    const [animationClass, setAnimationClass] = useState('')

    useEffect(() => {
        // Lecture audio
        try {
            const audio = new Audio('/sounds/christmas2.mp3')
            audio.volume = 0.5
            audio.play().catch(console.warn)
        } catch (error) {
            console.warn('Impossible de lire le son:', error)
        }

        // Animation d'entrée
        setAnimationClass('animate-winner-celebration')
        setShowConfetti(true)

        // Arrêt des confettis après 5 secondes
        const confettiTimer = setTimeout(() => {
            setShowConfetti(false)
        }, 5000)

        return () => clearTimeout(confettiTimer)
    }, [winner])

    if (!winner) {
        return (
            <div className='text-center p-8'>
                <h2 className='text-2xl font-bold text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2'>
                    <Trophy className='text-gray-400' size={32} />
                    Pas encore de gagnant...
                </h2>
            </div>
        )
    }

    return (
        <div className='relative space-y-8'>
            {/* Confettis animés */}
            {showConfetti && (
                <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className={`absolute animate-snowfall`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 3}s`,
                            }}
                        >
                            <span
                                className={`text-2xl`}
                                style={{
                                    color: [
                                        '#dc2626',
                                        '#059669',
                                        '#f59e0b',
                                        '#3b82f6',
                                        '#8b5cf6',
                                    ][Math.floor(Math.random() * 5)],
                                }}
                            >
                                {
                                    [
                                        <Sparkles key='sparkles' />,
                                        <Gift key='gift' />,
                                        <Crown key='crown' />,
                                        <Trophy key='trophy' />,
                                    ][Math.floor(Math.random() * 4)]
                                }
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Annonce principale du gagnant */}
            <div className={`relative z-10 ${animationClass}`}>
                <div className='bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-1 rounded-3xl shadow-2xl'>
                    <div className='bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12'>
                        <div className='text-center space-y-6'>
                            {/* Couronne et titre */}
                            <div className='space-y-4'>
                                <div className='flex justify-center'>
                                    <Crown
                                        className='text-yellow-500 animate-bounce'
                                        size={80}
                                    />
                                </div>
                                <h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent flex items-center justify-center gap-2'>
                                    <Trophy
                                        className='text-yellow-600'
                                        size={32}
                                    />
                                    FÉLICITATIONS !
                                    <Trophy
                                        className='text-yellow-600'
                                        size={32}
                                    />
                                </h2>
                            </div>

                            {/* Le nom du gagnant */}
                            <div className='space-y-3'>
                                <p className='text-lg md:text-2xl text-gray-700 dark:text-gray-300 font-semibold'>
                                    Le grand gagnant est :
                                </p>

                                <div className='bg-gradient-to-r from-christmas-green to-green-600 text-white p-6 md:p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3'>
                                    <Gift
                                        className='text-christmas-red'
                                        size={32}
                                    />
                                    <div className='text-3xl md:text-5xl font-black tracking-wide'>
                                        {winner.toUpperCase()}
                                    </div>
                                    <Gift
                                        className='text-christmas-red'
                                        size={32}
                                    />
                                </div>
                            </div>

                            {/* Messages de félicitations */}
                            <div className='space-y-3 text-gray-600 dark:text-gray-400'>
                                <p className='text-lg md:text-xl font-semibold flex items-center justify-center gap-2'>
                                    <Gift className='text-red-500' size={24} />
                                    Joyeux Noël !
                                    <Gift
                                        className='text-green-500'
                                        size={24}
                                    />
                                </p>
                                <p className='text-base md:text-lg flex items-center justify-center gap-1'>
                                    Que la magie de Noël vous accompagne !
                                    <Sparkles
                                        className='text-yellow-500'
                                        size={20}
                                    />
                                </p>
                            </div>

                            {/* Boutons d'action */}
                            <div className='flex flex-col sm:flex-row gap-4 justify-center pt-6'>
                                <button
                                    onClick={() => window.location.reload()}
                                    className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2'
                                >
                                    <RotateCcw size={20} />
                                    Nouveau tirage
                                </button>

                                <button
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: 'Résultat du tirage de Noël',
                                                text: `${winner} a gagné le tirage au sort de Noël !`,
                                            })
                                        }
                                    }}
                                    className='px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2'
                                >
                                    <Share2 size={20} />
                                    Partager
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WinnerDisplay
