import { serverSupabaseClient } from '#supabase/server'
import { Room } from '~/types/rooms'

export default defineEventHandler(async (event) => {
    const { importantInfo, guestBookId } = await readBody<{ importantInfo: string, guestBookId: number}>(event)

    const client = await serverSupabaseClient(event)
    try {
        await client
            .from('Guest_book')
            .update({ important_information: importantInfo })
            .eq('id', guestBookId)
            .select()

        setResponseStatus(event, 200)
        return 'Updated room'
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })