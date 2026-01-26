import { useEffect, useState } from "react";

export default function SamplePage() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/sample-tasks/")

            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.error("Error fetching sample tasks data:", error);
            });
    }, []);


    console.log("Fetched tasks:", tasks);


    const handleDelete = (id: number) => {
        console.log("Deleting task with id:", id);

    }
    



    return (
        <div>
            {
                tasks.map((element:any) => (
                    <div key={element.id}>
                        <h2>{element.title}</h2>
                        <p>{element.created_at}</p>
                        <button
                            onClick={() => handleDelete(element.id)}
                            className="bg-yellow-500 rounded-md border-black border-2 hover:bg-red-500 hover:cursor-pointer">
                            Delete
                        </button>
                        <hr />
                    </div>
                )   )
            }
        </div>
    );
}
