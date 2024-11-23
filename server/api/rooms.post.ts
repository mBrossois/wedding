import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { name, amountOfPeople, timesCreate } = await readBody<{ 
        name: string,
        amountOfPeople: number,
        timesCreate: number}>(event)

    const client = await serverSupabaseClient(event)

    try {
        const rooms = []
        for(let i = 0; i < timesCreate; i++) {
            rooms.push({
                amount_people: amountOfPeople,
                room_title: name,
            })
        }

        const {status: roomStatus} = await client
        .from('Rooms')
        .insert(rooms)
        .select()

        if(roomStatus === 201) {
            setResponseStatus(event, 200)
            return 'Added rooms'
        }
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })