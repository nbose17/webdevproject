'use client';

import { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Space, Upload, Avatar, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Trainer } from '@/lib/types';

interface TrainerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (trainer: Omit<Trainer, 'id'>) => void;
  trainer?: Trainer | null;
}

export default function TrainerForm({
  isOpen,
  onClose,
  onSubmit,
  trainer,
}: TrainerFormProps) {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (trainer) {
        form.setFieldsValue({
          name: trainer.name,
          experience: trainer.experience,
        });
        setImagePreview(trainer.image);
      } else {
        form.resetFields();
        setImagePreview('');
        setFileList([]);
      }
    }
  }, [trainer, isOpen, form]);



  const handleFileChange = (info: any) => {
    const file = info.file;

    if (file.status === 'removed') {
      setImagePreview('');
      setFileList([]);
      return;
    }

    // Validate file type
    if (file.type && !file.type.startsWith('image/')) {
      message.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size && file.size > 5 * 1024 * 1024) {
      message.error('Image size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
    };
    if (file.originFileObj) {
      reader.readAsDataURL(file.originFileObj);
    }

    setFileList([file]);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const imageToUse = imagePreview || '/images/trainer-placeholder.jpg';

      onSubmit({
        name: values.name,
        experience: values.experience,
        image: imageToUse,
      });

      form.resetFields();
      setImagePreview('');
      setFileList([]);
      onClose();
    } catch (error) {
      // Validation failed
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setImagePreview('');
    setFileList([]);
    onClose();
  };

  return (
    <Modal
      title={trainer ? 'Edit Trainer' : 'Add Trainer'}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter trainer name' },
            { min: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <Input placeholder="e.g., John Doe" />
        </Form.Item>

        <Form.Item
          label="Experience"
          name="experience"
          rules={[
            { required: true, message: 'Please enter experience' },
          ]}
        >
          <Input placeholder="e.g., 3+ Years" />
        </Form.Item>


        <Form.Item label="Profile Image">
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            {imagePreview && (
              <div style={{ marginBottom: '16px' }}>
                <Avatar
                  src={imagePreview}
                  size={120}
                  icon={<UserOutlined />}
                  style={{ border: '2px solid #f0f0f0' }}
                />
              </div>
            )}

            <Upload
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
              listType="picture"
            >
              <Button icon={<UploadOutlined />} block>
                Upload Image
              </Button>
            </Upload>
          </Space>
        </Form.Item>


        <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {trainer ? 'Update' : 'Add'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
