import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "src/firebase";

export interface UserProfile {
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserProfileInput = Omit<UserProfile, 'createdAt' | 'updatedAt'>;

export async function getUserProfile (user: User): Promise<UserProfile | null> {
  const maxAttempts = 3;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    attempts++;
    try {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      } else {
        // Profile doesn't exist
        return null;
      }
    } catch (error) {
      console.error(`Profile fetch attempt ${attempts} failed:`, error);
      // All attempts failed
      if (attempts === maxAttempts) return null;
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
    }
  }
  
  return null;
};

export async function createUserProfile (user: User, profile: UserProfileInput) {
  await setDoc(doc(db, "Users", user.uid), {
    email: profile.email,
    username: profile.username,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};
