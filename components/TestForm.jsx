"use client"
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
import Loader from "react-spinners/MoonLoader"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import str from "string-to-color"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { FlaskConical } from "lucide-react"
import { CodeBlock } from 'react-code-block';

function CodeBlockDemo({ code, language }) {
    return (
        <CodeBlock code={code} language={language}>
            <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg overflow-auto">
                <CodeBlock.LineContent>
                    <CodeBlock.Token />
                </CodeBlock.LineContent>
            </CodeBlock.Code>
        </CodeBlock>
    );
}

export default function TestForm({ cluster }) {

    const schemaObject = extractTextInCurlyBraces(cluster.template)
    const [tokenValue, setTokenValue] = useState(schemaObject.map((to) => { return { name: to, value: "" } }))
    const [pendding, startTransition] = useTransition()
    const [resolve, setResolve] = useState("")

    const setTokenValueReq = (i, e) => {
        setTokenValue((pre) => {
            return pre.map((_, index) => {
                if (index === i) {
                    return { name: _.name, value: e }
                } else {
                    return _
                }
            })
        })
    }

    const handleTest = () => {
        startTransition(async () => {
            try {
                const data = { tokenValue, clusterId: cluster.id }

                const responseReq = await fetch("/api/cluster/run", {
                    cache: "no-cache",
                    method: "POST",
                    body: JSON.stringify(data)
                })
                const response = await responseReq.json()
                setResolve(response)
            } catch (e) {
                toast.error("Server error : 500")
            }
        })
    }

    return (
        <div className="w-full h-max max-w-2xl mx-auto lg:mt-20 mb-5">
            <div className="">
                <h1 className="text-2xl font-bold">Test cluster</h1>
                <p className="text-sm font-extralight text-foreground/70">
                    {cluster.template}
                </p>
                <div className="w-full flex flex-wrap gap-1 my-2">
                    {schemaObject.map((token) => (
                        <div className="bg-primary/10 border border-input pl-2 pr-4 py-1 rounded-full flex items-center justify-center gap-2">
                            <div style={{ backgroundColor: str(token.trim()) }} className="w-5 h-5 rounded-full border border-input" />
                            {token}
                        </div>
                    ))}
                </div>
            </div>
            <div className="border border-input bg-background mt-10 rounded-lg overflow-hidden ">
                <Table>
                    {Object.keys(schemaObject).length === 0 && <TableCaption className="mb-5">There is no token in you template.</TableCaption>}
                    <TableHeader className="">
                        <TableRow className="border-input bg-primary/10  ">
                            <TableHead className="text-primary">Tokens</TableHead>
                            <TableHead className="text-primary">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border-none">
                        {Object.keys(schemaObject).map((obj, index) => (
                            <TableRow className="border-input hover:bg-transparent">
                                <TableCell className="bg-primary/10 border-r border-input text-base font-medium gap-2  max-w-0">
                                    <div className="h-full w-full flex items-center justify-start gap-2">
                                        <div style={{ backgroundColor: str(schemaObject[obj].trim()) }} className="w-5 h-5 rounded-full border border-input" />
                                        {schemaObject[obj]}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Input placeholder={`write a value of "${schemaObject[obj]}" token `} onChange={(e) => setTokenValueReq(index, e.target.value)} autoFocus={index === 0 && true} value={tokenValue[index].value} className="" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="w-full flex items-center justify-end mb-8 mt-4">
                {pendding ?
                    <Button disabled className="disabled:opacity-100 bg-primary/60 dark:bg-transparent gap-1 items-center justify-center text-foreground font-medium " size="icon">
                        <Loader color="white" size={15} />
                    </Button>
                    : <Button onClick={handleTest} className="gap-2 items-center justify-center text-background font-medium bg-primary/70" >
                        <FlaskConical size={18} />
                        Test cluster
                    </Button>}
            </div>
            {resolve && <div>
                <CodeBlockDemo language="javascript" code={JSON.stringify(resolve, null, 2)} />
            </div>}
        </div>
    )
}
