"use client"
import { Home, BarChartBig, Key, Settings, FlaskConical } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function layout({ children }) {

    const paths = [
        { name: "Overview", icon: Home, path: "" },
        { name: "Test", icon: FlaskConical, path: "test" },
        { name: "Logs", icon: BarChartBig, path: "logs" },
        { name: "API KEYs", icon: Key, path: "api" },
        { name: "Settings", icon: Settings, path: "settings" },
    ]

    const pathname = usePathname().replace("/dashboard", "").split("/")
    const isActive = (p) => (pathname.length === 2 && p.path === "") || usePathname() === "/dashboard/" + pathname[1] + "/" + p.path

    return (
        <div className="w-full h-full flex flex-col-reverse lg:flex-row">
            <div className="lg:p-4 p-2 h-max w-full lg:w-80 lg:h-full bg-background border-r border-input items-center justify-center lg:items-start lg:justify-start flex-row lg:flex-col flex ">
                {paths.map((p) => (
                    <Link href={"/dashboard/" + pathname[1] + "/" + p.path} className={`${isActive(p) ? "bg-primary/10  border-input" : "opacity-75 border-transparent"} border ease-in-out duration-200 hover:bg-primary/10 flex gap-2 items-center justify-start w-max lg:w-full px-3 py-2 rounded my-2`}>
                        <p.icon size={17} />
                        <p className="lg:block hidden">
                            {p.name}
                        </p>
                    </Link>
                ))}
            </div>
            <div className="h-full w-full overflow-auto p-3 lg-p-5">
                {children}
            </div>
        </div>
    )
}
