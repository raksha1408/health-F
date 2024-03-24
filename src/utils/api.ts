const API_BASE_URL = "https://fe-health-be.vercel.app";

interface Doctor {
  id: number;
  name: string;
  expertise: string;
  city: string;
  imageSrc: string;
}

export const fetchData = (city?: string): Promise<Doctor[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const apiUrl = city
        ? `${API_BASE_URL}/api/doctor/getDoctorsByCity?city=${city}`
        : `${API_BASE_URL}/api/doctor/getAllDoctors`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from the API. Status: ${response.status}`
        );
      }

      // Parse the response JSON
      const jsonData: Doctor[] = await response.json();
      console.log("++jsonData", jsonData);
      resolve(jsonData);
    } catch (error) {
      reject(error);
    }
  });
};
