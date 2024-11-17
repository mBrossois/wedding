export interface GuestList {
    id: number,
    isComing: boolean,
    guests?: Array<Guest>,
    amounts?: Array<GuestsAmounts>
}

export interface Form {
    adults: Array<Guest>,
    children: Array<Guest>,
    rooms: Array<number>
}

export interface Guest {
    firstName: string,
    lastName: string,
}

export interface GuestsAmounts{
    adults: number,
    children: number,
    total: number
}

export type selectAmounts = Array<{
    value: string|number
    title: string,
    isActive: boolean
}>