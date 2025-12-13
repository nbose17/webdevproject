'use client';

import { use } from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import HeroSection from '@/components/public/HeroSection';
import ClassCard from '@/components/public/ClassCard';
import PlanCard from '@/components/public/PlanCard';
import TrainerCard from '@/components/public/TrainerCard';
import NewsletterSection from '@/components/public/NewsletterSection';
import Carousel from '@/components/shared/Carousel';
import { mockClasses, mockPlans, mockTrainers, mockCMSItems, mockGyms } from '@/lib/constants';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GymPage({ params }: PageProps) {
  const { id } = use(params);

  // Find the specific gym by ID
  const gym = mockGyms.find((g) => g.id === id);

  // Get CMS content
  const featureBanner = mockCMSItems.find((item) => item.name === 'Feature Banner');
  const featureHeading = mockCMSItems.find((item) => item.name === 'Feature Heading');
  const featureDescription = mockCMSItems.find((item) => item.name === 'Feature Description');
  const classListHeading = mockCMSItems.find((item) => item.name === 'Class List Heading');
  const classListDescription = mockCMSItems.find((item) => item.name === 'Class List Description');
  const planListHeading = mockCMSItems.find((item) => item.name === 'Plan List Heading');
  const planListDescription = mockCMSItems.find((item) => item.name === 'Plan List Description');
  const trainerListHeading = mockCMSItems.find((item) => item.name === 'Trainer List Heading');
  const trainerListDescription = mockCMSItems.find((item) => item.name === 'Trainer List Description');

  // If gym not found, show default content
  if (!gym) {
    return (
      <div className="public-page">
        <Header />
        <main className="public-main">
          <div className="container">
            <h1>Gym not found</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="public-page">
      <Header />
      <HeroSection />
      <main className="public-main">
        <div className="container">
          <section className="gym-detail-section">
            <h2 className="gym-detail-heading">{featureHeading?.content || 'Why Choose Us'}</h2>
            <p className="gym-detail-sub-heading">
              {featureDescription?.content || 'Discover what makes us special'}
            </p>
            {featureBanner && (
              <div className="gym-detail-feature-banner">
                <p>{featureBanner.content}</p>
              </div>
            )}
            {/* Display gym-specific information */}
            <div className="gym-info">
              <h3>{gym.name}</h3>
              <p>{gym.description}</p>
              {gym.address && <p>📍 {gym.address}</p>}
              {gym.phone && <p>📞 {gym.phone}</p>}
              {gym.email && <p>✉️ {gym.email}</p>}
            </div>
          </section>

          <section className="gym-detail-section">
            <h2 className="gym-detail-heading">{classListHeading?.content || 'Our Classes'}</h2>
            <p className="gym-detail-sub-heading">
              {classListDescription?.content || 'Explore our variety of classes'}
            </p>
            <Carousel itemsPerView={3}>
              {mockClasses.map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))}
            </Carousel>
          </section>

          <section className="gym-detail-section">
            <h2 className="gym-detail-heading">{planListHeading?.content || 'Membership Plans'}</h2>
            <p className="gym-detail-sub-heading">
              {planListDescription?.content || 'Choose the perfect plan for you'}
            </p>
            <Carousel itemsPerView={3}>
              {mockPlans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </Carousel>
          </section>

          <section className="gym-detail-section">
            <h2 className="gym-detail-heading">{trainerListHeading?.content || 'Meet Our Trainers'}</h2>
            <p className="gym-detail-sub-heading">
              {trainerListDescription?.content || 'Our expert team is here to help'}
            </p>
            <Carousel itemsPerView={3}>
              {mockTrainers.map((trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} />
              ))}
            </Carousel>
          </section>

          <NewsletterSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}


