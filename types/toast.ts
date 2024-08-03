export interface Toast {
    type: 'error' | 'info',
    message: string
}

export interface Toaster {
    id: number,
    state: 'appear' | 'disappear'
    toast: Toast
}