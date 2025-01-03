import Tooltip from './tooltip';

type TextEllipsisProps = {
  text: string;
  maxLength?: number;
};

const TextEllipsis = ({ text, maxLength = 30 }: TextEllipsisProps) => {
  return text.length > maxLength ? (
    <Tooltip
      trigger={
        <span className="line-clamp-3">
          {text.substring(0, maxLength) + '...'}
        </span>
      }
      text={text}
    />
  ) : (
    <span>{text}</span>
  );
};

export default TextEllipsis;
