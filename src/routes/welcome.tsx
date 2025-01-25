import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/lib/server";
import { useAuthStore } from "@/hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  component: WelcomePage,
});

function WelcomePage() {
  const [email, setEmail] = useState("");
  const [showFields, setShowFields] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: "/dashboard" });
  };

  const queryClient = useQueryClient();

  const checkEmailMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post("/auth/check-email", { email });
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        setIsExistingUser(data.exists);
        setShowFields(true);
      }
    },
  });

  const signInMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post("/auth/signin", credentials);
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        useAuthStore.getState().setAuth(data.session.token, data.session.user);
        queryClient.setQueryData(["user"], data.session.user);
        console.log("Signed in successfully!", data);
        handleClick();
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (userData: {
      email: string;
      password: string;
      name: string;
    }) => {
      const { data } = await api.post("/auth/signup", userData);
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(["user"], data.user);
        console.log("Signed up successfully!", data);
      }
    },
  });

  const isLoading =
    checkEmailMutation.isPending ||
    signInMutation.isPending ||
    signUpMutation.isPending;

  const handleContinue = () => {
    if (!showFields) {
      checkEmailMutation.mutate(email);
    } else if (isExistingUser) {
      signInMutation.mutate({ email, password });
    } else {
      signUpMutation.mutate({ email, password, name: fullName });
    }
  };

  return (
    <div className="w-screen h-screen bg-zinc-950 flex flex-col items-center justify-center">
      <Card className="w-[400px] py-10 px-12 bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center gap-8 shadow-2xl">
        <CardTitle className="text-2xl font-bold text-gray-50 tracking-tight">
          Welcome to SenpaiSync
        </CardTitle>
        <CardContent className="flex flex-col items-center gap-4 pb-0 w-full">
          <Button
            className="font-semibold text-gray-900 bg-white hover:bg-gray-100 w-full flex items-center gap-3 h-11"
            variant="outline"
          >
            <img src="/google.svg" alt="google-logo" className="h-5 w-5" />
            Continue with Google
          </Button>

          <div className="flex items-center gap-4 w-full my-2">
            <Separator className="bg-zinc-800 flex-1" />
            <span className="text-zinc-500 text-sm">or</span>
            <Separator className="bg-zinc-800 flex-1" />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || showFields}
              className="bg-zinc-800/50 border-zinc-700 placeholder:text-zinc-600 text-gray-100 h-11 focus:border-indigo-500 focus:ring-indigo-500/20"
            />

            {showFields && (
              <>
                {!isExistingUser && (
                  <Input
                    placeholder="Full Name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isLoading}
                    className="bg-zinc-800/50 border-zinc-700 placeholder:text-zinc-600 text-gray-100 h-11 focus:border-indigo-500 focus:ring-indigo-500/20"
                  />
                )}
                <Input
                  placeholder={isExistingUser ? "Password" : "New Password"}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-zinc-800/50 border-zinc-700 placeholder:text-zinc-600 text-gray-100 h-11 focus:border-indigo-500 focus:ring-indigo-500/20"
                />
              </>
            )}
          </div>

          <Button
            onClick={handleContinue}
            disabled={
              isLoading ||
              !email ||
              (showFields && (!password || (!isExistingUser && !fullName)))
            }
            className="font-semibold bg-indigo-600 hover:bg-indigo-500 w-full h-11 transition-colors disabled:bg-indigo-600/50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Loading..."
              : showFields
                ? isExistingUser
                  ? "Sign In"
                  : "Sign Up"
                : "Continue"}
          </Button>

          {showFields && (
            <button
              onClick={() => {
                setShowFields(false);
                setPassword("");
                setFullName("");
              }}
              className="text-sm text-zinc-500 hover:text-zinc-400 transition-colors"
            >
              Use a different email
            </button>
          )}
        </CardContent>

        <CardFooter className="flex flex-col text-zinc-500 text-sm text-center">
          <p className="leading-relaxed">
            Your team, your vibe, your sync
            <br />
            <span className="text-indigo-400">powered by SenpaiSync.</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
