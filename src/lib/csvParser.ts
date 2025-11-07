import { Establishment } from '@/types/establishment';

export function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

export function csvToEstablishments(csvContent: string): Establishment[] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const headers = parseCSVLine(lines[0]);

  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const establishment: Partial<Establishment> = {};

    headers.forEach((header, index) => {
      const value = values[index] || '';
      switch (header) {
        case 'imageUrl':
          establishment.imageUrl = value;
          break;
        case 'title':
          establishment.title = value;
          break;
        case 'totalScore':
          establishment.totalScore = parseFloat(value) || 0;
          break;
        case 'reviewsCount':
          establishment.reviewsCount = parseInt(value) || 0;
          break;
        case 'street':
          establishment.street = value;
          break;
        case 'city':
          establishment.city = value;
          break;
        case 'state':
          establishment.state = value;
          break;
        case 'countryCode':
          establishment.countryCode = value;
          break;
        case 'website':
          establishment.website = value;
          break;
        case 'phone':
          establishment.phone = value === '#ERROR!' ? '' : value;
          break;
        case 'categoryName':
          establishment.categoryName = value as Establishment['categoryName'];
          break;
        case 'url':
          establishment.url = value;
          break;
      }
    });

    return establishment as Establishment;
  });
}