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
                <div key={participant.id}>
                    <label>
                        Nom du participant {index + 1}:
                        <input
                            type='text'
                            value={participant.name}
                            onChange={(e) =>
                                handleNameChange(index, e.target.value)
                            }
                        />
                    </label>
                </div>
            ))}
        </>
    )
}

export default ParticipantList
