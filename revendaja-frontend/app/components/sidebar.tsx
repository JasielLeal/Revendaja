"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Home,
    FileText,
    ShoppingBag,
    DollarSign,
    HelpCircle,
    Award,
    Settings,
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    Package,
    Layers,
    ShoppingCart,
    User,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

// Navigation items with their respective icons
const navItems = [
    {
        name: "Home",
        icon: Home,
        href: "#home",
    },
    {
        name: "Boletos",
        icon: FileText,
        href: "#boletos",
    },
    {
        name: "Loja",
        icon: ShoppingBag,
        href: "#loja",
        submenu: [
            {
                name: "Produtos",
                icon: Package,
                href: "#produtos",
            },
            {
                name: "Categorias",
                icon: Layers,
                href: "#categorias",
            },
            {
                name: "Pedidos",
                icon: ShoppingCart,
                href: "#pedidos",
            },
        ],
    },
    {
        name: "Financeiro",
        icon: DollarSign,
        href: "#financeiro",
    },
    {
        name: "Ajuda",
        icon: HelpCircle,
        href: "#ajuda",
    },
    {
        name: "Planos",
        icon: Award,
        href: "#planos",
    },
    {
        name: "Configuração",
        icon: Settings,
        href: "#configuracao",
    },
]

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeItem, setActiveItem] = useState("Home")
    const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null)
    const isMobile = useMobile()

    // Close sidebar when switching from mobile to desktop
    useEffect(() => {
        if (!isMobile) {
            setIsOpen(false)
        }
    }, [isMobile])

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    const toggleSubmenu = (name: string) => {
        setExpandedSubmenu(expandedSubmenu === name ? null : name)
    }

    const handleNavClick = (name: string, hasSubmenu: boolean) => {
        if (!hasSubmenu) {
            setActiveItem(name)
        }

        if (hasSubmenu) {
            toggleSubmenu(name)
        } else if (isMobile) {
            setIsOpen(false)
        }
    }

    const handleSubItemClick = (name: string) => {
        setActiveItem(name)
        if (isMobile) {
            setIsOpen(false)
        }
    }

    // Animation variants
    const sidebarVariants = {
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
        closed: {
            x: "-100%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
    }

    const submenuVariants = {
        open: {
            height: "auto",
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
    }

    const overlayVariants = {
        open: {
            opacity: 1,
            transition: { duration: 0.3 },
        },
        closed: {
            opacity: 0,
            transition: { duration: 0.3 },
        },
    }

    return (
        <>
            {/* Mobile Toggle Button */}
            {isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-sm border border-gray-100"
                    aria-label="Toggle menu"
                >
                    <Menu className="h-5 w-5 text-gray-700" />
                </button>
            )}

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobile && isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={overlayVariants}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                {(!isMobile || isOpen) && (
                    <motion.aside
                        initial={isMobile ? "closed" : false}
                        animate={isMobile ? "open" : false}
                        exit={isMobile ? "closed" : false}
                        variants={sidebarVariants}
                        className={`
              fixed top-0 left-0 z-50
              h-screen w-64
              bg-white border-r border-gray-100
              flex flex-col
              ${isMobile ? "shadow-lg" : ""}
            `}
                    >
                        {/* Sidebar Header */}
                        <div className="px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-semibold tracking-tight text-gray-900">RevendaJá</h1>
                                {isMobile && (
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <X className="h-4 w-4 text-gray-500" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-3 py-4 overflow-y-auto">
                            <ul className="space-y-1">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <div className="flex flex-col">
                                            <a
                                                href={item.href}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleNavClick(item.name, !!item.submenu)
                                                }}
                                                className={`
                          relative flex items-center justify-between px-3 py-2 rounded-md text-sm
                          transition-all duration-200 ease-in-out group
                          ${activeItem === item.name && !item.submenu
                                                        ? "bg-rose-50 text-rose-900 font-medium"
                                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    }
                          ${expandedSubmenu === item.name ? "bg-gray-50" : ""}
                        `}
                                            >
                                                {/* Active indicator */}
                                                {activeItem === item.name && !item.submenu && (
                                                    <span className="absolute left-0 inset-y-0 w-1 bg-rose-500 rounded-r-full" />
                                                )}

                                                <div className="flex items-center gap-3">
                                                    <item.icon className="h-4 w-4 flex-shrink-0" />
                                                    <span>{item.name}</span>
                                                </div>

                                                {item.submenu && (
                                                    <div className="text-gray-400 transition-transform duration-200">
                                                        {expandedSubmenu === item.name ? (
                                                            <ChevronDown className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                )}
                                            </a>

                                            {/* Submenu */}
                                            {item.submenu && (
                                                <AnimatePresence initial={false}>
                                                    {expandedSubmenu === item.name && (
                                                        <motion.ul
                                                            initial="closed"
                                                            animate="open"
                                                            exit="closed"
                                                            variants={submenuVariants}
                                                            className="overflow-hidden pl-9 mt-1"
                                                        >
                                                            {item.submenu.map((subItem) => (
                                                                <li key={subItem.name}>
                                                                    <a
                                                                        href={subItem.href}
                                                                        onClick={(e) => {
                                                                            e.preventDefault()
                                                                            handleSubItemClick(subItem.name)
                                                                        }}
                                                                        className={`
                                      relative flex items-center gap-3 px-3 py-2 rounded-md text-sm
                                      transition-all duration-200 ease-in-out
                                      ${activeItem === subItem.name
                                                                                ? "bg-rose-50 text-rose-900 font-medium"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                                            }
                                    `}
                                                                    >
                                                                        {/* Active indicator */}
                                                                        {activeItem === subItem.name && (
                                                                            <span className="absolute left-0 inset-y-0 w-1 bg-rose-500 rounded-r-full" />
                                                                        )}

                                                                        <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                                                        <span>{subItem.name}</span>
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Footer with User Profile */}
                        <div className="p-4 border-t border-gray-100 mt-auto">
                            <div className="flex items-center gap-3 p-2">
                                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                    <User className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">Jasiel Oliveira</span>
                                    <span className="text-xs text-gray-500">jasiel@email.com</span>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    )
}
