"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Button, Card, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";

import { useAuth } from "../providers";

export default function StaffPortalPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const isStaff = user ? ["staff", "admin"].includes(user.role.toLowerCase()) : false;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/auth/login?next=/staff");
      return;
    }

    if (!isStaff) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, isStaff, router]);

  if (isLoading || !user || !isStaff) {
    return (
      <Section size="3" className="px-4 py-20 md:px-8">
        <Container size="2">
          <Card className="glass-card-muted p-6 text-center">
            <Text size="3" className="text-white/70">
              Checking staff permissions…
            </Text>
          </Card>
        </Container>
      </Section>
    );
  }

  return (
    <Section size="3" className="px-4 py-20 md:px-8">
      <Container size="3">
        <Flex direction="column" gap="6">
          <Box>
            <Heading size="8" className="font-heading">
              Staff command centre
            </Heading>
            <Text size="4" className="text-white/70">
              Manage announcements, monitor applications, and orchestrate recruitment campaigns from one workspace.
            </Text>
          </Box>

          <Card className="glass-card-muted">
            <Flex direction="column" gap="4" p="6">
              <Text size="4" weight="medium">
                Quick links
              </Text>
              <Flex gap="3" wrap="wrap">
                <Button asChild color="cyan">
                  <Link href="/staff/jobs">Jobs pipeline</Link>
                </Button>
                <Button asChild color="cyan" variant="soft">
                  <Link href="/staff/announcements">Announcements</Link>
                </Button>
                <Button asChild color="purple" variant="soft">
                  <Link href="/staff/applications">Applications</Link>
                </Button>
              </Flex>
              <Button
                onClick={() => {
                  void logout();
                }}
                variant="soft"
                color="gray"
                className="mt-4 self-start"
              >
                Sign out
              </Button>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </Section>
  );
}
