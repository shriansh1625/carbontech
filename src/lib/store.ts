import { create } from 'zustand';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { UserProfile } from './types';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  fetchProfile: (uid: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  logout: async () => {
    if (auth) await signOut(auth);
    set({ user: null, profile: null });
  },
  fetchProfile: async (uid: string) => {
    if (!db) return;
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (docSnap.exists()) {
      set({ profile: docSnap.data() as UserProfile });
    }
  },
}));

// Initialize auth listener
if (typeof window !== 'undefined' && auth) {
  onAuthStateChanged(auth, async (user) => {
    const store = useAuthStore.getState();
    store.setUser(user);
    if (user) {
      await store.fetchProfile(user.uid);
    } else {
      store.setProfile(null);
    }
    store.setLoading(false);
  });
}
