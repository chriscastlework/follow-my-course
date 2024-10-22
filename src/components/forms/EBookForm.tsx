"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { eBookFormSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";

const EBookForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof eBookFormSchema>>({
    resolver: zodResolver(eBookFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (data: z.infer<typeof eBookFormSchema>) => {
    console.log("testing", data);
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("file", data.file[0]);

      const response = await fetch("/api/user", {
        method: "POST",
        body: formData,
      });

      //   if (ebook) {
      //     router.push(`/ebooks/${ebook.id}`);
      //   }
    } catch (error) {
      console.error("Failed to create ebook", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div>
          <label>Upload File:</label>
          <input {...register("file")} type="file" name="file" />
          {errors.file && <span>This field is required</span>}
        </div>
        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </FormProvider>
  );
};

export default EBookForm;
