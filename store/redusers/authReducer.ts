import { SET_USER, CLEAR_USER } from '../actions/authActions';
import { User } from "firebase/auth";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;