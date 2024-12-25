'use client'
import Steps from '@/components/common/Steps'
import DrawButton from '@/components/DrawButton'
import ParticipantForm, { Participant } from '@/components/ParticipantForm'
import WinnerDisplay from '@/components/WinnerDisplay'
import { useState } from 'react'
import { StepEnum } from './enum/StepEnum'
import ParticipantAnimation from '@/components/ParticipantAnimation'
import Snowfall from '@/components/Snowfall'

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
        <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            {snowfall && <Snowfall />}
            <div className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
                <Steps currentStep={step} />
                <div className='flex gap-4 items-center flex-col'>
                    <ParticipantForm
                        setParticipants={setParticipants}
                        handleStep={() =>
                            handleStep(StepEnum.PARTICIPANT_NAME_INPUT)
                        }
                        participationStep={step}
                    />
                </div>
                {step === StepEnum.PARTICIPANT_NAME_INPUT && (
                    <div className='flex gap-4 items-center flex-col'>
                        <DrawButton
                            participants={participants}
                            onDraw={handleAnimation}
                            handleStep={() => handleStep(StepEnum.WINNER)}
                        />
                    </div>
                )}

                {step === StepEnum.WINNER && (
                    <>
                        {isAnimating && (
                            <ParticipantAnimation
                                participants={participants.map((p) => p.name)}
                                onAnimationEnd={handleWinner}
                            />
                        )}

                        <div className='flex gap-4 items-center flex-col'>
                            {winner && <WinnerDisplay winner={winner} />}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
