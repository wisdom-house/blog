import { BRAND_NAME } from '@/utils/constants';

export const commentNotificationTemplate = (data: {
  name: string;
  email: string;
  comment: string;
  post_title: string;
  post_url: string;
}) => {
  return {
    subject: `New Comment on Your Post from ${data.name}`,
    text: `You have received a new comment on your post.

Name: ${data.name}
Email: ${data.email}
Comment: ${data.comment}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f6f6f7; color: #161618; padding: 20px;">
        <!-- Header -->
        <div style="background-color: #02498e; padding: 20px; text-align: center; border-radius: 5px;">
          <h1 style="color: #fff; font-size: 24px; font-weight: bold;">New Comment on Your Post</h1>
        </div>
        
        <!-- Body -->
        <div style="background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px;">
          <p style="font-size: 16px; color: #161618;">
            <strong style="color: #ef4136;">Name:</strong> ${data.name}
          </p>
          <p style="font-size: 16px; color: #161618;">
            <strong style="color: #ef4136;">Email:</strong> ${data.email}
          </p>
          <p style="font-size: 16px; color: #161618;">
            <strong style="color: #ef4136;">Comment:</strong> "${data.comment}"
          </p>

          <p style="font-size: 16px; color: #161618;">
            <strong style="color: #ef4136;">Post Title:</strong> <a href="${data.post_url}">"${data.post_title}"</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #fdb813; padding: 10px; margin-top: 20px; text-align: center; border-radius: 5px;">
          <p style="font-size: 12px; color: #fff;">&copy; ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</p>
        </div>
      </div>
    `,
  };
};
