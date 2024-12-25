import React from 'react'
import { Participant } from './ParticipantForm'

interface ParticipantListProps {
    participants: Participant[]
    handleNameChange: (index: number, name: string) => void
}

const ParticipantList: React.FC<ParticipantListProps> = ({
    participants,
    handleNameChange,
}) => {
    return (
        <>
            {participants.map((participant, index) => (
                <div key={participant.id} className='flex flex-col gap-4'>
                    <label htmlFor={`participant-${index + 1}`}>
                        Nom n°{index + 1}:
                    </label>
                    <input
                        name={`participant-${index + 1}`}
                        type='text'
                        className='bg-slate-200 text-black'
                        value={participant.name}
                        onChange={(e) =>
                            handleNameChange(index, e.target.value)
                        }
                    />
                </div>
            ))}
        </>
    )
}

export default ParticipantList
