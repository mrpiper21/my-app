import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IUser {
    _id?: string,
    email: string,
    name: string,
    phoneNumber?: string
}

interface IUserStore {
    user: IUser | null,
    session: string | null,
    updateUser: (user: IUser) => void,
    updateSession: (session: string) => void,
    clearUserStore: () => void
}

export const useUserStore = create<IUserStore>()(
    persist(
        (set, get) => ({
            user: null,
            session: null,
            updateUser: (user) => {
                set({ user })
            },
            updateSession: (session: string) => {
                set({ session })
            },
            clearUserStore() {
                set({ user: null })
                set({ session: null })
            },
        }),
        {
            name: 'user-store',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)