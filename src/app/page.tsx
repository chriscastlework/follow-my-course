import AuthButtons from "@/components/home/auth-screen/AuthButtons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    // <BaseLayout renderSidePanel={false} renderRightPanel={false}>
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl w-full rounded-xl shadow-2xl p-8 backdrop-filter backdrop-blur-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Learn from Your Favorite Instagrammers
          </h1>
          <p className="text-xl mb-8 text-center">
            Discover exclusive courses taught by the world's best instructors -
            straight from your Instagram feed to our platform!
          </p>
          <ul className="list-disc list-inside mb-8 space-y-2 text-lg">
            <li>Access premium content from top influencers</li>
            <li>Learn at your own pace with flexible schedules</li>
            <li>Join a community of passionate learners</li>
            <li>Get personalized feedback and support</li>
            <li>Earn certificates to boost your resume</li>
          </ul>
          <div className="text-center italic">
            <p className="text-lg mb-4">
              "This platform changed my life! I learned so much from my favorite
              Instagram guru!" - Happy Student
            </p>
            <p className="text-lg">
              "The courses here are top-notch. I've gained skills I never
              thought possible!" - Successful Learner
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Featured Instructors</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Add instructor avatars or placeholders here */}
            <div className="w-20 h-20 rounded-full bg-gray-300"></div>
            <div className="w-20 h-20 rounded-full bg-gray-300"></div>
            <div className="w-20 h-20 rounded-full bg-gray-300"></div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex space-x-5">
              <img
                alt=""
                className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
                src="https://source.unsplash.com/40x40/?portrait?1"
              />
              <img
                alt=""
                className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
                src="https://source.unsplash.com/40x40/?portrait?2"
              />
              <img
                alt=""
                className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
                src="https://source.unsplash.com/40x40/?portrait?3"
              />
              <img
                alt=""
                className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-gray-300 dark:ring-offset-gray-100"
                src="https://source.unsplash.com/40x40/?portrait?4"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    // </BaseLayout>
  );
}
