export interface Login {
    title: Title,
    page: 'login' | 'create'
    status: 'success' | 'loading' 
}

export interface Title {
    title: string,
    heading: string
    isLarge?: boolean
}