import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { roomId, room_title, amount_people } = await readBody<{roomId: number, room_title: number, amount_people: number}>(event)

    const client = await serverSupabaseClient(event)
    console.log('put m away')
    try {
        await client
            .from('Rooms')
            .update({
                room_title,
                amount_people
            })
            .eq('id', roomId)
            .select()
        
        setResponseStatus(event, 200)
        return 'Updated room'
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })