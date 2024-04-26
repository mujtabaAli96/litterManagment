"use client";

import Header from "@/components/Header";
import { NextApiRequest, NextApiResponse } from "next";
import { useState, useEffect } from "react";

interface Complain {
  id: string;
  name: string;
  phone: string;
  picture?: string;
  location?: string;
  lat?: string;
  lang?: string;
  createdAt: string;
  status: number;
  userId: string;
}

const ComplainList: React.FC = () => {
  const [complains, setComplains] = useState<Complain[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reload,setReload] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";


  useEffect(() => {
    const fetchComplains = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${SERVER_ENDPOINT}/api/getAllComplain`);
        if (!response.ok) {
          throw new Error(`Failed to fetch complains: ${response.statusText}`);
        }
        const data = await response.json();
        setComplains(data);
      } catch (error) {
        console.error("Error fetching complains:", error);
        // setError(error?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplains();
  }, [reload]);

  const renderComplains = () => {
    if (isLoading) {
      return <p>Loading complains...</p>;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (!complains.length) {
      return <p>No complains found.</p>;
    }
    const handleSolveClick = async (complainId: string) => {
      // setSelectedComplainId(complainId); // Store selected complain ID
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/api/testing`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: complainId }), // Send complain ID in body
        });
    
        if (!response.ok) {
          throw new Error(`Failed to update complain: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log("Complain updated successfully:", data);
        setReload(!reload)
    
        // Handle successful update (optional)
        // - Update local complain state if needed
        // - Display a success message
    
      } catch (error) {
        console.error("Error updating complain:", error);
        // Handle error (optional)
        // - Display an error message
      }
    };
    return (
    
        <ul>
        {complains.map((complain) => (
          <li key={complain.id}>
            {/* Display complain details here */}
            <p>Id: {complain.id}</p>
            <p>Name: {complain.name}</p>
            <p>Phone: {complain.phone}</p>
            {complain.status==0&&<button 
            className="bg-green-600  px-2 text-white rounded-md mb-6"
            onClick={() => handleSolveClick(complain.id)} 
            >make it Solved</button>}

            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
       
     
    );
  };

  return (
    <>
    <Header/>
    <section className="bg-ct-blue-600 min-h-screen pt-20">
      <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-auto p-4 flex justify-center items-center">
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-5">Complains</h1>
      {renderComplains()}
    </div>
    </div>
      </section>
    </>
  );
};

export default ComplainList;
