'use client';

import { useState } from 'react';
import { Table, Button, Space, Modal, Segmented, Avatar, Image } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UserOutlined, TableOutlined, AppstoreOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Trainer } from '@/lib/types';
import { mockTrainers } from '@/lib/constants';
import { generateId } from '@/lib/utils';
import TrainerCard from '@/components/dashboard/TrainerCard';
import TrainerForm from '@/components/dashboard/TrainerForm';

type ViewMode = 'table' | 'card';

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>(mockTrainers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const handleAdd = () => {
    setEditingTrainer(null);
    setIsFormOpen(true);
  };

  const handleEdit = (trainer: Trainer) => {
    setEditingTrainer(trainer);
    setIsFormOpen(true);
  };

  const handleDelete = (trainer: Trainer) => {
    Modal.confirm({
      title: 'Delete Trainer',
      content: `Are you sure you want to delete "${trainer.name}"?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setTrainers(trainers.filter((t) => t.id !== trainer.id));
      },
    });
  };

  const handleSubmit = (trainerData: Omit<Trainer, 'id'>) => {
    if (editingTrainer) {
      setTrainers(
        trainers.map((t) =>
          t.id === editingTrainer.id ? { ...trainerData, id: editingTrainer.id } : t
        )
      );
    } else {
      setTrainers([...trainers, { ...trainerData, id: generateId() }]);
    }
    setIsFormOpen(false);
    setEditingTrainer(null);
  };

  const columns: ColumnsType<Trainer> = [
    {
      title: 'No',
      key: 'index',
      width: 80,
      render: (_: any, __: Trainer, index: number) => index + 1,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (image: string, record: Trainer) => (
        image ? (
          <Image
            src={image}
            alt={record.name}
            width={50}
            height={50}
            style={{ objectFit: 'cover', borderRadius: '4px' }}
            preview={false}
          />
        ) : (
          <Avatar size={50} icon={<UserOutlined />} />
        )
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: Trainer) => (
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
            <UserOutlined />
          </span>
          Trainers
        </h1>
        <Space size="middle">
          <Segmented
            value={viewMode}
            onChange={(value) => setViewMode(value as ViewMode)}
            options={[
              { label: 'Table', value: 'table', icon: <TableOutlined /> },
              { label: 'Card', value: 'card', icon: <AppstoreOutlined /> },
            ]}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Add Trainer
          </Button>
        </Space>
      </div>
      {viewMode === 'table' ? (
        <Table
          columns={columns}
          dataSource={trainers}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            showTotal: (total) => `Total ${total} trainers`,
          }}
          bordered
        />
      ) : (
        <div className="dashboard-trainer-cards-grid">
          {trainers.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <TrainerForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTrainer(null);
        }}
        onSubmit={handleSubmit}
        trainer={editingTrainer}
      />
    </div>
  );
}




