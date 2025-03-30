import { socials } from '@/components/footer';
import ContactUsForm from '@/components/forms/contact-us-form';
import SvgIcon from '@/components/icon';
import { IconName } from '@/types/icon.type';
import Link from 'next/link';
import React from 'react';

const contactOptions = [
  {
    label: 'Send us an Email',
    href: 'mailto:contact@example.com',
    icon: 'envelope',
    description:
      'Get in touch with us via email. We usually respond within 24 hours.',
  },
  {
    label: 'Connect on Twitter',
    href: 'https://twitter.com/example',
    icon: 'twitter',
    description: 'Follow us on X (Twitter) for updates and announcements.',
  },
  {
    label: 'Connect on Instagram',
    href: 'https://instagram.com/example',
    icon: 'instagram',
    description: 'Check out our latest updates and visuals on Instagram.',
  },
];

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
        Contact Us
      </h1>
      <p className="text-lg text-center mb-10">
        We&apos;d love to hear from you! Fill out the form below or reach out to
        us directly.
      </p>

      <ContactUsForm />

      {/* Contact Options */}
      <div className="mt-10 space-y-6">
        {contactOptions.map(({ label, href, icon, description }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-app-background rounded-lg shadow-sm transition-transform hover:scale-95"
          >
            <SvgIcon name={icon as IconName} className="w-8 h-8 text-primary" />
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold">{label}</h3>
              <p className="text-sm">{description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Social Links */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Follow Us
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {socials.map(({ route, label, icon }) => (
            <Link
              href={route}
              key={label}
              aria-label={label}
              className="p-3 rounded-full bg-app-background transition-colors"
            >
              <SvgIcon
                name={icon as IconName}
                className="w-6 h-6 text-primary"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
