import Form from "next/form";
import { Search } from "lucide-react";
import Button from "./Button";

export default function SearchBar() {
  return (
    <Form
      action="/"
      scroll={false}
      className="maw-w-3xl mx-auto flex w-full flex-col items-center gap-3"
    >
      <label
        htmlFor="search"
        className="font-playfair-display text-text-primary text-lg font-bold tracking-wide"
      >
        Find somewhere worth staying
      </label>
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <input
          id="search"
          name="q"
          type="search"
          placeholder="Search for a venue"
          className="bg-surface border-border-control text-text-primary focus:ring-focus-ring flex-1 rounded-lg border px-4 py-2 outline-none focus:ring-2"
        />
        <Button
          type="submit"
          variant="primary"
          className="flex items-center justify-center gap-2"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Find your destination
        </Button>
      </div>
    </Form>
  );
}
