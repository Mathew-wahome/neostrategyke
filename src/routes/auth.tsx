import mark from "@/assets/ns-mark.png.asset.json";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { ActionButton } from "@/components/ActionButton";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff sign in — NeoStrategy" },
      { name: "description", content: "Private sign in for the NeoStrategy operations dashboard." },
      { property: "og:title", content: "Staff sign in — NeoStrategy" },
      { property: "og:description", content: "Private sign in for the NeoStrategy dashboard." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your inbox if confirmation is required.");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setPending(false);
    }
  }

  async function onGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign in failed.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-wash px-6 py-20">
      <div className="w-full max-w-md rounded-sm border border-border/70 bg-background p-10">
        <Link to="/" aria-label="NeoStrategy home" className="group flex flex-col items-start gap-2">
          <img
            src={mark.url}
            alt="NeoStrategy monogram"
            width={512}
            height={524}
            className="h-11 w-auto transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div className="flex flex-col">
            <span className="font-display text-lg leading-none tracking-tight text-foreground">
              {brand.name}
            </span>
            <span className="font-ui mt-0.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Founder Operating System
            </span>
          </div>
        </Link>
        <h1 className="font-display mt-8 text-3xl leading-tight">
          {mode === "signin" ? "Sign in to the dashboard" : "Create your staff account"}
        </h1>
        <p className="font-ui mt-3 text-sm text-muted-foreground">
          Private area for the NeoStrategy team.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {mode === "signup" && (
            <Field label="Full name" value={name} onChange={setName} required />
          )}
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
          <ActionButton type="submit" disabled={pending} className="w-full justify-center">
            {pending ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </ActionButton>
        </form>

        <button
          type="button"
          onClick={onGoogle}
          className="font-ui mt-4 h-11 w-full rounded-sm border border-input text-sm transition-colors hover:bg-wash"
        >
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="font-ui mt-6 text-sm text-primary underline underline-offset-4"
        >
          {mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-ui text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-ui mt-2 h-11 w-full rounded-sm border border-input bg-background px-4 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
