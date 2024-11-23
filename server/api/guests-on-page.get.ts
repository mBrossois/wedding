import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {page} = getQuery<{page: number}>(event)

    const client = await serverSupabaseClient(event)
    const allGuests = []
    const {data: guestBook} = await client
        .from('Guest_book')
        .select('*')
        .range(20 * page, 20 * page + 19)
            
    if(guestBook) {
        for(const guestGroup of guestBook) {
            const {data: guest, status} = await client
            .from('Guests')
            .select(`
                first_name,
                last_name
            `)
            .eq('guest_id', guestGroup.id)
            .limit(1)

            allGuests.push({attendanceData: guestGroup, name: guest[0].first_name + ' ' + guest[0].last_name})
        }
        
        setResponseStatus(event, 200)
        return allGuests
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })