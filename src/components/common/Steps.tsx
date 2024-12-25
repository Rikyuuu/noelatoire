import { StepEnum } from '@/app/enum/StepEnum'

interface StepsProps {
    currentStep: StepEnum
}

const Steps = ({ currentStep }: StepsProps) => {
    return (
        <>
            <div>
                <h2 className='text-2xl font-bold'>Etapes</h2>
                <ul className='steps steps-vertical lg:steps-horizontal'>
                    <li className='step step-primary'>Nombre</li>
                    <li
                        className={`step ${
                            currentStep === StepEnum.PARTICIPANT_NAME_INPUT ||
                            currentStep === StepEnum.WINNER
                                ? 'step-primary'
                                : ''
                        }`}
                    >
                        Noms
                    </li>
                    <li
                        className={`step ${
                            currentStep === StepEnum.WINNER
                                ? 'step-primary'
                                : ''
                        }`}
                    >
                        Tirage
                    </li>
                </ul>
            </div>
            <div className='flex w-full flex-col'>
                <div className='divider divider-primary'></div>
            </div>
        </>
    )
}

export default Steps
