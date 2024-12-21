import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { id, attendance } = await readBody(event)
    const client = await serverSupabaseClient(event)

    if(id) {
        const {data, status} = await client
            .from('Guest_book')
            .update({ is_coming: attendance === 'yes' ? true : false })
            .eq('id', id)
            .select()

            if(status === 200) {
                setResponseStatus(event, 200)
                return 'Updated attendance'
            }
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })