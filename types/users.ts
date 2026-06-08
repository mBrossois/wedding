export interface GetLetterCode {
    email: string,
}

export type Roles = undefined | RoleEnum.loggedIn | RoleEnum.admin | RoleEnum.anon
export enum RoleEnum {
    loggedIn = 'logged-in',
    admin = 'admin',
    anon = 'anon'
}