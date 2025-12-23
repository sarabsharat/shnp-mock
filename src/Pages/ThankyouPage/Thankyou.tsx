import "../../App.css";
import "react-toastify/dist/ReactToastify.css";
import "../../../media/logo.png";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export const Thankyou = ()=> {


    const { t, i18n } = useTranslation();
    const handleLanguageToggle = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };
    const logo=(<img className="mt-3 2xl:w-[320px]" src="../../../media/logo.png" width="160" alt="logo"></img>)

    return(
      <div><div className="flex flex-nowrap flex-col gap-0 items-center justify-evenly  h-fit
        md:border-gray-400 md:border-1 md:border-spacing-20 md:rounded-2xl
        2xl:border-2 2xl:border-gray-400 2xl:max-w-[850px] 2xl:h-fit 2xl:justify-around
        lg:border-gray-400 lg:border-1 lg:border-spacing-20 lg:p-4 lg:gap-y-2 lg:max-w-[450px] ">
          <div className="flex w-full justify-end ">
              <button
                  type="button"
                  onClick={handleLanguageToggle}
                  className="text-shnp-orange  hover:bg-[#FFE0C8FF] p-3 md:p-5   rounded-full mb-1 2xl:text-4xl"
              >
                  {i18n.language === 'en' ? 'العربية' : 'English'}
              </button></div>

          <div className="text-3xl flex  flex-col items-center">{logo}
              {t(`success_title`)}
              <p className="text-sm p-5 md:pr-35 md:pl-35 lg:pr-12 lg:pl-12 2xl:text-2xl">
                  {t(`success_desc`)}</p>
              <p className="text-sm p-5 md:pr-35 md:pl-35 lg:pr-12 lg:pl-12 2xl:text-2xl">
                  {t(`logintxt`)}<span className="underline text-shnp-orange"><Link to={"/"}>{t(`login`)}</Link></span></p>
          </div>


      </div></div>


    );

}
export default Thankyou
