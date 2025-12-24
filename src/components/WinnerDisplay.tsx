import React, { useEffect, useState } from 'react'
import {
    Trophy,
    RotateCcw,
    Share2,
    Gift,
    StepForward,
    PackageOpen,
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
                                        '#10b981', // festive-emerald
                                        '#334155', // modern-slate
                                        '#e11d48', // festive-ruby
                                        '#64748b', // modern-slate-light
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
                                <div className='bg-festive-accent p-6 rounded-full shadow-lg'>
                                    <Gift className='text-white' size={48} />
                                </div>
                            </div>
                            <h2 className='text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-3'>
                                FÉLICITATIONS !
                            </h2>
                        </div>

                        {/* Le nom du gagnant */}
                        <div className='space-y-4'>
                            <p className='text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium'>
                                Le grand gagnant est
                            </p>

                            <div className='bg-gradient-to-br from-red-50 to-green-50 dark:from-red-950/20 dark:to-green-950/20 p-6 md:p-8 rounded-2xl border border-festive-accent/30 dark:border-slate-600 shadow-sm'>
                                <div className='text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-wide flex items-center justify-center gap-3'>
                                    {winner.toUpperCase()}
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className='space-y-3 text-slate-600 dark:text-slate-400'>
                            <p className='text-lg font-medium flex items-center justify-center gap-2'>
                                <PackageOpen
                                    className='text-festive-accent'
                                    size={20}
                                />
                                Tu peux ouvrir tes cadeaux !
                                <PackageOpen
                                    className='text-festive-accent'
                                    size={20}
                                />
                            </p>
                        </div>

                        {/* Boutons d'action */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center pt-6'>
                            <button
                                onClick={() => window.location.reload()}
                                className='px-6 py-3 bg-festive-secondary hover:bg-festive-secondary-hover text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2'
                            >
                                <RotateCcw size={18} />
                                Nouveau tirage
                            </button>

                            {onNewDrawWithoutWinner &&
                                remainingParticipants > 1 && (
                                    <button
                                        onClick={onNewDrawWithoutWinner}
                                        className='px-6 py-3 bg-modern-primary hover:bg-modern-primary-hover text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2'
                                    >
                                        <StepForward size={18} />
                                        Poursuivre les tirages
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
                                className='px-6 py-3 bg-festive-accent hover:bg-festive-accent-hover text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2'
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
