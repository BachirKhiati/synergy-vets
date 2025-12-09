import Link from "next/link";
import { Box, Button, Card, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";

export default function JobNotFound() {
  return (
    <Section size="3" className="px-4 py-20 md:px-8">
      <Container size="3">
        <Card className="glass-card-muted">
          <Flex direction="column" gap="4" p="8" align="start">
            <Heading size="8" className="font-heading">
              Role not available
            </Heading>
            <Text size="4" className="text-white/75">
              We couldn&rsquo;t find an active position for this link. The role may have closed or moved.
            </Text>
            <Box>
              <Button asChild color="cyan">
                <Link href="/jobs">Browse open roles</Link>
              </Button>
            </Box>
          </Flex>
        </Card>
      </Container>
    </Section>
  );
}
