import React, { useState } from 'react'
import { Participant } from './ParticipantForm'
import { AlertTriangle, X, RotateCcw } from 'lucide-react'

export interface DrawButtonProps {
    participants: Participant[]
    onDraw: (winner: string) => void
    handleStep: () => void
}

const DrawButton: React.FC<DrawButtonProps> = ({
    participants,
    onDraw,
    handleStep,
}) => {
    const [isDrawing, setIsDrawing] = useState(false)

    const validParticipants = participants.filter((p) => p.name.trim() !== '')
    const allParticipantsFilled =
        participants.length > 0 &&
        validParticipants.length === participants.length
    const canDraw = allParticipantsFilled && participants.length >= 2

    const handleDraw = () => {
        if (!canDraw) return

        setIsDrawing(true)

        // Effet sonore et animation avant le tirage
        setTimeout(() => {
            const winner =
                validParticipants[
                    Math.floor(Math.random() * validParticipants.length)
                ].name
            onDraw(winner)
            handleStep()
            setIsDrawing(false)
        }, 500)
    }

    return (
        <div className='space-y-6 text-center'>
            {/* Information sur les participants valides */}
            <div className='space-y-2'>
                <p className='text-lg text-gray-700 dark:text-gray-300'>
                    <span className='font-bold text-christmas-green'>
                        {validParticipants.length}
                    </span>{' '}
                    / <span className='font-bold'>{participants.length}</span>{' '}
                    participants remplis
                </p>
                {!allParticipantsFilled && participants.length > 0 && (
                    <p className='text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1 justify-center'>
                        <AlertTriangle size={16} />
                        Veuillez remplir tous les noms avant de lancer le tirage
                    </p>
                )}
                {participants.length === 0 && (
                    <p className='text-sm text-red-600 dark:text-red-400 flex items-center gap-1 justify-center'>
                        <X size={16} />
                        Aucun participant configuré
                    </p>
                )}
            </div>

            {/* Bouton de tirage principal */}
            <button
                onClick={handleDraw}
                disabled={!canDraw || isDrawing}
                className={`
                    group relative px-8 py-4 text-xl font-bold rounded-2xl transition-all duration-300 transform
                    ${
                        canDraw && !isDrawing
                            ? 'bg-gradient-to-r from-christmas-green to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105 hover:shadow-xl cursor-pointer animate-pulse-christmas'
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }
                    ${isDrawing ? 'animate-ping' : ''}
                `}
            >
                <span className='relative z-10 flex items-center space-x-3'>
                    {isDrawing && (
                        <RotateCcw className='animate-spin' size={24} />
                    )}
                    <span>
                        {isDrawing
                            ? 'Tirage en cours...'
                            : 'Lancer le tirage !'}
                    </span>
                </span>

                {/* Effet de brillance */}
                {canDraw && !isDrawing && (
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-pulse'></div>
                )}
            </button>

            {/* Instructions */}
            {allParticipantsFilled ? (
                <p className='text-sm text-green-600 dark:text-green-400 max-w-md mx-auto flex items-center gap-1 justify-center'>
                    Tous les participants sont prêts ! Cliquez pour découvrir le
                    gagnant !
                </p>
            ) : (
                <p className='text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto'>
                    Remplissez tous les champs pour pouvoir lancer le tirage au
                    sort
                </p>
            )}
        </div>
    )
}

export default DrawButton
