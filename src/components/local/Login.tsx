import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import axios from "axios"
import { toast } from "react-toastify";

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
import { Separator } from "../ui/separator"
import { Github, Mail, Facebook } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations';




export function Login() {

    const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);


    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username can not be empty",
        }),
        password: z.string().min(1, {
            message: "Password can not be empty",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        debugger

       


        login({
            variables: {
                username: values.username,
                password: values.password,
            },
        });
        // After a successful mutation, the 'data' object will be populated.
    
    };

    if (data && data.login.token && data.login.error==="N/A") {
        // Store the token in localStorage for session management
        localStorage.setItem('authToken', data.login.token);
        console.log('Login successful! Token:', data.login.token);
        // Here you would typically redirect the user or update the UI
        // e.g., window.location.href = '/dashboard';
        toast("Login sucessfull")
       
    }
    else if (data && data.login.token ==="N/A") {
        // Store the token in localStorage for session management
       
        console.log('Login Unsuccessful! Token:');
        // Here you would typically redirect the user or update the UI
        // e.g., window.location.href = '/dashboard';
        toast("Login failed : Invalid Credentials")
       
    }

    if(error){
        debugger
        console.log(error)
    }
    





    return (
        <div className="w-full h-[100vh] flex justify-center items-center">


            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
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
                                <Button type="submit">Submit</Button>
                            </div>

                        </form>
                    </Form>

                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <div className="flex gap-2">
                        <Github className="cursor-pointer" />

                        <Separator orientation="vertical" />

                        <Mail className="cursor-pointer" />

                        <Separator orientation="vertical" />

                        <Facebook className="cursor-pointer" />
                    </div>
                    <span>Don't have an account ?<Button variant={"link"}>Sign up</Button></span>
                </CardFooter>
            </Card>
        </div>
    )
}