
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import type {  FieldValues, UseFormReturn, Path } from "react-hook-form"

interface ComboBoxItemProps{
    value:string|undefined
    label:string
}

interface ComboBoxInputProps<T extends FieldValues = FieldValues> {
    items: ComboBoxItemProps[];
    name: Path<T>;
    formControl: UseFormReturn<T>;
    formDescription?: string;
    label?: string;
}



export default function ComboBoxInput<T extends FieldValues = FieldValues>({
    items,
    formControl,
    formDescription,
    name,
    label
}:ComboBoxInputProps<T>) {
  

  return (
    <FormField
          control={formControl.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? items.find(
                            (item) => item.value === field.value
                          )?.label
                        : ""}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No entries found.</CommandEmpty>
                      <CommandGroup>
                        {items.map((item) => (
                          <CommandItem
                            value={item.label}
                            key={item.value}
                            onSelect={() => {
                              if (item.value !== undefined) {
                                formControl.setValue(name, item.value as import("react-hook-form").PathValue<T, typeof name>)
                              }
                            }}
                          >
                            {item.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                item.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                    {formDescription}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}