import React, { useRef, useEffect } from 'react'

interface Snowflake {
    x: number
    y: number
    radius: number
    speed: number
    drift: number
    opacity: number
}

const Snowfall = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        updateCanvasSize()
        window.addEventListener('resize', updateCanvasSize)

        const width = canvas.width
        const height = canvas.height

        // On créer les flocons de neige
        const snowflakes: Snowflake[] = Array.from({ length: 150 }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 0.5,
            drift: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.8 + 0.2,
        }))

        let animationId: number

        const animate = () => {
            ctx.clearRect(0, 0, width, height)

            snowflakes.forEach((flake) => {
                // Mouvement qui semble naturel avec dérive
                flake.y += flake.speed
                flake.x += flake.drift

                // Réapparition en haut quand le flocon sort de l'écran
                if (flake.y > height) {
                    flake.y = -10
                    flake.x = Math.random() * width
                }

                // Réajustement latéral
                if (flake.x > width + 10) {
                    flake.x = -10
                } else if (flake.x < -10) {
                    flake.x = width + 10
                }

                // Dessin du flocon
                ctx.save()
                ctx.globalAlpha = flake.opacity

                // Création d'un flocon plus détaillé
                ctx.fillStyle = 'white'
                ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
                ctx.shadowBlur = 3

                ctx.beginPath()
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
                ctx.fill()

                // Ajout d'un effet scintillant pour certains flocons
                if (flake.radius > 2) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
                    ctx.beginPath()
                    ctx.arc(
                        flake.x - 0.5,
                        flake.y - 0.5,
                        flake.radius * 0.3,
                        0,
                        Math.PI * 2
                    )
                    ctx.fill()
                }

                ctx.restore()
            })

            animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', updateCanvasSize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className='fixed inset-0 pointer-events-none z-50'
            style={{
                background: 'transparent',
                mixBlendMode: 'screen',
            }}
        />
    )
}

export default Snowfall
