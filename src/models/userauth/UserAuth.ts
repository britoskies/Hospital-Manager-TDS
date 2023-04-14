// Firebase App
import app from '../../services/firebase/firebase';

// Firebase Classes
import { FirebaseError } from 'firebase/app'

// Auth Hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';


const UserAuth = {
    _auth: getAuth(app),

    async authUser(email: string, password: string) {
        const result: UserCredential | FirebaseError | any = await signInWithEmailAndPassword(this._auth, email, password)
            .then((res: UserCredential) => res)
            .catch((err: FirebaseError) => err);

        if (result.user) {
            return true
        } else {
            return false
        }
    },

    getAuthState() {
        return useAuthState(this._auth);
    },

    signOut() {
        this._auth.signOut()
    }
}

export default UserAuth