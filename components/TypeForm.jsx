"use client"
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { extractTextInCurlyBraces } from "@/hooks/useTools"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button"
import { X, Plus, List, ToggleRight, CaseLower, LayoutTemplate } from "lucide-react"
import Loader from "react-spinners/MoonLoader"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import str from "string-to-color"

export default function TypeForm({ clusterData }) {

    const blankField = { name: "answer", type: "string", description: "answer to the user's question" }
    const types = [
        { name: "String", value: "string", icon: <CaseLower size={17} /> },
        { name: "Number", value: "number", icon: <p className="font-bold text-[8px]">123</p> },
        { name: "Float", value: "float", icon: <p className="font-bold text-[8px]">10.5</p> },
        { name: "Boolean", value: "boolean", icon: <ToggleRight size={17} /> },
        { name: "List", value: "list", icon: <List size={17} /> },
    ]

    const router = useRouter()
    const [template, setTemplate] = useState(clusterData.template && clusterData.template)
    const [outputType, setOutputType] = useState(clusterData.outputType && JSON.parse(clusterData.outputType))

    const [pendding, startTransition] = useTransition()

    const addField = () => setOutputType([...outputType, blankField])
    const delectField = (i) => setOutputType((pre) => { return pre.filter((_, index) => { return i !== index }) })
    const updatedFiled = (i, f, e) => {
        setOutputType((pre) => {
            return pre.map((el, index) => {
                if (index !== i) {
                    return el
                } else {
                    el[f] = e
                    return el
                }
            })
        })
    }

    const handleSave = () => {
        try {
            if (!template) return toast.error("Template should not be empty")
            startTransition(async () => {

                const data = { template, outputType, clusterId: clusterData.id }

                const clusterReq = await fetch("/api/cluster", {
                    cache: "no-cache",
                    method: "PUT",
                    body: JSON.stringify(data)
                })
                const cluster = await clusterReq.json()

                if (cluster.success) {
                    router.refresh()
                    toast.success("Template updated")
                } else {
                    return toast.error("Can't update Template : 500")
                }
            })
        } catch (e) {
            toast.error("Can't update Template : 500")
        }
    }

    return (
        <div className="w-full h-max max-w-2xl mx-auto lg:mt-20 mb-5">
            <div className="">
                <h1 className="text-2xl font-bold">Prompt template</h1>
                <p className="text-sm font-extralight text-foreground/70">
                    Each parameter in the template should be enclosed within {"{ }"} to utilize it later as an input in your API request.
                    <span className="text-sm font-extralight text-primary/70">
                        {" "}(For example: "Give me five cities like {"{city}"}") </span>
                </p>
                <Input placeholder="Give me five cities like {city}" autoFocus={true} value={template} onChange={e => setTemplate(e.target.value)} className="mt-3 backdrop-blur-md bg-transparent" />
                <div className="w-full flex flex-wrap gap-1 my-4">
                    {extractTextInCurlyBraces(template).map((token) => (
                        <div className="bg-primary/10 border border-input pl-2 pr-4 py-1 rounded-full flex items-center justify-center gap-2">
                            <div style={{ backgroundColor: str(token.trim()) }} className="w-5 h-5 rounded-full border border-input" />
                            {token}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Output Structure</h1>
                    <Button onClick={addField} className="gap-2 px-6 rounded-full hover:text-background mt-2 backdrop-blur text-primary bg-primary/10 ">
                        <Plus size={17} />
                        Add field
                    </Button>
                </div>
                <div className="border border-input bg-background mt-2 rounded-lg overflow-hidden ">
                    <Table>
                        {outputType.length === 0 && <TableCaption className="mb-5">Output structure should not be empty.</TableCaption>}
                        <TableHeader className="">
                            <TableRow className="border-input bg-primary/10  ">
                                <TableHead className="text-primary">Field name</TableHead>
                                <TableHead className="text-primary">Description</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="border-none">
                            {outputType.map((out, index) => (
                                <TableRow className="border-input hover:bg-transparent">
                                    <TableCell className="flex gap-2.5 items-center justify-start">
                                        <Input onChange={(e) => updatedFiled(index, "name", e.target.value)} value={out.name} className="w-44" />
                                        <Select value={out.type} onValueChange={(e) => updatedFiled(index, "type", e)} >
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder={out.type} />
                                            </SelectTrigger>
                                            <SelectContent className="border-input bg-transparent backdrop-blur">
                                                {types.map((ty) => (
                                                    <SelectItem className="flex items-center justify-start pl-5" value={ty.value}>
                                                        <div className="flex items-center justify-start text-foreground/70 w-full gap-2 ml-2">
                                                            {ty.icon}{ty.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Input onChange={(e) => updatedFiled(index, "description", e.target.value)} value={out.description} className="" />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => delectField(index)} variant="destructive" size="icon">
                                            <X size={17} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="w-full flex items-center justify-end my-5">
                    {pendding ?
                        <Button disabled className="disabled:opacity-100 bg-primary/60 dark:bg-transparent gap-1 items-center justify-center text-foreground font-medium " size="icon">
                            <Loader color="white" size={15} />
                        </Button>
                        : <Button onClick={handleSave} className="gap-2 items-center justify-center text-background font-medium bg-primary/70" >
                            <LayoutTemplate size={18} />
                            Update template
                        </Button>}
                </div>
            </div>
        </div>
    )
}
