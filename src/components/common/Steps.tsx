import { StepEnum } from '@/app/enum/StepEnum'
import { Users, FileText, Trophy } from 'lucide-react'

interface StepsProps {
    currentStep: StepEnum
}

const Steps = ({ currentStep }: StepsProps) => {
    const steps = [
        {
            key: StepEnum.PARTICIPANT_NUMBER_CHOICE,
            icon: Users,
            label: 'Nombre',
            description: 'Participants',
        },
        {
            key: StepEnum.PARTICIPANT_NAME_INPUT,
            icon: FileText,
            label: 'Noms',
            description: 'Identités',
        },
        {
            key: StepEnum.WINNER,
            icon: Trophy,
            label: 'Tirage',
            description: 'Résultat',
        },
    ]

    const isStepCompleted = (stepKey: StepEnum) => stepKey < currentStep
    const isStepCurrent = (stepKey: StepEnum) => stepKey === currentStep

    return (
        <div className='w-full space-y-6'>
            {/* Titre de section */}
            <div className='text-center'>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2'>
                    Progression du tirage
                </h2>
                <p className='text-gray-600 dark:text-gray-400'>
                    Suivez les étapes pour organiser votre tirage au sort
                </p>
            </div>

            {/* Steps responsive */}
            <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8'>
                {steps.map((step, index) => (
                    <div key={step.key} className='flex items-center'>
                        {/* Step circle */}
                        <div className='flex flex-col items-center'>
                            <div
                                className={`
                                    w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold
                                    transition-all duration-500 ease-in-out
                                    ${
                                        isStepCompleted(step.key)
                                            ? 'bg-christmas-green text-white shadow-lg animate-pulse-christmas'
                                            : isStepCurrent(step.key)
                                            ? 'bg-christmas-red text-white shadow-festive transform scale-110'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                    }
                                `}
                            >
                                {isStepCompleted(step.key) ? (
                                    <div className='text-white'>✓</div>
                                ) : (
                                    <step.icon size={24} />
                                )}
                            </div>
                            <div className='text-center mt-2'>
                                <div
                                    className={`text-sm font-medium ${
                                        isStepCurrent(step.key)
                                            ? 'text-christmas-red'
                                            : 'text-gray-600 dark:text-gray-400'
                                    }`}
                                >
                                    {step.label}
                                </div>
                                <div className='text-xs text-gray-500 dark:text-gray-500'>
                                    {step.description}
                                </div>
                            </div>
                        </div>

                        {/* Ligne de "connexion" entre les étapes (cachée pour la dernière étape) */}
                        {index < steps.length - 1 && (
                            <div className='hidden md:block w-20 h-0.5 mx-4'>
                                <div
                                    className={`
                                        h-full transition-all duration-500
                                        ${
                                            isStepCompleted(step.key)
                                                ? 'bg-christmas-green'
                                                : 'bg-gray-200 dark:bg-gray-700'
                                        }
                                    `}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Steps
