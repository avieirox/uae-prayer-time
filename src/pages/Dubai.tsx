import React, { useState, useEffect } from 'react';
import { MosqueService } from '../services/mosqueService';
import { Mosque } from '../types/mosque';
import MainLayout from '../components/MainLayout';

const Dubai = () => {
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDubaiMosques = async () => {
      try {
        const mosqueService = MosqueService.getInstance();
        const allMosques = await mosqueService.getAllMosques();
        const dubaiMosques = allMosques.filter(mosque => mosque.city === 'Dubai');
        setMosques(dubaiMosques);
      } catch (error) {
        console.error('Error fetching Dubai mosques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDubaiMosques();
  }, []);

  const content = (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-emerald-600 mb-8 text-center">
        Dubai Mosques
      </h1>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mosques.map((mosque) => (
              <div
                key={mosque.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {mosque.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {mosque.address}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      mosque.active ? 'bg-green-500' : 'bg-red-500'
                    }`}></span>
                    {mosque.active ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mosques.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              No mosques found in Dubai
            </div>
          )}
        </>
      )}
    </div>
  );

  return <MainLayout>{content}</MainLayout>;
};

export default Dubai;
