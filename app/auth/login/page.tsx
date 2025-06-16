"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getCustomerAfterLogin } from "@/app/lib/customer";
import { Loader2 } from "lucide-react";
import { getCustomerToken } from "@/app/lib/customerToken";
import toast from "react-hot-toast";

interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  postCode?: number;
  phone?: string;
  gender?: number;
}

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const loadingToastId = toast.loading("Logging in...");
    try {
      // Auth via REST
      await axios.post("/api/magento/auth/login", form);

      // Get Customer Info & Token via GraphQL
      const customerRes = await getCustomerAfterLogin(form.email, form.password);
      const customer = customerRes?.data?.customerById;
      const token = await getCustomerToken(form.email, form.password);

      // Save to Storage
      localStorage.setItem("customer_info", JSON.stringify(customer));
      sessionStorage.setItem("customer_token", token);

      // Success feedback
      toast.success("Login successful!");
      toast.dismiss(loadingToastId);
      router.push("/products");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.response?.data?.error || "Login failed");
      toast.dismiss(loadingToastId);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/80 z-50">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
      )}

      <div className="w-full max-w-md space-y-4 z-10">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button className="w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </div>
    </div>
  );
}
