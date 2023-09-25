import { auth, db } from '../../config/firebase';

export const listenToAuthChanges = (callback) => {
  const unsubscribe = auth.onIdTokenChanged(async (user) => {
    if (user) {
      const isAdmin = await checkUserIsAdmin(user);
      console.log(isAdmin ? "admin" : "user"); // Log "admin" or "user" based on isAdmin
      callback(user, isAdmin);
    } else {
      callback(null, false);
    }
  });

  return unsubscribe;
};

// Function to check if the user is an admin
async function checkUserIsAdmin(user) {
  return user.email === 'flexihirenepal@gmail.com';
}
