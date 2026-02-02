'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Group, Pagination as MantinePagination, Select } from '@mantine/core';

import config from '@/shared/config';

interface Props {
  total: number;
  current: number;
  pageSize?: number;
}

const Pagination = ({ total, current, pageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const resolvedPageSize = Number(pageSize ?? config.list.perPage);
  const safePageSize = Number.isFinite(resolvedPageSize) ? resolvedPageSize : config.list.perPage;
  const pageSizeOptions = config.list.pageSize.includes(safePageSize)
    ? config.list.pageSize
    : [...config.list.pageSize, safePageSize].sort((a, b) => a - b);
  const selectedPageSize = pageSizeOptions.includes(safePageSize) ? safePageSize : config.list.perPage;
  const pages = Math.ceil(total / safePageSize);

  const updateSearch = (next: Record<string, unknown>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        params.delete(key);
        return;
      }

      params.set(key, String(value));
    });

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleChange = (value: number) => {
    updateSearch({ page: value });
  };

  const handlePageSizeChange = (value: string | null) => {
    if (!value) {
      return;
    }

    updateSearch({ page: 1, perPage: Number(value) });
  };

  return (
    <Group justify="space-between">
      <MantinePagination total={pages} value={current} onChange={handleChange} />

      <Select
        value={String(selectedPageSize)}
        onChange={handlePageSizeChange}
        data={pageSizeOptions.map(size => ({ value: String(size), label: String(size) }))}
        size="xs"
        allowDeselect={false}
        w={100}
      />
    </Group>
  );
};

export default Pagination;
