'use client';

import Image from 'next/image';
import { Trainer } from '@/lib/types';

interface TrainerCardProps {
  trainer: Trainer;
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <div className="trainer-card">
      <div className="trainer-card-image-container">
        <Image
          src={trainer.image}
          alt={trainer.name}
          width={200}
          height={200}
          className="trainer-card-image"
        />
      </div>
      <div className="trainer-card-info">
        <h3 className="trainer-card-name">{trainer.name}</h3>
        <p className="trainer-card-experience">{trainer.experience}</p>
        {trainer.specialization && (
          <p className="trainer-card-specialization">{trainer.specialization}</p>
        )}
        {trainer.certification && (
          <p className="trainer-card-certification">{trainer.certification}</p>
        )}
        {trainer.bio && (
          <p className="trainer-card-bio">{trainer.bio}</p>
        )}
      </div>
    </div>
  );
}





