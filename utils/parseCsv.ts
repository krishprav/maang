// utils/parseCsv.ts
import Papa from 'papaparse';
import { Problem } from './types';

export const getCompanyProblems = async (
  company: string,
  duration: string
): Promise<Problem[]> => {
  try {
    // Convert duration to space-separated format
    const durationMap: Record<string, string> = {
      thirtyDays: 'thirty-days',
      threeMonths: 'three-months',
      sixMonths: 'six-months',
      moreThanSixMonths: 'more-than-six-months',
      all: 'all'
    };

    // Validate inputs
    if (!company || !duration) {
      throw new Error('Missing company/duration parameters');
    }

    // Encode special characters
    const safeCompany = encodeURIComponent(company);
    const safeDuration = encodeURIComponent(durationMap[duration] || duration);
    
    const csvPath = `/company-data/${safeCompany}/${safeDuration}.csv`;
    console.log('Attempting to fetch CSV from:', csvPath);

    const response = await fetch(csvPath);
    
    if (!response.ok) {
      throw new Error(
        `CSV fetch failed (${response.status}): ${csvPath}\n` +
        `Verify file exists at public/company-data/${company}/${safeDuration}.csv`
      );
    }

    const csvData = await response.text();
    const result = Papa.parse<Problem>(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    if (result.errors.length > 0) {
      console.error('CSV parsing errors:', result.errors);
      throw new Error('Invalid CSV format');
    }

    return result.data;
  } catch (error) {
    console.error('CSV Load Error:', {
      company,
      duration,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
};