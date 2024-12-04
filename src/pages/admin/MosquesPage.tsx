import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useAuthStore } from '../../store/auth';
import { MosqueService } from '../../services/mosqueService';
import { Mosque, CreateMosqueDTO, UpdateMosqueDTO } from '../../types/mosque';

const MosquesPage = () => {
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMosque, setEditingMosque] = useState<Mosque | null>(null);
  const [form] = Form.useForm();
  const { token } = useAuthStore();
  const mosqueService = MosqueService.getInstance();

  const fetchMosques = async () => {
    setLoading(true);
    try {
      mosqueService.setToken(token!);
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

  const handleEdit = (mosque: Mosque) => {
    setEditingMosque(mosque);
    form.setFieldsValue(mosque);
    setIsModalVisible(true);
  };

  const handleDelete = async (mosque: Mosque) => {
    try {
      mosqueService.setToken(token!);
      await mosqueService.deleteMosque(mosque.id);
      message.success('Mosque deleted successfully');
      fetchMosques();
    } catch (error: any) {
      message.error(error.message || 'Error deleting mosque');
    }
  };

  const handleSubmit = async (values: CreateMosqueDTO) => {
    try {
      mosqueService.setToken(token!);
      if (editingMosque) {
        await mosqueService.updateMosque({ ...values, id: editingMosque.id });
        message.success('Mosque updated successfully');
      } else {
        await mosqueService.createMosque(values);
        message.success('Mosque added successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingMosque(null);
      fetchMosques();
    } catch (error: any) {
      message.error(error.message || 'Error saving mosque');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span className="font-medium">{text}</span>
    },
    {
      title: 'Location',
      key: 'location',
      render: (text: string, record: Mosque) => (
        <div>
          {record.street && <div>{record.street}</div>}
          {(record.city || record.state) && (
            <div className="text-sm text-gray-500">
              {[record.city, record.state].filter(Boolean).join(', ')}
            </div>
          )}
          {record.country_code && (
            <div className="text-sm text-gray-400">{record.country_code}</div>
          )}
        </div>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (text: string, record: Mosque) => (
        <div>
          {record.phone && <div>{record.phone}</div>}
          {record.search_pageurl && (
            <a 
              href={record.search_pageurl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:text-blue-700"
            >
              View Page
            </a>
          )}
        </div>
      ),
    },
    {
      title: 'Facilities',
      key: 'facilities',
      render: (text: string, record: Mosque) => (
        <div>
          {record.wheelchair_accessible_entrance && (
            <div className="text-sm">♿ Wheelchair Entrance</div>
          )}
          {record.wheelchair_accessible_parking && (
            <div className="text-sm">🅿️ Wheelchair Parking</div>
          )}
          {record.women_prayer_section && (
            <div className="text-sm">👥 Women's Section</div>
          )}
        </div>
      ),
    },
    {
      title: 'Score',
      key: 'score',
      render: (text: string, record: Mosque) => (
        <div>
          {record.reviews_count !== null && record.reviews_count > 0 && (
            <div className="text-sm text-gray-500">
              {record.reviews_count} reviews
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Mosque) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const [simpleMosques, setSimpleMosques] = useState([
    { name: 'Mezquita Al-Falah', address: 'Sheikh Zayed Road, Dubai' },
    { name: 'Mezquita Al-Buhaira', address: 'Al Buheira, Dubai' },
    { name: 'Mezquita Al-Maktoum', address: 'Al Maktoum Road, Dubai' }
  ]);

  const ListMosques = () => {
    return (
      <div>
        <h1>Lista de Mezquitas en Dubái</h1>
        <ul>
          {simpleMosques.map((mosque, index) => (
            <li key={index}>
              <strong>{mosque.name}</strong><br />
              {mosque.address}<br />
              <button onClick={() => alert(`Ver ficha de ${mosque.name}`)}>Aceptar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mosques</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingMosque(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add Mosque
        </Button>
      </div>

      <Table
        dataSource={mosques}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <ListMosques />

      <Modal
        title={editingMosque ? "Edit Mosque" : "Add Mosque"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingMosque(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editingMosque || {}}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please input the mosque title!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="street"
              label="Street"
              rules={[{ required: true, message: 'Please input the street!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="neighborhood"
              label="Neighborhood"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="state"
              label="State"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="country_code"
              label="Country Code"
            >
              <Input maxLength={2} />
            </Form.Item>

            <Form.Item
              name="latitud"
              label="Latitude"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="longitud"
              label="Longitude"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="search_pageurl"
              label="Search Page URL"
            >
              <Input />
            </Form.Item>

            <div className="col-span-2">
              <Form.Item label="Facilities">
                <Space direction="vertical">
                  <Form.Item
                    name="wheelchair_accessible_entrance"
                    valuePropName="checked"
                    noStyle
                  >
                    <Checkbox>Wheelchair Accessible Entrance</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="wheelchair_accessible_parking"
                    valuePropName="checked"
                    noStyle
                  >
                    <Checkbox>Wheelchair Accessible Parking</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="women_prayer_section"
                    valuePropName="checked"
                    noStyle
                  >
                    <Checkbox>Women's Prayer Section</Checkbox>
                  </Form.Item>
                </Space>
              </Form.Item>
            </div>

            <div className="col-span-2">
              <Form.Item label="Opening Hours">
                {[0,1,2,3,4,5,6].map(day => (
                  <div key={day} className="grid grid-cols-2 gap-4 mb-2">
                    <Form.Item
                      name={`openinghours_${day}_day`}
                      label={`Day ${day}`}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={`openinghours_${day}_hours`}
                      label="Hours"
                    >
                      <Input />
                    </Form.Item>
                  </div>
                ))}
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingMosque ? 'Update' : 'Create'}
              </Button>
              <Button onClick={() => {
                setIsModalVisible(false);
                form.resetFields();
                setEditingMosque(null);
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MosquesPage;
