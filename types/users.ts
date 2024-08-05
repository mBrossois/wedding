export interface GetLetterCode {
    auth_id: string,
    letter_code: string
}

export type Confirmation =  'creation' | 'forgotten' | undefined