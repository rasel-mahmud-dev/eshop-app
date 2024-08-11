
import { getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig.js";

const db = getFirestore(app)

export default db;
