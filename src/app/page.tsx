import AuthScreen from "@/components/home/auth-screen/AuthScreen";
import HomeScreen from "@/components/home/home-screen/HomeScreen";
import { checkAuthStatus } from "./auth/callback/actions";

export default async function Home() {
	const { user } = await checkAuthStatus();
	return <main>{user ? <HomeScreen /> : <AuthScreen />}</main>;
}
