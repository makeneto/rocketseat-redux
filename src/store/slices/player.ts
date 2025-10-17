import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from ".."

interface Course {
    id: number
    modules: Array<{
        id: number
        title: string
        lessons: Array<{
            id: string
            title: string
            duration: string
        }>
    }>
}

interface PlayerState {
    course: Course | null
    currentModuleIndex: number
    currentLessonIndex: number
}

const initialState: PlayerState = {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
}

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        start: (state, action: PayloadAction<Course>) => {
            state.course = action.payload
        },
        play: (state, action: PayloadAction<[number, number]>) => {
            state.currentModuleIndex = action.payload[0]
            state.currentLessonIndex = action.payload[1]
        },
        next: (state) => {
            const nextLessonIndex = state.currentLessonIndex + 1
            const nextLesson =
                state.course?.modules[state.currentModuleIndex].lessons[
                    nextLessonIndex
                ]

            if (nextLesson) {
                state.currentLessonIndex = nextLessonIndex
            } else {
                const nextModuleIndex = state.currentModuleIndex + 1
                const nextModule = state.course?.modules[nextModuleIndex]

                if (nextModule) {
                    state.currentModuleIndex = nextModuleIndex
                    state.currentLessonIndex = 0
                }
            }
        },
    },
})

export const player = playerSlice.reducer
export const { start, play, next } = playerSlice.actions

export const useCurrentLesson = () => {
    return useAppSelector((state) => {
        const { currentModuleIndex, currentLessonIndex } = state.player

        const currentModule = state.player.course?.modules[currentModuleIndex]
        const currentLesson = currentModule?.lessons[currentLessonIndex]

        return { currentModule, currentLesson }
    })
}
