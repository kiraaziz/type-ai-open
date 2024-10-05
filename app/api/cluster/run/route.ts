//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { StructuredOutputParser } from "langchain/output_parsers"
import { RunnableSequence } from "@langchain/core/runnables"
import { HuggingFaceInference } from "@langchain/community/llms/hf"
import { PromptTemplate } from "@langchain/core/prompts";

export function generateZodTypeFromJSON(jsonSchema) {
    const zodTypeFields = {};

    jsonSchema.forEach(field => {
        let zodType;
        switch (field.type) {
            case 'string':
                zodType = z.string().describe(field.desciption);
                break;
            case 'number':
                zodType = z.number().describe(field.desciption);
                break;
            case 'float':
                zodType = z.number().describe(field.desciption);
                break;
            case 'boolean':
                zodType = z.boolean().describe(field.desciption);
                break;
            case 'list':
                zodType = z.array(z.any()).describe(field.desciption);
                break;
            default:
                throw new Error(`Unsupported type: ${field.type}`);
        }
        zodTypeFields[field.name] = zodType;
    });

    return z.object(zodTypeFields);
}

function transformTemplate(template, tokenValues) {
    // Loop through tokenValues array
    tokenValues.forEach(token => {
        // Create a regular expression to match the token in the template string
        const regex = new RegExp('{' + token.name.trim() + '}', 'g');
        // Replace the token with its value in the template string
        template = template.replace(regex, token.value.trim());
    });
    return template;
}

export const OutputResponse = async (template, tokenValues, outputType) => {

    const parser = StructuredOutputParser.fromZodSchema(generateZodTypeFromJSON(outputType))
    const model = new HuggingFaceInference({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        apiKey: process.env.HF_API_KEY,
        maxTokens: 2000
    })

    const chain = RunnableSequence.from([
        PromptTemplate.fromTemplate(
            "Answer the users question as best as possible.\n{format_instructions}\n{question}"
        ),
        model,
        parser,
    ]);

    const response = await chain.invoke({
        question: transformTemplate(template, tokenValues),
        format_instructions: parser.getFormatInstructions(),
    });


    return response

}


const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)
    const { clusterId, tokenValue } = await req.json()

    const clusterData = await prisma.cluster.findUnique({
        where: {
            id: clusterId,
            Membership: {
                some: {
                    userId: id
                }
            }
        }
    })

    if(!clusterData){
        return {
            success: false
        }
    }


    return NextResponse.json({
        success: true,
        response: await OutputResponse(clusterData?.template, tokenValue, JSON.parse(clusterData?.outputType))
    })
}
