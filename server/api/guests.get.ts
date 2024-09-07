import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {email} = getQuery(event)
    const client = await serverSupabaseClient(event)
    
    if(email) {

        const {data, status} = await client
            .from('Guests')
            .select(`
                first_name, 
                last_name,
                Authentication!inner (email)
            `)
            .eq('Authentication.email', 'mark.dnb@live.nl')
                
        if(status === 200 && data && data.length > 0) {
            setResponseStatus(event, 200)
            return data.map(guest => {
                return {firstName: guest.first_name, lastName: guest.last_name}
            })
        }
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })