export interface GetLetterCode {
    email: string,
}

export type Roles = undefined | RoleEnum.loggedIn | RoleEnum.admin
export enum RoleEnum {
    loggedIn = 'logged-in',
    admin = 'admin'
}