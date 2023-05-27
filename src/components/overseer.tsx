import { useUser, User, useSupabaseClient } from '@supabase/auth-helpers-react'
import { api } from '~/utils/api'
import AuthContext from './auth_context'
import Login from '~/pages/login'
import ThemeContext, { initialTheme } from './theme_context'

const Overseer = (props: {
    children: React.ReactNode
}) => {
    const user = useUser() as User
    const { data, isLoading } = api.user.isAdmin.useQuery()
    const supabaseClient = useSupabaseClient()
    
    if (!user) {
        return <Login/>
    }
    if (isLoading) {
        return <div className='text-white'>loading</div>
    }
    if (!data) {
        return <div className='text-white'>error/voce não é um administrador<button onClick={() => void supabaseClient.auth.signOut()} className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Sair</button></div>
    }
    
    return <>
        <ThemeContext.Provider value={initialTheme}>
            <AuthContext.Provider value={
                {
                    id: user.id,
                    isAdmin: data,
                    email: user.email as string
                }
            }>
                {props.children}
            </AuthContext.Provider>
        </ThemeContext.Provider>
    </>
}

export default Overseer;
