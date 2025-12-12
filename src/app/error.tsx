"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
			<button
				onClick={() => reset()}
				className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
			>
				Try again
			</button>
		</div>
	);
}

