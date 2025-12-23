import React from 'react'
import { Participant } from './ParticipantForm'
import { User, CheckCircle, Crown, Lock, PartyPopper } from 'lucide-react'

interface ParticipantListProps {
    participants: Participant[]
    handleNameChange: (index: number, name: string) => void
    previousWinners?: string[]
    isDrawingPhase?: boolean
}

const ParticipantList: React.FC<ParticipantListProps> = ({
    participants,
    handleNameChange,
    previousWinners = [],
    isDrawingPhase = false,
}) => {
    return (
        <>
            {participants.map((participant, index) => {
                const isWinner = previousWinners.includes(participant.name)
                const isDisabled = isDrawingPhase

                return (
                    <div
                        key={participant.id}
                        className={`space-y-3 p-4 rounded-xl border shadow-sm transition-all duration-300 ${
                            isWinner
                                ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 border-green-300 dark:border-green-700 ring-2 ring-green-200 dark:ring-green-800'
                                : isDisabled
                                ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-600'
                                : 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-md'
                        }`}
                    >
                        <label
                            htmlFor={`participant-${index + 1}`}
                            className='flex items-center space-x-2 text-sm font-semibold'
                        >
                            <span
                                className={`flex items-center justify-center w-6 h-6 text-white text-xs rounded-full ${
                                    isWinner
                                        ? 'bg-green-500'
                                        : isDisabled
                                        ? 'bg-gray-500'
                                        : 'bg-christmas-red'
                                }`}
                            >
                                {index + 1}
                            </span>
                            <span
                                className={
                                    isWinner
                                        ? 'text-green-700 dark:text-green-300 font-bold'
                                        : 'text-gray-700 dark:text-gray-300'
                                }
                            >
                                Participant n°{index + 1}
                            </span>
                        </label>

                        <div className='relative'>
                            <input
                                id={`participant-${index + 1}`}
                                name={`participant-${index + 1}`}
                                type='text'
                                disabled={isDisabled}
                                className={`w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isWinner
                                        ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 font-semibold'
                                        : isDisabled
                                        ? 'bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                        : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-christmas-green/20 focus:border-christmas-green'
                                } placeholder-gray-400 dark:placeholder-gray-500`}
                                placeholder={
                                    isDisabled
                                        ? 'Champ désactivé...'
                                        : 'Entrez le nom...'
                                }
                                value={participant.name}
                                onChange={(e) =>
                                    !isDisabled &&
                                    handleNameChange(index, e.target.value)
                                }
                            />
                            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                                {isWinner ? (
                                    <Crown
                                        className='text-green-500'
                                        size={20}
                                    />
                                ) : isDisabled ? (
                                    <Lock className='text-gray-400' size={20} />
                                ) : participant.name ? (
                                    <CheckCircle
                                        className='text-christmas-green'
                                        size={20}
                                    />
                                ) : (
                                    <User className='text-gray-400' size={20} />
                                )}
                            </div>
                        </div>

                        {isWinner && (
                            <div className='text-xs text-green-700 dark:text-green-300 font-medium text-center bg-green-100 dark:bg-green-900/40 py-1 rounded-md'>
                                <div className='flex items-center justify-center gap-1 pl-2'>
                                    <PartyPopper
                                        className='text-green-500'
                                        size={16}
                                    />
                                    <span>
                                        Ce participant a déjà gagné un tirage !
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </>
    )
}

export default ParticipantList
