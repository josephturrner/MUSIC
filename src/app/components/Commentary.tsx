import { useEffect, useState } from "react";
import Image from "next/image";

const Commentary = () => {

    const [commentary, setCommentary] = useState<string | null>(null)

    const generateNewCommentary = async () => {

        console.log("new commentary!");

        fetch('/api/commentary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topItems: localStorage.getItem('spotifyTopItems')})
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                localStorage.setItem("commentary", JSON.stringify(data));
                setCommentary(data.message);
            }
        }).catch(error => console.error("Failed to retrieve use commentary:", error));
    }

    useEffect(() => {
        generateNewCommentary();
    });

    return (


        <div className="fixed right-24 top-20 flex-col items-center justify-start w-1/4">

            {commentary && (
                <p>
                    {commentary}
                </p>
            )}

            <button 
            onClick={generateNewCommentary} 
            className="flex items-center justify-center rounded-full"
            style={{ height: '3.5rem', width: '3.5rem' }}
            >
                <Image 
                    src="/images/refresh.svg"
                    alt=""
                    width={500}
                    height={500}
                    style={{ height: '3rem', width: '3rem' }}
                />
            </button>

        </div>

    )
}

export default Commentary;

