import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { DashboardLayout } from "@/components/dashboard";
import { ProfileView } from "@/components/profile/profile-view";
import { useProfileContext } from "@/context/profile-context";

export default function ProfilePage() {
  const { profile } = useProfileContext();

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-neutral-600">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <ProfileView profile={profile} />
      </div>
    </DashboardLayout>
  );
}

