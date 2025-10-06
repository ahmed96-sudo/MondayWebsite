"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter(); // Initialize the router hook
    const [formData, setFormData] = useState({
            email: "",
            password: "",
        });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Send data to the Next.js API route
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                // Send the email and password as JSON in the request body
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.status == 200) {
                // Success: Handle successful login (e.g., redirect user)
                alert("Login successful! Please wait while we redirect you.");
                window.location.href = '/dashboard';
                // router.push('/dashboard');
            } else {
                // Error: Display the error message from the API
                alert(`Login Failed: ${data.message || 'Invalid credentials'}`);
            }
        } catch (error) {
            console.error('Submission Error:', error);
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
        // setTimeout(() => {
        //     alert("Login successful! Please wait while we redirect you.");
        //     window.location.href = '/dashboard';
        //     setIsLoading(false);
        // }, 2000);
        /* try {
            const response = await fetch('/backend/posts.php?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                // nav("/dashboard");
                window.location.href = '/';
                setIsLoading(false);
            } else {
                setIsLoading(false);
                toast({
                    title: "Login Failed",
                    description: data.message
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Login error:", error);
            toast({ title: "Network Error", description: "Could not connect to the server." });
        } */
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-white border text-black hover:text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    {/* <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Forgot your password?{" "}
                            <Link to={'/reset-password'} reloadDocument>
                                <button
                                    type="button"
                                    className="text-primary hover:underline font-medium"
                                >
                                    Reset it here
                                </button>
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            <Link to={'/'} reloadDocument>
                                <button
                                    type="button"
                                    className="text-primary hover:underline font-medium"
                                >
                                    Return to the Home Page
                                </button>
                            </Link>
                        </p>
                    </div> */}
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;