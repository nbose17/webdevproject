'use client';

import { useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, CreditCardOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Plan } from '@/lib/types';
import { mockPlans } from '@/lib/constants';
import { generateId, formatCurrency } from '@/lib/utils';
import PlanForm from '@/components/dashboard/PlanForm';

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const handleAdd = () => {
    setEditingPlan(null);
    setIsFormOpen(true);
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsFormOpen(true);
  };

  const handleDelete = (plan: Plan) => {
    Modal.confirm({
      title: 'Delete Plan',
      content: `Are you sure you want to delete "${plan.name}"?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setPlans(plans.filter((p) => p.id !== plan.id));
      },
    });
  };

  const handleSubmit = (planData: Omit<Plan, 'id'>) => {
    if (editingPlan) {
      setPlans(
        plans.map((p) =>
          p.id === editingPlan.id ? { ...planData, id: editingPlan.id } : p
        )
      );
    } else {
      setPlans([...plans, { ...planData, id: generateId() }]);
    }
    setIsFormOpen(false);
    setEditingPlan(null);
  };

  const columns: ColumnsType<Plan> = [
    {
      title: 'No',
      key: 'index',
      width: 80,
      render: (_: any, __: Plan, index: number) => index + 1,
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => formatCurrency(price),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: Plan) => (
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
            <CreditCardOutlined />
          </span>
          Plans (Monthly / Yearly)
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add Plan
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={plans}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `Total ${total} plans`,
        }}
        bordered
      />
      <PlanForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPlan(null);
        }}
        onSubmit={handleSubmit}
        plan={editingPlan}
      />
    </div>
  );
}

