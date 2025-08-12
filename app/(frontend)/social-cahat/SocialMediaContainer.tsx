import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaPhoneAlt } from "react-icons/fa";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";

const SocialMediaContainer = () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-center text-3xl text-brand">
          How may we help you today?
        </DialogTitle>
      </DialogHeader>
      <div className="flex items-center justify-center">
        <WhatsAppWidget
          phoneNumber="+8801889175408"
          companyName="youngheartbd"
        />
        <a
          href="tel:+8801889175408"
          className="rounded-full hover:text-white hover:bg-brand text-brand mx-4 h-12 w-12 sm:h-16 sm:w-16 justify-center shadow-[0_3px_12px_#00000026] flex items-center "
        >
          <FaPhoneAlt className="mr-2" size={24} />
        </a>
        <div>
          <MessengerCustomerChat
            pageId="494059237117023"
            appId="1589772751654755"
            themeColor="#0084ff"
            loggedInGreeting="Hi! How can we help you?"
            loggedOutGreeting="Hi! Please log in to chat with us."
            greetingDialogDisplay="show"
          />
        </div>
      </div>
      <DialogClose />
    </DialogContent>
  );
};

export default SocialMediaContainer;
