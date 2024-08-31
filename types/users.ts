export interface GetLetterCode {
    auth_id: string,
    letter_code: string
}

export type Roles = undefined | RoleEnum.loggedIn | RoleEnum.admin
export enum RoleEnum {
    loggedIn = 'logged-in',
    admin = 'admin'
}