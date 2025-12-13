'use client';

import { Class } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface ClassCardProps {
  classItem: Class;
}

export default function ClassCard({ classItem }: ClassCardProps) {
  return (
    <div className="class-card">
      <h3 className="class-card-title">{classItem.name}</h3>
      <div className="class-card-meta">
        <span>{classItem.duration}</span>
        <span>•</span>
        <span>{classItem.numberOfClasses} Classes</span>
        <span>•</span>
        <span>{formatCurrency(classItem.price)}</span>
      </div>
      <p className="class-card-description">
        {classItem.description || 'Expert-led training to help you achieve your fitness goals'}
      </p>
    </div>
  );
}





