import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {page} = getQuery<{page: number}>(event)

    const client = await serverSupabaseClient(event)
    const allGuests = []
    const {data: guestBook} = await client
        .from('Guest_book')
        .select(`
            *,
            Guests ( 
                first_name, 
                last_name
                )
            `)
        .range(20 * page, 20 * page + 19)
            
    if(guestBook) {
        for(const guestGroup of guestBook) {
            allGuests.push({attendanceData: guestGroup, name: guestGroup.Guests[0]?.first_name + ' ' + guestGroup.Guests[0]?.last_name})
        }
        
        setResponseStatus(event, 200)
        return allGuests
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })