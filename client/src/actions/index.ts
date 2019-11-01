
export function login(email: string, password: string) {
    return {
        type: <const>'LOGIN_REQUESTED',
        email,
        password
    }
}

export function loginSuccess() {
    return {
        type: <const>'LOGIN_SUCCEEDED',
    }
}

export type Actions = ReturnType<
    typeof login |
    typeof loginSuccess
>
