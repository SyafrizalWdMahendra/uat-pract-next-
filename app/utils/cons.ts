import { FilterOptions } from "../lib/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const DEBOUNCE_DELAY = 500;

const DEFAULT_FILTER_OPTIONS: FilterOptions = {
  features: [],
  priorities: ["low", "medium", "high", "critical"],
  statuses: ["open", "closed", "in_progress", "resolved"],
};

const COLUMNTEXT = [
  { label: "Status", align: "left" },
  { label: "Priority", align: "left" },
  { label: "Feature", align: "left" },
  { label: "Test Scenario", align: "left" },
  { label: "Description", align: "left" },
  { label: "Author", align: "left" },
  { label: "Updated", align: "left" },
  { label: "Actions", align: "center" },
];

const ITEMS_PER_PAGE = 3;

export { API_BASE_URL, DEBOUNCE_DELAY, DEFAULT_FILTER_OPTIONS, COLUMNTEXT, ITEMS_PER_PAGE };
