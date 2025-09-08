import {
  UseFormReturn,
  FieldValues,
  Path,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface CustomFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  type: string;
  details?:string;
  phone?:string;
  city?:string,
  


}

export default function CustomFormField<T extends FieldValues>({
  form,
  name,
  label,
  type,
}: CustomFormFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="my-4 ">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} placeholder={label}  className="py-6"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
