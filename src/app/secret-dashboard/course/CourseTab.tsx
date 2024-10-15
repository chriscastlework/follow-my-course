"use client";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import { CldUploadWidget, CldVideoPlayer, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { createCourseAction } from "../actions";
import { useToast } from "@/components/ui/use-toast";

const CourseTab = () => {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [priceYear, setPriceYear] = useState<string>(""); // Handling as string for input
	const [priceMonth, setPriceMonth] = useState<string>(""); // Handling as string for input
	const [isArchived, setIsArchived] = useState<boolean>(false);
	const [mediaType, setMediaType] = useState<"video" | "image">("video");
	const [mediaUrl, setMediaUrl] = useState<string>("");

	const { toast } = useToast();

	const { mutate: createCourse, isPending } = useMutation({
		mutationKey: ["createcourse"],
		mutationFn: async () =>
			createCourseAction({
				title,
				description,
				priceYear: priceYear,
				priceMonth: priceMonth
			}),
		onSuccess: () => {
			toast({
				title: "Course Created",
				description: "Your course has been successfully created",
			});
			setTitle("");
			setDescription("");
			setPriceYear("");
			setPriceMonth("");
			setIsArchived(false);
			setMediaUrl("");
		},
		onError: (error) => {
			toast({
				title: "Error",
				description: (error as Error).message,
				variant: "destructive",
			});
		},
	});

	return (
		<>
			<p className='text-3xl my-5 font-bold text-center uppercase'>
				<UnderlinedText className='decoration-wavy'>Share</UnderlinedText> course
			</p>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					createCourse();
				}}
			>
				<Card className='w-full max-w-md mx-auto'>
					<CardHeader>
						<CardTitle className='text-2xl'>New Course</CardTitle>
						<CardDescription>Share your course with exclusive content and pricing.</CardDescription>
					</CardHeader>

					<CardContent className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='title'>Title</Label>
							<Input
								id='title'
								type='text'
								placeholder="Enter the course title"
								required
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='description'>Description</Label>
							<Textarea
								id='description'
								placeholder="Enter the course description"
								required
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='priceYear'>Price (Year)</Label>
							<Input
								id='priceYear'
								type='number'
								placeholder="Enter the yearly price"
								required
								value={priceYear}
								onChange={(e) => setPriceYear(e.target.value)}
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='priceMonth'>Price (Month)</Label>
							<Input
								id='priceMonth'
								type='number'
								placeholder="Enter the monthly price"
								required
								value={priceMonth}
								onChange={(e) => setPriceMonth(e.target.value)}
							/>
						</div>
x
					</CardContent>

					<CardFooter>
						<Button className='w-full' type='submit' disabled={isPending}>
							{isPending ? "Creating course..." : "Create Course"}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</>
	);
};

export default CourseTab;
