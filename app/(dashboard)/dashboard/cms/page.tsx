'use client';

import { useState } from 'react';
import { Table } from 'antd';
import { EditOutlined, BgColorsOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { CMSItem } from '@/lib/types';
import { mockCMSItems } from '@/lib/constants';
import CMSForm from '@/components/dashboard/CMSForm';

export default function CMSPage() {
  const [items, setItems] = useState<CMSItem[]>(mockCMSItems);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CMSItem | null>(null);

  const handleEdit = (item: CMSItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSubmit = (item: CMSItem) => {
    setItems(
      items.map((i) => (i.id === item.id ? item : i))
    );
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const columns: ColumnsType<CMSItem> = [
    {
      title: 'No',
      key: 'index',
      width: 80,
      render: (_: any, __: CMSItem, index: number) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_: any, record: CMSItem) => (
        <EditOutlined
          style={{ cursor: 'pointer', fontSize: '16px' }}
          onClick={() => handleEdit(record)}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="dashboard-page-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h1 className="dashboard-page-title">
          <span className="dashboard-page-title-icon">
            <BgColorsOutlined />
          </span>
          CMS / Branding
        </h1>
      </div>
      <Table
        columns={columns}
        dataSource={items}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `Total ${total} items`,
        }}
        bordered
      />
      <CMSForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleSubmit}
        item={editingItem}
      />
    </div>
  );
}


