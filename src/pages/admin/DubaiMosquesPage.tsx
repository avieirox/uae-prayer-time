import { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { MosqueService } from '../../services/mosqueService';
import { Mosque } from '../../types/mosque';

const DubaiMosquesPage = () => {
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(false);
  const mosqueService = MosqueService.getInstance();

  const fetchMosques = async () => {
    setLoading(true);
    try {
      const data = await mosqueService.getAllMosques();
      console.log('Mosques loaded:', data);
      // Filtrar mezquitas por ciudad Dubai
      const filteredMosques = data.filter(mosque => mosque.city === 'Dubai');
      setMosques(filteredMosques);
    } catch (error: any) {
      console.error('Error fetching mosques:', error);
      message.error(error.message || 'Error loading mosques');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMosques();
  }, []);

  return (
    <div>
      <h1>Mosques in Dubai</h1>
      <Table dataSource={mosques} loading={loading} rowKey="id">
        <Table.Column title="Name" dataIndex="name" />
        <Table.Column title="City" dataIndex="city" />
        <Table.Column title="Address" dataIndex="address" />
      </Table>
    </div>
  );
};

export default DubaiMosquesPage;
