export interface GuestList {
    id: number,
    isComing: boolean,
    guests?: Array<Guest>,
    amounts?: Array<GuestsAmounts>
}

export interface Guest {
    id: number,
    firstName: string,
    lastName: string,
    isAdult: boolean
}

export interface GuestsAmounts{
    adults: number,
    children: number,
    total: number
}