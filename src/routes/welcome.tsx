import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/welcome")({
  component: WelcomePage,
});

function WelcomePage() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    if (email && !showPassword) {
      setShowPassword(true);
    } else if (email && password) {
      // Handle sign in logic here
      console.log("Signing in with:", email, password);
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
              className="bg-zinc-800/50 border-zinc-700 placeholder:text-zinc-600 text-gray-100 h-11 focus:border-indigo-500 focus:ring-indigo-500/20"
            />

            {showPassword && (
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 placeholder:text-zinc-600 text-gray-100 h-11 focus:border-indigo-500 focus:ring-indigo-500/20"
              />
            )}
          </div>

          <Button
            onClick={handleContinue}
            className="font-semibold bg-indigo-600 hover:bg-indigo-500 w-full h-11 transition-colors"
          >
            {showPassword ? "Sign In" : "Continue"}
          </Button>

          {showPassword && (
            <button
              onClick={() => setShowPassword(false)}
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
