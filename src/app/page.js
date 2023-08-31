"use client";
import { useState } from "react";

export default function Home() {
    const [files, setFiles] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false); // Nuevo estado para el loader

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true); // Activar el loader

        const formData = new FormData();

        if (!files) {
            return alert("Toma una foto o carga un archivo");
        } else {
            for (const file of files) {
                formData.append("files", file);
            }
        }

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        setImages(data.uploadedFiles);

        setLoading(false); // Desactivar el loader después de la solicitud
    };

    return (
        <main className="p-24">
            <form
                onSubmit={(e) => {
                    handleForm(e);
                }}
                className="flex flex-col gap-4"
            >
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        setFiles(e.target.files);
                    }}
                />
                <button
                    type="submit"
                    className="w-32 h-8 bg-gray-100 text-black"
                    disabled={loading} // Desactivar el botón mientras se carga
                >
                    {loading ? "Cargando..." : "Cargar"}
                </button>
            </form>
            {
                <div className="flex mt-10 w-52 gap-8">
                    {images.map((img) => (
                        <img
                            src={img.secure_url}
                            key={img.secure_url}
                            alt={img.secure_url}
                        />
                    ))}
                </div>
            }
        </main>
    );
}
