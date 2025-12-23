import React from 'react'
import { Participant } from './ParticipantForm'
import { User, CheckCircle } from 'lucide-react'

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
                <div
                    key={participant.id}
                    className='space-y-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200'
                >
                    <label
                        htmlFor={`participant-${index + 1}`}
                        className='flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300'
                    >
                        <span className='flex items-center justify-center w-6 h-6 bg-christmas-red text-white text-xs rounded-full'>
                            {index + 1}
                        </span>
                        <span>Participant n°{index + 1}</span>
                    </label>

                    <div className='relative'>
                        <input
                            id={`participant-${index + 1}`}
                            name={`participant-${index + 1}`}
                            type='text'
                            className='w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-christmas-green/20 focus:border-christmas-green transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500'
                            placeholder='Entrez le nom...'
                            value={participant.name}
                            onChange={(e) =>
                                handleNameChange(index, e.target.value)
                            }
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                            {participant.name ? (
                                <CheckCircle
                                    className='text-christmas-green'
                                    size={20}
                                />
                            ) : (
                                <User className='text-gray-400' size={20} />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ParticipantList
