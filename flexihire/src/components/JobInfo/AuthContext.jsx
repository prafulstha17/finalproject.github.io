import { auth } from '../../config/firebase';

export const listenToAuthChanges = (callback) => {
  const unsubscribe = auth.onIdTokenChanged((user) => {
    callback(user);
  });

  return unsubscribe;
};
