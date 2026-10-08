import SignatureModal from "@/pages/signature/SignatureModal";
import { useState, useEffect, useLayoutEffect } from "react";

import api from "@/api/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function DriverApplication() {
  const [signatureOpen, setSignatureOpen] = useState(false);
  const [signatureData, setsignatureData] = useState(false);
  const [driver, setDriver] = useState({});
  const [company, setCompany] = useState({});
  const [errors, setErrors] = useState({});
  const [cleHDate, setCleHDate] = useState();
  const [location, setLocation] = useState({});
  const [serverMessage, setServerMessage] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);

  const DocumentItem = ({ number, text }) => (
    <div className="border-b border-gray-500 p-1.5 sm:p-2 text-[8px] sm:text-[8.5px] md:text-[9px] lg:text-[9.7px] leading-tight flex items-start">
      <b className="mr-1 shrink-0">{number}</b>
      <span>{text}</span>
    </div>
  );

  const ReceiptItem = ({ text }) => (
    <div className="p-1.5 sm:p-2 text-[8px] sm:text-[8.5px] md:text-[9px] lg:text-[9.7px] leading-tight flex items-start">
      <b className="mr-1 shrink-0">●</b>
      <span>{text}</span>
    </div>
  );

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setPhoto(file);
  };

  const handleCancel = () => {
    navigate(`/driver/esign-cancelled/${id}`);
  };

  useLayoutEffect(() => {
    const getDriverDetail = async () => {
      try {
        const response = await api.get(`/company/driverDetail/${id}`);
        setDriver(response.data.driver);

        const documents = response?.data?.driver?.document || [];

        const doc = documents.find(
          (item) => item?.slug === "pre-employment-clearing-house",
        );

        if (doc?.expiration_date) {
          const date = new Date(doc.expiration_date);
          date.setFullYear(date.getFullYear() - 1);

          setCleHDate(date.toISOString().split("T")[0]);
        } else {
          setCleHDate("");
        }
        setCompany(response.data.company);
        setLocation(response.data.location);
        setsignatureData(response.data.driver.user?.signature);
      } catch (error) {
        console.error("Driver detail error:", error);
      }
    };

    if (id) {
      getDriverDetail();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    let firstInvalidField = null;

    form
      .querySelectorAll("input[required], select[required], textarea[required]")
      .forEach((field) => {
        field.classList.remove(
          "border-red-500",
          "ring-2",
          "ring-red-500",
          "accent-red-500",
        );
      });

    const requiredFields = form.querySelectorAll(
      "input[required]:not([type='checkbox']), select[required], textarea[required]",
    );

    requiredFields.forEach((field) => {
      if (!field.value?.trim()) {
        field.classList.add("border-red-500", "ring-2", "ring-red-500");

        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    });

    const licenseCheckboxes = form.querySelectorAll(
      'input[name="driver_license"]',
    );

    if (licenseCheckboxes.length > 0) {
      const selectedLicense = form.querySelector(
        'input[name="driver_license"]:checked',
      );

      if (!selectedLicense) {
        licenseCheckboxes.forEach((checkbox) => {
          checkbox.classList.add("accent-red-500", "ring-2", "ring-red-500");
        });

        if (!firstInvalidField) {
          firstInvalidField = licenseCheckboxes[0];
        }
      }
    }

    if (firstInvalidField) {
      firstInvalidField.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      firstInvalidField.focus?.();

      return;
    }

    const data = {
      p1motorcarrieremployer:
        formData.get("p1motorcarrieremployer")?.trim() || "",
      p1appliedfor: formData.get("p1appliedfor")?.trim() || "",
      p1applicationdate: formData.get("p1applicationdate")?.trim() || "",
      p1applicantcdl: formData.get("p1applicantcdl")?.trim() || "",
      p1officecdl: formData.get("p1officecdl")?.trim() || "",
      p1workauthapplicant: formData.get("p1workauthapplicant")?.trim() || "",
      p1workauthoffice: formData.get("p1workauthoffice")?.trim() || "",
      p1workpermitapplicant:
        formData.get("p1workpermitapplicant")?.trim() || "",
      p1workpermitoffice: formData.get("p1workpermitoffice")?.trim() || "",
      p1wssnapplicant: formData.get("p1wssnapplicant")?.trim() || "",
      p1ssnoffice: formData.get("p1ssnoffice")?.trim() || "",
      p1cmapplicant: formData.get("p1cmapplicant")?.trim() || "",
      p1cmeoffice: formData.get("p1cmeoffice")?.trim() || "",
      p1merapplicant: formData.get("p1merapplicant")?.trim() || "",
      p1meroffice: formData.get("p1meroffice")?.trim() || "",
      p1mcvoffice: formData.get("p1mcvoffice")?.trim() || "",
      p1cdlisapplicant: formData.get("p1cdlisapplicant")?.trim() || "",
      p1cdlisoffice: formData.get("p1cdlisoffice")?.trim() || "",
      p1cdlisrecordapplicant:
        formData.get("p1cdlisrecordapplicant")?.trim() || "",
      p1cdlisrecordoffice: formData.get("p1cdlisrecordoffice")?.trim() || "",

      //page 2
      p2consumerrecordapplicant:
        formData.get("p2consumerrecordapplicant")?.trim() || "",
      p2consumerrecordoffice:
        formData.get("p2consumerrecordoffice")?.trim() || "",
      p2sphapplicant: formData.get("p2sphapplicant")?.trim() || "",
      p2sphoffice: formData.get("p2sphoffice")?.trim() || "",
      p2fmcsaapplicant: formData.get("p2fmcsaapplicant")?.trim() || "",
      p2fmcsaoffice: formData.get("p2fmcsaoffice")?.trim() || "",
      p2clearinghouseoffice:
        formData.get("p2clearinghouseoffice")?.trim() || "",
      p2predrugtestoffice: formData.get("p2predrugtestoffice")?.trim() || "",
      p2roadtestoffice: formData.get("p2roadtestoffice")?.trim() || "",
      p2twisoffice: formData.get("p2twisoffice")?.trim() || "",
      p2clearinghouseoffice:
        formData.get("p2clearinghouseoffice")?.trim() || "",

      //page 4

      p4formernames: formData.get("p4formernames")?.trim() || "",

      //page 5

      p5revisiondate: formData.get("p5revisiondate")?.trim() || "",
      p5check1: formData.get("p5check1")?.trim() || "",
      p5check2: formData.get("p5check2")?.trim() || "",
      p5check3: formData.get("p5check3")?.trim() || "",
      p5check4: formData.get("p5check4")?.trim() || "",
      p5check5: formData.get("p5check5")?.trim() || "",
      p5check6: formData.get("p5check6")?.trim() || "",
      p5check7: formData.get("p5check7")?.trim() || "",
      p5check8: formData.get("p5check8")?.trim() || "",
      p5check9: formData.get("p5check9")?.trim() || "",

      //page 7

      p7consortium: formData.get("p7consortium")?.trim() || "",
      p7mro: formData.get("p7mro")?.trim() || "",
      p7cmro: formData.get("p7cmro")?.trim() || "",
      p7sap: formData.get("p7sap")?.trim() || "",
      p7dotminimum: formData.get("p7dotminimum")?.trim() || "",

      //page 8
      p8check1: formData.get("p8check1")?.trim() || "",
      p8check2: formData.get("p8check2")?.trim() || "",
      p8check3: formData.get("p8check3")?.trim() || "",
      p8check4: formData.get("p8check4")?.trim() || "",
      p8check5: formData.get("p8check5")?.trim() || "",
      p8check6: formData.get("p8check6")?.trim() || "",
      p8check7: formData.get("p8check7")?.trim() || "",
      p8check8: formData.get("p8check8")?.trim() || "",
      p8check9: formData.get("p8check9")?.trim() || "",
      p8check10: formData.get("p8check10")?.trim() || "",
      p8check11: formData.get("p8check11")?.trim() || "",
      p8check12: formData.get("p8check12")?.trim() || "",

      //page 13

      p13roadtest: formData.get("p13roadtest")?.trim() || "",
      p13miles: formData.get("p13miles")?.trim() || "",
      p13issuecertificate: formData.get("p13issuecertificate")?.trim() || "",

      //page 15
      p15dbaany: formData.get("p15dbaany")?.trim() || "",
      p15policyeffective: formData.get("p15policyeffective")?.trim() || "",

      //page 20
      p20driverid: formData.get("p20driverid")?.trim() || "",

      //page 21
      p21effectivedate: formData.get("p21effectivedate")?.trim() || "",
      p21safetycontact: formData.get("p21safetycontact")?.trim() || "",
      p21derdrug: formData.get("p21derdrug")?.trim() || "",

      //page 26
      p26tpa: formData.get("p26tpa")?.trim() || "",
      p26mro: formData.get("p26mro")?.trim() || "",
      p26collectionsite: formData.get("p26collectionsite")?.trim() || "",
      p26revisiondate: formData.get("p26revisiondate")?.trim() || "",
      p26derdatecompany: formData.get("p26derdatecompany")?.trim() || "",
      p26ctpa: formData.get("p26ctpa")?.trim() || "",
      p26medicalofficer: formData.get("p26medicalofficer")?.trim() || "",
      p26pnetwork: formData.get("p26pnetwork")?.trim() || "",
      p26sapcontact: formData.get("p26sapcontact")?.trim() || "",

      //page 35
      p35check1: formData.get("p35check1")?.trim() || "",
      p35check2: formData.get("p35check2")?.trim() || "",
      p35check3: formData.get("p35check3")?.trim() || "",
      p35check4: formData.get("p35check4")?.trim() || "",
      p35check5: formData.get("p35check5")?.trim() || "",
      p35check6: formData.get("p35check6")?.trim() || "",
      p35check7: formData.get("p35check7")?.trim() || "",
      p35check8: formData.get("p35check8")?.trim() || "",
      p35check9: formData.get("p35check9")?.trim() || "",
      p35check10: formData.get("p35check10")?.trim() || "",

      //page 36
      p36lastduty: formData.get("p36lastduty")?.trim() || "",

      p36day1: formData.get("p36day1")?.trim() || "",
      p36hours1: formData.get("p36hours1")?.trim() || "",
      p36permormance1: formData.get("p36permormance1")?.trim() || "",

      p36day2: formData.get("p36day2")?.trim() || "",
      p36hours2: formData.get("p36hours2")?.trim() || "",
      p36permormance2: formData.get("p36permormance2")?.trim() || "",

      p36day3: formData.get("p36day3")?.trim() || "",
      p36hours3: formData.get("p36hours3")?.trim() || "",
      p36permormance3: formData.get("p36permormance3")?.trim() || "",

      p36day4: formData.get("p36day4")?.trim() || "",
      p36hours4: formData.get("p36hours4")?.trim() || "",
      p36permormance4: formData.get("p36permormance4")?.trim() || "",

      p36day5: formData.get("p36day5")?.trim() || "",
      p36hours5: formData.get("p36hours5")?.trim() || "",
      p36permormance5: formData.get("p36permormance5")?.trim() || "",

      p36day6: formData.get("p36day6")?.trim() || "",
      p36hours6: formData.get("p36hours6")?.trim() || "",
      p36permormance6: formData.get("p36permormance6")?.trim() || "",

      p36day7: formData.get("p36day7")?.trim() || "",
      p36hours7: formData.get("p36hours7")?.trim() || "",
      p36permormance7: formData.get("p36permormance7")?.trim() || "",

      p36totalhours: formData.get("p36totalhours")?.trim() || "",
      p36cerdate: formData.get("p36cerdate")?.trim() || "",
      p36approvedpassenger: formData.get("p36approvedpassenger")?.trim() || "",
      p36relation: formData.get("p36relation")?.trim() || "",

      //page 37
      p37trip: formData.get("p37trip")?.trim() || "",
      p37condition: formData.get("p37condition")?.trim() || "",
      p37authorized: formData.get("p37authorized")?.trim() || "",
      p37aknowledge: formData.get("p37aknowledge")?.trim() || "",
      p37trainingdate: formData.get("p37trainingdate")?.trim() || "",

      p37part34section1: formData.get("p37part34section1")?.trim() || "",
      p37part34section2: formData.get("p37part34section2")?.trim() || "",
      p37part34section3: formData.get("p37part34section3")?.trim() || "",
      p37part34section4: formData.get("p37part34section4")?.trim() || "",
      p37part34section5: formData.get("p37part34section5")?.trim() || "",
      p37part34section6: formData.get("p37part34section6")?.trim() || "",
      p37part34section7: formData.get("p37part34section7")?.trim() || "",
      p37part34section8: formData.get("p37part34section8")?.trim() || "",
      p37part34section9: formData.get("p37part34section9")?.trim() || "",

      p37part34sectiondate1:
        formData.get("p37part34sectiondate1")?.trim() || "",
      p37part34sectiondate2:
        formData.get("p37part34sectiondate2")?.trim() || "",
      p37part34sectiondate3:
        formData.get("p37part34sectiondate3")?.trim() || "",
      p37part34sectiondate4:
        formData.get("p37part34sectiondate4")?.trim() || "",
      p37part34sectiondate5:
        formData.get("p37part34sectiondate5")?.trim() || "",
      p37part34sectiondate6:
        formData.get("p37part34sectiondate6")?.trim() || "",
      p37part34sectiondate7:
        formData.get("p37part34sectiondate7")?.trim() || "",
      p37part34sectiondate8:
        formData.get("p37part34sectiondate8")?.trim() || "",
      p37part34sectiondate9:
        formData.get("p37part34sectiondate9")?.trim() || "",

      //page38
      p38section1: formData.get("p38section1")?.trim() || "",
      p38section12: formData.get("p38section2")?.trim() || "",
      p38section13: formData.get("p38section3")?.trim() || "",

      p38sectiondate1: formData.get("p38sectiondate1")?.trim() || "",
      p38sectiondate2: formData.get("p38sectiondate2")?.trim() || "",
      p38sectiondate3: formData.get("p38sectiondate3")?.trim() || "",

      driver_license: formData.get("driver_license") || "",
    };

    setErrors({});
    setLoading(true);

    try {
      const uploadData = new FormData();

      uploadData.append("p1motorcarrieremployer", data.p1motorcarrieremployer);
      uploadData.append("p1appliedfor", data.p1appliedfor);
      uploadData.append("p1applicationdate", data.p1applicationdate);
      uploadData.append("p1applicantcdl", data.p1applicantcdl);
      uploadData.append("p1officecdl", data.p1officecdl);
      uploadData.append("p1workauthapplicant", data.p1workauthapplicant);
      uploadData.append("p1workauthoffice", data.p1workauthoffice);
      uploadData.append("p1workpermitapplicant", data.p1workpermitapplicant);
      uploadData.append("p1workpermitoffice", data.p1workpermitoffice);
      uploadData.append("p1wssnapplicant", data.p1wssnapplicant);
      uploadData.append("p1ssnoffice", data.p1ssnoffice);
      uploadData.append("p1cmapplicant", data.p1cmapplicant);
      uploadData.append("p1cmeoffice", data.p1cmeoffice);
      uploadData.append("p1merapplicant", data.p1merapplicant);
      uploadData.append("p1meroffice", data.p1meroffice);
      uploadData.append("p1mcvoffice", data.p1mcvoffice);
      uploadData.append("p1cdlisapplicant", data.p1cdlisapplicant);
      uploadData.append("p1cdlisoffice", data.p1cdlisoffice);
      uploadData.append("p1cdlisrecordapplicant", data.p1cdlisrecordapplicant);
      uploadData.append("p1cdlisrecordoffice", data.p1cdlisrecordoffice);

      //page 2
      uploadData.append(
        "p2consumerrecordapplicant",
        data.p2consumerrecordapplicant,
      );
      uploadData.append("p2consumerrecordoffice", data.p2consumerrecordoffice);
      uploadData.append("p2sphapplicant", data.p2sphapplicant);
      uploadData.append("p2sphoffice", data.p2sphoffice);
      uploadData.append("p2fmcsaapplicant", data.p2fmcsaapplicant);
      uploadData.append("p2fmcsaoffice", data.p2fmcsaoffice);
      uploadData.append("p2clearinghouseoffice", data.p2clearinghouseoffice);
      uploadData.append("p2predrugtestoffice", data.p2predrugtestoffice);
      uploadData.append("p2roadtestoffice", data.p2roadtestoffice);
      uploadData.append("p2twisoffice", data.p2twisoffice);
      uploadData.append("p2clearinghouseoffice", data.p2clearinghouseoffice);

      //page 4

      uploadData.append("p4formernames", data.p4formernames);

      //page 5

      uploadData.append("p5revisiondate", data.p5revisiondate);
      uploadData.append("p5check1", data.p5check1);
      uploadData.append("p5check2", data.p5check2);
      uploadData.append("p5check3", data.p5check3);
      uploadData.append("p5check4", data.p5check4);
      uploadData.append("p5check5", data.p5check5);
      uploadData.append("p5check6", data.p5check6);
      uploadData.append("p5check7", data.p5check7);
      uploadData.append("p5check8", data.p5check8);
      uploadData.append("p5check9", data.p5check9);

      //page 7

      uploadData.append("p7consortium", data.p7consortium);
      uploadData.append("p7mro", data.p7mro);
      uploadData.append("p7cmro", data.p7cmro);
      uploadData.append("p7sap", data.p7sap);
      uploadData.append("p7dotminimum", data.p7dotminimum);

      //page 8
      uploadData.append("p8check1", data.p8check1);
      uploadData.append("p8check2", data.p8check2);
      uploadData.append("p8check3", data.p8check3);
      uploadData.append("p8check4", data.p8check4);
      uploadData.append("p8check5", data.p8check5);
      uploadData.append("p8check6", data.p8check6);
      uploadData.append("p8check7", data.p8check7);
      uploadData.append("p8check8", data.p8check8);
      uploadData.append("p8check9", data.p8check9);
      uploadData.append("p8check10", data.p8check11);
      uploadData.append("p8check11", data.p8check12);
      uploadData.append("p8check12", data.p8check13);

      //9,10,11,12 pending

      //page 13

      uploadData.append("p13roadtest", data.p13roadtest);
      uploadData.append("p13miles", data.p13miles);
      uploadData.append("p13issuecertificate", data.p13issuecertificate);

      //page 15
      uploadData.append("p15dbaany", data.p15dbaany);
      uploadData.append("p15policyeffective", data.p15policyeffective);

      //page 20
      uploadData.append("p20driverid", data.p20driverid);

      //page 21
      uploadData.append("p21effectivedate", data.p21effectivedate);
      uploadData.append("p21safetycontact", data.p21safetycontact);
      uploadData.append("p21derdrug", data.p21derdrug);

      //page 26
      uploadData.append("p26tpa", data.p26tpa);
      uploadData.append("p26mro", data.p26mro);
      uploadData.append("p26collectionsite", data.p26collectionsite);
      uploadData.append("p26revisiondate", data.p26revisiondate);
      uploadData.append("p26derdatecompany", data.p26derdatecompany);
      uploadData.append("p26ctpa", data.p26ctpa);
      uploadData.append("p26medicalofficer", data.p26medicalofficer);
      uploadData.append("p26pnetwork", data.p26pnetwork);
      uploadData.append("p26sapcontact", data.p26sapcontact);

      //page 35
      uploadData.append("p35check1", data.p35check1);
      uploadData.append("p35check2", data.p35check2);
      uploadData.append("p35check3", data.p35check3);
      uploadData.append("p35check4", data.p35check4);
      uploadData.append("p35check5", data.p35check5);
      uploadData.append("p35check6", data.p35check6);
      uploadData.append("p35check7", data.p35check7);
      uploadData.append("p35check8", data.p35check8);
      uploadData.append("p35check9", data.p35check9);
      uploadData.append("p35check10", data.p35check10);

      //page 36
      uploadData.append("p36lastduty", data.p36lastduty);

      uploadData.append("p36day1", data.p36day1);
      uploadData.append("p36hours1", data.p36hours1);
      uploadData.append("p36permormance1", data.p36permormance1);

      uploadData.append("p36day2", data.p36day2);
      uploadData.append("p36hours2", data.p36hours2);
      uploadData.append("p36permormance2", data.p36permormance2);

      uploadData.append("p36day3", data.p36day3);
      uploadData.append("p36hours3", data.p36hours3);
      uploadData.append("p36permormance3", data.p36permormance3);

      uploadData.append("p36day4", data.p36day4);
      uploadData.append("p36hours4", data.p36hours4);
      uploadData.append("p36permormance4", data.p36permormance4);

      uploadData.append("p36day5", data.p36day5);
      uploadData.append("p36hours5", data.p36hours5);
      uploadData.append("p36permormance5", data.p36permormance5);

      uploadData.append("p36day6", data.p36day6);
      uploadData.append("p36hours6", data.p36hours6);
      uploadData.append("p36permormance6", data.p36permormance6);

      uploadData.append("p36day7", data.p36day7);
      uploadData.append("p36hours7", data.p36hours7);
      uploadData.append("p36permormance7", data.p36permormance7);

      uploadData.append("p36totalhours", data.p36totalhours);
      uploadData.append("p36cerdate", data.p36cerdate);
      uploadData.append("p36approvedpassenger", data.p36approvedpassenger);
      uploadData.append("p36relation", data.p36relation);

      //page 37
      uploadData.append("p37trip", data.p37trip);
      uploadData.append("p37condition", data.p37condition);
      uploadData.append("p37authorized", data.p37authorized);
      uploadData.append("p37aknowledge", data.p37aknowledge);
      uploadData.append("p37trainingdate", data.p37trainingdate);

      uploadData.append("p37part34section1", data.p37part34section1);
      uploadData.append("p37part34section2", data.p37part34section2);
      uploadData.append("p37part34section3", data.p37part34section3);
      uploadData.append("p37part34section4", data.p37part34section4);
      uploadData.append("p37part34section5", data.p37part34section5);
      uploadData.append("p37part34section6", data.p37part34section6);
      uploadData.append("p37part34section7", data.p37part34section7);
      uploadData.append("p37part34section8", data.p37part34section8);
      uploadData.append("p37part34section9", data.p37part34section9);

      uploadData.append("p37part34sectiondate1", data.p37part34sectiondate1);
      uploadData.append("p37part34sectiondate2", data.p37part34sectiondate2);
      uploadData.append("p37part34sectiondate3", data.p37part34sectiondate3);
      uploadData.append("p37part34sectiondate4", data.p37part34sectiondate4);
      uploadData.append("p37part34sectiondate5", data.p37part34sectiondate5);
      uploadData.append("p37part34sectiondate6", data.p37part34sectiondate6);
      uploadData.append("p37part34sectiondate7", data.p37part34sectiondate7);
      uploadData.append("p37part34sectiondate8", data.p37part34sectiondate8);
      uploadData.append("p37part34sectiondate9", data.p37part34sectiondate9);

      //page38
      uploadData.append("p38section1", data.p38section1);
      uploadData.append("p38section12", data.p38section2);
      uploadData.append("p38section13", data.p38section3);

      uploadData.append("p38sectiondate1", data.p38sectiondate1);
      uploadData.append("p38sectiondate2", data.p38sectiondate2);
      uploadData.append("p38sectiondate3", data.p38sectiondate3);

      //page 39.40 penidng

      uploadData.append("driver_id", id);
      uploadData.append("photo", photo);

      uploadData.append("driver_license", data.driver_license);

      uploadData.append(
        "company_id",
        JSON.parse(localStorage.getItem("user"))?.id || "",
      );

      for (const [key, value] of uploadData.entries()) {
        console.log("UPLOAD:", key, value);
      }

      const response = await api.post(`/company/driver-esign/add`, uploadData);

      const result = response.data;

      navigate(`/driver/esign-completed/${id}`, {
        replace: true,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="relative flex h-[76px] items-center justify-between overflow-hidden bg-[#0a1122] px-6">
        <div className="stripe-wrap pointer-events-none absolute inset-0">
          <div className="stripe"></div>
          <div className="stripe two"></div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm">
            {company?.logo ? (
              <img
                src={company.logo}
                alt={company?.cname || "Company Logo"}
                className="h-full w-full object-contain p-1"
              />
            ) : (
              <span className="text-lg font-bold text-gray-400">
                {company?.cname?.charAt(0) || "C"}
              </span>
            )}
          </div>

          <div>
            <p className="text-base font-extrabold leading-tight tracking-wide text-white sm:text-lg">
              {company?.cname || "Company"}
            </p>
          </div>
        </div>

        <div className="absolute left-1/2 z-10 -translate-x-1/2">
          <h1 className="font-['Tinos'] text-xl font-bold tracking-wide text-white sm:text-2xl">
            Electronic Sign
          </h1>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="min-h-screen bg-[#bdbdbd] font-['Tinos']"
      >
        <SignatureModal
          driverId={id}
          isOpen={signatureOpen}
          onClose={() => setSignatureOpen(false)}
          onSaved={(data) => {
            setsignatureData(data.signature);
            console.log("Saved Signature:", data);
          }}
        />
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 1</i>
          </p>
          <div className="text-center">
            <h3 className="mb-[10px] font-['Tinos'] text-[17.4px] font-bold tracking-[0.2px] text-[#133B63]">
              DOT COMPLIANCE SOLUTIONS LLC
            </h3>

            <h1 className="m-0 text-[#133B63] font-['Tinos'] text-[29.4px] font-bold leading-[1.22] tracking-[0.3px]">
              COMMERCIAL DRIVER
              <br />
              APPLICATION &amp; QUALIFICATION PACKET
            </h1>

            <div className="mb-[10px] mt-[14px] text-[21px] leading-[1.3] text-[#133B63] font-['Tinos'] text-[18px]">
              Complete Driver Application, Qualification, Onboarding &amp;
              Safety Policy Packet
            </div>
          </div>

          <table className="mt-2 w-full border-collapse text-[14px]">
            <tbody>
              <tr>
                <td className="h-[25px] w-[30%] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#133B63] font-['Tinos'] text-[12px]">
                  MOTOR CARRIER / EMPLOYER
                </td>
                <td className="h-[25px] border-b border-[#aebdcc]">
                  <input
                    name="p1motorcarrieremployer"
                    className="border border-3 border-black w-full h-[28px] p-2"
                    type="text"
                  />
                </td>
              </tr>

              <tr>
                <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#133B63] font-['Tinos'] text-[12px]">
                  USDOT NUMBER
                </td>

                <td className="h-[25px] border border-black">
                  <span className="pl-3">{company.dot}</span>
                </td>
              </tr>

              <tr>
                <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#133B63] font-['Tinos'] text-[12px]">
                  APPLICANT NAME
                </td>

                <td className="h-[25px] border-b border-[#aebdcc]">
                  <span className="pl-3">
                    {driver.fname} {driver.mname} {driver.lname}
                  </span>
                </td>
              </tr>

              <tr>
                <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#133B63] font-['Tinos'] text-[12px]">
                  POSITION APPLIED FOR
                </td>

                <td className="h-[25px] border-b border-[#aebdcc]">
                  <span className="pl-3">{driver.appliedfor}</span>
                  <input
                    name="p1appliedfor"
                    value={driver.appliedfor}
                    className="border border-3 border-black w-full h-[28px] p-2"
                    type="hidden"
                  />
                </td>
              </tr>

              <tr>
                <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#133B63] font-['Tinos'] text-[12px]">
                  APPLICATION DATE
                </td>

                <td className="h-[25px] border-b border-[#aebdcc]">
                  <input
                    name="p1applicationdate"
                    value={cleHDate}
                    className="border border-3 border-black w-full h-[28px] p-2"
                    type="date"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <section className="mt-[10px] text-center">
            <h2 className="mb-[6px] text-[16px] font-bold text-[#133B63] font-['Tinos'] text-[14px]">
              APPLICANT INSTRUCTIONS
            </h2>

            <p className="mx-auto my-0 max-w-[700px] text-[#133B63] font-['Tinos'] text-[14px] leading-[1.35]">
              Complete every applicable section. Use full legal names, complete
              addresses, and accurate dates. If additional space is needed,
              attach a signed continuation sheet identifying the section and
              question. Do not omit prior employers or driving history.
            </p>
          </section>

          <section className="mt-[12px]">
            <h2 className="mb-[8px] font-bold leading-[1.2] text-[#133B63] font-['Tinos'] text-[18px]">
              DOCUMENTS TO SUBMIT WITH YOUR DRIVER APPLICATION
            </h2>

            <div className="bg-[#d8e9f6] px-[10px] py-[9px] font-semibold leading-[1.35] text-[#133B63] font-['Tinos'] text-[12px]">
              Upload clear, complete, readable copies. Documents marked
              <strong>"if applicable"</strong> are required only when they apply
              to the driver or position. Employment-eligibility documents are
              handled under Form I-9 rules; applicants may choose which
              acceptable I-9 documents to present.
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-[13.5px]">
                <thead>
                  <tr>
                    <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-white font-['Arial'] text-[14px] font-bold text-white">
                      DOCUMENT
                    </th>
                    <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-white font-['Arial'] text-[14px] font-bold text-white">
                      APPLICANT
                    </th>
                    <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-white font-['Arial'] text-[14px] font-bold text-white">
                      OFFICE
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="text-[#133B63] font-['Arial'] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Current Driver License / CDL - front and back
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1applicantcdl" type="checkbox" />
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1officecdl" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Work authorization / acceptable Form I-9 documentation -
                      as applicable (employee chooses acceptable documents)
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1workauthapplicant" type="checkbox" />
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1workauthoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Employment Authorization Document / Work Permit - if
                      applicable and presented
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1workpermitapplicant" type="checkbox" />
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1workpermitoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Social Security card - if presented for I-9 or required
                      for lawful payroll/onboarding purposes
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1wssnapplicant" type="checkbox" />
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1ssnoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Current Medical Examiner's Certificate (DOT medical card),
                      if issued / available
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1cmapplicant" type="checkbox" />
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1cmeoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Medical Examination Report MCSA-5875 (long-form medical,
                      commonly 5 pages) - only if requested with driver consent;
                      treated as confidential medical information
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1merapplicant" type="checkbox" />
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1meroffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Medical certification verification / CDLIS MVR showing
                      medical status
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <span className=" text-[#133B63] text-[12px] px-[6px] py-[7px] align-top leading-[1.22]">
                          Office obtains
                        </span>
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1mcvoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Medical variance / exemption / SPE certificate - if
                      applicable
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1cdlisapplicant" type="checkbox" />
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1cdlisoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Signed DMV / MVR / CDLIS Records Consent Form
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1cdlisrecordapplicant" type="checkbox" />
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p1cdlisrecordoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 2</i>
          </p>
          <section className="mt-[12px]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-[13.5px]">
                <tbody>
                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Signed Background / Consumer Report Authorization -
                      including criminal-history screening where lawful
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input
                          name="p2consumerrecordapplicant"
                          type="checkbox"
                        />
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p2consumerrecordoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Safety Performance History authorization for previous
                      DOT-regulated employers
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p2sphapplicant" type="checkbox" />
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p2sphoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      FMCSA Clearinghouse limited-query consent
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p2fmcsaapplicant" type="checkbox" />
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p2fmcsaoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      FMCSA Clearinghouse full-query electronic consent
                    </td>

                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Driver completes in Clearinghouse
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p2clearinghouseoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Pre-employment drug-test documentation / result, as
                      applicable
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <span className=" text-[#133B63] text-[12px] px-[6px] py-[7px] align-top leading-[1.22]">
                          Office obtains
                        </span>
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p2predrugtestoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Road Test Certificate or accepted equivalent
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <span className=" text-[#133B63] text-[12px] px-[6px] py-[7px] align-top leading-[1.22]">
                          Office completes
                        </span>
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p2roadtestoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                      Any additional state, insurance, customer, endorsement,
                      TWIC, permit, or company-required credential
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <span className=" text-[#133B63] text-[12px] px-[6px] py-[7px] align-top leading-[1.22]">
                          if applicable
                        </span>
                      </div>
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input name="p2twisoffice" type="checkbox" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <i className="text-[10.5px]">
                        IMPORTANT: A Social Security card or Employment
                        Authorization Document is not automatically required as
                        the specific Form I-9 document. The employee has the
                        right to present any acceptable document or combination
                        allowed by Form I-9 rules.
                      </i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 3</i>
          </p>
          <section className="mt-2 sm:mt-[12px]">
            <h2 className="mb-2 text-base sm:text-[18px] font-bold leading-[1.2] text-[#174875]">
              23 DMV / MVR / CDLIS DRIVER RECORDS AUTHORIZATION & CONSENT
            </h2>

            <div className="mb-3 bg-[#d8e9f6] px-2.5 py-2 text-[11px] sm:text-[13px] font-semibold leading-[1.35] text-[#173f69]">
              This authorization is intended to permit the prospective motor
              carrier and its authorized screening provider to obtain
              driving-record information for lawful employment and
              driver-qualification purposes. It does not replace any separate
              consent required by a State agency or screening provider.
            </div>

            <div className="mb-2 text-[11px] sm:text-[13px] leading-[1.5]">
              I authorize the prospective employer, its authorized agents, and
              its designated consumer reporting or records provider to obtain
              and review motor vehicle records and driver-license information
              for lawful employment and driver-qualification purposes. This
              authorization includes records from State Driver Licensing
              Agencies and, when lawfully available through an authorized
              source, CDLIS-related information concerning my commercial driver
              license status, class, endorsements, restrictions,
              disqualifications, convictions, suspensions/revocations, and
              medical-certification status.
            </div>

            <div className="mb-3 text-[11px] sm:text-[12.5px] leading-[1.5]">
              I authorize such records to be obtained before employment and, to
              the extent permitted by law, periodically during employment for
              driver qualification, safety, insurance, and compliance purposes.
              I understand that additional State-specific notices or
              authorizations may be required.
            </div>

            <div className="w-full overflow-hidden">
              <table className="w-full table-fixed border-collapse text-[11px] sm:text-[13.5px]">
                <tbody>
                  {/* Driver Name */}
                  <tr>
                    <td className="w-[42%] border border-[#555] px-2 py-2 align-top">
                      <label className="text-[10px] sm:text-xs">
                        Driver Full Legal Name
                      </label>
                    </td>

                    <td className="h-[25px] border border-black">
                      <span className="pl-3">
                        {driver.fname} {driver.mname} {driver.lname}
                      </span>
                    </td>
                  </tr>

                  {/* DOB */}
                  <tr>
                    <td className="border border-[#555] px-2 py-2 align-top">
                      <label className="text-[10px] sm:text-xs">
                        Date of Birth
                      </label>
                    </td>

                    <td className="border border-[#555] px-2 py-2">
                      <span className="pl-3">{driver.dob}</span>
                    </td>
                  </tr>

                  {/* License / State */}
                  <tr>
                    <td className="border border-[#555] px-2 py-2 align-top">
                      <label className="mb-1 block text-[10px] sm:text-xs">
                        Driver License / CDL Number
                      </label>

                      <input
                        className="box-border w-full min-w-0 border border-black p-1.5 sm:p-2 text-xs sm:text-sm"
                        type="text"
                        value={driver.currentcdllicenseno}
                      />
                    </td>

                    <td className="border border-[#555] px-2 py-2 align-top">
                      <label className="mb-1 block text-[10px] sm:text-xs">
                        State:
                      </label>

                      <input
                        className="box-border w-full min-w-0 border border-black p-1.5 sm:p-2 text-xs sm:text-sm"
                        type="text"
                        value={driver.currentcdlstate}
                      />
                    </td>
                  </tr>

                  {/* Address */}
                  <tr>
                    <td className="border border-[#555] px-2 py-2 align-top">
                      <label className="text-[10px] sm:text-xs">
                        Current Address
                      </label>
                    </td>

                    <td className="border border-[#555] px-2 py-2">
                      <textarea
                        name="p3currentaddress"
                        defaultValue={[
                          driver?.currentstreet,
                          driver?.currentcity,
                          driver?.currentstate,
                          driver?.currentzip,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                        className="box-border h-24 sm:h-[120px] w-full min-w-0 resize-y border border-[#555] p-2 text-xs sm:text-sm"
                        placeholder="Current Address"
                      ></textarea>
                    </td>
                  </tr>

                  {/* Driver Signature */}
                  <tr>
                    <td className="border border-[#555] px-2 py-2 align-top">
                      <label className="mb-1 block text-[10px] sm:text-xs">
                        Driver Signature
                      </label>
                      {!signatureData ? (
                        <input
                          onClick={() => setSignatureOpen(true)}
                          className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                          type="text"
                        />
                      ) : (
                        <span>
                          {signatureData ? (
                            <img
                              className="w-full h-[40px] object-contain"
                              src={`${
                                window.location.hostname === "localhost"
                                  ? "http://localhost:8000/storage/"
                                  : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                              }${signatureData}`}
                              alt={signatureData}
                            />
                          ) : (
                            "No Image"
                          )}
                        </span>
                      )}
                    </td>

                    <td className="border border-[#555] px-2 py-2 align-top">
                      <label className="mb-1 block text-[10px] sm:text-xs">
                        Date:
                      </label>

                      <input
                        value={cleHDate}
                        className="box-border w-full min-w-0 border border-black p-1.5 sm:p-2 text-xs sm:text-sm"
                        type="date"
                      />
                    </td>
                  </tr>

                  {/* Employer */}
                  <tr>
                    <td className="border border-[#555] px-2 py-2 align-top">
                      <label className="mb-1 block text-[10px] sm:text-xs">
                        Employer / Authorized Representative
                      </label>

                      <input
                        className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                        type="text"
                        value={company.owner}
                      />
                    </td>

                    <td className="border border-[#555] px-2 py-2 align-top">
                      <label className="mb-1 block text-[10px] sm:text-xs">
                        Date:
                      </label>

                      <input
                        value={cleHDate}
                        className="box-border w-full min-w-0 border border-black p-1.5 sm:p-2 text-xs sm:text-sm"
                        type="date"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 4</i>
          </p>
          <section className="mt-[12px]">
            <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
              24 STANDALONE BACKGROUND / CONSUMER REPORT DISCLOSURE &
              AUTHORIZATION
            </h2>

            <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[11.4px] font-semibold leading-[1.35] text-[#173f69]">
              EMPLOYMENT PURPOSES - This page is intended to stand on its own.
              Employers should review applicable Federal, State, and local
              screening laws and provide any additional notices required for the
              applicant’s location.
            </div>
            <div className="mb-2 text-[12.5px]">
              <h2 className="mt-2 mb-[8px] text-[12.5px] font-bold leading-[1.2] text-[#174875]">
                DISCLOSURE
              </h2>
              The prospective employer may obtain a consumer report and/or
              investigative consumer report about you for employment purposes.
              Depending on the screening ordered and permitted by law, the
              report may include identity verification, employment and education
              verification, motor vehicle and commercial driver license records,
              and criminal-history/public-record information. The employer may
              use the report in evaluating your application and, where
              permitted, during employment.
            </div>

            <div className="mb-2 text-[12.5px]">
              <h2 className="mt-2 mb-[8px] text-[12.5px] font-bold leading-[1.2] text-[#174875]">
                AUTHORIZATION
              </h2>
              I authorize the prospective employer and its authorized consumer
              reporting agency or screening provider to obtain consumer reports
              and investigative consumer reports about me for lawful employment
              purposes. I authorize courts, government agencies, licensing
              agencies, educational institutions, former employers, and other
              lawful record sources to release information to the authorized
              screening provider as permitted by law. I understand that this
              authorization includes criminal-history screening and motor
              vehicle/CDL-related records when such screening is lawful and
              requested by the employer.
            </div>

            <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[11.4px] font-semibold leading-[1.35] text-[#173f69]">
              This authorization does NOT replace the FMCSA Clearinghouse
              consent process. Full Clearinghouse queries require the driver’s
              specific electronic consent inside the FMCSA Clearinghouse.
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-[13.5px]">
                <tbody>
                  <tr>
                    <td className="border border-[#555] px-[6px] py-[7px] text-left text-[11px]">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Full Legal Name
                      </span>
                    </td>

                    <td className="border border-[#555] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <span className="pl-3">
                          {driver.fname} {driver.mname} {driver.lname}
                        </span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-[#555] px-[6px] py-[7px] text-left text-[11px]">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Other / Former Names Used
                      </span>
                    </td>

                    <td className="border border-[#555]  align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <input
                          name="p4formernames"
                          className="w-full h-[30px] border border-black p-2"
                          type="text"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-[#555] px-[6px] py-[7px] text-left text-[11px]">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Date of Birth
                      </span>
                    </td>

                    <td className="border border-[#555] align-middle text-left text-[17px]">
                      <div className="flex items-center justify-center gap-3">
                        <span className="pl-3">{driver.dob}</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-[#555] px-[6px] py-[7px] text-left text-[11px]">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Current Address
                      </span>
                    </td>

                    <td className="border border-[#555] px-2 py-2">
                      <textarea
                        name="p3currentaddress"
                        defaultValue={[
                          driver?.currentstreet,
                          driver?.currentcity,
                          driver?.currentstate,
                          driver?.currentzip,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                        className="box-border h-24 sm:h-[120px] w-full min-w-0 resize-y border border-[#555] p-2 text-xs sm:text-sm"
                        placeholder="Current Address"
                      ></textarea>
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-[#555] px-[6px] py-[7px] text-left text-[11px]">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Driver License / CDL Number
                      </span>
                      <br />
                      <input
                        className="w-full border border-black p-2 h-[20px]"
                        type="text"
                        value={driver.currentcdllicenseno}
                      />
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] text-left text-[11px]">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        State:
                      </span>
                      <br />
                      <input
                        className="w-full border border-black p-2 h-[20px]"
                        type="text"
                        value={driver.currentcdlstate}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-[#555] px-[6px] py-[7px] text-left text-[11px]">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Applicant Signature
                      </span>
                      <br />
                      {!signatureData ? (
                        <input
                          onClick={() => setSignatureOpen(true)}
                          className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                          type="text"
                        />
                      ) : (
                        <span>
                          {signatureData ? (
                            <img
                              className="w-full h-[40px] object-contain"
                              src={`${
                                window.location.hostname === "localhost"
                                  ? "http://localhost:8000/storage/"
                                  : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                              }${signatureData}`}
                              alt={signatureData}
                            />
                          ) : (
                            "No Image"
                          )}
                        </span>
                      )}
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] text-left text-[11px]">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Date:
                      </span>
                      <br />
                      <input
                        value={cleHDate}
                        className="w-full border border-black p-2 h-[20px]"
                        type="date"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-[#555] px-[6px] py-[7px] text-left text-[11px]">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Employer / Authorized Representative
                      </span>
                      <br />
                      <input
                        className="w-full border border-black p-2 h-[40px]"
                        type="text"
                        value={company.owner}
                      />
                    </td>

                    <td className="border border-[#555] px-[6px] py-[7px] text-left text-[11px]">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Date:
                      </span>
                      <br />
                      <input
                        value={cleHDate}
                        className="w-full border border-black p-2 h-[20px]"
                        type="date"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        {/******page 5 start*******/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 5</i>
          </p>
          <div>
            <header className="text-center mb-3">
              <h1
                className="text-[#1d3b61] font-bold uppercase leading-tight
               text-[21px] tracking-[-0.3px]"
              >
                DOT DRUG &amp; ALCOHOL PROGRAM
              </h1>

              <h2
                className="text-[#1d3b61] font-bold uppercase leading-tight
               text-[21px] tracking-[-0.3px]"
              >
                DRIVER REVIEW, CONSENT &amp; COMPANY POLICY
              </h2>

              <p className="font-bold text-[12.4px] mt-2">
                49 CFR Part 40 and 49 CFR Part 382
              </p>
            </header>

            <section className="mt-1">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                A. COMPANY / DRIVER INFORMATION
              </div>

              <div className="mt-4 sm:mt-5 space-y-4 sm:space-y-[25px]">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-[auto_1fr_auto_1fr] md:gap-0 md:items-center">
                  <label className="font-bold text-[12px] whitespace-nowrap">
                    Motor Carrier / Employer Name:
                  </label>

                  <input
                    value={company.cname}
                    type="text"
                    className="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                  />

                  <label className="font-bold text-[12px] md:pl-1 whitespace-nowrap">
                    USDOT No.:
                  </label>

                  <input
                    value={company.dot}
                    type="text"
                    className="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-[auto_1fr_auto_1fr] md:gap-0 md:items-center">
                  <label className="font-bold text-[12px] whitespace-nowrap">
                    Designated Employer Representative (DER):
                  </label>

                  <input
                    value={company.owner}
                    type="text"
                    className="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                  />

                  <label className="font-bold text-[12px] md:pl-1 whitespace-nowrap">
                    DER Phone / Email:
                  </label>

                  <input
                    value={company.phone}
                    type="text"
                    className="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-[auto_1fr_auto_1fr] md:gap-0 md:items-center">
                  <label className="font-bold text-[12px] whitespace-nowrap">
                    Driver Name:
                  </label>

                  <input
                    value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                    type="text"
                    className="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                  />

                  <label className="font-bold text-[12px] md:pl-1 whitespace-nowrap">
                    CDL No. / State:
                  </label>

                  <input
                    value={`${driver.currentcdllicenseno}/ ${driver.currentcdlstate}`}
                    type="text"
                    className="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-[auto_1fr_auto_1fr] md:gap-0 md:items-center">
                  <label className="font-bold text-[12px] whitespace-nowrap">
                    Date of Hire / Use:
                  </label>

                  <input
                    type="date"
                    value={cleHDate}
                    name="p5dateofhire"
                    className="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                  />

                  <label className="font-bold text-[12px] md:pl-1 whitespace-nowrap">
                    Policy Effective / Revision Date:
                  </label>

                  <input
                    name="p5revisiondate"
                    type="date"
                    className="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                  />
                </div>
              </div>
            </section>

            <section className="mt-[33px]">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                B. DRIVER DRUG &amp; ALCOHOL PROGRAM REVIEW
              </div>

              <div className="mt-5 px-[-2px]">
                <p className="text-[13.4px] leading-[1.28] mb-3">
                  The driver acknowledges that the Company has explained its DOT
                  controlled-substances and alcohol testing program, including
                  testing circumstances, prohibited conduct, testing procedures,
                  consequences, Clearinghouse obligations, and driver
                  responsibilities. The driver is encouraged to ask questions
                  before signing.
                </p>

                <div className="space-y-[7px] text-[13.4px] leading-[1.15]">
                  <label className="block">
                    <input name="p5check1" type="checkbox" />I understand
                    whether my position is subject to 49 CFR Part 382 and DOT
                    testing requirements.
                  </label>

                  <label className="block">
                    <input name="p5check2" type="checkbox" />
                    Participation in the Company DOT drug and alcohol testing
                    program is required to perform covered safety-sensitive
                    functions.
                  </label>

                  <label className="block">
                    <input name="p5check3" type="checkbox" />I reviewed
                    prohibited drug and alcohol conduct and the circumstances
                    for pre-employment, random, reasonable-suspicion,
                    post-accident, return-to-duty, and follow-up testing.
                  </label>

                  <label className="block">
                    <input name="p5check4" type="checkbox" />I understand that a
                    refusal to test is a DOT violation when the applicable rules
                    define the conduct as a refusal.
                  </label>

                  <label className="block">
                    <input name="p5check5" type="checkbox" />I understand the
                    consequences of a verified positive drug test, an alcohol
                    concentration of 0.04 or greater, or a refusal, including
                    removal from safety-sensitive functions and the
                    SAP/return-to-duty process.
                  </label>

                  <label className="block">
                    <input name="p5check6" type="checkbox" />I understand that
                    an alcohol concentration of 0.02 through 0.039 requires
                    temporary removal from safety-sensitive functions as
                    required by the regulations.
                  </label>

                  <label className="block">
                    <input name="p5check7" type="checkbox" />I understand my
                    obligations relating to required FMCSA Drug &amp; Alcohol
                    Clearinghouse queries.
                  </label>

                  <label className="block">
                    <input name="p5check8" type="checkbox" />I received
                    information about the effects and consequences of alcohol
                    misuse and controlled-substances use, signs and symptoms,
                    and intervention resources.
                  </label>

                  <label className="block">
                    <input name="p5check9" type="checkbox" />I understand that
                    Company-authority/non-DOT testing or discipline must be
                    identified separately from DOT requirements.
                  </label>
                </div>
              </div>
            </section>

            <section className="mt-1">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                C. CONSENT AND AUTHORIZATION FOR DOT-REQUIRED TESTING
              </div>

              <div className="mt-5 text-[13.4px] leading-[1.28]">
                <p className="mb-4">
                  I authorize and consent to controlled-substances and alcohol
                  testing required by applicable DOT/FMCSA regulations while I
                  am subject to the Company DOT testing program. DOT tests will
                  be conducted under 49 CFR Part 40 and applicable FMCSA
                  requirements. This authorization does not replace any separate
                  consent or electronic consent required by law, including
                  consent required within the FMCSA Drug &amp; Alcohol
                  Clearinghouse.
                </p>

                <p>
                  I authorize the Company and its authorized service agents, as
                  permitted by applicable law and DOT regulations, to receive
                  and use DOT test results and related compliance information
                  for safety-sensitive qualification, regulatory compliance, and
                  employment/use decisions. DOT records remain subject to
                  applicable confidentiality and release restrictions.
                </p>
              </div>
            </section>
          </div>
        </div>
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 6</i>
          </p>
          <div>
            <section className="mt-1">
              <div className="mt-5 space-y-[25px]">
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_1fr] md:items-center">
                  <label className="font-bold text-[12px] whitespace-nowrap">
                    Driver signature:
                  </label>

                  {!signatureData ? (
                    <input
                      onClick={() => setSignatureOpen(true)}
                      className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                      type="text"
                    />
                  ) : (
                    <span className="border border-black">
                      {signatureData ? (
                        <img
                          className="w-full h-[40px] object-contain"
                          src={`${
                            window.location.hostname === "localhost"
                              ? "http://localhost:8000/storage/"
                              : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                          }${signatureData}`}
                          alt={signatureData}
                        />
                      ) : (
                        "No Image"
                      )}
                    </span>
                  )}

                  <label className="font-bold text-[12px] md:pl-2 whitespace-nowrap">
                    Date:
                  </label>

                  <input
                    type="date"
                    value={cleHDate}
                    className="h-[26px] w-full border-[1.5px] border-[#26364d] outline-none px-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_1fr] md:items-center">
                  <label className="font-bold text-[12px] whitespace-nowrap">
                    Printed Name:
                  </label>

                  <input
                    type="text"
                    value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                    className="h-[30px] w-full border-[1.5px] border-[#26364d] outline-none px-1"
                  />

                  <label className="font-bold text-[12px] md:pl-2 whitespace-nowrap">
                    CDL No. / State:
                  </label>

                  <input
                    type="text"
                    value={driver.currentcdllicenseno}
                    className="h-[26px] w-full border-[1.5px] border-[#26364d] outline-none px-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_1fr] md:items-center">
                  <label className="font-bold text-[12px] whitespace-nowrap">
                    Company Representative:
                  </label>

                  <input
                    type="text"
                    value={company.owner}
                    className="h-[30px] w-full border-[1.5px] border-[#26364d] outline-none px-1"
                  />

                  <label className="font-bold text-[12px] md:pl-2 whitespace-nowrap">
                    Date:
                  </label>

                  <input
                    type="date"
                    value={cleHDate}
                    className="h-[26px] w-full border-[1.5px] border-[#26364d] outline-none px-1"
                  />
                </div>
              </div>
            </section>

            <section className="mt-[33px]">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                D. COMPANY DOT DRUG & ALCOHOL POLICY AND PROCEDURES
              </div>

              <div className="mt-5 px-[-2px]">
                <p className="text-[13.4px] leading-[1.28] mb-3">
                  Policy Purpose. The Company is committed to public safety and
                  compliance with DOT/FMCSA controlled-substances and alcohol
                  testing requirements. This policy applies to covered drivers
                  required to hold a CDL who perform safety-sensitive functions
                  subject to 49 CFR Part 382. DOT testing will be administered
                  in accordance with 49 CFR Part 40 and applicable provisions of
                  Part 382.
                  <br />
                  <br />
                  Designated Employer Representative (DER). The Company will
                  identify a DER authorized to receive program communications
                  and results, remove drivers from safety-sensitive functions
                  when required, and take immediate compliance actions. The DER
                  name, telephone number, and office/contact information must be
                  completed before this policy is issued.
                  <br />
                  <br />
                  Safety-Sensitive Functions. Covered drivers are subject to
                  applicable prohibitions and testing requirements while
                  performing safety-sensitive functions as defined by FMCSA
                  regulations, including covered on-duty activities associated
                  with operation of a commercial motor vehicle.
                </p>
              </div>
            </section>

            <section className="mt-1">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                E. PROHIBITED CONDUCT
              </div>

              <div className="mt-5 text-[13.4px] leading-[1.28]">
                <p className="mb-4">
                  • A covered driver may not perform safety-sensitive functions
                  when prohibited by the alcohol rules, including prohibited
                  alcohol use before, during, or following safety-sensitive
                  duties as specified by applicable FMCSA regulations.
                  <br />
                  • A covered driver may not report for or remain on duty
                  requiring safety-sensitive functions when using controlled
                  substances
                  <br />
                  contrary to applicable DOT/FMCSA requirements. • A covered
                  driver may not refuse to submit to a DOT-required test.
                  <br />
                  • A covered driver may not perform safety-sensitive functions
                  after a verified positive controlled-substances test, an
                  alcohol
                  <br />
                  concentration of 0.04 or greater, or a refusal until
                  applicable return-to-duty requirements are satisfied.
                  <br />
                  • Drivers must comply with post-accident testing instructions
                  and remain available for testing when regulatory criteria are
                  met.
                  <br />• Any additional Company rule exceeding DOT requirements
                  must be separately identified as Company authority and not
                  represented as an FMCSA mandate.
                </p>
              </div>
            </section>

            <section className="mt-1">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                F. TYPES OF DOT TESTING
              </div>

              <div className="mt-5 text-[13.4px] leading-[1.28]">
                <p className="mb-4">
                  • Pre-Employment - required controlled-substances testing
                  before first covered safety-sensitive duty, subject to
                  regulatory exceptions.
                  <br />
                  • Random - unannounced random testing using a scientifically
                  valid selection process at applicable FMCSA rates.
                  <br />
                  • Reasonable Suspicion - testing based on observations made by
                  a supervisor trained as required by the regulations.
                  <br />
                  • Post-Accident - testing when applicable FMCSA accident
                  criteria require it, with required documentation when testing
                  cannot be timely completed.
                  <br />
                  • Return-to-Duty - testing after completion of the required
                  SAP process and before resuming safety-sensitive functions.
                  <br />• Follow-Up - unannounced testing according to the SAP
                  prescribed follow-up plan.
                </p>
              </div>
            </section>

            <section className="mt-1">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                G. TESTING PROCEDURES, RESULTS & CONFIDENTIALITY
              </div>
            </section>
          </div>
        </div>
        {/*****page 7 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 7</i>
          </p>
          <div>
            <section className="mt-1">
              <div className="mt-5 text-[13.4px] leading-[1.28]">
                <p className="mb-4">
                  DOT testing will use Part 40 procedures and qualified
                  collection/testing personnel and service agents. Drug results
                  are reviewed by a qualified Medical Review Officer (MRO) as
                  required. Alcohol testing is performed by qualified personnel
                  using approved procedures and devices. DOT drug and alcohol
                  records will be maintained and released only as permitted or
                  required.
                  <br />
                  The Company remains responsible for compliance when using a
                  consortium/third-party administrator, collection site,
                  laboratory, MRO, BAT/STT, SAP, or other service agent.
                </p>
              </div>
            </section>

            <section className="mt-[33px]">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                H. CONSEQUENCES, SAP & RETURN-TO-DUTY
              </div>

              <div className="mt-5 px-[-2px]">
                <p className="text-[13.4px] leading-[1.28] mb-3">
                  A driver with a verified positive drug test, an alcohol
                  concentration of 0.04 or greater, or a refusal must be removed
                  from DOT safety-sensitive functions. The driver must receive
                  information regarding qualified Substance Abuse Professionals
                  (SAPs) and complete the applicable evaluation,
                  education/treatment, return-to-duty, and follow-up process
                  before resuming DOT safety- sensitive functions. Company
                  employment actions beyond the federal minimum must be stated
                  separately as Company policy and applied consistently with
                  applicable law.
                </p>
              </div>
            </section>

            <section className="mt-1">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                I. CLEARINGHOUSE PROCEDURES
              </div>

              <div className="mt-5 text-[13.4px] leading-[1.28]">
                <p className="mb-4">
                  The Company will comply with applicable FMCSA Drug & Alcohol
                  Clearinghouse requirements, including required pre-
                  employment/full queries, annual queries, reporting
                  obligations, and prohibitions on permitting a driver with a
                  prohibited status to perform safety-sensitive functions. A
                  separate limited-query consent may be used when permitted.
                  This paper form does not substitute for specific electronic
                  consent required for a full Clearinghouse query.
                </p>
              </div>
            </section>

            <section className="mt-1">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                J. DRIVER EDUCATION / EFFECTS OF DRUGS AND ALCOHOL
              </div>

              <div className="mt-5 text-[13.4px] leading-[1.28]">
                <p className="mb-4">
                  The Company will provide covered drivers with educational
                  materials explaining the DOT/FMCSA program and Company policy,
                  including the effects and consequences of alcohol misuse and
                  controlled-substances use on health, safety, work, and
                  personal life; signs and symptoms; and available methods of
                  intervention. Drivers may contact the DER for additional
                  information and resources.
                </p>
              </div>
            </section>

            <section className="mt-1">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                K. COMPANY-SPECIFIC PROVISIONS - COMPLETE BEFORE ISSUING POLICY
              </div>
              <br />
              <br />

              <div className="overflow-x-auto">
                <table className="w-full table-fixed text-[12px]">
                  <tbody className="font-bold">
                    <tr>
                      <td className=" px-[6px] py-[7px] align-top leading-[1.22]">
                        DER Name / Title
                      </td>
                      <td
                        colSpan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          value={company.owner}
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className=" px-[6px] py-[7px] align-top leading-[1.22]">
                        DER Telephone / Email
                      </td>
                      <td
                        colSpan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          value={`${company.phone}/${company.email}`}
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className=" px-[6px] py-[7px] align-top leading-[1.22]">
                        TPA / Consortium
                      </td>
                      <td
                        colSpan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          name="p7consortium"
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className=" px-[6px] py-[7px] align-top leading-[1.22]">
                        MRO / Contact
                      </td>
                      <td
                        colSpan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          name="p7mro"
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className=" px-[6px] py-[7px] align-top leading-[1.22]">
                        CMRO / Contact
                      </td>
                      <td
                        colSpan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          name="p7cmro"
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className=" px-[6px] py-[7px] align-top leading-[1.22]">
                        SAP Resource / Referral Method
                      </td>
                      <td
                        colSpan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          name="p7sap"
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className=" px-[6px] py-[7px] align-top leading-[1.22]">
                        Company disciplinary action beyond DOT minimum
                      </td>
                      <td
                        colSpan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          name="p7dotminimum"
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
        {/*****page 8 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 8</i>
          </p>
          <div>
            <section className="mt-1">
              <div className="mt-5 text-[12px] leading-[1.28]">
                <p className="mb-4">
                  <b>
                    Separate non-DOT / Company-authority testing policy, if any
                  </b>
                </p>
              </div>
            </section>

            <section className="mt-[33px]">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                L. CERTIFICATE OF RECEIPT OF COMPANY POLICY & EDUCATIONAL
                MATERIALS
              </div>

              <div className="mt-5 px-[-2px]">
                <p className="text-[13.4px] leading-[1.28] mb-3">
                  I certify that I received a copy of the Company DOT Drug &
                  Alcohol Policy and Procedures and the educational materials
                  provided under the Company FMCSA drug and alcohol program. My
                  signature confirms receipt of these materials.
                </p>

                <section className="mt-1">
                  <div className="mt-5 space-y-[25px]">
                    <div className="flex w-[100%]">
                      <div className="w-[50%]">
                        <label className="font-bold text-[12px]">
                          Driver Printed Name:
                        </label>

                        <input
                          value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                          type="text"
                          className="h-[30px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                        />
                      </div>
                      <div className="w-[50%] text-right">
                        <label className="font-bold text-[12px] pl-1">
                          CDL No. / State:
                        </label>

                        <input
                          value={`${driver.currentcdllicenseno}/ ${driver.currentcdlstate}`}
                          type="text"
                          className="h-[26px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                        />
                      </div>
                    </div>

                    <div className="flex w-[100%]">
                      <div className="w-[50%] flex">
                        <label className="font-bold text-[12px]">
                          Driver Signature:
                        </label>

                        {!signatureData ? (
                          <input
                            onClick={() => setSignatureOpen(true)}
                            className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                            type="text"
                          />
                        ) : (
                          <span className="w-[66%] border border-black">
                            {signatureData ? (
                              <img
                                className="w-full h-[40px] object-contain"
                                src={`${
                                  window.location.hostname === "localhost"
                                    ? "http://localhost:8000/storage/"
                                    : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                }${signatureData}`}
                                alt={signatureData}
                              />
                            ) : (
                              "No Image"
                            )}
                          </span>
                        )}
                      </div>
                      <div className="w-[50%] text-right">
                        <label className="font-bold text-[12px] pl-1">
                          Date:
                        </label>

                        <input
                          type="date"
                          value={cleHDate}
                          className="h-[26px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                        />
                      </div>
                    </div>

                    <div className="flex w-[100%]">
                      <div className="w-[50%]">
                        <label className="font-bold text-[12px]">
                          Company Representative:
                        </label>

                        <input
                          value={company.owner}
                          type="text"
                          className="h-[30px] w-[50%] border-[1.5px] border-[#26364d] outline-none px-1"
                        />
                      </div>
                      <div className="w-[50%] text-right">
                        <label className="font-bold text-[12px] pl-1">
                          Title:
                        </label>

                        <input
                          type="text"
                          value="Owner"
                          className="h-[26px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                        />
                      </div>
                    </div>

                    <div className="flex w-[100%]">
                      <div className="w-[50%]">
                        <label className="font-bold text-[12px]">
                          Representative Signature:
                        </label>

                        <input
                          type="text"
                          className="h-[30px] w-[50%] border-[1.5px] border-[#26364d] outline-none px-1"
                        />
                      </div>
                      <div className="w-[50%] text-right">
                        <label className="font-bold text-[12px] pl-1">
                          Date:
                        </label>

                        <input
                          type="date"
                          value={cleHDate}
                          className="h-[26px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                        />
                      </div>
                    </div>
                    <br />
                  </div>
                </section>
              </div>
            </section>

            <section className="mt-1">
              <div
                className="bg-[#1d3b61] text-white font-bold uppercase
           text-[14.7px] sm:text-[14.7px] md:text-[14.7px]
           px-1 py-[3px]"
              >
                M. EMPLOYER DRUG & ALCOHOL COMPLIANCE CHECKLIST
              </div>

              <div className="mt-5 text-[13.4px] leading-[1.28]">
                <p className="mb-4">
                  <input name="p8check1" type="checkbox" /> Written Part 382
                  drug and alcohol policy completed with company-specific
                  information.
                  <br />
                  <input name="p8check2" type="checkbox" />
                  Driver received policy and educational materials.
                  <br />
                  <input name="p8check3" type="checkbox" />
                  Signed certificate of receipt retained by employer.
                  <br />
                  <input name="p8check4" type="checkbox" />
                  Pre-employment drug test or qualifying exception documented
                  before first safety-sensitive function.
                  <br />
                  <input name="p8check5" type="checkbox" />
                  Clearinghouse pre-employment query completed and driver not
                  prohibited.
                  <br />
                  <input name="p8check6" type="checkbox" />
                  Driver enrolled in random testing pool/consortium when
                  required.
                  <br />
                  <input name="p8check7" type="checkbox" />
                  Annual Clearinghouse query tracked and completed.
                  <br />
                  <input name="p8check8" type="checkbox" />
                  Prior-employer DOT drug/alcohol information request completed
                  when required.
                  <br />
                  <input name="p8check9" type="checkbox" />
                  Supervisor reasonable-suspicion training documented (at least
                  60 minutes alcohol and 60 minutes controlled substances) for
                  persons who make determinations.
                  <br />
                  <input name="p8check10" type="checkbox" />
                  DOT drug/alcohol records maintained securely with appropriate
                  access controls.
                  <br />
                  <input name="p8check11" type="checkbox" />
                  DER and service-agent contact information current.
                  <br />
                  <input name="p8check12" type="checkbox" />
                  Any non-DOT testing program separately documented and clearly
                  distinguished from DOT testing.
                  <br />
                  <span className="text-[10.7px] leading-tight">
                    <i>
                      Company completion note: Before issuing this policy,
                      complete all company-specific fields and review any
                      disciplinary provisions, state-law requirements,
                      collective bargaining obligations, and non-DOT testing
                      provisions applicable to the motor carrier.
                    </i>
                  </span>
                </p>
              </div>
            </section>
          </div>
        </div>
        {/*****page 9 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 9</i>
          </p>
          <div className="w-full">
            <h1
              className="text-center font-bold
           text-[16px]"
            >
              SAFETY PERFORMANCE HISTORY RECORDS REQUEST
            </h1>

            <div
              className="border border-[#26364d] bg-[#dbe4f1]
           h-[25px]
           flex flex-col
           md:flex-row md:items-center
           text-[12px]
           font-bold"
            >
              <div
                className="w-full md:w-[75px]
             h-[25px]
             flex items-center
             px-[2px]
             border-b md:border-b-0
             md:border-r border-[#26364d]"
              >
                PART 1:
              </div>

              <div
                className="w-full md:flex-1
             min-h-[32px]
             border-t md:border-t-0
             md:border-l border-[#26364d]
             flex items-center
             px-[5px]
             py-[5px] md:py-0
             whitespace-normal md:whitespace-nowrap"
              >
                TO BE COMPLETED BY PROSPECTIVE EMPLOYEE
              </div>
            </div>

            <div
              className="text-[10.7px] border-x border-b border-[#333]
           px-[5px]
           pt-[5px]
           pb-[6px]"
            >
              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             min-h-[20px]
             text-[10.7px]"
              >
                <span className="whitespace-nowrap">I, (Print Name):</span>

                <input
                  value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                  className="w-full sm:flex-1 md:flex-none
               md:w-[378px]
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
                />

                <span className="ml-0 sm:ml-[8px] whitespace-nowrap">
                  <input
                    value={driver.socialsecurity}
                    className="w-full sm:flex-1 md:flex-none
                  }
              
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                  />
                </span>

                <span className="ml-0 sm:ml-[7px] whitespace-nowrap">
                  Social Security Number
                </span>
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             min-h-[20px]
             mt-2 sm:mt-0
             text-[10.7px]"
              >
                <span className="whitespace-nowrap">Date of Birth:</span>

                <input
                  value={driver.dob}
                  className="w-full sm:w-[190px]
                }
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             min-h-[26px]
             mt-2 sm:mt-0
             text-[13px] "
              >
                <span className="whitespace-nowrap text-[10.7px]">
                  Hereby authorize:
                </span>

                <input
                  className="w-full
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             "
              >
                <span className="whitespace-nowrap">Previous Employer:</span>

                <input
                  className="w-full sm:flex-1 md:flex-none
               md:w-[337px]
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />

                <span
                  className="ml-0 sm:ml-[5px]
               whitespace-nowrap"
                >
                  Email:
                </span>

                <input
                  className="w-full sm:w-[142px]
               ml-0 sm:ml-[4px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[10.7px]"
              >
                <span className="whitespace-nowrap">Street:</span>

                <input
                  className="w-full sm:flex-1 md:flex-none
               md:w-[333px]
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />

                <span
                  className="ml-0 sm:ml-[5px]
               whitespace-nowrap"
                >
                  Telephone:
                </span>

                <input
                  className="w-full sm:w-[125px]
               ml-0 sm:ml-[4px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[10.7px]"
              >
                <span className="whitespace-nowrap">City, State, Zip:</span>

                <input
                  className="w-full sm:flex-1 md:flex-none
               md:w-[340px]
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />

                <span
                  className="ml-0 sm:ml-[5px]
               whitespace-nowrap"
                >
                  Fax No.:
                </span>

                <input
                  className="w-full sm:w-[125px]
               ml-0 sm:ml-[4px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <div
                className="text-[10.7px]
             leading-[17px]
             mt-[8px] sm:mt-[3px]"
              >
                To release and forward the information requested by section 3 of
                this document concerning my Alcohol and Controlled Substances
                Testing records within the previous 3 years from
                <input
                  className="inline-block
               w-full sm:w-[174px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               align-middle
               outline-none
               mt-1 sm:mt-0"
                />
                <br />
                (employment application date)
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[10.7px]"
              >
                <span className="whitespace-nowrap">Prospective Employer:</span>

                <input
                  value={company.cname}
                  className="w-full sm:flex-1 md:flex-none
                }
               md:w-[355px]
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[10.7px]"
              >
                <span className="whitespace-nowrap">Attention:</span>

                <input
                  value={company.owner}
                  className="w-full sm:flex-1 md:flex-none
                }
               md:w-[380px]
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />

                <span
                  className="ml-0 sm:ml-[5px]
               whitespace-nowrap"
                >
                  Telephone:
                </span>

                <input
                  type="text"
                  value={company.phone}
                  className="w-full sm:w-[120px]
                }
               ml-0 sm:ml-[4px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[10.7px]"
              >
                <span className="whitespace-nowrap">To: &nbsp;Street:</span>

                <input
                  className="w-full sm:flex-1 md:flex-none
               md:w-[380px]
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[10.7px]"
              >
                <span
                  className="ml-0 sm:ml-[32px]
               whitespace-nowrap"
                >
                  City, State, Zip:
                </span>

                <input
                  className="w-full sm:w-[340px]
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <p
                className="text-[10.7px]
             leading-[16px]
             mt-[8px] sm:mt-[4px]
             mb-[5px]"
              >
                In compliance with §40.25(g) and 391.23(h), release of this
                information must be made in a written form that ensures
                confidentiality, such as fax, email, or letter.
              </p>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             text-[10.7px]"
              >
                <span className="whitespace-nowrap">
                  Prospective employer's fax number:
                </span>

                <input
                  className="w-full sm:flex-1 md:flex-none
               md:w-[315px]
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[10.7px]"
              >
                <span className="whitespace-nowrap">
                  Prospective employer's email address:
                </span>

                <input
                  value={company.email}
                  className="w-full sm:flex-1 md:flex-none
                }
               md:w-[285px]
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[10.7px]"
              >
                <span className="whitespace-nowrap">Driver Signature:</span>

                {!signatureData ? (
                  <input
                    onClick={() => setSignatureOpen(true)}
                    className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                    type="text"
                  />
                ) : (
                  <span className="border border-black">
                    {signatureData ? (
                      <img
                        className="w-full h-[40px] object-contain"
                        src={`${
                          window.location.hostname === "localhost"
                            ? "http://localhost:8000/storage/"
                            : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                        }${signatureData}`}
                        alt={signatureData}
                      />
                    ) : (
                      "No Image"
                    )}
                  </span>
                )}
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[10.7px]"
              >
                <span className="whitespace-nowrap">Date:</span>

                <input
                  type="date"
                  value={cleHDate}
                  className="w-full sm:w-[360px]
               ml-0 sm:ml-[5px]
               h-[15px] sm:h-[15px]
               border border-[#26364d]
               outline-none"
                />
              </div>

              <p
                className="text-[10.7px]
             leading-[16px]
             mt-[5px]"
              >
                This information is being requested in compliance with §40.25(g)
                and 391.23.
              </p>
            </div>

            <div
              className="border-x border-b border-[#26364d]
           bg-[#dbe4f1]
           min-h-[32px]
           flex flex-col
           md:flex-row md:items-center
           text-[12px]
           font-bold"
            >
              <div
                className="w-full md:w-[75px]
             h-[20px]
             flex items-center
             px-[5px]
             border-b md:border-b-0
             md:border-r border-[#26364d]"
              >
                PART 2:
              </div>

              <div
                className="w-full md:flex-1
             h-[20px]
             border-t md:border-t-0
             md:border-l border-[#26364d]
             flex items-center
             px-[5px]
             py-[5px] md:py-0
             whitespace-normal md:whitespace-nowrap"
              >
                TO BE COMPLETED BY PREVIOUS EMPLOYER
              </div>
            </div>

            <div
              className="border-x border-b border-[#333]
           px-[5px]
           pt-[7px]
           pb-[6px]"
            >
              <h2
                className="text-center font-bold
             text-[13.4px] 
             leading-[19px]
             mb-[4px]"
              >
                ACCIDENT HISTORY
              </h2>

              <div
                className="font-bold
             text-[10.7px]
             leading-[17px]"
              >
                The applicant named above was employed by us.
                <span className="ml-[3px]">Yes</span>
                <input
                  name="p9employedyes"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                <span className="ml-[3px]">No</span>
                <input
                  name="p9employedno"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                <br />
                Employed as
                <input
                  name="p9employedus"
                  className="w-[120px] sm:w-[160px]
               h-[15px]
               border border-[#26364d]
               align-middle
               outline-none"
                />
                from (m/y)
                <input
                  name="p9employedfromdate"
                  className="w-[65px] sm:w-[80px]
               h-[15px]
               border border-[#26364d]
               align-middle
               outline-none"
                />
                to (m/y)
                <input
                  name="p9employedtodate"
                  className="w-[65px] sm:w-[80px]
               h-[15px]
               border border-[#26364d]
               align-middle
               outline-none"
                />
                <br />
                1. Did he/she drive motor vehicle for you? Yes
                <input
                  name="p9employeddrivevehicleyes"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                No
                <input
                  name="p9employeddrivevehicleno"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                If yes, what type? Straight Truck
                <input
                  name="p9employeddrivevehicletruck"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                Tractor-Semitrailer
                <input
                  name="p9employeddrivevehiclesemitrailor"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                Bus
                <input
                  name="p9employeddrivevehiclebus"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                Cargo Tank
                <input
                  name="p9employeddrivevehictank"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                <br />
                Doubles/Triples
                <input
                  name="p9employeddrivevehicletriples"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                Other (Specify)
                <input
                  name="p9employeddrivevehicleother"
                  className="w-[90px] sm:w-[105px]
               h-[15px]
               border border-[#26364d]
               align-middle
               outline-none"
                />
                <br />
                2. Reason for leaving your employment: Discharged
                <input
                  name="p9employedleavingdischarged"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                Resignation
                <input
                  name="p9employedleavingregistration"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                Lay Off
                <input
                  name="p9employedleavinglayoff"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                Military Duty
                <input
                  name="p9employedleavingmilitaryduty"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                If there is no safety performance history to report, check here
                <input
                  name="p9employedleavingperformance"
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                sign below and return.
              </div>

              <div
                className="font-bold
             text-[10.7px]
             leading-[17px]
             mt-[3px]"
              >
                ACCIDENTS: Complete the following for any accidents included in
                your accident register (§390.15(b)) that involved the applicant
                in the 3 years prior to the application date shown above, or
                check
                <input
                  type="checkbox"
                  className="w-[10px] h-[10px] align-middle"
                />
                here if there is no accident register data for this driver.
              </div>

              <div className="w-full overflow-x-auto mt-[4px]">
                <table
                  className="w-full min-w-[600px]
               border-collapse
               border border-[#333]
               text-[12px]"
                >
                  <thead>
                    <tr className="h-[20px] text-[10.7px] text-['Carlito']">
                      <th className="border border-[#333] w-[20%]">Date</th>

                      <th className="border border-[#333] w-[20%]">Location</th>

                      <th className="border border-[#333] w-[20%]">
                        # Injuries
                      </th>

                      <th className="border border-[#333] w-[20%]">
                        # Fatalities
                      </th>

                      <th className="border border-[#333] w-[20%]">
                        Hazmat Spill
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="h-[20px]">
                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverdate1"
                          className="w-full h-[20px]
                       border border-[#26364d]
                       outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverlocation1"
                          className="w-full h-[20px]
                       border border-[#26364d]
                       outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverinjury1"
                          className="w-full h-[20px]
                       border border-[#26364d]
                       outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverfatalities1"
                          className="w-full h-[20px]
                       border border-[#26364d]
                       outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverhazmatfill1"
                          className="w-full h-[20px]
                       border border-[#26364d]
                       outline-none"
                        />
                      </td>
                    </tr>

                    <tr className="h-[20px]">
                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverdate2"
                          className="w-full h-[20px] border border-[#26364d] outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverlocation2"
                          className="w-full h-[20px] border border-[#26364d] outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverinjury2"
                          className="w-full h-[20px] border border-[#26364d] outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverfatalities2"
                          className="w-full h-[20px] border border-[#26364d] outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverhazmatfill2"
                          className="w-full h-[20px] border border-[#26364d] outline-none"
                        />
                      </td>
                    </tr>

                    <tr className="h-[20px]">
                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverdate3"
                          className="w-full h-[20px] border border-[#26364d] outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverlocation3"
                          className="w-full h-[20px] border border-[#26364d] outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverinjury3"
                          className="w-full h-[20px] border border-[#26364d] outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverfatalities3"
                          className="w-full h-[20px] border border-[#26364d] outline-none"
                        />
                      </td>

                      <td className="border border-[#333] p-[3px]">
                        <input
                          name="p9thisdriverhazmatfill3"
                          className="w-full h-[20px] border border-[#26364d] outline-none"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                className="mt-[5px] sm:mt-[5px]
             text-[10.7px]
             leading-[17px]"
              >
                Please provide information concerning any other accidents
                involving the applicant that were reported to government
                agencies or insurers or retained under internal company
                policies:
              </div>

              <div className="mt-[3px]">
                <input
                  name="p9companypolicy1"
                  className="w-full
               h-[20px] sm:h-[20px]
               border border-[#26364d]
               outline-none block"
                />

                <input
                  name="p9companypolicy2"
                  className="w-full
               h-[20px] sm:h-[20px]
               border border-[#26364d]
               outline-none block"
                />
              </div>

              <div
                className="mt-[4px]
             text-[10.7px]
             font-bold"
              >
                Any other remarks:
              </div>

              <div className="mt-[3px]">
                <input
                  name="p9remarks1"
                  className="w-full
               h-[20px] sm:h-[20px]
               border border-[#26364d]
               outline-none block"
                />

                <input
                  name="p9remarks2"
                  className="w-full
               h-[20px] sm:h-[20px]
               border border-[#26364d]
               outline-none block"
                />
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             text-[12px]
             mt-[3px]"
              >
                <span className="whitespace-nowrap">Signature:</span>

                {!signatureData ? (
                  <input
                    onClick={() => setSignatureOpen(true)}
                    className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                    type="text"
                  />
                ) : (
                  <span className="border border-black">
                    {signatureData ? (
                      <img
                        className="w-full h-[40px] object-contain"
                        src={`${
                          window.location.hostname === "localhost"
                            ? "http://localhost:8000/storage/"
                            : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                        }${signatureData}`}
                        alt={signatureData}
                      />
                    ) : (
                      "No Image"
                    )}
                  </span>
                )}
              </div>

              <div
                className="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             text-[12px]
             mt-[3px]"
              >
                <span>Title:</span>

                <input
                  name="p9title"
                  className="w-full sm:w-[180px]
               ml-0 sm:ml-[3px]
               h-[20px] sm:h-[20px]
               border border-[#26364d]
               outline-none"
                />

                <span className="ml-0 sm:ml-[8px]">Date:</span>

                <input
                  name="p9date"
                  className="w-full sm:w-[190px]
               ml-0 sm:ml-[3px]
               h-[20px] sm:h-[20px]
               border border-[#26364d]
               outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        {/*****page 10 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 10</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <h1 className="m-0 text-[21.4px] text-center font-bold leading-[1.22] tracking-[0.3px] text-[#173f69]">
                DRIVER'S ROAD TEST & PROFICIENCY EVALUATION
              </h1>

              <p className="text-center text-[12px] mt-2">
                Motor Carrier Evaluation - 49 CFR 391.31
              </p>

              <p className="text-[12px] mt-2">
                This form is designed to document both the required road-test
                elements and a detailed driver-proficiency evaluation. The
                examiner should be competent to evaluate the driver and the type
                of vehicle/equipment used for the test.
              </p>

              <section className="mt-1">
                <div
                  className="bg-[#1d3b61] text-white font-bold uppercase
               text-[13.4px] px-2 py-[7px]"
                >
                  DRIVER / CARRIER / VEHICLE INFORMATION
                </div>

                <div className="">
                  <table className="bg-gray-200 w-full table-fixed border-collapse text-[13.5px]">
                    <tbody>
                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Driver Full Name</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                              className="h-[15px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>CDL Number / State / Class</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={`${driver.currentcdllicenseno}/ ${driver.currentcdlstate}/ ${driver.currentcdlclass}`}
                              className="h-[15px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Motor Carrier Legal Name</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={company.cname}
                              className="h-[15px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>USDOT Number</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={company.dot}
                              className="h-[15px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Test Date / Start Time / End Time</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              name="p10endtime"
                              className="h-[15px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Test Location / Route</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={company.physicaladdress}
                              className="h-[15px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Power Unit Year / Make / Unit No.</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              value="Volvo"
                              name="p10powerunit"
                              className="h-[15px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Trailer Type / Unit No.</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              value="Van"
                              name="p10trailertype"
                              className="h-[15px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Transmission</b>
                          </span>
                        </td>
                        <td className="border border-[#555] text-left">
                          <div className="flex pl-2">
                            <input
                              name="p10transmissionmanual"

                              className="border border-black"
                              type="checkbox"
                            />
                            &nbsp;Manual &nbsp;
                            <input
                              name="p10transmissionautomatic"

                              className="border border-black"
                              type="checkbox"
                            />
                            &nbsp;Automatic
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Approximate Road-Test Miles</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              name="p10testmiles"
                              className="h-[15px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Weather / Road Conditions</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              name="p10roadcondition"
                              className="h-[15px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  className="bg-[#1d3b61] text-white font-bold uppercase
               text-[13.4px] px-2 py-[7px]"
                >
                  PROFICIENCY RATING SCALE
                </div>

                <p className="text-[12px]">
                  Rate each applicable item: 4 = Excellent, 3 = Satisfactory, 2
                  = Needs Improvement, 1 = Unsatisfactory, N/A = Not Applicable.
                  Any safety- critical unsatisfactory performance should be
                  explained in the remarks section.
                </p>
              </section>

              <section className="mt-1">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse border-black text-[13.5px]">
                    <thead className="bg-[#1d3b61] text-white">
                      <tr>
                        <th className="text-[9.4px] w-[110px]">
                          Evaluation Item{" "}
                        </th>
                        <th className="text-[9.4px] w-[90px]">
                          Performance Standard{" "}
                        </th>
                        <th className="text-[9.4px]">4</th>
                        <th className="text-[9.4px]">3</th>
                        <th className="text-[9.4px]">2</th>
                        <th className="text-[9.4px]">1</th>
                        <th className="text-[9.4px]">N/A</th>
                        <th className="text-[9.4px]">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Pre-trip inspection
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Vehicle condition, tires/wheels, lights, brakes,
                          leaks, emergency equipment, required documents
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10pretrip4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10pretrip3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10pretrip2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10pretrip1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10pretrip0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p10pretripcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[9.4px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Coupling / uncoupling
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Fifth wheel, kingpin, airlines/electrical, landing
                          gear, tug test, visual verification
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10coupling4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10coupling3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10coupling2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10coupling1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10coupling0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p10couplingcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Cab setup / controls
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Seat/mirrors, seat belt, gauges, warning devices,
                          controls, safe start
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10cabsetup4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10cabsetup3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10cabsetup2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10cabsetup1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10cabsetup0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p10cabsetupcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Brake system knowledge
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Air-brake checks if applicable, parking/service brake,
                          low-air warnings, proper use
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10brakesystem4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10brakesystem3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10brakesystem2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10brakesystem1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10brakesystem0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p10brakesystemcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Starting / shifting
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Smooth starts, gear selection, clutch use if
                          applicable, avoids rollback/stall
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10shifting4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10shifting3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10shifting2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10shifting1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p10shifting0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p10shiftingcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 11 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 11</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-1">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse border-black text-[13.5px]">
                    <tbody>
                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Steering / lane control
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Maintains lane, tracks turns, proper hand control,
                          avoids curb/objects
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11steeringlane4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11steeringlane3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11steeringlane2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11steeringlane1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11steeringlane0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11steeringlanecomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Intersections / right-of-way
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Scanning, controlled approach, signs/signals, right-
                          of-way decisions
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11rightofway4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11rightofway3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11rightofway2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11rightofway1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11rightofway0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11rightofwaycomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Turns
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Signal timing, lane position, off- tracking awareness,
                          clearance, speed control
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11turns4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11turns3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11turns2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11turns1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11turns0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11turnscomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Lane changes / merging
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Mirrors, signal, blind-spot awareness, spacing, smooth
                          merge
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11merging4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11merging3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11merging2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11merging1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11merging0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11mergingcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Following distance
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Maintains adequate space and adjusts for speed,
                          traffic and conditions
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11distance4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11distance3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11distance2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11distance1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11distance0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11distancecomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Speed management
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Complies with limits and conditions; controls speed on
                          grades/curves
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11speed4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11speed3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11speed2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11speed1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11speed0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11speedcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Passing / being passed
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Safe decision, clearance, mirrors, signaling, lane
                          return
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11beingpassed4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11beingpassed3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11beingpassed2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11beingpassed1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11beingpassed0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11beingpassedcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Railroad crossings
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Proper approach, observation and compliance when
                          applicable
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11railroad4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11railroad3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11railroad2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11railroad1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11railroad0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11railroadcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Braking / stopping
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Smooth, controlled stops; anticipates traffic; avoids
                          harsh braking
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11stoping4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11stoping3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11stoping2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11stoping1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11stoping0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11stopingcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Backing
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          GOAL when needed, mirror use, controlled speed, setup,
                          clearance, spotter communication
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11backing4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11backing3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11backing2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11backing1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11backing0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11backingcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Parking / securement
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Safe parking, brake application, transmission, wheel
                          position/chocks as applicable
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11securment4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11securment3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11securment2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11securment1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11securment0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11securmentcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Hazard perception
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Identifies hazards early, escape routes, construction,
                          pedestrians, cyclists
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11perception4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11perception3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11perception2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11perception1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11perception0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11perceptioncomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Defensive driving
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Space management, patience, distraction avoidance,
                          safe decision-making
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11defensive4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11defensive3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11defensive2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11defensive1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11defensive0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11defensivecomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Communication
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Signals, horn/lights when appropriate, professional
                          interaction
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11communication4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11communication3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11communication2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11communication1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11communication0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11communicationcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            ELD / HOS basic proficiency
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Can locate duty status, logs, annotations and
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11eldhos4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11eldhos3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11eldhos2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11eldhos1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p11eldhos0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p11eldhoscomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 12 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 12</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-1">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse border-black text-[13.5px]">
                    <tbody>
                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Missing_salman
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          roadside display/transfer if evaluated
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p12missingsalman4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p12missingsalman3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p12missingsalman2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p12missingsalman1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p12missingsalman0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p12missingsalmancomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>

                      <tr className="border border-[#555]">
                        <td className="border border-[#555] text-[10px] p-1 w-[110px]">
                          <div className="text-xs font-bold leading-tight">
                            Post-trip / defect reporting
                          </div>
                        </td>

                        <td className="border border-[#555] text-[9.4px] w-[110px] p-1 leading-[14px]">
                          Identifies/report defects and secures vehicle at end
                          of test
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p12defectreporting4"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p12defectreporting3"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p12defectreporting2"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p12defectreporting1"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] text-center p-1 align-middle">
                          <input
                            name="p12defectreporting0"
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border border-[#555] p-1 align-top">
                          <textarea
                            name="p12defectreportingcomment"
                            className="w-full min-w-0 h-[50px] sm:h-[50px] border border-black resize-none outline-none text-[11px] p-1"
                          ></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-1">
                <div
                  className="bg-[#1d3b61] text-white font-bold uppercase
               text-[13.4px] px-2 py-[7px]"
                >
                  SAFETY-CRITICAL OBSERVATIONS / REMARKS
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed text-[13.5px]">
                    <tbody>
                      <tr>
                        <td
                          colSpan="2"
                          className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                        >
                          <input
                            name="p12safetyremarks1"
                            className="w-full border border-black"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          colSpan="2"
                          className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                        >
                          <input
                            name="p12safetyremarks2"
                            className="w-full border border-black"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          colSpan="2"
                          className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                        >
                          <input
                            name="p12safetyremarks3"
                            className="w-full border border-black"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          colSpan="2"
                          className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                        >
                          <input
                            name="p12safetyremarks4"
                            className="w-full border border-black"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          colSpan="2"
                          className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                        >
                          <input
                            name="p12safetyremarks5"
                            className="w-full border border-black"
                            type="text"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-1">
                <div
                  className="bg-[#1d3b61] text-white font-bold uppercase
               text-[13.4px] px-2 py-[7px]"
                >
                  EXAMINER FINAL DETERMINATION
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed text-[12px]">
                    <tbody>
                      <tr>
                        <td>
                          <input
                            name="p12examinerdetermination1"
                            type="checkbox"
                          />{" "}
                          PASS - Driver demonstrated sufficient skill to safely
                          operate the vehicle/equipment tested.
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <input
                            name="p12examinerdetermination2"
                            type="checkbox"
                          />{" "}
                          PASS WITH COACHING - Driver passed; non-critical
                          coaching items are documented above.
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <input
                            name="p12examinerdetermination3"
                            type="checkbox"
                          />{" "}
                          FAIL / RETEST REQUIRED - Driver did not demonstrate
                          sufficient skill. Driver may not be assigned based on
                          this test until carrier requirements are satisfied.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-1">
                <div className="overflow-x-auto">
                  <table className="bg-gray-200 w-full table-fixed border-collapse text-[13.5px]">
                    <tbody>
                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Examiner Name</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              name="Roneel Lal"
                              value="Roneel Lal"
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Examiner Title / Organization</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={company.cname}
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Examiner Signature</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              name="Roneel Lal"
                              value="Roneel Lal"
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Date</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              className="h-[28px] w-full border border-black p-2"
                              type="date"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Driver Signature acknowledging results</b>
                          </span>
                        </td>
                        <td className=" bg-white border border-[#555]  align-middle text-left text-[11.4px]">
                          {!signatureData ? (
                            <input
                              onClick={() => setSignatureOpen(true)}
                              className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                              type="text"
                            />
                          ) : (
                            <span>
                              {signatureData ? (
                                <img
                                  className="w-full h-[40px] object-contain"
                                  src={`${
                                    window.location.hostname === "localhost"
                                      ? "http://localhost:8000/storage/"
                                      : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                  }${signatureData}`}
                                  alt={signatureData}
                                />
                              ) : (
                                "No Image"
                              )}
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Date</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={cleHDate}
                              className="h-[28px] w-full border border-black p-2"
                              type="date"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 13 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 13</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <h1 className="m-0 text-[21.4px] text-center font-bold leading-[1.22] tracking-[0.3px] text-[#173f69]">
                CERTIFICATE OF DRIVER'S ROAD TEST
              </h1>

              <p className="text-center text-[12px] mt-2">49 CFR 391.31</p>

              <p className="text-[12px] mt-2">
                Complete after the driver successfully completes the road test,
                unless the carrier relies on a permitted equivalent under the
                applicable regulation.
              </p>

              <section className="mt-1">
                <div className="overflow-x-auto">
                  <table className="bg-gray-200 w-full table-fixed border-collapse text-[13.5px]">
                    <tbody>
                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Driver Full Name</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>CDL / Operator License Number</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={driver.currentcdllicenseno}
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>State / Class / Endorsements</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={`${driver.currentcdlclass}`}
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Motor Carrier Legal Name</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={company.cname}
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>USDOT Number</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={company.dot}
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Power Unit Type</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              value="Volvo"
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Trailer(s) / Equipment Type</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              value="Van"
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Date of Road Test</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              name="p13roadtest"
                              className="h-[28px] w-full border border-black p-2"
                              type="date"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[11.4px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Approximate Miles</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[11.4px]">
                          <div className="flex items-center justify-center">
                            <input
                              name="p13miles"
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[12px]">
                  I certify that the above-named driver was given a road test
                  under my supervision on the date shown and that the driver
                  demonstrated sufficient driving skill to operate safely the
                  type of commercial motor vehicle and equipment identified
                  above, subject to the motor carrier’s qualification
                  determination and applicable Federal Motor Carrier Safety
                  Regulations.
                </p>
              </section>

              <section className="mt-1">
                <div className="overflow-x-auto">
                  <table className="bg-gray-200 w-full table-fixed border-collapse text-[13.5px]">
                    <tbody>
                      <tr>
                        <td className="border border-[#555] text-left text-[17px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Examiner Signature</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[17px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Examiner Printed Name</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={company.owner}
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[17px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Title / Organization</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={company.cname}
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[17px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Business Address</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              value={company.physicaladdress}
                              className="h-[28px] w-full border border-black p-2"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] text-left text-[17px]">
                          <span className=" px-[6px] py-[7px] align-middle text-xs">
                            <b>Date Certificate Issued</b>
                          </span>
                        </td>
                        <td className="border border-[#555]  align-middle text-left text-[17px]">
                          <div className="flex items-center justify-center">
                            <input
                              name="p13issuecertificate"
                              className="h-[28px] w-full border border-black p-2"
                              type="date"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[12px]">
                  Motor Carrier File Use: Retain the certificate or permitted
                  equivalent in the driver qualification file as applicable.
                  Provide a copy to the driver/examinee when required.
                </p>
              </section>
            </div>
          </div>
        </div>
        {/*****page 14 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 14</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <h4 className="m-0 mb-2 text-[12px] text-center font-bold leading-[1.22] tracking-[0.3px] text-black">
                THE BELOW DISCLOSURE AND AUTHORIZATION LANGUAGE IS FOR MANDATORY
                USE BY ALL ACCOUNT HOLDERS
              </h4>
              <h4 className="mb-2 text-[12px] text-center font-bold leading-[1.22] tracking-[0.3px] text-black">
                IMPORTANT DISCLOSURE
                <br />
                REGARDING BACKGROUND REPORTS FROM THE PSP Online Service
              </h4>
              <p className="text-[10.7px] mb-1">
                In connection with your application for employment with{" "}
                <input
                  className="border border-black"
                  value={company.cname}
                  type="text"
                />{" "}
                (“Prospective Employer”), Prospective Employer, its employees,
                agents or contractors may obtain one or more reports regarding
                your driving, and safety inspection history from the Federal
                Motor Carrier Safety Administration (FMCSA).
              </p>
              <p className="text-[10.7px] mb-1">
                When the application for employment is submitted in person, if
                the Prospective Employer uses any information it obtains from
                FMCSA in a decision to not hire you or to make any other adverse
                employment decision regarding you, the Prospective Employer will
                provide you with a copy of the report upon which its decision
                was based and a written summary of your rights under the Fair
                Credit Reporting Act before taking any final adverse action. If
                any final adverse action is taken against you based upon your
                driving history or safety report, the Prospective Employer will
                notify you that the action has been taken and that the action
                was based in part or in whole on this report.
              </p>
              <p className="text-[10.7px] mb-1">
                When the application for employment is submitted by mail,
                telephone, computer, or other similar means, if the Prospective
                Employer uses any information it obtains from FMCSA in a
                decision to not hire you or to make any other adverse employment
                decision regarding you, the Prospective Employer must provide
                you within three business days of taking adverse action oral,
                written or electronic notification: that adverse action has been
                taken based in whole or in part on information obtained from
                FMCSA; the name, address, and the toll free telephone number of
                FMCSA; that the FMCSA did not make the decision to take the
                adverse action and is unable to provide you the specific reasons
                why the adverse action was taken; and that you may, upon
                providing proper identification, request a free copy of the
                report and may dispute with the FMCSA the accuracy or
                completeness of any information or report. If you request a copy
                of a driver record from the Prospective Employer who procured
                the report, then, within 3 business days of receiving your
                request, together with proper identification, the Prospective
                Employer must send or provide to you a copy of your report and a
                summary of your rights under the Fair Credit Reporting Act.
              </p>
              <p className="text-[10.7px] mb-1">
                Neither the Prospective Employer nor the FMCSA contractor
                supplying the crash and safety information has the capability to
                correct any safety data that appears to be incorrect. You may
                challenge the accuracy of the data by submitting a request to
                https://dataqs.fmcsa.dot.gov. If you challenge crash or
                inspection information reported by a State, FMCSA cannot change
                or correct this data. Your request will be forwarded by the
                DataQs system to the appropriate State for adjudication.
              </p>
              <p className="text-[10.7px] mb-1">
                Any crash or inspection in which you were involved will display
                on your PSP report. Since the PSP report does not report, or
                assign, or imply fault, it will include all Commercial Motor
                Vehicle (CMV) crashes where you were a driver or co-driver and
                where those crashes were reported to FMCSA, regardless of fault.
                Similarly, all inspections, with or without violations, appear
                on the PSP report. State citations associated with Federal Motor
                Carrier Safety Regulations (FMCSR) violations that have been
                adjudicated by a court of law will also appear, and remain, on a
                PSP report.
              </p>
              <p className="text-[10.7px] mb-1">
                The Prospective Employer cannot obtain background reports from
                FMCSA without your authorization.
              </p>
              <h4 className="m-0 mb-2 text-[13.4px] text-center font-bold leading-[1.22] tracking-[0.3px] text-black">
                AUTHORIZATION
              </h4>
              <p className="text-[10.7px] mb-1">
                If you agree that the Prospective Employer may obtain such
                background reports, please read the following and sign below:
              </p>
              <p className="text-[10.7px] mb-1">
                I authorize{" "}
                <input
                  className="border border-black"
                  value={company.cname}
                  type="text"
                />{" "}
                (“Prospective Employer”) to access the FMCSA Pre-Employment
                Screening Program (PSP) system to seek information regarding my
                commercial driving safety record and information regarding my
                safety inspection history. I understand that I am authorizing
                the release of safety performance information including crash
                data from the previous five (5) years and inspection history
                from the previous three (3) years. I understand and acknowledge
                that this release of information may assist the Prospective
                Employer to make a determination regarding my suitability as an
                employee.
              </p>
              <p className="text-[10.7px] mb-1">
                I further understand that neither the Prospective Employer nor
                the FMCSA contractor supplying the crash and safety information
                has the capability to correct any safety data that appears to be
                incorrect. I understand I may challenge the accuracy of the data
                by submitting a request to https://dataqs.fmcsa.dot.gov. If I
                challenge crash or inspection information reported by a State,
                FMCSA cannot change or correct this data. I understand my
                request will be forwarded by the DataQs system to the
                appropriate State for adjudication.
              </p>
              <p className="text-[10.7px] mb-1">
                I understand that any crash or inspection in which I was
                involved will display on my PSP report. Since the PSP report
                does not report, or assign, or imply fault, I acknowledge it
                will include all CMV crashes where I was a driver or co-driver
                and where those crashes were reported to FMCSA, regardless of
                fault. Similarly, I understand all inspections, with or without
                violations, will appear on my PSP report, and State citations
                associated with FMCSR violations that have been adjudicated by a
                court of law will also appear, and remain, on my PSP report.
              </p>
              <p className="text-[10.7px] mb-1">
                I have read the above Disclosure Regarding Background Reports
                provided to me by Prospective Employer and I understand that if
                I sign this Disclosure and Authorization, Prospective Employer
                may obtain a report of my crash and inspection history. I hereby
                authorize Prospective Employer and its employees, authorized
                agents, and/or affiliates to obtain the information authorized
                above.
              </p>

              <section className="mt-1">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <tbody>
                      <tr>
                        <td>
                          Date:
                          <input
                            value={cleHDate}
                            className="border border-black"
                            type="date"
                          />
                        </td>
                        <td className="flex">
                          Signature:
                          {!signatureData ? (
                            <input
                              onClick={() => setSignatureOpen(true)}
                              className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                              type="text"
                            />
                          ) : (
                            <span className="border border-black">
                              {signatureData ? (
                                <img
                                  className="w-full h-[40px] object-contain"
                                  src={`${
                                    window.location.hostname === "localhost"
                                      ? "http://localhost:8000/storage/"
                                      : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                  }${signatureData}`}
                                  alt={signatureData}
                                />
                              ) : (
                                "No Image"
                              )}
                            </span>
                          )}
                        </td>
                      </tr>
                      <br />

                      <tr>
                        <td>
                          <input
                            className="border border-black"
                            value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                            type="text"
                          />
                          Name (Please Print)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <br />
                <p className="text-[10px] text-bold mb-2">
                  <b>
                    NOTICE: This form is made available to monthly account
                    holders by NIC on behalf of the U.S. Department of
                    Transportation, Federal Motor Carrier Safety Administration
                    (FMCSA). Account holders are required by federal law to
                    obtain an Applicant’s written or electronic consent prior to
                    accessing the Applicant’s PSP report. Further, account
                    holders are required by FMCSA to use the language contained
                    in this Disclosure and Authorization form to obtain an
                    Applicant’s consent. The language must be used in whole,
                    exactly as provided. Further, the language on this form must
                    exist as one stand- alone document. The language may NOT be
                    included with other consent forms or any other language.
                  </b>
                </p>

                <p className="text-[10px]">
                  <b>
                    NOTICE: The prospective employment concept referenced in
                    this form contemplates the definition of “employee”
                    contained at 49 C.F.R. 383.5.
                  </b>
                </p>
              </section>
            </div>
          </div>
        </div>
        {/*****page 15 start********/}
        {/*****page 17 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 15</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  26 COMPANY DRIVER SAFETY POLICIES & OPERATING PROCEDURES
                </h2>
                <p className="text-[12px] text-gray-500 mb-2">
                  <i>
                    Motor-carrier policy template - carrier-specific fields must
                    be completed before issue
                  </i>
                </p>

                <div className="mb-2 text-[14px]">
                  These policies apply to drivers while operating, possessing,
                  or being responsible for Company equipment, and supplement
                  applicable federal, state, and local law. Where a law,
                  regulation, lease, collective agreement, or written Company
                  directive imposes a stricter lawful requirement, the stricter
                  requirement controls. Nothing in this policy authorizes a
                  driver or the Company to violate the FMCSRs or other
                  applicable law.
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <tbody>
                      <tr>
                        <td>
                          <span className="text-[13.4px]">
                            Motor Carrier Legal Name:
                          </span>
                          <br />
                          <input
                            value={company.cname}
                            className="border border-black"
                            type="text"
                          />
                        </td>
                        <td>
                          <span className="text-[11px]">USDOT #:</span>
                          <input
                            value={company.dot}
                            className="border border-black"
                            type="text"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <span className="text-[13.4px]">DBA (if any):</span>
                          <br />
                          <input
                            name="p15dbaany"
                            className="border border-black"
                            type="text"
                          />
                        </td>
                        <td>
                          <span className="text-[13.4px]">
                            Policy Effective Date:{" "}
                          </span>
                          <input
                            name="p15policyeffective"
                            className="border border-black"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <span className="text-[13.4px]">
                            Safety/Compliance Contact:
                          </span>
                          <br />
                          <input
                            value="DOT COMPLIANCE SOLUTIONS LLC"
                            className="border border-black w-full"
                            type="text"
                          />
                        </td>
                        <td>
                          <span className="text-[13.4px]">
                            24-Hour Incident Contact:{" "}
                          </span>
                          <input
                            value={driver.emecontactno}
                            className="border border-black"
                            type="text"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  A. ELD & HOURS-OF-SERVICE (HOS) POLICY
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className="text-bold mb-2">
                    Drivers must comply with 49 CFR Part 395 and all applicable
                    HOS and ELD requirements. Drivers may not drive or remain on
                    duty when prohibited by applicable HOS limits, and no
                    dispatcher, manager, customer, or delivery schedule
                    authorizes a violation.
                  </p>
                  <p className=" text-bold mb-2">
                    • Log in only under your own ELD credentials and accurately
                    record all duty statuses, locations, annotations, shipping
                    information, vehicles, trailers, and other required entries.
                  </p>
                  <p className=" text-bold mb-2">
                    • Review and certify each required record of duty status as
                    complete and accurate. Respond to proposed edits truthfully;
                    never accept an edit that makes the record inaccurate.
                  </p>
                  <p className=" text-bold mb-2">
                    • Never falsify, erase, conceal, disable, unplug, bypass,
                    manipulate, or tamper with the ELD, ECM connection, GPS/data
                    source, unidentified-driving records, or supporting
                    documents.
                  </p>
                  <p className=" text-bold mb-2">
                    • Report an ELD malfunction or diagnostic issue to the
                    Company immediately and follow the required malfunction
                    procedure, including reconstruction and use of paper logs
                    when required.
                  </p>
                  <p className=" text-bold mb-2">
                    • Keep required ELD instructions, transfer instructions,
                    malfunction instructions, and required blank graph-grid logs
                    in the vehicle when applicable.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not use personal conveyance, yard move, team-driver
                    assignment, or any other special driving category to conceal
                    on-duty or driving time.
                  </p>
                  <p className=" text-bold mb-2">
                    • Submit supporting documents and requested logs promptly.
                    Never destroy or alter fuel, toll, dispatch, scale, repair,
                    trip, or other records used to verify HOS.
                  </p>
                  Company commitment: The Company will not require or permit a
                  driver to violate HOS rules and will not harass a driver
                  through ELD information or connected technology. Drivers must
                  promptly report any instruction they believe would require an
                  HOS violation.
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 18 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 16</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  B. CAMERA, DASH-CAM & SAFETY-EQUIPMENT NON-TAMPERING POLICY
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className=" text-bold mb-2">
                    Company-installed outward-facing cameras, inward-facing
                    cameras, dash cameras, telematics devices,
                    collision-avoidance systems, GPS units, ELD hardware, and
                    related safety equipment are Company safety assets. Drivers
                    may not interfere with their normal operation except as
                    specifically authorized in writing by the Company or
                    required for an emergency.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not cover, block, turn, reposition, unplug, disconnect,
                    remove, damage, disable, reset, modify, or obstruct any
                    camera, lens, microphone (where lawfully used), cable,
                    sensor, telematics unit, or recording system.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not place tape, clothing, sunshades, stickers, objects,
                    or other material over a camera or sensor.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not delete, overwrite, conceal, download, copy,
                    distribute, or attempt to access recordings unless
                    authorized by Company officials.
                  </p>
                  <p className=" text-bold mb-2">
                    • Immediately report a damaged, malfunctioning, loose,
                    obstructed, or non-operating camera or safety device.
                  </p>
                  <p className=" text-bold mb-2">
                    • Never retaliate against, threaten, or interfere with
                    personnel who review safety footage in accordance with
                    Company policy and applicable law.
                  </p>
                  Camera use and access must comply with applicable privacy,
                  notice, audio-recording, labor, and employment laws. The
                  Company should provide any jurisdiction-specific camera notice
                  or consent required where the vehicle or driver operates.
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  C. SEAT-BELT POLICY
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className=" text-bold mb-2">
                    The driver must wear a properly installed and adjusted seat
                    belt whenever operating a commercial motor vehicle and must
                    comply with all applicable seat-belt laws. The driver must
                    not move the vehicle if the driver seat belt is unavailable,
                    materially damaged, or cannot be properly secured, unless
                    movement is specifically permitted by law for repair or
                    safety purposes.
                  </p>
                  <p className=" text-bold mb-2">
                    • Seat belts must be worn correctly; disabling, defeating,
                    clipping behind the body, or otherwise bypassing the
                    restraint is prohibited.
                  </p>
                  <p className=" text-bold mb-2">
                    • Authorized passengers must use available required
                    restraints.
                  </p>
                  <p className=" text-bold mb-2">
                    • Any seat-belt defect must be reported promptly and
                    documented through the Company maintenance/defect-reporting
                    process.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  D. NO HAND-HELD DEVICE / DISTRACTED-DRIVING POLICY
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className=" text-bold mb-2">
                    Drivers are prohibited from texting or using a hand-held
                    mobile telephone while driving a CMV. Company policy also
                    prohibits holding or manually operating tablets, dispatch
                    devices, or other electronic devices while the vehicle is
                    moving or temporarily stationary in traffic, except as
                    allowed for emergency communications under applicable law.
                  </p>
                  <p className=" text-bold mb-2">
                    • Use only lawful hands-free/voice-activated functions and
                    keep the device positioned so it can be operated without
                    unsafe reaching.
                  </p>
                  <p className=" text-bold mb-2">
                    • Program navigation, ELD entries not permitted while
                    driving, messages, load information, and other manual tasks
                    only when safely parked.
                  </p>
                  <p className=" text-bold mb-2">
                    • No watching videos, social media, gaming, typing, reading
                    messages, photographing, or other distracting device use
                    while driving.
                  </p>
                  <p className=" text-bold mb-2">
                    • A dispatcher or customer request never authorizes unsafe
                    or unlawful device use. Safely park before responding when
                    manual interaction is required.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 19 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 17</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  E. VEHICLE / TRUCK ABANDONMENT & RETURN-OF-EQUIPMENT POLICY
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className=" text-bold mb-2">
                    Company equipment must not be abandoned. Upon termination,
                    resignation, removal from service, end of assignment, or
                    written Company direction, the driver must return the truck,
                    trailer, keys, fuel cards, permits, toll devices, ELD
                    equipment, documents, and other Company property to the
                    location designated by the Company.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not leave Company equipment at a residence, truck stop,
                    repair shop, tow yard, customer facility, airport, roadside
                    location, or other location without Company authorization,
                    except when an emergency makes continued operation unsafe or
                    unlawful.
                  </p>
                  <p className=" text-bold mb-2">
                    • If an emergency prevents return to the assigned location,
                    immediately contact Company management, secure the
                    equipment, provide the exact location, and follow written
                    recovery instructions.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not transfer possession, keys, fuel cards, access
                    credentials, or equipment to another person without
                    authorization.
                  </p>
                  <p className=" text-bold mb-2">
                    • Before surrendering equipment, complete the required
                    post-trip inspection, report known defects/damage, remove
                    personal belongings, and return Company records/property.
                  </p>
                  The Company may pursue lawful recovery of documented losses or
                  expenses caused by unauthorized abandonment. Any
                  reimbursement, deduction, offset, or collection will be
                  handled only to the extent permitted by applicable
                  wage-and-hour, employment, contract, and other law; this
                  policy does not authorize an unlawful payroll deduction.
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  F. PASSENGER & PET POLICY - DRIVER ONLY UNLESS WRITTEN
                  AUTHORIZATION
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className=" text-bold mb-2">
                    Company vehicles are DRIVER ONLY unless the Company provides
                    prior written authorization. No passenger, family member,
                    friend, child, trainee, team driver not assigned by the
                    Company, hitchhiker, or other person may ride in or operate
                    Company equipment without the required written
                    authorization.
                  </p>
                  <p className=" text-bold mb-2">
                    • No pets or animals are permitted in Company equipment
                    without prior written Company authorization. Service animals
                    and other legally protected accommodations will be handled
                    as required by applicable law.
                  </p>
                  <p className=" text-bold mb-2">
                    • Authorization must identify the approved passenger/pet or
                    approved category and any conditions, dates, insurance
                    requirements, or documentation required by the Company.
                  </p>
                  <p className=" text-bold mb-2">
                    • Verbal permission from a dispatcher, customer, another
                    driver, or non-authorized employee is not sufficient when
                    written approval is required.
                  </p>

                  <p className=" text-bold mb-2">
                    • The driver must ensure every authorized occupant complies
                    with safety rules, seat-belt requirements, site
                    restrictions, and Company instructions.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 20 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 18</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  G. ACCIDENT, CITATION, INSPECTION & VIOLATION IMMEDIATE-
                  REPORTING POLICY
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className=" text-bold mb-2">
                    Drivers must immediately report any crash/accident, vehicle
                    damage, cargo incident, roadside inspection,
                    citation/ticket, warning, out-of-service order, arrest
                    affecting driving duties, license action, tow, impound,
                    hazardous-material incident, or alleged safety violation
                    arising while operating or responsible for Company
                    equipment. When immediate reporting is impossible because of
                    an emergency, report as soon as safely possible.
                  </p>
                  <p className=" text-bold mb-2">
                    • For an accident: stop safely, protect the scene, call
                    911/law enforcement when required, obtain medical assistance
                    when needed, and notify the Company immediately.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not admit fault, promise payment, argue about
                    liability, or sign non-required statements for another
                    party. Cooperate with law enforcement and provide legally
                    required information.
                  </p>
                  <p className=" text-bold mb-2">
                    • Photograph/video the scene when safe and lawful, including
                    vehicle positions, damage, plates/unit numbers, road
                    conditions, traffic controls, cargo, and relevant
                    surroundings.
                  </p>
                  <p className=" text-bold mb-2">
                    • Collect other-party, witness, law-enforcement, tow, and
                    insurance information when available. Preserve
                    dash-camera/ELD data and all documents.
                  </p>
                  <p className=" text-bold mb-2">
                    • Send the Company every citation, inspection report,
                    warning, court notice, repair order, accident exchange, tow
                    document, and related record immediately.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not conceal, discard, alter, or delay reporting a
                    citation or inspection. Notify the Company of the final
                    court/agency disposition and provide supporting
                    documentation.
                  </p>
                  Responsibility for citations and costs: A driver is
                  responsible for complying with laws applicable to the driver
                  and may be responsible for driver-attributable fines,
                  penalties, or costs to the extent permitted by law and Company
                  agreement. The Company does not assume personal responsibility
                  for a driver’s unlawful conduct merely because the driver was
                  operating Company equipment. However, nothing in this policy
                  transfers a legal duty, fine, liability, insurance obligation,
                  or carrier responsibility that applicable law places on the
                  motor carrier or another party.
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  H. DAMAGE TO COMPANY / LEASED EQUIPMENT & PROPERTY
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className=" text-bold mb-2">
                    Drivers must exercise reasonable care over trucks, trailers,
                    cargo equipment, fuel cards, keys, permits, technology, and
                    other property in their possession. All damage, loss, theft,
                    misuse, or suspected mechanical failure must be reported
                    immediately.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not continue operating equipment when doing so would be
                    unsafe, unlawful, or likely to cause additional damage.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not authorize non-emergency repairs, towing, parts
                    replacement, or major expenditures beyond Company limits
                    without approval, unless immediate action is reasonably
                    necessary to protect life/property and Company contact is
                    unavailable.
                  </p>
                  <p className=" text-bold mb-2">
                    • The Company may investigate whether damage resulted from
                    normal wear, mechanical failure, third-party conduct, an
                    unavoidable event, negligence, willful misconduct,
                    unauthorized use, or violation of Company policy.
                  </p>

                  <p className=" text-bold mb-2">
                    • Where a driver is legally responsible for damage caused by
                    the driver’s negligent, intentional, unauthorized, or
                    prohibited use, the Company may seek reimbursement for
                    documented repair/recovery costs to the extent allowed by
                    applicable law and enforceable agreement.
                  </p>
                  <p className=" text-bold mb-2">
                    • No wage deduction or chargeback is automatically
                    authorized by this policy. Any deduction from wages/pay must
                    comply with applicable federal and state law and any
                    required written authorization.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 21 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 19</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  I. VEHICLE CARE, INSPECTION, MAINTENANCE & SECURITY PROCEDURES
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className=" text-bold mb-2">
                    • Conduct required pre-trip/post-trip inspections and
                    monitor the vehicle during operation. Promptly report
                    defects affecting safe operation.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not operate an out-of-service vehicle or equipment with
                    a condition that makes operation unsafe or unlawful.
                  </p>
                  <p className=" text-bold mb-2">
                    • Keep the cab, sleeper, windshield, mirrors, lights,
                    cameras, license plates, and safety equipment reasonably
                    clean and unobstructed.
                  </p>
                  <p className=" text-bold mb-2">
                    • Secure the truck, trailer, cargo, keys, fuel cards,
                    permits, and electronic devices whenever unattended. Follow
                    Company parking and high-value cargo instructions.
                  </p>
                  <p className=" text-bold mb-2">
                    • Do not make unauthorized mechanical, electrical,
                    emissions, speed-governor, ECM, camera, ELD, or
                    safety-system modifications.
                  </p>
                  <p className=" text-bold mb-2">
                    • Follow fuel, DEF, tire, fluid, preventive-maintenance,
                    roadside-repair, and approved-vendor procedures issued by
                    the Company.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  J. SAFE DRIVING & GENERAL CONDUCT
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className=" text-bold mb-2">
                    • Operate at a safe and lawful speed for traffic, weather,
                    visibility, road, grade, vehicle, and cargo conditions.
                  </p>
                  <p className=" text-bold mb-2">
                    • Maintain safe following distance and space management.
                    Avoid aggressive driving, unsafe lane changes, tailgating,
                    racing, road rage, and retaliatory driving.
                  </p>
                  <p className=" text-bold mb-2">
                    • Never operate while ill, fatigued, impaired, distracted,
                    or otherwise unable to drive safely. Notify dispatch/safety
                    when conditions prevent safe operation.
                  </p>

                  <p className=" text-bold mb-2">
                    • Obey traffic-control devices, railroad-crossing
                    requirements, size/weight restrictions, route restrictions,
                    bridge/clearance limits, and hazardous-material rules when
                    applicable.
                  </p>
                  <p className=" text-bold mb-2">
                    • No alcohol, illegal drugs, unauthorized controlled
                    substances, weapons prohibited by Company policy/law, or
                    other prohibited items in Company equipment. DOT
                    drug/alcohol requirements are addressed separately in the
                    Company DOT Drug & Alcohol Policy.
                  </p>
                  <p className=" text-bold mb-2">
                    • Follow lawful shipper/receiver rules, cargo securement
                    procedures, seal procedures, parking rules, and
                    customer-site safety requirements.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  K. POLICY VIOLATIONS, INVESTIGATION & CORRECTIVE ACTION
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className=" text-bold mb-2">
                    The Company may investigate reported or observed policy
                    violations using lawful sources such as driver statements,
                    inspection/citation records, ELD data, telematics, camera
                    footage, maintenance records, dispatch records, and other
                    relevant evidence. Corrective action may include coaching,
                    retraining, written warning, suspension from driving duties,
                    removal from a customer/account, or termination of
                    employment/contract, subject to applicable law and Company
                    policy. Regulatory reporting will be completed when
                    required.
                  </p>
                  <p className=" text-bold mb-2">
                    Nothing in these policies requires a driver to operate
                    unsafely, violate the FMCSRs, falsify records, or waive
                    rights that cannot lawfully be waived.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 22 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 20</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  27 DRIVER RECEIPT, ACKNOWLEDGMENT & AGREEMENT
                </h2>
                <p className="text-[12px] mb-2 text-gray-500">
                  <i>Company Safety Policies & Operating Procedures</i>
                </p>

                <div className="mb-2 text-[14px]">
                  I acknowledge that I received, read, and had an opportunity to
                  ask questions about the Company Driver Safety Policies &
                  Operating Procedures. I understand that compliance with
                  applicable law and Company safety rules is a condition of
                  being authorized to operate Company equipment. I agree to
                  promptly report safety events, equipment defects, accidents,
                  citations, inspections, and other matters required by these
                  policies.
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed text-[14px]">
                    <tbody>
                      <tr>
                        <td>
                          <input name="p20check1" type="checkbox" /> I received
                          and reviewed: ELD & Hours-of-Service Policy
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <input name="p20check2" type="checkbox" /> I received
                          and reviewed: Camera / Dash-Cam / Safety-Equipment
                          Non-Tampering Policy
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <input name="p20check3" type="checkbox" /> I received
                          and reviewed: Seat-Belt Policy
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <input name="p20check4" type="checkbox" /> I received
                          and reviewed: No Hand-Held Device / Distracted-Driving
                          Policy
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <input name="p20check5" type="checkbox" /> I received
                          and reviewed: Vehicle / Truck Abandonment &
                          Return-of-Equipment Policy
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <input name="p20check6" type="checkbox" /> I received
                          and reviewed: Passenger & Pet Policy
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <input name="p20check7" type="checkbox" /> I received
                          and reviewed: Accident, Citation, Inspection &
                          Violation Reporting Policy
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <input name="p20check8" type="checkbox" /> I received
                          and reviewed: Damage to Company / Leased Equipment &
                          Property Policy
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <input name="p20check9" type="checkbox" /> I received
                          and reviewed: Vehicle Care, Inspection, Maintenance &
                          Security Procedures
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <input name="p20check10" type="checkbox" /> I received
                          and reviewed: Safe Driving & General Conduct
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[14px] mb-2">
                  I understand that this acknowledgment does not create an
                  unlawful wage deduction, shift a legal duty that applicable
                  law places on the motor carrier, or waive any non-waivable
                  right. Company reimbursement or disciplinary decisions will be
                  made under applicable law and the facts of the incident.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <tbody>
                      <tr>
                        <td>
                          <span className="text-[13.4px]">
                            Driver Printed Name:
                          </span>
                          <br />
                          <input
                            value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                            className="border border-black"
                            type="text"
                          />
                        </td>
                        <td>
                          <span className="text-[13.4px]">
                            Driver ID / Unit:
                          </span>
                          <input
                            name="p20driverid"
                            className="border border-black"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <span className="text-[13.4px]">
                            Driver Signature:
                          </span>
                          <br />
                          {!signatureData ? (
                            <input
                              onClick={() => setSignatureOpen(true)}
                              className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                              type="text"
                            />
                          ) : (
                            <span>
                              {signatureData ? (
                                <img
                                  className="w-[60%] h-[40px]"
                                  src={`${
                                    window.location.hostname === "localhost"
                                      ? "http://localhost:8000/storage/"
                                      : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                  }${signatureData}`}
                                  alt={signatureData}
                                />
                              ) : (
                                "No Image"
                              )}
                            </span>
                          )}
                        </td>
                        <td>
                          <span className="text-[13.4px]">Date:</span>
                          <input
                            value={cleHDate}
                            className="border border-black"
                            type="date"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <span className="text-[13.4px]">
                            Company Representative:
                          </span>
                          <br />
                          <input
                            name="Roneel Lal"
                            value="Roneel Lal"
                            className="border border-black"
                            type="text"
                          />
                        </td>
                        <td>
                          <span className="text-[13.4px]">Title:</span>
                          <input
                            value="Owner"
                            className="border border-black"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <span className="text-[13.4px]">
                            Representative Signature:
                          </span>
                          <br />
                          <input
                            name="Roneel Lal"
                            value="Roneel Lal"
                            className="border border-black"
                            type="text"
                          />
                        </td>
                        <td>
                          <span className="text-[13.4px]">Date:</span>
                          <input
                            value={cleHDate}
                            className="border border-black"
                            type="date"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[20px] font-bold leading-[1.2] text-[#174875]">
                  EMPLOYER IMPLEMENTATION CHECKLIST
                </h2>

                <div className="mb-2 text-[13.4px]">
                  <p className=" text-bold mb-2">
                    • Complete the motor-carrier legal name, USDOT number,
                    effective date, and safety contact before issuing the
                    policy.
                  </p>
                  <p className=" text-bold mb-2">
                    • Provide any state-specific wage-deduction,
                    camera/audio-recording, privacy, passenger,
                    pet/accommodation, or employment- law addenda required for
                    the driver’s work locations.
                  </p>
                  <p className=" text-bold mb-2">
                    • Train drivers on ELD/HOS, incident reporting,
                    camera/device rules, and return-of-equipment procedures.
                  </p>
                  <p className=" text-bold mb-2">
                    • Retain the signed acknowledgment in the appropriate
                    personnel/safety file and document later policy revisions
                    and re- acknowledgments.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 23 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 21</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[18.7px] font-bold leading-[1.2] text-[#174875]">
                  28 DETAILED COMPANY DRIVER SAFETY POLICIES & PROCEDURES
                </h2>

                <div className="mb-2 text-[14px]">
                  This section expands the Company Driver Safety Policies &
                  Operating Procedures into a detailed operating manual. It is
                  intended to be adopted by the motor carrier identified below
                  and used together with the signed Driver Receipt &
                  Acknowledgment. Company-specific fields must be completed
                  before issue.
                </div>
              </section>

              <section className="mt-1">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    {" "}
                    <div>
                      <table className="bg-gray-200 w-full table-fixed text-[13.5px]">
                        <tbody>
                          <tr>
                            <td className="w-full text-left text-[12px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>Motor Carrier Legal Name</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className="w-full text-left text-[12px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>USDOT Number</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className="w-full text-left text-[12px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>Safety / Compliance Contact</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className="w-full text-left text-[12px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>24-Hour Accident / Emergency Contact</b>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                          </tr>
                          <tr>
                            <td className="mt-2 w-full text-left text-[12px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>DER / Drug & Alcohol Contact</b>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    {" "}
                    <div>
                      <table className=" w-full table-fixed text-[13.5px]">
                        <tbody>
                          <tr>
                            <td
                              colSpan="3"
                              className="  align-middle text-left text-[17px]"
                            >
                              <div className="flex items-center justify-center">
                                <input
                                  value={company.cname}
                                  className="h-[20px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  value={company.dot}
                                  className=" h-[20px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>

                            <td className=" w-full text-left text-[12px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>Effective Date:</b>
                              </span>
                            </td>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  name="p21effectivedate"
                                  className="h-[20px] w-full border border-black p-2"
                                  type="date"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              colSpan="3"
                              className="  align-middle text-left text-[17px]"
                            >
                              <div className="flex items-center justify-center">
                                <input
                                  name="p21safetycontact"
                                  className="h-[20px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              colSpan="3"
                              className="  align-middle text-left text-[17px]"
                            >
                              <div className="flex items-center justify-center">
                                <input
                                  value={driver.emecontactno}
                                  className="h-[20px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              colSpan="3"
                              className="  align-middle text-left text-[17px]"
                            >
                              <div className="flex items-center justify-center">
                                <input
                                  name="p21derdrug"
                                  className="h-[20px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-[12px]">
                <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[12.7px] leading-[1.35] text-[#173f69]">
                  IMPORTANT: These policies establish minimum Company
                  expectations. They do not authorize a driver or motor carrier
                  to violate federal, state, or local law. When a lawful rule is
                  stricter, the stricter rule controls.
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.1 ELD & HOURS-OF-SERVICE POLICY
                </h2>

                <div className="mb-2 text-[14px]">
                  <p className="text-[14px]">
                    The Company requires every driver subject to 49 CFR Part 395
                    to plan, record, and perform work within all applicable
                    hours-of-service limits. Dispatch schedules, customer
                    appointments, detention, traffic, weather, parking
                    availability, or load urgency do not authorize an HOS
                    violation.
                  </p>
                  <p className="text-[13px]">
                    • Property-carrying drivers subject to the standard rule may
                    drive a maximum of 11 hours after 10 consecutive hours off
                    duty and may not drive beyond the 14th consecutive hour
                    after coming on duty following 10 consecutive hours off
                    duty. A 30- minute non-driving interruption is required
                    after 8 cumulative hours of driving without such an
                    interruption. Applicable 60/70-hour limits, sleeper-berth
                    provisions, short-haul exceptions, adverse-driving
                    provisions, and other lawful exceptions must be used only
                    when the facts actually qualify.
                  </p>
                  <p className="text-[13px]">
                    • Log in only to the driver account assigned to you. Never
                    share ELD usernames, passwords, PINs, or credentials. Review
                    unidentified driving events and accept only driving that you
                    actually performed; annotate events that do not belong to
                    you.
                  </p>
                  <p className="text-[13px]">
                    • Accurately record driving, on-duty not driving, sleeper
                    berth, and off-duty time. Accurately enter required vehicle,
                    trailer, shipping-document, location, co-driver, and
                    annotation information.
                  </p>

                  <p className="text-[13px]">
                    • Certify required records of duty status only after
                    reviewing them. Proposed carrier edits must be accepted only
                    when they make the record accurate. Drivers must never be
                    instructed to approve an inaccurate edit.
                  </p>
                  <p className="text-[13px]">
                    • Personal conveyance and yard move may be used only when
                    authorized by Company policy and permitted by FMCSA rules.
                    They may never be used to hide driving time, reposition a
                    load for the Company, extend available hours, or avoid an
                    HOS violation.
                  </p>

                  <p className="text-[13px]">
                    • ELD tampering is prohibited. Do not disconnect power/data,
                    unplug the ECM connection, block GPS, alter device settings,
                    create false driver accounts, erase or conceal supporting
                    records, or otherwise manipulate the system.
                  </p>

                  <p className="text-[13px]">
                    • Immediately report an ELD malfunction, data diagnostic,
                    loss of power, missing driving event, transfer problem, or
                    other issue. Follow the ELD malfunction instructions,
                    reconstruct required records, and use paper logs when
                    required until the device is restored or replaced.
                  </p>

                  <p className="text-[13px]">
                    • Keep the required ELD information packet and blank
                    graph-grid logs in the CMV when applicable. Be able to
                    display and transfer records to an authorized safety
                    official using the ELD methods supported by the device.
                  </p>

                  <p className="text-[13px]">
                    • Keep fuel, toll, dispatch, scale, repair, trip,
                    bill-of-lading, and other supporting documents accurate and
                    available as required. Never destroy or alter a supporting
                    document to make a log appear compliant.
                  </p>

                  <p className="text-[13px]">
                    • If a dispatcher, customer, broker, or manager requests
                    movement that cannot lawfully be completed within available
                    hours, the driver must notify Safety/Dispatch and stop or
                    decline the movement until it can be performed legally.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 24 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 22</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.2 PRE-TRIP, POST-TRIP & EQUIPMENT INSPECTION POLICY
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    No driver may operate Company-controlled equipment until the
                    driver is satisfied that the vehicle and combination are in
                    safe operating condition. A driver may not rely solely on a
                    prior driver, shipper, customer, yard employee, maintenance
                    vendor, or another carrier to determine that equipment is
                    safe.
                  </p>{" "}
                  <p className="">
                    Before movement, the driver must conduct a systematic
                    walk-around and cab inspection appropriate to the equipment.
                    At a minimum, inspect or verify the following as applicable:
                  </p>
                  <p className="">
                    • Service brakes, parking brake, air-brake system, air
                    lines, glad hands, trailer brake connections, air pressure,
                    warning devices, and observable air leaks.
                  </p>
                  <p className="">
                    • Steering components, suspension, axles, springs, hangers,
                    torque rods, frame condition, and visible structural
                    defects.
                  </p>
                  <p className="">
                    • Tires for inflation/condition, tread, cuts/bulges, exposed
                    cord, and obvious damage; wheels/rims, hubs, lug nuts,
                    spacers, and signs of looseness or leakage.
                  </p>
                  <p className="">
                    • Headlamps, high beams, turn signals, four-way flashers,
                    brake lamps, tail lamps, marker/clearance lamps, reflectors,
                    and conspicuity markings.
                  </p>
                  <p className="">
                    • Windshield, wipers/washers, mirrors, horn, seat belt,
                    gauges, warning indicators, heater/defroster, and required
                    safety equipment.
                  </p>
                  <p className="">
                    • Fifth wheel, locking jaws, kingpin, mounting hardware,
                    release handle, platform, sliding fifth-wheel pins, pintle
                    hooks or other coupling devices; verify a proper connection
                    and perform a tug test when appropriate.
                  </p>
                  <p className="">
                    • Trailer landing gear, crossmembers, floor, roof/walls as
                    visible, doors, hinges, latches, seals, rear-impact guard,
                    mudflaps, and obvious cargo-area damage.
                  </p>
                  <p className="">
                    • Emergency equipment including required warning devices and
                    a properly secured/charged fire extinguisher.
                  </p>
                  <p className="">
                    • Fluid leaks, engine compartment concerns, fuel/DEF caps,
                    exhaust components as visible, and any condition likely to
                    cause a breakdown or unsafe operation.
                  </p>
                  <p className="">
                    • Cargo distribution and securement, straps/chains/load
                    locks where applicable, trailer doors, seal requirements,
                    and weight/axle considerations.
                  </p>
                  <p className="">
                    • License plates, registration/cab card, permits, insurance
                    documentation where carried, ELD materials, shipping
                    documents, and other required operating documents.
                  </p>
                  <p className="">
                    Defects and out-of-service conditions. Any defect that could
                    affect safe operation must be reported immediately. The
                    driver must not operate equipment placed out of service or
                    equipment with an unresolved condition that makes operation
                    unsafe or unlawful. Safety/Maintenance must determine the
                    disposition and required repair. The driver must not sign or
                    certify a repair that the driver knows was not completed.
                  </p>
                  <p className="">
                    Drop-and-hook / trailer interchange. Before accepting or
                    moving a trailer, inspect it and document material
                    pre-existing damage or defects. If the trailer is unsafe, do
                    not move it except as specifically permitted for a lawful
                    repair/safety purpose. Photograph significant pre-existing
                    damage when practicable and notify Dispatch/Safety before
                    departure.
                  </p>
                  <p className="">
                    Roadside inspection reports. Immediately transmit roadside
                    inspection reports to the Company. Defects must be reviewed
                    and corrected as required. The driver must cooperate with
                    Company instructions for repair documentation and return of
                    certified inspection reports.
                  </p>
                  <p className="">
                    Post-trip. At the end of the work period or equipment
                    assignment, inspect for new damage, tire/brake/light
                    concerns, leaks, cargo/equipment issues, and other defects.
                    Report defects before the next dispatch so repairs can be
                    scheduled. Complete any DVIR or electronic defect report
                    required for the operation.
                  </p>
                </div>
              </section>

              <section className="mt-[15.4px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.3 CAMERA, DASH-CAM & SAFETY-EQUIPMENT NON-TAMPERING POLICY
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    Forward-facing cameras, inward-facing cameras, telematics,
                    collision-warning devices, GPS, ELD hardware, sensors, and
                    other Company-installed safety systems are safety equipment.
                    Drivers must not interfere with their normal operation.
                  </p>
                  <p className="">
                    • Do not cover, block, turn, reposition, unplug, disconnect,
                    remove, damage, reset, disable, modify, obstruct, or
                    interfere with any camera, lens, sensor, cable, microphone
                    where lawfully used, telematics unit, or recording system.
                  </p>
                  <p className="">
                    • Do not place tape, clothing, paper, stickers, sunshades,
                    electronic devices, or other objects over or in front of a
                    camera or sensor.
                  </p>
                  <p className="">
                    • Do not delete, download, copy, distribute, post, or
                    attempt unauthorized access to recordings or system data.
                  </p>

                  <p className="">
                    • Report a malfunction, loose mount, damaged lens,
                    obstructed view, warning message, or other problem
                    immediately. Do not attempt repairs unless specifically
                    authorized.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 25 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 23</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="mb-2 text-[13px]">
                  <p className="">
                    • Company access and use of camera/audio information must
                    follow applicable privacy, notice, audio-recording, labor,
                    and employment laws. Required state-specific notices or
                    consents must be provided separately.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.4 SEAT-BELT & OCCUPANT-RESTRAINT POLICY
                </h2>

                <div className="mb-2 text-[13px]">
                  <p className="">
                    The driver must wear a properly installed and adjusted seat
                    belt whenever operating a CMV. Authorized occupants must use
                    required restraints. Disabling, bypassing, clipping behind
                    the body, or otherwise defeating the restraint is
                    prohibited. A material seat-belt defect must be reported
                    before operation and handled through the maintenance/defect
                    process.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.5 NO HAND-HELD DEVICE / DISTRACTED-DRIVING POLICY
                </h2>

                <div className=" text-[13px]">
                  <p className="">
                    • No texting or hand-held mobile telephone use while driving
                    a CMV. Do not hold or manually manipulate a phone, tablet,
                    dispatch unit, or other device while the vehicle is moving
                    or temporarily stopped in traffic.
                  </p>
                  <p className="">
                    • Use only lawful hands-free/voice functions that do not
                    require unsafe reaching. Program navigation, review dispatch
                    messages, enter ELD information, photograph documents, or
                    perform other manual tasks only when safely parked.
                  </p>
                  <p className="">
                    • Watching videos, social media, gaming, typing, reading
                    messages, photographing, video calling, or other distracting
                    electronic activity while driving is prohibited.
                  </p>

                  <p className="">
                    • No dispatcher, customer, or load requirement authorizes
                    unsafe device use. Park safely before responding when manual
                    interaction is necessary.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.6 TRUCK ABANDONMENT & RETURN-OF-EQUIPMENT POLICY
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    Company equipment must not be abandoned. Resignation,
                    termination, refusal of dispatch, disagreement, breakdown,
                    or the end of an assignment does not authorize the driver to
                    leave Company equipment at an unapproved location.
                  </p>

                  <p className="">
                    • Upon Company direction or separation, return the tractor,
                    trailer, keys, fuel cards, toll devices, permits, ELD
                    equipment, paperwork, and other Company property to the
                    location designated by an authorized Company official.
                  </p>
                  <p className="">
                    • Do not leave equipment at a residence, truck stop, repair
                    facility, tow yard, customer, airport, roadside location,
                    another carrier, or any other location without Company
                    authorization, except when an emergency makes continued
                    operation unsafe or unlawful.
                  </p>
                  <p className="">
                    • If an emergency prevents return, immediately notify the
                    Company, provide the exact equipment location and condition,
                    secure the unit, protect cargo/property, and follow written
                    recovery instructions.
                  </p>

                  <p className="">
                    • Do not transfer keys, credentials, fuel cards, or
                    possession to another person without authorization.
                  </p>

                  <p className="">
                    • Before surrendering equipment, perform a post-trip
                    inspection, report known damage/defects, remove personal
                    belongings, and return all Company property.
                  </p>

                  <p className="">
                    The Company may seek lawful recovery of documented losses
                    resulting from unauthorized abandonment. Any reimbursement,
                    deduction, offset, or collection must comply with applicable
                    law and enforceable agreements; this policy does not
                    authorize an unlawful wage deduction.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.7 UNAUTHORIZED PASSENGER & PET POLICY
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    Company vehicles are DRIVER ONLY unless prior written
                    authorization is issued by an authorized Company official.
                    No family member, friend, child, hitchhiker, trainee, team
                    driver not assigned by the Company, or other passenger may
                    ride in or operate Company equipment without required
                    written approval. Pets/animals are prohibited without
                    written approval, subject to legally required
                    accommodations.
                  </p>

                  <p className="">
                    Written authorization may specify the approved
                    person/animal, dates, route, insurance/document
                    requirements, and other conditions. Verbal permission from a
                    dispatcher, customer, another driver, or unauthorized
                    employee is not sufficient. Authorized occupants must comply
                    with seat-belt, site-access, and Company safety rules.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.8 ACCIDENT, CITATION, INSPECTION & VIOLATION REPORTING
                  POLICY
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    Drivers must report immediately any crash, collision, cargo
                    incident, vehicle/property damage, roadside inspection,
                    citation, warning, out-of-service order, tow/impound, arrest
                    affecting driving duties, license
                    suspension/revocation/disqualification, hazardous-material
                    incident, or alleged safety violation connected with Company
                    operations. If emergency conditions prevent immediate
                    contact, report as soon as safely possible.
                  </p>

                  <p className="">
                    • At an accident scene: stop safely; protect life and the
                    scene; call 911/law enforcement when required; request
                    medical assistance; and notify the Company immediately.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 26 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 24</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="text-[13px]">
                  <p className="">
                    • Do not leave the scene unlawfully. Do not admit fault,
                    promise payment, argue liability, or sign unnecessary
                    statements for another party. Cooperate with law enforcement
                    and provide legally required information.
                    <br />
                    • When safe and lawful, photograph/video vehicle positions,
                    damage, plates/unit numbers, traffic controls, road/weather
                    conditions, cargo, debris, skid marks, and relevant
                    surroundings.
                    <br />
                    • Collect other-party, witness, law-enforcement, tow, and
                    insurance information when available. Preserve dash-camera,
                    ELD, dispatch, and other relevant data.
                    <br />
                    • Transmit citations, inspection reports, warnings, court
                    notices, accident exchanges, tow documents, repair orders,
                    and related records to the Company immediately and provide
                    final court/agency disposition when available.
                    <br />• Follow post-accident drug/alcohol testing
                    instructions when FMCSA criteria or a separately identified
                    lawful Company- authority policy requires testing.
                  </p>

                  <p className="">
                    Responsibility. Drivers are responsible for obeying laws
                    applicable to their conduct and may be responsible for
                    driver- attributable fines, penalties, or costs to the
                    extent permitted by law and Company agreement. Nothing in
                    this policy transfers a legal duty or carrier responsibility
                    that applicable law places on the motor carrier or another
                    party.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.9 DRIVER-CAUSED DAMAGE / EQUIPMENT RESPONSIBILITY POLICY
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    Drivers must exercise reasonable care over tractors,
                    trailers, cargo equipment, keys, fuel cards, permits,
                    technology, and other property placed in their possession.
                    Damage, loss, theft, misuse, or suspected mechanical failure
                    must be reported immediately.
                  </p>

                  <p className="">
                    • Do not continue operating equipment when continued
                    operation would be unsafe, unlawful, or likely to cause
                    additional damage.
                  </p>

                  <p className="">
                    • Do not authorize non-emergency towing, major repairs,
                    parts replacement, or expenses outside Company limits
                    without approval unless immediate action is reasonably
                    necessary to protect life/property and Company contact is
                    unavailable.
                  </p>

                  <p className="">
                    • The Company may investigate whether damage resulted from
                    normal wear, mechanical failure, third-party conduct,
                    unavoidable conditions, negligence, willful misconduct,
                    unauthorized use, or a policy violation.
                  </p>

                  <p className="">
                    • If a driver is legally responsible for damage caused by
                    negligent, intentional, unauthorized, or prohibited use, the
                    Company may seek reimbursement for documented losses/repair
                    costs only to the extent allowed by applicable law and an
                    enforceable agreement.
                  </p>

                  <p className="">
                    • No payroll deduction or chargeback is automatically
                    authorized by this policy. Any deduction from wages or
                    settlement must comply with applicable law and any required
                    written authorization.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.10 VEHICLE MAINTENANCE, DEFECT & ROADSIDE-REPAIR POLICY
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    • Promptly report mechanical defects, warning lights,
                    brake/tire issues, fluid leaks, lighting defects,
                    steering/suspension concerns, coupling defects, and other
                    safety problems.
                  </p>
                  <p className="">
                    • Do not operate a vehicle that has been placed out of
                    service or that the driver knows is unsafe or unlawful to
                    operate.
                  </p>
                  <p className="">
                    • Use only Company-approved repair vendors and procedures
                    except where an emergency requires immediate protective
                    action and Company contact is unavailable.
                  </p>

                  <p className="">
                    • Do not make unauthorized ECM, emissions, speed-governor,
                    electrical, camera, ELD, telematics, or safety-system
                    modifications.
                  </p>

                  <p className="">
                    • Keep the cab, sleeper, windshield, mirrors, lights,
                    cameras, plates, and safety equipment reasonably clean and
                    unobstructed. Secure keys, fuel cards, permits, cargo, and
                    equipment when unattended.
                  </p>

                  <p className="">
                    • Follow preventive-maintenance, tire, fuel, DEF,
                    roadside-repair, and documentation instructions issued by
                    the Company.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.11 SAFE DRIVING, FATIGUE & GENERAL CONDUCT
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    • Operate at a lawful and safe speed for traffic, weather,
                    visibility, grade, road surface, vehicle condition, and
                    cargo. Posted speed is not always a safe speed.
                  </p>
                  <p className="">
                    • Maintain safe following distance and adequate space. No
                    tailgating, aggressive driving, unsafe lane changes, racing,
                    road rage, retaliatory driving, or intentionally blocking
                    other traffic.
                  </p>
                  <p className="">
                    • Never drive while ill, fatigued, impaired, distracted, or
                    otherwise unable to operate safely. Notify Dispatch/Safety
                    when conditions prevent safe operation.
                  </p>

                  <p className="">
                    • Obey traffic-control devices, railroad-crossing rules,
                    route restrictions, bridge/clearance limits, size/weight
                    restrictions, hazardous-material requirements when
                    applicable, and customer/site safety rules.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 27 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 25</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="text-[13px]">
                  <p className="">
                    • Secure cargo and doors and comply with seal/load-security
                    procedures. Stop and correct a cargo-securement issue when
                    required.
                  </p>

                  <p className="">
                    • No alcohol, illegal drugs, or other prohibited items may
                    be possessed or used contrary to Company policy or law. DOT
                    drug/alcohol requirements are governed by the separate
                    detailed policy in this packet.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[15.4px] font-bold leading-[1.2] text-[#174875]">
                  28.12 POLICY VIOLATIONS, INVESTIGATION & CORRECTIVE ACTION
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    The Company may investigate policy violations using lawful
                    evidence including driver statements, inspection/citation
                    records, ELD/telematics data, camera footage, maintenance
                    records, dispatch records, customer reports, and other
                    relevant information. Depending on severity, history, and
                    applicable law, corrective action may include coaching,
                    retraining, written warning, suspension from driving duties,
                    removal from an account, or termination of
                    employment/contract. Serious misconduct may result in
                    immediate removal from service. Regulatory reporting will be
                    completed when required.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 28 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 26</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-1">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    {" "}
                    <div>
                      <table className="bg-gray-200 w-full table-fixed text-[13.5px]">
                        <tbody>
                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>Motor Carrier / Employer</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>USDOT Number</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>Designated Employer Representative (DER)</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>DER Phone / Email</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>C/TPA</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>Medical Review Officer (MRO)</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>Primary Collection Site / Instructions</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>Effective / Revision Date</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>Driver Printed Name</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>CDL Number / State</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>Driver Signature / Date</b>
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className=" text-left text-[17px]">
                              <span className=" px-[6px] py-[7px] align-middle text-xs">
                                <b>Company / DER Representative / Date</b>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    {" "}
                    <div>
                      <table className=" w-full table-fixed text-[13.5px]">
                        <tbody>
                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  value={company.cname}
                                  className="h-[25px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  value={company.dot}
                                  className="h-[25px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  value={company.owner}
                                  className="h-[25px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  value={`${company.phone}/ ${company.email}`}
                                  className="h-[25px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  name="p26tpa"
                                  className="h-[25px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  name="p26mro"
                                  className="h-[25px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  name="p26collectionsite"
                                  className="h-[25px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  name="p26revisiondate"
                                  className="h-[25px] w-full border border-black p-2"
                                  type="date"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                                  className="h-[25px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  value={driver.currentcdllicenseno}
                                  className="h-[25px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                {!signatureData ? (
                                  <input
                                    onClick={() => setSignatureOpen(true)}
                                    className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                                    type="text"
                                  />
                                ) : (
                                  <span className="border border-black w-full">
                                    {signatureData ? (
                                      <img
                                        className="w-full h-[30px] object-contain"
                                        src={`${
                                          window.location.hostname ===
                                          "localhost"
                                            ? "http://localhost:8000/storage/"
                                            : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                        }${signatureData}`}
                                        alt={signatureData}
                                      />
                                    ) : (
                                      "No Image"
                                    )}
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="  align-middle text-left text-[17px]">
                              <div className="flex items-center justify-center">
                                <input
                                  name="p26derdatecompany"
                                  className="h-[25px] w-full border border-black p-2"
                                  type="text"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[21.4px] font-bold leading-[1.2] text-[#174875]">
                  29 DETAILED FMCSA/DOT DRUG & ALCOHOL POLICY
                </h2>
              </section>

              <section className="">
                <h2 className="mb-[8px] text-[14px] font-bold leading-[1.2] text-[#174875]">
                  49 CFR Part 382 / 49 CFR Part 40 - Motor Carrier Policy
                  Template
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    IMPORTANT CARRIER ADOPTION NOTICE: Before using this policy,
                    the adopting motor carrier must complete all
                    company-specific fields, identify its Designated Employer
                    Representative (DER) and service agents, confirm its current
                    random testing rates, and review any state/local employment
                    requirements. DOT-required testing and any company-
                    authority/non-DOT testing must be administered and
                    documented separately.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <thead>
                      <tr>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#174875] px-[6px] py-[8px] text-center align-middle text-[12.7px] font-bold text-white">
                          Motor Carrier Legal Name
                        </th>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#174875] px-[6px] py-[8px] text-center align-middle text-[12.7px] font-bold text-white">
                          USDOT Number
                        </th>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#174875] px-[6px] py-[8px] text-center align-middle text-[12.7px] font-bold text-white">
                          Effective / Revision Date
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-500 text-[12.7px]">
                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left">
                          Designated Employer Representative (DER)
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left">
                          DER Phone / Email{" "}
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left">
                          C/TPA
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                          <input
                            value={company.owner}
                            className="border border-black w-full"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                          <input
                            value={company.phone}
                            className="border border-black w-full"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                          <input
                            name="p26ctpa"
                            className="border border-black w-full"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left">
                          Medical Review Officer (MRO)
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left">
                          Primary Collection Site / Network
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left">
                          SAP Resource Contact
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                          <input
                            name="p26medicalofficer"
                            className="border border-black w-full"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                          <input
                            name="p26pnetwork"
                            className="border border-black w-full"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                          <input
                            name="p26sapcontact"
                            className="border border-black w-full"
                            type="text"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#174875]">
                  29.1 Purpose, Authority and Policy Objective
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    The Company maintains this controlled-substances and alcohol
                    program to protect drivers, coworkers, customers and the
                    motoring public and to comply with Federal Motor Carrier
                    Safety Administration (FMCSA) requirements. The federally
                    regulated portion of this program is governed principally by
                    49 CFR Part 382 and the U.S. Department of Transportation
                    (DOT) testing procedures in 49 CFR Part 40. When this policy
                    is more restrictive than the federal minimum because of a
                    separately identified Company rule, that provision will be
                    identified as Company-authority/non-DOT and will not be
                    represented as a DOT requirement.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 29 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 27</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="text-[13px]">
                  <p className="">
                    Participation in the applicable DOT/FMCSA drug and alcohol
                    testing program is a condition of performing covered safety-
                    sensitive functions for the Company. Nothing in this policy
                    alters the federal requirement that an individual with an
                    unresolved DOT drug or alcohol violation may not perform DOT
                    safety-sensitive functions.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#174875]">
                  29.2 Covered Drivers and Safety-Sensitive Functions
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    This policy applies to each driver who is required to hold a
                    commercial driver's license (CDL) or commercial learner's
                    permit (CLP) to operate a commercial motor vehicle subject
                    to Part 382, including covered full-time, part-time, casual,
                    intermittent, leased and other drivers operating at the
                    Company's direction. Coverage is determined by the
                    safety-sensitive function actually performed, not merely by
                    job title.
                  </p>

                  <p className="">
                    • Safety-sensitive time includes all time from the time a
                    driver begins work or is required to be ready to work until
                    relieved from work and all responsibility for performing
                    work, including waiting to be dispatched, inspecting or
                    servicing equipment, driving, loading/unloading or
                    supervising loading/unloading, attending a disabled vehicle,
                    and other functions within the regulatory definition.
                  </p>

                  <p className="">
                    • A manager, supervisor, mechanic, owner, or other employee
                    who is required or expected to operate a covered CMV must be
                    included when Part 382 applies to that individual.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#174875]">
                  29.3 Designated Employer Representative (DER) and Service
                  Agents
                </h2>

                <div className="text-[13px]">
                  <p className="text-[11px] text-bold mb-2">
                    The DER is the Company official authorized to receive test
                    results and other communications, make required decisions,
                    remove drivers from safety-sensitive functions, direct
                    drivers to testing, and coordinate with the C/TPA, MRO,
                    collection site, laboratory, BAT/STT, and SAP. The Company
                    may use qualified service agents, but the motor carrier
                    remains responsible for compliance with applicable DOT/FMCSA
                    requirements.
                  </p>

                  <p className="text-[11px] text-bold mb-2">
                    • Drivers must keep current contact information on file and
                    must promptly respond to lawful testing and MRO
                    communications.
                  </p>

                  <p className="text-[11px] text-bold mb-2">
                    • Only authorized Company representatives may receive or act
                    on confidential DOT testing information except as otherwise
                    permitted or required by law.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#174875]">
                  29.4 Prohibited Alcohol Conduct
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    A covered driver must not engage in conduct prohibited by
                    Part 382. The following rules apply in addition to any
                    separately identified lawful Company-authority rule:
                  </p>

                  <p className="">
                    • No alcohol use while performing safety-sensitive
                    functions.
                  </p>

                  <p className="">
                    • No alcohol use within four (4) hours before performing a
                    safety-sensitive function.
                  </p>

                  <p className="">
                    • No reporting for or remaining on duty requiring
                    safety-sensitive functions with an alcohol concentration of
                    0.04 or greater.
                  </p>

                  <p className="">
                    • A driver with an alcohol concentration of 0.02 through
                    0.039 must be removed from safety-sensitive functions for
                    the period required by FMCSA regulations; this is distinct
                    from a 0.04-or-greater DOT violation.
                  </p>

                  <p className="">
                    • No prohibited alcohol use following an accident when the
                    driver is required to remain available for FMCSA post-
                    accident testing, subject to the regulatory time limits.
                  </p>

                  <p className="">
                    • No refusal to submit to a required alcohol test or failure
                    to cooperate with the testing process.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#174875]">
                  29.5 Prohibited Controlled-Substances Conduct
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    • No reporting for duty or remaining on duty requiring
                    safety-sensitive functions when the driver uses a controlled
                    substance in a manner prohibited by Part 382 or is otherwise
                    not medically qualified to safely perform the function.
                  </p>

                  <p className="">
                    • No performance of safety-sensitive functions after a
                    verified positive DOT drug test, a DOT refusal, or another
                    unresolved DOT drug/alcohol violation until the applicable
                    return-to-duty process has been completed and the driver is
                    legally eligible to resume covered functions.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 30 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 28</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="text-[13px]">
                  <p className="">
                    • Marijuana remains prohibited under the DOT drug-testing
                    program regardless of state recreational or medical
                    marijuana laws. Drivers are responsible for understanding
                    that products marketed as hemp/CBD may create testing or
                    qualification risks; a product label or state legality does
                    not excuse a verified DOT positive result.
                  </p>

                  <p className="">
                    • Adulterating, substituting, attempting to defeat a
                    collection, possessing a device intended to interfere with a
                    collection, or otherwise engaging in conduct defined as a
                    refusal is prohibited.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#174875]">
                  29.6 Prescription and Over-the-Counter Medication
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    The Company does not instruct drivers to disclose private
                    diagnoses or medication information to dispatch unless
                    disclosure is required for safety or qualification purposes.
                    A driver remains responsible for being medically qualified
                    and able to safely perform safety-sensitive functions.
                    Prescription or over-the-counter medication must be used
                    only as directed and in a manner consistent with safe
                    performance of the driver's duties. Questions concerning a
                    drug-test result are handled through the MRO process as
                    required by Part 40.
                  </p>

                  <p className="">
                    If a medication may impair alertness, coordination,
                    judgment, reaction time, or the ability to safely operate a
                    CMV, the driver must not perform safety-sensitive functions
                    until medically cleared or otherwise legally qualified to do
                    so. The MRO may make safety-related medication disclosures
                    when Part 40 permits or requires them.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 31 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 29</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#174875]">
                  29.7 DOT Drug Testing Panel and Specimen Procedures
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    DOT drug testing is limited to the drugs/drug classes
                    authorized by Part 40, including marijuana metabolites,
                    cocaine metabolites, amphetamines, opioids, and
                    phencyclidine (PCP). DOT specimens may not be used to test
                    for additional non- DOT drugs. DOT tests and non-DOT tests
                    must remain completely separate.
                  </p>

                  <p className="">
                    DOT drug collections must use the current Federal Drug
                    Testing Custody and Control Form (CCF) and qualified
                    collection/testing personnel. Part 40 authorizes urine and
                    oral-fluid methodologies; however, the Company will use only
                    specimen types and procedures that are authorized and
                    operationally available under current DOT/HHS requirements
                    at the time of collection. Point-of-collection/instant drug
                    tests and hair tests are not DOT drug tests.
                  </p>

                  <p className="">
                    Where Part 40 requires a directly observed collection, the
                    Company and its service agents will follow the current Part
                    40 procedure. If a required collection methodology is
                    unavailable, the DER/service agent will follow the current
                    regulatory fallback procedure rather than improvising a
                    noncompliant test.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#174875]">
                  29.8 Required Testing Circumstances
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <thead>
                      <tr>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#174875] px-[6px] py-[8px] text-center align-middle text-[12.7px] font-bold text-white">
                          Testing Type
                        </th>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#174875] px-[6px] py-[8px] text-center align-middle text-[12.7px] font-bold text-white">
                          Company Procedure
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[11.7px] leading-[13px]">
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                          Pre-employment
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          A covered driver must receive the required negative
                          DOT drug- test result before first performing a
                          covered safety-sensitive function, unless a specific
                          regulatory exception applies and is documented. A
                          pre-employment alcohol test is not federally required
                          by FMCSA but may be conducted only when permitted and
                          administered consistently with applicable rules.
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-top ">
                          Random
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left">
                          Covered drivers remain in the appropriate random pool
                          and are subject to unannounced selection using a
                          scientifically valid method. Each covered driver must
                          have an equal chance of selection. Testing is spread
                          reasonably throughout the calendar year. The Company
                          will meet or exceed the FMCSA minimum annual rates in
                          effect for that calendar year rather than relying on a
                          permanently hard-coded rate in this policy.
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-top ">
                          Reasonable suspicion
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left">
                          A trained supervisor may require drug and/or alcohol
                          testing based on specific, contemporaneous,
                          articulable observations concerning appearance,
                          behavior, speech, body odors, or other regulatory
                          indicators. A hunch, rumor, or unsupported accusation
                          is not sufficient.
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-top ">
                          Post-accident
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left">
                          The DER will determine whether the accident meets
                          FMCSA post-accident testing criteria. Not every
                          accident requires a DOT post-accident test. Drivers
                          must immediately report accidents and remain available
                          when testing may be required.
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-top ">
                          Return-to-duty
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          Required after a DOT violation and completion of the
                          SAP process before the driver may resume DOT
                          safety-sensitive functions. The test must meet Part 40
                          direct-observation requirements.
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-top">
                          Follow-up
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          Required when prescribed by the SAP after return to
                          duty. Follow-up tests are unannounced, directly
                          observed, and are in addition to random and other
                          required testing.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#174875]">
                  29.9 Pre-Employment Testing and Hiring Controls
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    • The Company will identify whether the position is subject
                    to Part 382 before allowing the applicant to perform covered
                    duties.
                  </p>

                  <p className="">
                    • The Company will obtain the required negative
                    pre-employment DOT drug-test result, or document a valid
                    regulatory exception, before first safety-sensitive
                    performance.
                  </p>

                  <p className="">
                    • The Company will complete the required FMCSA Drug &
                    Alcohol Clearinghouse pre-employment query and will not use
                    a driver in a prohibited status.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 32 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 30</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="text-[13px]">
                  <p className="">
                    • A conditional job offer, orientation, paperwork, or
                    non-driving work does not authorize covered driving before
                    all applicable pre-employment requirements are satisfied.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#174875]">
                  29.10 Random Testing Program
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    Random selections will be made through the Company or its
                    C/TPA using a scientifically valid method. Once notified,
                    the driver must proceed immediately to the
                    collection/testing site as directed, allowing only the time
                    reasonably necessary to cease the safety-sensitive function
                    safely and travel to the testing location. Random alcohol
                    testing will occur only just before, during, or just after
                    the performance of safety-sensitive functions as required by
                    FMCSA.
                  </p>

                  <p className="">
                    A driver may be randomly selected more than once in a year.
                    Prior selection does not remove the driver from the pool or
                    reduce the driver's chance of future selection. The Company
                    will document selections, completed tests, missed tests and
                    legitimate reasons for any test not completed, and will
                    monitor the program throughout the year.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#174875]">
                  29.11 Reasonable-Suspicion Testing
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    Reasonable-suspicion determinations will be made by a
                    supervisor or Company official who has completed the
                    required training. Observations must be specific,
                    contemporaneous and articulable and must relate to the
                    appearance, behavior, speech or body odors of the driver, or
                    other observations recognized by the applicable rule. The
                    Company will document the basis for the determination as
                    required.
                  </p>

                  <p className="">
                    • Supervisors authorized to make reasonable-suspicion
                    determinations must receive at least 60 minutes of training
                    on alcohol misuse and at least 60 minutes on
                    controlled-substances use.
                  </p>

                  <p className="">
                    • The driver must follow the testing direction and must not
                    drive a CMV to the collection site when the Company
                    determines transportation should be provided for safety
                    reasons.
                  </p>

                  <p className="">
                    • A reasonable-suspicion test is a DOT test only when the
                    regulatory requirements are satisfied. Separate Company-
                    authority testing, if adopted, must be identified and
                    administered separately.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 33 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 31</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.12 Post-Accident Testing and Driver Availability
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    The driver must immediately report every accident/incident
                    to the Company in accordance with the accident-reporting
                    policy. The DER will determine whether FMCSA post-accident
                    testing is required based on the applicable regulatory
                    criteria, including fatalities and qualifying
                    injury/tow-away accidents associated with a moving-traffic
                    citation within the applicable time period.
                  </p>
                  <p className="">
                    • When required, alcohol testing must be attempted as soon
                    as practicable. If not completed within 2 hours, the Company
                    will document the reason for delay and continue attempts as
                    required; attempts cease after 8 hours.
                  </p>

                  <p className="">
                    • When required, controlled-substances testing must be
                    attempted as soon as practicable; attempts cease after 32
                    hours if the test cannot be completed, with required
                    documentation maintained.
                  </p>

                  <p className="">
                    • A driver subject to post-accident testing must remain
                    readily available. Leaving the scene for necessary medical
                    care, emergency assistance, or compliance with
                    law-enforcement instructions does not by itself excuse the
                    driver from promptly communicating with the Company and
                    remaining available when practicable.
                  </p>

                  <p className="">
                    • A driver who may be subject to post-accident alcohol
                    testing must not consume alcohol during the prohibited post-
                    accident period or until the required alcohol test is
                    completed, whichever occurs first under the applicable rule.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.13 Refusal to Test
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    A refusal is treated as a serious DOT violation. Refusal is
                    not limited to verbally saying “no.” Conduct may constitute
                    a refusal when Part 40 or Part 382 defines it as such.
                    Examples include, as applicable:
                  </p>

                  <p className="">
                    • Failure to appear for a required test within the
                    required/reasonable time after being directed to report.
                  </p>

                  <p className="">
                    • Failure to remain at the testing site until the testing
                    process is complete.
                  </p>

                  <p className="">
                    • Failure to provide a required specimen or sufficient
                    specimen without an adequate medical explanation established
                    through the required process.
                  </p>

                  <p className="">
                    • Failure to permit a directly observed or monitored
                    collection when required.
                  </p>

                  <p className="">
                    • Failure to undergo a required medical evaluation or second
                    collection when directed under Part 40.
                  </p>

                  <p className="">
                    • Failure to cooperate with the collection/testing process,
                    including conduct that prevents completion of the test.
                  </p>

                  <p className="">
                    • Providing a specimen verified as adulterated or
                    substituted, or admitting adulteration/substitution, when
                    Part 40 treats the conduct as a refusal.
                  </p>

                  <p className="">
                    • For alcohol testing, failure to sign the required
                    certification on the Alcohol Testing Form or failure to
                    provide breath when required, when the regulation defines
                    the conduct as a refusal.
                  </p>

                  <p className="">
                    The DER will rely on the determination of the authorized
                    collector, MRO, BAT/STT, or other responsible party as
                    specified by Part 40. The Company will not create its own
                    DOT refusal category outside the regulation.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.14 Drug Collection, Laboratory and MRO Process
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    DOT drug testing will follow the current Part 40
                    chain-of-custody and laboratory procedures. The collector
                    verifies identity, secures the collection, completes the
                    CCF, and transmits the specimen to an HHS-certified
                    laboratory as required. The laboratory conducts the
                    authorized initial/confirmatory and specimen-validity
                    testing. The MRO independently reviews laboratory results
                    before reporting a verified result to the employer.
                  </p>

                  <p className="">
                    • Drivers must cooperate with collector instructions and
                    provide accurate contact information so the MRO can reach
                    them when necessary.
                  </p>

                  <p className="">
                    • When a non-negative laboratory result requires MRO review,
                    the driver will have the opportunity provided by Part 40 to
                    present a legitimate medical explanation.
                  </p>

                  <p className="">
                    • When applicable, the driver has the Part 40 right to
                    request testing of the split specimen within the prescribed
                    time after MRO notification.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 34 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 32</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.15 Alcohol Testing Procedures and Result Consequences
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    DOT alcohol screening tests are conducted by qualified
                    personnel using approved devices and the DOT Alcohol Testing
                    Form. A screening result below 0.02 requires no action under
                    Part 40. A screening result of 0.02 or greater requires a
                    confirmation test under Part 40. For FMCSA-covered drivers,
                    a confirmed result of 0.02 through 0.039 requires temporary
                    removal from safety-sensitive functions as required by
                    §382.505; a result of 0.04 or greater is a DOT alcohol
                    violation requiring immediate removal and the return-to-duty
                    process before resumption of covered functions.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.16 Immediate Removal From Safety-Sensitive Functions
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    Upon notice of a verified positive DOT drug test, an alcohol
                    concentration of 0.04 or greater, a DOT refusal, or another
                    violation that prohibits safety-sensitive performance, the
                    Company will immediately remove the driver from DOT safety-
                    sensitive functions. The driver may not be dispatched,
                    operate a covered CMV, or perform another prohibited safety-
                    sensitive function until legally eligible to do so.
                  </p>

                  <p className="">
                    Federal removal from safety-sensitive functions is separate
                    from the Company's employment decision. Subject to
                    applicable law and Company policy, the Company may terminate
                    employment/contracting, place the driver in a non-
                    safety-sensitive status, or consider return after successful
                    completion of the federal return-to-duty process. DOT
                    regulations do not require the Company to reinstate a
                    driver.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.17 SAP Evaluation, Return-to-Duty and Follow-Up Testing
                </h2>

                <div className="text-[13px]">
                  <p className="">
                    When required, the Company will provide the driver with
                    information identifying qualified Substance Abuse
                    Professional (SAP) resources as required by Part 40. Before
                    returning to any DOT safety-sensitive function after a
                    violation, the driver must complete the SAP evaluation and
                    prescribed education/treatment process, be determined
                    eligible for return-to-duty testing, and obtain the required
                    negative drug result and/or alcohol result below 0.02 on a
                    directly observed return-to-duty test, as applicable.
                  </p>

                  <p className="">
                    The SAP establishes the follow-up testing plan. The plan
                    must include at least six unannounced directly observed
                    follow- up tests during the first 12 months of
                    safety-sensitive service and may extend for up to 60 months.
                    Follow-up testing is in addition to random testing and other
                    testing requirements. The Company will not substitute random
                    tests for SAP- prescribed follow-up tests.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 35 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 33</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.18 FMCSA Drug & Alcohol Clearinghouse
                </h2>

                <div className="mb-2">
                  <p className="text-[13px]">
                    The Company will comply with the FMCSA Commercial Driver's
                    License Drug and Alcohol Clearinghouse requirements
                    applicable to covered drivers. Clearinghouse obligations are
                    related to, but separate from, the specimen collection and
                    laboratory process.
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Pre-employment: before permitting a covered driver to
                      perform safety-sensitive functions, the Company will
                      conduct the required full Clearinghouse query. The driver
                      must provide the specific electronic consent required by
                      the Clearinghouse for a full query.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      During employment: the Company will conduct the required
                      annual query for each covered driver. When a limited query
                      is used, the Company will maintain the driver's general
                      consent as required. If a limited query indicates
                      information exists, the Company will complete the required
                      full-query process and obtain electronic consent before
                      allowing continued safety-sensitive performance as
                      required by the regulations.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      The Company will report employer-reported violations and
                      related information to the Clearinghouse when required.
                      MROs, SAPs and other authorized parties remain responsible
                      for information the regulations assign to them.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      A driver whose Clearinghouse status is “Prohibited” may
                      not perform DOT safety-sensitive functions until the
                      Clearinghouse reflects eligibility consistent with
                      completion of the return-to-duty process.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.19 Confidentiality, Records and Release of Information
                </h2>

                <div className="mb-2">
                  <p className="text-[13px]">
                    DOT drug and alcohol records are confidential and will be
                    maintained with controlled access. The Company will release
                    records only as authorized or required by Part 40, Part 382,
                    the Clearinghouse regulations, or other applicable law.
                    Drug/alcohol records will not be placed in ordinary
                    personnel files when doing so would undermine required
                    confidentiality controls.
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      The Company will maintain records for the periods required
                      by the applicable regulation and will make them available
                      to authorized DOT/FMCSA representatives when required.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      The Company will maintain the signed certificate showing
                      that the driver received the required policy and
                      educational materials.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      The Company will protect MRO, SAP, test-result and
                      Clearinghouse information from unauthorized disclosure.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.20 DOT vs. Company-Authority / Non-DOT Testing
                </h2>

                <div className="mb-2">
                  <p className="text-[13px]">
                    If the Company adopts testing beyond the federal DOT
                    minimum, those provisions must be stated in a separate
                    Company- authority/non-DOT policy or clearly labeled
                    addendum. DOT and non-DOT tests must be separate in all
                    respects. A DOT CCF or DOT Alcohol Testing Form may not be
                    used for a non-DOT test, and a DOT specimen may not be
                    tested for additional drugs not authorized by the DOT
                    program.
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span>
                      Nothing in a non-DOT program may be used to cancel,
                      change, disregard, or override a valid DOT test result.
                      Any state- law requirements affecting non-DOT testing,
                      employee discipline, privacy, medical/recreational
                      marijuana, or wage/employment practices must be reviewed
                      separately by the adopting carrier.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.21 Driver Education - Effects, Signs and Safety
                  Consequences
                </h2>

                <div className="mb-2">
                  <p className="text-[13px]">
                    The Company provides educational information so drivers
                    understand the safety consequences of alcohol misuse and
                    controlled-substances use. Alcohol and drugs can impair
                    judgment, reaction time, coordination, attention, perception
                    and decision-making. Impairment can increase the risk of
                    crashes, injuries, fatalities, cargo/property damage,
                    enforcement action, and loss of the ability to perform
                    safety-sensitive duties.
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <thead>
                      <tr>
                        <th className="text-left w-[34%] border border-[#1b3e5c] bg-[#1F355A] px-[6px] py-[8px] text-[12.7px] font-bold text-white">
                          Area
                        </th>
                        <th className="text-left w-[34%] border border-[#1b3e5c] bg-[#1F355A] px-[6px] py-[8px] text-[12.7px] font-bold text-white">
                          Examples of Potential Indicators / Consequences
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22] text-[12.7px]">
                          Physical
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[12.7px] leading-[13px]">
                          Unsteady movement, unusual fatigue, tremors, sweating,
                          bloodshot eyes, poor coordination, abnormal pupils,
                          unusual odor, or unexplained deterioration in
                          appearance.
                        </td>
                      </tr>

                      <tr>
                        <td className="text-[12.7px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          Behavioral / Speech
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[12.7px] leading-[13px]">
                          Confusion, agitation, unusual mood changes, slurred or
                          rapid speech, impaired judgment, inappropriate
                          behavior, or
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 36 start********/}
        <br />
        <div className="relative mx-auto w-full max-w-[210mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 34</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <tbody className="text-[12.7px] leading-[13px]">
                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-top "></td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          unexplained changes in reliability.
                        </td>
                      </tr>

                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                          Performance
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          Unsafe driving, repeated errors, unexplained absences,
                          declining attention, poor decision-making, preventable
                          incidents, or failure to follow procedures.
                        </td>
                      </tr>

                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                          Safety response
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          A driver who believes he or she cannot safely perform
                          a safety- sensitive function must immediately
                          stop/decline the function and contact the Company.
                          This does not excuse refusal of a required DOT test
                          after notification.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mb-2">
                    <p className="text-[13px] mb-2">
                      These examples are educational and are not a substitute
                      for the regulatory reasonable-suspicion standard or
                      medical diagnosis. Supervisors must use the required
                      training and contemporaneous observations when making a
                      reasonable- suspicion determination.
                    </p>
                  </div>
                </div>
              </section>
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.22 Driver Responsibilities
                </h2>

                <div className="mb-2">
                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Read, understand and comply with this policy and all
                      lawful testing directions.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Report immediately for testing when notified and remain at
                      the testing site until properly released.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Carry valid identification and provide the CDL
                      number/state or other identifier required by current
                      FMCSA/Part 40 procedures.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Do not use alcohol or controlled substances in a manner
                      prohibited by federal regulation or perform
                      safety-sensitive duties while impaired or not medically
                      qualified.
                    </span>
                  </p>
                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Remain available for required post-accident testing and
                      promptly communicate with the DER after an accident.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Cooperate with collectors, BATs/STTs, MROs, SAPs and other
                      qualified service agents.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Complete required Clearinghouse electronic consents and
                      respond to lawful Company compliance requests.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Immediately stop performing safety-sensitive functions if
                      notified that the driver is prohibited from doing so.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.23 Company / DER Responsibilities
                </h2>

                <div className="mb-2">
                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Maintain a compliant written policy and provide required
                      educational materials before covered testing begins.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Ensure each covered driver signs the required certificate
                      of receipt and retain the original as required.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Use qualified service agents and current DOT
                      forms/procedures; monitor C/TPA performance without
                      delegating away the carrier's compliance responsibility.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Complete required pre-employment and annual Clearinghouse
                      queries and required reporting.
                    </span>
                  </p>
                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Ensure random testing is scientifically valid,
                      unannounced, reasonably spread throughout the year, and
                      meets current FMCSA annual minimum rates.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Ensure supervisors making reasonable-suspicion
                      determinations receive the required 60 minutes alcohol +
                      60 minutes controlled-substances training.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Immediately remove prohibited drivers from DOT
                      safety-sensitive functions and provide SAP information
                      when required.
                    </span>
                  </p>

                  <p className="text-[13px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      Maintain records, confidentiality, and required
                      documentation of missed/delayed post-accident tests and
                      other compliance events.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.24 Employment / Contract Consequences
                </h2>

                <div className="mb-2">
                  <p className="text-[13px] flex items-start">
                    <span>
                      A violation of this policy may result in corrective or
                      disciplinary action, up to and including termination of
                      employment or the contractual relationship, subject to
                      applicable law and the adopting Company's written
                      policies. The Company will not describe a discretionary
                      employment consequence as though it were a mandatory DOT
                      consequence. The mandatory federal consequence of a DOT
                      violation is removal from covered safety-sensitive
                      functions until the applicable return-to- duty
                      requirements are satisfied.
                    </span>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 37 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 35</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.24 Employment / Contract Consequences
                </h2>

                <div className="mb-2">
                  <p className="text-[13px] flex items-start">
                    <span>
                      A violation of this policy may result in corrective or
                      disciplinary action, up to and including termination of
                      employment or the contractual relationship, subject to
                      applicable law and the adopting Company's written
                      policies. The Company will not describe a discretionary
                      employment consequence as though it were a mandatory DOT
                      consequence. The mandatory federal consequence of a DOT
                      violation is removal from covered safety-sensitive
                      functions until the applicable return-to- duty
                      requirements are satisfied.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.26 Certificate of Receipt and Driver Acknowledgment
                </h2>

                <div className="mb-2">
                  <p className="text-[13px] flex items-start">
                    <span>
                      I certify that I received a copy of the Company FMCSA/DOT
                      Drug & Alcohol Policy and the educational materials
                      provided under the Company's Part 382 program. I
                      understand that the policy explains the categories of
                      covered drivers, safety-sensitive functions, prohibited
                      conduct, testing circumstances and procedures, refusal
                      rules, consequences, Clearinghouse requirements,
                      SAP/return-to-duty process, and the person designated to
                      answer questions. I understand that my signature confirms
                      receipt and acknowledgment; it does not waive any rights
                      provided by law.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <thead>
                      <tr>
                        <th className="text-left w-[34%] border border-[#1b3e5c] bg-[#1F355A] px-[6px] py-[8px] text-[12.7px] font-bold text-white">
                          Driver Printed Name
                        </th>
                        <th className="text-left w-[34%] border border-[#1b3e5c] bg-[#1F355A] px-[6px] py-[8px] text-[12.7px] font-bold text-white">
                          CDL Number / State
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[12.7px]">
                          <input
                            value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                            className="border-black border w-full"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[12.7px]">
                          <input
                            value={driver.currentcdllicenseno}
                            className="border-black border w-full"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22] text-[12.7px]">
                          Driver Signature
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[12.7px]">
                          {!signatureData ? (
                            <input
                              onClick={() => setSignatureOpen(true)}
                              className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                              type="text"
                            />
                          ) : (
                            <span>
                              {signatureData ? (
                                <img
                                  className="w-full h-[30px] object-contain"
                                  src={`${
                                    window.location.hostname === "localhost"
                                      ? "http://localhost:8000/storage/"
                                      : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                  }${signatureData}`}
                                  alt={signatureData}
                                />
                              ) : (
                                "No Image"
                              )}
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td className="text-[12.7px] border border-[#555] px-[6px] py-[7px] align-top">
                          Company / DER Representative
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[12.7px]">
                          <input
                            value={company.owner}
                            className="border-black border w-full"
                            type="text"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  29.27 Carrier Adoption / Compliance Checklist
                </h2>

                <div className="mb-2">
                  <p className="text-[13.4px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      <input name="p35check1" type="checkbox" /> Carrier legal
                      name, USDOT number, effective date and DER completed.
                    </span>
                  </p>

                  <p className="text-[13.4px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      <input name="p35check2" type="checkbox" /> C/TPA, MRO,
                      collection network and SAP resource information verified.
                    </span>
                  </p>

                  <p className="text-[13.4px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      <input name="p35check3" type="checkbox" /> Current
                      calendar-year FMCSA random testing rates verified and
                      communicated to program administrator.
                    </span>
                  </p>

                  <p className="text-[13.4px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      <input name="p35check4" type="checkbox" /> Clearinghouse
                      account/roles, query plan and reporting procedures
                      verified.
                    </span>
                  </p>

                  <p className="text-[13.4px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      <input name="p35check5" type="checkbox" /> Pre-employment
                      negative-test and Clearinghouse controls integrated into
                      dispatch/hiring process.
                    </span>
                  </p>

                  <p className="text-[13.4px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      <input name="p35check6" type="checkbox" /> Supervisor
                      reasonable-suspicion training records verified.
                    </span>
                  </p>

                  <p className="text-[13.4px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      <input name="p35check7" type="checkbox" /> Post-accident
                      decision procedure and after-hours DER contact
                      established.
                    </span>
                  </p>

                  <p className="text-[13.4px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      <input name="p35check8" type="checkbox" /> DOT and any
                      Company-authority/non-DOT testing policies clearly
                      separated.
                    </span>
                  </p>

                  <p className="text-[13.4px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      <input name="p35check9" type="checkbox" /> Certificate of
                      receipt obtained from every covered driver before
                      safety-sensitive use.
                    </span>
                  </p>

                  <p className="text-[13.4px] flex items-start">
                    <span className="mr-1">•</span>
                    <span>
                      <input name="p35check10" type="checkbox" /> Policy
                      reviewed for applicable state/local employment
                      requirements and any collective bargaining obligations.
                    </span>
                  </p>

                  <p className="text-[13.4px] flex items-start">
                    <span>
                      Regulatory note: This template is intended to support
                      motor-carrier compliance administration. The adopting
                      motor carrier remains responsible for tailoring and
                      implementing its program under the regulations in effect
                      at the time of use.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  30 STATEMENT OF ON-DUTY HOURS - PRECEDING 7 DAYS
                </h2>

                <div className="mb-2">
                  <p className="text-[13.4px] flex items-start">
                    <span>
                      Complete on or before the first day the driver begins
                      covered driving when the Company requires this statement
                      to establish prior on-duty time. Include compensated work
                      for motor carriers and other employers as required by the
                      applicable HOS rules.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <table className="mt-2 w-full border-collapse text-[14px]">
                  <tbody>
                    <tr>
                      <td className="h-[25px] w-[30%] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[12px] text-[#173f69]">
                        Driver Name
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
        {/*****page 38 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 36</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <table className="mt-2 w-full border-collapse text-[14px]">
                  <tbody>
                    <tr>
                      <td className="h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] text-[12px] font-bold text-[#173f69]">
                        Date / Time Last Relieved From Duty
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          name="p36lastduty"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="mt-[12px]">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <thead>
                      <tr>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[12px] font-bold text-white">
                          Day / Date
                        </th>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[12px] font-bold text-white">
                          Total On-Duty Hours
                        </th>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[12px] font-bold text-white">
                          Employer / Work Performed
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[12px]">
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                          <div className="flex w-full items-center justify-between">
                            <div>Day 1:</div>
                            <div>
                              <input
                                name="p36day1"
                                className="border border-black"
                                type="date"
                              />
                            </div>
                          </div>
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36hours1"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36permormance1"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top l">
                          <div className="flex w-full items-center justify-between">
                            <div>Day 2:</div>
                            <div>
                              <input
                                name="p36day2"
                                className="border border-black"
                                type="date"
                              />
                            </div>
                          </div>
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36hours2"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36permormance2"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>Day 3:</div>
                            <div>
                              <input
                                name="p36day3"
                                className="border border-black"
                                type="date"
                              />
                            </div>
                          </div>
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36hours3"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36permormance3"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                          <div className="flex w-full items-center justify-between">
                            <div>Day 4:</div>
                            <div>
                              <input
                                name="p36day4"
                                className="border border-black"
                                type="date"
                              />
                            </div>
                          </div>
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36hours4"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36permormance4"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                          <div className="flex w-full items-center justify-between">
                            <div>Day 5:</div>
                            <div>
                              <input
                                name="p36day5"
                                className="border border-black"
                                type="date"
                              />
                            </div>
                          </div>
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36hours5"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36permormance5"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                          <div className="flex w-full items-center justify-between">
                            <div>Day 6:</div>
                            <div>
                              <input
                                name="p36day6"
                                className="border border-black"
                                type="date"
                              />
                            </div>
                          </div>
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36hours6"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36permormance6"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                          <div className="flex w-full items-center justify-between">
                            <div>Day 7:</div>
                            <div>
                              <input
                                name="p36day7"
                                className="border border-black"
                                type="date"
                              />
                            </div>
                          </div>
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36hours7"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                          <input
                            name="p36permormance7"
                            className="border border-3 border-black w-full h-[28px] p-2"
                            type="text"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-[12px]">
                <table className="mt-2 w-full border-collapse text-[14px]">
                  <tbody>
                    <tr>
                      <td className="h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] text-[12px] py-[5px] font-bold text-[#173f69]">
                        Total Hours - 7 Days
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          name="p36totalhours"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Driver Certification / Signature / Date
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          name="p36cerdate"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  31 DRIVER LICENSE COMPLIANCE & STATUS NOTIFICATION
                </h2>

                <div className="mb-2">
                  <p className="text-[13px] flex items-start">
                    <span>
                      The driver certifies that the current commercial driver
                      license identified below is the only license the driver
                      presently possesses, except as otherwise lawfully
                      permitted, and agrees to promptly notify the Company of
                      any suspension, revocation, cancellation,
                      disqualification, downgrade, restriction, expiration, or
                      other change affecting driving privileges. The driver must
                      also provide required notice of traffic convictions as
                      required by applicable law and Company policy.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <table className="mt-2 w-full border-collapse text-[14px]">
                  <tbody>
                    <tr>
                      <td className="h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] text-[12px] font-bold text-[#173f69]">
                        Driver Name
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px]  border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        CDL Number / State / Class
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          value={driver.currentcdllicenseno}
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px]  border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Expiration / Endorsements / Restriction
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          name="p36restriction"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Driver Signature / Date
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        {!signatureData ? (
                          <input
                            onClick={() => setSignatureOpen(true)}
                            className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                            type="text"
                          />
                        ) : (
                          <span>
                            {signatureData ? (
                              <img
                                className="w-full h-[30px] object-contain"
                                src={`${
                                  window.location.hostname === "localhost"
                                    ? "http://localhost:8000/storage/"
                                    : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                }${signatureData}`}
                                alt={signatureData}
                              />
                            ) : (
                              "No Image"
                            )}
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  32 PASSENGER AUTHORIZATION (USE ONLY WHEN COMPANY APPROVES)
                </h2>

                <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[12.7px] leading-[1.35] text-[#173f69]">
                  This form does not itself authorize a passenger. It becomes
                  effective only when signed by an authorized Company official
                  and only for the dates/conditions stated below.
                </div>
              </section>

              <section className="mt-[12px]">
                <table className="mt-2 w-full border-collapse text-[14px]">
                  <tbody>
                    <tr>
                      <td className="h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] text-[12px] font-bold text-[#173f69]">
                        Driver
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px]  border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Approved Passenger
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          name="p36approvedpassenger"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px]  border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Relationship
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          name="p36relation"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
        {/*****page 39 start********/}
        <br />
        <div className="relative mx-auto w-full max-w-[210mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 37</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <table className="mt-2 w-full border-collapse text-[14px]">
                  <tbody>
                    <tr>
                      <td className="h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] text-[12px] font-bold text-[#173f69]">
                        Authorized Dates / Trip
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          name="p37trip"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="h-[25px]  border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] text-[12px] font-bold text-[#173f69]">
                        Conditions / Required Documents
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          name="p37condition"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] text-[12px] font-bold text-[#173f69]">
                        Authorized Company Official / Date
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          name="p37authorized"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] text-[11.4px] font-bold text-[#173f69]">
                        Driver Acknowledgment / Date
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          name="p37aknowledge"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="mt-[12px]">
                <div className="mb-2">
                  <p className="text-[13px] flex items-start">
                    <span>
                      The passenger may not operate Company equipment or perform
                      Company work unless separately authorized and qualified.
                      The driver remains responsible for compliance with
                      seat-belt, site-access, and Company safety rules. Any
                      separate release/insurance language should be reviewed for
                      the applicable jurisdiction before use.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  33 PRE-TRIP / EQUIPMENT INSPECTION TRAINING ACKNOWLEDGMENT
                </h2>

                <div className="mb-2">
                  <p className="text-[13px] flex items-start">
                    <span>
                      I acknowledge that I received instruction on the Company
                      pre-trip, post-trip, defect-reporting, out-of-service,
                      trailer- interchange, roadside-inspection, and
                      equipment-care procedures. I understand that I must not
                      knowingly operate unsafe or out-of-service equipment and
                      must immediately report defects that could affect safe
                      operation.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <table className="mt-2 w-full border-collapse text-[14px]">
                  <tbody>
                    <tr>
                      <td className="h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] text-[12px] font-bold text-[#173f69]">
                        Driver Name
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Trainer / Company Representative
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          value={company.owner}
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px]  border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Equipment Type(s)
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          value="Van"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px]  border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Training Date
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          name="p37trainingdate"
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="date"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px]  border border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Driver Signature / Date
                      </td>
                      <td className="h-[25px] border border-black">
                        {!signatureData ? (
                          <input
                            onClick={() => setSignatureOpen(true)}
                            className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                            type="text"
                          />
                        ) : (
                          <span>
                            {signatureData ? (
                              <img
                                className="w-full h-[30px] object-contain"
                                src={`${
                                  window.location.hostname === "localhost"
                                    ? "http://localhost:8000/storage/"
                                    : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                }${signatureData}`}
                                alt={signatureData}
                              />
                            ) : (
                              "No Image"
                            )}
                          </span>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px]  border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Trainer Signature / Date
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="mt-[12px]">
                <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#1F355A]">
                  34 FINAL DRIVER POLICY RECEIPT & INITIALS
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <thead>
                      <tr>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[12px] font-bold text-white">
                          Policy
                        </th>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[12px] font-bold text-white">
                          Driver Initials
                        </th>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[12px] font-bold text-white">
                          Date
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[12px]">
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>ELD & Hours-of-Service</div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34section1"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34sectiondate1"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>
                              Pre-Trip/Post-Trip & Equipment Inspection{" "}
                            </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34section2"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34sectiondate2"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>Camera/Dash-Cam Non-Tampering </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34section3"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34sectiondate3"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>Seat-Belt & Occupant Restraint </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34section4"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34sectiondate4"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>No Hand-Held Device / Distracted Driving </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34section5"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34sectiondate5"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>Truck Abandonment & Return of Equipment </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34section6"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34sectiondate6"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>Unauthorized Passenger & Pet </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34section7"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34sectiondate7"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>
                              Accident/Citation/Inspection/Violation Reporting
                            </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34section8"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34sectiondate8"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>
                              Driver-Caused Damage / Equipment Responsibility
                            </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34section9"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p37part34sectiondate9"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 40 start********/}
        <br />
        <div className="relative mx-auto w-full max-w-[210mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 38</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <thead>
                      <tr>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[12px] font-bold text-white">
                          Policy
                        </th>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[12px] font-bold text-white">
                          Driver Initials
                        </th>
                        <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[12px] font-bold text-white">
                          Date
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[12px]">
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>Maintenance / Defect / Roadside Repair </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p38section1"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p38sectiondate1"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>Safe Driving / Fatigue / General Conduct </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p38section2"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p38sectiondate2"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className=" border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>FMCSA/DOT Drug & Alcohol Policy </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p38section3"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            name="p38sectiondate3"
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                          <div className="flex w-full items-center justify-between">
                            <div>
                              Clearinghouse Consent & Query Requirements
                            </div>
                          </div>
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="text"
                          />
                        </td>

                        <td className="border border-[#555] align-middle text-left ">
                          <input
                            className="border border-3 border-black w-full h-[20px] p-2"
                            type="date"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section className="mt-[12px]">
                <div className="mb-2">
                  <p className="text-[13px] flex items-start">
                    <span>
                      I acknowledge receipt of the policies identified above and
                      understand that I am responsible for following applicable
                      law and lawful Company safety procedures. I had an
                      opportunity to ask questions. I understand that policy
                      acknowledgment does not waive rights that cannot lawfully
                      be waived and does not authorize an unlawful wage
                      deduction or transfer a legal duty that belongs to the
                      motor carrier.
                    </span>
                  </p>
                </div>
              </section>

              <section className="mt-[12px]">
                <table className="mt-2 w-full border-collapse text-[14px]">
                  <tbody>
                    <tr>
                      <td className="h-[25px] border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] text-[12px] font-bold text-[#173f69]">
                        Driver Printed Name
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px]  border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Driver Signature / Date
                      </td>
                      <td className="h-[25px] border border-black">
                        {!signatureData ? (
                          <input
                            onClick={() => setSignatureOpen(true)}
                            className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                            type="text"
                          />
                        ) : (
                          <span>
                            {signatureData ? (
                              <img
                                className="w-full h-[30px] object-contain"
                                src={`${
                                  window.location.hostname === "localhost"
                                    ? "http://localhost:8000/storage/"
                                    : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                }${signatureData}`}
                                alt={signatureData}
                              />
                            ) : (
                              "No Image"
                            )}
                          </span>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-[12px] h-[25px]  border-b border-[#aebdcc] bg-gray-200 px-[7px] py-[5px] font-bold text-[#173f69]">
                        Company Representative / Date
                      </td>
                      <td className="h-[25px] border-b border-[#aebdcc]">
                        <input
                          value={company.owner}
                          className="border border-3 border-black w-full h-[28px] p-2"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section className="mt-[12px]">
                <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[12.7px] leading-[1.35] text-[#173f69]">
                  WEBSITE / CLIENT USE: Before providing this packet to a
                  motor-carrier client, complete the carrier-specific fields,
                  insert current official government forms where needed, and
                  review state-specific employment/privacy/wage/camera
                  requirements. The official PSP disclosure/authorization must
                  remain a stand-alone document and its required language must
                  not be combined with other consent language.
                </div>

                <div className="bg-[#EFF6FB] mt-[13px] px-[10px] py-[9px] text-[11.7px] leading-[1.35] text-[#173f69]">
                  <b>IMPORTANT</b> This packet is designed as an employment and
                  driver-qualification application. Form I-9 is a separate
                  post-offer employment- eligibility form and should be
                  completed at the legally appropriate time using the current
                  USCIS edition.
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 42 start********/}
        <br />
        <div className="relative mx-auto w-full max-w-[210mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 39</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  1 EMPLOYER / POSITION INFORMATION
                </div>

                <p className="text-[11.4px] mt-2 mb-2 flex items-start">
                  <span>
                    <i>
                      To be completed by the applicant unless prefilled by the
                      motor carrier.
                    </i>
                  </span>
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <tbody className="text-[10px]">
                      <tr className="border-b border-black">
                        <td className="font-bold align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              COMPANY NAME:
                            </span>
                            <input
                              value={company.cname}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">USDOT #:</span>
                            <input
                              value={company.dot}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-black">
                        <td className="font-bold align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              COMPANY ADDRESS:
                            </span>
                            <input
                              value={company.physicaladdress}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              CITY / STATE / ZIP:
                            </span>
                            <input
                              name="p39citystatezip"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-black">
                        <td className="font-bold align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              POSITION APPLIED FOR:
                            </span>
                            <input
                              value="Driver"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              APPLICATION DATE:
                            </span>
                            <input
                              value={cleHDate}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="date"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-black">
                        <td className="font-bold align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              REFERRED BY:
                            </span>
                            <input
                              value="Friend"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              DESIRED START DATE:
                            </span>
                            <input
                              value={cleHDate}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="date"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <div className="flex text-[12px]">
                    <div className=" flex items-center gap-1 mr-3">
                      <input
                        name="p39employerpositioncheck1"
                        type="checkbox"
                        className="w-[12px] h-[12px]"
                      />
                      <span>Company Driver</span>
                    </div>
                    <div className=" flex items-center gap-1 mr-3">
                      <input
                        name="p39employerpositioncheck2"
                        type="checkbox"
                        className="w-[12px] h-[12px]"
                      />
                      <span>Owner-Operator</span>
                    </div>
                    <div className=" flex items-center gap-1 mr-3">
                      <input
                        name="p39employerpositioncheck3"
                        type="checkbox"
                        className="w-[12px] h-[12px]"
                      />
                      <span>Lease Driver</span>
                    </div>
                    <div className=" flex items-center gap-1 mr-3">
                      <input
                        name="p39employerpositioncheck4"
                        type="checkbox"
                        className="w-[12px] h-[12px]"
                      />
                      <span>Local</span>
                    </div>
                    <div className=" flex items-center gap-1 mr-3">
                      <input
                        name="p39employerpositioncheck5"
                        type="checkbox"
                        className="w-[12px] h-[12px]"
                      />
                      <span>Regional</span>
                    </div>
                    <div className=" flex items-center gap-1 mr-3">
                      <input
                        name="p39employerpositioncheck6"
                        type="checkbox"
                        className="w-[12px] h-[12px]"
                      />
                      <span>OTR</span>
                    </div>
                    <div className=" flex items-center gap-1 mr-3">
                      <input
                        name="p39employerpositioncheck7"
                        type="checkbox"
                        className="w-[12px] h-[12px]"
                      />
                      <span>Team</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  2 APPLICANT INFORMATION
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <tbody className="text-[10px]">
                      <tr className="border-b border-black">
                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              FIRST NAME:
                            </span>
                            <input
                              value={driver.fname}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              MIDDLE NAME:
                            </span>
                            <input
                              value={driver.mname}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-black">
                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              LAST NAME:
                            </span>
                            <input
                              value={driver.lname}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">SUFFIX:</span>
                            <input
                              name="p39suffix"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-black">
                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              DATE OF BIRTH:
                            </span>
                            <input
                              value={driver.dob}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="date"
                            />
                          </div>
                        </td>

                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              SOCIAL SECURITY NUMBER:
                            </span>
                            <input
                              value={driver.socialsecurity}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-black">
                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              PRIMARY PHONE:
                            </span>
                            <input
                              value={driver.phone}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              ALTERNATE PHONE:
                            </span>
                            <input
                              value={driver.emecontactno}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-black">
                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">EMAIL:</span>
                            <input
                              value={driver.email}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="email"
                            />
                          </div>
                        </td>

                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              CURRENT ADDRESS:
                            </span>
                            <input
                              value={`${driver.currentstreet}, ${driver.currentcity}, ${driver.currentstate}, ${driver.currentzip}`}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-black">
                        <td
                          colSpan="2"
                          className="font-bold  align-top leading-[1.22]"
                        >
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              CITY / STATE / ZIP:
                            </span>
                            <input
                              value={` ${driver.currentcity}/ ${driver.currentstate}/ ${driver.currentzip}`}
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-black">
                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              HOW LONG AT CURRENT ADDRESS?:
                            </span>
                            <input
                              name="p39longcurrentaddress"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              PREFERRED CONTACT:
                            </span>
                            <input
                              name="p39prefferedcontact"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />

                  <div className="text-[12px] items-center gap-1 mr-3">
                    <input
                      name="p39applicantinfocheck1"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span>
                      {" "}
                      Are you legally eligible to work in the United States? Yes
                      / No
                    </span>{" "}
                    <input
                      name="p39applicantinfocheck2"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span> Are you at least 21 years of age? Yes / No</span>{" "}
                    <input
                      name="p39applicantinfocheck3"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span> Do you have a TWIC card? Yes / No</span>{" "}
                    <input
                      name="p39applicantinfocheck4"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span> Do you have a passport? Yes / No</span>{" "}
                    <input
                      name="p39applicantinfocheck5"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span>
                      {" "}
                      Have you previously worked for this company? Yes / No
                    </span>
                  </div>

                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <tbody className="text-[10px]">
                      <tr className="border-b border-black">
                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              IF PREVIOUSLY EMPLOYED, WHEN?:
                            </span>
                            <input
                              name="p39employedwhen"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold  align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              EMPLOYEE / DRIVER ID (IF KNOWN):
                            </span>
                            <input
                              name="p39employeddriverid"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-[20px]">
                <div className="text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  3 RESIDENCE HISTORY - PREVIOUS 3 YEARS
                </div>

                <p className="text-[11.4px] mt-2 mb-2 flex items-start">
                  <span>
                    <i>
                      List enough prior residences to cover the full three years
                      immediately preceding this application if your current
                      residence is less than three years.
                    </i>
                  </span>
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[13.5px]">
                    <tbody>
                      <p className="text-[11.4px] mb-2 items-start font-bold">
                        <span>PRIOR RESIDENCE 1</span>
                      </p>
                      <tr className="border-b border-black">
                        <td className="font-bold text-[10px] align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              STREET ADDRESS:
                            </span>
                            <input
                              name="p39residenthisstreet"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold text-[10px] align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">CITY:</span>
                            <input
                              name="p39residenthiscity"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold text-[10px] align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              STATE / PROVINCE:
                            </span>
                            <input
                              name="p39residenthisstate"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-black">
                        <td className="font-bold text-[10px] align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">
                              ZIP / POSTAL CODE:
                            </span>
                            <input
                              name="p39residenthiszipcode"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>

                        <td className="font-bold text-[10px] align-top leading-[1.22]">
                          <div className="flex items-center w-full">
                            <span className="whitespace-nowrap">COUNTRY:</span>
                            <input
                              name="p39residenthiscountry"
                              className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                              type="text"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 43 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 40</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  4 DRIVER LICENSE / PERMIT HISTORY
                </div>

                <p className="text-[11.4px] mt-2 mb-2 flex items-start">
                  <span>
                    <i>
                      List every motor vehicle operator license or permit held
                      during the preceding 3 years. Enter your name exactly as
                      shown on the license.
                    </i>
                  </span>
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-[10px]">
                    <thead className="border bg-[#1F355A] text-white border-black">
                      <tr>
                        <th>State</th>
                        <th>License / Permit Number </th>
                        <th>Class</th>
                        <th>Endorsements</th>
                        <th>Issued</th>
                        <th>Expires</th>
                        <th>Restrictions</th>
                      </tr>
                    </thead>
                    <tbody className="h-[60px]">
                      <tr className="border border-black">
                        <td className="border border-black font-bold text-[10px] align-top leading-[1.22]">
                          <input
                            type="text"
                            className="border border-black w-[90%]"
                            name="p40permithistorystate"
                          />
                        </td>
                        <td className="border border-black font-bold text-[10px] align-top leading-[1.22]">
                          <input
                            type="text"
                            className="border border-black w-[90%]"
                            name="p40permithistorynumber"
                          />
                        </td>
                        <td className="border border-black font-bold text-[10px] align-top leading-[1.22]">
                          <input
                            type="text"
                            className="border border-black w-[90%]"
                            name="p40permithistoryclass"
                          />
                        </td>
                        <td className="border border-black font-bold text-[10px] align-top leading-[1.22]">
                          <input
                            type="text"
                            className="border border-black w-[90%]"
                            name="p40permithistoryendor"
                          />
                        </td>
                        <td className="border border-black font-bold text-[10px] align-top leading-[1.22]">
                          <input
                            type="text"
                            className="border border-black w-[90%]"
                            name="p40permithistoryissued"
                          />
                        </td>
                        <td className="border border-black font-bold text-[10px] align-top leading-[1.22]">
                          <input
                            type="text"
                            className="border border-black w-[90%]"
                            name="p40permithistoryexpires"
                          />
                        </td>
                        <td className="border border-black font-bold text-[10px] align-top leading-[1.22]">
                          <input
                            type="text"
                            className="border border-black w-[90%]"
                            name="p40permithistoryrestriction"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />

                  <div className="text-[12px] items-center gap-1 mr-3">
                    <input
                      name="p40permihischeck1"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span>Is your current license a CDL? Yes / No</span>

                    <span> CDL State:</span>
                    <input
                      type="text"
                      name="p40permihischeck2"
                      className="border border-black w-[150px] h-[12px]"
                    />
                    <span> CDL Number: </span>
                    <input
                      type="text"
                      name="p40permihischeck3"
                      className="border border-black w-[150px] h-[12px]"
                    />
                    <span> Issue Date: </span>
                    <input
                      type="text"
                      name="p40permihischeck4"
                      className="border border-black w-[150px] h-[12px]"
                    />
                    <span> Expiry Date: </span>
                    <input
                      type="text"
                      name="p40permihischeck5"
                      className="border border-black w-[150px] h-[12px]"
                    />
                  </div>

                  <div className="text-[12px] items-center gap-2 mr-3">
                    <input
                      name="p40permihischeck6"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span className="mr-2">Current CDL</span>

                    <input
                      name="p40permihischeck7"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span className="mr-2">Class A</span>

                    <input
                      name="p40permihischeck8"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span className="mr-2">Class B</span>

                    <input
                      name="p40permihischeck9"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span className="mr-2">Class C</span>

                    <input
                      name="p40permihischeck10"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span className="mr-2">CLP</span>
                  </div>

                  <div className="text-[12px] items-center gap-2 mr-3">
                    <input
                      name="p40permihischeck11"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span className="mr-2">Endorsements: H</span>

                    <input
                      name="p40permihischeck12"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span className="mr-2">N</span>

                    <input
                      name="p40permihischeck13"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span className="mr-2">P</span>

                    <input
                      name="p40permihischeck14"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span className="mr-2">S</span>

                    <input
                      name="p40permihischeck15"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span className="mr-2">T</span>

                    <input
                      name="p40permihischeck16"
                      type="checkbox"
                      className="w-[12px] h-[12px]"
                    />
                    <span className="mr-2">X</span>

                    <span> Other: </span>
                    <input
                      type="text"
                      name="p40permihischeck17"
                      className="border border-black w-[75px] h-[12px]"
                    />
                  </div>
                </div>
              </section>

              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  5 LICENSE DENIALS, SUSPENSIONS & REVOCATIONS
                </div>

                <div className="text-[12px] items-center gap-2 mr-3">
                  <input
                    name="p40licensedeniedcheck1"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="mr-2">
                    Have you ever been denied a license, permit, or privilege to
                    operate a motor vehicle? Yes / No
                  </span>
                </div>

                <div className="text-[12px] items-center gap-2 mr-3">
                  <input
                    name="p40licensedeniedcheck2"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="mr-2">
                    Has any license, permit, or driving privilege ever been
                    suspended or revoked? Yes / No
                  </span>
                </div>

                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <span className="mr-2 font-bold text-[10px]">
                    If YES to either question, explain the date, state, reason,
                    circumstances, and final disposition:
                  </span>
                </div>

                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p40licensedeniedexplain1"
                    type="text"
                    className="border border-black w-[60%] h-[12px]"
                  />
                </div>
                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p40licensedeniedexplain2"
                    type="text"
                    className="border border-black w-[60%] h-[12px]"
                  />
                </div>
                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p40licensedeniedexplain3"
                    type="text"
                    className="border border-black w-[60%] h-[12px]"
                  />
                </div>
                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p40licensedeniedexplain4"
                    type="text"
                    className="border border-black w-[60%] h-[12px]"
                  />
                </div>
              </section>

              <section className="mt-[10px]">
                <div className="mb-3 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  6 MEDICAL QUALIFICATION & CREDENTIALS
                </div>

                <table className="w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[9.4px] w-[37%] align-top leading-[1.22]">
                        <div className=" items-center w-full">
                          MEDICAL EXAMINER CERTIFICATE EXPIRATION:
                          <br />
                          <span className="text-gray-400 text-[12px]">
                            MM/DD/YYYY
                          </span>
                        </div>
                      </td>

                      <td className="font-bold text-[9.4px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <input
                            name="p40certificateexpiration"
                            className="w-full border border-black h-[20px]"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[9.4px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            TWIC EXPIRATION:
                          </span>
                          <input
                            name="p40twicecertificateexpiration"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                            placeholder="MM/DD/YYYY or N/A "
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[9.4px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            PASSPORT EXPIRATION:
                          </span>
                          <input
                            name="p40passportexpiration"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                            placeholder="MM/DD/YYYY or N/A "
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <div className="text-[12px] items-center gap-2 mr-3">
                  <input
                    name="p40linkedtocdlcheck"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="mr-2">
                    Medical certificate is electronically linked to CDL / MVR,
                    if applicable: Yes / No / N/A
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 44 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 41</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  7 COMMERCIAL DRIVING EXPERIENCE
                </div>

                <p className="text-[11.4px] mt-2 mb-2 flex items-start text-gray-500">
                  <span>
                    <i>
                      For each equipment type, show total experience,
                      approximate dates, and approximate miles.
                    </i>
                  </span>
                </p>

                <div className="w-full overflow-x-auto rounded-sm">
                  <table className="w-full min-w-[900px] table-fixed border-collapse text-[10px]">
                    <thead className="border border-black bg-[#1F355A] text-white">
                      <tr>
                        <th className="w-[18%] border border-black px-2 py-2 text-left">
                          Equipment Type
                        </th>

                        <th className="w-[10%] border border-black px-2 py-2 text-center">
                          Yes/No
                        </th>

                        <th className="w-[14%] border border-black px-2 py-2 text-center">
                          From
                        </th>

                        <th className="w-[14%] border border-black px-2 py-2 text-center">
                          To
                        </th>

                        <th className="w-[16%] border border-black px-2 py-2 text-center">
                          Approx. Miles
                        </th>

                        <th className="w-[28%] border border-black px-2 py-2 text-left">
                          Description / Size
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[11px]">
                      {[
                        "Straight Truck",
                        "Truck-Tractor",
                        "Semi-Trailer",
                        "Doubles / Triples",
                        "Flatbed",
                        "Tank Vehicle",
                        "Bus / Passenger",
                        "Reefer",
                        "Dry Van",
                        "Other",
                      ].map((equipment, index) => (
                        <tr key={equipment}>
                          <td className="border border-black px-2 py-2 font-bold whitespace-nowrap">
                            {equipment}
                          </td>

                          <td className="border border-black px-2 py-2">
                            <select
                              name={`p41_${index}_status`}
                              className="w-full min-w-[65px] rounded-none border border-black bg-white px-1 py-1 text-[11px] outline-none focus:border-[#1F355A]"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>

                          <td className="border border-black px-2 py-2">
                            <input
                              name={`p41_${index}_from`}
                              className="w-full rounded-none border border-black bg-white px-1 py-1 text-[11px] outline-none focus:border-[#1F355A]"
                              type="date"
                            />
                          </td>

                          <td className="border border-black px-2 py-2">
                            <input
                              name={`p41_${index}_to`}
                              className="w-full rounded-none border border-black bg-white px-1 py-1 text-[11px] outline-none focus:border-[#1F355A]"
                              type="date"
                            />
                          </td>

                          <td className="border border-black px-2 py-2">
                            <input
                              name={`p41_${index}_miles`}
                              className="w-[90%] rounded-none border border-black bg-white px-1 py-1 text-[11px] outline-none focus:border-[#1F355A]"
                              type="text"
                            />
                          </td>

                          <td className="border border-black px-2 py-2">
                            <input
                              name={`p41_${index}_description`}
                              className="w-full rounded-none border border-black bg-white px-1 py-1 text-[11px] outline-none focus:border-[#1F355A]"
                              type="text"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  8 ACCIDENT / CRASH HISTORY - PREVIOUS 3 YEARS
                </div>

                <p className="text-[11.4px] mt-2 mb-2 flex items-start text-gray-500">
                  <span>
                    <i>
                      List all motor vehicle accidents/crashes during the
                      preceding 3 years. Include preventable and non-preventable
                      events, whether or not cited.
                    </i>
                  </span>
                </p>

                <table className="w-full table-fixed text-[9.4px]">
                  <thead className="border bg-[#1F355A] text-white border-black">
                    <tr>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Nature of Accident</th>
                      <th>Fatalities</th>
                      <th>Injuries</th>
                      <th>Hazmat Spill</th>
                      <th>Preventable?</th>
                    </tr>
                  </thead>
                  <tbody className="h-[60px]"></tbody>
                </table>
                <br />
                <div className="text-[12px] items-center gap-2 mr-3">
                  <input
                    name="p41nocrashcheck"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="ml-1 mr-2">
                    No accidents/crashes during the previous 3 years
                  </span>

                  <input
                    name="p41yescrashcheck"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="ml-1 mr-2">
                    Yes — accidents/crashes in the previous 3 years
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 45 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 42</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  9 TRAFFIC CONVICTIONS / FORFEITURES - PREVIOUS 3 YEARS
                </div>

                <p className="text-[11.4px] mt-2 mb-2 flex items-start text-gray-500">
                  <span>
                    <i>
                      List all motor vehicle traffic convictions and forfeitures
                      during the preceding 3 years, other than parking
                      violations.
                    </i>
                  </span>
                </p>

                <table className="w-full table-fixed text-[9.4px]">
                  <thead className="border bg-[#1F355A] text-white border-black">
                    <tr>
                      <th>Date</th>
                      <th>State</th>
                      <th>Violation / Offense</th>
                      <th>Location</th>
                      <th>Vehicle Type </th>
                      <th>Penalty / Disposition</th>
                    </tr>
                  </thead>
                  <tbody className="h-[60px]"></tbody>
                </table>
                <br />
                <div className="text-[12px] items-center gap-2 mr-3">
                  <input
                    name="p42trafficconvictioncheckno"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="ml-1 mr-2">
                    No traffic convictions during the previous 3 years
                  </span>

                  <input
                    name="p42trafficconvictioncheckyes"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="ml-1 mr-2">
                    Yes - traffic convictions during the previous 3 years
                  </span>
                </div>
              </section>

              <section className="mt-[12px]">
                <div className="text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  10 EMPLOYMENT HISTORY - REQUIRED 3 YEARS / CDL CMV HISTORY UP
                  TO 10 YEARS
                </div>

                <p className="text-[11.4px] mt-2 mb-2 flex items-start text-gray-500">
                  <span>
                    <i>
                      List ALL employers for the preceding 3 years. If you
                      operated a CMV requiring a CDL, also provide additional
                      CMV-driving employers needed to cover the preceding 10
                      years. Explain all gaps in employment.
                    </i>
                  </span>
                </p>

                <div className="bg-[#EFF6FB] mt-[13px] px-[10px] py-[9px] text-[11.4px] leading-[1.35] text-[#173f69]">
                  <b>COMPLETE HISTORY </b>Do not omit part-time, temporary,
                  self-employment, owner-operator work, military service,
                  unemployment, school, or other periods necessary to account
                  for the required history.
                </div>
                <br />
                <table className="w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <p className="text-[12px] mb-2 items-start font-bold">
                      <span>EMPLOYER 1</span>
                    </p>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMPLOYER NAME:
                          </span>
                          <input
                            name="p42emp1name"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">PHONE:</span>
                          <input
                            name="p42emp1phone"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            STREET ADDRESS:
                          </span>
                          <input
                            name="p42emp1address"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            CITY / STATE / ZIP:
                          </span>
                          <input
                            name="p42emp1citystatezip"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            POSITION HELD:
                          </span>
                          <input
                            name="p42emp1position"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            SUPERVISOR / CONTACT:
                          </span>
                          <input
                            name="p42emp1supervisor"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">FROM</span>
                          <input
                            name="p42emp1from"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">TO:</span>
                          <input
                            name="p42emp1to"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            REASON FOR LEAVING:
                          </span>
                          <input
                            name="p42emp1reason"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMAIL / FAX:
                          </span>
                          <input
                            name="p42emp1email"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="text-[11.4px] mt-4 items-center gap-1 mr-3">
                          <input
                            name="p42emp1check1"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>
                            Subject to FMCSRs while employed? Yes / No
                          </span>
                          <input
                            name="p42emp1check2"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>
                            {" "}
                            Safety-sensitive DOT drug/alcohol testing position?
                            Yes / No / N/A
                          </span>
                        </div>

                        <div className="text-[11.4px] items-center gap-1 mr-3">
                          <input
                            name="p42emp1check3"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>Did you operate a CMV? Yes / No</span>
                          <input
                            name="p42emp1check4"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span> Was a CDL required? Yes / No</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold text-[11.4px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            Equipment operated / duties:
                          </span>
                          <input
                            name="p42emp1duties"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <p className="text-[12px] mt-2 mb-2 items-start font-bold">
                      <span>EMPLOYER 2</span>
                    </p>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMPLOYER NAME:
                          </span>
                          <input
                            name="p42emp2name"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">PHONE:</span>
                          <input
                            name="p42emp2phone"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            STREET ADDRESS:
                          </span>
                          <input
                            name="p42emp2address"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            CITY / STATE / ZIP:
                          </span>
                          <input
                            name="p42emp2citystatezip"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            POSITION HELD:
                          </span>
                          <input
                            name="p42emp2position"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            SUPERVISOR / CONTACT:
                          </span>
                          <input
                            name="p42emp2supervisor"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">FROM</span>
                          <input
                            name="p42emp2from"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">TO:</span>
                          <input
                            name="p42emp2to"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            REASON FOR LEAVING:
                          </span>
                          <input
                            name="p42emp2reason"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMAIL / FAX:
                          </span>
                          <input
                            name="p42emp2email"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="text-[11.4px] mt-4 items-center gap-1 mr-3">
                          <input
                            name="p42emp2check1"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>
                            Subject to FMCSRs while employed? Yes / No
                          </span>
                          <input
                            name="p42emp2check2"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>
                            {" "}
                            Safety-sensitive DOT drug/alcohol testing position?
                            Yes / No / N/A
                          </span>
                        </div>

                        <div className="text-[11.4px] items-center gap-1 mr-3">
                          <input
                            name="p42emp2check3"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>Did you operate a CMV? Yes / No</span>
                          <input
                            name="p42emp2check4"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span> Was a CDL required? Yes / No</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold text-[11.4px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            Equipment operated / duties:
                          </span>
                          <input
                            name="p42emp2duties"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
        {/*****page 46 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 43</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <table className="w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <p className="text-[12px] mb-2 items-start font-bold">
                      <span>EMPLOYER 3</span>
                    </p>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMPLOYER NAME:
                          </span>
                          <input
                            name="p43emp3name"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">PHONE:</span>
                          <input
                            name="p43emp3phone"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            STREET ADDRESS:
                          </span>
                          <input
                            name="p43emp3address"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            CITY / STATE / ZIP:
                          </span>
                          <input
                            name="p43emp3citystatezip"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            POSITION HELD:
                          </span>
                          <input
                            name="p43emp3position"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            SUPERVISOR / CONTACT:
                          </span>
                          <input
                            name="p43emp3supervisor"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">FROM</span>
                          <input
                            name="p43emp3from"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">TO:</span>
                          <input
                            name="p43emp3to"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            REASON FOR LEAVING:
                          </span>
                          <input
                            name="p43emp3reason"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMAIL / FAX:
                          </span>
                          <input
                            name="p43emp3email"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="text-[11.4px] mt-4 items-center gap-1 mr-3">
                          <input
                            name="p43emp3check1"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>
                            Subject to FMCSRs while employed? Yes / No
                          </span>
                          <input
                            name="p43emp3check2"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>
                            {" "}
                            Safety-sensitive DOT drug/alcohol testing position?
                            Yes / No / N/A
                          </span>
                        </div>

                        <div className="text-[11.4px] items-center gap-1 mr-3">
                          <input
                            name="p43emp3check3"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>Did you operate a CMV? Yes / No</span>
                          <input
                            name="p43emp3check4"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span> Was a CDL required? Yes / No</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold text-[11.4px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            Equipment operated / duties:
                          </span>
                          <input
                            name="p43emp3duties"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <p className="text-[12px] mt-2 mb-2 items-start font-bold">
                      <span>EMPLOYER 4</span>
                    </p>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMPLOYER NAME:
                          </span>
                          <input
                            name="p43emp4name"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">PHONE:</span>
                          <input
                            name="p43emp4phone"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            STREET ADDRESS:
                          </span>
                          <input
                            name="p43emp4address"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            CITY / STATE / ZIP:
                          </span>
                          <input
                            name="p43emp4citystatezip"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            POSITION HELD:
                          </span>
                          <input
                            name="p43emp4position"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            SUPERVISOR / CONTACT:
                          </span>
                          <input
                            name="p43emp4supervisor"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">FROM</span>
                          <input
                            name="p43emp4from"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">TO:</span>
                          <input
                            name="p43emp4to"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            REASON FOR LEAVING:
                          </span>
                          <input
                            name="p43emp4reason"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMAIL / FAX:
                          </span>
                          <input
                            name="p43emp4email"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="text-[11.4px] mt-4 items-center gap-1 mr-3">
                          <input
                            name="p43emp4check1"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>
                            Subject to FMCSRs while employed? Yes / No
                          </span>
                          <input
                            name="p43emp4check2"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>
                            {" "}
                            Safety-sensitive DOT drug/alcohol testing position?
                            Yes / No / N/A
                          </span>
                        </div>

                        <div className="text-[11.4px] items-center gap-1 mr-3">
                          <input
                            name="p43emp4check3"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>Did you operate a CMV? Yes / No</span>
                          <input
                            name="p43emp4check4"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span> Was a CDL required? Yes / No</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold text-[11.4px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            Equipment operated / duties:
                          </span>
                          <input
                            name="p43emp4duties"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <p className="text-[12px] mt-2 mb-2 items-start font-bold">
                      <span>EMPLOYER 5</span>
                    </p>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMPLOYER NAME:
                          </span>
                          <input
                            name="p43emp5name"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">PHONE:</span>
                          <input
                            name="p43emp5phone"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            STREET ADDRESS:
                          </span>
                          <input
                            name="p43emp5address"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            CITY / STATE / ZIP:
                          </span>
                          <input
                            name="p43emp5citystatezip"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            POSITION HELD:
                          </span>
                          <input
                            name="p43emp5position"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            SUPERVISOR / CONTACT:
                          </span>
                          <input
                            name="p43emp5supervisor"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">FROM</span>
                          <input
                            name="p43emp5from"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">TO:</span>
                          <input
                            name="p43emp5to"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            REASON FOR LEAVING:
                          </span>
                          <input
                            name="p43emp5reason"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMAIL / FAX:
                          </span>
                          <input
                            name="p43emp5email"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="text-[11.4px] mt-4 items-center gap-1 mr-3">
                          <input
                            name="p43emp5check1"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>
                            Subject to FMCSRs while employed? Yes / No
                          </span>
                          <input
                            name="p43emp5check2"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>
                            {" "}
                            Safety-sensitive DOT drug/alcohol testing position?
                            Yes / No / N/A
                          </span>
                        </div>

                        <div className="text-[11.4px] items-center gap-1 mr-3">
                          <input
                            name="p43emp5check3"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span>Did you operate a CMV? Yes / No</span>
                          <input
                            name="p43emp5check4"
                            type="checkbox"
                            className="w-[12px] h-[12px]"
                          />
                          <span> Was a CDL required? Yes / No</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold text-[11.4px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            Equipment operated / duties:
                          </span>
                          <input
                            name="p43emp5duties"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
        {/*****page 47 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 44</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  11 EMPLOYMENT GAPS / ADDITIONAL 10-YEAR CMV HISTORY
                </div>

                <table className="w-full table-fixed text-[10px]">
                  <thead className="text-left border bg-[#1F355A] text-white border-black">
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Status / Employer / School</th>
                      <th>City & State</th>
                      <th>Explanation / CMV Duties </th>
                    </tr>
                  </thead>
                  <tbody className="h-[60px]">
                    <tr>
                      <td className="border border-black">
                        <input
                          type="text"
                          className="border border-black"
                          name="p44from"
                        />
                      </td>
                      <td className="border border-black">
                        <input
                          type="text"
                          className="border border-black"
                          name="p44to"
                        />
                      </td>
                      <td className="border border-black">
                        <input
                          type="text"
                          className="border border-black"
                          name="p44school"
                        />
                      </td>
                      <td className="border border-black">
                        <input
                          type="text"
                          className="border border-black"
                          name="p44city"
                        />
                      </td>
                      <td className="border border-black">
                        <input
                          type="text"
                          className="border border-black"
                          name="p44cmv"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="mt-[12px]">
                <div className="text-left w-full mb-2 border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  12 MILITARY DRIVING EXPERIENCE (IF APPLICABLE)
                </div>

                <table className="mb-4 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">BRANCH:</span>
                          <input
                            name="p44militarybranch"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            DATES OF SERVICE:
                          </span>
                          <input
                            name="p44militarydate"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            MOS / RATING:
                          </span>
                          <input
                            name="p44militaryrating"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            TYPE OF VEHICLE(S):
                          </span>
                          <input
                            name="p44militaryvehicle"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            APPROX. MILES / HOURS:
                          </span>
                          <input
                            name="p44militarymiles"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            DISCHARGE STATUS:
                          </span>
                          <input
                            name="p44militarystatus"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="mt-[12px]">
                <div className="text-left w-full mb-2 border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  13 ADDITIONAL QUALIFICATIONS
                </div>

                <div className="text-[12px] items-center gap-2 mr-3">
                  <input
                    name="p44additionalcheck1"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="mr-2">Hazmat Experience</span>
                  <input
                    name="p44additionalcheck2"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="mr-2">Tanker Experience</span>
                  <input
                    name="p44additionalcheck3"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="mr-2">Doubles/Triples</span>
                  <input
                    name="p44additionalcheck4"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="mr-2">Reefer</span>
                  <input
                    name="p44additionalcheck5"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="mr-2">Flatbed</span>
                  <input
                    name="p44additionalcheck6"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="mr-2">Port / TWIC</span>
                  <input
                    name="p44additionalcheck7"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="mr-2">Mountain</span>
                  <input
                    name="p44additionalcheck8"
                    type="checkbox"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="mr-2">Snow / Ice</span>
                </div>

                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <span className="mr-2 font-bold text-[10px]">
                    Special training, certificates, safety awards, schools, or
                    other qualifications:
                  </span>
                </div>

                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p44schooltrainingothersection1"
                    type="text"
                    className="border border-black w-full h-[12px]"
                  />
                </div>
                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p44schooltrainingothersection2"
                    type="text"
                    className="border border-black w-full h-[12px]"
                  />
                </div>
                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p44schooltrainingothersection3"
                    type="text"
                    className="border border-black w-full h-[12px]"
                  />
                </div>
                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p44schooltrainingothersection4"
                    type="text"
                    className="border border-black w-full h-[12px]"
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
        {/*****page 48 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 45</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  14 APPLICANT CERTIFICATION & AUTHORIZATION
                </div>

                <p className="text-[12px] mt-2 mb-1 flex items-start">
                  I certify that this application was completed by me and that
                  all entries and information provided are true, complete, and
                  accurate to the best of my knowledge. I understand that
                  material omissions, misrepresentations, or false statements
                  may result in disqualification from consideration or
                  termination of employment, subject to applicable law.
                </p>
                <p className="text-[12px] mb-1 flex items-start">
                  I authorize the prospective motor carrier and its authorized
                  agents to contact employers, schools, licensing agencies,
                  government agencies, and other lawful sources to verify
                  information relevant to my qualifications for employment and
                  operation of commercial motor vehicles, subject to applicable
                  federal and state law.
                </p>
                <p className="text-[12px] mb-1 flex items-start">
                  I understand that this application does not constitute a
                  contract of employment and that any employment relationship is
                  subject to the employer’s policies and applicable law.
                </p>
                <table className="mb-4 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Applicant Signature:
                          </span>
                          {!signatureData ? (
                            <input
                              onClick={() => setSignatureOpen(true)}
                              className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                              type="text"
                            />
                          ) : (
                            <span>
                              {signatureData ? (
                                <img
                                  className="w-full h-[40px] object-contain"
                                  src={`${
                                    window.location.hostname === "localhost"
                                      ? "http://localhost:8000/storage/"
                                      : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                  }${signatureData}`}
                                  alt={signatureData}
                                />
                              ) : (
                                "No Image"
                              )}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Printed Name:
                          </span>
                          <input
                            value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                            className=" h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Date:
                          </span>
                          <input
                            value={cleHDate}
                            className=" h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  15 FAIR CREDIT REPORTING ACT / BACKGROUND REPORT AUTHORIZATION
                </div>

                <p className="text-[11.4px] mt-2 mb-1 flex items-start text-gray-500">
                  <i>
                    Use this section only if the employer’s screening process
                    and applicable law permit it. A standalone disclosure may be
                    required; the employer should provide any legally required
                    separate disclosure and notices.
                  </i>
                </p>
                <p className="text-[12px] mb-1 flex items-start">
                  I authorize the prospective employer and its designated
                  consumer reporting agency or authorized representative to
                  obtain reports for lawful employment purposes, which may
                  include verification of identity, employment history,
                  education, motor vehicle records, criminal history where
                  permitted by law, and other public records relevant to
                  employment. I understand that additional disclosures,
                  authorizations, and pre- adverse/adverse action notices may
                  apply.
                </p>

                <table className="mb-4 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Applicant Signature:
                          </span>
                          {!signatureData ? (
                            <input
                              onClick={() => setSignatureOpen(true)}
                              className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                              type="text"
                            />
                          ) : (
                            <span>
                              {signatureData ? (
                                <img
                                  className="w-full h-[40px] object-contain"
                                  src={`${
                                    window.location.hostname === "localhost"
                                      ? "http://localhost:8000/storage/"
                                      : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                  }${signatureData}`}
                                  alt={signatureData}
                                />
                              ) : (
                                "No Image"
                              )}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Date:
                          </span>
                          <input
                            value={cleHDate}
                            className=" h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
        {/*****page 49 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 46</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[15.4px] font-bold text-white">
                  16 FMCSA DRUG & ALCOHOL CLEARINGHOUSE - GENERAL CONSENT FOR
                  LIMITED QUERIES
                </div>

                <p className="text-[12px] mt-2 items-start">
                  I,{" "}
                  <input
                    name="p46fmcsadrugsection1"
                    type="text"
                    className="w-[30%] border border-black h-[15px]"
                  />{" "}
                  provide consent to{" "}
                  <input
                    name="p46fmcsadrugsection2"
                    type="text"
                    className="w-[30%] border border-black h-[15px]"
                  />
                  (Employer) to conduct limited queries of the FMCSA Commercial
                  Driver’s License Drug and Alcohol Clearinghouse to determine
                  whether drug or alcohol violation information about me exists
                  in the Clearinghouse.
                </p>
                <p className="text-[12px] items-start">
                  <input name="p46fmcsadrugcheck1" type="checkbox" />
                  One limited query only
                  <input name="p46fmcsadrugcheck2" type="checkbox" />
                  Multiple limited queries during the stated consent period
                  <input name="p46fmcsadrugcheck3" type="checkbox" />
                  Annual and other lawful limited queries during employment
                </p>
                <p className="text-[12px] mb-1 flex items-start">
                  I understand that a limited query does not disclose specific
                  violation information. If a limited query indicates that
                  information exists, the employer must obtain the additional
                  specific electronic consent required for a full query before
                  detailed information can be released. I further understand
                  that refusal to provide required consent may prohibit me from
                  performing safety-sensitive functions for that employer as
                  required by FMCSA regulations.
                </p>
                <table className="mb-4 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Applicant Signature:
                          </span>
                          {!signatureData ? (
                            <input
                              onClick={() => setSignatureOpen(true)}
                              className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                              type="text"
                            />
                          ) : (
                            <span>
                              {signatureData ? (
                                <img
                                  className="w-full h-[40px] object-contain"
                                  src={`${
                                    window.location.hostname === "localhost"
                                      ? "http://localhost:8000/storage/"
                                      : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                  }${signatureData}`}
                                  alt={signatureData}
                                />
                              ) : (
                                "No Image"
                              )}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Printed Name:
                          </span>
                          <input
                            value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                            className=" h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Date:
                          </span>
                          <input
                            value={cleHDate}
                            className=" h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  17 PRE-EMPLOYMENT DRUG & ALCOHOL INFORMATION
                </div>

                <p className="text-[12px] mt-2 items-start">
                  <input name="p46fpreempdrugcheck1" type="checkbox" />
                  Have you tested positive, or refused to test, on any
                  pre-employment DOT drug or alcohol test during the past 3
                  years for an employer that did not hire you? Yes / No
                </p>

                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <span className="mr-2 font-bold text-[10px]">
                    If YES, provide the information requested by the employer
                    and documentation of successful completion of the
                    return-to-duty process, if applicable:
                  </span>
                </div>

                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p46preempsection1"
                    type="text"
                    className="border border-black w-[60%] h-[12px]"
                  />
                </div>
                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p46preempsection2"
                    type="text"
                    className="border border-black w-[60%] h-[12px]"
                  />
                </div>
                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p46preempsection3"
                    type="text"
                    className="border border-black w-[60%] h-[12px]"
                  />
                </div>
                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <input
                    name="p46preempsection4"
                    type="text"
                    className="border border-black w-[60%] h-[12px]"
                  />
                </div>
                <br />

                <table className="mb-4 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Applicant Signature:
                          </span>
                          {!signatureData ? (
                            <input
                              onClick={() => setSignatureOpen(true)}
                              className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                              type="text"
                            />
                          ) : (
                            <span>
                              {signatureData ? (
                                <img
                                  className="w-full h-[40px] object-contain"
                                  src={`${
                                    window.location.hostname === "localhost"
                                      ? "http://localhost:8000/storage/"
                                      : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                  }${signatureData}`}
                                  alt={signatureData}
                                />
                              ) : (
                                "No Image"
                              )}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Date:
                          </span>
                          <input
                            value={cleHDate}
                            className=" h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
        {/*****page 49 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 47</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[15.4px] font-bold text-white">
                  18 SAFETY PERFORMANCE HISTORY RECORDS REQUEST - APPLICANT
                  AUTHORIZATION
                </div>
                <table className="mb-4 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            APPLICANT / DRIVER NAME:
                          </span>
                          <input
                            value={`${driver.fname} ${driver.mname} ${driver.lname}`}
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            SSN - LAST 4:
                          </span>
                          <input
                            name="p47lastssn"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            PREVIOUS EMPLOYER:
                          </span>
                          <input
                            name="p47prevemployer"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            PREVIOUS EMPLOYER ADDRESS:
                          </span>
                          <input
                            name="p47prevemployeraddress"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            CITY / STATE / ZIP:
                          </span>
                          <input
                            name="p47prevemployercitystatezip"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            PREVIOUS EMPLOYER PHONE:
                          </span>
                          <input
                            name="p47prevemployerphone"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMAIL / FAX:
                          </span>
                          <input
                            name="p47prevemployeremail"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMPLOYMENT FROM:
                          </span>
                          <input
                            name="p47prevemployerfrom"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            EMPLOYMENT TO:
                          </span>
                          <input
                            name="p47prevemployerto"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-[11px] mb-1 flex items-start">
                  I authorize the previous employer identified above to release
                  to the prospective motor carrier the information lawfully
                  requested concerning my employment and safety performance
                  history, including applicable accident history and
                  DOT-regulated drug and alcohol information.
                </p>
                <table className="mb-4 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Driver Signature:
                          </span>
                          {!signatureData ? (
                            <input
                              onClick={() => setSignatureOpen(true)}
                              className="box-border h-9 sm:h-[40px] w-full min-w-0 border border-black p-2 text-xs sm:text-sm"
                              type="text"
                            />
                          ) : (
                            <span>
                              {signatureData ? (
                                <img
                                  className="w-full h-[40px] object-contain"
                                  src={`${
                                    window.location.hostname === "localhost"
                                      ? "http://localhost:8000/storage/"
                                      : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                  }${signatureData}`}
                                  alt={signatureData}
                                />
                              ) : (
                                "No Image"
                              )}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Date:
                          </span>
                          <input
                            value={cleHDate}
                            className=" h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full  text-[12px] font-bold">
                  TO BE COMPLETED BY PREVIOUS EMPLOYER
                </div>

                <p className="text-[12px] mt-2 items-start">
                  <input name="p47check1" type="checkbox" />
                  Applicant was employed by this company: Yes / No{" "}
                  <input name="p47check2" type="checkbox" />
                  Dates confirmed: From To
                </p>
                <p className="text-[12px] items-start">
                  <input name="p47check3" type="checkbox" />
                  Operated CMV: Yes / No
                  <input name="p47check4" type="checkbox" />
                  Equipment: Straight Truck / Tractor-Semitrailer / Bus / Tank /
                  Doubles-Triples / Other
                </p>

                <table className="mb-4 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            REASON FOR LEAVING:{" "}
                          </span>
                          <input
                            name="p47reasonleaving"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            ELIGIBLE FOR REHIRE?:
                          </span>
                          <input
                            name="p47rehire"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            PERSON COMPLETING FORM:
                          </span>
                          <input
                            name="p47hireform"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">TITLE:</span>
                          <input
                            name="p47hireformtitle"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            PHONE / EMAIL:
                          </span>
                          <input
                            name="p47hirepersonemail"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="mb-4 text-left w-full  text-[12px] font-bold">
                  ACCIDENT HISTORY
                </div>

                <table className="w-full text-left text-[9.4px]">
                  <thead className="border bg-[#1F355A] text-white border-black">
                    <tr>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Injuries</th>
                      <th>Fatalities</th>
                      <th>Hazmat Spill</th>
                      <th>Brief Description</th>
                    </tr>
                  </thead>
                  <tbody className="border border-black h-[60px]">
                    <tr>
                      <td className="border border-black">
                        <input
                          type="text"
                          className="border border-black"
                          name="p47accidentdate"
                        />
                      </td>
                      <td className="border border-black">
                        <input
                          type="text"
                          className="border border-black"
                          name="p47accidentlocation"
                        />
                      </td>
                      <td className="border border-black">
                        <input
                          type="text"
                          className="border border-black"
                          name="p47accidentinjury"
                        />
                      </td>
                      <td className="border border-black">
                        <input
                          type="text"
                          className="border border-black"
                          name="p47accidentfatalities"
                        />
                      </td>

                      <td className="border border-black">
                        <input
                          type="text"
                          className="border border-black"
                          name="p47accidenthazmat"
                        />
                      </td>

                      <td className="border border-black">
                        <input
                          type="text"
                          className="border border-black"
                          name="p47accidentdesc"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
        {/*****page 49 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 48</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[15.4px] font-bold text-white">
                  21 MOTOR CARRIER DRIVER QUALIFICATION FILE - INTERNAL
                  CHECKLIST
                </div>

                <p className="text-[11.4px] mt-2 mb-2 flex items-start text-gray-500">
                  <span>
                    <i>
                      Employer use only. This checklist is provided as an
                      organizational aid and does not replace the motor
                      carrier’s responsibility to determine all documents
                      required for the driver and operation.
                    </i>
                  </span>
                </p>
              </section>
              <section className="mt-[12px]">
                <table className="w-full text-left text-[12px] border-collapse">
                  <thead className="border bg-[#1F355A] text-white border-black">
                    <tr>
                      <th>Document / Requirement </th>
                      <th>Received</th>
                      <th>Reviewed</th>
                      <th>Date / Notes</th>
                    </tr>
                  </thead>

                  <tbody className="text-[12px]">
                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Signed Commercial Driver Employment Application
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check1"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check2"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        FMCSA DQ 391.21
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Copy of current Driver License / CDL - front and
                            back
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check3"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check4"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Company / qualification record Verify class,
                        endorsements, restrictions and expiration
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Work authorization / Form I-9 acceptable document(s)
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check5"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check6"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Employment eligibility - maintain I-9 separately
                        Employee chooses acceptable List A OR List B + List C
                        documents; do not require a specific document
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Employment Authorization Document (work permit), if
                            presented/required by the employee's status
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check7"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check8"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        I-9 supporting document, when applicable Do not require
                        an EAD if the employee presents other acceptable I-9
                        documentation
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Social Security card, if presented for Form I-9 or
                            needed for lawful payroll/onboarding purposes
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check9"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check10"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Employment / payroll, when applicable Do not require SS
                        card as the specific I-9 document if other acceptable
                        documents are presented
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Medical Examiner's Certificate / current CDLIS
                            medical certification status
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check11"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check12"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        FMCSA DQ 391.43 / 391.51
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Medical Examination Report Form MCSA-5875 (long
                            form, commonly 5 pages), if voluntarily obtained
                            with driver consent
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check13"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check14"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Confidential medical record - NOT a standard DQ-file
                        requirement Store with restricted medical records; FMCSA
                        requires the Medical Examiner to retain the original
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Medical certification verification / CDLIS MVR
                            showing medical status
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check15"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check16"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        FMCSA DQ for CDL/CLP drivers Obtain current
                        licensing-state CDLIS MVR and verify medical status
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Medical variance / exemption / SPE documentation, if
                            applicable
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check17"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check18"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        FMCSA DQ Maintain when applicable
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Iitial MVR / driving record from each required State
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check19"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check20"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        FMCSA DQ 391.23
                      </td>
                    </tr>
                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Signed DMV / MVR / CDLIS Records Authorization and
                            Consent
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check21"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check22"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Screening authorization Authorizes lawful driving-record
                        and CDLIS-related record retrieval
                      </td>
                    </tr>
                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>Annual MVR and documented annual review</div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check23"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check24"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        FMCSA DQ - recurring 391.25
                      </td>
                    </tr>
                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>Safety Performance History</div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check25"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check26"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        FMCSA DQ
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
        {/*****page 49 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 49</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]"></section>
              <section className="mt-[12px]">
                <table className="w-full text-left text-[12px] border-collapse">
                  <tbody className="text-[12px]">
                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            request(s), responses, and documented good-faith
                            attempts
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check1"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check2"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        391.21
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>Road Test Certificate or lawful equivalent</div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check3"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check4"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        FMCSA DQ 391.31 / 391.33
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            FMCSA Clearinghouse pre- employment full query
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check5"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check6"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Drug & alcohol compliance Specific electronic consent
                        occurs in the Clearinghouse
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            FMCSA Clearinghouse limited- query general consent
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check7"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check8"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Drug & alcohol compliance Retain consent evidence for
                        required period
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Pre-employment controlled substances test result /
                            CCF documentation, when required
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check9"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check10"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Drug & alcohol compliance Part 382 / Part 40
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Pre-employment drug & alcohol questionnaire / prior
                            testing information, when applicable
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check11"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check12"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Drug & alcohol compliance Part 40 / company process
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Standalone Background / Consumer Report Disclosure
                            and Authorization
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check13"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check14"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Employment screening FCRA / applicable state law
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Criminal background report, if obtained and lawful
                            for the position/location
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check15"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check16"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Confidential screening record Follow FCRA and applicable
                        state/local restrictions
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            PSP report, if ordered with driver authorization
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check17"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check18"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Optional pre-employment safety screening Not a
                        substitute for required MVR / SPH inquiries
                      </td>
                    </tr>

                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            CDLIS / license status information obtained through
                            authorized source
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check19"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check20"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Driver qualification screening Use for CDL status /
                        medical certification verification as applicable
                      </td>
                    </tr>
                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Drug & Alcohol Policy acknowledgment / receipt
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check21"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check22"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Company compliance Signed acknowledgment
                      </td>
                    </tr>
                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            Driver policy / handbook / safety policy
                            acknowledgments
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check23"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check24"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Company record As applicable
                      </td>
                    </tr>
                    <tr>
                      <td className=" border border-[#555] px-[6px] py-[7px] align-top ">
                        <div className="flex w-full items-center justify-between">
                          <div>I-9 Form</div>
                        </div>
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check25"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left ">
                        <input
                          name="p48check26"
                          className="border border-3 border-black w-full p-2"
                          type="checkbox"
                        />
                      </td>

                      <td className="border border-black px-[6px] py-[7px] align-middle text-left ">
                        Employment eligibility Keep separately from DQ file as
                        company practice
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
        {/*****page 49 start********/}
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <p className="pageseries cap text-[12px] text-right">
            <i>page 50</i>
          </p>
          <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
            <div className="w-full">
              <section className="mt-[12px]">
                <div className="mb-4 text-left w-full border border-[#1b3e5c] bg-[#1F355A] text-[16px] font-bold text-white">
                  25 EMPLOYER REVIEW / FINAL DISPOSITION
                </div>

                <table className="mb-4 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            APPLICATION REVIEWED BY:
                          </span>
                          <input
                            name="p50reviewedby"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            DATE:{" "}
                            <span className="text-gray-500">MM/DD/YYYY</span>
                          </span>
                          <input
                            name="p50revieweddate"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            MVR REVIEWED BY:
                          </span>
                          <input
                            name="p50mvrreviewedby"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            TYPE OF TRAILER(S):
                          </span>
                          <input
                            value="Van"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            PREVIOUS EMPLOYER CHECKS BY:
                          </span>
                          <input
                            name="p50prevemployercheckby"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">DATE:</span>
                          <input
                            name="p50prevemployercheckdate"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            CLEARINGHOUSE QUERY BY:
                          </span>
                          <input
                            value={company.cname}
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap">
                            DATE:{" "}
                            <span className="text-gray-500">MM/DD/YYYY</span>
                          </span>
                          <input
                            name="p50clearingdate"
                            className="border border-black h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section className="mt-[12px]">
                <p className="text-[12px] mt-2 items-start">
                  <input name="p50check1" type="checkbox" checked />
                  Approved for Hire <input name="p50check2" type="checkbox" />
                  Conditional / Pending Documents
                  <input name="p50check3" type="checkbox" />
                  Not Approved
                  <input name="p50check4" type="checkbox" />
                  Withdrawn
                </p>

                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <span className="mr-2 font-bold text-[10px]">
                    Comments / outstanding items:
                  </span>
                </div>

                <div className="text-[11.4px] items-center gap-2 mr-3">
                  <textarea
                    type="text"
                    name="p50omments"
                    className="border border-black w-full h-[50px]"
                  ></textarea>
                </div>

                <br />

                <table className="mb-4 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Authorized Representative Signature
                          </span>
                          <input
                            value="Roneel Lal"
                            className=" h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Title
                          </span>
                          <input
                            value="Owner"
                            className=" h-[20px] flex-1 ml-2 min-w-0"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Date:
                          </span>
                          <input
                            className=" h-[20px] flex-1 ml-2 min-w-0"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-[13.4px] mt-2 text-center">
                  WEBSITE VERSION - REV. SEPTEMBER 2026 | EXPANDED DRIVER
                  DOCUMENT & CONSENT PACKAGE
                </p>

                <p className="text-gray-500 text-[10px] text-center">
                  Prepared for use by motor carriers with administrative support
                  from DOT Compliance Solutions LLC.
                </p>

                <br />
                <br />
                <table className="mb-4 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr className="flex border-b border-gray-300">
                      <td
                        colSpan="3"
                        className="font-bold text-[10px] align-top leading-[1.22]"
                      >
                        <div className="flex items-center gap-2 flex-nowrap">
                          {/* Camera */}
                          <button
                            type="button"
                            onClick={() =>
                              document.getElementById("cameraInput")?.click()
                            }
                            className="whitespace-nowrap rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white"
                          >
                            <i className="fa-solid fa-camera mr-1"></i>
                            Take Photo
                          </button>

                          {/* Upload */}
                          <button
                            type="button"
                            onClick={() =>
                              document.getElementById("photoInput")?.click()
                            }
                            className="whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700"
                          >
                            <i className="fa-solid fa-upload mr-1"></i>
                            Upload Photo
                          </button>
                        </div>

                        {/* Camera */}
                        <input
                          id="cameraInput"
                          type="file"
                          accept="image/*"
                          capture="user"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />

                        {/* File Upload */}
                        <input
                          id="photoInput"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <span className="whitespace-nowrap text-gray-400">
                          Driver Photo
                        </span>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Ip Address
                          </span>
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          <span className="whitespace-nowrap text-gray-400">
                            Location
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {/* Preview */}
                        {photo && (
                          <div className="mt-3 flex items-center gap-2">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="Driver"
                              className="h-16 w-16 rounded-lg border object-cover"
                            />

                            <span className="text-xs font-normal text-slate-500">
                              {photo.name}
                            </span>
                          </div>
                        )}
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          {location.ip}
                        </div>
                      </td>

                      <td className="font-bold text-[10px] align-top leading-[1.22]">
                        <div className="flex items-center w-full">
                          {location.city}, {location.state}, {location.country},{" "}
                          {location.zip}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>

        <br />

        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <div className="mx-auto">
            {/* Header */}
            <div className="">
              <div className="flex items-start justify-between py-2">
                <div className="w-[100px]">
                  <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border-[3px] border-black text-center text-[8px] font-bold leading-tight">
                    <img src="/homeland.webp" />
                  </div>
                </div>

                <div className="font-['Times_New_Roman'] flex-1 text-center">
                  <h1 className="text-[24px] font-bold">
                    Employment Eligibility Verification
                  </h1>
                  <h2 className="text-[17px] font-bold">
                    Department of Homeland Security
                  </h2>
                  <p className="text-[15px]">
                    U.S. Citizenship and Immigration Services
                  </p>
                </div>

                <div className="w-[120px] text-center">
                  <div className="text-[17px] font-bold">USCIS</div>
                  <div className="text-[17px] font-bold">Form I-9</div>
                  <div className="text-[11px]">OMB No. 1615-0047</div>
                  <div className="text-[11px]">Expires 05/31/2027</div>
                </div>
              </div>
            </div>

            <div className="border-t-[5px] border-black font-['Times_New_Roman']" />

            {/* Top Instructions */}
            <div className="py-2 text-[12px] leading-tight">
              <b>START HERE:</b> Employers must ensure the form instructions are
              available to employees when completing this form. Employers are
              liable for failing to comply with the requirements for completing
              this form. See below and the <u>Instructions.</u>
            </div>

            <div className="pb-2 text-[12px] leading-tight">
              <b>ANTI-DISCRIMINATION NOTICE:</b> All employees can choose which
              acceptable documentation to present for Form I-9. Employers cannot
              ask employees for documentation to verify information in Section
              1, or specify which acceptable documentation employees must
              present for Section 2 or Supplement B, Reverification and Rehire.
            </div>

            {/* Section 1 */}
            <div className="border border-black bg-gray-200 px-2 py-1 text-[12px] leading-tight">
              <b>Section 1. Employee Information and Attestation:</b> Employees
              must complete and sign Section 1 of Form I-9 no later than the{" "}
              <b>first day of employment</b>, but not before accepting a job
              offer.
            </div>

            {/* Employee Information */}
            <div className="grid grid-cols-12 border border-black text-[9.4px]">
              <div className="col-span-4 border-b border-r border-black">
                <div className="px-2 pt-1">Last Name (Family Name)</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-3 border-b border-r border-black">
                <div className="px-2 pt-1">First Name (Given Name)</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-2 border-b border-r border-black">
                <div className="px-2 pt-1">Middle Initial (if any)</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-3 border-b border-black">
                <div className="px-2 pt-1">Other Last Names Used (if any)</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-4 border-b border-r border-black">
                <div className="px-2 pt-1">
                  Address (Street Number and Name)
                </div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-2 border-b border-r border-black">
                <div className="px-2 pt-1">Apt. Number (if any)</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-3 border-b border-r border-black">
                <div className="px-2 pt-1">City or Town</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-1 border-b border-r border-black">
                <div className="px-2 pt-1">State</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-2 border-b border-black">
                <div className="px-2 pt-1">ZIP Code</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-2 border-b border-r border-black">
                <div className="px-2 pt-1">Date of Birth (mm/dd/yyyy)</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-2 border-b border-r border-black">
                <div className="px-2 pt-1">U.S. Social Security Number</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-4 border-b border-r border-black">
                <div className="px-2 pt-1">Employee's Email Address</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>

              <div className="col-span-4 border-b border-black">
                <div className="px-2 pt-1">Employee's Telephone Number</div>
                <input className="border border-gray-500 h-7 w-[95%] px-2 outline-none" />
              </div>
            </div>

            {/* Attestation */}
            <div className="grid grid-cols-12 border border-black border-t-0">
              <div className="col-span-3 border-r border-black p-3 text-[11px] font-bold leading-tight">
                I am aware that federal law provides for imprisonment and/or
                fines for false statements, or the use of false documents, in
                connection with the completion of this form. I attest, under
                penalty of perjury, that this information, including my
                selection of the box attesting to my citizenship or immigration
                status, is true and correct.
              </div>

              <div className="col-span-9">
                <div className="border-b border-black px-2 py-1 text-[11px] font-bold">
                  Check one of the following boxes to attest to your citizenship
                  or immigration status:
                </div>

                <label className="flex items-center gap-2 px-2 py-1 text-[11px]">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>
                    <b>1.</b>&nbsp; A citizen of the United States
                  </span>
                </label>

                <label className="flex items-center gap-2 px-2 py-1 text-[11px]">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>
                    <b>2.</b>&nbsp; A noncitizen national of the United States
                  </span>
                </label>

                <label className="flex items-center gap-2 px-2 py-1 text-[11px]">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>
                    <b>3.</b>&nbsp; A lawful permanent resident (Enter USCIS
                    A-Number.)
                    <input className="ml-2 w-[140px] border-b border-black outline-none" />
                  </span>
                </label>

                <label className="flex items-center gap-2 px-2 py-1 text-[11px]">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>
                    <b>4.</b>&nbsp; An alien authorized to work until
                    <input className="ml-2 w-[100px] border-b border-black outline-none" />
                  </span>
                </label>

                <div className="px-2 py-1 text-[11px] font-bold">
                  If you check Item Number 4, enter one of these:
                </div>

                <div className="grid grid-cols-3 border-t border-black text-center text-[10px] font-bold">
                  <div className="border-r border-black">
                    <div className="py-1">USCIS A-Number</div>
                    <input className="h-7 w-full px-2 outline-none" />
                  </div>

                  <div className="border-r border-black">
                    <div className="py-1">Form I-94 Admission Number</div>
                    <input className="h-7 w-full px-2 outline-none" />
                  </div>

                  <div>
                    <div className="py-1">
                      Foreign Passport Number and Country of Issuance
                    </div>
                    <input className="h-7 w-full px-2 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 border-t border-black">
                  <div className="border-r border-black">
                    <div className="px-2 pt-1 text-[10px]">
                      Signature of Employee
                    </div>
                    <input className="h-8 w-full outline-none" />
                  </div>

                  <div>
                    <div className="px-2 pt-1 text-[10px]">
                      Today's Date (mm/dd/yyyy)
                    </div>
                    <input className="h-8 w-full outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-x border-b border-black px-2 py-1 text-[11px]">
              If a preparer and/or translator assisted you in completing Section
              1, that person <b>MUST</b> complete the{" "}
              <u className="font-bold text-blue-700">
                Preparer and/or Translator Certification
              </u>{" "}
              on Page 3.
            </div>

            {/* Section 2 */}
            <div className="mt-1 border border-black">
              <div className="bg-gray-200 px-2 py-1 text-[12px] leading-tight">
                <b>Section 2. Employer Review and Verification:</b> Employers or
                their authorized representative must complete and sign Section 2
                within three business days after the employee's first day of
                employment, and must physically examine, or examine consistent
                with an alternative procedure authorized by the Secretary of
                DHS, documentation from List A OR a combination of documentation
                from List B and List C. Enter any additional documentation in
                the Additional Information box; see Instructions.
              </div>

              <div class="w-full bg-white text-black font-sans text-[16px] leading-[1.15]">
                <div class="text-[10.7px] grid grid-cols-[44%_2.5%_53.5%] border-x-[2px] border-b-[2px] border-black font-bold text-center">
                  <div class="border-r-[2px]  text-[10.7px] border-black py-0.5">
                    List A
                  </div>

                  <div class="border-r-[2px] border-black py-0.5">OR</div>

                  <div class="grid grid-cols-3">
                    <div class=" py-0.5">List B</div>
                    <div class="py-0.5">AND</div>
                    <div class="py-0.5">List C</div>
                  </div>
                </div>

                <div class="grid grid-cols-[44%_56%] border-x-[2px] border-black h-[430px]">
                  <div class="border-r-[2px] border-black">
                    <div class="text-[9.4px] grid grid-cols-[50%_50%]">
                      <div class="bg-[#d9d9d9] border-b border-r border-black px-1 py-3 font-bold">
                        Document Title 1
                      </div>
                      <div class="bg-[#e6f1ff] border-b border-black px-1 py-3"></div>

                      <div class="bg-[#d9d9d9] border-b border-r border-black px-1 py-3">
                        Issuing Authority
                      </div>
                      <div class="border-b border-black px-1 py-3"></div>

                      <div class="bg-[#d9d9d9] border-b border-r border-black px-1 py-3">
                        Document Number (if any)
                      </div>
                      <div class="border-b border-black px-1 py-3"></div>

                      <div class="bg-[#d9d9d9] border-b-[2px] border-r border-black px-1 py-3">
                        Expiration Date (if any)
                      </div>
                      <div class="border-b-[2px] border-black px-1 py-3"></div>
                    </div>

                    <div class="text-[9.4px] grid grid-cols-[50%_50%]">
                      <div class="bg-[#d9d9d9] border-b border-r border-black px-1 py-3 font-bold">
                        Document Title 2 (if any)
                      </div>
                      <div class="border-b border-black px-1 py-3"></div>

                      <div class="bg-[#d9d9d9] border-b border-r border-black px-1 py-3">
                        Issuing Authority
                      </div>
                      <div class="border-b border-black px-1 py-3"></div>

                      <div class="bg-[#d9d9d9] border-b border-r border-black px-1 py-3">
                        Document Number (if any)
                      </div>
                      <div class="border-b border-black px-1 py-3"></div>

                      <div class="bg-[#d9d9d9] border-b-[2px] border-r border-black px-1 py-3">
                        Expiration Date (if any)
                      </div>
                      <div class="border-b-[2px] border-black px-1 py-3"></div>
                    </div>

                    <div class="text-[9.4px] grid grid-cols-[50%_50%]">
                      <div class="bg-[#d9d9d9] border-b border-r border-black px-1 py-3 font-bold">
                        Document Title 3 (if any)
                      </div>
                      <div class="border-b border-black px-1 py-3"></div>

                      <div class="bg-[#d9d9d9] border-b border-r border-black px-1 py-3">
                        Issuing Authority
                      </div>
                      <div class="border-b border-black px-1 py-3"></div>

                      <div class="bg-[#d9d9d9] border-b border-r border-black px-1 py-3">
                        Document Number (if any)
                      </div>
                      <div class="border-b border-black px-1 py-3"></div>

                      <div class="bg-[#d9d9d9] border-r border-black px-1 py-3">
                        Expiration Date (if any)
                      </div>
                      <div class="border-b border-black px-1 py-3"></div>
                    </div>
                  </div>

                  <div>
                    <div class="grid grid-cols-3 grid-cols-[5%_45%_50%]">
                      <div class="border-b-[2px] border-black bg-[#d9d9d9]"></div>

                      <div class="border-x-[2px] border-black">
                        <div class="h-[36px] border-b border-black"></div>
                        <div class="h-[36px] border-b border-black"></div>
                        <div class="h-[36px] border-b border-black"></div>
                        <div class="h-[36px] border-b-[2px] border-black"></div>
                      </div>

                      <div>
                        <div class="h-[36px] border-b border-black"></div>
                        <div class="h-[36px] border-b border-black"></div>
                        <div class="h-[36px] border-b border-black"></div>
                        <div class="h-[36px] border-b-[2px] border-black"></div>
                      </div>
                    </div>

                    <div>
                      <div class="bg-[#d9d9d9] border-b-[2px] border-black px-2 py-1 font-bold text-[10.7px]">
                        Additional Information
                      </div>

                      <div class="h-[218px]"></div>

                      <div class="flex items-center gap-2 px-2 py-3 text-[9.4px]">
                        <input type="checkbox" />
                        <span>
                          Check here if you used an alternative procedure
                          authorized by DHS to examine documents.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-[78%_22%] border-t-[1px] border-b-[2px] border-black">
                  <div class="px-2 py-2 font-bold text-[10.4px] leading-[1.25] border-r-[2px] border-black">
                    <span class="font-bold">Certification:</span>
                    <span>
                      I attest, under penalty of perjury, that (1) I have
                      examined the documentation presented by the above-named
                      employee, (2) the above-listed documentation appears to be
                      genuine and to relate to the employee named, and (3) to
                      the best of my knowledge, the employee is authorized to
                      work in the United States.
                    </span>
                  </div>

                  <div class="grid grid-cols-1">
                    <div class="px-3 py-1 text-[9.4px]">
                      First Day of Employment
                      <br />
                      (mm/dd/yyyy):
                      <br />
                      <input type="date" className="border border-black" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Employer Signature */}
              <div className="grid grid-cols-12 border-t border-black">
                <div className="col-span-5 border-r border-black">
                  <div className="px-2 pt-1 text-[10px]">
                    Last Name, First Name and Title of Employer or Authorized
                    Representative
                  </div>
                  <input className="border border-black h-8 w-full outline-none" />
                </div>

                <div className="col-span-4 border-r border-black">
                  <div className="px-2 pt-1 text-[10px]">
                    Signature of Employer or Authorized Representative
                  </div>
                  <input className="border border-black h-8 w-full outline-none" />
                </div>

                <div className="col-span-3">
                  <div className="px-2 pt-1 text-[10px]">
                    Today's Date (mm/dd/yyyy)
                  </div>
                  <input className="border border-black h-8 w-full outline-none" />
                </div>
              </div>

              {/* Employer Address */}
              <div className="grid grid-cols-12 border-t border-black">
                <div className="col-span-4 border-r border-black">
                  <div className="px-2 pt-1 text-[10px]">
                    Employer's Business or Organization Name
                  </div>
                  <input className="border border-black h-8 w-full outline-none" />
                </div>

                <div className="col-span-8">
                  <div className="px-2 pt-1 text-[10px]">
                    Employer's Business or Organization Address, City or Town,
                    State, ZIP Code
                  </div>
                  <input className="border border-black h-8 w-full outline-none" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-b border-black py-2 text-center text-[12px]">
              For reverification or rehire, complete{" "}
              <span className="font-bold text-blue-700 underline">
                <a href="https://www.uscis.gov/i-9">
                  Supplement B, Reverification and Rehire
                </a>
              </span>
              on Page 4.
            </div>

            <div className="flex justify-between pt-2 text-[11px]">
              <span>Form I-9 Edition 01/20/25</span>
              <span>Page 1 of 4</span>
            </div>
          </div>
        </div>
        <br />
        <div className="mx-auto w-full max-w-[210mm] min-h-screen bg-white px-2 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <div className="w-full">
            {/* Header */}
            <div className="border-t-[4px] sm:border-t-[5px] border-black">
              <div className="py-2 sm:py-3">
                <div className="text-center px-1 sm:px-2">
                  <h1 className="text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17.4px] font-bold leading-tight">
                    LISTS OF ACCEPTABLE DOCUMENTS
                  </h1>

                  <p className="mt-1 text-[9px] sm:text-[10.5px] md:text-[12px] lg:text-[14.7px] leading-tight">
                    All documents containing an expiration date must be
                    unexpired.
                    <br />
                    * Documents extended by the issuing authority are considered
                    unexpired.
                    <br />
                    Employees may present one selection from List A or a
                    combination of one selection from List B and one selection
                    from List C.
                  </p>

                  <h1 className="mt-1 text-[10px] sm:text-[11px] md:text-[13px] lg:text-[16.4px] font-bold leading-tight">
                    Examples of many of these documents appear in the Handbook
                    for Employers (M-274).
                  </h1>
                </div>
              </div>
            </div>

            {/* Table wrapper */}
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[650px] border border-gray-500 border-collapse font-[Arial] table-fixed">
                {/* Table Header */}
                <thead>
                  <tr>
                    <th className="w-[31%] border border-gray-500 p-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[10.7px] leading-tight">
                      LIST A
                      <br />
                      Documents that Establish Both Identity and Employment
                      Authorization
                    </th>

                    <th className="w-[5%] border border-gray-500 p-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[10.7px]">
                      OR
                    </th>

                    <th className="w-[30%] border border-gray-500 p-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[10.7px] leading-tight">
                      LIST B
                      <br />
                      Documents that Establish Identity
                    </th>

                    <th className="w-[34%] border border-gray-500 p-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[10.7px] leading-tight">
                      LIST C
                      <br />
                      Documents that Establish Employment Authorization
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td className="align-top border border-gray-500">
                      <div className="text-[8px] sm:text-[8.5px] md:text-[9px] lg:text-[9.7px] p-1 flex items-start leading-tight">
                        <b className="mr-1 shrink-0">1.</b>
                        <span>U.S. Passport or U.S. Passport Card</span>
                      </div>
                    </td>

                    <td></td>

                    {/* LIST B */}
                    <td
                      rowSpan={6}
                      className="align-top border border-gray-500"
                    >
                      <DocumentItem
                        number="1."
                        text="Driver's license or ID card issued by a State or outlying possession of the United States provided it contains a photograph or information such as name, date of birth, sex, height, eye color, and address"
                      />

                      <DocumentItem
                        number="2."
                        text="ID card issued by federal, state or local government agencies or entities, provided it contains a photograph or information such as name, date of birth, sex, height, eye color, and address"
                      />

                      <DocumentItem
                        number="3."
                        text="School ID card with a photograph"
                      />

                      <DocumentItem
                        number="4."
                        text="Voter's registration card"
                      />

                      <DocumentItem
                        number="5."
                        text="U.S. Military card or draft record"
                      />

                      <DocumentItem
                        number="6."
                        text="Military dependent's ID card"
                      />

                      <DocumentItem
                        number="7."
                        text="U.S. Coast Guard Merchant Mariner Card"
                      />

                      <DocumentItem
                        number="8."
                        text="Native American tribal document"
                      />

                      <DocumentItem
                        number="9."
                        text="Driver's license issued by a Canadian government authority"
                      />

                      <div className="border-t border-gray-500 p-2 text-center text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] leading-tight">
                        <b>
                          For persons under age 18 who are
                          <br />
                          unable to present a document
                          <br />
                          listed above:
                        </b>
                      </div>

                      <DocumentItem
                        number="10."
                        text="School record or report card"
                      />

                      <DocumentItem
                        number="11."
                        text="Clinic, doctor, or hospital record"
                      />

                      <DocumentItem
                        number="12."
                        text="Day-care or nursery school record"
                      />
                    </td>

                    {/* LIST C */}
                    <td
                      rowSpan={6}
                      className="align-top border border-gray-500"
                    >
                      <DocumentItem
                        number="1."
                        text="A Social Security Account Number card, unless the card includes one of the following restrictions:"
                      />

                      <div className="px-2 pb-2 text-[8px] sm:text-[8.5px] md:text-[9px] lg:text-[9.7px] leading-tight">
                        <div className="flex items-start">
                          <b className="mr-1 shrink-0">(1)</b>
                          <span>NOT VALID FOR EMPLOYMENT</span>
                        </div>

                        <div className="flex items-start">
                          <b className="mr-1 shrink-0">(2)</b>
                          <span>
                            VALID FOR WORK ONLY WITH INS AUTHORIZATION
                          </span>
                        </div>

                        <div className="flex items-start">
                          <b className="mr-1 shrink-0">(3)</b>
                          <span>
                            VALID FOR WORK ONLY WITH DHS AUTHORIZATION
                          </span>
                        </div>
                      </div>

                      <DocumentItem
                        number="2."
                        text="Certification of report of birth issued by the Department of State (Forms DS-1350, FS-545, FS-240)"
                      />

                      <DocumentItem
                        number="3."
                        text="Original or certified copy of birth certificate issued by a State, county, municipal authority, or territory of the United States bearing an official seal"
                      />

                      <DocumentItem
                        number="4."
                        text="Native American tribal document"
                      />

                      <DocumentItem
                        number="5."
                        text="U.S. Citizen ID Card (Form I-197)"
                      />

                      <DocumentItem
                        number="6."
                        text="Identification Card for Use of Resident Citizen in the United States (Form I-179)"
                      />

                      <DocumentItem
                        number="7."
                        text="Employment authorization document issued by the Department of Homeland Security"
                      />

                      <div className="border-t border-gray-500 p-2 text-[8px] sm:text-[8.5px] md:text-[9px] lg:text-[9.7px] leading-tight">
                        <span>
                          For examples, see{" "}
                          <a
                            className="font-bold text-blue-700 underline"
                            href="https://www.uscis.gov/i-9-central/form-i-9-resources/handbook-for-employers-m-274/70-evidence-of-employment-authorization-for-certain-categories"
                          >
                            Section 7
                          </a>{" "}
                          and{" "}
                          <a
                            className="font-bold text-blue-700 underline"
                            href="https://www.uscis.gov/i-9-central/form-i-9-resources/handbook-for-employers-m-274/130-acceptable-documents-for-verifying-employment-authorization-and-identity/133-list-c-documents-that-establish-employment-authorization"
                          >
                            Section 13
                          </a>{" "}
                          of the M-274 on{" "}
                          <a
                            className="font-bold text-blue-700 underline"
                            href="https://www.uscis.gov/i-9-central"
                          >
                            uscis.gov/i-9-central.
                          </a>
                        </span>

                        <br />
                        <br />

                        <span>
                          The Form I-766, Employment Authorization Document, is
                          a List A, <b>Item Number 4.</b> document, not a List C
                          document.
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* LIST A ITEMS */}
                  <tr>
                    <td className="border border-gray-500 align-top">
                      <DocumentItem
                        number="2."
                        text="Permanent Resident Card or Alien Registration Receipt Card (Form I-551)"
                      />
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td className="border border-gray-500 align-top">
                      <DocumentItem
                        number="3."
                        text="Foreign passport that contains a temporary I-551 stamp or temporary I-551 printed notation on a machine-readable immigrant visa"
                      />
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td className="border border-gray-500 align-top">
                      <DocumentItem
                        number="4."
                        text="Employment Authorization Document that contains a photograph (Form I-766)"
                      />
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td className="border border-gray-500 align-top">
                      <DocumentItem
                        number="5."
                        text="For an individual temporarily authorized to work for a specific employer because of his or her status or parole: a. Foreign passport; and b. Form I-94 or Form I-94A that has the required endorsement."
                      />
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td className="border border-gray-500 align-top">
                      <DocumentItem
                        number="6."
                        text="Passport from the Federated States of Micronesia (FSM) or the Republic of the Marshall Islands (RMI) with Form I-94 or Form I-94A indicating nonimmigrant admission under the Compact of Free Association."
                      />
                    </td>
                    <td></td>
                  </tr>

                  {/* Acceptable Receipts */}
                  <tr>
                    <td
                      colSpan={4}
                      className="border-t border-gray-500 px-3 sm:px-6 md:px-10 lg:px-[50px] py-3 text-center"
                    >
                      <h2 className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15.4px] font-bold">
                        Acceptable Receipts
                      </h2>

                      <h3 className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[13.4px] leading-tight">
                        May be presented in lieu of a document listed above for
                        a temporary period. For receipt validity dates, see the
                        M-274.
                      </h3>
                    </td>
                  </tr>

                  {/* Receipts */}
                  <tr>
                    <td className="border border-gray-500 align-top">
                      <ReceiptItem text="Receipt for a replacement of a lost, stolen, or damaged List A document." />

                      <ReceiptItem text="Form I-94 issued to a lawful permanent resident that contains an I-551 stamp and a photograph of the individual." />

                      <ReceiptItem text="Form I-94 with “RE” notation or refugee stamp issued to a refugee." />
                    </td>

                    <td className="border border-gray-500 text-center text-[10px] sm:text-[11px] md:text-[12px]">
                      <b>OR</b>
                    </td>

                    <td
                      rowSpan={3}
                      className="border border-gray-500 align-top"
                    >
                      <ReceiptItem text="Receipt for a replacement of a lost, stolen, or damaged List B document." />
                    </td>

                    <td
                      rowSpan={3}
                      className="border border-gray-500 align-top"
                    >
                      <ReceiptItem text="Receipt for a replacement of a lost, stolen, or damaged List C document." />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="border-b border-black py-2 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] leading-tight">
              *Refer to the Employment Authorization Extensions page on{" "}
              <a
                className="font-bold text-blue-700 underline"
                href="https://www.uscis.gov/i-9-central/form-i-9-acceptable-documents/employment-authorization-extensions"
              >
                I-9 Central
              </a>{" "}
              for more information.
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between pt-2 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px]">
              <span>Form I-9 Edition 01/20/25</span>
              <span>Page 2 of 4</span>
            </div>
          </div>
        </div>
        <br />

        <div className="font-[arial] mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <div className="mx-auto">
            {/* Header */}
            <div className="">
              <div className="flex items-start justify-between py-2">
                <div className="w-[100px]">
                  <div className="mt-[30px] mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border-[3px] border-black text-center text-[8px] font-bold leading-tight">
                    <img src="/homeland.webp" />
                  </div>
                </div>

                <div className="font-['Times_New_Roman'] flex-1 text-center">
                  <h1 className="text-[18px] font-bold">
                    Supplement A,
                    <br />
                    Preparer and/or Translator Certification for Section 1
                  </h1>
                  <h2 className="text-[17px] font-bold">
                    Department of Homeland Security
                  </h2>
                  <p className="text-[15px]">
                    U.S. Citizenship and Immigration Services
                  </p>
                </div>

                <div className="w-[120px] text-[15px] font-['Times_New_Roman'] text-center">
                  <div className=" font-bold">USCIS</div>
                  <div className=" font-bold">Form I-9</div>
                  <div className=" font-bold">Supplement A</div>
                  <div className="text-[10.7px]">OMB No. 1615-0047</div>
                  <div className="text-[10.7px]">Expires 05/31/2027</div>
                </div>
              </div>
            </div>

            <div className="border-t-[5px] mb-[2px] border-black font-['Times_New_Roman']" />
            <div className="border-t-[1px] border-black font-['Times_New_Roman']" />

            <table className="mt-2 font-[arial] border-collapse w-full">
              <tr>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Last Name <i>(Family Name)</i> from <b>Section 1.</b>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    First Name <i>(Given Name)</i> from <b>Section 1.</b>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Middle initial (if any) from <b>Section 1.</b>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>
            </table>

            {/* Top Instructions */}
            <div className="py-2 text-[12px] leading-tight">
              <b>Instructions:</b> This supplement must be completed by any
              preparer and/or translator who assists an employee in completing
              Section 1 of Form I-9. The preparer and/or translator must enter
              the employee's name in the spaces provided above. Each preparer or
              translator must complete, sign, and date a separate certification
              area. Employers must retain completed supplement sheets with the
              employee's completed Form I-9.
            </div>

            <div className="pt-2 text-[12px] leading-tight">
              <b>
                I attest, under penalty of perjury, that I have assisted in the
                completion of Section 1 of this form and that to the best of my
                knowledge the information is true and correct.
              </b>
            </div>

            <table className="mt-2 mb-4 font-[arial] border-collapse w-full">
              <tr>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Signature of Preparer or Translator
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Date <i>(mm/dd/yyyy)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Last Name <i>(Family Name)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    First Name <i>(Given Name)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Middle Initial <i>(if any)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Address <i>(Street Number and Name) </i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    City or Town
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    State
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    ZIP Code
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>
            </table>

            <div className="pt-2 text-[12px] leading-tight">
              <b>
                I attest, under penalty of perjury, that I have assisted in the
                completion of Section 1 of this form and that to the best of my
                knowledge the information is true and correct.
              </b>
            </div>

            <table className="mt-2 mb-4 font-[arial] border-collapse w-full">
              <tr>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Signature of Preparer or Translator
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Date <i>(mm/dd/yyyy)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Last Name <i>(Family Name)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    First Name <i>(Given Name)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Middle Initial <i>(if any)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Address <i>(Street Number and Name) </i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    City or Town
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    State
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    ZIP Code
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>
            </table>

            <div className="pt-2 text-[12px] leading-tight">
              <b>
                I attest, under penalty of perjury, that I have assisted in the
                completion of Section 1 of this form and that to the best of my
                knowledge the information is true and correct.
              </b>
            </div>

            <table className="mt-2 mb-4 font-[arial] border-collapse w-full">
              <tr>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Signature of Preparer or Translator
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Date <i>(mm/dd/yyyy)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Last Name <i>(Family Name)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    First Name <i>(Given Name)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Middle Initial <i>(if any)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Address <i>(Street Number and Name) </i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    City or Town
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    State
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    ZIP Code
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>
            </table>

            <div className="pt-2 text-[12px] leading-tight">
              <b>
                I attest, under penalty of perjury, that I have assisted in the
                completion of Section 1 of this form and that to the best of my
                knowledge the information is true and correct.
              </b>
            </div>

            <table className="mt-2 mb-4 font-[arial] border-collapse w-full">
              <tr>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Signature of Preparer or Translator
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Date <i>(mm/dd/yyyy)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Last Name <i>(Family Name)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    First Name <i>(Given Name)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Middle Initial <i>(if any)</i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    Address <i>(Street Number and Name) </i>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    City or Town
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    State
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[10.7px] p-1">
                    ZIP Code
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>
            </table>

            {/* Footer */}
            <div className="border-b border-black py-2 text-[12px]"></div>

            <div className="flex justify-between pt-2 text-[11px]">
              <span>Form I-9 Edition 01/20/25</span>
              <span>Page 3 of 4</span>
            </div>
          </div>
        </div>
        <br />

        <div className="font-[arial] mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <div className="mx-auto">
            {/* Header */}
            <div className="">
              <div className="flex items-start justify-between py-2">
                <div className="w-[100px]">
                  <div className="mt-[30px] mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border-[3px] border-black text-center text-[8px] font-bold leading-tight">
                    <img src="/homeland.webp" />
                  </div>
                </div>

                <div className="font-['Times_New_Roman'] flex-1 text-center">
                  <h1 className="text-[18px] font-bold">
                    Supplement B,
                    <br />
                    Reverification and Rehire (formerly Section 3)
                  </h1>
                  <h2 className="text-[17px] font-bold">
                    Department of Homeland Security
                  </h2>
                  <p className="text-[15px]">
                    U.S. Citizenship and Immigration Services
                  </p>
                </div>

                <div className="w-[120px] text-[15px] font-['Times_New_Roman'] text-center">
                  <div className=" font-bold">USCIS</div>
                  <div className=" font-bold">Form I-9</div>
                  <div className=" font-bold">Supplement A</div>
                  <div className="text-[10.7px]">OMB No. 1615-0047</div>
                  <div className="text-[10.7px]">Expires 05/31/2027</div>
                </div>
              </div>
            </div>

            <div className="border-t-[5px] mb-[2px] border-black font-['Times_New_Roman']" />
            <div className="border-t-[1px] border-black font-['Times_New_Roman']" />

            <table className="mt-2 font-[arial] border-collapse w-full">
              <tr>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Last Name <i>(Family Name)</i> from <b>Section 1.</b>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    First Name <i>(Given Name)</i> from <b>Section 1.</b>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Middle initial (if any) from <b>Section 1.</b>
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>
            </table>

            {/* Top Instructions */}
            <div className="py-2 text-[12px] leading-tight">
              <b>
                Instructions: This supplement replaces Section 3 on the previous
                version of Form I-9. Only use this page if your employee
                requires reverification, is rehired within three years of the
                date the original Form I-9 was completed, or provides proof of a
                legal name change. Enter the employee's name in the fields
                above. Use a new section for each reverification or rehire.
                Review the Form I-9 instructions before completing this page.
                Keep this page as part of the employee's Form I-9 record.
                Additional guidance can be found in the
                <br />
                <a
                  href="https://www.uscis.gov/i-9-central/form-i-9-resources/handbook-for-employers-m-274"
                  className="font-bold text-blue-700 underline"
                >
                  Handbook for Employers: Guidance for Completing Form I-9
                  (M-274)
                </a>
              </b>
            </div>

            <table className="mt-2 font-[arial] border-collapse w-full">
              <tr className="bg-gray-200">
                <td className="text-[9.4px] border border-gray-500">
                  Date of Rehire <i>(if applicable)</i>
                </td>
                <td className="text-[9.4px] border border-gray-500" colSpan="3">
                  New Name (if applicable)
                </td>
              </tr>
              <tr className="bg-gray-300">
                <td
                  colSpan="4"
                  className="border border-gray-500 text-[10.7px]"
                >
                  Reverification: If the employee requires reverification, your
                  employee can choose to present any acceptable List A or List C
                  documentation to show continued employment authorization.
                  Enter the document information in the spaces below.
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-normal text-[9.4px] p-1">
                    Document Title
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Document Number (if any)
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Expiration Date (if any) (mm/dd/yyyy)
                    <br />
                    <input
                      type="date"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>

              <tr className="">
                <td colSpan="3" className="border border-gray-500 text-[10px]">
                  <b>
                    I attest, under penalty of perjury, that to the best of my
                    knowledge, this employee is authorized to work in the United
                    States, and if the employee presented documentation, the
                    documentation I examined appears to be genuine and to relate
                    to the individual who presented it.
                  </b>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-normal text-[9.4px] p-1">
                    Name of Employer or Authorized Representative
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td colSpan="1" className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Signature of Employer or Authorized Representative
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>

                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Today's Date (mm/dd/yyyy)
                    <br />
                    <input
                      type="date"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-normal text-[9.4px] p-1">
                    Additional Information (Initial and date each notation.)
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>

                <td className="border border-gray-500">
                  <div className=" flex text-[9.4px] p-1">
                    <input
                      type="checkbox"
                      className="w-[2%]  mr-1 border border-gray-500 p-1 w-full"
                    />
                    Check here if you used an alternative procedure authorized
                    by DHS to examine documents.
                  </div>
                </td>
              </tr>
            </table>
            <table className="mt-2 font-[arial] border-collapse w-full">
              <tr className="bg-gray-200">
                <td className="text-[9.4px] border border-gray-500">
                  Date of Rehire <i>(if applicable)</i>
                </td>
                <td className="text-[9.4px] border border-gray-500" colSpan="3">
                  New Name (if applicable)
                </td>
              </tr>
              <tr className="bg-gray-300">
                <td
                  colSpan="4"
                  className="border border-gray-500 text-[10.7px]"
                >
                  Reverification: If the employee requires reverification, your
                  employee can choose to present any acceptable List A or List C
                  documentation to show continued employment authorization.
                  Enter the document information in the spaces below.
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-normal text-[9.4px] p-1">
                    Document Title
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Document Number (if any)
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Expiration Date (if any) (mm/dd/yyyy)
                    <br />
                    <input
                      type="date"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>

              <tr className="">
                <td colSpan="3" className="border border-gray-500 text-[10px]">
                  <b>
                    I attest, under penalty of perjury, that to the best of my
                    knowledge, this employee is authorized to work in the United
                    States, and if the employee presented documentation, the
                    documentation I examined appears to be genuine and to relate
                    to the individual who presented it.
                  </b>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-normal text-[9.4px] p-1">
                    Name of Employer or Authorized Representative
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td colSpan="1" className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Signature of Employer or Authorized Representative
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>

                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Today's Date (mm/dd/yyyy)
                    <br />
                    <input
                      type="date"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-normal text-[9.4px] p-1">
                    Additional Information (Initial and date each notation.)
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>

                <td className="border border-gray-500">
                  <div className=" flex text-[9.4px] p-1">
                    <input
                      type="checkbox"
                      className="w-[2%]  mr-1 border border-gray-500 p-1 w-full"
                    />
                    Check here if you used an alternative procedure authorized
                    by DHS to examine documents.
                  </div>
                </td>
              </tr>
            </table>
            <table className="mt-2 font-[arial] border-collapse w-full">
              <tr className="bg-gray-200">
                <td className="text-[9.4px] border border-gray-500">
                  Date of Rehire <i>(if applicable)</i>
                </td>
                <td className="text-[9.4px] border border-gray-500" colSpan="3">
                  New Name (if applicable)
                </td>
              </tr>
              <tr className="bg-gray-300">
                <td
                  colSpan="4"
                  className="border border-gray-500 text-[10.7px]"
                >
                  Reverification: If the employee requires reverification, your
                  employee can choose to present any acceptable List A or List C
                  documentation to show continued employment authorization.
                  Enter the document information in the spaces below.
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-normal text-[9.4px] p-1">
                    Document Title
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Document Number (if any)
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Expiration Date (if any) (mm/dd/yyyy)
                    <br />
                    <input
                      type="date"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>

              <tr className="">
                <td colSpan="3" className="border border-gray-500 text-[10px]">
                  <b>
                    I attest, under penalty of perjury, that to the best of my
                    knowledge, this employee is authorized to work in the United
                    States, and if the employee presented documentation, the
                    documentation I examined appears to be genuine and to relate
                    to the individual who presented it.
                  </b>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-500">
                  <div className="text-normal text-[9.4px] p-1">
                    Name of Employer or Authorized Representative
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
                <td colSpan="1" className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Signature of Employer or Authorized Representative
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>

                <td className="border border-gray-500">
                  <div className="text-[9.4px] p-1">
                    Today's Date (mm/dd/yyyy)
                    <br />
                    <input
                      type="date"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="border border-gray-500">
                  <div className="text-normal text-[9.4px] p-1">
                    Additional Information (Initial and date each notation.)
                    <br />
                    <input
                      type="text"
                      className="border border-gray-500 p-1 w-full"
                    />
                  </div>
                </td>

                <td className="border border-gray-500">
                  <div className=" flex text-[9.4px] p-1">
                    <input
                      type="checkbox"
                      className=" mr-1 border border-gray-500 p-1 w-full"
                    />
                    Check here if you used an alternative procedure authorized
                    by DHS to examine documents.
                  </div>
                </td>
              </tr>
            </table>
            <div className="border-b border-black py-2 text-[12px]"></div>

            <div className="flex justify-between pt-2 text-[11px]">
              <span>Form I-9 Edition 01/20/25</span>
              <span>Page 4 of 4</span>
            </div>
          </div>
        </div>
        <br />
        <div className="font-[Arial] mx-auto w-full max-w-[210mm] min-h-screen overflow-hidden bg-white px-2 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.25)] sm:px-4 sm:py-5 md:px-6 lg:px-[17mm] lg:py-[17mm]">
          {/* =========================
      PAGE 1
  ========================== */}

          {/* Header */}
          <div className="grid grid-cols-[75px_minmax(0,1fr)_80px] border-b-2 border-black sm:grid-cols-[90px_minmax(0,1fr)_110px] lg:grid-cols-[100px_minmax(0,1fr)_140px]">
            {/* Form W-4 */}
            <div className="relative flex pr-1 sm:pr-2">
              <div className="relative">
                <div className="flex items-baseline">
                  <span className="mr-1 text-[7px] sm:text-[8px] lg:text-[8.7px]">
                    Form
                  </span>

                  <span className="text-[25px] font-black leading-none sm:text-[30px] lg:text-[36px]">
                    W-4
                  </span>
                </div>

                <div className="mt-2 text-[6px] leading-[1.05] sm:mt-3 sm:text-[7px] lg:mt-4 lg:text-[7.7px]">
                  Department of the Treasury
                  <br />
                  Internal Revenue Service
                </div>
              </div>
            </div>

            {/* Center Header */}
            <div className="border-l border-r border-black px-1 text-center sm:px-2 lg:px-3">
              <h1 className="m-0 text-[11px] font-black leading-tight sm:text-[15px] lg:text-[18px]">
                Employee’s Withholding Certificate
              </h1>

              <p className="mt-1 mb-0 text-[7px] font-bold leading-tight sm:text-[9px] lg:text-[10.7px]">
                Complete Form W-4 so that your employer can withhold the correct
                federal income tax from your pay.
              </p>

              <p className="mt-1 mb-0 text-[8px] font-bold leading-tight sm:text-[10px] lg:text-[13px]">
                Give Form W-4 to your employer.
              </p>

              <p className="mt-1 mb-1 text-[7px] font-bold leading-tight sm:text-[9px] lg:text-[12px]">
                Your withholding is subject to review by the IRS.
              </p>
            </div>

            {/* Year */}
            <div className="min-w-0 text-center">
              <div className="border-b border-black pb-1 text-[6px] sm:text-[8px] lg:text-[9.4px]">
                OMB No. 1545-0074
              </div>

              <div className="pt-2 text-[18px] font-black leading-none sm:pt-3 sm:text-[23px] lg:text-[26.7px]">
                2026
              </div>
            </div>
          </div>

          {/* =========================
      STEP 1
  ========================== */}

          <div className="grid grid-cols-[75px_minmax(0,1fr)] border-b border-black sm:grid-cols-[90px_minmax(0,1fr)] lg:grid-cols-[100px_minmax(0,1fr)]">
            {/* Step Label */}
            <div className="border-r border-black py-2 pr-1 sm:pr-2">
              <div className="text-[10px] font-black sm:text-[12px] lg:text-[13.4px]">
                Step 1:
              </div>

              <div className="mt-2 text-[10px] font-black leading-tight sm:mt-3 sm:text-[12px] lg:text-[13.4px]">
                Enter
                <br />
                Personal
                <br />
                Information
              </div>
            </div>

            <div>
              {/* Name / SSN */}
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_100px] border-b border-black text-[7px] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_135px] sm:text-[8.5px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_170px] lg:text-[9.4px]">
                <div className="min-h-[38px] border-r border-black px-1 pt-1 sm:min-h-[42px] sm:px-2">
                  <span className="mr-1 font-bold sm:mr-2">(a)</span>
                  First name and middle initial
                </div>

                <div className="min-h-[38px] border-r border-black px-1 pt-1 sm:min-h-[42px] sm:px-2">
                  Last name
                </div>

                <div className="min-w-0 px-1 pt-1 sm:px-2">
                  <span className="font-bold">(b)</span>{" "}
                  <span className="font-bold">Social security number</span>
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-[minmax(0,1fr)_105px] border-b border-black text-[7px] sm:grid-cols-[minmax(0,1fr)_135px] sm:text-[8.5px] lg:grid-cols-[minmax(0,1fr)_170px] lg:text-[9.4px]">
                {/* Left */}
                <div className="border-r border-black">
                  <div className="border-b border-black px-1 py-2 sm:px-2">
                    Address
                  </div>

                  <div className="px-1 py-2 sm:px-2">
                    City or town, state, and ZIP code
                  </div>
                </div>

                {/* Right */}
                <div className="px-1 pt-0 pb-2 text-[7px] leading-[1.05] sm:px-2 sm:text-[8.5px] lg:text-[10px]">
                  <strong>
                    Does your name match the
                    <br />
                    name on your social security
                    <br />
                    card?
                  </strong>{" "}
                  If not, to ensure you get
                  <br />
                  credit for your earnings,
                  <br />
                  contact SSA at 800-772-1213
                  <br />
                  or go to <i>www.ssa.gov</i>.
                </div>
              </div>

              {/* Filing Status */}
              <div className="py-2 text-[7px] sm:text-[8.5px] lg:text-[9.4px]">
                <div className="mb-1">
                  <span className="mr-2 font-bold">(c)</span>

                  <span className="inline-flex items-center">
                    <strong>
                      <input
                        type="checkbox"
                        className="mr-1 h-3 w-3 align-middle"
                      />
                      Single or Married filing separately
                    </strong>
                  </span>
                </div>

                <div className="mb-1 ml-4 sm:ml-5">
                  <strong>
                    <input
                      type="checkbox"
                      className="mr-1 h-3 w-3 align-middle"
                    />
                    Married filing jointly or Qualifying surviving spouse
                  </strong>
                </div>

                <div className="ml-4 sm:ml-5">
                  <strong>
                    <input
                      type="checkbox"
                      className="mr-1 h-3 w-3 align-middle"
                    />
                    Head of household
                  </strong>{" "}
                  <span>
                    (Check only if you’re unmarried and pay more than half the
                    costs of keeping up a home for yourself and a qualifying
                    individual.)
                  </span>
                </div>

                {/* Caution */}
                <div className="mt-2 border-t border-black pt-1">
                  <strong>Caution:</strong> To claim certain credits or
                  deductions on your tax return, you (and/or your spouse if
                  married filing jointly) are required to have a social security
                  number valid for employment. See page 2 for more information.
                </div>
              </div>
            </div>
          </div>

          {/* =========================
      TIP
  ========================== */}

          <div className="border-b border-black py-2">
            <p className="m-0 text-[8px] leading-[1.15] sm:text-[9.5px] lg:text-[11px]">
              <strong>TIP:</strong> Consider using the estimator at{" "}
              <strong>
                <i>www.irs.gov/W4App</i>
              </strong>{" "}
              to determine the most accurate withholding for the rest of the
              year if you are completing this form after the beginning of the
              year; expect to work only part of the year; or have changes during
              the year in your marital status, number of jobs for you (and/or
              your spouse if married filing jointly), dependents, other income
              (not from jobs), deductions, or credits. Have your most recent pay
              stub(s) from this year available when using the estimator. At the
              beginning of next year, use the estimator again to recheck your
              withholding.
            </p>

            <p className="mt-2 mb-0 text-[8px] font-bold sm:text-[9.5px] lg:text-[11px]">
              Complete Steps 2–4 ONLY if they apply to you; otherwise, skip to
              Step 5. See page 2 for more information on each step, who can
              claim exemption from withholding, and when to use the estimator at{" "}
              <i>www.irs.gov/W4App</i>.
            </p>
          </div>

          {/* =========================
      STEP 2
  ========================== */}

          <div className="grid grid-cols-[75px_minmax(0,1fr)] py-2 sm:grid-cols-[90px_minmax(0,1fr)] lg:grid-cols-[100px_minmax(0,1fr)]">
            <div className="pr-1 sm:pr-2">
              <div className="text-[10px] font-black sm:text-[12px] lg:text-[13.4px]">
                Step 2:
              </div>

              <div className="mt-2 text-[10px] font-black leading-tight sm:text-[12px] lg:text-[13.4px]">
                Multiple Jobs
                <br />
                or Spouse
                <br />
                Works
              </div>
            </div>

            <div className="pl-2 text-[8px] sm:pl-3 sm:text-[9.5px] lg:text-[11px]">
              <p className="m-0">
                Complete this step if you (1) hold more than one job at a time,
                or (2) are married filing jointly and your spouse also works.
                The correct amount of withholding depends on income earned from
                all of these jobs.
              </p>

              <p className="mt-2 mb-1 font-bold">
                Do only one of the following.
              </p>

              <div className="mb-1">
                <strong>(a)</strong> Use the estimator at{" "}
                <i>www.irs.gov/W4App</i> for the most accurate withholding for
                this step (and Steps 3–4). If you or your spouse have
                self-employment income, use this option; or
              </div>

              <div className="mb-1">
                <strong>(b)</strong> Use the Multiple Jobs Worksheet on page 3
                and enter the result in Step 4(c) below; or
              </div>

              <div>
                <strong>(c)</strong> If there are only two jobs total, you may
                check this box. Do the same on Form W-4 for the other job. This
                option is generally more accurate than Step 2(b) if pay at the
                lower paying job is more than half of the pay at the higher
                paying job. Otherwise, Step 2(b) is more accurate . . . . . . .
                . . . . . . . .
                <input type="checkbox" className="ml-1 h-3 w-3 align-middle" />
              </div>
            </div>
          </div>

          {/* Steps 3-4 Notice */}
          <div className="border-b border-black py-1 text-[7.5px] sm:text-[9px] lg:text-[10px]">
            <strong>
              Complete Steps 3–4(b) on Form W-4 for only ONE of these jobs.
            </strong>{" "}
            Leave those steps blank for the other jobs. (Your withholding will
            be most accurate if you complete Steps 3–4(b) on the Form W-4 for
            the highest paying job.)
          </div>

          {/* =========================
      STEP 3
  ========================== */}

          <div className="grid grid-cols-[75px_minmax(0,1fr)_75px] border-b border-black sm:grid-cols-[90px_minmax(0,1fr)_95px] lg:grid-cols-[100px_minmax(0,1fr)_120px]">
            <div className="border-r border-black py-2 pr-1 sm:pr-2">
              <div className="text-[10px] font-black sm:text-[12px] lg:text-[13.4px]">
                Step 3:
              </div>

              <div className="mt-2 text-[10px] font-black leading-tight sm:text-[12px] lg:text-[13.4px]">
                Claim
                <br />
                Dependent
                <br />
                and Other
                <br />
                Credits
              </div>
            </div>

            <div className="px-2 py-2 text-[8px] sm:px-3 sm:text-[9.5px] lg:text-[11px]">
              <p className="m-0">
                If your total income will be $200,000 or less ($400,000 or less
                if married filing jointly):
              </p>

              <div className="mt-2">
                <strong>(a)</strong> Multiply the number of qualifying children
                under age 17 by $2,200.
              </div>

              <div className="mt-2">
                <strong>(b)</strong> Multiply the number of other dependents by
                $500.
              </div>

              <div className="mt-2">
                Add the amounts from Steps 3(a) and 3(b), plus the amount for
                other credits. Enter the total here.
              </div>
            </div>

            <div className="border-l border-black text-[8px] sm:text-[9.5px] lg:text-[11px]">
              <div className="border-b border-black px-1 py-3 sm:px-2">
                <strong>3(a)</strong> $
              </div>

              <div className="border-b border-black px-1 py-3 sm:px-2">
                <strong>3(b)</strong> $
              </div>

              <div className="px-1 py-3 sm:px-2">
                <strong>3</strong> $
              </div>
            </div>
          </div>

          {/* =========================
      STEP 4
  ========================== */}

          <div className="grid grid-cols-[75px_minmax(0,1fr)_75px] border-b border-black sm:grid-cols-[90px_minmax(0,1fr)_95px] lg:grid-cols-[100px_minmax(0,1fr)_120px]">
            <div className="border-r border-black py-2 pr-1 sm:pr-2">
              <div className="text-[10px] font-black sm:text-[12px] lg:text-[13.4px]">
                Step 4:
              </div>

              <div className="mt-2 text-[10px] font-black leading-tight sm:text-[12px] lg:text-[13.4px]">
                Other
                <br />
                Adjustments
              </div>
            </div>

            <div className="px-2 py-2 text-[8px] sm:px-3 sm:text-[9.5px] lg:text-[11px]">
              <div className="mb-3">
                <strong>(a) Other income (not from jobs).</strong> If you want
                tax withheld for other income you expect this year that won’t
                have withholding, enter the amount of other income here. This
                may include interest, dividends, and retirement income.
              </div>

              <div className="mb-3">
                <strong>(b) Deductions.</strong> Use the Deductions Worksheet on
                page 4 to determine the amount of deductions you may claim,
                which will reduce your withholding. (If you skip this line, your
                withholding will be based on the standard deduction.)
              </div>

              <div>
                <strong>(c) Extra withholding.</strong> Enter any additional tax
                you want withheld each pay period.
              </div>
            </div>

            <div className="border-l border-black text-[8px] sm:text-[9.5px] lg:text-[11px]">
              <div className="border-b border-black px-1 py-4 sm:px-2">
                <strong>4(a)</strong> $
              </div>

              <div className="border-b border-black px-1 py-4 sm:px-2">
                <strong>4(b)</strong> $
              </div>

              <div className="px-1 py-4 sm:px-2">
                <strong>4(c)</strong> $
              </div>
            </div>
          </div>

          {/* =========================
      EXEMPT
  ========================== */}

          <div className="grid grid-cols-[75px_minmax(0,1fr)_20px] border-b border-black sm:grid-cols-[90px_minmax(0,1fr)_25px] lg:grid-cols-[100px_minmax(0,1fr)_25px]">
            <div className="border-r border-black py-2 pr-1 text-[7.5px] font-bold sm:pr-2 sm:text-[9px] lg:text-[10px]">
              Exempt from
              <br />
              withholding
            </div>

            <div className="px-1 py-2 text-[7.5px] sm:px-2 sm:text-[9px] lg:text-[10px]">
              I claim exemption from withholding for 2026, and I certify that I
              meet both of the conditions for exemption for 2026. See{" "}
              <i>Exemption from withholding</i> on page 2. I understand I will
              need to submit a new Form W-4 for 2027.
            </div>

            <div className="flex items-center justify-center">
              <span className="inline-block h-3 w-3 border border-black sm:h-4 sm:w-4" />
            </div>
          </div>

          {/* =========================
      STEP 5
  ========================== */}

          <div className="grid grid-cols-[75px_minmax(0,1fr)] border-b border-black sm:grid-cols-[90px_minmax(0,1fr)] lg:grid-cols-[100px_minmax(0,1fr)]">
            <div className="border-r border-black py-2 pr-1 sm:pr-2">
              <div className="text-[10px] font-black sm:text-[12px] lg:text-[13.4px]">
                Step 5:
              </div>

              <div className="mt-2 text-[10px] font-black leading-tight sm:text-[12px] lg:text-[13.4px]">
                Sign
                <br />
                Here
              </div>
            </div>

            <div className="px-2 py-2 text-[8px] sm:px-3 sm:text-[9px] lg:text-[10px]">
              <p className="m-0">
                Under penalties of perjury, I declare that this certificate, to
                the best of my knowledge and belief, is true, correct, and
                complete.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_120px] sm:gap-5 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-6">
                <div>
                  <div className="h-[20px] border-b border-black" />

                  <div className="mt-1 font-bold">
                    Employee’s signature{" "}
                    <span className="font-normal">
                      (This form is not valid unless you sign it.)
                    </span>
                  </div>
                </div>

                <div>
                  <div className="h-[20px] border-b border-black" />

                  <div className="mt-1 font-bold">Date</div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================
      EMPLOYER
  ========================== */}

          <div className="grid grid-cols-[75px_minmax(0,1fr)_75px_100px] border-b border-black sm:grid-cols-[90px_minmax(0,1fr)_100px_140px] lg:grid-cols-[100px_minmax(0,1fr)_130px_190px]">
            <div className="border-r border-black py-2 pr-1 text-[10px] font-black leading-tight sm:pr-2 sm:text-[11px] lg:text-[13.4px]">
              Employers
              <br />
              Only
            </div>

            <div className="border-r border-black px-1 py-2 text-[7px] sm:px-2 sm:text-[9px] lg:text-[10px]">
              Employer’s name and address
            </div>

            <div className="border-r border-black px-1 py-2 text-[7px] sm:px-2 sm:text-[9px] lg:text-[10px]">
              First date of
              <br />
              employment
            </div>

            <div className="px-1 py-2 text-[7px] sm:px-2 sm:text-[9px] lg:text-[10px]">
              Employer identification
              <br />
              number (EIN)
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-1 pt-2 text-[7px] font-bold sm:flex-row sm:items-center sm:justify-between sm:text-[8px] lg:text-[9px]">
            <div>
              For Privacy Act and Paperwork Reduction Act Notice, see page 4.
            </div>

            <div className="font-normal">Cat. No. 10220Q</div>

            <div className="font-normal">Form W-4 (2026) Created 12/8/25</div>
          </div>
        </div>

        <br />

        {/* =====================================================
    PAGE 2
===================================================== */}

        <div className="font-[Arial] mx-auto w-full max-w-[210mm] min-h-screen overflow-hidden bg-white px-2 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.25)] sm:px-4 sm:py-5 md:px-6 lg:px-[17mm] lg:py-[17mm]">
          {/* Page Header */}
          <div className="mb-3 flex items-center justify-between border-b-2 border-black pb-1 text-[8px] sm:text-[10px] lg:text-[11px]">
            <span>Form W-4 (2026)</span>

            <span>Page 2</span>
          </div>

          {/* Main Two Columns */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-[0.35in]">
            {/* =========================
        LEFT COLUMN
    ========================== */}

            <div className="text-[9px] leading-[1.08] sm:text-[10px] lg:text-[11px]">
              <h1 className="mb-1 text-[14px] font-black leading-none sm:text-[16px] lg:text-[17px]">
                General Instructions
              </h1>

              <p className="mb-2 text-[9px] leading-tight sm:text-[10px] lg:text-[11px]">
                Section references are to the Internal Revenue Code unless
                otherwise noted.
              </p>

              <h2 className="mb-1 text-[14px] font-black leading-none sm:text-[15px] lg:text-[16px]">
                Future Developments
              </h2>

              <p className="mb-2">
                For the latest information about developments related to Form
                W-4, such as legislation enacted after it was published, go to{" "}
                <strong>
                  <i>www.irs.gov/FormW4</i>
                </strong>
                .
              </p>

              <h2 className="mb-1 text-[14px] font-black leading-none sm:text-[16px] lg:text-[17px]">
                Purpose of Form
              </h2>

              <p className="mb-2">
                Complete Form W-4 so that your employer can withhold the correct
                federal income tax from your pay. If too little is withheld, you
                will generally owe tax when you file your tax return and may owe
                a penalty. If too much is withheld, you will generally be due a
                refund. Complete a new Form W-4 when changes to your personal or
                financial situation would change the entries on the form. For
                more information on withholding and when you must furnish a new
                Form W-4, see Pub. 505, Tax Withholding and Estimated Tax.
              </p>

              <p className="mb-2">
                <strong>Exemption from withholding.</strong> You may claim
                exemption from withholding for 2026 if you meet both of the
                following conditions: you had no federal income tax liability in
                2025 and you expect to have no federal income tax liability in
                2026. You had no federal income tax liability in 2025 if (1)
                your total tax on line 24 on your 2025 Form 1040 or 1040-SR is
                zero (or less than the sum of lines 27a, 28, 29, and 30), or (2)
                you were not required to file a return because your income was
                below the filing threshold for your correct filing status. If
                you claim exemption, you will have no income tax withheld from
                your paycheck and may owe taxes and penalties when you file your
                2026 tax return. To claim exemption from withholding, certify
                that you meet both of the conditions by checking the box in the{" "}
                <i>Exempt from withholding</i> section. Then, complete Steps
                1(a), 1(b), and 5. Do not complete any other steps. You will
                need to submit a new Form W-4 by February 16, 2027.
              </p>

              <p className="mb-2">
                <strong>Your privacy.</strong> Steps 2(c) and 4(a) ask for
                information regarding income you received from sources other
                than the job associated with this Form W-4. If you have concerns
                with providing the information asked for in Step 2(c), you may
                choose Step 2(b) as an alternative; if you have concerns with
                providing the information asked for in Step 4(a), you may enter
                an additional amount you want withheld per pay period in Step
                4(c) as an alternative.
              </p>

              <p className="mb-1">
                <strong>When to use the estimator.</strong> Consider using the
                estimator at{" "}
                <strong>
                  <i>www.irs.gov/W4App</i>
                </strong>{" "}
                if you:
              </p>

              <ol className="mb-2 list-decimal space-y-1 pl-5">
                <li>
                  Are submitting this form after the beginning of the year;
                </li>

                <li>Expect to work only part of the year;</li>

                <li>
                  Have changes during the year in your marital status, number of
                  jobs for you (and/or your spouse if married filing jointly),
                  or number of dependents, or changes in your deductions or
                  credits;
                </li>

                <li>
                  Receive dividends, capital gains, social security, bonuses, or
                  business income, or are subject to the Additional Medicare Tax
                  or Net Investment Income Tax; or
                </li>

                <li>
                  Prefer the most accurate withholding for multiple job
                  situations.
                </li>
              </ol>

              <p className="mb-2">
                <strong>TIP:</strong> Have your most recent pay stub(s) from
                this year available when using the estimator to account for
                federal income tax that has already been withheld this year. At
                the beginning of next year, use the estimator again to recheck
                your withholding.
              </p>

              <p>
                <strong>Self-employment.</strong> Generally, you will owe both
                income and self-employment taxes on any self-employment income
                you receive separate from the wages you receive as an employee.
                If you want to pay these taxes through withholding from your
                wages, use the estimator at{" "}
                <strong>
                  <i>www.irs.gov/W4App</i>
                </strong>{" "}
                to figure the amount to have withheld.
              </p>
            </div>

            {/* =========================
        RIGHT COLUMN
    ========================== */}

            <div className="text-[9px] leading-[1.08] sm:text-[10px] lg:text-[11px]">
              <p className="mb-3">
                <strong>Nonresident alien.</strong> If you’re a nonresident
                alien, see Notice 1392, Supplemental Form W-4 Instructions for
                Nonresident Aliens, before completing this form.
              </p>

              <h1 className="mb-1 text-[14px] font-black leading-none sm:text-[16px] lg:text-[17px]">
                Specific Instructions
              </h1>

              <p className="mb-2">
                <strong>Step 1(c).</strong> Check your anticipated filing
                status. This will determine the standard deduction and tax rates
                used to compute your withholding.
              </p>

              <p className="mb-2">
                <strong>Step 2.</strong> Use this step if you (1) have more than
                one job at the same time, or (2) are married filing jointly and
                you and your spouse both work. Submit a separate Form W-4 for
                each job.
              </p>

              <p className="mb-2 pl-2 sm:pl-4">
                Option <strong>(a)</strong> most accurately calculates the
                additional tax you need to have withheld, while option{" "}
                <strong>(b)</strong> does so with a little less accuracy.
              </p>

              <p className="mb-2 pl-2 sm:pl-4">
                Instead, if you (and your spouse) have a total of only two jobs,
                you may check the box in option <strong>(c)</strong>. The box
                must also be checked on the Form W-4 for the other job. If the
                box is checked, the standard deduction and tax brackets will be
                cut in half for each job to calculate withholding. This option
                is accurate for jobs with similar pay; otherwise, more tax than
                necessary may be withheld, and this extra amount of tax withheld
                will be larger the greater the difference in pay is between the
                two jobs.
              </p>

              {/* CAUTION */}
              <div className="mb-2 flex items-start gap-2 border-t border-b border-black py-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-black text-[7px] font-black text-white sm:h-8 sm:w-8 sm:text-[8px]">
                  ▲
                  <br />
                  CAUTION
                </div>

                <div>
                  <strong>
                    <i>Multiple jobs.</i>
                  </strong>{" "}
                  Complete Steps 3 through 4(b) only on one Form W-4.
                  Withholding will be most accurate if you do this on the Form
                  W-4 for the highest paying job.
                </div>
              </div>

              <p className="mb-2">
                <strong>Step 3.</strong> This step provides instructions for
                determining the amount of the child tax credit and the credit
                for other dependents that you may be able to claim when you file
                your tax return. To qualify for the child tax credit, the child
                must be under age 17 as of December 31, must be your dependent
                who generally lives with you for more than half the year, and
                must have the required social security number. You (and/or your
                spouse if married filing jointly) must have the required social
                security number to claim certain credits. You may be able to
                claim a credit for other dependents for whom a child tax credit
                can’t be claimed, such as an older child or a qualifying
                relative. For additional eligibility requirements for these
                credits, see Pub. 501, Dependents, Standard Deduction, and
                Filing Information. You can also include other tax credits for
                which you are eligible in this step, such as the foreign tax
                credit and the education tax credits. To do so, add an estimate
                of the amount for the year to your credits for dependents and
                enter the total amount in Step 3. Including these credits will
                increase your paycheck and reduce the amount of any refund you
                may receive when you file your tax return.
              </p>

              <h2 className="text-[12px] font-black sm:text-[13px] lg:text-[14px]">
                Step 4.
              </h2>

              <p className="mb-2 pl-2 sm:pl-3">
                <strong>
                  <i>Step 4(a).</i>
                </strong>{" "}
                Enter in this step the total of your other estimated income for
                the year, if any. You shouldn’t include income from any jobs or
                self-employment. If you complete Step 4(a), you likely won’t
                have to make estimated tax payments for that income. If you
                prefer to pay estimated tax rather than having tax on other
                income withheld from your paycheck, see Form 1040-ES, Estimated
                Tax for Individuals.
              </p>

              <p className="mb-2 pl-2 sm:pl-3">
                <strong>
                  <i>Step 4(b).</i>
                </strong>{" "}
                Enter in this step the amount from the Deductions Worksheet,
                line 15, if you expect to claim deductions other than the basic
                standard deduction on your 2026 tax return and want to reduce
                your withholding to account for these deductions. This includes
                both itemized deductions and other deductions such as for
                qualified tips, overtime compensation, student loan interest,
                IRAs, and seniors. You (and/or your spouse if married filing
                jointly) must have the required social security number to claim
                certain deductions. For additional eligibility requirements, see
                Pub. 501.
              </p>

              <p className="pl-2 sm:pl-3">
                <strong>
                  <i>Step 4(c).</i>
                </strong>{" "}
                Enter in this step any additional tax you want withheld from
                your pay each pay period, including any amounts from the
                Multiple Jobs Worksheet, line 4. Entering an amount here will
                reduce your paycheck, and will either increase your refund or
                reduce any amount of tax that you owe when you file your tax
                return.
              </p>
            </div>
          </div>
        </div>
        <br />

        <div className="font-[arial] mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <div className="mx-auto max-w-[1000px]">
            {/* Header */}
            <div className="mb-2 flex items-center justify-between border-b border-black pb-1 text-[12px]">
              <span>Form W-4 (2026)</span>
              <span>Page 3</span>
            </div>

            {/* Title */}
            <div className="mb-5 flex border-b border-black items-center justify-center gap-2">
              <h1 className="text-[13.4px] font-bold">
                Step 2(b)—Multiple Jobs Worksheet
              </h1>
              <span className="text-[13.4px] italic">
                (Keep for your records.)
              </span>
            </div>

            {/* Intro */}
            <div className="text-[12px] leading-[1.35]">
              <p>
                If you choose the option in Step 2(b) on Form W-4, complete this
                worksheet (which calculates the total extra tax for all jobs) on{" "}
                <span className="font-bold">only ONE Form W-4.</span>{" "}
                Withholding will be most accurate if you complete the worksheet
                and enter the result on the Form W-4 for the highest paying job.
                To be accurate, submit a new Form W-4 for all other jobs if you
                have not updated your withholding since 2019.
              </p>

              <p className="text-[12px]">
                <span className="font-bold">Note:</span> If more than one job
                has annual wages of more than $120,000 or there are more than
                three jobs, see Pub. 505 for additional tables; or, you can use
                the online withholding estimator at{" "}
                <span className="font-bold">www.irs.gov/W4App.</span>
              </p>
              <br />
            </div>

            {/* Section 1 */}
            <div className="text-[11.4px] mb-5 grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">1</div>
                <p className="leading-[1.35]">
                  <span className="font-bold">Two jobs.</span> If you have two
                  jobs or you’re married filing jointly and you and your spouse
                  each have one job, find the amount from the appropriate table
                  on page 5. Using the “Higher Paying Job” row and the “Lower
                  Paying Job” column, find the value at the intersection of the
                  two household salaries and enter that value on line 1. Then,{" "}
                  <span className="font-bold">
                    skip to line 3. . . . . . . . .{" "}
                  </span>
                </p>
              </div>

              <div className="text-[11.4px] flex items-end gap-2">
                <span className="font-bold">1</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            {/* Section 2 */}
            <div className="text-[11.4px] mb-5">
              <div className="grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4">
                  <div className="font-bold">2</div>
                  <p className="leading-[1.35]">
                    <span className="font-bold">Three jobs.</span> If you and/or
                    your spouse have three jobs at the same time, complete lines
                    2a, 2b, and 2c below. Otherwise, skip to line 3.
                  </p>
                </div>
              </div>

              {/* 2a */}
              <div className="mt-5 grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">a</div>
                  <p className="leading-[1.35]">
                    Find the amount from the appropriate table on page 5 using
                    the annual wages from the highest paying job in the “Higher
                    Paying Job” row and the annual wages for your next highest
                    paying job in the “Lower Paying Job” column. Find the value
                    at the intersection of the two household salaries and enter
                    that value on line 2a.. . . . . . . . . . . . .
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">2a</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>

              {/* 2b */}
              <div className="mt-5 grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">b</div>
                  <p className="leading-[1.35]">
                    Add the annual wages of the two highest paying jobs from
                    line 2a together and use the total as the wages in the
                    “Higher Paying Job” row and use the annual wages for your
                    third job in the “Lower Paying Job” column to find the
                    amount from the appropriate table on page 5 and enter this
                    amount on line 2b.
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">2b</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>

              {/* 2c */}
              <div className="text-[11.4px] mt-5 grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">c</div>
                  <p className="leading-[1.35]">
                    Add the amounts from lines 2a and 2b and enter the result on
                    line 2c.
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">2c</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="text-[11.4px] mb-5 grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">3</div>
                <p className="leading-[1.35]">
                  Enter the number of pay periods per year for the highest
                  paying job. For example, if that job pays weekly, enter 52; if
                  it pays every other week, enter 26; if it pays monthly, enter
                  12, etc.
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">3</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            {/* Section 4 */}
            <div className="text-[11.4px] mb-4 grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">4</div>
                <p className="leading-[1.35]">
                  Divide the annual amount on line 1 or line 2c by the number of
                  pay periods on line 3. Enter this amount here and in{" "}
                  <span className="font-bold">Step 4(c)</span> of Form W-4 for
                  the highest paying job (plus any other additional amount you
                  want withheld). . . . . . . . . . . . . . . . . . . . . . . .
                  .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">4</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            {/* Bottom border */}
            <div className="mt-4 border-b-2 border-black" />
          </div>
        </div>
        <br />
        <div className="font-[arial] mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <div>
            {/* Header */}
            <div className="mb-2 flex items-center justify-between border-b border-black pb-1 text-[12px]">
              <span>Form W-4 (2026)</span>
              <span>Page 4</span>
            </div>

            {/* Title */}
            <div className="border-b border-black mb-1 flex items-center justify-center gap-2">
              <h1 className="text-[13.4px] font-bold">
                Step 4(b)—Deductions Worksheet (Keep for your records.)
              </h1>
              <span className="text-[13.4px] italic">
                (Keep for your records.)
              </span>
            </div>

            {/* Intro */}
            <div className="text-[11px] leading-[1.35]">
              <p>
                See the Instructions for Schedule 1-A (Form 1040) for more
                information about whether you qualify for the deductions on
                lines 1a, 1b, 1c, 3a, and 3b.
              </p>
            </div>

            {/* Section 1 */}
            <div className="text-[11px] grid grid-cols-[1fr_145px]">
              <div className="flex gap-4">
                <div className="font-bold">1</div>
                <p>
                  Deductions for qualified tips, overtime compensation, and
                  passenger vehicle loan interest.
                  <br />
                  <b> a &nbsp;&nbsp;Qualified tips.</b> If your total income is
                  less than $150,000 ($300,000 if married filing jointly), enter
                  an estimate of your qualified tips up to $25,000 . . . . . . .
                  . . . . . . . . . .
                </p>
              </div>

              <div className="text-[12px] flex items-end gap-2">
                <span className="font-bold">1a</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>

              <div className="flex gap-4">
                <div className="font-bold"></div>
                <p>
                  Deductions for qualified tips, overtime compensation, and
                  passenger vehicle loan interest.
                  <br />
                  <b> b &nbsp;&nbsp;Qualified tips.</b> If your total income is
                  less than $150,000 ($300,000 if married filing jointly), enter
                  an estimate of your qualified tips up to $25,000 . . . . . . .
                  . . . . . . . . . .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">1b</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
              <div className="flex gap-4">
                <div className="font-bold"></div>
                <p>
                  Deductions for qualified tips, overtime compensation, and
                  passenger vehicle loan interest.
                  <br />
                  <b> c &nbsp;&nbsp;Qualified tips.</b> If your total income is
                  less than $150,000 ($300,000 if married filing jointly), enter
                  an estimate of your qualified tips up to $25,000 . . . . . . .
                  . . . . . . . . . .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">1c</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            {/* Section 1 */}
            <div className="text-[11px] grid grid-cols-[1fr_145px]">
              <div className="flex gap-4">
                <div className="font-bold">2</div>
                <p>
                  Add lines 1a, 1b, and 1c. Enter the result here . . . . . . .
                  . . . . . . . . . . . .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">2</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            {/* Section 2 */}
            <div className="text-[10.4px] mb-1">
              <div className="grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4">
                  <div className="font-bold">3</div>
                  <p className="leading-[1.35]">
                    <span className="font-bold">Seniors age 65 or older.</span>
                    If your total income is less than $75,000 ($150,000 if
                    married filing jointly):
                  </p>
                </div>
              </div>

              {/* 2a */}
              <div className=" grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">a</div>
                  <p className="leading-[1.35]">
                    Enter $6,000 if you are age 65 or older before the end of
                    the year . . . . . . . . . . .
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">2a</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>

              {/* 2b */}
              <div className=" grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">b</div>
                  <p className="leading-[1.35]">
                    Enter $6,000 if your spouse is age 65 or older before the
                    end of the year and has a social security number valid for
                    employment . . . . . . . . . . . . . . . . . . . . . . .
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">2b</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="text-[10.4px] grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">3</div>
                <p className="leading-[1.35]">
                  Enter the number of pay periods per year for the highest
                  paying job. For example, if that job pays weekly, enter 52; if
                  it pays every other week, enter 26; if it pays monthly, enter
                  12, etc.
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">3</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            {/* Section 4 */}
            <div className="text-[10.4px] grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">4</div>
                <p className="leading-[1.35]">
                  Add lines 3a and 3b. Enter the result here . . . . . . . . . .
                  . . . . . . . . . .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">4</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            <div className="text-[10.4px] grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">5</div>
                <p className="leading-[1.35]">
                  Enter an estimate of your student loan interest, deductible
                  IRA contributions, educator expenses, alimony paid, and
                  certain other adjustments from Schedule 1 (Form 1040), Part
                  II. See Pub. 505 for more information . . . . . . . . . . . .
                  . . . . . . . . . . . . . . . .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">5</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            <div className="text-[10.4px] mb-1">
              <div className="grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4">
                  <div className="font-bold">6</div>
                  <p className="leading-[1.35]">
                    <span className="font-bold">Itemized deductions.</span>Enter
                    an estimate of your 2026 itemized deductions from Schedule A
                    (Form 1040). Such deductions may include qualifying:
                  </p>
                </div>
              </div>

              {/* 2a */}
              <div className=" grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">a</div>
                  <p className="leading-[1.35]">
                    <span className="font-bold">
                      Medical and dental expenses.
                    </span>{" "}
                    Enter expenses in excess of 7.5% (0.075) of your total
                    income .
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">6a</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>

              {/* 2b */}
              <div className=" grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">b</div>
                  <p className="leading-[1.35]">
                    <b>State and local taxes.</b> If your total income is less
                    than $505,000 ($252,500 if married filing separately), enter
                    state and local taxes paid up to $40,400 ($20,200 if married
                    filing separately) .
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">6b</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>

              <div className=" grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">c</div>
                  <p className="leading-[1.35]">
                    <b>Home mortgage interest.</b> If your home acquisition debt
                    is less than $750,000 ($375,000 if married filing
                    separately), enter your home mortgage interest expense
                    (including mortgage insurance premiums) . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">6c</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>

              <div className=" grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">d</div>
                  <p className="leading-[1.35]">
                    <b>Gifts to charities.</b> Enter contributions in excess of
                    0.5% (0.005) of your total income . . . .
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">6d</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>

              <div className=" grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">e</div>
                  <p className="leading-[1.35]">
                    <b>Other itemized deductions.</b> Enter the amount for other
                    itemized deductions . . . . . . .
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">6e</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>
            </div>

            <div className="text-[10.4px] grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">7</div>
                <p className="leading-[1.35]">
                  Add lines 6a, 6b, 6c, 6d, and 6e. Enter the result here . . .
                  . . . . . . . . . . . . .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">7</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            <div className="text-[10.4px] mb-1">
              <div className="grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4">
                  <div className="font-bold">8</div>
                  <p className="leading-[1.35]">
                    <span className="font-bold">
                      ILimitation on itemized deductions.
                    </span>
                  </p>
                </div>
              </div>

              {/* 2a */}
              <div className=" grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">a</div>
                  <p className="leading-[1.35]">
                    Enter your total income . . . . . . . . . . . . . . . . . .
                    . . . . . . .
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">8a</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>

              {/* 2b */}
              <div className=" grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="font-bold">b</div>
                  <p className="leading-[1.35]">
                    Subtract line 4 from line 8a. If line 4 is greater than line
                    8a, enter -0- here and on line 10. Skip line 9
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">8b</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>
            </div>

            <div className="text-[10.4px] grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">9</div>
                <div className="">Enter:</div>
                <p className="leading-[1.35] flex items-start">
                  <span className="font-normal text-[40px] leading-[1] mx-1">{`{`}</span>

                  <span>
                    • $768700 if you’re married filing jointly or a qualifying
                    surviving spouse
                    <br />
                    • $384350 if you’re married filing separately
                    <br />• $640600 if you’re single or head of household . . .
                    . .
                  </span>

                  <span className="text-[40px] font-normal leading-[1] mx-2">{`}`}</span>
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">9</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            <div className="text-[10.4px] grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">10</div>
                <p className="leading-[1.35]">
                  If line 9 is greater than line 8b, enter the amount from line
                  7. Otherwise, multiply line 7 by 94% (0.94) and enter the
                  result here . . . . . . . . . . . . . . . . . . . . . . . . .
                  .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">10</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            <div className="text-[10.4px] mb-1">
              <div className="grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4">
                  <div className="font-bold">11</div>
                  <p className="leading-[1.35]">
                    <span className="font-bold">Standard deduction.</span>
                  </p>
                </div>
              </div>

              {/* 2a */}
              <div className=" grid grid-cols-[1fr_145px] gap-6">
                <div className="flex gap-4 pl-7">
                  <div className="">Enter:</div>
                  <p className="leading-[1.35]">
                    <p className="leading-[1.35] flex items-start">
                      <span className="font-normal text-[40px] leading-[1] mx-1">{`{`}</span>

                      <span>
                        • $32,200 if you’re married filing jointly or a
                        qualifying surviving spouse
                        <br />
                        • $24,150 if you’re head of household
                        <br />• $16,100 if you’re single or married filing
                        separately
                      </span>

                      <span className="text-[40px] font-normal leading-[1] mx-2">{`}`}</span>
                    </p>
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold">11</span>
                  <span>$</span>
                  <div className="h-6 flex-1 border-b border-black" />
                </div>
              </div>
            </div>

            <div className="text-[10.4px] grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">12</div>
                <p className="leading-[1.35]">
                  Cash gifts to charities. If you take the standard deduction,
                  enter cash contributions up to $1,000 ($2,000 if married
                  filing jointly) . . . . . . . . . . . . . . . . . . . . . . .
                  .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">12</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            <div className="text-[10.4px] grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">13</div>
                <p className="leading-[1.35]">
                  Add lines 11 and 12. Enter the result here . . . . . . . . . .
                  . . . . . . . . . .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">13</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            <div className="text-[10.4px] grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">14</div>
                <p className="leading-[1.35]">
                  If line 10 is greater than line 13, subtract line 11 from line
                  10 and enter the result here. If line 13 is greater than line
                  10, enter the amount from line 12 . . . . . . . . . . . . . .
                  . . .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">14</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>

            <div className="text-[10.4px] grid grid-cols-[1fr_145px] gap-6">
              <div className="flex gap-4">
                <div className="font-bold">15</div>
                <p className="leading-[1.35]">
                  Add lines 2, 4, 5, and 14. Enter the result here and in Step
                  4(b) of Form W-4 . . . . . . . . .
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bold">15</span>
                <span>$</span>
                <div className="h-6 flex-1 border-b border-black" />
              </div>
            </div>
            <div className="h-6 flex-1 border-b border-black" />
            <br />
            <div className="grid grid-cols-2 gap-[0.35in]">
              {/* LEFT COLUMN */}
              <div className="text-[8px] leading-[1.08]">
                <p className="text-[8px] mb-2">
                  <b>Privacy Act and Paperwork Reduction Act Notice.</b> We ask
                  for the information on this form to carry out the Internal
                  Revenue laws of the United States. Internal Revenue Code
                  sections 3402(f)(2) and 6109 and their regulations require you
                  to provide this information; your employer uses it to
                  determine your federal income tax withholding. Failure to
                  provide a properly completed form will result in your being
                  treated as a single person with no other entries on the form;
                  providing fraudulent information may subject you to penalties.
                  Routine uses of this information include giving it to the
                  Department of Justice for civil and criminal litigation; to
                  cities, states, the District of Columbia, and U.S.
                  commonwealths and territories for use in administering their
                  tax laws; and to the Department of Health and Human Services
                  for use in the National Directory of New Hires. We may also
                  disclose this information to other countries under a tax
                  treaty, to federal and state agencies to enforce federal
                  nontax criminal laws, or to federal law enforcement and
                  intelligence agencies to combat terrorism.
                </p>
              </div>

              {/* RIGHT COLUMN */}
              <div className="text-[8px] leading-[1.08]">
                <p className="mb-3">
                  You are not required to provide the information requested on a
                  form that is subject to the Paperwork Reduction Act unless the
                  form displays a valid OMB control number. Books or records
                  relating to a form or its instructions must be retained as
                  long as their contents may become material in the
                  administration of any Internal Revenue law. Generally, tax
                  returns and return information are confidential, as required
                  by Code section 6103. The average time and expenses required
                  to complete and file this form will vary depending on
                  individual circumstances. For estimated averages, see the
                  instructions for your income tax return. If you have
                  suggestions for making this form simpler, we would be happy to
                  hear from you. See the instructions for your income tax
                  return.
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div
          className="
    font-[Arial]
    mx-auto
    w-full
    max-w-[210mm]
    min-h-screen
    bg-white
    px-2
    py-4
    sm:px-4
    sm:py-5
    md:px-6
    md:py-6
    lg:px-[17mm]
    lg:py-[17mm]
    shadow-[0_2px_10px_rgba(0,0,0,0.25)]
  "
        >
          <div
            className="
      mx-auto
      w-full
      max-w-[1000px]
      text-[9px]
      sm:text-[10px]
      md:text-[11px]
      lg:text-[13px]
    "
          >
            {/* ================= HEADER ================= */}
            <div
              className="
        mb-1
        flex
        items-center
        justify-between
        gap-2
        border-b
        border-black
        pb-1
        text-[8px]
        sm:text-[9px]
        md:text-[10px]
        lg:text-[12px]
      "
            >
              <span>Form W-4 (2026)</span>
              <span>Page 5</span>
            </div>

            {/* ========================================================= */}
            {/* ================= MARRIED FILING JOINTLY ================ */}
            {/* ========================================================= */}

            <h1
              className="
        border-b
        border-black
        py-1
        text-center
        text-[10px]
        sm:text-[11px]
        md:text-[12px]
        lg:text-[14.7px]
        font-bold
        leading-tight
      "
            >
              Married Filing Jointly or Qualifying Surviving Spouse
            </h1>

            {/* Mobile horizontal scroll */}
            <div className="w-full overflow-x-auto overscroll-x-contain">
              <table
                className="
          w-full
          min-w-[760px]
          border-collapse
          text-center
        "
              >
                <thead>
                  <tr>
                    <th
                      rowSpan="2"
                      className="
                w-[125px]
                min-w-[125px]
                border-b
                border-r
                border-black
                p-1
                text-left
                align-middle
                text-[8px]
                sm:text-[9px]
                md:text-[10px]
                lg:text-[11.4px]
                font-bold
                leading-tight
              "
                    >
                      Higher Paying Job
                      <br />
                      Annual Taxable
                      <br />
                      Wage & Salary
                    </th>

                    <th
                      colSpan="12"
                      className="
                border-b
                border-black
                p-1
                text-[8px]
                sm:text-[9px]
                md:text-[10px]
                lg:text-[11.4px]
                font-bold
              "
                    >
                      Lower Paying Job Annual Taxable Wage & Salary
                    </th>
                  </tr>

                  <tr
                    className="
              text-[7px]
              sm:text-[8px]
              md:text-[8.5px]
              lg:text-[9.7px]
            "
                  >
                    {[
                      "$0 - 9,999",
                      "$10,000 - 19,999",
                      "$20,000 - 29,999",
                      "$30,000 - 39,999",
                      "$40,000 - 49,999",
                      "$50,000 - 59,999",
                      "$60,000 - 69,999",
                      "$70,000 - 79,999",
                      "$80,000 - 89,999",
                      "$90,000 - 99,999",
                      "$100,000 - 109,999",
                      "$110,000 - 120,000",
                    ].map((item) => (
                      <th
                        key={item}
                        className="
                  min-w-[53px]
                  border
                  border-gray-400
                  px-1
                  py-1
                  font-normal
                  leading-tight
                "
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody
                  className="
            text-[7px]
            sm:text-[8px]
            md:text-[8.5px]
            lg:text-[9.7px]
          "
                >
                  {[
                    [
                      "$0 - 9,999",
                      0,
                      0,
                      480,
                      850,
                      850,
                      1020,
                      1020,
                      1020,
                      1020,
                      1020,
                      1020,
                      1020,
                    ],
                    [
                      "$10,000 - 19,999",
                      0,
                      480,
                      1480,
                      1850,
                      2050,
                      2220,
                      2220,
                      2220,
                      2220,
                      2220,
                      2220,
                      2620,
                    ],
                    [
                      "$20,000 - 29,999",
                      480,
                      1480,
                      2480,
                      3050,
                      3250,
                      3420,
                      3420,
                      3420,
                      3420,
                      3420,
                      3820,
                      4820,
                    ],
                    [
                      "$30,000 - 39,999",
                      850,
                      1850,
                      3050,
                      3620,
                      3820,
                      3990,
                      3990,
                      3990,
                      3990,
                      4390,
                      5390,
                      6390,
                    ],
                    [
                      "$40,000 - 49,999",
                      850,
                      2050,
                      3250,
                      3820,
                      4020,
                      4190,
                      4360,
                      4590,
                      5590,
                      6590,
                      7590,
                      7590,
                    ],
                    [
                      "$50,000 - 59,999",
                      1020,
                      2220,
                      3420,
                      3990,
                      4190,
                      4360,
                      4760,
                      5760,
                      6760,
                      6760,
                      7760,
                      8760,
                    ],
                    [
                      "$60,000 - 69,999",
                      1020,
                      2220,
                      3420,
                      3990,
                      4190,
                      4360,
                      4760,
                      5760,
                      6760,
                      7760,
                      8760,
                      9760,
                    ],
                    [
                      "$70,000 - 79,999",
                      1020,
                      2220,
                      3420,
                      3990,
                      4190,
                      4760,
                      5760,
                      6760,
                      7760,
                      8760,
                      9760,
                      10760,
                    ],
                    [
                      "$80,000 - 99,999",
                      1020,
                      2220,
                      3420,
                      4240,
                      5440,
                      6610,
                      7610,
                      8610,
                      9610,
                      10610,
                      11610,
                      12610,
                    ],
                    [
                      "$100,000 - 149,999",
                      1870,
                      4070,
                      6270,
                      7840,
                      9040,
                      10210,
                      11210,
                      12210,
                      13210,
                      14210,
                      15360,
                      16560,
                    ],
                    [
                      "$150,000 - 239,999",
                      1870,
                      4100,
                      6500,
                      8270,
                      9670,
                      11040,
                      12240,
                      13440,
                      14640,
                      15840,
                      17040,
                      18240,
                    ],
                    [
                      "$240,000 - 319,999",
                      2040,
                      4440,
                      6840,
                      8610,
                      10010,
                      11380,
                      12580,
                      13780,
                      14980,
                      16180,
                      17380,
                      18580,
                    ],
                    [
                      "$320,000 - 364,999",
                      2040,
                      4440,
                      6840,
                      8610,
                      10010,
                      11380,
                      12580,
                      13860,
                      15860,
                      17860,
                      19860,
                      21860,
                    ],
                    [
                      "$365,000 - 524,999",
                      2720,
                      5920,
                      9390,
                      12260,
                      14760,
                      17230,
                      19530,
                      21830,
                      24130,
                      26430,
                      28730,
                      31030,
                    ],
                    [
                      "$525,000 and over",
                      3140,
                      6840,
                      10540,
                      13610,
                      16310,
                      18980,
                      21480,
                      23980,
                      26480,
                      28980,
                      31480,
                      33990,
                    ],
                  ].map((row) => (
                    <tr key={row[0]}>
                      <th
                        className="
                  min-w-[125px]
                  whitespace-nowrap
                  border
                  border-gray-400
                  px-1
                  py-[2px]
                  text-left
                  font-normal
                "
                      >
                        {row[0]}
                      </th>

                      {row.slice(1).map((value, index) => (
                        <td
                          key={index}
                          className="
                    min-w-[53px]
                    whitespace-nowrap
                    border
                    border-gray-400
                    px-1
                    py-[2px]
                  "
                        >
                          ${value.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ========================================================= */}
            {/* ============== SINGLE / MARRIED SEPARATELY ============== */}
            {/* ========================================================= */}

            <h2
              className="
        mt-2
        border-b
        border-black
        py-1
        text-center
        text-[10px]
        sm:text-[11px]
        md:text-[12px]
        lg:text-[14.7px]
        font-bold
        leading-tight
      "
            >
              Single or Married Filing Separately
            </h2>

            <div className="w-full overflow-x-auto overscroll-x-contain">
              <table
                className="
          w-full
          min-w-[760px]
          border-collapse
          text-center
        "
              >
                <thead>
                  <tr>
                    <th
                      rowSpan="2"
                      className="
                w-[125px]
                min-w-[125px]
                border-b
                border-r
                border-black
                p-1
                text-left
                align-middle
                text-[8px]
                sm:text-[9px]
                md:text-[10px]
                lg:text-[11.4px]
                font-bold
                leading-tight
              "
                    >
                      Higher Paying Job
                      <br />
                      Annual Taxable
                      <br />
                      Wage & Salary
                    </th>

                    <th
                      colSpan="12"
                      className="
                border-b
                border-black
                p-1
                text-[8px]
                sm:text-[9px]
                md:text-[10px]
                lg:text-[11.4px]
                font-bold
              "
                    >
                      Lower Paying Job Annual Taxable Wage & Salary
                    </th>
                  </tr>

                  <tr
                    className="
              text-[7px]
              sm:text-[8px]
              md:text-[8.5px]
              lg:text-[9.7px]
            "
                  >
                    {[
                      "$0 - 9,999",
                      "$10,000 - 19,999",
                      "$20,000 - 29,999",
                      "$30,000 - 39,999",
                      "$40,000 - 49,999",
                      "$50,000 - 59,999",
                      "$60,000 - 69,999",
                      "$70,000 - 79,999",
                      "$80,000 - 89,999",
                      "$90,000 - 99,999",
                      "$100,000 - 109,999",
                      "$110,000 - 120,000",
                    ].map((item) => (
                      <th
                        key={item}
                        className="
                  min-w-[53px]
                  border
                  border-gray-400
                  px-1
                  py-1
                  font-normal
                  leading-tight
                "
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody
                  className="
            text-[7px]
            sm:text-[8px]
            md:text-[8.5px]
            lg:text-[9.7px]
          "
                >
                  {[
                    [
                      "$0 - 9,999",
                      90,
                      850,
                      1020,
                      1020,
                      1020,
                      1070,
                      1870,
                      1870,
                      1870,
                      1870,
                      1870,
                      1970,
                    ],
                    [
                      "$10,000 - 19,999",
                      850,
                      1780,
                      1980,
                      1980,
                      2030,
                      3030,
                      3830,
                      3830,
                      3830,
                      3830,
                      3930,
                      4130,
                    ],
                    [
                      "$20,000 - 29,999",
                      1020,
                      1980,
                      2180,
                      2230,
                      3230,
                      4230,
                      5030,
                      5030,
                      5030,
                      5030,
                      5130,
                      5330,
                      5530,
                    ],
                    [
                      "$30,000 - 39,999",
                      1020,
                      1980,
                      2230,
                      3230,
                      4230,
                      5230,
                      6030,
                      6030,
                      6130,
                      6330,
                      6530,
                      6730,
                    ],
                    [
                      "$40,000 - 59,999",
                      1020,
                      2880,
                      4080,
                      5080,
                      6080,
                      7080,
                      7950,
                      8150,
                      8350,
                      8550,
                      8750,
                      8950,
                    ],
                    [
                      "$60,000 - 79,999",
                      1870,
                      3830,
                      5030,
                      6030,
                      7100,
                      8300,
                      9300,
                      9500,
                      9700,
                      9900,
                      10100,
                      10300,
                    ],
                    [
                      "$80,000 - 99,999",
                      1870,
                      3830,
                      5100,
                      6300,
                      7500,
                      8700,
                      9700,
                      9900,
                      10100,
                      10300,
                      10500,
                      10700,
                    ],
                    [
                      "$100,000 - 124,999",
                      2030,
                      4190,
                      5590,
                      6790,
                      7990,
                      9190,
                      10190,
                      10390,
                      10590,
                      10940,
                      11940,
                      12940,
                    ],
                    [
                      "$125,000 - 149,999",
                      2040,
                      4200,
                      5600,
                      6800,
                      8000,
                      9200,
                      10200,
                      10950,
                      11950,
                      12950,
                      13950,
                      14950,
                    ],
                    [
                      "$150,000 - 174,999",
                      2040,
                      4200,
                      5600,
                      6800,
                      8150,
                      10150,
                      11950,
                      12950,
                      13950,
                      14950,
                      16170,
                      17470,
                    ],
                    [
                      "$175,000 - 199,999",
                      2040,
                      4200,
                      6150,
                      8150,
                      10150,
                      12150,
                      13950,
                      15020,
                      16320,
                      17620,
                      18920,
                      20220,
                    ],
                    [
                      "$200,000 - 249,999",
                      2720,
                      5680,
                      7880,
                      10140,
                      12440,
                      14740,
                      16840,
                      18140,
                      19440,
                      20740,
                      22040,
                      23340,
                    ],
                    [
                      "$250,000 - 449,999",
                      2970,
                      6230,
                      8730,
                      11030,
                      13330,
                      15630,
                      17730,
                      19030,
                      20330,
                      21630,
                      22930,
                      24240,
                    ],
                    [
                      "$450,000 and over",
                      3140,
                      6600,
                      9300,
                      11800,
                      14300,
                      16800,
                      19100,
                      20600,
                      22100,
                      23600,
                      25100,
                      26610,
                    ],
                  ].map((row) => (
                    <tr key={row[0]}>
                      <th
                        className="
                  min-w-[125px]
                  whitespace-nowrap
                  border
                  border-gray-400
                  px-1
                  py-[2px]
                  text-left
                  font-normal
                "
                      >
                        {row[0]}
                      </th>

                      {row.slice(1).map((value, index) => (
                        <td
                          key={index}
                          className="
                    min-w-[53px]
                    whitespace-nowrap
                    border
                    border-gray-400
                    px-1
                    py-[2px]
                  "
                        >
                          ${value.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ========================================================= */}
            {/* =================== HEAD OF HOUSEHOLD =================== */}
            {/* ========================================================= */}

            <h2
              className="
        mt-2
        border-b
        border-black
        py-1
        text-center
        text-[10px]
        sm:text-[11px]
        md:text-[12px]
        lg:text-[14.7px]
        font-bold
        leading-tight
      "
            >
              Head of Household
            </h2>

            <div className="w-full overflow-x-auto overscroll-x-contain">
              <table
                className="
          w-full
          min-w-[760px]
          border-collapse
          text-center
        "
              >
                <thead>
                  <tr>
                    <th
                      rowSpan="2"
                      className="
                w-[125px]
                min-w-[125px]
                border-b
                border-r
                border-black
                p-1
                text-left
                align-middle
                text-[8px]
                sm:text-[9px]
                md:text-[10px]
                lg:text-[11.4px]
                font-bold
                leading-tight
              "
                    >
                      Higher Paying Job
                      <br />
                      Annual Taxable
                      <br />
                      Wage & Salary
                    </th>

                    <th
                      colSpan="12"
                      className="
                border-b
                border-black
                p-1
                text-[8px]
                sm:text-[9px]
                md:text-[10px]
                lg:text-[11.4px]
                font-bold
              "
                    >
                      Lower Paying Job Annual Taxable Wage & Salary
                    </th>
                  </tr>

                  <tr
                    className="
              text-[7px]
              sm:text-[8px]
              md:text-[8.5px]
              lg:text-[9.7px]
            "
                  >
                    {[
                      "$0 - 9,999",
                      "$10,000 - 19,999",
                      "$20,000 - 29,999",
                      "$30,000 - 39,999",
                      "$40,000 - 49,999",
                      "$50,000 - 59,999",
                      "$60,000 - 69,999",
                      "$70,000 - 79,999",
                      "$80,000 - 89,999",
                      "$90,000 - 99,999",
                      "$100,000 - 109,999",
                      "$110,000 - 120,000",
                    ].map((item) => (
                      <th
                        key={item}
                        className="
                  min-w-[53px]
                  border
                  border-gray-400
                  px-1
                  py-1
                  font-normal
                  leading-tight
                "
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody
                  className="
            text-[7px]
            sm:text-[8px]
            md:text-[8.5px]
            lg:text-[9.7px]
          "
                >
                  {[
                    [
                      "$0 - 9,999",
                      0,
                      280,
                      850,
                      950,
                      1020,
                      1020,
                      1020,
                      1020,
                      1560,
                      1870,
                      1870,
                      1870,
                    ],
                    [
                      "$10,000 - 19,999",
                      280,
                      1280,
                      1950,
                      2150,
                      2220,
                      2220,
                      2220,
                      2760,
                      3760,
                      4070,
                      4070,
                      4210,
                    ],
                    [
                      "$20,000 - 29,999",
                      850,
                      1950,
                      2720,
                      2920,
                      2980,
                      2980,
                      3520,
                      4520,
                      5520,
                      5830,
                      5980,
                      6180,
                    ],
                    [
                      "$30,000 - 39,999",
                      950,
                      2150,
                      2920,
                      3120,
                      3180,
                      3720,
                      4720,
                      5720,
                      6720,
                      7180,
                      7380,
                      7580,
                    ],
                    [
                      "$40,000 - 59,999",
                      1020,
                      2220,
                      2980,
                      3570,
                      4640,
                      5640,
                      6640,
                      7750,
                      8950,
                      9460,
                      9660,
                      9860,
                    ],
                    [
                      "$60,000 - 79,999",
                      1020,
                      2610,
                      4370,
                      5570,
                      6640,
                      7750,
                      8950,
                      10150,
                      11350,
                      11860,
                      12060,
                      12260,
                    ],
                    [
                      "$80,000 - 99,999",
                      1870,
                      4070,
                      5830,
                      7150,
                      8410,
                      9610,
                      10810,
                      12010,
                      13210,
                      13720,
                      13920,
                      14120,
                    ],
                    [
                      "$100,000 - 124,999",
                      1870,
                      4270,
                      6230,
                      7630,
                      8900,
                      10100,
                      11300,
                      12500,
                      13700,
                      14210,
                      14720,
                      15720,
                    ],
                    [
                      "$125,000 - 149,999",
                      2040,
                      4440,
                      6400,
                      7800,
                      9070,
                      10270,
                      11470,
                      12670,
                      14580,
                      15890,
                      16890,
                      17890,
                    ],
                    [
                      "$150,000 - 174,999",
                      2040,
                      4440,
                      6400,
                      7800,
                      9070,
                      10580,
                      12580,
                      14580,
                      16580,
                      17890,
                      18890,
                      20170,
                    ],
                    [
                      "$175,000 - 199,999",
                      2040,
                      4440,
                      6400,
                      8510,
                      10580,
                      12580,
                      14580,
                      16580,
                      18710,
                      20320,
                      21890,
                      22920,
                    ],
                    [
                      "$200,000 - 249,999",
                      2720,
                      5920,
                      8680,
                      10900,
                      13270,
                      15570,
                      17870,
                      20170,
                      22470,
                      24080,
                      25380,
                      26680,
                    ],
                    [
                      "$250,000 - 449,999",
                      2970,
                      6470,
                      9540,
                      12040,
                      14410,
                      16710,
                      19010,
                      21310,
                      23610,
                      25220,
                      26520,
                      27820,
                    ],
                    [
                      "$450,000 and over",
                      3140,
                      6840,
                      10110,
                      12810,
                      15380,
                      17880,
                      20380,
                      22880,
                      25380,
                      27190,
                      28690,
                      30190,
                    ],
                  ].map((row) => (
                    <tr key={row[0]}>
                      <th
                        className="
                  min-w-[125px]
                  whitespace-nowrap
                  border
                  border-gray-400
                  px-1
                  py-[2px]
                  text-left
                  font-normal
                "
                      >
                        {row[0]}
                      </th>

                      {row.slice(1).map((value, index) => (
                        <td
                          key={index}
                          className="
                    min-w-[53px]
                    whitespace-nowrap
                    border
                    border-gray-400
                    px-1
                    py-[2px]
                  "
                        >
                          ${value.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br />
        {/*******page pending request for taxpayer*******/}

        <div className="font-[arial] mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between border-b-2 border-black pb-1 text-[11px]">
            <span>Form W-9 (Rev. 3-2024) </span>
            <span>Page 2</span>
          </div>

          {/* Main Two Columns */}
          <div className="grid grid-cols-2 gap-[0.35in]">
            {/* LEFT COLUMN */}
            <div className="text-[11px] leading-[1.08]">
              <p className="mb-2 text-[10px] leading-tight">
                must obtain your correct taxpayer identification number (TIN),
                which may be your social security number (SSN), individual
                taxpayer identification number (ITIN), adoption taxpayer
                identification number (ATIN), or employer identification number
                (EIN), to report on an information return the amount paid to
                you, or other amount reportable on an information return.
                Examples of information returns include, but are not limited to,
                the following.
                <br />
                <div className="mb-1 " />
                • Form 1099-INT (interest earned or paid).
                <br />
                • Form 1099-INT (interest earned or paid).
                <br />
                • Form 1099-DIV (dividends, including those from stocks or
                mutual funds).
                <br />
                • Form 1099-MISC (various types of income, prizes, awards, or
                gross proceeds).
                <br />
                • Form 1099-NEC (nonemployee compensation).
                <br />
                • Form 1099-B (stock or mutual fund sales and certain other
                transactions by brokers).
                <br />
                • Form 1099-S (proceeds from real estate transactions).
                <br />
                • Form 1099-K (merchant card and third-party network
                transactions).
                <br />
                • Form 1098 (home mortgage interest), 1098-E (student loan
                interest), and 1098-T (tuition).
                <br />
                • Form 1099-C (canceled debt).
                <br />
                • Form 1099-A (acquisition or abandonment of secured property).
                <br />
                <div className="mb-1 " />
                Use Form W-9 only if you are a U.S. person (including a resident
                alien), to provide your correct TIN.
                <br />
                <b>Caution:</b> If you don’t return Form W-9 to the requester
                with a TIN, you might be subject to backup withholding. See What
                is backup withholding, later.
                <br />
                <div className="mb-1 " />
                <b>By signing the filled-out form</b>, you:
                <br />
                <div className="mb-1 " />
                1. Certify that the TIN you are giving is correct (or you are
                waiting for a number to be issued);
                <br />
                2. Certify that you are not subject to backup withholding; or
                <br />
                3. Claim exemption from backup withholding if you are a U.S.
                exempt payee; and
                <br />
                4. Certify to your non-foreign status for purposes of
                withholding under chapter 3 or 4 of the Code (if applicable);
                and
                <br />
                5. Certify that FATCA code(s) entered on this form (if any)
                indicating that you are exempt from the FATCA reporting is
                correct. See What Is FATCA Reporting, later, for further
                information.
                <br />
                <div className="mb-1 " />
                <b>Note:</b> If you are a U.S. person and a requester gives you
                a form other than Form W-9 to request your TIN, you must use the
                requester’s form if it is substantially similar to this Form
                W-9.
                <br />
                <div className="mb-1 " />
                <b>Definition of a U.S. person.</b> For federal tax purposes,
                you are considered a U.S. person if you are:
                <br />
                • An individual who is a U.S. citizen or U.S. resident alien;
                <br />
                • A partnership, corporation, company, or association created or
                organized in the United States or under the laws of the United
                States;
                <br />
                • An estate (other than a foreign estate); or
                <br />
                • A domestic trust (as defined in Regulations section
                301.7701-7).
                <br />
                <div className="mb-1 " />
                <b>
                  Establishing U.S. status for purposes of chapter 3 and chapter
                  4 withholding.
                </b>{" "}
                Payments made to foreign persons, including certain
                distributions, allocations of income, or transfers of sales
                proceeds, may be subject to withholding under chapter 3 or
                chapter 4 of the Code (sections 1441–1474). Under those rules,
                if a Form W-9 or other certification of non-foreign status has
                not been received, a withholding agent, transferee, or
                partnership (payor) generally applies presumption rules that may
                require the payor to withhold applicable tax from the recipient,
                owner, transferor, or partner (payee). See Pub. 515, Withholding
                of Tax on Nonresident Aliens and Foreign Entities.
                <br />
                The following persons must provide Form W-9 to the payor for
                purposes of establishing its non-foreign status.
                <br />
                • In the case of a disregarded entity with a U.S. owner, the
                U.S. owner of the disregarded entity and not the disregarded
                entity.
                <br />
                • In the case of a grantor trust with a U.S. grantor or other
                U.S. owner, generally, the U.S. grantor or other U.S. owner of
                the grantor trust and not the grantor trust.
                <br />
                • In the case of a U.S. trust (other than a grantor trust), the
                U.S. trust and not the beneficiaries of the trust.
                <br />
                See Pub. 515 for more information on providing a Form W-9 or a
                certification of non-foreign status to avoid withholding.
              </p>
            </div>

            {/* RIGHT COLUMN */}
            <div className="text-[11px] leading-[1.08]">
              <p className="mb-2 text-[10px] leading-tight">
                <b>Foreign person.</b> If you are a foreign person or the U.S.
                branch of a foreign bank that has elected to be treated as a
                U.S. person (under Regulations section 1.1441-1(b)(2)(iv) or
                other applicable section for chapter 3 or 4 purposes), do not
                use Form W-9. Instead, use the appropriate Form W-8 or Form 8233
                (see Pub. 515). If you are a qualified foreign pension fund
                under Regulations section 1.897(l)-1(d), or a partnership that
                is wholly owned by qualified foreign pension funds, that is
                treated as a non-foreign person for purposes of section 1445
                withholding, do not use Form W-9. Instead, use Form W-8EXP (or
                other certification of non-foreign status).
                <br />
                <b>Nonresident alien who becomes a resident alien.</b>{" "}
                Generally, only a nonresident alien individual may use the terms
                of a tax treaty to reduce or eliminate U.S. tax on certain types
                of income. However, most tax treaties contain a provision known
                as a saving clause. Exceptions specified in the saving clause
                may permit an exemption from tax to continue for certain types
                of income even after the payee has otherwise become a U.S.
                resident alien for tax purposes.
                <br />
                If you are a U.S. resident alien who is relying on an exception
                contained in the saving clause of a tax treaty to claim an
                exemption from U.S. tax on certain types of income, you must
                attach a statement to Form W-9 that specifies the following five
                items.
                <br />
                <div className="mb-1 " />
                1. The treaty country. Generally, this must be the same treaty
                under which you claimed exemption from tax as a nonresident
                alien.
                <br />
                2. The treaty article addressing the income.
                <br />
                3. The article number (or location) in the tax treaty that
                contains the saving clause and its exceptions.
                <br />
                4. The type and amount of income that qualifies for the
                exemption from tax.
                <br />
                5. Sufficient facts to justify the exemption from tax under the
                terms of the treaty article.
                <br />
                <div className="mb-1 " />
                <b>Example.</b> Article 20 of the U.S.-China income tax treaty
                allows an exemption from tax for scholarship income received by
                a Chinese student temporarily present in the United States.
                Under U.S. law, this student will become a resident alien for
                tax purposes if their stay in the United States exceeds 5
                calendar years. However, paragraph 2 of the first Protocol to
                the U.S.-China treaty (dated April 30, 1984) allows the
                provisions of Article 20 to continue to apply even after the
                Chinese student becomes a resident alien of the United States. A
                Chinese student who qualifies for this exception (under
                paragraph 2 of the first Protocol) and is relying on this
                exception to claim an exemption from tax on their scholarship or
                fellowship income would attach to Form W-9 a statement that
                includes the information described above to support that
                exemption.
                <br />
                <div className="mb-1 " />
                If you are a nonresident alien or a foreign entity, give the
                requester the appropriate completed Form W-8 or Form 8233.
                <br />
                <div className="mb-1 " />
                <b className="text-[16px]">Backup Withholding</b>
                <br />
                <div className="mb-1 " />
                <b>What is backup withholding?</b> Persons making certain
                payments to you must under certain conditions withhold and pay
                to the IRS 24% of such payments. This is called “backup
                withholding.” Payments that may be subject to backup withholding
                include, but are not limited to, interest, tax-exempt interest,
                dividends, broker and barter exchange transactions, rents,
                royalties, nonemployee pay, payments made in settlement of
                payment card and third-party network transactions, and certain
                payments from fishing boat operators. Real estate transactions
                are not subject to backup withholding.
                <br />
                <div className="mb-1 " />
                You will not be subject to backup withholding on payments you
                receive if you give the requester your correct TIN, make the
                proper certifications, and report all your taxable interest and
                dividends on your tax return.
                <br />
                <b>
                  Payments you receive will be subject to backup withholding if:
                </b>
                <br />
                1. You do not furnish your TIN to the requester;
                <br />
                2. You do not certify your TIN when required (see the
                instructions for Part II for details);
                <br />
                3. The IRS tells the requester that you furnished an incorrect
                TIN;
                <br />
                4. The IRS tells you that you are subject to backup withholding
                because you did not report all your interest and dividends on
                your tax return (for reportable interest and dividends only); or
                <br />
                5. You do not certify to the requester that you are not subject
                to backup withholding, as described in item 4 under “By signing
                the filled- out form” above (for reportable interest and
                dividend accounts opened after 1983 only).
              </p>
            </div>
          </div>
        </div>
        <br />
        <div className="font-[arial] mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between border-b-2 border-black pb-1 text-[11px]">
            <span>Form W-9 (Rev. 3-2024) </span>
            <span>Page 3</span>
          </div>

          {/* Main Two Columns */}
          <div className="grid grid-cols-2 gap-[0.35in]">
            {/* LEFT COLUMN */}
            <div className="text-[11px] leading-[1.08]">
              <p className="mb-2 text-[10px] leading-tight">
                Certain payees and payments are exempt from backup withholding.
                See Exempt payee code, later, and the separate Instructions for
                the Requester of Form W-9 for more information.
                <br />
                <div className="mb-1 " />
                See also Establishing U.S. status for purposes of chapter 3 and
                chapter 4 withholding, earlier.
                <br />
                <div className="mb-1 " />
                <b className="text-[16px]">What Is FATCA Reporting?</b> <br />
                The Foreign Account Tax Compliance Act (FATCA) requires a
                participating foreign financial institution to report all U.S.
                account holders that are specified U.S. persons. Certain payees
                are exempt from FATCA reporting. See Exemption from FATCA
                reporting code, later, and the Instructions for the Requester of
                Form W-9 for more information.
                <br />
                <div className="mb-1 " />
                <div className="mb-1 " />
                <b className="text-[16px]">Updating Your Information</b> <br />
                You must provide updated information to any person to whom you
                claimed to be an exempt payee if you are no longer an exempt
                payee and anticipate receiving reportable payments in the future
                from this person. For example, you may need to provide updated
                information if you are a C corporation that elects to be an S
                corporation, or if you are no longer tax exempt. In addition,
                you must furnish a new Form W-9 if the name or TIN changes for
                the account, for example, if the grantor of a grantor trust
                dies.
                <br />
                <div className="mb-1 " />
                <div className="mb-1 " />
                <b className="text-[16px]">Penalties</b> <br />
                <b className="text-[11px]">Failure to furnish TIN.</b> If you
                fail to furnish your correct TIN to a requester, you are subject
                to a penalty of $50 for each such failure unless your failure is
                due to reasonable cause and not to willful neglect.
                <br />
                <div className="mb-1 " />
                <b className="text-[11px]">
                  Civil penalty for false information with respect to
                  withholding.
                </b>{" "}
                If you make a false statement with no reasonable basis that
                results in no backup withholding, you are subject to a $500
                penalty.
                <br />
                <div className="mb-1 " />
                <b className="text-[11px]">
                  Criminal penalty for falsifying information.
                </b>{" "}
                Willfully falsifying certifications or affirmations may subject
                you to criminal penalties including fines and/or imprisonment.
                <br />
                <div className="mb-1 " />
                <b className="text-[11px]">Misuse of TINs.</b> If the requester
                discloses or uses TINs in violation of federal law, the
                requester may be subject to civil and criminal penalties.
                <br />
                <div className="mb-1 " />
                <b className="text-[16px]">Specific Instructions</b>
                <br />
                <b>Line 1</b> <br />
                You must enter one of the following on this line; do not leave
                this line blank. The name should match the name on your tax
                return.
                <br /> <div className="mb-1 " />
                If this Form W-9 is for a joint account (other than an account
                maintained by a foreign financial institution (FFI)), list
                first, and then circle, the name of the person or entity whose
                number you entered in Part I of Form W-9. If you are providing
                Form W-9 to an FFI to document a joint account, each holder of
                the account that is a U.S. person must provide a Form W-9.
                <br />
                <div className="mb-1 " />
                <b>• Individual.</b> Generally, enter the name shown on your tax
                return. If you have changed your last name without informing the
                Social Security Administration (SSA) of the name change, enter
                your first name, the last name as shown on your social security
                card, and your new last name.
                <br />
                <div className="mb-1 " />
                <b>Note for ITIN applicant:</b> Enter your individual name as it
                was entered on your Form W-7 application, line 1a. This should
                also be the same as the name you entered on the Form 1040 you
                filed with your application.
                <br />
                <div className="mb-1 " />
                <b>• Sole proprietor.</b> Enter your individual name as shown on
                your Form 1040 on line 1. Enter your business, trade, or “doing
                business as” (DBA) name on line 2.
                <br />
                <div className="mb-1 " />
                <b>
                  • Partnership, C corporation, S corporation, or LLC, other
                  than a disregarded entity.
                </b>{" "}
                Enter the entity’s name as shown on the entity’s tax return on
                line 1 and any business, trade, or DBA name on line 2.
                <br />
                <div className="mb-1 " />
                <b>• Other entities.</b> Enter your name as shown on required
                U.S. federal tax documents on line 1. This name should match the
                name shown on the charter or other legal document creating the
                entity. Enter any business, trade, or DBA name on line 2.
                <br />
                <div className="mb-1 " />
                <b>• Disregarded entity.</b> In general, a business entity that
                has a single owner, including an LLC, and is not a corporation,
                is disregarded as an entity separate from its owner (a
                disregarded entity). See Regulations section 301.7701-2(c)(2). A
                disregarded entity should check the appropriate box for the tax
                classification of its owner. Enter the owner’s name on line 1.
                The name of the owner entered on line 1 should never be a
                disregarded entity. The name on line 1 should be the name shown
                on the income tax return on which the income should be reported.
                For
              </p>
            </div>

            {/* RIGHT COLUMN */}
            <div className="text-[11px] leading-[1.08]">
              <p className="mb-2 text-[10px] leading-tight">
                example, if a foreign LLC that is treated as a disregarded
                entity for U.S. federal tax purposes has a single owner that is
                a U.S. person, the U.S. owner’s name is required to be provided
                on line 1. If the direct owner of the entity is also a
                disregarded entity, enter the first owner that is not
                disregarded for federal tax purposes. Enter the disregarded
                entity’s name on line 2. If the owner of the disregarded entity
                is a foreign person, the owner must complete an appropriate Form
                W-8 instead of a Form W-9. This is the case even if the foreign
                person has a U.S. TIN.
                <br />
                <div className="mb-1 " />
                <b>Line 2</b>
                <br />
                If you have a business name, trade name, DBA name, or
                disregarded entity name, enter it on line 2.
                <div className="mb-1 " />
                <b>Line 3a</b> <br />
                Check the appropriate box on line 3a for the U.S. federal tax
                classification of the person whose name is entered on line 1.
                Check only one box on line 3a.
                <br />
                <div className="mb-1 " />
                <table className="border border-black">
                  <tr className="border-t border-black">
                    <th className="w-[50%] border-r border-black">
                      IF the entity/individual on line 1 is a(n) . . .
                    </th>
                    <th>THEN check the box for . . .</th>
                  </tr>
                  <tr className="border-t border-black">
                    <td className="border-r border-black">• Corporation</td>
                    <td>Corporation.</td>
                  </tr>

                  <tr className="border-t border-black">
                    <td className="border-r border-black">
                      • Individual or
                      <br />• Sole proprietorship
                    </td>
                    <td>Individual/sole proprietor.</td>
                  </tr>

                  <tr className="border-t border-black">
                    <td className="border-r border-black">
                      • LLC classified as a partnership for U.S. federal tax
                      purposes or
                      <br />• LLC that has filed Form 8832 or 2553 electing to
                      be taxed as a corporation
                    </td>
                    <td>
                      Limited liability company and enter the appropriate tax
                      classification:
                      <br />
                      P = Partnership,
                      <br />
                      C = C corporation, or
                      <br />S = S corporation.
                    </td>
                  </tr>

                  <tr className="border-t border-black">
                    <td className="border-r border-black">• Partnership</td>
                    <td>Partnership.</td>
                  </tr>

                  <tr className="border-y border-black">
                    <td className="border-r border-black">• Trust/estate</td>
                    <td>Trust/estate.</td>
                  </tr>
                </table>
                <div className="mb-1 " />
                <b>Line 3b</b>
                <br />
                Check this box if you are a partnership (including an LLC
                classified as a partnership for U.S. federal tax purposes),
                trust, or estate that has any foreign partners, owners, or
                beneficiaries, and you are providing this form to a partnership,
                trust, or estate, in which you have an ownership interest. You
                must check the box on line 3b if you receive a Form W-8 (or
                documentary evidence) from any partner, owner, or beneficiary
                establishing foreign status or if you receive a Form W-9 from
                any partner, owner, or beneficiary that has checked the box on
                line 3b.
                <br />
                <div className="mb-1 " />
                <b>Note:</b> A partnership that provides a Form W-9 and checks
                box 3b may be required to complete Schedules K-2 and K-3 (Form
                1065). For more information, see the Partnership Instructions
                for Schedules K-2 and K-3 (Form 1065).
                <br />
                <div className="mb-1 " />
                If you are required to complete line 3b but fail to do so, you
                may not receive the information necessary to file a correct
                information return with the IRS or furnish a correct payee
                statement to your partners or beneficiaries. See, for example,
                sections 6698, 6722, and 6724 for penalties that may apply.
                <br />
                <div className="mb-1 " />
                <b>Line 4 Exemptions</b>
                <br />
                If you are exempt from backup withholding and/or FATCA
                reporting, enter in the appropriate space on line 4 any code(s)
                that may apply to you.
                <br />
                <div className="mb-1 " />
                <b>Exempt payee code.</b>
                <br />
                • Generally, individuals (including sole proprietors) are not
                exempt from backup withholding.
                <br />
                • Except as provided below, corporations are exempt from backup
                withholding for certain payments, including interest and
                dividends.
                <br />
                • Corporations are not exempt from backup withholding for
                payments made in settlement of payment card or third-party
                network transactions.
                <br />
                • Corporations are not exempt from backup withholding with
                respect to attorneys’ fees or gross proceeds paid to attorneys,
                and corporations that provide medical or health care services
                are not exempt with respect to payments reportable on Form
                1099-MISC.
                <br />
                The following codes identify payees that are exempt from backup
                withholding. Enter the appropriate code in the space on line 4.
                <br />
                1—An organization exempt from tax under section 501(a), any IRA,
                or a custodial account under section 403(b)(7) if the account
                satisfies the requirements of section 401(f)(2).
              </p>
            </div>
          </div>
        </div>
        <br />
        <div className="font-[arial] mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between border-b-2 border-black pb-1 text-[11px]">
            <span>Form W-9 (Rev. 3-2024) </span>
            <span>Page 4</span>
          </div>

          {/* Main Two Columns */}
          <div className="grid grid-cols-2 gap-[0.35in]">
            {/* LEFT COLUMN */}
            <div className="text-[11px] leading-[1.08]">
              <p className="mb-2 text-[10px] leading-tight">
                2—The United States or any of its agencies or instrumentalities.
                <br />
                <div className="mb-1 " />
                3—A state, the District of Columbia, a U.S. commonwealth or
                territory, or any of their political subdivisions or
                instrumentalities.
                <br />
                <div className="mb-1 " />
                4—A foreign government or any of its political subdivisions,
                agencies, or instrumentalities.
                <br />
                <div className="mb-1 " />
                5—A corporation.
                <br />
                <div className="mb-1 " />
                6—A dealer in securities or commodities required to register in
                the United States, the District of Columbia, or a U.S.
                commonwealth or territory.
                <br />
                <div className="mb-1 " />
                7—A futures commission merchant registered with the Commodity
                Futures Trading Commission.
                <br />
                <div className="mb-1 " />
                8—A real estate investment trust.
                <br />
                <div className="mb-1 " />
                9—An entity registered at all times during the tax year under
                the Investment Company Act of 1940.
                <br />
                <div className="mb-1 " />
                10—A common trust fund operated by a bank under section 584(a).
                <br />
                <div className="mb-1 " />
                11—A financial institution as defined under section 581.
                <br />
                <div className="mb-1 " />
                12—A middleman known in the investment community as a nominee or
                custodian.
                <br />
                <div className="mb-1 " />
                13—A trust exempt from tax under section 664 or described in
                section 4947.
                <br />
                <div className="mb-1 " />
                The following chart shows types of payments that may be exempt
                from backup withholding. The chart applies to the exempt payees
                listed above, 1 through 13.
                <table>
                  <tr className="border-t border-black">
                    <th className="w-[50%] border-r border-black">
                      IF the payment is for . . .
                    </th>
                    <th>THEN the payment is exempt for . . .</th>
                  </tr>
                  <tr className="border-t border-black">
                    <td className="border-r border-black">
                      • Interest and dividend payments
                    </td>
                    <td>All exempt payees except for 7.</td>
                  </tr>

                  <tr className="border-t border-black">
                    <td className="border-r border-black">
                      • Broker transactions
                    </td>
                    <td>
                      Exempt payees 1 through 4 and 6 through 11 and all C
                      corporations. S corporations must not enter an exempt
                      payee code because they are exempt only for sales of
                      noncovered securities acquired prior to 2012.
                    </td>
                  </tr>

                  <tr className="border-t border-black">
                    <td className="border-r border-black">
                      • Barter exchange transactions and patronage dividends
                    </td>
                    <td>Exempt payees 1 through 4.</td>
                  </tr>

                  <tr className="border-t border-black">
                    <td className="border-r border-black">
                      • Payments over $600 required to be reported and direct
                      sales over $5,000,<sup>1</sup>
                    </td>
                    <td>
                      Generally, exempt payees 1 through 5.<sup>2</sup>
                    </td>
                  </tr>

                  <tr className="border-y border-black">
                    <td className="border-r border-black">
                      • Payments made in settlement of payment card or
                      third-party network transactions
                    </td>
                    <td>Exempt payees 1 through 4</td>
                  </tr>
                </table>
                1 See Form 1099-MISC, Miscellaneous Information, and its
                instructions.
                <br />
                <div className="mb-1 " />
                2 However, the following payments made to a corporation and
                reportable on Form 1099-MISC are not exempt from backup
                withholding: medical and health care payments, attorneys’ fees,
                gross proceeds paid to an attorney reportable under section
                6045(f), and payments for services paid by a federal executive
                agency.
                <br />
                <div className="mb-1 " />
                <b>Exemption from FATCA reporting code.</b> The following codes
                identify payees that are exempt from reporting under FATCA.
                These codes apply to persons submitting this form for accounts
                maintained outside of the United States by certain foreign
                financial institutions. Therefore, if you are only submitting
                this form for an account you hold in the United States, you may
                leave this field blank. Consult with the person requesting this
                form if you are uncertain if the financial institution is
                subject to these requirements. A requester may indicate that a
                code is not required by providing you with a Form W-9 with “Not
                Applicable” (or any similar indication) entered on the line for
                a FATCA exemption code.
                <br />
                <div className="mb-1 " />
                A—An organization exempt from tax under section 501(a) or any
                individual retirement plan as defined in section 7701(a)(37).
                <br />
                <div className="mb-1 " />
                B—The United States or any of its agencies or instrumentalities.
                <br />
                <div className="mb-1 " />
                C—A state, the District of Columbia, a U.S. commonwealth or
                territory, or any of their political subdivisions or
                instrumentalities.
                <br />
                <div className="mb-1 " />
                D—A corporation the stock of which is regularly traded on one or
                more established securities markets, as described in Regulations
                section 1.1472-1(c)(1)(i).
                <br />
                <div className="mb-1 " />
                E—A corporation that is a member of the same expanded affiliated
                group as a corporation described in Regulations section
                1.1472-1(c)(1)(i).
              </p>
            </div>

            {/* RIGHT COLUMN */}
            <div className="text-[11px] leading-[1.08]">
              <p className="mb-2 text-[10px] leading-tight">
                F—A dealer in securities, commodities, or derivative financial
                instruments (including notional principal contracts, futures,
                forwards, and options) that is registered as such under the laws
                of the United States or any state.
                <br />
                <div className="mb-1 " />
                G—A real estate investment trust.
                <br />
                <div className="mb-1 " />
                H—A regulated investment company as defined in section 851 or an
                entity registered at all times during the tax year under the
                Investment Company Act of 1940.
                <br />
                <div className="mb-1 " />
                I—A common trust fund as defined in section 584(a).
                <br />
                <div className="mb-1 " />
                J—A bank as defined in section 581.
                <br />
                <div className="mb-1 " />
                K—A broker.
                <br />
                <div className="mb-1 " />
                L—A trust exempt from tax under section 664 or described in
                section 4947(a)(1).
                <br />
                <div className="mb-1 " />
                M—A tax-exempt trust under a section 403(b) plan or section
                457(g) plan.
                <br />
                <div className="mb-1 " />
                <b>Note:</b> You may wish to consult with the financial
                institution requesting this form to determine whether the FATCA
                code and/or exempt payee code should be completed.
                <br />
                <div className="mb-1 " />
                <b>Line 5</b>
                <br />
                <div className="mb-1 " />
                Enter your address (number, street, and apartment or suite
                number). This is where the requester of this Form W-9 will mail
                your information returns. If this address differs from the one
                the requester already has on file, enter “NEW” at the top. If a
                new address is provided, there is still a chance the old address
                will be used until the payor changes your address in their
                records.
                <br />
                <b>Line 6</b>
                <br />
                <div className="mb-1 " />
                Enter your city, state, and ZIP code.
                <br />
                <div className="mb-1 " />
                <b className="text-[14px]">
                  Part I. Taxpayer Identification Number (TIN)
                </b>
                <br />
                <div className="mb-1 " />
                Enter your TIN in the appropriate box. If you are a resident
                alien and you do not have, and are not eligible to get, an SSN,
                your TIN is your IRS ITIN. Enter it in the entry space for the
                Social security number. If you do not have an ITIN, see How to
                get a TIN below.
                <br />
                <div className="mb-1 " />
                If you are a sole proprietor and you have an EIN, you may enter
                either your SSN or EIN.
                <br />
                <div className="mb-1 " />
                If you are a single-member LLC that is disregarded as an entity
                separate from its owner, enter the owner’s SSN (or EIN, if the
                owner has one). If the LLC is classified as a corporation or
                partnership, enter the entity’s EIN.
                <br />
                <div className="mb-1 " />
                <b>Note:</b> See What Name and Number To Give the Requester,
                later, for further clarification of name and TIN combinations.
                <br />
                <div className="mb-1 " />
                <b>How to get a TIN.</b> If you do not have a TIN, apply for one
                immediately. To apply for an SSN, get Form SS-5, Application for
                a Social Security Card, from your local SSA office or get this
                form online at www.SSA.gov. You may also get this form by
                calling 800-772-1213. Use Form W-7, Application for IRS
                Individual Taxpayer Identification Number, to apply for an ITIN,
                or Form SS-4, Application for Employer Identification Number, to
                apply for an EIN. You can apply for an EIN online by accessing
                the IRS website at www.irs.gov/EIN. Go to www.irs.gov/Forms to
                view, download, or print Form W-7 and/or Form SS-4. Or, you can
                go to www.irs.gov/OrderForms to place an order and have Form W-7
                and/or Form SS-4 mailed to you within 15 business days.
                <br />
                <div className="mb-1 " />
                If you are asked to complete Form W-9 but do not have a TIN,
                apply for a TIN and enter “Applied For” in the space for the
                TIN, sign and date the form, and give it to the requester. For
                interest and dividend payments, and certain payments made with
                respect to readily tradable instruments, you will generally have
                60 days to get a TIN and give it to the requester before you are
                subject to backup withholding on payments. The 60-day rule does
                not apply to other types of payments. You will be subject to
                backup withholding on all such payments until you provide your
                TIN to the requester.
                <br />
                <div className="mb-1 " />
                <b>Note:</b> Entering “Applied For” means that you have already
                applied for a TIN or that you intend to apply for one soon. See
                also Establishing U.S. status for purposes of chapter 3 and
                chapter 4 withholding, earlier, for when you may instead be
                subject to withholding under chapter 3 or 4 of the Code.
                <br />
                <div className="mb-1 " />
                <b>Caution:</b> A disregarded U.S. entity that has a foreign
                owner must use the appropriate Form W-8.
              </p>
            </div>
          </div>
        </div>
        <br />
        <div className="font-[arial] mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between border-b-2 border-black pb-1 text-[11px]">
            <span>Form W-9 (Rev. 3-2024) </span>
            <span>Page 5</span>
          </div>

          {/* Main Two Columns */}
          <div className="grid grid-cols-2 gap-[0.35in]">
            {/* LEFT COLUMN */}
            <div className="text-[11px] leading-[1.08]">
              <p className="mb-2 text-[10px] leading-tight">
                <b className="text-[14px]">Part II. Certification</b>
                <br />
                <div className="mb-1 " />
                To establish to the withholding agent that you are a U.S.
                person, or resident alien, sign Form W-9. You may be requested
                to sign by the withholding agent even if item 1, 4, or 5 below
                indicates otherwise.
                <br />
                <div className="mb-1 " />
                For a joint account, only the person whose TIN is shown in Part
                I should sign (when required). In the case of a disregarded
                entity, the person identified on line 1 must sign. Exempt
                payees, see Exempt payee code, earlier.
                <br />
                <div className="mb-1 " />
                <b>Signature requirements.</b> Complete the certification as
                indicated in items 1 through 5 below.
                <br />
                <div className="mb-1 " />
                <b>
                  1. Interest, dividend, and barter exchange accounts opened
                  before 1984 and broker accounts considered active during 1983.
                </b>
                You must give your correct TIN, but you do not have to sign the
                certification.
                <br />
                <div className="mb-1 " />
                <b>
                  2. Interest, dividend, broker, and barter exchange accounts
                  opened after 1983 and broker accounts considered inactive
                  during 1983.
                </b>{" "}
                You must sign the certification or backup withholding will
                apply. If you are subject to backup withholding and you are
                merely providing your correct TIN to the requester, you must
                cross out item 2 in the certification before signing the form.
                <br />
                <div className="mb-1 " />
                <b>3. Real estate transactions.</b> You must sign the
                certification. You may cross out item 2 of the certification.
                <br />
                <div className="mb-1 " />
                <b>4. Other payments.</b> You must give your correct TIN, but
                you do not have to sign the certification unless you have been
                notified that you have previously given an incorrect TIN. “Other
                payments” include payments made in the course of the requester’s
                trade or business for rents, royalties, goods (other than bills
                for merchandise), medical and health care services (including
                payments to corporations), payments to a nonemployee for
                services, payments made in settlement of payment card and
                third-party network transactions, payments to certain fishing
                boat crew members and fishermen, and gross proceeds paid to
                attorneys (including payments to corporations).
                <br />
                <div className="mb-1 " />
                <b>
                  5. Mortgage interest paid by you, acquisition or abandonment
                  of secured property, cancellation of debt, qualified tuition
                  program payments (under section 529), ABLE accounts (under
                  section 529A), IRA, Coverdell ESA, Archer MSA or HSA
                  contributions or distributions, and pension distributions.
                </b>{" "}
                You must give your correct TIN, but you do not have to sign the
                certification.
                <br />
                <div className="mb-1 " />
                <b className="text-[14px]">
                  What Name and Number To Give the Requester
                </b>
                <table>
                  <tr className="border-y border-black">
                    <th className="w-[50%] border-r border-black">
                      For this type of account:{" "}
                    </th>
                    <th>Give name and SSN of:</th>
                  </tr>
                  <tr>
                    <td className="border-r border-black">1. Individual</td>
                    <td>The individual</td>
                  </tr>

                  <tr>
                    <td className="border-r border-black">
                      2. Two or more individuals (joint account) other than an
                      account maintained by an FFI
                    </td>
                    <td>
                      The actual owner of the account or, if combined funds, the
                      first individual on the account<sup>1</sup>
                    </td>
                  </tr>

                  <tr>
                    <td className="border-r border-black">
                      3. Two or more U.S. persons (joint account maintained by
                      an FFI
                    </td>
                    <td>Each holder of the account</td>
                  </tr>

                  <tr>
                    <td className="border-r border-black">
                      4. Custodial account of a minor (Uniform Gift to Minors
                      Act)
                    </td>
                    <td>
                      The minor<sup>2</sup>
                    </td>
                  </tr>

                  <tr>
                    <td className="border-r border-black">
                      5. a. The usual revocable savings trust (grantor is also
                      trustee)
                      <br />
                      b. So-called trust account that is not a legal or valid
                      trust under state law
                    </td>
                    <td>
                      The grantor-trustee<sup>1</sup>
                      <br />
                      The actual owner<sup>1</sup>
                    </td>
                  </tr>

                  <tr>
                    <td className="border-r border-black">
                      6. Sole proprietorship or disregarded entity owned by an
                      individual
                    </td>
                    <td>
                      The actual owner<sup>1</sup>
                    </td>
                  </tr>

                  <tr className="border-b border-black">
                    <td className="border-r border-black">
                      7. Grantor trust filing under Optional Filing Method 1
                      (see Regulations section 1.671-4(b)(2)(i)(A))**
                    </td>
                    <td>
                      The owner<sup>3</sup>
                    </td>
                  </tr>
                </table>
              </p>
            </div>

            {/* RIGHT COLUMN */}
            <div className="text-[11px] leading-[1.08]">
              <p className="mb-2 text-[10px] leading-tight">
                <table>
                  <tr className="border-y border-black">
                    <th className="w-[50%] border-r border-black">
                      For this type of account:{" "}
                    </th>
                    <th>Give name and EIN of:</th>
                  </tr>
                  <tr>
                    <td className="border-r border-black">
                      8. Disregarded entity not owned by an individual
                    </td>
                    <td>The owner</td>
                  </tr>

                  <tr>
                    <td className="border-r border-black">
                      9. A valid trust, estate, or pension trus
                    </td>
                    <td>
                      Legal entity<sup>4</sup>
                    </td>
                  </tr>

                  <tr>
                    <td className="border-r border-black">
                      10. Corporation or LLC electing corporate status on Form
                      8832 or Form 2553
                    </td>
                    <td>The corporation</td>
                  </tr>

                  <tr>
                    <td className="border-r border-black">
                      11. Association, club, religious, charitable, educational,
                      or other tax-exempt organization
                    </td>
                    <td>The organization</td>
                  </tr>

                  <tr>
                    <td className="border-r border-black">
                      12. Partnership or multi-member LLC
                    </td>
                    <td>The partnership</td>
                  </tr>

                  <tr>
                    <td className="border-r border-black">
                      13. A broker or registered nominee
                    </td>
                    <td>The broker or nominee</td>
                  </tr>

                  <tr>
                    <td className="border-r border-black">
                      14. Account with the Department of Agriculture in the name
                      of a public entity (such as a state or local government,
                      school district, or prison) that receives agricultural
                      program payments
                    </td>
                    <td>The public entity</td>
                  </tr>

                  <tr className="border-b border-black">
                    <td className="border-r border-black">
                      15. Grantor trust filing Form 1041 or under the Optional
                      Filing Method 2, requiring Form 1099 (see Regulations
                      section 1.671-4(b)(2)(i)(B))**
                    </td>
                    <td>The trust</td>
                  </tr>
                </table>
                example, if a foreign LLC that is treated as a disregarded
                entity for U.S. federal tax purposes has a single owner that is
                a U.S. person, the U.S. owner’s name is required to be provided
                on line 1. If the direct owner of the entity is also a
                disregarded entity, enter the first owner that is not
                disregarded for federal tax purposes. Enter the disregarded
                entity’s name on line 2. If the owner of the disregarded entity
                is a foreign person, the owner must complete an appropriate Form
                W-8 instead of a Form W-9. This is the case even if the foreign
                person has a U.S. TIN.
                <br />
                <div className="mb-1 " />
                <b>Line 2</b>
                <br />
                If you have a business name, trade name, DBA name, or
                disregarded entity name, enter it on line 2.
                <div className="mb-1 " />
                <b>Line 3a</b> <br />
                Check the appropriate box on line 3a for the U.S. federal tax
                classification of the person whose name is entered on line 1.
                Check only one box on line 3a.
                <br />
                <div className="mb-1 " />
                <b>Line 3b</b>
                <br />
                Check this box if you are a partnership (including an LLC
                classified as a partnership for U.S. federal tax purposes),
                trust, or estate that has any foreign partners, owners, or
                beneficiaries, and you are providing this form to a partnership,
                trust, or estate, in which you have an ownership interest. You
                must check the box on line 3b if you receive a Form W-8 (or
                documentary evidence) from any partner, owner, or beneficiary
                establishing foreign status or if you receive a Form W-9 from
                any partner, owner, or beneficiary that has checked the box on
                line 3b.
                <br />
                <div className="mb-1 " />
                <b>Note:</b> A partnership that provides a Form W-9 and checks
                box 3b may be required to complete Schedules K-2 and K-3 (Form
                1065). For more information, see the Partnership Instructions
                for Schedules K-2 and K-3 (Form 1065).
                <br />
                <div className="mb-1 " />
                If you are required to complete line 3b but fail to do so, you
                may not receive the information necessary to file a correct
                information return with the IRS or furnish a correct payee
                statement to your partners or beneficiaries. See, for example,
                sections 6698, 6722, and 6724 for penalties that may apply.
                <br />
                <div className="mb-1 " />
                <b>Line 4 Exemptions</b>
                <br />
                If you are exempt from backup withholding and/or FATCA
                reporting, enter in the appropriate space on line 4 any code(s)
                that may apply to you.
                <br />
                <div className="mb-1 " />
                <b>Exempt payee code.</b>
                <br />
                • Generally, individuals (including sole proprietors) are not
                exempt from backup withholding.
                <br />
                • Except as provided below, corporations are exempt from backup
                withholding for certain payments, including interest and
                dividends.
                <br />
                • Corporations are not exempt from backup withholding for
                payments made in settlement of payment card or third-party
                network transactions.
                <br />
                • Corporations are not exempt from backup withholding with
                respect to attorneys’ fees or gross proceeds paid to attorneys,
                and corporations that provide medical or health care services
                are not exempt with respect to payments reportable on Form
                1099-MISC.
                <br />
                The following codes identify payees that are exempt from backup
                withholding. Enter the appropriate code in the space on line 4.
                <br />
                1—An organization exempt from tax under section 501(a), any IRA,
                or a custodial account under section 403(b)(7) if the account
                satisfies the requirements of section 401(f)(2).
              </p>
            </div>
          </div>
        </div>
        <br />
        <div className="font-[arial] mx-auto w-full max-w-[210mm] min-h-screen bg-white px-3 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between border-b-2 border-black pb-1 text-[11px]">
            <span>Form W-9 (Rev. 3-2024) </span>
            <span>Page 6</span>
          </div>

          {/* Main Two Columns */}
          <div className="grid grid-cols-2 gap-[0.35in]">
            {/* LEFT COLUMN */}
            <div className="text-[11px] leading-[1.08]">
              <p className="mb-2 text-[10px] leading-tight">
                Victims of identity theft who are experiencing economic harm or
                a systemic problem, or are seeking help in resolving tax
                problems that have not been resolved through normal channels,
                may be eligible for Taxpayer Advocate Service (TAS) assistance.
                You can reach TAS by calling the TAS toll-free case intake line
                at 877-777-4778 or TTY/TDD 800-829-4059.
                <br />
                <div className="mb-1 " />
                <b>
                  Protect yourself from suspicious emails or phishing schemes.
                </b>
                Phishing is the creation and use of email and websites designed
                to mimic legitimate business emails and websites. The most
                common act is sending an email to a user falsely claiming to be
                an established legitimate enterprise in an attempt to scam the
                user into surrendering private information that will be used for
                identity theft.
                <br />
                <div className="mb-1 " />
                The IRS does not initiate contacts with taxpayers via emails.
                Also, the IRS does not request personal detailed information
                through email or ask taxpayers for the PIN numbers, passwords,
                or similar secret access information for their credit card,
                bank, or other financial accounts.
                <br />
                <div className="mb-1 " />
                If you receive an unsolicited email claiming to be from the IRS,
                forward this message to phishing@irs.gov. You may also report
                misuse of the IRS name, logo, or other IRS property to the
                Treasury Inspector General for Tax Administration (TIGTA) at
                800-366-4484. You can forward suspicious emails to the Federal
                Trade Commission at spam@uce.gov or report them at
                www.ftc.gov/complaint. You can contact the FTC at
                www.ftc.gov/idtheft or 877-IDTHEFT (877-438-4338). If you have
                been the victim of identity theft, see www.IdentityTheft.gov and
                Pub. 5027.
                <br />
                <div className="mb-1 " />
                Go to www.irs.gov/IdentityTheft to learn more about identity
                theft and how to reduce your risk.
              </p>
            </div>

            {/* RIGHT COLUMN */}
            <div className="text-[11px] leading-[1.08]">
              <p className="mb-2 text-[10px] leading-tight">
                <b className="text-[16px]">Privacy Act Notice</b>
                <br />
                <div className="mb-1 " />
                Section 6109 of the Internal Revenue Code requires you to
                provide your correct TIN to persons (including federal agencies)
                who are required to file information returns with the IRS to
                report interest, dividends, or certain other income paid to you;
                mortgage interest you paid; the acquisition or abandonment of
                secured property; the cancellation of debt; or contributions you
                made to an IRA, Archer MSA, or HSA. The person collecting this
                form uses the information on the form to file information
                returns with the IRS, reporting the above information. Routine
                uses of this information include giving it to the Department of
                Justice for civil and criminal litigation and to cities, states,
                the District of Columbia, and U.S. commonwealths and territories
                for use in administering their laws. The information may also be
                disclosed to other countries under a treaty, to federal and
                state agencies to enforce civil and criminal laws, or to federal
                law enforcement and intelligence agencies to combat terrorism.
                You must provide your TIN whether or not you are required to
                file a tax return. Under section 3406, payors must generally
                withhold a percentage of taxable interest, dividends, and
                certain other payments to a payee who does not give a TIN to the
                payor. Certain penalties may also apply for providing false or
                fraudulent information.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white mt-6 flex items-center justify-center gap-3 border-t border-gray-200 p-4">
          {/*   <button
        type="button"
        onClick={handlePreview}
        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
    >
        Preview
    </button>*/}

          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`px-5 text-white rounded-lg py-2.5 text-sm font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#091122] hover:bg-slate-800"
            }`}
          >
            {loading ? "Saving..." : "Save Application "}
          </button>
        </div>
      </form>
    </>
  );
}
