"use server";
import { getCompanyProblems } from "@/utils/parseCsv";
export async function onSelectAction(company: string, duration: string) {
  // Perform server-side logic here
  console.log(`Selected company: ${company}, duration: ${duration}`);
  // Example: Fetch data from an API or database
  const problems = await getCompanyProblems(company, duration);
  return problems;
}