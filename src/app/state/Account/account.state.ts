import { AuthToken } from "../../shared/model/Account"

export interface AuthState{
    AuthToken: AuthToken | null
}

export const initialState: AuthState = {
    AuthToken: null
}
