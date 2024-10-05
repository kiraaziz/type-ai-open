"use client"
import Loader from "react-spinners/MoonLoader"

export default function loader() {

    return (
        <div className="flex items-center justify-center h-full w-full">
            <Loader color="white" size={40} />
        </div>
    )
}
