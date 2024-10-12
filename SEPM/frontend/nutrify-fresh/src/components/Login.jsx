import { useState,useContext, useEffect } from "react" //for utilising react features
import { UserContext } from "../contexts/UserContext"; //context passes data globally with variable and function
import { Link,useNavigate } from "react-router-dom" //Link for accessible navigation and useNavigate for navigating routes
export default function Login() //creates functional component login
{
    const loggedData = useContext(UserContext); //useContext accesses information of logged in user from UserContext file

    const navigate = useNavigate(); //navigate between different pages

    const [userCreds,setUserCreds] = useState({ //State to manage user login credentials.
                                                // Accessed data from the UserContext will be stored in userCreds.
        email:"",
        password:""
    })

    const [message,setMessage] = useState({ // State to manage messages displayed to the user.
                                           // setMessage will update the message type and text based on user actions.
        type:"invisible-msg",
        text:"Dummy Msg"
    })

    

    function handleInput(event)         // Update the user credentials state when input fields change.
                                        // The spread operator is used to preserve the existing state and update only the changed field.
    {
        setUserCreds((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value};
        })
    }

    function handleSubmit(event) // Prevent the default form submission behavior
    {   
        event.preventDefault();
        console.log(userCreds); // Log the current user credentials for debugging


        fetch("http://localhost:8000/login",{  // Send a POST request to the login endpoint
            method:"POST",
            body:JSON.stringify(userCreds),   // Convert user credentials to JSON string
            headers:{
                "Content-Type":"application/json" // Set request header to specify JSON content type
            }
        })
        .then((response)=>{            // Check the response status code

            if(response.status===404)
            {
                setMessage({type:"error",text:"Username or Email Doesnt Exist"});
            }
            else if(response.status===403) {
                setMessage({type:"error",text:"Incorrect Password"});
            }
           

            setTimeout(()=>{            // Set a timeout to hide the message after 5 seconds
                setMessage({type:"invisible-msg",text:"Dummy Msg"})
            },5000)

            return response.json();    // Parse the response body as JSON
            
            
        })
        .then((data)=>{

           

            if(data.token!==undefined) // Check if a token is present in the response data
            {
                localStorage.setItem("nutrify-user",JSON.stringify(data)); // Store user data in local storage

                loggedData.setLoggedUser(data); // Update the logged-in user data using the context

                navigate("/track"); 
            }

        })
        .catch((err)=>{
            console.log(err);
        })


    }


    return (
        <section className="container">
            

            <form className="form" onSubmit={handleSubmit}>

                <div style={{ marginBottom: '100px' }}></div>

                <h1>Login To NutriDiary</h1>

                <div className="image-placeholder"></div>
                

                <input className="inp" required type="email" onChange={handleInput}
                placeholder="Enter Email" name="email" value={userCreds.email}/>

                  

                <input className="inp" maxLength={8} type="password" onChange={handleInput} 
                placeholder="Enter Password" name="password" value={userCreds.password}/>

                <div style={{ marginBottom: '0.05px' }}></div>
     

                <button className="btn">Login</button>

                <p>Dont Have an Account ? <Link to="/register">Register Now</Link></p>

                <p className={message.type}>{message.text}</p>

            </form>
            
        </section>
    )
}