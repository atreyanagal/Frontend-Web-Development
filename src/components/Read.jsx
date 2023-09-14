import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Read = () => {

    const [data, setData] = useState();
    const [error, setError] = useState("");

    const [myStyle, setMyStyle] = useState({
        color: '#121212',
        backgroundColor: 'white'
    })

    const [setBtnText] = useState("Enable Dark Mode");

    const toggleStyle = () => {
        if (myStyle.color === '#121212') {
            setMyStyle({
                color: 'white',
                backgroundColor: '#121212'
            })
            setBtnText("Enable Light Mode");
        }
        else {
            setMyStyle({
                color: '#121212',
                backgroundColor: 'white'
            });
            setBtnText("Enable Dark Mode");
        }
    }

    async function getData() {

        const response = await fetch("http://localhost:5000");

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }

        if (response.ok) {
            setData(result);
        }
    }

    const handleDelete = async (id) => {

        const response = await fetch(`http://localhost:5000/${id}`,
            {
                method: "DELETE"
            });

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }

        if (response.ok) {
            setError("Deleted Successfully");

            if (id) {
                clearTimeout(id);
            }

            setTimeout(() => {

                setError("");
                getData()

            }, 2000);
        }

    };

    useEffect(() => {
        getData()
    }, []);

    console.log(data);

    return (

        <body style={myStyle}>

            <div className="container my-2" style={myStyle}>

                {error && <div class="alert alert-danger">
                    {error}
                </div>}

                <div class="form-check form-switch">


                    <label class="form-check-label" for="flexSwitchCheckDefault"></label>

                    <input class="form-check-input" type="checkbox" onClick={toggleStyle} id="flexSwitchCheckDefault" />

                </div>

                <h2 className="text-center">All Posts</h2>

                <div className="row" style={myStyle}>

                    {data ? (data.map((ele) => (

                        <div key={ele._id} className="col-3" style={myStyle}>
                            <div className="card" style={myStyle}>
                                <div className="card-body" style={myStyle}>
                                    <h5 className="card-title">{ele.name}</h5>
                                    <h6 className="card-subtitle mb-2">{ele.email}</h6>
                                    <p className="card-text">{ele.desc}</p>
                                    <Link to={`/${ele._id}`} style={{
                                        marginRight: "4px",
                                        pointerEvents: localStorage.getItem("email") === ele.email ? '' : 'none'
                                    }} className="btn btn-primary">Edit</Link>
                                    <a href="#" className="btn btn-primary" onClick={() => handleDelete(ele._id)}
                                        style={{ pointerEvents: localStorage.getItem("email") === ele.email ? '' : 'none' }}
                                    >Delete</a>
                                </div>
                            </div>
                        </div>
                    ))) : (<p>No data available.</p>)}
                </div>

            </div>
        </body>

    )
}

export default Read