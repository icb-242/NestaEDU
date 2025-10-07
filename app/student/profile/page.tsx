"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, School, Calendar, Loader2, Camera, Upload } from "lucide-react";
import { ImageCropper } from "@/components/image-cropper";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    school: "",
    grade: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string>("");
  const [fullImage, setFullImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch user profile from database
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/user/profile");
        if (!response.ok) {
          throw new Error("Failed to load profile");
        }
        const data = await response.json();
        setUserProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          school: data.school || "",
          grade: data.gradeLevel || "",
          avatar: data.avatar || "",
        });
        setFullImage(data.fullImage || "");
      } catch (e) {
        console.error("Error loading profile:", e);
        setError("Failed to load profile. Please try again.");
        
        // Fallback to localStorage
        const localProfile = localStorage.getItem("userProfile");
        if (localProfile) {
          try {
            setUserProfile(JSON.parse(localProfile));
          } catch (err) {
            console.error("Error parsing local profile:", err);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getUserInitials = () => {
    const first = userProfile.firstName || "";
    const last = userProfile.lastName || "";
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase() || "ST";
  };

  const handleInputChange = (field: string, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
    // Clear success message when editing
    if (successMessage) setSuccessMessage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      setFullImage(imageDataUrl);
      setTempImage(imageDataUrl);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage: string) => {
    setUserProfile(prev => ({ ...prev, avatar: croppedImage }));
    setShowCropper(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          phone: userProfile.email,
          gradeLevel: userProfile.grade,
          school: userProfile.school,
          avatar: userProfile.avatar,
          fullImage: fullImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedData = await response.json();
      setUserProfile({
        firstName: updatedData.firstName || "",
        lastName: updatedData.lastName || "",
        email: updatedData.email || "",
        school: updatedData.school || "",
        grade: updatedData.gradeLevel || "",
        avatar: updatedData.avatar || "",
      });
      
      // Also update localStorage for consistency
      localStorage.setItem("userProfile", JSON.stringify({
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        school: updatedData.school,
        grade: updatedData.gradeLevel,
        avatar: updatedData.avatar,
      }));
      
      setSuccessMessage("Profile updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (e) {
      console.error("Error saving profile:", e);
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Error Alert */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Success Alert */}
      {successMessage && (
        <Card className="border-green-500 bg-green-50 dark:bg-green-950">
          <CardContent className="pt-6">
            <p className="text-green-700 dark:text-green-400">{successMessage}</p>
          </CardContent>
        </Card>
      )}

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Your personal details and account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-2 border-primary/20">
                <AvatarImage src={userProfile.avatar} alt="Profile picture" />
                <AvatarFallback className="text-2xl font-bold">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              {/* Upload overlay */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="font-semibold text-lg">
                  {userProfile.firstName || userProfile.lastName
                    ? `${userProfile.firstName} ${userProfile.lastName}`
                    : "Student"}
                </h3>
                <p className="text-sm text-muted-foreground">{userProfile.email || "No email set"}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload New Picture
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Profile Details */}
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

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Preferences</CardTitle>
          <CardDescription>Customize your learning experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Course Progress</div>
              <div className="text-sm text-muted-foreground">Track your progress through courses</div>
            </div>
            <div className="text-sm font-medium text-primary">Active</div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Learning Reminders</div>
              <div className="text-sm text-muted-foreground">Get notified about incomplete lessons</div>
            </div>
            <div className="text-sm font-medium text-muted-foreground">Coming Soon</div>
          </div>
        </CardContent>
      </Card>

      {/* Image Cropper Modal */}
      <ImageCropper
        isOpen={showCropper}
        onClose={() => setShowCropper(false)}
        onCrop={handleCropComplete}
        imageSrc={tempImage}
      />
    </div>
  );
}

