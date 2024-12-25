'use client'
import { useState } from 'react'
import ParticipantList from './ParticipantList'
import { v4 as uuidv4 } from 'uuid'

export interface Participant {
    id: string
    name: string
}

interface ParticipantFormProps {
    setParticipants: (participants: Participant[]) => void
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
    setParticipants,
}) => {
    const [numParticipants, setNumParticipants] = useState(0)
    const [localParticipants, setLocalParticipants] = useState<Participant[]>(
        []
    )

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
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='participantNumber'>
                    Nombre de participants
                </label>
                <input
                    type='number'
                    name='participantNumber'
                    value={numParticipants}
                    onChange={handleNumParticipantsChange}
                    min='0'
                    max='20'
                />
                <button type='submit' className='btn btn-neutral'>
                    Valider
                </button>
            </form>

            <ParticipantList
                participants={localParticipants}
                handleNameChange={handleNameChange}
            />
        </div>
    )
}

export default ParticipantForm
