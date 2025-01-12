import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const {data: guestBook} = await client
        .from('Guest_book')
        .select(`
                is_coming,
                adults,
                children,
                free_room
            `)

    const {data: rooms} = await client
        .from('Rooms')
        .select('booked_by')
    
            
    if(guestBook && rooms) {
        const guestComing = guestBook.filter(guest => guest.is_coming).length
        const guestNotComing = guestBook.filter(guest => guest.is_coming === false).length
        const guestComingNotAnswered = guestBook.filter(guest => guest.is_coming === null).length
        
        const {adults, children} = guestBook.reduce((acc, cur) => {
            if(cur.is_coming) {
                acc.adults += Number(cur.adults)
                acc.children += Number(cur.children)
            }
            return acc
        }, {adults: 0, children: 0})

        const roomsBooked = rooms.filter(room => room.booked_by).length
        const roomsAvailable = rooms.filter(room => !room.booked_by).length



        setResponseStatus(event, 200)
        return {coming: guestComing, notComing: guestNotComing, notAnswered: guestComingNotAnswered, adults, children, roomsBooked, roomsAvailable}
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })