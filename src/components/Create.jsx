import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [desc, setAge] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    console.log(name, email, desc);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const addUser = { name, email, desc }

        const response = await fetch("http://localhost:5000", {
            method: "POST",
            body: JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }

        if (response.ok) {
            console.log(result);
            setError("");
            setName("");
            setEmail("");
            setAge("");

            navigate("/all")

        }

    }

    return (

        <div className="container my-2" >

            {error && <div class="alert alert-danger">
                {error}
            </div>}
            <h2 className="text-center">Create Post</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">

                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <label className="form-label">Email address (This email should match your login email.)</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" value={desc} onChange={(e) => setAge(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>

            </form>

        </div>

    )
}

export default Create