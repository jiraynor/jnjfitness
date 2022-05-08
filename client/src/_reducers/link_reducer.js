import { LINK } from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case LINK:
      return { ...state, link: action.payload };
    default:
      return state;
  }
}
