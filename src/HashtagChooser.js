import { useState, useEffect, useCallback } from 'react'
import { withLocalization } from './Localized.js'

function HashtagChooser({ onChange, getString }) {
    const [frames, setFrames] = useState([])
    const [choosenFrame, setChoosenFrame] = useState(null)

    useEffect(() => {
        async function loadFrames() {
            Promise.all(
                [
                    '',
                    '#CreativeCommons',
                    '#MusicIsMyLife',
                    '#MusicProducer',
                    '#OpentoJam',
                    '#Peacemaker',
                    '#RecordingArtist',
                    '#SafeMusic',
                    '#ShareMusic',
                    '#Songwriter',
                    '#TribeMusician',
                    '#TribeWarrior',
                    '#TribeofNoise',
                    '#GetHeard',
                    '#MusicUnites',
                    '#Tribe',
                    '#InTheSpotlight',
                    '#Exposure',
                    '#TeamTribe',
                    '#RealMusicPlease',
                    '#MakeSomeNoise',
                    '#Original',
                    '#BringTheNoise',
                    '#SoundoftheTribe',
                    'tribeofnoise.com',
                ]
                    .map(async frame_filename => {
                        return {
                            name: frame_filename,
                            src: frame_filename === '' ? '' : await import(`./hashtags/${frame_filename.replace('#', 'hashtag-')}.png`),
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
        <div className="HashtagChooser">
            {
                frames.map(frame => {
                    const frame_src_path = frame.src.default
                    const isChoosen = choosenFrame === frame_src_path
                    return <button key={frame.name} data-src={frame_src_path} className={isChoosen ? 'isInRow choosen' : 'isInRow'} onClick={handleImageChoosing}>
                        {frame.name === '' ? getString('button_no_hashtag') : frame.name}
                    </button>
                })
            }
        </div>
    )
}

export default withLocalization(HashtagChooser)
