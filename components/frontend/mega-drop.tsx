import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Category {
     id: string;
     title: string;
     slug: string;
     description?: string;
     featured?: boolean;
     showInFooter: boolean;
     status?: boolean;
     metaTitle?: string;
     metaDescription?: string;
     image?: string;
     parentId?: string;
     createdAt?: string;
     updatedAt?: string;
     elementor?: boolean;
     elementorImage?: string;
     children: Category[];
}


export function MegaMenu({ category }: { category: Category }) {
     const [isOpen, setIsOpen] = useState(false)
     const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

     const openMenu = () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
          setIsOpen(true)
     }

     const closeMenu = () => {
          timeoutRef.current = setTimeout(() => {
               setIsOpen(false)
          }, 150)
     }

     const handleLinkClick = () => {
          setIsOpen(false)
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
     }

     // Cleanup timeout on unmount
     useEffect(() => {
          return () => {
               if (timeoutRef.current) clearTimeout(timeoutRef.current)
          }
     }, [])
     console.log(category, ">>>>>>>>>>>>>>>>>>>category in mega menu");
     return (
          <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
               {/* Trigger Button */}
               <Link
                    href={`/all-product/${category.slug}`}
                    onFocus={openMenu}
                    className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors font-medium py-2 px-3 rounded-md hover:bg-orange-50"
               >
                    <span>{category?.title}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                         <ChevronDown className="h-4 w-4" />
                    </motion.div>
               </Link>

               {/* Desktop Dropdown - Full Screen */}
               <AnimatePresence>
                    {isOpen && (
                         <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="hidden xl:block fixed left-0 right-0 overflow-hidden top-full mt-0 bg-white shadow-2xl border-t z-50"
                              style={{ width: "99vw" }}
                         >
                              <div className="px-16 py-8">
                                   <div className={`grid gap-8 grid-cols-2`}>
                                        <motion.div
                                             initial={{ opacity: 0, x: -10 }}
                                             animate={{ opacity: 1, x: 0 }}
                                             transition={{ duration: 0.2 }}
                                             className="space-y-4"
                                        >
                                             <h4 className="font-bold text-orange-500 mb-4 text-lg border-b border-orange-100 pb-2">
                                                  {category?.title}
                                             </h4>
                                             <div className="space-y-3">
                                                  {category?.children?.map((item, index) => (
                                                       <motion.div
                                                            key={item?.title}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{
                                                                 duration: 0.2,
                                                                 delay: index * 0.1,
                                                            }}
                                                       >
                                                            <Link
                                                                 href={`/all-product/${item.slug}`}
                                                                 className="block text-gray-700 hover:text-orange-500 transition-colors py-2 px-3 rounded-md hover:bg-orange-50"
                                                                 onClick={handleLinkClick}
                                                            >
                                                                 {item?.title}
                                                            </Link>
                                                       </motion.div>
                                                  ))}
                                             </div>
                                        </motion.div>
                                        <motion.div
                                             initial={{ opacity: 0, x: 10 }}
                                             animate={{ opacity: 1, x: 0 }}
                                             transition={{ duration: 0.3, delay: 0.1 }}
                                             className="space-y-6"
                                        >
                                             {/* Category Highlight Section */}
                                             <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                                                  <div className="flex items-center space-x-4">
                                                       {category?.image && (
                                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-sm">
                                                                 <Image
                                                                      src={category.image}
                                                                      alt={category.title}
                                                                      width={64}
                                                                      height={64}
                                                                      className="w-full h-full object-cover"
                                                                 />
                                                            </div>
                                                       )}
                                                       <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-800 mb-1">
                                                                 Explore {category?.title}
                                                            </h3>
                                                            {category?.description && (
                                                                 <p className="text-sm text-gray-600 line-clamp-2">
                                                                      {category.description}
                                                                 </p>
                                                            )}
                                                       </div>
                                                  </div>
                                                  <Link
                                                       href={`/all-product/${category.slug}`}
                                                       className="inline-flex items-center mt-4 text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
                                                       onClick={handleLinkClick}
                                                  >
                                                       View All Products
                                                       <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                       </svg>
                                                  </Link>
                                             </div>

                                             {/* Featured Categories or Quick Links */}
                                             {category?.children && category.children.length > 0 && (
                                                  <div>
                                                       <h5 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                                                            Popular Categories
                                                       </h5>
                                                       <div className="grid grid-cols-2 gap-3">
                                                            {category.children.slice(0, 4).map((item, index) => (
                                                                 <motion.div
                                                                      key={item.id}
                                                                      initial={{ opacity: 0, scale: 0.95 }}
                                                                      animate={{ opacity: 1, scale: 1 }}
                                                                      transition={{
                                                                           duration: 0.2,
                                                                           delay: index * 0.05,
                                                                      }}
                                                                 >
                                                                      <Link
                                                                           href={`/all-product/${item.slug}`}
                                                                           className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all duration-200 group"
                                                                           onClick={handleLinkClick}
                                                                      >
                                                                           <div className="flex items-center space-x-2">
                                                                                {item.image && (
                                                                                     <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                                                                          <Image
                                                                                               src={item.image}
                                                                                               alt={item.title}
                                                                                               width={32}
                                                                                               height={32}
                                                                                               className="w-full h-full object-cover"
                                                                                          />
                                                                                     </div>
                                                                                )}
                                                                                <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors font-medium">
                                                                                     {item.title}
                                                                                </span>
                                                                           </div>
                                                                      </Link>
                                                                 </motion.div>
                                                            ))}
                                                       </div>
                                                  </div>
                                             )}

                                             {/* Additional Info or Promotional Content */}
                                             <div className="bg-gray-50 rounded-lg p-4 border">
                                                  <div className="flex items-center space-x-2 mb-2">
                                                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                       <span className="text-sm font-medium text-gray-700">
                                                            Quality Guaranteed
                                                       </span>
                                                  </div>
                                                  <p className="text-xs text-gray-600">
                                                       All products in this category are carefully selected and quality tested.
                                                  </p>
                                             </div>
                                        </motion.div>
                                   </div>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>
          </div>
     )
}