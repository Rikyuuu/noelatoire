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
        let speed = 120 // vitesse initiale

        // Phase rapide (1.5 secondes)
        intervalRef.current = setInterval(() => {
            setCurrentParticipant(participants[index])
            index = (index + 1) % participants.length
        }, speed)

        // Transition vers phase lente après 1.5 secondes
        phaseTimeoutRef.current = setTimeout(() => {
            setAnimationPhase('slowing')

            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }

            speed = 300 // ralentissement plus doux
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

                speed = 600 // très lent et doux
                let finalSteps = 0
                const maxFinalSteps = 3 // moins d'étapes finales

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
        }, 1500)

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
                return 'animate-modern-breathing'
            case 'slowing':
                return 'animate-subtle-border-glow'
            case 'final':
                return 'animate-text-shimmer'
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
            <div className='flex justify-center items-center space-x-6'>
                <div className='flex space-x-3'>
                    {['fast', 'slowing', 'final'].map((phase, index) => (
                        <div
                            key={phase}
                            className='flex flex-col items-center space-y-2'
                        >
                            <div
                                className={`w-3 h-3 rounded-full transition-all duration-700 ${
                                    animationPhase === phase
                                        ? 'bg-festive-accent shadow-lg'
                                        : 'bg-slate-300 dark:bg-slate-600'
                                }`}
                            />
                            {animationPhase === phase && (
                                <div className='w-8 h-1 bg-elegant-festive animate-progress-flow rounded-full' />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Animation principale */}
            <div className='transition-all duration-700'>
                <div
                    className={`bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border-2 border-slate-200 dark:border-slate-700 card-modern ${getAnimationClasses()}`}
                >
                    <div className='space-y-6'>
                        <div className='flex justify-center text-slate-600 dark:text-slate-400'>
                            {getPhaseIcon()}
                        </div>

                        <h2 className='text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100'>
                            Tirage en cours...
                        </h2>

                        <div className='relative bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-600 overflow-hidden'>
                            {animationPhase === 'fast' && (
                                <div className='absolute inset-0 bg-elegant-festive opacity-5 animate-progress-flow' />
                            )}
                            <div className='relative text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 min-h-[50px] flex items-center justify-center'>
                                {currentParticipant || '...'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Message selon la phase */}
            <p className='text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium flex items-center justify-center gap-2'>
                {animationPhase === 'fast' && (
                    <>
                        <RotateCcw className='animate-spin' size={16} /> Mélange
                        des participants...
                    </>
                )}
                {animationPhase === 'slowing' && (
                    <>
                        <Clock size={16} /> Le suspense monte...
                    </>
                )}
                {animationPhase === 'final' && (
                    <>
                        <Target size={16} /> Et le gagnant est...
                    </>
                )}
            </p>
        </div>
    )
}

export default ParticipantAnimation
