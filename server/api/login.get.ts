import { GetLetterCode } from '~/types/users'

export default defineEventHandler(async (event) => {
    const {letterCode, email} = getQuery(event)
    const db = hubDatabase()
    let newUser = false
    
    if(letterCode) {
        const stmtLetterCode = await db
            .prepare('SELECT Email FROM Users WHERE LetterCode = ?1')
            .bind(letterCode)
            .all()
        
        if(stmtLetterCode.results.length === 1) {
            newUser = !stmtLetterCode.results[0].Email    
        }
    }

    if(newUser) {
        const result = await db
            .prepare('UPDATE Users SET Email = ?1 WHERE LetterCode = ?2 ')
            .bind(email, letterCode)
            .run()
    }

    setResponseStatus(event, 200)
    return ''

    // setResponseStatus(event, 500)
    // return 'Something went wrong'
  })