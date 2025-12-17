'use client';

import { useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, CalendarOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Class } from '@/lib/types';
import { mockClasses } from '@/lib/constants';
import { generateId, formatCurrency } from '@/lib/utils';
import ClassForm from '@/components/dashboard/ClassForm';

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const handleAdd = () => {
    setEditingClass(null);
    setIsFormOpen(true);
  };

  const handleEdit = (classItem: Class) => {
    setEditingClass(classItem);
    setIsFormOpen(true);
  };

  const handleDelete = (classItem: Class) => {
    Modal.confirm({
      title: 'Delete Class',
      content: `Are you sure you want to delete "${classItem.name}"?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setClasses(classes.filter((c) => c.id !== classItem.id));
      },
    });
  };

  const handleSubmit = (classData: Omit<Class, 'id'>) => {
    if (editingClass) {
      setClasses(
        classes.map((c) =>
          c.id === editingClass.id ? { ...classData, id: editingClass.id } : c
        )
      );
    } else {
      setClasses([...classes, { ...classData, id: generateId() }]);
    }
    setIsFormOpen(false);
    setEditingClass(null);
  };

  const columns: ColumnsType<Class> = [
    {
      title: 'No',
      key: 'index',
      width: 80,
      render: (_: any, __: Class, index: number) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'No of Classes',
      dataIndex: 'numberOfClasses',
      key: 'numberOfClasses',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => formatCurrency(price),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: Class) => (
        <Space size="small">
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            size="small"
          />
        </Space>
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
            <CalendarOutlined />
          </span>
          Classes
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add Class
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={classes}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `Total ${total} classes`,
        }}
        bordered
      />
      <ClassForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingClass(null);
        }}
        onSubmit={handleSubmit}
        classItem={editingClass}
      />
    </div>
  );
}




