// "use client";
// import { useState } from "react";

// export default function AddTripForm() {
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.currentTarget);

//     await fetch("/api/trips", {
//       method: "POST",
//       body: formData,
//     });

//     setLoading(false);
//     alert("Trip Added!");
//     e.currentTarget.reset(); 
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
//       <input type="text" name="title" placeholder="Title" required />
//       <textarea name="description" placeholder="Description" required />
//       <input type="text" name="destination" placeholder="Destination" required />
//       <input type="number" name="price" placeholder="Price" required />
//       <input type="date" name="startDate" required />
//       <input type="date" name="endDate" required />
//       <input type="file" name="image" accept="image/*" required />
//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         {loading ? "Uploading..." : "Add Trip"}
//       </button>
//     </form>
//   );
// }
