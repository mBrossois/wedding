export interface Room {
    id: number,
    roomTitle: string,
    bookedBy?: number
    childBed?: boolean
    available?: boolean
    bookedDate?: string | Date
}