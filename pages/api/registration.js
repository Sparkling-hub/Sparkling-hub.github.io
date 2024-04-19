

export default async function registerWithEmailAndPassword (email, password) {
    try {
        const existingUser = await admin.auth().getUserByEmail(email);
        if (existingUser) {
            throw new Error('A user with the same email address already exists');
        }

   
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
        });

      return userRecord;
    } catch (error) {
  
    }
  };
  
  