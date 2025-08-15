"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useLazyQuery } from "@apollo/client";
import { Loader2 } from "lucide-react";
import { CASHIER_LOGIN_QUERY } from "@/app/api/graphql/queries/queries";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const [login, { loading }] = useLazyQuery(CASHIER_LOGIN_QUERY, {
    onCompleted: (data) => {
      toast.success("Login successful!");
      const cashierData = data?.cashierLogin;
      localStorage.setItem("cashierData", JSON.stringify(cashierData));
      router.push("/dashboard"); // or wherever you want to redirect
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
    fetchPolicy: "no-cache", 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }
    toast.loading("Logging in...", { id: "login" });
    login({
      variables: {
        email: form.email,
        password: form.password,
      },
    }).finally(() => {
      toast.dismiss("login");
    });
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
        <Button className="w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </div>
    </div>
  );
}
