"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Button, Card, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";

import { useAuth } from "../providers";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login?next=/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !user) {
    return (
      <Section size="3" className="px-4 py-20 md:px-8">
        <Container size="2">
          <Card className="glass-card-muted p-6 text-center">
            <Text size="3" className="text-white/70">
              Preparing your dashboard…
            </Text>
          </Card>
        </Container>
      </Section>
    );
  }

  const isStaff = ["staff", "admin"].includes(user.role.toLowerCase());

  return (
    <Section size="3" className="px-4 py-20 md:px-8">
      <Container size="3">
        <Flex direction="column" gap="6">
          <Box>
            <Heading size="8" className="font-heading">
              Hello, {user.email}
            </Heading>
            <Text size="4" className="text-white/70">
              Track your applications, manage preferences, and stay in sync with the latest announcements.
            </Text>
          </Box>

          <Card className="glass-card-muted">
            <Flex direction="column" gap="4" p="6">
              <Text size="4" weight="medium">
                Session overview
              </Text>
              <Text size="3" className="text-white/70">
                You are signed in as <strong>{user.role}</strong> with status <strong>{user.status}</strong>.
              </Text>
              <Flex gap="3" wrap="wrap">
                <Button
                  onClick={() => {
                    void logout();
                  }}
                  variant="soft"
                  color="gray"
                >
                  Sign out
                </Button>
                {isStaff ? (
                  <Button asChild color="cyan">
                    <Link href="/staff">Open staff portal</Link>
                  </Button>
                ) : null}
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </Section>
  );
}
