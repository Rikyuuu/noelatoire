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

    const handleAnimation = () => {
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
        const winner =
            participants[Math.floor(Math.random() * participants.length)].name
        setWinner(winner)
        handleSnowfall()
    }

    const handleSnowfall = () => {
        setSnowfall(true)
        setTimeout(() => {
            setSnowfall(false)
        }, 4000)
    }

    return (
        <div className='min-h-screen relative overflow-hidden'>
            {snowfall && <Snowfall />}

            <div className='container mx-auto px-4 py-8 relative z-10'>
                {/* Header avec titre festif */}
                <div className='text-center mb-12'>
                    <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-christmas-red via-christmas-green to-christmas-gold bg-clip-text text-transparent mb-4 flex items-center justify-center gap-4'>
                        <Gift className='text-christmas-red' size={60} />
                        Noëlatoire
                        <TreePine className='text-christmas-green' size={60} />
                    </h1>
                    <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto flex items-center justify-center gap-2'>
                        Organisez facilement et rapidement vos tirages au sort
                        d&apos;ouverture de vos cadeaux de Noël !
                    </p>
                </div>

                {/* Conteneur principal avec effet glass */}
                <div className='max-w-4xl mx-auto glass-effect rounded-3xl p-6 md:p-10 christmas-shadow'>
                    <Steps currentStep={step} />

                    <div className='mt-8 space-y-8'>
                        <ParticipantForm
                            setParticipants={setParticipants}
                            handleStep={() =>
                                handleStep(StepEnum.PARTICIPANT_NAME_INPUT)
                            }
                            participationStep={step}
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

                                {winner && <WinnerDisplay winner={winner} />}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer décoratif */}
                <div className='text-center mt-12 text-gray-500 dark:text-gray-400'>
                    <p className='text-sm flex items-center justify-center gap-2'>
                        Joyeux Noël et bonne chance à tous !
                        <Gift className='text-red-400' size={16} />
                        <TreePine className='text-green-400' size={16} />
                    </p>
                </div>
            </div>
        </div>
    )
}
