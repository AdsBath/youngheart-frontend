import { Avatar } from "@/components/ui/avatar";
import BlurImage from "../ui/blur-image";
import { Skeleton } from "../ui/skeleton";

export function TopCategory({
    isLoading,
    topCategory,
}: {
    isLoading: boolean;
    topCategory: any;
}) {
    return (
        <div className="space-y-8">
            {isLoading ? (
                [...Array(5)]?.map((_, index) => (
                    <div className="flex items-center" key={index}>
                        <Skeleton className="h-10 w-10 rounded" />
                        <div className="ml-4 space-y-1">
                            <Skeleton className="h-5 w-[150px]" />
                            <Skeleton className="h-4 w-[170px]" />
                        </div>
                        <div className="ml-auto">
                            <Skeleton className="h-4 w-[80px]" />
                        </div>
                    </div>
                ))
            ) : (
                <table className="w-full bg-white shadow rounded overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="flex justify-between items-center py-2 px-4 border-b border-gray-200">
                            <th className="flex-1 text-left">
                                <p className="text-sm font-semibold text-gray-700">
                                    Title
                                </p>
                            </th>
                            <th className="w-[60px] text-center">
                                <p className="font-semibold text-gray-700">
                                    Sold
                                </p>
                            </th>
                            <th className="w-[80px] text-center">
                                <p className="font-semibold text-gray-700">
                                    Revenue
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {topCategory?.map((category: any, index: number) => (
                            <tr
                                key={index}
                                className="flex justify-between items-center py-2 px-4 hover:bg-gray-50 border-b border-gray-200 transition-all duration-200"
                            >
                                <td className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 rounded bg-gray-200">
                                            <BlurImage
                                                alt="thumbnail"
                                                src={category?.image}
                                            />
                                        </Avatar>
                                        <p className="text-sm font-medium text-gray-800">
                                            {category?.title}
                                        </p>
                                    </div>
                                </td>
                                <td className="w-[60px] text-center">
                                    <p className="text-sm font-medium text-gray-600">
                                        {category?.totalQuantitySold}
                                    </p>
                                </td>
                                <td className="w-[80px] text-center">
                                    <p className="text-sm font-medium text-green-500">
                                        ৳{category?.totalRevenue}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
