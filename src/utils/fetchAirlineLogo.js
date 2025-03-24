export async function fetchAirlineLogo(airlineCode) {
    const airlineDomains = {
      AA: 'aa.com',
      DL: 'delta.com',
      UA: 'united.com',
      // Añade más aerolíneas y sus dominios aquí
    };
  
    const domain = airlineDomains[airlineCode];
    if (!domain) return null;
  
    const url = `https://logo.clearbit.com/${domain}`;
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        return url;
      }
      return null;
    } catch (error) {
      console.error('Error fetching airline logo:', error);
      return null;
    }
  }
  