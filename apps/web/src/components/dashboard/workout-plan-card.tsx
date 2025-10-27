import { Calendar, CheckCircle2, Clock, Edit2, Flame, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import type { WorkoutPlan } from "@healthily-fit/shared";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculatePlanProgress,
  getCurrentWeekWorkouts,
  formatDayOfWeek,
} from "@/lib/workout-utils";

interface WorkoutPlanCardProps {
  plan: WorkoutPlan;
  onEdit?: () => void;
}

export function WorkoutPlanCard({ plan, onEdit }: WorkoutPlanCardProps) {
  const progress = calculatePlanProgress(plan);
  const currentWeekWorkouts = getCurrentWeekWorkouts(plan);

  const startDate = new Date(plan.startDate);
  const endDate = new Date(plan.endDate);

  const formattedStart = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedEnd = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-sm">
            <Calendar className="w-5 h-5 text-primary" />
            Active Workout Plan
          </CardTitle>
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Plan Overview */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neutral-600" />
            <span className="text-neutral-600">
              {formattedStart} - {formattedEnd}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="font-semibold text-success">{progress}% Complete</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all duration-medium"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Plan Stats */}
        <div className="grid grid-cols-3 gap-4 py-3 border-y border-neutral-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {plan.totalWeeks}
            </div>
            <div className="text-xs text-neutral-600 mt-1">Weeks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {plan.dailyWorkouts.length}
            </div>
            <div className="text-xs text-neutral-600 mt-1">Workouts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {plan.dailyWorkouts.reduce(
                (sum, w) => sum + w.exercises.length,
                0
              )}
            </div>
            <div className="text-xs text-neutral-600 mt-1">Exercises</div>
          </div>
        </div>

        {/* This Week's Workouts */}
        <div>
          <h4 className="font-semibold text-sm mb-3">This Week's Workouts</h4>
          {currentWeekWorkouts.length > 0 ? (
            <div className="space-y-2">
              {currentWeekWorkouts.map((workout) => (
                <div
                  key={workout.dayNumber}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {formatDayOfWeek(workout.dayOfWeek)}
                      </span>
                      <span className="text-xs text-neutral-500">
                        Day {workout.dayNumber}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">
                      {workout.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-neutral-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{workout.estimatedDurationMinutes} min</span>
                    </div>
                    {workout.targetCalories && (
                      <div className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        <span>{workout.targetCalories} cal</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 italic text-center py-4">
              No workouts scheduled for this week
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link to="/dashboard/workouts" className="flex-1">
            <Button variant="default" className="w-full">
              View Full Plan
            </Button>
          </Link>
          {progress === 100 && (
            <Button variant="outline" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Mark Complete
            </Button>
          )}
        </div>

        {plan.notes && (
          <p className="text-xs text-neutral-500 italic pt-2 border-t">
            {plan.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

