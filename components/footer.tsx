import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer border-t">
      <div className="div p-5 flex-center">
        {currentYear} {APP_NAME} All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;