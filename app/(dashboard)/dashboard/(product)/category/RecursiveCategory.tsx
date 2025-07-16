import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// Adjust this based on your utility function

interface Category {
    id: string;
    title: string;
    image?: string;
    children?: Category[];
}

interface RecursiveCategoryProps {
    category: Category;
    onEditCategoryOpen: any;
    handleDelete: (id: string) => void;
}

const RecursiveCategory: React.FC<RecursiveCategoryProps> = ({
    category,
    onEditCategoryOpen,
    handleDelete,
}) => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="space-y-4 my-6">
            <div className="flex items-center space-x-2">
                <div className="border-t-[3px] w-9 border-gray-300 h-[60px] -mr-2"></div>
                <div className="relative w-[60px] h-[60px] rounded-sm overflow-hidden">
                    <Image
                        fill
                        className={cn(
                            "object-cover object-top absolute inset-0 h-full w-full transition duration-200",
                            loaded ? "blur-none" : "blur-md"
                        )}
                        onLoad={() => setLoaded(true)}
                        alt={category.title}
                        src={category.image || "/placeholder.png"}
                    />
                </div>
                <span>{category.title}</span>
                <Button
                    onClick={() => dispatch(onEditCategoryOpen(category.id))}
                    variant={"edit"}
                    size={"sm"}
                    className="ml-auto"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => handleDelete(category.id)}
                    variant={"delete"}
                    size={"sm"}
                >
                    Delete
                </Button>
            </div>
            {category.children && category?.children?.length > 0 && (
                <div className="border-l-[3px] border-gray-300 ml-12">
                    {category.children?.map((child) => (
                        <RecursiveCategory
                            key={child.id}
                            category={child}
                            onEditCategoryOpen={onEditCategoryOpen}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecursiveCategory;
