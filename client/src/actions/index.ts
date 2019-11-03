


export enum ActionTypes {
    LoginRequested = "LoginRequested",
    LoginSucceded = "LoginSucceded",
    RegisterUser = "RegisterUser",
}


export function register(email: string, password: string) {
    return {
        type: <const>ActionTypes.RegisterUser,
        email,
        password
    }
}

export function login(email: string, password: string) {
    return {
        type: <const>ActionTypes.LoginRequested,
        email,
        password
    }
}

export function loginSuccess() {
    return {
        type: <const>ActionTypes.LoginSucceded,
    }
}

export type Actions = ReturnType<
    typeof login |
    typeof loginSuccess
>
