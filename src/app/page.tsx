'use client'
import Steps from '@/components/common/Steps'
import DrawButton from '@/components/DrawButton'
import ParticipantForm, { Participant } from '@/components/ParticipantForm'
import WinnerDisplay from '@/components/WinnerDisplay'
import { useState } from 'react'
import { StepEnum } from './enum/StepEnum'
import ParticipantAnimation from '@/components/ParticipantAnimation'
import Snowfall from '@/components/Snowfall'
import { TreePine, Globe, CandyCane, Snowflake, Gift } from 'lucide-react'
import packageJson from '../../package.json'

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
    const [easterEggEnabled, setEasterEggEnabled] = useState<boolean>(true)

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
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
            {snowfall && <Snowfall />}

            <div className='container mx-auto px-6 py-12 relative z-10'>
                {/* Header */}
                <div className='text-center mb-16 animate-gentle-fade-in'>
                    <div className='mb-6'>
                        <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-festive-accent to-slate-800 bg-clip-text text-transparent dark:from-slate-100 dark:via-festive-accent dark:to-slate-100'>
                            Noëlatoire
                        </h1>
                        <div className='mt-3 flex items-center justify-center gap-3'>
                            <TreePine
                                size={14}
                                className='text-festive-accent animate-pulse'
                            />
                            <div className='w-8 h-px bg-gradient-to-r from-transparent via-festive-accent to-transparent'></div>
                            <Snowflake
                                className='text-festive-light'
                                size={14}
                            />
                            <div className='w-8 h-px bg-gradient-to-r from-transparent via-festive-accent to-transparent'></div>
                            <CandyCane
                                size={14}
                                className='text-festive-secondary animate-pulse'
                                style={{ animationDelay: '1s' }}
                            />
                        </div>
                    </div>
                    <p className='text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium'>
                        Organisez facilement et rapidement vos tirages au sort
                        de Noël
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
                            <div className='space-y-6'>
                                {/* Case à cocher Easter egg */}
                                <div className='flex justify-center'>
                                    <label className='flex items-center gap-3 cursor-pointer group'>
                                        <input
                                            type='checkbox'
                                            checked={easterEggEnabled}
                                            onChange={(e) =>
                                                setEasterEggEnabled(
                                                    e.target.checked
                                                )
                                            }
                                            className='w-5 h-5 text-festive-accent bg-white border-2 border-slate-300 rounded focus:ring-festive-accent focus:ring-2 dark:bg-slate-700 dark:border-slate-600'
                                        />
                                        <div className='text-slate-700 dark:text-slate-300 font-medium group-hover:text-festive-accent transition-colors flex items-center'>
                                            <Gift className='inline-block mr-2 text-festive-accent' />{' '}
                                            <div>Easter egg sonore</div>
                                        </div>
                                    </label>
                                </div>

                                <div className='flex justify-center'>
                                    <DrawButton
                                        participants={participants}
                                        onDraw={handleAnimation}
                                        handleStep={() =>
                                            handleStep(StepEnum.WINNER)
                                        }
                                    />
                                </div>
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
                                        participants={participants.map(
                                            (p) => p.name
                                        )}
                                        previousWinners={previousWinners}
                                        easterEggEnabled={easterEggEnabled}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className='mt-20 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700'>
                    <div className='max-w-4xl mx-auto px-6 py-6'>
                        <div className='flex flex-col md:flex-row items-center justify-between gap-4 text-sm'>
                            {/* Gauche - Infos développeur (je ne suis pas narcissique, promis) */}
                            <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>
                                <div className='w-2 h-2 rounded-full bg-festive-accent'></div>
                                <span>Développé par</span>
                                <span className='font-semibold text-slate-800 dark:text-slate-200'>
                                    Julien D.
                                </span>
                            </div>

                            {/* Centre - Message de Noël */}
                            <div className='flex items-center gap-3 text-center'>
                                <Gift
                                    size={18}
                                    className='text-festive-secondary animate-pulse'
                                />
                                <span className='font-semibold text-lg'>
                                    Joyeux Noël !
                                </span>
                                <Gift
                                    size={18}
                                    className='text-festive-secondary animate-pulse'
                                    style={{ animationDelay: '1s' }}
                                />
                            </div>

                            {/* Droite - Version et type */}
                            <div className='flex items-center gap-4 text-slate-600 dark:text-slate-400'>
                                <div className='flex items-center gap-2'>
                                    <Globe size={14} />
                                    <span className='text-xs'>Web</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='text-xs'>Version</span>
                                    <span className='font-mono text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 px-2 py-1 rounded shadow-sm'>
                                        v{packageJson.version}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className='mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-center'>
                            <p className='text-xs text-slate-500 dark:text-slate-500'>
                                © 2024 - {new Date().getFullYear()} Noëlatoire -
                                Organisateur de tirages au sort pour
                                l&apos;ouverture des cadeaux Noël
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
