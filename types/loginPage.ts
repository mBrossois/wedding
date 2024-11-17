export interface Login {
    title: Title,
    page: 'login' | 'create'
}

export interface Title {
    title: string,
    heading: string
}