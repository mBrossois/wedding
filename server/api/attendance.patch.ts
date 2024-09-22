import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { email, attendance } = await readBody(event)
    const client = await serverSupabaseClient(event)

    if(email) {

        const {data, status} = await client
            .from('Guest_book')
            .update({ is_coming: attendance })
            .eq('Authentication.email', email)
            .select()

            if(data) {
                setResponseStatus(event, 200)
                return 'Updated attendance'
            }
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })