"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, School, Calendar, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    school: "",
    grade: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/user/profile");
        if (!response.ok) throw new Error("Failed to load profile");
        const data = await response.json();
        setUserProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          school: data.school || "",
          grade: data.gradeLevel || "",
        });
      } catch {
        setError("Failed to load profile. Please try again.");
        const local = localStorage.getItem("userProfile");
        if (local) {
          try { setUserProfile(JSON.parse(local)); } catch { /* ignore */ }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
    if (successMessage) setSuccessMessage(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          phone: userProfile.email,
          gradeLevel: userProfile.grade,
          school: userProfile.school,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedData = await response.json();

      setUserProfile({
        firstName: updatedData.firstName || "",
        lastName: updatedData.lastName || "",
        email: updatedData.email || "",
        school: updatedData.school || "",
        grade: updatedData.gradeLevel || "",
      });

      localStorage.setItem("userProfile", JSON.stringify({
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        school: updatedData.school,
        grade: updatedData.gradeLevel,
      }));

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);

      window.dispatchEvent(new CustomEvent("profileUpdated", {
        detail: {
          firstName: updatedData.firstName,
          lastName: updatedData.lastName,
          email: updatedData.email,
          school: updatedData.school,
          gradeLevel: updatedData.gradeLevel,
        },
      }));
    } catch {
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {successMessage && (
        <Card className="border-green-500 bg-green-50 dark:bg-green-950">
          <CardContent className="pt-6">
            <p className="text-green-700 dark:text-green-400">{successMessage}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Your personal details and account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>First Name</span>
                </div>
              </Label>
              <Input
                id="firstName"
                value={userProfile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Last Name</span>
                </div>
              </Label>
              <Input
                id="lastName"
                value={userProfile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter last name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </div>
              </Label>
              <Input
                id="email"
                type="email"
                value={userProfile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  <span>School</span>
                </div>
              </Label>
              <Input
                id="school"
                value={userProfile.school}
                onChange={(e) => handleInputChange("school", e.target.value)}
                placeholder="Enter school name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Grade Level</span>
                </div>
              </Label>
              <Input
                id="grade"
                value={userProfile.grade}
                onChange={(e) => handleInputChange("grade", e.target.value)}
                placeholder="Enter grade level"
              />
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="min-w-[120px]"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
