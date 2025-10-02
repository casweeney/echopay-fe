import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#0F1217] py-[20px] sm:py-[30px] lg:py-[40px]">
      <div className="max-w-[85rem] mx-auto px-[20px] sm:px-[35px]">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex flex-col gap-[16px] lg:gap-[24px] w-full lg:w-auto">
            <div className="font-minecraft font-[500] text-[28px] sm:text-[40px] lg:text-[45px] leading-[90%] text-[#575B61]">
              GET STARTED
            </div>
            <div className="flex items-center gap-[20px] sm:gap-[32px] flex-wrap">
              <Link href="/">
                <Image
                  src="/x.svg"
                  alt="logo"
                  className="w-[30px] h-[30px]"
                  width={20}
                  height={20}
                />
              </Link>
              <Link href="/">
                <Image
                  src="/github.svg"
                  alt="logo"
                  className="w-[30px] h-[30px]"
                  width={20}
                  height={20}
                />
              </Link>
              <Link href="/">
                <Image
                  src="/linkedin.svg"
                  alt="logo"
                  className="w-[30px] h-[30px]"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row gap-[40px] sm:gap-[60px] lg:gap-[100px] w-full lg:w-[45%] pt-[1rem]">
            <div className="flex flex-col gap-[20px]">
              <p className="font-[600] text-[16px] text-[#FBFCFE]">Company</p>
              <div className="flex flex-col gap-[12px]">
                <Link
                  className="font-[500] text-[15px] text-[#575B61]"
                  href="#">
                  How it works
                </Link>
                <Link
                  className="font-[500] text-[15px] text-[#575B61]"
                  href="#">
                  About us
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-[20px]">
              <p className="font-[600] text-[16px] text-[#FBFCFE]">Misc</p>
              <div className="flex flex-col gap-[12px]">
                <Link
                  className="font-[500] text-[15px] text-[#575B61]"
                  href="#">
                  Send us a mail
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mt-[40px] lg:mt-[80px]">
          <div className="flex flex-col gap-[16px] w-full lg:w-auto">
            <p className="font-[600] text-[16px] text-[#FBFCFE]">
              Subscribe to our Newsletter
            </p>
            <form className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-[8px] w-full sm:w-[400px] p-[6px] gap-3 sm:gap-0">
              <input
                type="email"
                placeholder="Yourmail@mail.com"
                className="w-full px-3 py-2 text-sm text-gray-600 placeholder-[#9CA7BD] placeholder:text-[14px] placeholder:font-grotesk placeholder:font-[500] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#002EE9] w-full sm:w-[120px] text-white px-[14px] py-[10px] text-[14px] font-[500] rounded-[8px]">
                Submit
              </button>
            </form>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-[5px]">
            <p className="font-[500] text-[14px] text-[#575B61] font-display">
              <Image
                src="/footer-logo.svg"
                alt="logo"
                className="w-full h-full"
                width={20}
                height={20}
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
