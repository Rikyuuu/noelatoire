'use client'
import DrawButton from '@/components/DrawButton'
import ParticipantForm, { Participant } from '@/components/ParticipantForm'
import WinnerDisplay from '@/components/WinnerDisplay'
import { useState } from 'react'

// TODO: Implement the currentStep state
// export enum CurrentStepEnum {
//     NOT_STARTED,
//     PARTICIPANT_NUMBER,
//     PARTICIPANTS_NAME,
//     FINISHED,
// }

export default function Home() {
    const [participants, setParticipants] = useState<Participant[]>([])
    const [winner, setWinner] = useState<string | null>(null)
    // TODO: Implement the currentStep state
    // const [currentStep, setCurrentStep] = useState<CurrentStepEnum>(
    //     CurrentStepEnum.NOT_STARTED
    // )

    const handleDraw = (winner: string) => {
        setWinner(winner)
    }
    return (
        <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            <div className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
                <p>Choississez le nombre de participants</p>
                <div className='flex gap-4 items-center flex-col sm:flex-row'>
                    <ParticipantForm setParticipants={setParticipants} />
                </div>
                <div className='flex gap-4 items-center flex-col sm:flex-row'>
                    <DrawButton
                        participants={participants}
                        onDraw={handleDraw}
                    />
                </div>
                <div className='flex gap-4 items-center flex-col sm:flex-row'>
                    {winner && <WinnerDisplay winner={winner} />}
                </div>
            </div>
        </div>
    )
}
