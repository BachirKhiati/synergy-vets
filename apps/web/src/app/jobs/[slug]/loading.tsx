import Link from "next/link";
import { Box, Button, Card, Container, Flex, Grid, Heading, Section } from "@radix-ui/themes";

function PlaceholderLine({ width }: { width: string }) {
  return <div className={`h-4 animate-pulse rounded-full bg-white/10 ${width}`} />;
}

export default function LoadingJobDetail() {
  return (
    <Section size="3" className="px-4 py-20 md:px-8">
      <Container size="3">
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="3">
            <Box className="space-y-3">
              <div className="h-12 w-3/4 animate-pulse rounded-lg bg-white/10" />
              <div className="h-4 w-1/3 animate-pulse rounded-full bg-white/10" />
              <div className="h-3 w-1/2 animate-pulse rounded-full bg-white/5" />
            </Box>
            <Flex gap="3" wrap="wrap">
              <Button disabled radius="full">
                Loading…
              </Button>
              <Button asChild variant="soft" color="gray" radius="full">
                <Link href="/jobs">Back to job board</Link>
              </Button>
            </Flex>
          </Flex>

          <Card className="glass-card-muted">
            <Flex direction="column" gap="4" p="6">
              <Heading size="4" className="font-heading">
                Role snapshot
              </Heading>
              <Grid columns={{ initial: "1", sm: "2" }} gap="4">
                <PlaceholderLine width="w-3/4" />
                <PlaceholderLine width="w-1/2" />
                <PlaceholderLine width="w-2/3" />
                <PlaceholderLine width="w-5/6" />
                <PlaceholderLine width="w-1/3" />
                <PlaceholderLine width="w-2/5" />
              </Grid>
            </Flex>
          </Card>

          <Card className="glass-card">
            <Flex direction="column" gap="4" p="6">
              <Heading size="6" className="font-heading">
                The opportunity
              </Heading>
              <Flex direction="column" gap="3">
                <PlaceholderLine width="w-full" />
                <PlaceholderLine width="w-11/12" />
                <PlaceholderLine width="w-10/12" />
                <PlaceholderLine width="w-9/12" />
              </Flex>
            </Flex>
          </Card>

          <Card className="glass-card-muted">
            <Box p="5">
              <PlaceholderLine width="w-2/3" />
            </Box>
          </Card>
        </Flex>
      </Container>
    </Section>
  );
}
