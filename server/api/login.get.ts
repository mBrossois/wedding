import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {letterCode, email} = getQuery(event)
    const client = await serverSupabaseClient(event)

    let newUser = false
    
    if(letterCode && email) {

        const {data, status} = await client
            .from('Authentication')
            .select('email')
            .eq('letter_code', letterCode)

        if(status === 200 && data && data.length === 1 && !data[0].email) {
            newUser = !data[0].email
            const { data: emailResponse, error } = await client
                .from('Authentication')
                .update({ email: email})
                .eq('letter_code', letterCode)
                .select()

            if(emailResponse) {
                setResponseStatus(event, 200)
                return 'New user'    
            }
        }
    }
    
    if(email && !newUser) {
        const {data: response, status} = await client
            .from('Authentication')
            .select('email')
            .eq('email', email.toLowerCase())

        if(response && response.length !== 1 ) {
            setResponseStatus(event, 500)
            return 'Something went wrong'
        }
    }

    setResponseStatus(event, 200)
    return 'Login'
  })