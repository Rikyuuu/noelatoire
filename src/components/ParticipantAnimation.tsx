import React, { useEffect, useRef, useState } from 'react'

interface ParticipantAnimationProps {
    participants: string[]
    onAnimationEnd: () => void
}

const ParticipantAnimation: React.FC<ParticipantAnimationProps> = ({
    participants,
    onAnimationEnd,
}) => {
    const [currentParticipant, setCurrentParticipant] = useState<string>('')
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        let index = 0
        intervalRef.current = setInterval(() => {
            setCurrentParticipant(participants[index])
            index = (index + 1) % participants.length
        }, 100)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [participants])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            onAnimationEnd()
        }, 3000)

        return () => clearTimeout(timer)
    }, [onAnimationEnd])

    return (
        <div className='participant-animation'>
            <h2 className='text-2xl font-bold text-center'>
                Le gagnant est :{' '}
                <span className='text-green-500'>{currentParticipant}</span>
            </h2>
        </div>
    )
}

export default ParticipantAnimation
