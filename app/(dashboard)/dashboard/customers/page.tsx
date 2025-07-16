"use client";

import { useEffect, useState } from "react";

const DownloadCSVExample = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const convertToCSV = (array: any) => {
        const flattenedArray = array?.map((item: any) => {
            return {
                id: item.id,
                name: item.name,
                username: item.username,
                email: item.email,
                street: item.address.street,
                suite: item.address.suite,
                city: item.address.city,
                zipcode: item.address.zipcode,
                phone: item.phone,
                website: item.website,
                companyName: item.company.name,
                companyCatchPhrase: item.company.catchPhrase,
                companyBS: item.company.bs,
            };
        });

        const headers = Object.keys(flattenedArray[0]).join(",");
        const rows = flattenedArray
            ?.map((item: any) => Object.values(item).join(","))
            .join("\n");
        return `${headers}\n${rows}`;
    };

    const downloadCSV = (data: any) => {
        const csvData = convertToCSV(data);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users_data.csv"); // File name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">
                Download User Data as CSV
            </h1>
            <button
                onClick={() => downloadCSV(data)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Download CSV
            </button>
            <div className="mt-6 text-black dark:text-white">
                <h2 className="text-xl font-semibold">Fetched Data:</h2>
                <pre className="bg-gray-100 dark:bg-slate-950 p-4 rounded mt-2">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default DownloadCSVExample;
