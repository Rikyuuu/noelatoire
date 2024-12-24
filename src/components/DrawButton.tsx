import { Participant } from './ParticipantForm'

export interface DrawButtonProps {
    participants: Participant[]
    onDraw: (winner: string) => void
}

const DrawButton: React.FC<DrawButtonProps> = ({ participants, onDraw }) => {
    const handleDraw = () => {
        if (participants.length === 0) return
        const winner =
            participants[Math.floor(Math.random() * participants.length)].name
        onDraw(winner)
    }

    return (
        <button
            onClick={handleDraw}
            className='rounded-full border border-solid border-transparent transition-colors bg-blue-500 text-white h-10 px-4 hover:bg-blue-600'
        >
            Tirer au sort
        </button>
    )
}

export default DrawButton
