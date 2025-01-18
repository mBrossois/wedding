import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const {data: authList} = await client
        .from('Authentication')
        .select(`
            id,
            letter_code
        `)

    const {data: guestBook} = await client
        .from('Guest_book')
        .select(`
            id,
            auth_id
        `)

    const {data: guests} = await client
        .from('Guests')
        .select(`
            guest_id,
            first_name,
            last_name
        `)

    if(authList && guestBook && guests) {
        const reponseObject = authList.map(auth => {
            const guestIds = guestBook.find(guestB => guestB.auth_id === auth.id)
            if(guestIds) {
                const names = guests.filter(guest => guest.guest_id === guestIds.id)
                const namesOnly = names.map(name => name.first_name + ' ' + name.last_name)
                return {lettercode: auth.letter_code, guests: namesOnly }
            }
            return
        })

        setResponseStatus(event, 200)
        return reponseObject
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })