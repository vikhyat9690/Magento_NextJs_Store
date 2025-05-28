'use client';

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from "@/components/ui/accordion";

export default function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [priceRange, setPriceRange] = useState([0, 100]);

    const handleCategoryChange = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("category_id", categoryId);
        router.push(`/products?${params.toString()}`);
    }

    const handlePriceChange = (range: number[]) => {
        const [from, to] = range;
        const params = new URLSearchParams(searchParams.toString());
        params.set("price_from", from.toString());
        params.set("price_to", to.toString());
        router.push(`/products?${params.toString()}`);
    }

    return (
        <Accordion type="multiple" 
                id="filterMenu"   
                className="bg-gray-800 text-white p-4 rounded-lg w-full md:w-full">
            <AccordionItem value="filters" className="border-none">
                <AccordionTrigger className="hover:no-underline text-xl">&nbsp;&nbsp;&nbsp;Filters&nbsp;☰
                </AccordionTrigger>
                <AccordionContent>
                    <div className="bg-gray-800 text-white p-2 rounded-lg mb-8">
                        <Accordion type="multiple" className="w-full">
                            <AccordionItem value="category" className="border-none">
                                <AccordionTrigger className="hover:no-underline">Category</AccordionTrigger>
                                <AccordionContent>
                                    <div className="mb-2 mt-2">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="cat1" onCheckedChange={() => handleCategoryChange("14")} />
                                                <Label htmlFor="cat1">Men</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="cat2" onCheckedChange={() => handleCategoryChange("15")} />
                                                <Label htmlFor="cat2">Women</Label>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="price_range" className="border-none">
                                <AccordionTrigger className="hover:no-underline">Price Range</AccordionTrigger>
                                <AccordionContent>

                                    <div className="mb-2 mt-2">
                                        <Slider
                                            defaultValue={[priceRange[0], priceRange[1]]}
                                            max={100}
                                            min={0}
                                            step={1}
                                            className="cursor-pointer"

                                            onValueChange={(range) => {
                                                setPriceRange(range);
                                                handlePriceChange(range);
                                            }}
                                        />
                                        <div className="text-sm text-gray-300 mt-1">
                                            ₹{priceRange[0]} - ₹{priceRange[1]}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}