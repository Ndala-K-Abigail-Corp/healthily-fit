import { Activity, BarChart3, Calendar, Flame, LineChart, Plus, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

import { calculateBMI, getBMICategory } from "@healthily-fit/shared";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-profile";

export function DashboardPage() {
  const { user } = useAuth();
  const { loading, profile } = useProfile();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card>
            <CardContent className="pt-lg">
              <p className="text-center mb-md">Please sign in to view your dashboard</p>
              <div className="flex justify-center gap-sm">
                <Link to="/auth/login">
                  <Button>Sign In</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading your dashboard...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md">
            <CardContent className="pt-lg text-center space-y-md">
              <p className="text-lg">Complete your profile to get started</p>
              <p className="text-sm text-neutral-600">
                We need some information to create your personalized workout plan
              </p>
              <Link to="/onboarding">
                <Button size="lg" className="mt-md">
                  Complete Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Inline BMI calculation
  const bmi = calculateBMI(profile.weightKg, profile.heightCm);
  const bmiCategory = getBMICategory(bmi);

  // Inline fitness goal formatting
  const formattedGoal = profile.fitnessGoal
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Mock data for chart placeholders (inline)
  const mockWeightData = [
    { date: "Week 1", weight: profile.weightKg + 2 },
    { date: "Week 2", weight: profile.weightKg + 1.5 },
    { date: "Week 3", weight: profile.weightKg + 1 },
    { date: "Week 4", weight: profile.weightKg },
  ];

  const mockActivityData = [
    { day: "Mon", minutes: 0 },
    { day: "Tue", minutes: 0 },
    { day: "Wed", minutes: 0 },
    { day: "Thu", minutes: 0 },
    { day: "Fri", minutes: 0 },
    { day: "Sat", minutes: 0 },
    { day: "Sun", minutes: 0 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Navbar />
      
      <main className="flex-1 py-xl px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-xl">
            {/* Header */}
            <div className="animate-fadeIn">
              <h1 className="font-heading text-3xl md:text-4xl font-bold">
                Welcome back, {user.displayName || "there"}! 👋
              </h1>
              <p className="text-neutral-600 mt-sm text-lg">
                Here's your fitness progress overview
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg animate-slideUp">
              <StatsCard
                icon={Activity}
                title="Current BMI"
                value={bmi.toFixed(1)}
                description={`Category: ${bmiCategory}`}
              />
              <StatsCard
                icon={Target}
                title="Current Weight"
                value={`${profile.weightKg} kg`}
                description={
                  profile.targetWeightKg
                    ? `Target: ${profile.targetWeightKg} kg`
                    : "No target set"
                }
              />
              <StatsCard
                icon={Flame}
                title="Workouts Completed"
                value="0"
                description="This week"
              />
              <StatsCard
                icon={TrendingUp}
                title="Fitness Goal"
                value={formattedGoal}
                description={`Diet: ${profile.dietaryPreference}`}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              {/* Active Workout Plan */}
              <Card className="animate-slideUp [animation-delay:100ms]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-sm">
                    <Calendar className="w-5 h-5 text-primary" />
                    Active Workout Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-xl space-y-md">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <Plus className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">No active workout plan</p>
                      <p className="text-sm text-neutral-600 mt-sm">
                        Generate your personalized plan to get started
                      </p>
                    </div>
                    <Button className="mt-md">
                      Generate Workout Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="animate-slideUp [animation-delay:200ms]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-sm">
                    <Activity className="w-5 h-5 text-accent" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-xl space-y-md">
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                      <Flame className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">No activities logged yet</p>
                      <p className="text-sm text-neutral-600 mt-sm">
                        Start working out and track your progress here
                      </p>
                    </div>
                    <Button variant="outline" className="mt-md">
                      Log Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              {/* Weight Progress Chart */}
              <Card className="animate-slideUp [animation-delay:300ms]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-sm">
                    <LineChart className="w-5 h-5 text-success" />
                    Weight Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex flex-col items-center justify-center space-y-md">
                    {/* Simple line chart placeholder */}
                    <div className="w-full h-48 bg-neutral-100 rounded-lg p-md flex items-end justify-around">
                      {mockWeightData.map((data, index) => {
                        const maxWeight = Math.max(...mockWeightData.map(d => d.weight));
                        const minWeight = Math.min(...mockWeightData.map(d => d.weight));
                        const heightPercent = ((data.weight - minWeight) / (maxWeight - minWeight)) * 80 + 10;
                        
                        return (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-success rounded-t transition-all duration-medium hover:bg-success/80"
                              style={{ height: `${heightPercent}%` }}
                            />
                            <span className="text-xs text-neutral-600 mt-xs">{data.date}</span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-sm text-neutral-600">
                      Track your weight changes over time
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Activity Chart */}
              <Card className="animate-slideUp [animation-delay:400ms]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-sm">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex flex-col items-center justify-center space-y-md">
                    {/* Bar chart placeholder */}
                    <div className="w-full h-48 bg-neutral-100 rounded-lg p-md flex items-end justify-around gap-xs">
                      {mockActivityData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div 
                            className="w-full bg-primary/30 rounded-t transition-all duration-medium hover:bg-primary"
                            style={{ height: data.minutes === 0 ? "10%" : `${data.minutes}%` }}
                          />
                          <span className="text-xs text-neutral-600 mt-xs">{data.day}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600">
                      Log workouts to see your weekly activity
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* BMI Trend Visualization */}
            <Card className="animate-slideUp [animation-delay:500ms]">
              <CardHeader>
                <CardTitle className="flex items-center gap-sm">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  BMI Trend & Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-lg">
                  {/* BMI Range Indicator */}
                  <div className="space-y-sm">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Your BMI: {bmi.toFixed(1)}</span>
                      <span className={`font-semibold ${
                        bmiCategory === "Normal weight" ? "text-success" :
                        bmiCategory === "Overweight" ? "text-warning" :
                        "text-error"
                      }`}>
                        {bmiCategory}
                      </span>
                    </div>
                    {/* BMI range bar */}
                    <div className="relative h-8 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="absolute inset-0 flex">
                        <div className="bg-blue-400" style={{ width: "18.5%" }} />
                        <div className="bg-success" style={{ width: "6.4%" }} />
                        <div className="bg-warning" style={{ width: "5%" }} />
                        <div className="bg-error flex-1" />
                      </div>
                      {/* Current BMI indicator */}
                      <div 
                        className="absolute top-0 bottom-0 w-1 bg-neutral-900"
                        style={{ 
                          left: `${Math.min(Math.max((bmi / 40) * 100, 0), 100)}%`,
                          transform: "translateX(-50%)"
                        }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded">
                          {bmi.toFixed(1)}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-600">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                    </div>
                  </div>

                  {/* Health Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-md pt-md border-t">
                    <div className="text-center p-md bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{profile.age}</div>
                      <div className="text-sm text-neutral-600 mt-xs">Years Old</div>
                    </div>
                    <div className="text-center p-md bg-accent/5 rounded-lg">
                      <div className="text-2xl font-bold text-accent">{profile.heightCm} cm</div>
                      <div className="text-sm text-neutral-600 mt-xs">Height</div>
                    </div>
                    <div className="text-center p-md bg-success/5 rounded-lg">
                      <div className="text-2xl font-bold text-success">
                        {profile.targetWeightKg ? `${Math.abs(profile.weightKg - profile.targetWeightKg).toFixed(1)} kg` : "N/A"}
                      </div>
                      <div className="text-sm text-neutral-600 mt-xs">
                        {profile.targetWeightKg ? "To Goal" : "Set Target"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


