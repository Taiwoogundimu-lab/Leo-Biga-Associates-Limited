export interface ClientItem {
  id: number;
  name: string;
  sector: 'Banking & Finance' | 'Government & Public Sector' | 'Academic & Healthcare' | 'Corporate & International';
}

export const CLIENTS: ClientItem[] = [
  { id: 1, name: 'Former National Bank of Nigeria, now WEMA Bank Plc', sector: 'Banking & Finance' },
  { id: 2, name: 'Nigerian Tourism Development Corporation', sector: 'Government & Public Sector' },
  { id: 3, name: "Odu'a Investment Corporation", sector: 'Corporate & International' },
  { id: 4, name: 'Osun State Government', sector: 'Government & Public Sector' },
  { id: 5, name: 'Federal Ministry of Works and Housing', sector: 'Government & Public Sector' },
  { id: 6, name: 'NAMTL – NAL Trustees', sector: 'Banking & Finance' },
  { id: 7, name: 'IBTC Chartered Bank Plc', sector: 'Banking & Finance' },
  { id: 8, name: 'Evans Brothers Publishers', sector: 'Corporate & International' },
  { id: 9, name: "O'Lakleen", sector: 'Corporate & International' },
  { id: 10, name: 'Ondo State Government', sector: 'Government & Public Sector' },
  { id: 11, name: 'University of Ibadan, Faculty of Law', sector: 'Academic & Healthcare' },
  { id: 12, name: 'Celtel Nigeria Plc, now Airtel Nigeria', sector: 'Corporate & International' },
  { id: 13, name: 'University College Hospital, Ibadan', sector: 'Academic & Healthcare' },
  { id: 14, name: 'CGR West Africa, Accra', sector: 'Corporate & International' },
  { id: 15, name: 'Pharmacology and Therapeutics Department, University of Ibadan', sector: 'Academic & Healthcare' },
  { id: 16, name: 'NAFDAC', sector: 'Government & Public Sector' },
  { id: 17, name: 'Diaspora African Forum (DAF), Accra', sector: 'Corporate & International' },
  { id: 18, name: 'HOTCATT, Accra, Ghana', sector: 'Corporate & International' },
  { id: 19, name: 'Eco Bank Nigeria Plc', sector: 'Banking & Finance' },
  { id: 20, name: 'Oceanic Bank International Plc', sector: 'Banking & Finance' },
  { id: 21, name: 'LIDDIE BEE LIMITED', sector: 'Corporate & International' },
];
