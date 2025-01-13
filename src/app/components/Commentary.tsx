import { useEffect, useState } from "react";

const Commentary = () => {

    useEffect(() => {
        fetch('/api/commentary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topItems: localStorage.getItem('spotifyTopItems')})
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                console.log(data);
                localStorage.setItem("commentary", JSON.stringify(data));
            }
        }).catch(error => console.error("Failed to retrieve use commentary:", error));
    });

    return (

        <div>
            Here is a the commentary section
        </div>

    )
}

export default Commentary;

