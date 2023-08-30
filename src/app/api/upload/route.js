import { NextResponse } from "next/server";
import { writeFileSync } from "fs";
import path from "path";

const createFile = async (files) => {
    for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = file.name;

        const filePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            fileName
        );

        writeFileSync(filePath, buffer);
    }
};

export async function POST(request) {
    const data = await request.formData();
    const files = data.getAll("files");

    if (!files || files.length === 0) {
        return NextResponse.json("No se ha enviado ningun archivo", {
            status: 400,
        });
    }

    createFile(files);

    return NextResponse.json("Se ha enviado el archivo");
}
