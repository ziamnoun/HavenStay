import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  return function ProtectedRoute(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.replace("/LogIn"); // লগড ইন না থাকলে LogIn পেজে পাঠিয়ে দেবে
      }
    }, [status, router]);

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    return session ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
