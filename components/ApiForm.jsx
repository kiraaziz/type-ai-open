"use client"
import { useEffect, useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Plus, Copy, PenLine, Trash, MoreHorizontal, Code } from "lucide-react"
import Loader from "react-spinners/MoonLoader"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { formatDistanceToNow } from 'date-fns';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CodeBlock } from 'react-code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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


export default function ApiForm({ cluster, url }) {

    const [open, setOpen] = useState(false)
    const [target, setTarget] = useState()
    const [deleteOn, setDeleteOn] = useState("off")
    const router = useRouter()

    const handleDelete = async (i, id) => {

        setDeleteOn(i)
        try {

            const keyData = await fetch("/api/cluster/key", {
                cache: "no-cache",
                method: "DELETE",
                body: JSON.stringify({ key: id, clusterId: cluster.id })
            })
            const key = await keyData.json()

            if (key.success) {
                router.refresh()
            } else {
                return toast.error("Can't delete Key : 500")
            }
        } catch (e) {
            toast.error("Can't delete Key : 500")
        }
        setDeleteOn("off")
    }

    return (
        <div className="w-full h-max max-w-2xl mx-auto lg:mt-20 mb-5">
            <div className="mt-8">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-2xl font-bold">API KEYs</h1>
                    <UpdateForm setTarget={setTarget} target={target} cluster={cluster} />
                    <div className="flex items-center justify-end gap-1 w-max">
                        <CreateForm open={open} setOpen={setOpen} cluster={cluster} />
                        <Usage url={url} />
                    </div>
                </div>
                <div className="border border-input bg-background mt-2 rounded-lg overflow-hidden ">
                    <Table>
                        {cluster.apiKey.length === 0 && <TableCaption className="mb-5">There is no API KEY created yet.</TableCaption>}
                        <TableHeader className="">
                            <TableRow className="border-input bg-primary/10  ">
                                <TableHead className="text-primary">Name</TableHead>
                                <TableHead className="text-primary">Token</TableHead>
                                <TableHead className="text-primary">Last use</TableHead>
                                <TableHead className="text-primary">Created at</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="border-none">
                            {cluster.apiKey.map((key, index) => (
                                <TableRow className="border-input hover:bg-transparent">
                                    <TableCell>
                                        {key.name}
                                    </TableCell>
                                    <TableCell>
                                        {"TA_" + key.id.slice(0, 7) + "..."}
                                    </TableCell>
                                    <TableCell>
                                        Never
                                    </TableCell>
                                    <TableCell>
                                        {timeAgo(key.createAt)}
                                    </TableCell>
                                    <TableCell >
                                        {deleteOn === index ?
                                            <Button disabled className="disabled:opacity-100 disabled:bg-transparent gap-1 items-center justify-center text-foreground font-medium bg-primary/70" size="icon">
                                                <Loader color="white" size={15} />
                                            </Button> :
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button className="focus:border-input" size="icon" variant="outline">
                                                        <MoreHorizontal size={17} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="bg-transparent backdrop-blur border-input">
                                                    <DropdownMenuItem className="gap-2 items-center justify-start" onClick={() => {
                                                        setTarget(key)
                                                    }}>
                                                        <PenLine
                                                            size={16} />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 items-center justify-start" onClick={() => {
                                                        handleDelete(index, key.id)
                                                    }}>
                                                        <Trash size={16} />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div >
    )
}

const CreateForm = ({ cluster, open, setOpen }) => {

    const router = useRouter()

    const [text, setText] = useState()
    const [created, setCreated] = useState()
    const [pendding, startTransition] = useTransition()

    const handleSave = () => {
        try {
            if (!text) return toast.error("Key name should not be empty")
            startTransition(async () => {

                const data = {
                    name: text,
                    clusterId: cluster.id
                }

                const keyData = await fetch("/api/cluster/key", {
                    cache: "no-cache",
                    method: "POST",
                    body: JSON.stringify(data)
                })
                const key = await keyData.json()

                if (key.success) {
                    router.refresh()
                    setCreated(key.newKey.id)
                } else {
                    return toast.error("Can't create Key : 500")
                }
            })
        } catch (e) {
            toast.error("Can't create Key : 500")
        }
    }

    useEffect(() => {
        if (!open) {
            setCreated("")
            setText("")
        }
    }, [open])
    return (
        <Dialog open={open} onOpenChange={(e) => {
            setOpen(e)
        }}>
            <DialogTrigger>
                <Button className="gap-2 px-6 rounded-full hover:text-background mt-2 backdrop-blur text-primary bg-primary/10 ">
                    <Plus size={17} />
                    New key
                </Button>
            </DialogTrigger>
            <DialogContent className="border-input !ring-0 focus:!border-input bg-background backdrop-blur">
                <DialogHeader>
                    <DialogTitle>Create new API KEY</DialogTitle>
                    <DialogDescription className="mt-2">
                        {!created ? <><p className="mt-2">Key name</p>
                            <form onSubmit={(e) => { e.preventDefault(), handleSave() }} className="w-full mt-1">
                                <Input disabled={created && true} value={text} onChange={(e) => setText(e.target.value)} className="bg-transparent backdrop-blur-xl" placeholder="name" />
                            </form>
                            <div className="w-full flex items-center justify-end mt-2">
                                {pendding ?
                                    <Button disabled className="disabled:opacity-100 dark:bg-transparent bg-primary/60 gap-1 items-center justify-center text-foreground font-medium " size="icon">
                                        <Loader color="white" size={15} />
                                    </Button>
                                    : <Button onClick={handleSave} className="gap-1 items-center justify-center text-background font-medium bg-primary/70" >
                                        <Plus size={17} />
                                        Create cluster
                                    </Button>}
                            </div> </> : <>
                            <div className="w-full flex items-center justify-between gap-1">
                                <Input autoFocus={true} disabled={false} value={"TA_" + created} className="bg-transparent backdrop-blur-xl mt-2 mb-4" />
                            </div>
                            <div className="w-full flex items-center justify-end gap-1">
                                <Button onClick={() => {
                                    navigator.clipboard.writeText("TA_" + created)
                                    toast.success("APY KEY copied successfully! 🎉")
                                    setOpen(false)
                                }} className="gap-1 items-center justify-center text-background font-medium bg-primary/70 border-none" >
                                    <Copy size={17} />
                                    Copy key
                                </Button>
                                <Button onClick={() => setOpen(false)} className="gap-1 items-center justify-center text-foreground font-medium bg-background/70 border border-input hover:bg-primary/50 hover:border-transparent" >
                                    Close
                                </Button>
                            </div>
                        </>}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const UpdateForm = ({ cluster, target, setTarget }) => {

    const router = useRouter()

    const [text, setText] = useState()
    const [created, setCreated] = useState()
    const [pendding, startTransition] = useTransition()

    const handleSave = () => {
        try {
            if (!text) return toast.error("Key name should not be empty")
            startTransition(async () => {

                const data = {
                    name: text,
                    clusterId: cluster.id,
                    keyId: target.id
                }

                const keyData = await fetch("/api/cluster/key", {
                    cache: "no-cache",
                    method: "PUT",
                    body: JSON.stringify(data)
                })
                const key = await keyData.json()

                if (key.success) {
                    router.refresh()
                    setCreated(key.newKey.id)
                } else {
                    return toast.error("Can't update Key : 500")
                }
            })
        } catch (e) {
            toast.error("Can't update Key : 500")
        }
    }

    useEffect(() => {
        if (!target) {
            setCreated("")
            setText("")
            setTarget("")
        } else {
            setText(target?.name)
        }
    }, [target])

    return (
        <Dialog open={target && true} onOpenChange={(e) => {
            setTarget(e)
        }}>
            <DialogContent className="border-input !ring-0 focus:!border-input bg-background backdrop-blur">
                <DialogHeader>
                    <DialogTitle>Update new API KEY </DialogTitle>
                    <DialogDescription className="mt-2">
                        {!created ? <><p className="mt-2">Key name</p>
                            <form onSubmit={(e) => { e.preventDefault(), handleSave() }} className="w-full mt-1">
                                <Input disabled={created && true} value={text} onChange={(e) => setText(e.target.value)} className="bg-transparent backdrop-blur-xl" placeholder="name" />
                            </form>
                            <div className="w-full flex items-center justify-end mt-2">
                                {pendding ?
                                    <Button disabled className="disabled:opacity-100 dark:bg-transparent bg-primary/60 gap-1 items-center justify-center text-foreground font-medium " size="icon">
                                        <Loader color="white" size={15} />
                                    </Button>
                                    : <Button onClick={handleSave} className="gap-1 items-center justify-center text-background font-medium bg-primary/70" >
                                        <Plus size={17} />
                                        Update cluster
                                    </Button>}
                            </div> </> : <>
                            <div className="w-full flex items-center justify-between gap-1">
                                <Input autoFocus={true} disabled={false} value={"TA_" + created} className="bg-transparent backdrop-blur-xl mt-2 mb-4" />
                            </div>
                            <div className="w-full flex items-center justify-end gap-1">
                                <Button onClick={() => {
                                    navigator.clipboard.writeText("TA_" + created)
                                    toast.success("APY KEY copied successfully! 🎉")
                                    setTarget(false)
                                }} className="gap-1 items-center justify-center text-background font-medium bg-primary/70 border-none" >
                                    <Copy size={17} />
                                    Copy key
                                </Button>
                                <Button onClick={() => setTarget(false)} className="gap-1 items-center justify-center text-foreground font-medium bg-background/70 border border-input hover:bg-primary/50 hover:border-transparent" >
                                    Close
                                </Button>
                            </div>
                        </>}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const Usage = ({ url }) => {

    return (
        <Dialog >
            <DialogTrigger>
                <Button className="gap-2 px-6 rounded-full hover:text-background mt-2 backdrop-blur text-primary bg-primary/10 ">
                    <Code size={17} />
                    API
                </Button>
            </DialogTrigger>
            <DialogContent className="border-input !ring-0 focus:!border-input bg-background backdrop-blur w-max max-w-max">
                <DialogHeader>
                    <DialogTitle>API Reference</DialogTitle>
                    <DialogDescription className="w-full">
                        <Tabs defaultValue="account" className="w-[400px]">
                            <TabsList className="bg-transparent mt-3">
                                {codes(url).map((el) => (
                                    <TabsTrigger value={el.lang}>{el?.lang}</TabsTrigger>
                                ))}
                            </TabsList>
                            {codes(url).map((el) => (
                                <TabsContent value={el.lang}>
                                    <div className="bg-gray-900  mt-1 overflow-auto max-w-lg p-6 rounded-xl shadow-lg ">
                                        <div className="w-max max-h-96">
                                            <CodeBlockDemo code={el.code} language={el.lang} />
                                        </div>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const codes = (url) => [
    {
        lang: "javascript",
        code: `const responseReq = await fetch(\`${url}/api/get-ai-response\`, {
    method: "POST",
    headers: {
        "apiKey": "TA_1234567",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        //token used in template
        tokens: {
            "foo" : "a"
        }
    })
})

const response = await responseReq.json();`
    },
    {
        lang: "python",
        code: `import requests

url = f"{url}/api/get-ai-response"
headers = {
    "apiKey": "TA_1234567",
    "Content-Type": "application/json"
}
data = {
    "tokens": {
        "foo": "a"
    }
}

response = requests.post(url, json=data, headers=headers)
json_response = response.json()`
    },
    {
        lang: "go",
        code: `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func main() {
    url := "" + url + "/api/get-ai-response"
    data := map[string]interface{}{
        "tokens": map[string]string{
            "foo": "a",
        },
    }
    jsonData, _ := json.Marshal(data)
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("apiKey", "TA_1234567")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}`
    },
    {
        lang: "java",
        code: `import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        String url = "" + url + "/api/get-ai-response";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // Request header
        con.setRequestMethod("POST");
        con.setRequestProperty("apiKey", "TA_1234567");
        con.setRequestProperty("Content-Type", "application/json");

        // Request body
        Map<String, String> data = new HashMap<>();
        data.put("foo", "a");

        String jsonBody = new ObjectMapper().writeValueAsString(data);

        // Send post request
        con.setDoOutput(true);
        try (OutputStream os = con.getOutputStream()) {
            byte[] input = jsonBody.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        int responseCode = con.getResponseCode();
    }
}`
    },
    {
        lang: "curl",
        code: `curl -X POST \\
  ${url}/api/get-ai-response \\
  -H 'apiKey: TA_1234567' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "tokens": {
        "foo": "a"
    }
}'`
    }
]