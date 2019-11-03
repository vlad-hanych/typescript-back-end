import { Actions, ActionTypes } from "../actions";

type LoginState = { name: string };

const loggedInUser = (state: LoginState | null = null, action: Actions): LoginState | null => {
    switch (action.type) {
        case ActionTypes.LoginSucceded:
            return {
                name: ''
            };
    }
    return state;
};

export default loggedInUser;