import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBROEMov-3HdnijE1y47IWV0sSQoa8DNRo",
  authDomain: "bredibe-tp3-quests-tracker.firebaseapp.com",
  projectId: "bredibe-tp3-quests-tracker",
  storageBucket: "bredibe-tp3-quests-tracker.appspot.com",
  messagingSenderId: "671497400822",
  appId: "1:671497400822:web:aa315be198c214da7717d7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(
      collection(db, "aventuriers"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "aventuriers"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        quests: [],
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithGitHub = async () => {
  try {
    const res = await signInWithPopup(auth, gitHubProvider);
    const user = res.user;
    const q = query(
      collection(db, "aventuriers"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "aventuriers"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "gitHub",
        email: user.email,
        quests: [],
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "aventuriers"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      quests: [],
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithGitHub,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
