// Utils
import { getUserId } from '../utils';

export const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      }

      return null;
    }
  }
};
