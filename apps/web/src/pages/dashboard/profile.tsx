import { DashboardLayout } from "@/components/dashboard";
import { ProfileView } from "@/components/profile/profile-view";
import { useProfileContext } from "@/context/profile-context";

export function ProfilePage() {
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
      <ProfileView profile={profile} />
    </DashboardLayout>
  );
}

