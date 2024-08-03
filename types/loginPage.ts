export interface Login {
    title: Title,
    page: 'login' | 'create' | 'passwordForgotten' | 'passwordReset'
}

export interface Title {
    title: string,
    heading: string
}