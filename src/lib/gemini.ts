import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function askGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function getFarmingAdvice(question: string): Promise<string> {
  const systemPrompt = `You are an expert agricultural advisor specializing in sustainable farming, carbon credits, and biomass management in India. Provide practical, actionable advice. Keep responses concise and helpful. Question: ${question}`;
  return askGemini(systemPrompt);
}

export async function estimateCarbonCredits(farmSize: number, cropType: string, practices: string[]): Promise<string> {
  const prompt = `As a carbon credit estimation expert, estimate the carbon credits potential for:
- Farm size: ${farmSize} acres
- Crop type: ${cropType}
- Sustainable practices: ${practices.join(', ')}

Provide:
1. Estimated annual carbon credits (in tCO2e)
2. Estimated revenue from carbon credits (in INR)
3. Brief explanation of the calculation
4. Recommendations to increase carbon credit potential

Be specific with numbers and calculations.`;
  return askGemini(prompt);
}

export async function analyzeResidue(cropType: string, residueAmount: number): Promise<string> {
  const prompt = `As a biomass utilization expert, analyze the following crop residue:
- Crop type: ${cropType}
- Residue amount: ${residueAmount} tons

Suggest the best uses:
1. Biochar production potential and value
2. Biomass energy potential
3. Industrial buyer categories that would be interested
4. Estimated revenue from each option (in INR)
5. Environmental benefits of each option vs burning

Provide specific numbers and actionable recommendations.`;
  return askGemini(prompt);
}

export async function predictCarbonOutcomes(
  farmSize: number,
  cropType: string,
  residueAmount: number,
  practices: string[]
): Promise<string> {
  const prompt = `You are a carbon economy prediction engine. Analyze these farm inputs and return a JSON response (no markdown, just valid JSON):

Input:
- Farm size: ${farmSize} acres
- Crop type: ${cropType}
- Residue available: ${residueAmount} tons
- Farming practices: ${practices.join(', ')}

Return this exact JSON structure:
{
  "estimatedCredits": <number in tCO2e>,
  "co2CapturePotential": <number in tons>,
  "biomassProductionPotential": <number in tons>,
  "estimatedRevenue": <number in INR>,
  "confidenceScore": <number 0-100>,
  "recommendations": [<3-5 actionable recommendation strings>],
  "breakdown": {
    "biochar": <tons producible>,
    "energy": <MWh potential>,
    "co2Avoidance": <tons CO2 avoided by not burning>
  }
}

Use realistic Indian agricultural data for your calculations.`;
  return askGemini(prompt);
}

export async function findGovernmentSchemes(
  farmSize: number,
  cropType: string,
  state: string,
  practices: string[]
): Promise<string> {
  const prompt = `You are an expert on Indian government agricultural subsidies and schemes. Based on the following farmer profile, recommend relevant government schemes. Return a JSON array (no markdown, just valid JSON):

Farmer Profile:
- Farm size: ${farmSize} acres
- Crop type: ${cropType}
- State: ${state}
- Practices: ${practices.join(', ')}

Return this exact JSON array structure:
[
  {
    "name": "<scheme name>",
    "ministry": "<ministry name>",
    "description": "<brief description>",
    "eligibility": ["<criteria 1>", "<criteria 2>"],
    "benefits": ["<benefit 1>", "<benefit 2>"],
    "maxSubsidy": <number in INR>,
    "category": "<agriculture|environment|energy|machinery|carbon>",
    "matchScore": <0-100 how well it matches this farmer>
  }
]

Include 5-8 real Indian government schemes related to sustainable agriculture, carbon reduction, residue management, and farm mechanization. Use real scheme names like PM-KUSUM, CRM scheme, Sub-Mission on Agricultural Mechanization, National Biogas Programme, etc.`;
  return askGemini(prompt);
}

export async function generateCarbonMarketForecast(
  currentPrice: number,
  volume: number,
  creditType: string
): Promise<string> {
  const prompt = `You are a carbon market analyst. Based on the current market data, provide a price forecast. Return JSON (no markdown):

Current Data:
- Credit type: ${creditType}
- Current price: $${currentPrice}/tCO2e
- Volume traded: ${volume} tCO2e

Return this JSON structure:
{
  "forecast": [
    {"month": "<month name>", "predictedPrice": <number>, "confidence": <0-100>}
  ],
  "trend": "bullish|bearish|stable",
  "factors": ["<factor 1>", "<factor 2>"],
  "recommendation": "<brief recommendation>"
}

Provide 6-month forecast with realistic carbon credit market data.`;
  return askGemini(prompt);
}

export async function analyzeGlobalCarbonSupply(region: string): Promise<string> {
  const prompt = `You are a global carbon economy analyst. Analyze the carbon credit supply potential for the ${region} region. Return JSON (no markdown):

{
  "regions": [
    {
      "region": "<sub-region name>",
      "country": "<country>",
      "lat": <latitude>,
      "lng": <longitude>,
      "carbonPotential": <tCO2e per year>,
      "activeFarms": <number>,
      "residueAvailable": <tons>,
      "creditPrice": <USD per credit>,
      "topCrops": ["<crop1>", "<crop2>"],
      "growthRate": <percentage>
    }
  ],
  "totalPotential": <tCO2e>,
  "marketInsight": "<brief insight>"
}

Focus on agricultural carbon potential in South Asia, Southeast Asia, and Sub-Saharan Africa. Use realistic data.`;
  return askGemini(prompt);
}
