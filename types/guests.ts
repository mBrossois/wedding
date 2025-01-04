export interface GuestList {
    id: number,
    authId: number,
    isComing: boolean,
    isFreeRoom?: boolean
    guests?: Array<Guest>,
    amounts?: GuestsAmounts
}

export interface Form {
    adults: Array<Guest>,
    children: Array<Guest>,
    rooms: Array<GuestRoom>
    isComing: boolean,
    isFreeRoom: boolean
}

export interface Guest {
    id?: number,
    firstName: string,
    lastName: string,
    isAdult?: boolean
}

export interface GuestRoom {
    id: number,
    childBed: boolean,
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