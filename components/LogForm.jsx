"use client"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDistanceToNow } from 'date-fns';
import { CodeBlock } from 'react-code-block';
import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronUp } from "lucide-react"

function CodeBlockDemo({ code, language }) {
    return (
        <CodeBlock code={code} language={language}>
            <CodeBlock.Code  >
                <CodeBlock.LineContent>
                    <CodeBlock.Token />
                </CodeBlock.LineContent>
            </CodeBlock.Code>
        </CodeBlock>
    );
}

function timeAgo(dateString) {
    const inputDate = new Date(dateString);
    return formatDistanceToNow(inputDate, { addSuffix: true });
}

export default function TestForm({ cluster }) {

    const logs = cluster.logs.map((el) => {
        return { date: el.date, value: el.value, context: el.context }
    })

    const context = logs.map((el) => { return el.context })

    return (
        <div className="w-full h-max max-w-2xl mx-auto lg:mt-20 mb-5">
            <div className="">
                <h1 className="text-2xl font-bold">Logs</h1>
            </div>
            {logs.length > 0 && <div className='h-96 bg-background w-full border border-input mt-3 rounded-md px-8 py-14'>
                <div className='w-full h-full '>
                    <ResponsiveContainer width="100%" height="100%" >
                        <AreaChart width={730} height={250} data={logs.reverse()} >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis stroke={"white"} opacity={0.6} fontSize={12} dataKey="date" />
                            <YAxis stroke={"white"} opacity={0.6} fontSize={12} />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>}
            <div className='mt-9 border border-input rounded-lg overflow-hidden backdrop-blur-md'>
                <Table>
                    {logs.length === 0 && <TableCaption >
                        <div className="mb-7 mt-3 ">
                            There haven't been any requests created on this cluster yet.
                        </div>
                    </TableCaption>}
                    <TableHeader>
                        <TableRow className="border-input">
                            <TableHead className=" text-foreground" >Log ID</TableHead>
                            <TableHead className=" text-foreground">Requested at</TableHead>
                            <TableHead className=" text-foreground">Tokens</TableHead>
                            <TableHead ></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {context.map((lo) => (
                            lo.map((el) => {

                                const [open, setOpen] = useState(false)

                                return (
                                    <>
                                        <TableRow className="border-input">
                                            <TableCell >{el.id.slice(0, 10)}...</TableCell>
                                            <TableCell >{timeAgo(el.createAt)}</TableCell>
                                            <TableCell classNamem="max-w-20 overflow-auto">
                                                <CodeBlockDemo code={el.value.length > 25 ? el.value.slice(0, 25) + "..." : el.value} language={"javascript"} />
                                            </TableCell>
                                            <TableCell >
                                                <Button onClick={() => setOpen(!open)} size="icon" variant="outline">
                                                    <ChevronUp size={15} className={`duration-200 ease-in-out ${!open ? "rotate-180" : "rotate-0"}`} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        {open && <TableRow className="border-input">
                                            <TableCell colspan={4}>
                                                <div className=' mx-auto p-2 overflow-auto'>
                                                    <CodeBlockDemo code={JSON.stringify(JSON.parse(el.value), null, 2)} language={"javascript"} />
                                                </div>
                                            </TableCell>
                                        </TableRow>}
                                    </>
                                )
                            })
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}