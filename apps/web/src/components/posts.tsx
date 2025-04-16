import {
  useQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";



export function Posts() {
const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
        const response = await fetch(
            "https://api.github.com/repos/TanStack/query"
        );
        const data = await response.json();
        
        await delay(15000);
        
        return data;
    },
});

  if (isPending) { toast.info("the data is currently fetching"); return "Fetching..."; }

  if (error) { toast.error("Error fetching data", { description: error.message }); return null; };

  return (
    <div>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}
