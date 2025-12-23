import React, { useEffect, useRef, useState } from 'react'
import { RotateCcw, Clock, Target } from 'lucide-react'

interface ParticipantAnimationProps {
    participants: string[]
    onAnimationEnd: () => void
}

const ParticipantAnimation: React.FC<ParticipantAnimationProps> = ({
    participants,
    onAnimationEnd,
}) => {
    const [currentParticipant, setCurrentParticipant] = useState<string>('')
    const [animationPhase, setAnimationPhase] = useState<
        'fast' | 'slowing' | 'final'
    >('fast')
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        let index = 0
        let speed = 80 // vitesse initiale rapide

        // Phase rapide (2 secondes)
        intervalRef.current = setInterval(() => {
            setCurrentParticipant(participants[index])
            index = (index + 1) % participants.length
        }, speed)

        // Transition vers phase lente après 2 secondes
        phaseTimeoutRef.current = setTimeout(() => {
            setAnimationPhase('slowing')

            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }

            speed = 200 // ralentissement
            intervalRef.current = setInterval(() => {
                setCurrentParticipant(participants[index])
                index = (index + 1) % participants.length
            }, speed)

            // Phase finale après 1 seconde supplémentaire
            setTimeout(() => {
                setAnimationPhase('final')

                if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                }

                speed = 500 // très lent
                let finalSteps = 0
                const maxFinalSteps = 5

                intervalRef.current = setInterval(() => {
                    setCurrentParticipant(participants[index])
                    index = (index + 1) % participants.length
                    finalSteps++

                    if (finalSteps >= maxFinalSteps) {
                        clearInterval(intervalRef.current!)
                        onAnimationEnd()
                    }
                }, speed)
            }, 1000)
        }, 2000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            if (phaseTimeoutRef.current) {
                clearTimeout(phaseTimeoutRef.current)
            }
        }
    }, [participants, onAnimationEnd])

    const getAnimationClasses = () => {
        switch (animationPhase) {
            case 'fast':
                return 'animate-pulse scale-110'
            case 'slowing':
                return 'animate-bounce scale-125'
            case 'final':
                return 'animate-winner-celebration scale-150'
            default:
                return ''
        }
    }

    const getPhaseIcon = () => {
        switch (animationPhase) {
            case 'fast':
                return <RotateCcw className='animate-spin' size={32} />
            case 'slowing':
                return <Clock size={32} />
            case 'final':
                return <Target size={32} />
            default:
                return <RotateCcw className='animate-spin' size={32} />
        }
    }

    return (
        <div className='space-y-8 text-center'>
            {/* Indicateur de phase */}
            <div className='flex justify-center items-center space-x-4'>
                <div className='flex space-x-2'>
                    {['fast', 'slowing', 'final'].map((phase) => (
                        <div
                            key={phase}
                            className={`w-3 h-3 rounded-full transition-all duration-500 ${
                                animationPhase === phase
                                    ? 'bg-christmas-red scale-125'
                                    : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Animation principale */}
            <div
                className={`transition-all duration-300 ${getAnimationClasses()}`}
            >
                <div className='bg-gradient-to-r from-christmas-red via-christmas-green to-christmas-gold p-8 rounded-3xl shadow-2xl'>
                    <div className='space-y-4'>
                        <div className='flex justify-center'>
                            {getPhaseIcon()}
                        </div>

                        <h2 className='text-2xl md:text-4xl font-bold text-white'>
                            Le gagnant est...
                        </h2>

                        <div className='bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30'>
                            <div className='text-3xl md:text-5xl font-black text-white min-h-[60px] flex items-center justify-center'>
                                {currentParticipant || '...'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Message d'encouragement selon la phase */}
            <p className='text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium flex items-center justify-center gap-2'>
                {animationPhase === 'fast' && (
                    <>
                        <RotateCcw className='animate-spin' size={20} /> Mélange
                        des participants...
                    </>
                )}
                {animationPhase === 'slowing' && (
                    <>
                        <Clock size={20} /> Le suspense monte...
                    </>
                )}
                {animationPhase === 'final' && (
                    <>
                        <Target size={20} /> Et le gagnant est...
                    </>
                )}
            </p>
        </div>
    )
}

export default ParticipantAnimation
