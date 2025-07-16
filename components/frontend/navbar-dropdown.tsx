import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";

interface NavbarDropdownProps {
    title: string;
    slug: string;
    items: any[];
}

const DropdownItem = ({ item }: { item: any }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Item Link */}
            <Link
                href={`/all-product/${item?.slug}`}
                className="group items-center justify-between py-3 px-4 flex hover:bg-brand hover:text-white w-full transition-all duration-200"
                key={item.slug}
            >
                <div className="flex items-center">
                    {item.image && (
                        <Image
                            src={item?.image}
                            alt={item?.title}
                            width={10}
                            height={10}
                            className="mr-1"
                        />
                    )}
                    <span className="text-md transition-transform duration-300 group-hover:translate-x-2">
                        {item?.title}
                    </span>
                </div>
                {item?.children?.length > 0 && (
                    <IoMdArrowDropright
                        className={`ml-1 h-3 fill-brand w-3 transition-transform duration-200 ${
                            isOpen ? "hidden" : ""
                        }`}
                        aria-hidden="true"
                    />
                )}
            </Link>

            {/* Render Children Dropdown */}
            {item?.children?.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`absolute bg-white top-[0px]   transition-all duration-200 left-full min-w-[240px] shadow-xl     ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    {item.children?.map((child: any) => (
                        <DropdownItem key={child.slug} item={child} />
                    ))}
                </motion.div>
            )}
        </div>
    );
};

const Dropdown = ({ title, slug, items }: NavbarDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div onMouseLeave={handleMouseLeave} className="relative">
            {/* Dropdown Trigger */}
            <div
                onMouseEnter={handleMouseEnter}
                className="flex gap-1 relative items-center cursor-pointer py-3 hover:text-brand"
            >
                <Link href={`/all-product/${slug}`}>{title}</Link>
                <ChevronDown
                    className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                />
            </div>

            {/* Dropdown Menu */}
            <motion.div
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`absolute bg-white border-t-4 border-brand top-[60px] min-w-[200px] shadow-md ${
                    isOpen ? "block" : "hidden"
                }`}
            >
                {items?.map((item) => (
                    <DropdownItem key={item.slug} item={item} />
                ))}
            </motion.div>
        </div>
    );
};

export default Dropdown;

export const ManBagDropdown = (props: NavbarDropdownProps) => (
    <Dropdown {...props} />
);

export const LadiesBagDropdown = (props: NavbarDropdownProps) => (
    <Dropdown {...props} />
);

export const AccessoriesDropdown = (props: NavbarDropdownProps) => (
    <Dropdown {...props} />
);
