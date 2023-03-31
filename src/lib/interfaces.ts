import { Request } from 'express'

export interface User {
    fullName: string,
    password: string,
    email: string,
    numberPhone: string,
    age: number,
    roleId: 1 | 2 | 3
}

export interface ExtReq extends Request {
    user: User
}