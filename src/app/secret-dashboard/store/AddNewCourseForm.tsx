"use client";
import RotatedText from "@/components/decorators/RotatedText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { createCourseAction } from "../actions";
import { useToast } from "@/components/ui/use-toast";

const AddNewCourseForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priceYear, setPriceYear] = useState("");
	const [priceMonth, setPriceMonth] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { mutate: createCourse, isPending } = useMutation({
		mutationKey: ["createCourse"],
		mutationFn: async () => await createCourseAction({ title, description, priceYear, priceMonth }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCourses"] });
			toast({
				title: "Course Added",
				description: "The course has been added successfully",
			});

			setTitle("");
			setDescription("");
			setPriceYear("");
			setPriceMonth("");
			setImageUrl("");
		},
	});

	return (
		<>
			<p className='text-3xl tracking-tighter my-5 font-medium text-center'>
				Add <RotatedText>New</RotatedText> Course
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
						<CardDescription>Add a new course to your platform. Select only one image.</CardDescription>
					</CardHeader>

					<CardContent className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='title'>Title</Label>
							<Input
								id='title'
								type='text'
								placeholder='Course Title'
								required
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='description'>Description</Label>
							<Input
								id='description'
								type='text'
								required
								value={description}
								placeholder='Course description'
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='priceYear'>Price (Year)</Label>
							<Input
								id='priceYear'
								type='number'
								required
								value={priceYear}
								placeholder='99.99'
								onChange={(e) => setPriceYear(e.target.value)}
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='priceMonth'>Price (Month)</Label>
							<Input
								id='priceMonth'
								type='number'
								required
								value={priceMonth}
								placeholder='9.99'
								onChange={(e) => setPriceMonth(e.target.value)}
							/>
						</div>

						<CldUploadWidget
							signatureEndpoint={"/api/sign-image"}
							onSuccess={(result, { widget }) => {
								setImageUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
								widget.close();
							}}
						>
							{({ open }) => {
								return (
									<Button onClick={() => open()} variant={"outline"} type='button'>
										Upload an Image
									</Button>
								);
							}}
						</CldUploadWidget>

						{imageUrl && (
							<div className='flex justify-center relative w-full h-96'>
								<Image fill src={imageUrl} alt='Course Image' className='rounded-md object-contain' />
							</div>
						)}
					</CardContent>
					<CardFooter>
						<Button className='w-full' type='submit' disabled={isPending}>
							{isPending ? "Adding..." : "Add Course"}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</>
	);
};
export default AddNewCourseForm;
