import { serverSupabaseClient } from '#supabase/server'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const user = await serverSupabaseUser(event)
    const {data: response, status} = await client
        .from('Authentication')
        .select('role')
        .eq('email', user?.email)

    if(response && response.length === 1 ) {
        setResponseStatus(event, 200)
        return response[0].role

    }
        
    setResponseStatus(event, 500)
    return 'Something went wrong'
})