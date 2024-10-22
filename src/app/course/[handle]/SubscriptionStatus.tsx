// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function SubscriptionStatus({ subscription, creatorId }) {
//   if (!subscription) {
//     return (
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Subscription</h2>
//         <p>You are not subscribed to this creator.</p>
//         <Link href={`/subscribe/${creatorId}`}>
//           <Button className="mt-2">Subscribe Now</Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="mb-8">
//       <h2 className="text-2xl font-semibold mb-4">Subscription</h2>
//       <p>You are subscribed to this creator.</p>
//       <p>
//         Subscription ends on:{" "}
//         {new Date(subscription.endDate).toLocaleDateString()}
//       </p>
//     </div>
//   );
// }
