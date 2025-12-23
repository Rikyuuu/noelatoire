'use client'
import Steps from '@/components/common/Steps'
import DrawButton from '@/components/DrawButton'
import ParticipantForm, { Participant } from '@/components/ParticipantForm'
import WinnerDisplay from '@/components/WinnerDisplay'
import { useState } from 'react'
import { StepEnum } from './enum/StepEnum'
import ParticipantAnimation from '@/components/ParticipantAnimation'
import Snowfall from '@/components/Snowfall'
import { Gift, TreePine } from 'lucide-react'

export default function Home() {
    const [participants, setParticipants] = useState<Participant[]>([])
    const [winner, setWinner] = useState<string | null>(null)
    const [step, setStep] = useState<StepEnum>(
        StepEnum.PARTICIPANT_NUMBER_CHOICE
    )
    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const [snowfall, setSnowfall] = useState<boolean>(false)
    const [previousWinners, setPreviousWinners] = useState<string[]>([])
    const [isDrawingPhase, setIsDrawingPhase] = useState<boolean>(false)

    const handleAnimation = () => {
        setIsDrawingPhase(true)
        startAnimation()
    }
    const handleStep = (s: StepEnum) => {
        setStep(s)
    }

    const startAnimation = () => {
        setIsAnimating(true)
    }

    const handleWinner = () => {
        setIsAnimating(false)
        const availableParticipants = participants.filter(
            (p) => p.name.trim() !== ''
        )
        const randomWinner =
            availableParticipants[
                Math.floor(Math.random() * availableParticipants.length)
            ].name
        setWinner(randomWinner)
        handleSnowfall()
    }

    const handleSnowfall = () => {
        setSnowfall(true)
        setTimeout(() => {
            setSnowfall(false)
        }, 4000)
    }

    const handleNewDrawWithoutWinner = () => {
        if (winner) {
            // Ajout du gagnant à la liste des gagnants précédents
            setPreviousWinners((prev) => [...prev, winner])

            // Supprime le gagnant de la liste des participants
            const updatedParticipants = participants.filter(
                (participant) => participant.name !== winner
            )
            setParticipants(updatedParticipants)

            // Réinitialise l'état pour un nouveau tirage
            setWinner(null)
            setIsAnimating(false)

            // Vérifie s'il reste assez de participants pour un tirage
            if (updatedParticipants.length > 1) {
                // Lance automatiquement le nouveau tirage
                setTimeout(() => {
                    startAnimation()
                }, 500)
            } else if (updatedParticipants.length === 1) {
                // S'il ne reste qu'un participant, le déclarer gagnant automatiquement
                setWinner(updatedParticipants[0].name)
                handleSnowfall()
            }
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900'>
            {snowfall && <Snowfall />}

            <div className='container mx-auto px-6 py-12 relative z-10'>
                {/* Header */}
                <div className='text-center mb-16 animate-gentle-fade-in'>
                    <div className='flex items-center justify-center gap-3 mb-6'>
                        <div className='p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg'>
                            <Gift className='text-white' size={32} />
                        </div>
                        <h1 className='text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100'>
                            Noëlatoire
                        </h1>
                        <div className='p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg'>
                            <TreePine className='text-white' size={32} />
                        </div>
                    </div>
                    <p className='text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed'>
                        Organisez vos tirages au sort de Noël avec élégance et
                        simplicité
                    </p>
                </div>

                {/* Conteneur principal */}
                <div className='max-w-4xl mx-auto glass-modern rounded-3xl p-8 md:p-12 soft-shadow animate-gentle-fade-in'>
                    <Steps currentStep={step} />

                    <div className='mt-12 space-y-8'>
                        <ParticipantForm
                            setParticipants={setParticipants}
                            handleStep={() =>
                                handleStep(StepEnum.PARTICIPANT_NAME_INPUT)
                            }
                            participationStep={step}
                            previousWinners={previousWinners}
                            isDrawingPhase={isDrawingPhase}
                        />

                        {step === StepEnum.PARTICIPANT_NAME_INPUT && (
                            <div className='flex justify-center'>
                                <DrawButton
                                    participants={participants}
                                    onDraw={handleAnimation}
                                    handleStep={() =>
                                        handleStep(StepEnum.WINNER)
                                    }
                                />
                            </div>
                        )}

                        {step === StepEnum.WINNER && (
                            <div className='text-center space-y-8'>
                                {isAnimating && (
                                    <ParticipantAnimation
                                        participants={participants.map(
                                            (p) => p.name
                                        )}
                                        onAnimationEnd={handleWinner}
                                    />
                                )}

                                {winner && (
                                    <WinnerDisplay
                                        winner={winner}
                                        remainingParticipants={
                                            participants.length
                                        }
                                        onNewDrawWithoutWinner={
                                            handleNewDrawWithoutWinner
                                        }
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className='text-center mt-16 text-slate-500 dark:text-slate-400'>
                    <p className='text-sm flex items-center justify-center gap-1'>
                        Joyeuses fêtes de fin d&apos;année !{' '}
                        <TreePine size={16} className='text-green-500' />
                    </p>
                </div>
            </div>
        </div>
    )
}
