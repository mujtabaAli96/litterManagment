import Header from "@/components/Header";

export default function Contact() {
  return (
    <>
      <Header />
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-auto flex justify-center items-center">
        <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl font-bold mb-8">CONTACT US</h1>
      <div className="flex flex-col items-center mb-8">
        <p className="text-xl mb-2">Phone:</p>
        <a href="tel:311" className="text-blue-500">
          311
        </a>
        {/* <br /> */}
         Or
        <a href="tel:616-456-3000" className="text-blue-500">
          616-456-3000
        </a>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl mb-2">Location:</p>
        <p className="text-lg">City Hall,</p>
        <p className="text-lg">300 Monroe Ave NW</p>
        <p className="text-lg">Grand Rapids, 49503</p>
        <a href="https://www.google.com/maps/place/City+Hall/@42.962452,-85.668632,17z/data=!3m1!4b1!4m5!3m4!1s0x881f9a90e1e19c1f:0x55e0b0d21f6b8e0!8m2!3d42.962452!4d-85.666443" className="text-blue-500 underline">
          View Map
        </a>
      </div>
    </div>
        </div>
      </section>
    </>
  );
}
