import { Settings, User, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      <div className="space-y-4">
        {[
          { icon: User, title: "Profile", desc: "Update your name, email, and avatar" },
          { icon: Bell, title: "Notifications", desc: "Configure email and push notifications" },
          { icon: Shield, title: "Privacy & Security", desc: "Password, 2FA, and session management" },
        ].map((item) => (
          <div key={item.title} className="glass rounded-xl p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <Button variant="glass" size="sm">Edit</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
