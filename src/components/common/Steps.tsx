const Steps = () => {
    return (
        <>
            <div>
                <h2 className='text-2xl font-bold'>Etapes</h2>
                <ul className='steps steps-vertical lg:steps-horizontal'>
                    <li className='step step-primary'>Nombre</li>
                    <li className='step'>Noms</li>
                    <li className='step'>Tirage</li>
                </ul>
            </div>
            <div className='flex w-full flex-col'>
                <div className='divider divider-primary'></div>
            </div>
        </>
    )
}

export default Steps
