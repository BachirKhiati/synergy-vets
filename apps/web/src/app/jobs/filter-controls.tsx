"use client";

import { FormEvent, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Flex, Select, TextField } from "@radix-ui/themes";

export type FilterOptions = {
  countries: string[];
  contractTypes: string[];
};

export type InitialFilters = {
  q?: string;
  country?: string;
  contractType?: string;
};

export function FilterControls({
  initial,
  options,
}: {
  initial: InitialFilters;
  options: FilterOptions;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initial.q ?? "");
  const [country, setCountry] = useState(initial.country ?? "");
  const [contractType, setContractType] = useState(initial.contractType ?? "");

  const sortedCountries = useMemo(() => [...new Set(options.countries)].sort(), [options.countries]);
  const sortedContractTypes = useMemo(() => [...new Set(options.contractTypes)].sort(), [options.contractTypes]);

  const applyFilters = (page = 1) => {
    const next = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      next.set("q", query.trim());
    } else {
      next.delete("q");
    }

    if (country) {
      next.set("country", country);
    } else {
      next.delete("country");
    }

    if (contractType) {
      next.set("contract_type", contractType);
    } else {
      next.delete("contract_type");
    }

    next.set("page", String(page));

    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: true });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyFilters(1);
  };

  const handleClear = () => {
    setQuery("");
    setCountry("");
    setContractType("");

    const next = new URLSearchParams(searchParams.toString());
    next.delete("q");
    next.delete("country");
    next.delete("contract_type");
    next.delete("page");

    const target = next.toString();
    router.push(target ? `${pathname}?${target}` : pathname, { scroll: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction={{ initial: "column", md: "row" }} gap="3" align={{ md: "center" }}>
        <TextField.Root
          placeholder="Search by title, keyword, or location"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1"
        />
        <Select.Root
          value={country || undefined}
          onValueChange={(value) => setCountry(value === "__all__" ? "" : value)}
        >
          <Select.Trigger placeholder="All countries" className="w-full md:w-[200px]" />
          <Select.Content>
            <Select.Item value="__all__">All countries</Select.Item>
            {sortedCountries.map((value) => (
              <Select.Item key={value} value={value}>
                {value}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Select.Root
          value={contractType || undefined}
          onValueChange={(value) => setContractType(value === "__all__" ? "" : value)}
        >
          <Select.Trigger placeholder="All contract types" className="w-full md:w-[200px]" />
          <Select.Content>
            <Select.Item value="__all__">All contract types</Select.Item>
            {sortedContractTypes.map((value) => (
              <Select.Item key={value} value={value}>
                {value}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Flex gap="2">
          <Button type="submit" color="cyan">
            Apply
          </Button>
          <Button type="button" variant="soft" onClick={handleClear}>
            Clear
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
