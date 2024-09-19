import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    const { error } = await client.auth.signOut()
    if (error) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }

    setResponseStatus(event, 200)
    return 'Logged out'
  })