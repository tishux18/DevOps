import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
export default function Private(props)
{

    const loggedData = useContext(UserContext);

    

    return (                          // Check if a user is logged in by verifying if loggedUser is not null in the loggedData context

        loggedData.loggedUser!==null? 
        <props.Component/>            // If user is logged in, render the component passed as a prop
        :
        <Navigate to="/login"/>       // If user is not logged in, redirect to the login page

    )

}