import { serverSupabaseClient } from '#supabase/server'
import { GetLetterCode } from '~/types/users'

export default defineEventHandler(async (event) => {
    const lettercode = getRouterParam(event, 'lettercode')

    if(lettercode) {
        const client = await serverSupabaseClient(event)

        const {data, status} = await client
            .from('Guests')
            .select('letter_code, auth_id')
            .eq('letter_code', lettercode)
        if(status === 200 && data && data.length === 1) {
            const responseData: GetLetterCode = data as unknown as GetLetterCode

            setResponseStatus(event, 200)
            if(!responseData.auth_id) {
                return 'create_account'
            } else {
                return 'login'
            }
        } else {
            setResponseStatus(event, 404)
            return 'Could not find your code'
        }
        
    }
    setResponseStatus(event, 500)
    return 'Something went wrong'
  })