"use client";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import { CldUploadWidget, CldVideoPlayer, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { createEbookAction } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const EbookTab = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	const [mediaUrl, setMediaUrl] = useState<string>("");

	const { toast } = useToast();

	const { mutate: createEbook, isPending } = useMutation({
		mutationKey: ["createEbook"],
		mutationFn: async () => createEbookAction({ title, description, price, mediaUrl }),
		onSuccess: () => {
			toast({
				title: "Ebook Uploaded",
				description: "Your ebook has been successfully uploaded",
			});
			setTitle("");
			setDescription("");
			setPrice("");
			setMediaUrl("");
		},
		onError: (error) => {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});

	return (
		<>
			<p className='text-3xl my-5 font-bold text-center uppercase'>
				<UnderlinedText className='decoration-wavy'>Upload</UnderlinedText> Ebook
			</p>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					createEbook();
				}}
			>
				<Card className='w-full max-w-md mx-auto'>
					<CardHeader>
						<CardTitle className='text-2xl'>New Post</CardTitle>
						<CardDescription>
							Share your exclusive Ebook with your audience.
						</CardDescription>
					</CardHeader>

					<CardContent className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='title'>Title</Label>
							<Input
								id='title'
								type='text'
								placeholder="Enter the ebook title"
								required
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='description'>Description</Label>
							<Textarea
								id='content'
								placeholder="This ebook will make you a pro in 30 days using our proven methods"
								required
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='price'>Price</Label>
							<Input
								id='priceMonth'
								type='number'
								required
								value={price}
								placeholder='9.99'
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>



						<Label>Media</Label>

						<CldUploadWidget
							signatureEndpoint={"/api/sign-image"}
							onSuccess={(result, { widget }) => {
								setMediaUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
								widget.close();
							}}
						>
							{({ open }) => {
								return (
									<Button onClick={() => open()} variant={"outline"} type='button'>
										Upload Media
									</Button>
								);
							}}
						</CldUploadWidget>

					</CardContent>

					<CardFooter>
						<Button className='w-full' type='submit' disabled={isPending}>
							{isPending ? "Creating Ebook..." : "Create Ebook"}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</>
	);
};
export default EbookTab;
