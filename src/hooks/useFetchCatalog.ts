import { useEffect, useState } from "react";

import { fetchCatalog } from "@/api/api";

export function useFetchCatalog() {
  const [options, setOptions] = useState([""]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const result = await fetchCatalog();

        setOptions(result.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load options";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    void loadOptions();
  }, []);

  return { options, loading, error };
}
