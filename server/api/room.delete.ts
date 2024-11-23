import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { roomId } = await readBody<{roomId: number}>(event)
    const client = await serverSupabaseClient(event)

    try {
        await client
            .from('Rooms')
            .delete()
            .eq('id', roomId)
        
        setResponseStatus(event, 200)
        return 'Deleted room'
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
})