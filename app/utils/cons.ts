import { FilterOptions } from "../lib/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const DEBOUNCE_DELAY = 500;

const DEFAULT_FILTER_OPTIONS: FilterOptions = {
  features: [],
  priorities: ["low", "medium", "high"],
  statuses: ["open", "closed", "in-progress"],
};

export { API_BASE_URL, DEBOUNCE_DELAY, DEFAULT_FILTER_OPTIONS };
