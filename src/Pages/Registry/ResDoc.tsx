import '../../App.css'
import Uploads from "../../Components/Uploads.tsx";
import twoIcon from "../../../media/two.svg"


function ResDoc(){
  return (
      <div id="Two"
           className="flex flex-wrap gap-3 flex-row p-4 md:flex-col 2xl:gap-1 md:[grid-area: 1 / 2 / 2 / 3] h-auto md:gap-2">
          <div id="title" className="flex justify-start w-full text-left items-center gap-2">
              <img className="2xl:w-19" alt="Two" src={twoIcon}/><p className="text-xl 2xl:text-4xl">Attach
              Required Documents</p>
          </div>
          <div className="items-start">
              <p className="text-sm pl-4 mt-2 text-left 2xl:pl-0 2xl:text-2xl">Fill out your
                  personal information to
                  create an account tied to a Restaurant and Continue</p></div>
          <Uploads name="documentContract" type="file" id={"25"} download={true}
                   title={"Please download the contract and read it well, Then sign on it and upload the contract here"}
          />
          <Uploads name="imageUrl" type="file" id={"26"} title={"Trademark"}
          />
          <Uploads name="documentLicenseNumber" type="file" id={"27"} title={"Commercial License Number"}
          />
          <Uploads name="documentTaxNumber" type="file" id={"28"} title={"Tax Certificate Number"}
          />
          <Uploads name="documentRegistry" type="file" id={"29"} title={"Company Tax Registry Representative"}
          />

      </div>

  );
}

export default ResDoc;