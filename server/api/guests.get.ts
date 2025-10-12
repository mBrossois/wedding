import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {email} = getQuery(event)
    const client = await serverSupabaseClient(event)

    try {
    if(email) {
        const {data: guestBook} = await client
            .from('Authentication')
            .select(`
                Guest_book ( 
                    id, 
                    is_coming, 
                    adults, 
                    children, 
                    free_room, 
                    auth_id, 
                    important_information 
                    ),
                email
            `)
            .eq('email', email)
             
        if(guestBook) {
            const {data: guests, status} = await client
            .from('Guests')
            .select(`
                id,
                first_name,
                last_name,
                is_adult
            `)
            .eq('guest_id', guestBook[0].Guest_book[0].id)
            
            setResponseStatus(event, 200)

            const formattedGuests = guests?.map(guest => {
                return {
                    id: guest.id, firstName: guest.first_name, lastName: guest.last_name, isAdult: guest.is_adult
                }
            })

            const formattedGuestBook = guestBook[0].Guest_book.map(guestBook => {
                return {
                    id: guestBook.id,
                    authId: guestBook.auth_id,
                    isComing: guestBook.is_coming,
                    isFreeRoom: guestBook.free_room,
                    importantInformation: guestBook.important_information,
                    guestAmounts: {
                        adults: guestBook.adults,
                        children: guestBook.children,
                        total: guestBook.children + guestBook.adults
                    },
                    guests: formattedGuests
                }
            })

            setResponseStatus(event, 200)
            return formattedGuestBook[0]
        }

        
    }
    } catch {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })