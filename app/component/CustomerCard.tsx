'use client';

import { useQuery } from "@apollo/client";
import { GET_CUSTOMER_INFO } from "../api/graphql/queries/getCustomerInfo";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export default function CustomerCard() {
    const { loading, error, data } = useQuery(GET_CUSTOMER_INFO);

    if (loading) return (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900/90 z-10">
            <Loader2 className="h-16 w-16 animate-spin text-white" />
            <Label>Loading Customer Info</Label>
        </div>
    );
    if(error) return (
        toast.error(error.message)
    );

    const customerData = {...data};

    return (
        <p>
            {customerData}
        </p>
    );
}