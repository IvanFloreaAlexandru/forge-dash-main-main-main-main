import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Mail,
  Apple,
  Lock,
  GitBranch, // Iconița pentru partea stângă
  Rocket, // Iconița testimonialului
  User, // Iconiță pentru profil utilizator
  Workflow, // Iconițe pentru companii
  ClipboardList,
  Users,
  Code,
  Cloud,
  HardDrive,
  GitPullRequest,
  Target,
  Laptop,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log("Login attempt:", data);
    toast({
      title: "Login successful",
      description: "Welcome back to your dashboard!",
    });
    navigate("/");
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} login`,
      description: `${provider} authentication would be implemented here.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans text-gray-900 bg-black">
      {/* Left Side: Login Form - se extinde pe jumătate din ecran */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
        {/* Container pentru a centra conținutul și a limita lățimea formularului */}
        <div className="max-w-md w-full">
          <div className="mb-10">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                <GitBranch className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-black">DevOpsFlow</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Sign In to Your Workspace
            </h1>
            <p className="text-gray-600 text-lg">
              Plan, track, and collaborate on your projects seamlessly.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-700" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`pl-10 pr-4 py-2 border rounded-lg w-full text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-red-300 focus:border-red-500 transition-all duration-200 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-black font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-700" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`pl-10 pr-10 py-2 border rounded-lg w-full text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-red-300 focus:border-red-500 transition-all duration-200 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end text-sm">
              <Link
                to="/forgot-password"
                className="text-red-600 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Google")}
              className="w-full flex items-center justify-center gap-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="h-4 w-4"
              />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Apple")}
              className="w-full flex items-center justify-center gap-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <Apple className="h-4 w-4" />
              Continue with Apple
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-red-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Promotional Content with Enhanced Gradient & Shine */}
      <div className="hidden md:flex w-full md:w-1/2 p-12 lg:p-16 flex-col justify-between text-white relative overflow-hidden">
        {/* Enhanced Gradient Background (Culori originale) */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #333333, #dd1818)",
          }}
        ></div>

        {/* Shine Effect */}
        <div
          className="absolute inset-0 opacity-20 z-0"
          style={{
            background:
              "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.2) 0%, transparent 40%), radial-gradient(circle at 0% 100%, rgba(255,255,255,0.2) 0%, transparent 40%)",
          }}
        ></div>

        {/* Grain Effect Layer - Folosește calea relativă către fișier */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "url('/images/textura.png')",
            opacity: 0.5,
            backgroundSize: "256px 256px",
            pointerEvents: "none",
          }}
        ></div>

        {/* Content (Z-index ensures it's above gradients and grain) */}
        <div className="relative z-10 space-y-6 max-w-md mx-auto flex flex-col justify-center h-full">
          <h2 className="text-4xl font-extrabold leading-tight drop-shadow-lg">
            Empower Your Team. Deliver with Confidence.
          </h2>
          <div className="relative pl-10">
            <Rocket className="absolute left-0 top-0 h-8 w-8 text-blue-300 drop-shadow" /> {/* Iconiță Rocket */}
            <p className="text-lg italic text-gray-200 drop-shadow">
              "Our team's productivity soared with this platform. Streamlined workflows and seamless collaboration are game-changers."
            </p>
          </div>
          <div className="flex items-center mt-6">
            {/* Iconiță User în loc de imagine */}
            <div className="w-12 h-12 rounded-full mr-3 border-2 border-blue-300 shadow-md flex items-center justify-center bg-gray-700">
              <User className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="font-semibold text-lg text-white">
                Alex Devlin
              </p>
              <p className="text-blue-200 text-sm">
                Lead Project Manager at Innovate Solutions
              </p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-sm uppercase tracking-wider text-blue-100 mb-4 font-semibold">
              Trusted by Leading Innovators
            </p>
            <div className="grid grid-cols-3 gap-6 opacity-90">
              {/* Logo-uri reale de companii pe fundal alb, cu text dedesubt */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <Workflow className="h-full w-full object-contain text-gray-800" />
                </div>
                <span className="text-xs text-white mt-2">Microsoft</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <ClipboardList className="h-full w-full object-contain text-gray-800" />
                </div>
                <span className="text-xs text-white mt-2">Asana</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <Users className="h-full w-full object-contain text-gray-800" />
                </div>
                <span className="text-xs text-white mt-2">Jira</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <Code className="h-full w-full object-contain text-gray-800" />
                </div>
                <span className="text-xs text-white mt-2">Slack</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <Cloud className="h-full w-full object-contain text-gray-800" />
                </div>
                <span className="text-xs text-white mt-2">Dropbox</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <HardDrive className="h-full w-full object-contain text-gray-800" />
                </div>
                <span className="text-xs text-white mt-2">Atlassian</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <GitPullRequest className="h-full w-full object-contain text-gray-800" />
                </div>
                <span className="text-xs text-white mt-2">GitHub</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <Target className="h-full w-full object-contain text-gray-800" />
                </div>
                <span className="text-xs text-white mt-2">GitLab</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}