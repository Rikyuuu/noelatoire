import React, { useEffect, useState } from 'react'
import {
    Crown,
    Trophy,
    RotateCcw,
    Share2,
    Gift,
    StepForward,
} from 'lucide-react'

interface WinnerDisplayProps {
    winner: string | null
    remainingParticipants?: number
    onNewDrawWithoutWinner?: () => void
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({
    winner,
    remainingParticipants = 0,
    onNewDrawWithoutWinner,
}) => {
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
            {/* Éléments décoratifs */}
            {showConfetti && (
                <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className={`absolute animate-gentle-fade-in`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${1 + Math.random() * 2}s`,
                            }}
                        >
                            <div
                                className={`w-2 h-2 rounded-full opacity-30`}
                                style={{
                                    backgroundColor: [
                                        '#3b82f6',
                                        '#8b5cf6',
                                        '#10b981',
                                        '#f59e0b',
                                    ][Math.floor(Math.random() * 4)],
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Annonce moderne du gagnant */}
            <div className={`relative z-10 ${animationClass}`}>
                <div className='bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-700'>
                    <div className='text-center space-y-8'>
                        {/* Icône et titre */}
                        <div className='space-y-6'>
                            <div className='flex justify-center'>
                                <div className='bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-full shadow-lg'>
                                    <Crown className='text-white' size={48} />
                                </div>
                            </div>
                            <h2 className='text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-3'>
                                <Trophy className='text-blue-500' size={24} />
                                FÉLICITATIONS !
                                <Trophy className='text-blue-500' size={24} />
                            </h2>
                        </div>

                        {/* Le nom du gagnant */}
                        <div className='space-y-4'>
                            <p className='text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium'>
                                Le grand gagnant est :
                            </p>

                            <div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 p-6 md:p-8 rounded-2xl border border-blue-200 dark:border-slate-600 shadow-sm'>
                                <div className='text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-wide flex items-center justify-center gap-3'>
                                    <Gift className='text-blue-500' size={28} />
                                    {winner.toUpperCase()}
                                    <Gift className='text-blue-500' size={28} />
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className='space-y-3 text-slate-600 dark:text-slate-400'>
                            <p className='text-lg font-medium flex items-center justify-center gap-2'>
                                <Gift className='text-red-500' size={20} />
                                Joyeux Noël !
                                <Gift className='text-green-500' size={20} />
                            </p>
                            <p className='text-base flex items-center justify-center gap-1'>
                                Que la magie de Noël vous accompagne !
                            </p>
                        </div>

                        {/* Boutons d'action */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center pt-6'>
                            <button
                                onClick={() => window.location.reload()}
                                className='px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2'
                            >
                                <RotateCcw size={18} />
                                Nouveau tirage
                            </button>

                            {onNewDrawWithoutWinner &&
                                remainingParticipants > 1 && (
                                    <button
                                        onClick={onNewDrawWithoutWinner}
                                        className='px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2'
                                    >
                                        <StepForward size={18} />
                                        Relancer le tirage sans {winner}
                                    </button>
                                )}

                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: 'Résultat du tirage de Noël',
                                            text: `${winner} a gagné le tirage au sort de Noël !`,
                                        })
                                    }
                                }}
                                className='px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2'
                            >
                                <Share2 size={18} />
                                Partager
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WinnerDisplay
