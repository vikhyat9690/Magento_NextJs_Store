'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [form, setForm] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: ''
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async () => {
        try {
            console.log(form);
            await axios.post('/api/magento/auth/register', form);
            toast.success('You registered successfully!');
            router.push('/auth/login');
        } catch (err: any) {
            toast.error('Error in registration');
            setError(err.response?.data?.error || 'Error in registering user');
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            <div className="w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <Input name="firstname" placeholder="First Name" onChange={handleChange} />
                <Input name="lastname" placeholder="Last Name" onChange={handleChange} />
                <Input name="email" placeholder="Email" type="email" onChange={handleChange} />
                <Input name="password" placeholder="Password" type="password" onChange={handleChange} />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button className="w-full" onClick={handleSubmit}>Sign Up</Button>
            </div>
        </div>
    );
}