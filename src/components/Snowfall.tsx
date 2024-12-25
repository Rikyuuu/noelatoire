import React, { useRef, useEffect } from 'react'

const Snowfall = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const width = (canvas.width = window.innerWidth)
        const height = (canvas.height = window.innerHeight)

        const snowflakes = Array.from({ length: 100 }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 4 + 1,
            speed: Math.random() * 2 + 1,
        }))

        const draw = () => {
            ctx.clearRect(0, 0, width, height)
            ctx.fillStyle = 'white'

            snowflakes.forEach((flake) => {
                ctx.beginPath()
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
                ctx.fill()

                flake.y += flake.speed
                if (flake.y > height) {
                    flake.y = 0
                    flake.x = Math.random() * width
                }
            })

            requestAnimationFrame(draw)
        }

        draw()
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'fixed', top: 0, left: 0 }}
        />
    )
}

export default Snowfall
