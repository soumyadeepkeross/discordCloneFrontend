import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"




import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import ComboBoxInput from "../Custom/ComboBox";
import {SIGNUP_MUTATION} from "../../graphql/mutations"
import { useMutation } from "@apollo/client"
import { toast } from "react-toastify"

function Signup() {
    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username can not be empty",
        }),
        password: z.string().min(1, {
            message: "Password can not be empty",
        }),
        cnfpassword: z.string().min(1, {
            message: "Confirm Password can not be empty",
        }),
        role: z.string({
            required_error: "Please select a Role.",
        }),
    }).refine((data) => data.password === data.cnfpassword, {
        message: "Password and Confirm Password should match",
        path: ["cnfpassword"],
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })

    const [signup,{data}] = useMutation(SIGNUP_MUTATION);


    function onSubmit(values: z.infer<typeof formSchema>) {
        debugger

       


        signup({
            variables: {
                username: values.username,
                password: values.password,
                role:values.role
            },
        });
        // After a successful mutation, the 'data' object will be populated.
    
    };

    if (data && data.signup.status == "OK") {
        // Store the token in localStorage for session management
       
        // Here you would typically redirect the user or update the UI
        // e.g., window.location.href = '/dashboard';
        toast("signup sucessfull")
       
    }
    





    return (
        <div className="w-full h-[100vh] flex justify-center items-center">


            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create your new account</CardTitle>
                    <CardDescription>
                        Enter necessary details to create a new account
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="example@example.com" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="....." {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                 <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="cnfpassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="....." {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                 <div className="grid gap-2">
                                    
                                                   <ComboBoxInput 
                                                        items={[
                                                            {
                                                                label: "ADMIN",
                                                                value: "ADMIN"
                                                            },
                                                            {
                                                                label: "SUPERADMIN",
                                                                value: "SUPERADMIN"
                                                            }
                                                        ]}
                                                        name="role"
                                                        formControl={form}  
                                                        label="Select Role"                                                  
                                                   />
                                               
                                        
                                </div>
                                <Button type="submit">Submit</Button>
                            </div>

                        </form>
                    </Form>

                </CardContent>
               
            </Card>
        </div>
    )
}

export default Signup

