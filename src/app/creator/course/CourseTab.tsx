"use client";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createCourseAction } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const CourseTab = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>(""); // Handling as string for input
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [mediaUrl, setMediaUrl] = useState<string>("");

  const { toast } = useToast();

  const { mutate: createCourse, isPending } = useMutation({
    mutationKey: ["createcourse"],
    mutationFn: async () =>
      createCourseAction({
        title,
        description,
        price,
      }),
    onSuccess: () => {
      toast({
        title: "Course Created",
        description: "Your course has been successfully created",
      });
      setTitle("");
      setDescription("");
      setPrice("");
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

  if (isPending) return <Loader2 className="animate-spin" />;

  return (
    <>
      <p className="text-3xl my-5 font-bold text-center uppercase">
        <UnderlinedText className="decoration-wavy">Share</UnderlinedText>{" "}
        course
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCourse();
        }}
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">New Course</CardTitle>
            <CardDescription>
              Share your course with exclusive content and pricing.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter the course title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter the course description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priceYear">Price (Year)</Label>
              <Input
                id="priceYear"
                type="number"
                placeholder="Enter the yearly price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Creating course..." : "Create Course"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default CourseTab;
