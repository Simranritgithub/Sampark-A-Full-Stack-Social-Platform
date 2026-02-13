import GlassCard from "../components/Glasscard";
import Navbar from "../components/Navbar";

export default function DashboardPage() {
  return (
    
    <div className="min-h-screen bg-[#9929EA] pt-24 flex justify-center">
      <Navbar/>
      <div className="w-full max-w-6xl space-y-6">

        {/* Welcome Card */}
        <GlassCard>
          <h1 className="text-3xl font-bold text-black mb-2">
            Welcome to Sampark 👋
          </h1>
          <p className="text-black/70">
            This is your dashboard where you can manage your activity.
          </p>
        </GlassCard>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <GlassCard>
            <h2 className="text-lg font-semibold text-black">
              Connections
            </h2>
            <p className="mt-2 text-4xl font-bold text-[#9929EA]">
              128
            </p>
          </GlassCard>

          <GlassCard>
            <h2 className="text-lg font-semibold text-black">
              Posts
            </h2>
            <p className="mt-2 text-4xl font-bold text-[#FF5FCF]">
              42
            </p>
          </GlassCard>

          <GlassCard>
            <h2 className="text-lg font-semibold text-black">
              Notifications
            </h2>
            <p className="mt-2 text-4xl font-bold text-[#FAEB92]">
              7
            </p>
          </GlassCard>

        </div>

        {/* Activity Feed Placeholder */}
        <GlassCard>
          <h2 className="text-xl font-semibold text-black mb-3">
            Recent Activity
          </h2>

          <div className="space-y-3 text-black/70">
            <p>• You connected with 3 new people</p>
            <p>• Your post received 12 likes</p>
            <p>• New comment on your post</p>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
