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

    // Vérification d'unicité des noms
    const participantNames = validParticipants.map((p) =>
        p.name.trim().toLowerCase()
    )
    const hasUniqueNames =
        participantNames.length === new Set(participantNames).size

    const canDraw =
        allParticipantsFilled && participants.length >= 2 && hasUniqueNames

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
            {/* Information sur les participants */}
            <div className='space-y-3'>
                <p className='text-lg text-slate-700 dark:text-slate-300'>
                    <span className='font-bold text-blue-600 dark:text-blue-400'>
                        {validParticipants.length}
                    </span>{' '}
                    / <span className='font-bold'>{participants.length}</span>{' '}
                    participants remplis
                </p>
                {!allParticipantsFilled && participants.length > 0 && (
                    <p className='text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2 justify-center bg-amber-50 dark:bg-amber-950/20 px-4 py-2 rounded-lg border border-amber-200 dark:border-amber-800'>
                        <AlertTriangle size={16} />
                        Veuillez remplir tous les noms avant de lancer le tirage
                    </p>
                )}
                {allParticipantsFilled && !hasUniqueNames && (
                    <p className='text-sm text-red-600 dark:text-red-400 flex items-center gap-2 justify-center bg-red-50 dark:bg-red-950/20 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800'>
                        <X size={16} />
                        Certains participants ont le même nom. Sinon, comment
                        les différenceriez-vous ? 😉 😜
                    </p>
                )}
                {participants.length === 0 && (
                    <p className='text-sm text-red-600 dark:text-red-400 flex items-center gap-2 justify-center bg-red-50 dark:bg-red-950/20 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800'>
                        <X size={16} />
                        Aucun participant configuré
                    </p>
                )}
            </div>

            {/* Bouton de tirage */}
            <button
                onClick={handleDraw}
                disabled={!canDraw || isDrawing}
                className={`
                    relative px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-md min-w-[240px]
                    ${
                        canDraw && !isDrawing
                            ? 'bg-festive-accent hover:bg-festive-accent-hover text-white hover:shadow-lg'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                    }
                    ${isDrawing ? 'animate-modern-breathing' : ''}
                `}
            >
                <span className='flex items-center justify-center space-x-3'>
                    {isDrawing && (
                        <RotateCcw className='animate-spin' size={20} />
                    )}
                    <span>
                        {isDrawing ? 'Tirage en cours...' : 'Lancer le tirage'}
                    </span>
                </span>
            </button>

            {/* Instructions */}
            {allParticipantsFilled && hasUniqueNames ? (
                <p className='text-sm text-green-600 dark:text-green-400 max-w-md mx-auto px-4 py-2 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800'>
                    Tous les participants sont prêts ! Cliquez pour découvrir le
                    gagnant !
                </p>
            ) : (
                <p className='text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto'>
                    {!allParticipantsFilled
                        ? 'Remplissez tous les champs pour pouvoir lancer le tirage au sort'
                        : 'Assurez-vous que chaque participant a un nom unique'}
                </p>
            )}
        </div>
    )
}

export default DrawButton
