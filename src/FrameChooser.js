import { useState, useEffect, useCallback } from 'react'

function FrameChooser({onChange}) {
    const [frames, setFrames] = useState([])
    const [choosenFrame, setChoosenFrame] = useState(null)

    useEffect(() => {
        async function loadFrames(){
            Promise.all(
                [
                    'ProfileFrame-Mixture1-Paars',
                    'ProfileFrame-Mixture2-Rood',
                    'ProfileFrame-Mixture3-Turqoise',
                    'ProfileFrame-Mixture4-Blauw',
                    'ProfileFrame-Mixture5-Lime',
                    'ProfileFrame-Mixture6-Roze',
                    'ProfileFrame-Mixture7-Groen',
                    'ProfileFrame-Mixture8-Geel',
                    'ProfileFrame-Mixture9-Zalmrood',
                ]
                .map(async frame_filename => {
                    return {
                        name: frame_filename,
                        src: await import(`./frames/${frame_filename}.png`),
                    }
                })
            )
            .then(new_frames => {
                setFrames(new_frames)
                setChoosenFrame(new_frames[0].src.default)
            })
        }
        loadFrames()
    }, [])

    const handleImageChoosing = useCallback(event => {
        setChoosenFrame(event.target.dataset.src)
    }, [setChoosenFrame])

    useEffect(() => {
        onChange(choosenFrame)
    }, [onChange, choosenFrame])

    return (
        <div className="FrameChooser">
            {
                frames.map(frame => {
                    const frame_src_path = frame.src.default
                    const isChoosen = choosenFrame === frame_src_path
                    return <div
                        key={frame_src_path}
                        data-src={frame_src_path}
                        className={isChoosen ? 'frame choosen' : 'frame'}
                        onClick={handleImageChoosing}
                    >
                        <img alt={frame.name} src={frame_src_path} />
                    </div>
                })
            }             
        </div>
    )
}

export default FrameChooser
