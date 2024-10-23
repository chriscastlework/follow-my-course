"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { eBookFormSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import {
  createEBook,
  createEBookWithValidation,
} from "@/lib/actions/eBook.actions";
import FileUploader from "../FileUploader";
import { FormField } from "../ui/form";

const EBookForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof eBookFormSchema>>({
    resolver: zodResolver(eBookFormSchema),
    defaultValues: {
      name: "",
      file: [],
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (data: z.infer<typeof eBookFormSchema>) => {
    setIsLoading(true);
    await createEBookWithValidation({ file: data.file, name: data.name });
    setIsLoading(false);
    router.push(`/ebooks`);
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

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FileUploader fieldChange={field.onChange} mediaUrl="" />
          )}
        />
        {/* <div>
          <label>Upload File:</label>
          <input {...register("file")} type="file" name="file" />
          {errors.file && <span>This field is required</span>}
        </div> */}

        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </FormProvider>
  );
};

export default EBookForm;
