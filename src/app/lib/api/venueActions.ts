"use server";
import { getVenues } from "./venues";

export async function loadMoreVenues(page: number, query: string) {
  return getVenues({ page, query });
}
