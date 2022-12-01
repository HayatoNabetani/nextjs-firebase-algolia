import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { auth, db } from "../firebase/client";
import { User } from "../types/user";

type ContextType = {
    fbUser: FirebaseUser | null | undefined;
    isLoading: boolean;
    user: User | null | undefined;
};
const AuthContext = createContext<ContextType>({
    fbUser: undefined,
    isLoading: true,
    user: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>();
    const [fbUser, setFbUser] = useState<FirebaseUser | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let unsubscribe: Unsubscribe;
        // ログインしていれば、正しくログインにする
        onAuthStateChanged(auth, (firebaseUser) => {

            // 監視員がいる場合は、止める
            unsubscribe?.();//存在するなら、実行

            setFbUser(firebaseUser);
            
            if (firebaseUser) {
                setIsLoading(true);
                const ref = doc(db, `users/${firebaseUser.uid}`);
                unsubscribe = onSnapshot(ref, (snap) => {
                    //データを監視し続ける,監視員をメモリに入れる => メモリリークが起きる => 監視員を外す
                    setUser(snap.data() as User);
                    setIsLoading(false);
                });
            } else {
                setUser(null);
                setIsLoading(false);
            }
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                fbUser,
                isLoading,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
