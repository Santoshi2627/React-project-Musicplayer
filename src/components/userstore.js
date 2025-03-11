import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { create } from "zustand";
import { auth, database } from "../components/firebasesetup";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: false,
  
  fetchUserInfo: async (uid) => {
    if (!uid) {
      console.log("No UID provided, resetting state.");
      return set({ currentUser: null, isLoading: false });
    }

    set({ isLoading: true });

    try {
      const docRef = doc(database, "usersdetails", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User found:", docSnap.data());
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        console.log("User document does not exist.");
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      set({ currentUser: null, isLoading: false });
    }
  },

  logoutUser: async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      set({ currentUser: null }); // Clear Zustand state
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));
