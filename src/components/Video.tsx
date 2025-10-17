import YouTube from "react-youtube"
import { useDispatch } from "react-redux"
import { next, useCurrentLesson } from "../store/slices/player"

export default function Video() {
    const dispatch = useDispatch()

    const { currentLesson } = useCurrentLesson()

    function handlePlayNext() {
        dispatch(next())
    }

    const opts = {
        width: "100%",
        height: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    if (!currentLesson) return null

    return (
        <div className="w-full h-full">
            <YouTube
                videoId={currentLesson.id}
                opts={opts}
                className="h-full"
                onEnd={handlePlayNext}
            />
        </div>
    )
}
