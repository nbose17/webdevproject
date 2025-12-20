'use client';

import Image from 'next/image';
import { Trainer } from '@/lib/types';
import { getAssetPath } from '@/lib/utils';

interface TrainerCardProps {
  trainer: Trainer;
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <div className="trainer-card">
      <div className="trainer-card-image-container">
        <Image
          src={getAssetPath(trainer.image)}
          alt={trainer.name}
          width={400}
          height={400}
          className="trainer-card-image"
        />
        <div className="trainer-card-overlay">
          <h3 className="trainer-card-name">{trainer.name}</h3>
        </div>
      </div>
    </div>
  );
}





