"use client";
import { useState } from "react";
export default function Home() {
    const [files, setFiles] = useState(null);
    const [images, setImages] = useState([]);

    const handleForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const file of files) {
            formData.append("files", file); // ITERAR POR CADA ARCHIVO Y AGREGARLO AL FORMDATA
        }

        // console.log(formData.getAll("files").length) DE ESTA MANERA SE PUEDE VER LA CANTIDAD DE ARCHIVOS QUE SE ESTAN ENVIANDO Y LIMITARLO

        const res = await fetch("/api/upload", {
            method: "POST",
            // body: files, Esto no funciona ya que body envia datos en formato json
            body: formData,
        });
        const data = await res.json();
        console.log(data.uploadedFiles);
        setImages(data.uploadedFiles);
    };

    return (
        <main className="p-24">
            <form
                onSubmit={(e) => {
                    handleForm(e);
                }}
            >
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        setFiles(e.target.files);
                    }}
                    className="bg-red-400"
                />
                <button type="submit">Upload</button>
            </form>
            <div className="flex mt-10 w-52 gap-8">
                {images &&
                    images.map((img) => (
                        <img
                            src={img.secure_url}
                            key={img.secure_url}
                            alt={img.secure_url}
                        />
                    ))}
            </div>
        </main>
    );
}
