import { serverSupabaseClient } from '#supabase/server'

function combineToString(arr: string) {
    return `="${arr}"`
}

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const {data: guestBook} = await client
        .from('Guest_book')
        .select(`
            id,
            free_room,
            important_information,
            auth_id
        `)
        .eq('is_coming', true)

    const guestIds = guestBook?.reduce((accumulator, currentValue) => {
        accumulator.push(currentValue.id)
        return accumulator
    },
        []
    )

    const authIds = guestBook?.reduce((accumulator, currentValue) => {
        accumulator.push(currentValue.auth_id)
        return accumulator
    },
        []
    )

    if(guestBook) {
        const {data: guests} = await client
            .from('Guests')
            .select(`
                guest_id,
                first_name,
                last_name,
                is_adult
                `)
            .in('guest_id', guestIds)
            
        const {data: rooms} = await client
            .from('Rooms')
            .select(`
                booked_by,
                room_title,
                child_bed
                `)
            .in('booked_by', authIds)

        const reponseObject = guestBook.map(guest => {
            const guestsDetails = guests?.filter(guestDetails => guestDetails.guest_id === guest.id)
            const roomDetails = rooms?.filter(room => room.booked_by === guest.auth_id)
            const firstNames = guestsDetails?.map( guestDetail => guestDetail.first_name)
            const lastNames = guestsDetails?.map( guestDetail => guestDetail.last_name)
            const areAdults = guestsDetails?.map( guestDetail => guestDetail.is_adult)
            const roomTitles = roomDetails?.map(roomDetail => roomDetail.room_title)
            const childBeds = roomDetails?.map(roomDetail => roomDetail.child_bed)

            return [
                combineToString(firstNames?.join('"&char(10)&"')),
                combineToString(lastNames?.join('"&char(10)&"')),
                combineToString(areAdults?.join('"&char(10)&"')),
                combineToString(roomTitles?.join('"&char(10)&"')),
                combineToString(childBeds?.join('"&char(10)&"')),
                guest.free_room,
                guest.important_information,
            ]
        })

        setResponseStatus(event, 200)
        return reponseObject
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })