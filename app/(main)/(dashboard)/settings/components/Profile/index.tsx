import { useCallback, useMemo, useState } from "react";
import { Pencil, Camera, Headphones, Mail, LogOut, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getInitials } from "@/utils/nameInitial";
import { logout } from "@/redux/features/auth/authSlice";

export const ProfileSettings = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { business } = useSelector((state: RootState) => state.business);

  const fullName = useMemo(() => user?.name || "User", [user]);
  const firstName = useMemo(() => fullName.split(" ")[0], [fullName]);
  const lastName = useMemo(() => {
    const names = fullName.split(" ");
    return names.length > 1 ? names[names.length - 1] : "";
  }, [fullName]);
  const initials = useMemo(() => getInitials(fullName), [fullName]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  // Sample profile data
  const profileData = {
    firstName: "Ella",
    lastName: "Chijoke",
    email: "mail@ivynest.com",
    phone: "+234 816 5678 213",
    addressCountry: "Nigeria",
    addressCity: "Ikeja/Lagos",
    addressStreet: "28, Folorusho",
    addressPostal: "200567",
    dateOfBirth: "08/12/1997",
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Profile Information Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-base tracking-[0.5px] font-normal align-middle text-[#010721]">
              PROFILE INFORMATION
            </h2>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="text-[#0046A7] border-[#0046A7] rounded-[12px] hover:text-[#0046A7] hover:bg-transparent transition-colors font-medium text-sm tracking-[0.1px] align-middle h-[56px]"
            >
              <Pencil className="h-[13.5px] w-[13.5px] mr-2" />
              Edit Information
            </Button>
          </div>

          {/* Avatar and Change Photo */}
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback className="bg-[#0046A7] text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="text-foreground border-input">
              <Camera className="h-4 w-4 mr-2" />
              Change Photo
            </Button>
          </div>

          {/* Profile Information Grid */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-6">
            <div className="border-b border-[#E0E0E0] pb-6">
              <div className="grid grid-cols-2">
                <div>
                  <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                    First Name
                  </label>
                  <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                    {firstName}
                  </p>
                </div>

                <div>
                  <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                    Last Name
                  </label>
                  <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                    {lastName}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-[#E0E0E0] pb-6">
              <div className="grid grid-cols-2">
                <div>
                  <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                    Email Address
                  </label>
                  <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                    {user?.email}
                  </p>
                </div>

                <div>
                  <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                    Phone Number
                  </label>
                  <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                    {user?.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-[#E0E0E0] pb-6">
              <div className="grid grid-cols-2">
                <div>
                  <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                    Address Country
                  </label>
                  <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                    {business?.country_name}
                  </p>
                </div>

                <div>
                  <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                    Address City/State
                  </label>
                  <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                    {business?.city}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-[#E0E0E0] pb-6">
              <div className="grid grid-cols-2">
                <div>
                  <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                    Address Street
                  </label>
                  <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                    {business?.address}
                  </p>
                </div>

                <div>
                  <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                    Address Postal Code
                  </label>
                  <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                    {business?.postal_code}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs tracking-[0.4px] align-middle text-[#605E5E] font-normal mb-1 block">
                Date of Birth
              </label>
              <p className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                {profileData.dateOfBirth}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Card */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-base tracking-[0.5px] font-normal align-middle text-[#010721] mb-8">
            SUPPORT
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Headphones className="h-5 w-5 text-foreground" />
              <span className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                Self Service
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-foreground" />
              <span className="text-sm tracking-[0.25px] align-middle text-[#010721] font-normal">
                Email Support
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Card */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-base tracking-[0.5px] font-normal align-middle text-[#010721] mb-8">
            ACCOUNT
          </h2>
          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Sign Out</span>
            </button>
            <button className="flex items-center gap-3 text-destructive hover:text-destructive/80 transition-colors">
              <Trash2 className="h-5 w-5" />
              <span className="text-sm">Delete Account</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
