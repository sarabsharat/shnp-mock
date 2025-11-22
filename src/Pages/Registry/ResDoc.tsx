import '../../App.css'
import Uploads from "../../Components/Uploads.tsx";
import twoIcon from "../../../media/two.svg"
import {useTranslation} from "react-i18next";


function ResDoc(){
    const { t } = useTranslation();
  return (
      <div id="Two"
           className="flex flex-wrap gap-3 flex-row p-4 md:flex-col 2xl:gap-1 md:[grid-area: 1 / 2 / 2 / 3] h-auto md:gap-2">
          <div id="title" className="flex justify-start w-full text-left items-center gap-2">
                  <img className="2xl:w-19" alt="Two" src={twoIcon}/><p className="text-xl 2xl:text-3xl">{t(`sec2_title`)}</p>
          </div>
          <div className="items-start">
              <p className="text-sm pl-4 mt-2 text-left 2xl:pl-0 2xl:text-xl">{t(`sec2_desc`)}</p></div>
          <Uploads name="documentContract" type="file" id={"25"} download={true}
                   title={t(`input25name`)}
          />
          <Uploads name="imageUrl" type="file" id={"26"} title={t(`input26name`)}
          />
          <Uploads name="documentLicenseNumber" type="file" id={"27"} title={t(`input27name`)}
          />
          <Uploads name="documentTaxNumber" type="file" id={"28"} title={t(`input28name`)}
          />
          <Uploads name="documentRegistry" type="file" id={"29"} title={t(`input29name`)}
          />

      </div>

  );
}

export default ResDoc;