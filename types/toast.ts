export interface Toast {
    type: 'error' | 'info' | 'success',
    message: string
}

export interface Toaster {
    id: number,
    state: 'appear' | 'disappear'
    toast: Toast
}