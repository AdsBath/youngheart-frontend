import { useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export const ShareButtons = ({ shareUrl }: { shareUrl: string }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  async function copyToClip() {
    await navigator.clipboard.writeText(location.href);
    setCopySuccess("Copied");
    setTimeout(() => setCopySuccess(""), 1000);
  }

  return (
    <div className="flex gap-4 items-center mt-5">
      <FacebookShareButton url={shareUrl} hashtag="#youngheartbd">
        <FacebookIcon size={40} round borderRadius={10} />
      </FacebookShareButton>
      <WhatsappShareButton url={shareUrl} title="Check out this product!">
        <WhatsappIcon size={40} round borderRadius={10} />
      </WhatsappShareButton>
      <FacebookMessengerShareButton appId="979499980533488" url={shareUrl}>
        <FacebookMessengerIcon size={40} round borderRadius={10} />
      </FacebookMessengerShareButton>
      <button onClick={copyToClip} className="flex items-center text-brand">
        <FaRegCopy />
        <span>{copySuccess && "Copied"}</span>
      </button>
    </div>
  );
};
