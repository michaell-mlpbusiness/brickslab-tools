export interface SearchResult {
  label: string;
  href: string;
  description?: string;
  section?: string;
  type?: "web" | "mobile";
}

export interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onSelect?: (result: SearchResult) => void;
}
