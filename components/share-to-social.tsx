'use client';

import { BASE_URL } from '@/utils/constants';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';

interface SocialShareTypes {
  title: string;
  url: string;
  description: string;
  author: string;
}

const ShareToSocialMedia = ({
  title,
  url,
  description,
  author,
}: SocialShareTypes) => {
  const appUrl = BASE_URL;
  const shareURL = `${appUrl}/${url}`;
  const shareTitle = `Check out this article by *${author}*: \n*${title.toUpperCase()}* \n`;
  const emailBody = `${description}\n\nRead full article here: <a href="${shareURL}">Read more here</a>`;

  return (
    <div>
      <p className="font-medium">Share to:</p>

      <div className="flex gap-2 flex-wrap mt-2">
        <FacebookShareButton
          title={`Check out this article by *${author}*: \n*${title.toUpperCase()}* \n`}
          url={shareURL}
          aria-label="facebook"
        >
          <FacebookIcon round size={32} />
        </FacebookShareButton>

        <TwitterShareButton
          title={shareTitle}
          url={shareURL}
          aria-label="twitter"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <WhatsappShareButton
          title={shareTitle}
          url={shareURL}
          aria-label="whatsapp"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <LinkedinShareButton
          title={shareTitle}
          url={shareURL}
          aria-label="linkedin"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <EmailShareButton
          url={shareURL}
          subject={`TonniPaul Blog - ${title}`}
          body={emailBody}
          aria-label="email"
        >
          <EmailIcon size={32} round />
        </EmailShareButton>

        <TelegramShareButton
          url={shareURL}
          title={shareTitle}
          aria-label="telegram"
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default ShareToSocialMedia;
