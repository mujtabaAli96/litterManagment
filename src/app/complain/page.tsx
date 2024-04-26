"use client";
import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Form() {
  const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [manualLocation, setManualLocation] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [location, setLocation] = useState<{ lat: string; lng: string } >({ lat: "", lng: "" });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const data = {
        name:name,
        phone:phoneNumber,
        // Handle picture (if applicable)
        picture: "picture",// ? picture.name : null, // Assuming picture stores filename
        location:manualLocation,
        lat:location?.lat,
        lang:location?.lng,
      };
  
      const response = await fetch(`${SERVER_ENDPOINT}/api/complain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Stringify the data object
      });
      if (response.ok) {
        toast.success("Your Complain has been added successfully");
      router.push("/userComplains")
      }
      console.log(response);
      // ... rest of the code
    } catch (error) {
      console.error("Error creating complain:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch("/complain", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name,
  //         phone:phoneNumber,
  //         picture: picture ? picture.name : null, // Assuming picture stores filename
  //         location: "location",
  //         lat: location?.lat,
  //         lang: location?.lng
  //       }),
  //     });
  
  //     const data = await response.json();
  
  //     if (!response.ok) {
  //       throw new Error(data.error || "Failed to create complain");
  //     }
  
  //     console.log("Complain created:", data.complain);
  //     toast.success("Your Complain has been added successfully");
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Error creating complain:", error);
  //     toast.error("An error occurred. Please try again.");
  //   }
    
  //   setTimeout(()=>{
      
  //     toast.success("Your Complain has been added successfully");
  //     router.push("/")

  //   },1000)
  //  };
  async function handleFormSubmission(formData: FormData) {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const picture = formData.get("picture") as string;
    const location = formData.get("location") as string;
  
    // try {
    //   const complain = await prisma.complain.create({
    //     data: {
    //       name,
    //       phone,
    //       picture,
    //       location: JSON.parse(location),
    //     },
    //   });
  
    //   console.log("Complain created:", complain);
    // } catch (error) {
    //   console.error("Error creating complain:", error);
    // }
  }

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPicture(event.target.files[0]);
    }
  };

  const handleLocationChange = (position: GeolocationPosition) => {
    setLocation({
      lat: (position.coords.latitude).toString(),
      lng: (position.coords.longitude).toString(),
    });
  };

  const getPicture = () => {
    if (picture) {
      return URL.createObjectURL(picture);
    }
    return "/path/to/default/image.jpg";
  };

  return (
    <>
      <Header />
      <section className="bg-ct-blue-600 min-h-[91dvh] grid place-items-center">
      <h1 className="text-4xl lg:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
          Add A Complain
          </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
      >
        <div>
          <label htmlFor="name" className="block text-ct-blue-600 mb-3">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-ct-blue-600 mb-3">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="picture" className="block text-ct-blue-600 mb-3">
            Picture
          </label>
          <input
            type="file"
            id="picture"
            accept="image/*"
            className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
            onChange={handlePictureChange}
          />
          {picture && <img src={getPicture()} alt="Picture" />}
        </div>
        <div>
          <label htmlFor="location" className="block text-ct-blue-600 mb-3">
            Location
          </label>
          <button
            type="button"
            className={
              "w-full py-3 font-semibold rounded-lg outline-none border-none flex justify-center bg-ct-yellow-600 bg-[#ccc]"
            }
            onClick={() =>
              navigator.geolocation.getCurrentPosition(handleLocationChange)
            }
          >
            Get Location
          </button>
          {location.lat!="" && (
            <p>
              Latitude: {location.lat},. Longitude: {location.lng}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-ct-blue-600 mb-3">
            Add location manually
          </label>
          <input
            type="text"
            id="manualLocation"
            className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
            // value={phoneNumber}
            onChange={(e) => setManualLocation(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      </section>

    </>
  );
}
