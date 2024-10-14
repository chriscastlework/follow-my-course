"use client";
import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";


const AuthButtons = () => {
	const [loading, setLoading] = useState(false);
	const [redirectUrl, setRedirectUrl] = useState<string>('');
	const searchParams = useSearchParams();

	useEffect(() => {
		const redirectUrl = searchParams.get("redirectUrl");
		if (redirectUrl) setRedirectUrl(redirectUrl);
	}, [searchParams]);

	return (
		<div className='flex gap-3 flex-1 md:flex-row flex-col'>
			<RegisterLink className='flex-1' onClick={() => setLoading(true)} postLoginRedirectURL={`${process.env.NEXT_PUBLIC_BASE_URL}${redirectUrl}`}>
				<Button className='w-full' variant={"outline"} disabled={loading}>
					Sign up
				</Button>
			</RegisterLink>
			<LoginLink className='flex-1' onClick={() => setLoading(true)} postLoginRedirectURL={redirectUrl}>
				<Button className='w-full' disabled={loading}>
					Login
				</Button>
			</LoginLink>
		</div>
	);
};

const AuthButtonsWithSuspense = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AuthButtons />
		</Suspense>
	);
};

export default AuthButtonsWithSuspense;
