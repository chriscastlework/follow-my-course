// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function PurchaseHistory({ purchases }) {
//   return (
//     <div className="mb-8">
//       <h2 className="text-2xl font-semibold mb-4">Purchase History</h2>
//       {purchases.length === 0 ? (
//         <p>No purchases made yet.</p>
//       ) : (
//         <div className="grid gap-4">
//           {purchases.map((purchase) => (
//             <Card key={purchase.id}>
//               <CardHeader>
//                 <CardTitle>
//                   {purchase.course
//                     ? purchase.course.title
//                     : purchase.ebook.title}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p>Type: {purchase.course ? "Course" : "Ebook"}</p>
//                 <p>
//                   Purchase Date:{" "}
//                   {new Date(purchase.orderDate).toLocaleDateString()}
//                 </p>
//                 <p>Price: ${(purchase.price / 100).toFixed(2)}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
