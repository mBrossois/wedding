import { serverSupabaseClient } from '#supabase/server'
import { Form } from '~/types/guests'

export default defineEventHandler(async (event) => {
    const { form, guest_book_id } = await readBody<{form: Form, guest_book_id: number}>(event)

    const client = await serverSupabaseClient(event)

    try {
        const allEntries = [
            ...form.adults.map(adult => {return {first_name: adult.firstName, last_name: adult.lastName, is_adult: true, guest_id: guest_book_id}}),
            ...form.children.map(adult => {return {first_name: adult.firstName, last_name: adult.lastName, is_adult: false, guest_id: guest_book_id}})
        ]

        const {data} = await client
            .from('Guests')
            .delete()
            .eq('guest_id', guest_book_id)

        
        await client
            .from('Guests')
            .insert(allEntries)
            .select()

        await client
            .from('Guest_book')
            .update({
                adults: form.adults.length,
                children: form.children.length,
                rooms: form.room
            })
            .eq('id', guest_book_id)
            .select()
        
        setResponseStatus(event, 200)
        return 'Updated guests'
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })