
export interface UserParams  {
    userParams: {
        email:string;
        password:string
    }
}

export interface ErrorObject {
    code: number
    message: string
}

export interface UserObj {
    id: string;
    name: string | null;
    email: string;
}

export interface CatchResObj {
    code: number
    message: string | undefined
}

export interface LogInReqBody {
    email: string
    password: string
}
