'use client'
import { useState } from 'react'
import ParticipantList from './ParticipantList'
import { v4 as uuidv4 } from 'uuid'
import { StepEnum } from '@/app/enum/StepEnum'
import { Users, Info, ArrowRight, FileText } from 'lucide-react'

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
        setParticipants(newParticipants)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setParticipants(localParticipants)
        handleStep()
    }

    return (
        <>
            {participationStep === StepEnum.PARTICIPANT_NUMBER_CHOICE && (
                <div className='space-y-6'>
                    <div className='text-center'>
                        <h3 className='text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center justify-center gap-2'>
                            <Users className='text-christmas-red' size={32} />
                            Combien de participants ?
                        </h3>
                    </div>

                    <div className='bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-4 md:p-6'>
                        <div className='flex items-start space-x-3'>
                            <div className='flex-shrink-0'>
                                <Info className='h-6 w-6 text-blue-500' />
                            </div>
                            <div>
                                <h4 className='text-sm font-medium text-blue-800 dark:text-blue-300'>
                                    Information importante
                                </h4>
                                <p className='text-sm text-blue-700 dark:text-blue-400 mt-1'>
                                    Choisissez le <strong>nombre</strong> de
                                    participants pour votre tirage au sort
                                    <br className='hidden sm:inline' />
                                    (minimum 2, maximum 20 personnes)
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='space-y-4'>
                            <label
                                htmlFor='participantNumber'
                                className='block text-lg font-semibold text-gray-700 dark:text-gray-300'
                            >
                                Nombre de participants
                            </label>
                            <div className='relative'>
                                <input
                                    type='number'
                                    id='participantNumber'
                                    name='participantNumber'
                                    value={numParticipants}
                                    onChange={handleNumParticipantsChange}
                                    min='2'
                                    max='20'
                                    className='no-spinners w-full px-4 py-3 text-lg font-semibold text-center bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-christmas-red/20 focus:border-christmas-red transition-all duration-200 shadow-sm'
                                    placeholder='Entrez un nombre entre 2 et 20'
                                />
                                <div className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
                                    <Users
                                        className='text-christmas-red'
                                        size={24}
                                    />
                                </div>
                            </div>
                            <div className='text-center text-sm text-gray-500 dark:text-gray-400'>
                                {numParticipants} participant
                                {numParticipants > 1 ? 's' : ''} sélectionné
                                {numParticipants > 1 ? 's' : ''}
                            </div>
                        </div>

                        <div className='flex justify-center'>
                            <button
                                type='submit'
                                className='px-8 py-4 bg-gradient-to-r from-christmas-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800 flex items-center gap-2'
                                disabled={
                                    numParticipants < 2 || numParticipants > 20
                                }
                            >
                                <ArrowRight size={20} />
                                Étape suivante
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {participationStep !== StepEnum.PARTICIPANT_NUMBER_CHOICE &&
                localParticipants.length > 0 && (
                    <div className='space-y-6'>
                        <div className='text-center'>
                            <h3 className='text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center justify-center gap-2'>
                                <FileText
                                    className='text-christmas-green'
                                    size={32}
                                />
                                Saisissez les noms des participants
                            </h3>
                            <p className='text-gray-600 dark:text-gray-400'>
                                Entrez le nom de chaque personne qui participera
                                au tirage
                            </p>
                        </div>

                        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                            <ParticipantList
                                participants={localParticipants}
                                handleNameChange={handleNameChange}
                            />
                        </div>
                    </div>
                )}
        </>
    )
}

export default ParticipantForm
