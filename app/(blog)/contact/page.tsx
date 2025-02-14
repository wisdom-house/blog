import { socials } from '@/components/footer';
import ContactUsForm from '@/components/forms/contact-us-form';
import SvgIcon from '@/components/icon';
import { IconName } from '@/types/icon.type';
import Link from 'next/link';
import React from 'react';

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
        Contact Us
      </h1>
      <p className="text-lg text-center mb-10">
        We&apos;d love to hear from you! Fill out the form below or reach out to
        us on social media.
      </p>

      <ContactUsForm />

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Follow Us
        </h2>
        <div className="flex gap-3 items-center justify-center">
          {socials.map(({ route, label, icon }) => (
            <Link
              href={route}
              key={label}
              aria-label={label}
              className="hover:scale-110 transition-transform"
            >
              <SvgIcon
                name={icon as IconName}
                className="w-6 h-6 hover:text-primary"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
