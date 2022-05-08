import { LINK } from './types';

export function goTo(link) {
  return {
    type: LINK,
    payload: link,
  };
}
