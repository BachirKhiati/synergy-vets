"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Section,
  Text,
  TextField,
} from "@radix-ui/themes";

import { useAuth } from "../../providers";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = searchParams.get("next") ?? "/dashboard";

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      router.replace(redirectTo);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section size="3" className="px-4 py-20 md:px-8">
      <Container size="2">
        <Flex direction="column" gap="6" align="center">
          <div className="text-center">
            <Heading size="8" className="font-heading">
              Welcome back
            </Heading>
            <Text size="4" className="text-white/70">
              Sign in to access your personalised dashboard and track applications.
            </Text>
          </div>

          <Card className="glass-card-muted w-full max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <Flex direction="column" gap="3">
                <TextField.Root
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField.Root
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Flex>

              {error ? (
                <Text size="2" color="red">
                  {error}
                </Text>
              ) : null}

              <Button type="submit" color="cyan" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </Card>

          <Text size="3" className="text-white/70">
            New to Synergy Vets?{" "}
            <Link href="/auth/register" className="text-cyan-300 underline">
              Create an account
            </Link>
            .
          </Text>
        </Flex>
      </Container>
    </Section>
  );
}
