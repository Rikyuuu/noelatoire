'use client'
import { useState } from 'react'
import ParticipantList from './ParticipantList'
import { v4 as uuidv4 } from 'uuid'
import { StepEnum } from '@/app/enum/StepEnum'

export interface Participant {
    id: string
    name: string
}

interface ParticipantFormProps {
    participationStep: StepEnum
    setParticipants: (participants: Participant[]) => void
    handleStep: () => void
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
    participationStep,
    setParticipants,
    handleStep,
}) => {
    const [numParticipants, setNumParticipants] = useState<number>(2)
    const [localParticipants, setLocalParticipants] = useState<Participant[]>([
        { id: uuidv4(), name: '' },
        { id: uuidv4(), name: '' },
    ])

    const handleNumParticipantsChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const num = parseInt(e.target.value, 10)
        setNumParticipants(num)
        setLocalParticipants(
            Array.from({ length: num }, () => ({ id: uuidv4(), name: '' }))
        )
    }

    const handleNameChange = (index: number, name: string) => {
        const newParticipants = [...localParticipants]
        newParticipants[index].name = name
        setLocalParticipants(newParticipants)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setParticipants(localParticipants)
        handleStep()
    }

    return (
        <>
            {participationStep === StepEnum.PARTICIPANT_NUMBER_CHOICE && (
                <>
                    <div role='alert' className='alert alert-info'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            className='h-6 w-6 shrink-0 stroke-current'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            ></path>
                        </svg>
                        <span>
                            Choississez le{' '}
                            <span className='font-bold'>nombre</span> de
                            participants (minimum 2, maximum 20)
                        </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor='participantNumber'>Nombre</label>
                            <input
                                type='number'
                                name='participantNumber'
                                value={numParticipants}
                                onChange={handleNumParticipantsChange}
                                min='2'
                                max='20'
                                className='bg-slate-200 text-black'
                            />
                            <button type='submit' className='btn btn-neutral'>
                                Etape suivante
                            </button>
                        </div>
                    </form>
                </>
            )}

            {participationStep !== StepEnum.PARTICIPANT_NUMBER_CHOICE &&
                localParticipants.length > 0 && (
                    <ParticipantList
                        participants={localParticipants}
                        handleNameChange={handleNameChange}
                    />
                )}
        </>
    )
}

export default ParticipantForm
