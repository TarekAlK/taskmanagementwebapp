import { atom } from "jotai"
import { atomWithStorage } from 'jotai/utils'

//localStorage.clear();
//useSetDate()
export const todoAtom = atomWithStorage('todo', [])

export const doingAtom = atomWithStorage('doing', [])

export const doneAtom = atomWithStorage('done', [])

export const subTasksAtom = atom([{writing: '', completed: false}, {writing: '', completed: false}])
export const selectedOptionAtom = atom('todo')
export const baseSelectedOptionAtom = atom('')
export const titleAtom = atom('')
export const descriptionAtom = atom('')
export const indexAtom = atom(0)
export const wizardPopAtom = atom(false)
export const updateConfirmTaskFlagAtom = atom(false)
export const updateFlagAtom = atom(false)
export const lightModeAtom = atomWithStorage('lightMode', false)

export const createTaskAtom = atom((get) => ({
    title: get(titleAtom),
    description: get(descriptionAtom),
    subtasks: get(subTasksAtom),
    index: get(indexAtom)
  }))

  export const clearFieldsAtom = atom(
    () => '',
    (get, set) => {
      set(titleAtom, '')
      set(descriptionAtom, '')
      set(subTasksAtom, [{writing: '', completed: false}, {writing: '', completed: false}])
    }
  )