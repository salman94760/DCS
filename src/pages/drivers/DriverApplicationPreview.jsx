export default function DriverApplicationPreview() {
  return (
    <div className="min-h-screen bg-[#bdbdbd] px-2 py-5 sm:px-4 lg:px-6 font-['Tinos']">
      <div className="mx-auto w-full max-w-[210mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
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
            Complete Driver Application, Qualification, Onboarding &amp; Safety
            Policy Packet
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
                  className="border border-3 border-black w-full h-[28px] p-2"
                  type="text"
                />
              </td>
            </tr>

            <tr>
              <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#133B63] font-['Tinos'] text-[12px]">
                USDOT NUMBER
              </td>

              <td className="h-[25px] border-b border-[#aebdcc]">
                <input
                  className="border border-3 border-black w-full h-[28px] p-2"
                  type="text"
                />
              </td>
            </tr>

            <tr>
              <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#133B63] font-['Tinos'] text-[12px]">
                APPLICANT NAME
              </td>

              <td className="h-[25px] border-b border-[#aebdcc]">
                <input
                  className="border border-3 border-black w-full h-[28px] p-2"
                  type="text"
                />
              </td>
            </tr>

            <tr>
              <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#133B63] font-['Tinos'] text-[12px]">
                POSITION APPLIED FOR
              </td>

              <td className="h-[25px] border-b border-[#aebdcc]">
                <input
                  className="border border-3 border-black w-full h-[28px] p-2"
                  type="text"
                />
              </td>
            </tr>

            <tr>
              <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#133B63] font-['Tinos'] text-[12px]">
                APPLICATION DATE
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

        <section className="mt-[10px] text-center">
          <h2 className="mb-[6px] text-[16px] font-bold text-[#133B63] font-['Tinos'] text-[14px]">
            APPLICANT INSTRUCTIONS
          </h2>

          <p className="mx-auto my-0 max-w-[700px] text-[#133B63] font-['Tinos'] text-[14px] leading-[1.35]">
            Complete every applicable section. Use full legal names, complete
            addresses, and accurate dates. If additional space is needed, attach
            a signed continuation sheet identifying the section and question. Do
            not omit prior employers or driving history.
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
            handled under Form I-9 rules; applicants may choose which acceptable
            I-9 documents to present.
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-[13.5px]">
              <thead>
                <tr>
                  <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[#133B63] font-['Arial'] text-[14px] font-bold text-white">
                    DOCUMENT
                  </th>
                  <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[#133B63] font-['Arial'] text-[14px] font-bold text-white">
                    APPLICANT
                  </th>
                  <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-center align-middle text-[#133B63] font-['Arial'] text-[14px] font-bold text-white">
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
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="text-[#133B63] text-[12px] border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Work authorization / acceptable Form I-9 documentation - as
                    applicable (employee chooses acceptable documents)
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Employment Authorization Document / Work Permit - if
                    applicable and presented
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Social Security card - if presented for I-9 or required for
                    lawful payroll/onboarding purposes
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Current Medical Examiner's Certificate (DOT medical card),
                    if issued / available
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Medical Examination Report MCSA-5875 (long-form medical,
                    commonly 5 pages) - only if requested with driver consent;
                    treated as confidential medical information
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Medical certification verification / CDLIS MVR showing
                    medical status
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Office obtains
                      </span>
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Medical variance / exemption / SPE certificate - if
                    applicable
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Signed DMV / MVR / CDLIS Records Consent Form
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/********page 2 start******/}
      <br />

      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <section className="mt-[12px]">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-[13.5px]">
              <tbody>
                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Signed Background / Consumer Report Authorization -
                    including criminal-history screening where lawful
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Safety Performance History authorization for previous
                    DOT-regulated employers
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    FMCSA Clearinghouse limited-query consent
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    FMCSA Clearinghouse full-query electronic consent
                  </td>

                  <td className="align-middle border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Driver completes in Clearinghouse
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Pre-employment drug-test documentation / result, as
                    applicable
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Office obtains
                      </span>
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Road Test Certificate or accepted equivalent
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        Office completes
                      </span>
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Any additional state, insurance, customer, endorsement,
                    TWIC, permit, or company-required credential
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <span className=" px-[6px] py-[7px] align-middle text-xs">
                        if applicable
                      </span>
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <i className="text-[10.5px]">
                      IMPORTANT: A Social Security card or Employment
                      Authorization Document is not automatically required as
                      the specific Form I-9 document. The employee has the right
                      to present any acceptable document or combination allowed
                      by Form I-9 rules.
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/******page 3 start*****/}
      <br />
      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <section className="mt-[12px]">
          <h2 className="mb-[8px] text-[21px] font-bold leading-[1.2] text-[#174875]">
            23 DMV / MVR / CDLIS DRIVER RECORDS AUTHORIZATION & CONSENT
          </h2>

          <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[12px] font-semibold leading-[1.35] text-[#173f69]">
            This authorization is intended to permit the prospective motor
            carrier and its authorized screening provider to obtain driving-
            record information for lawful employment and driver-qualification
            purposes. It does not replace any separate consent required by a
            State agency or screening provider.
          </div>

          <div className="mb-2 text-[12.5px]">
            I authorize the prospective employer, its authorized agents, and its
            designated consumer reporting or records provider to obtain and
            review motor vehicle records and driver-license information for
            lawful employment and driver-qualification purposes. This
            authorization includes records from State Driver Licensing Agencies
            and, when lawfully available through an authorized source,
            CDLIS-related information concerning my commercial driver license
            status, class, endorsements, restrictions, disqualifications,
            convictions, suspensions/revocations, and medical-certification
            status.
          </div>

          <div className="mb-2 text-[12.5px]">
            I authorize such records to be obtained before employment and, to
            the extent permitted by law, periodically during employment for
            driver qualification, safety, insurance, and compliance purposes. I
            understand that additional State-specific notices or authorizations
            may be required.
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-[13.5px]">
              <tbody>
                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Driver Full Legal Name
                    </span>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Date of Birth
                    </span>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input
                        className="w-full border border-black p-2"
                        type="date"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Driver License / CDL Number
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[20px]"
                      type="text"
                    />
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      State:
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[20px]"
                      type="text"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Current Address
                    </span>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <textarea className="w-full h-[120px] border border-[#555]"></textarea>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Driver signature
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[40px]"
                      type="text"
                    />
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Date:
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[20px]"
                      type="date"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Employer / Authorized Representative
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[40px]"
                      type="text"
                    />
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Date:
                    </span>
                    <br />
                    <input
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
      {/******page 4 start*****/}
      <br />
      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <section className="mt-[12px]">
          <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
            24 STANDALONE BACKGROUND / CONSUMER REPORT DISCLOSURE &
            AUTHORIZATION
          </h2>

          <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[12px] font-semibold leading-[1.35] text-[#173f69]">
            EMPLOYMENT PURPOSES - This page is intended to stand on its own.
            Employers should review applicable Federal, State, and local
            screening laws and provide any additional notices required for the
            applicant’s location.
          </div>
          <div className="mb-2 text-[12.5px]">
            <h2 className="mt-2 mb-[8px] text-[15px] font-bold leading-[1.2] text-[#174875]">
              DISCLOSURE
            </h2>
            I authorize the prospective employer, its authorized agents, and its
            designated consumer reporting or records provider to obtain and
            review motor vehicle records and driver-license information for
            lawful employment and driver-qualification purposes. This
            authorization includes records from State Driver Licensing Agencies
            and, when lawfully available through an authorized source,
            CDLIS-related information concerning my commercial driver license
            status, class, endorsements, restrictions, disqualifications,
            convictions, suspensions/revocations, and medical-certification
            status.
          </div>

          <div className="mb-2 text-[12.5px]">
            <h2 className="mt-2 mb-[8px] text-[15px] font-bold leading-[1.2] text-[#174875]">
              AUTHORIZATION
            </h2>
            I authorize such records to be obtained before employment and, to
            the extent permitted by law, periodically during employment for
            driver qualification, safety, insurance, and compliance purposes. I
            understand that additional State-specific notices or authorizations
            may be required.
          </div>

          <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[12px] font-semibold leading-[1.35] text-[#173f69]">
            This authorization does NOT replace the FMCSA Clearinghouse consent
            process. Full Clearinghouse queries require the driver’s specific
            electronic consent inside the FMCSA Clearinghouse.
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-[13.5px]">
              <tbody>
                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Full Legal Name
                    </span>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Other / Former Names Used
                    </span>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Date of Birth
                    </span>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input
                        className="w-full border border-black p-2"
                        type="date"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Current Address
                    </span>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <textarea className="w-full h-[120px] border border-[#555]"></textarea>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Driver License / CDL Number
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[20px]"
                      type="text"
                    />
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      State:
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[20px]"
                      type="text"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Applicant Signature
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[40px]"
                      type="text"
                    />
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Date:
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[20px]"
                      type="date"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Employer / Authorized Representative
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[40px]"
                      type="text"
                    />
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Date:
                    </span>
                    <br />
                    <input
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
      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div>
          <header class="text-center mb-3">
            <h1
              class="text-[#1d3b61] font-bold uppercase leading-tight
               text-[22px] tracking-[-0.3px]"
            >
              DOT DRUG &amp; ALCOHOL PROGRAM
            </h1>

            <h2
              class="text-[#1d3b61] font-bold uppercase leading-tight
               text-[21px] tracking-[-0.3px]"
            >
              DRIVER REVIEW, CONSENT &amp; COMPANY POLICY
            </h2>

            <p class="font-bold text-[16px] mt-2">
              49 CFR Part 40 and 49 CFR Part 382
            </p>
          </header>

          <section class="mt-1">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
           text-[14px] sm:text-[15px] md:text-[16px]
           px-2 py-[7px]"
            >
              A. COMPANY / DRIVER INFORMATION
            </div>

            <div class="mt-4 sm:mt-5 space-y-4 sm:space-y-[25px]">
              <div
                class="grid grid-cols-1 gap-2
             md:grid-cols-[235px_208px_95px_1fr]
             md:gap-0 md:items-center"
              >
                <label class="font-bold text-[13px] sm:text-[14px]">
                  Motor Carrier / Employer Name:
                </label>

                <input
                  type="text"
                  class="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                />

                <label
                  class="font-bold text-[13px] sm:text-[14px]
               md:pl-1"
                >
                  USDOT No.:
                </label>

                <input
                  type="text"
                  class="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                />
              </div>

              <div
                class="grid grid-cols-1 gap-2
             md:grid-cols-[310px_100px_120px_1fr]
             md:gap-0 md:items-center"
              >
                <label class="font-bold text-[13px] sm:text-[14px]">
                  Designated Employer Representative (DER):
                </label>

                <input
                  type="text"
                  class="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                />

                <label
                  class="font-bold text-[13px] sm:text-[14px]
               md:pl-1"
                >
                  DER Phone / Email:
                </label>

                <input
                  type="text"
                  class="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                />
              </div>

              <div
                class="grid grid-cols-1 gap-2
             md:grid-cols-[100px_1fr_120px_1fr]
             md:gap-0 md:items-center"
              >
                <label class="font-bold text-[13px] sm:text-[14px]">
                  Driver Name:
                </label>

                <input
                  type="text"
                  class="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                />

                <label
                  class="font-bold text-[13px] sm:text-[14px]
               md:pl-1"
                >
                  CDL No. / State:
                </label>

                <input
                  type="text"
                  class="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                />
              </div>

              <div
                class="grid grid-cols-1 gap-2
             md:grid-cols-[135px_1fr_165px_1fr]
             md:gap-0 md:items-center"
              >
                <label class="font-bold text-[13px] sm:text-[14px]">
                  Date of Hire / Use:
                </label>

                <input
                  type="text"
                  class="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                />

                <label
                  class="font-bold text-[13px] sm:text-[14px]
               md:pl-1"
                >
                  Policy Effective / Revision Date:
                </label>

                <input
                  type="text"
                  class="w-full h-[32px] md:h-[26px]
               border-[1.5px] border-[#26364d]
               outline-none px-1"
                />
              </div>
            </div>
          </section>

          <section class="mt-[33px]">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              B. DRIVER DRUG &amp; ALCOHOL PROGRAM REVIEW
            </div>

            <div class="mt-5 px-[-2px]">
              <p class="text-[14px] leading-[1.28] mb-3">
                The driver acknowledges that the Company has explained its DOT
                controlled-substances and alcohol testing program, including
                testing circumstances, prohibited conduct, testing procedures,
                consequences, Clearinghouse obligations, and driver
                responsibilities. The driver is encouraged to ask questions
                before signing.
              </p>

              <div class="space-y-[7px] text-[14px] leading-[1.15]">
                <label class="block">
                  <input type="checkbox" />I understand whether my position is
                  subject to 49 CFR Part 382 and DOT testing requirements.
                </label>

                <label class="block">
                  <input type="checkbox" />
                  Participation in the Company DOT drug and alcohol testing
                  program is required to perform covered safety-sensitive
                  functions.
                </label>

                <label class="block">
                  <input type="checkbox" />I reviewed prohibited drug and
                  alcohol conduct and the circumstances for pre-employment,
                  random, reasonable-suspicion, post-accident, return-to-duty,
                  and follow-up testing.
                </label>

                <label class="block">
                  <input type="checkbox" />I understand that a refusal to test
                  is a DOT violation when the applicable rules define the
                  conduct as a refusal.
                </label>

                <label class="block">
                  <input type="checkbox" />I understand the consequences of a
                  verified positive drug test, an alcohol concentration of 0.04
                  or greater, or a refusal, including removal from
                  safety-sensitive functions and the SAP/return-to-duty process.
                </label>

                <label class="block">
                  <input type="checkbox" />I understand that an alcohol
                  concentration of 0.02 through 0.039 requires temporary removal
                  from safety-sensitive functions as required by the
                  regulations.
                </label>

                <label class="block">
                  <input type="checkbox" />I understand my obligations relating
                  to required FMCSA Drug &amp; Alcohol Clearinghouse queries.
                </label>

                <label class="block">
                  <input type="checkbox" />I received information about the
                  effects and consequences of alcohol misuse and
                  controlled-substances use, signs and symptoms, and
                  intervention resources.
                </label>

                <label class="block">
                  <input type="checkbox" />I understand that
                  Company-authority/non-DOT testing or discipline must be
                  identified separately from DOT requirements.
                </label>
              </div>
            </div>
          </section>

          <section class="mt-1">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              C. CONSENT AND AUTHORIZATION FOR DOT-REQUIRED TESTING
            </div>

            <div class="mt-5 text-[14px] leading-[1.28]">
              <p class="mb-4">
                I authorize and consent to controlled-substances and alcohol
                testing required by applicable DOT/FMCSA regulations while I am
                subject to the Company DOT testing program. DOT tests will be
                conducted under 49 CFR Part 40 and applicable FMCSA
                requirements. This authorization does not replace any separate
                consent or electronic consent required by law, including consent
                required within the FMCSA Drug &amp; Alcohol Clearinghouse.
              </p>

              <p>
                I authorize the Company and its authorized service agents, as
                permitted by applicable law and DOT regulations, to receive and
                use DOT test results and related compliance information for
                safety-sensitive qualification, regulatory compliance, and
                employment/use decisions. DOT records remain subject to
                applicable confidentiality and release restrictions.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/******page 6 start *******/}

      <br />
      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div>
          <section class="mt-1">
            <div class="mt-5 space-y-[25px]">
              <div class="flex w-[100%]">
                <div className="w-[50%]">
                  <label class="font-bold text-[14px]">Driver signature:</label>

                  <input
                    type="text"
                    class="h-[30px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                  />
                </div>
                <div className="w-[50%] text-right">
                  <label class="font-bold text-[14px] pl-1">Date:</label>

                  <input
                    type="date"
                    class="h-[26px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                  />
                </div>
              </div>

              <div class="flex w-[100%]">
                <div className="w-[50%]">
                  <label class="font-bold text-[14px]">Printed Name:</label>

                  <input
                    type="text"
                    class="h-[30px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                  />
                </div>
                <div className="w-[50%] text-right">
                  <label class="font-bold text-[14px] pl-1">
                    CDL No. / State:
                  </label>

                  <input
                    type="text"
                    class="h-[26px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                  />
                </div>
              </div>

              <div class="flex w-[100%]">
                <div className="w-[50%]">
                  <label class="font-bold text-[14px]">
                    Company Representative:
                  </label>

                  <input
                    type="text"
                    class="h-[30px] w-[50%] border-[1.5px] border-[#26364d] outline-none px-1"
                  />
                </div>
                <div className="w-[50%] text-right">
                  <label class="font-bold text-[14px] pl-1">Date:</label>

                  <input
                    type="date"
                    class="h-[26px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                  />
                </div>
              </div>
            </div>
          </section>

          <section class="mt-[33px]">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              D. COMPANY DOT DRUG & ALCOHOL POLICY AND PROCEDURES
            </div>

            <div class="mt-5 px-[-2px]">
              <p class="text-[14px] leading-[1.28] mb-3">
                Policy Purpose. The Company is committed to public safety and
                compliance with DOT/FMCSA controlled-substances and alcohol
                testing requirements. This policy applies to covered drivers
                required to hold a CDL who perform safety-sensitive functions
                subject to 49 CFR Part 382. DOT testing will be administered in
                accordance with 49 CFR Part 40 and applicable provisions of Part
                382.
                <br />
                <br />
                Designated Employer Representative (DER). The Company will
                identify a DER authorized to receive program communications and
                results, remove drivers from safety-sensitive functions when
                required, and take immediate compliance actions. The DER name,
                telephone number, and office/contact information must be
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

          <section class="mt-1">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              E. PROHIBITED CONDUCT
            </div>

            <div class="mt-5 text-[14px] leading-[1.28]">
              <p class="mb-4">
                • A covered driver may not perform safety-sensitive functions
                when prohibited by the alcohol rules, including prohibited
                alcohol use before, during, or following safety-sensitive duties
                as specified by applicable FMCSA regulations.
                <br />
                • A covered driver may not report for or remain on duty
                requiring safety-sensitive functions when using controlled
                substances
                <br />
                contrary to applicable DOT/FMCSA requirements. • A covered
                driver may not refuse to submit to a DOT-required test.
                <br />
                • A covered driver may not perform safety-sensitive functions
                after a verified positive controlled-substances test, an alcohol
                <br />
                concentration of 0.04 or greater, or a refusal until applicable
                return-to-duty requirements are satisfied.
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

          <section class="mt-1">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              F. TYPES OF DOT TESTING
            </div>

            <div class="mt-5 text-[14px] leading-[1.28]">
              <p class="mb-4">
                • Pre-Employment - required controlled-substances testing before
                first covered safety-sensitive duty, subject to regulatory
                exceptions.
                <br />
                • Random - unannounced random testing using a scientifically
                valid selection process at applicable FMCSA rates.
                <br />
                • Reasonable Suspicion - testing based on observations made by a
                supervisor trained as required by the regulations.
                <br />
                • Post-Accident - testing when applicable FMCSA accident
                criteria require it, with required documentation when testing
                cannot be timely completed.
                <br />
                • Return-to-Duty - testing after completion of the required SAP
                process and before resuming safety-sensitive functions.
                <br />• Follow-Up - unannounced testing according to the SAP
                prescribed follow-up plan.
              </p>
            </div>
          </section>

          <section class="mt-1">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              G. TESTING PROCEDURES, RESULTS & CONFIDENTIALITY
            </div>
          </section>
        </div>
      </div>

      {/*****page 7 start********/}

      <br />
      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div>
          <section class="mt-1">
            <div class="mt-5 text-[14px] leading-[1.28]">
              <p class="mb-4">
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

          <section class="mt-[33px]">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              H. CONSEQUENCES, SAP & RETURN-TO-DUTY
            </div>

            <div class="mt-5 px-[-2px]">
              <p class="text-[14px] leading-[1.28] mb-3">
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

          <section class="mt-1">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              I. CLEARINGHOUSE PROCEDURES
            </div>

            <div class="mt-5 text-[14px] leading-[1.28]">
              <p class="mb-4">
                The Company will comply with applicable FMCSA Drug & Alcohol
                Clearinghouse requirements, including required pre-
                employment/full queries, annual queries, reporting obligations,
                and prohibitions on permitting a driver with a prohibited status
                to perform safety-sensitive functions. A separate limited-query
                consent may be used when permitted. This paper form does not
                substitute for specific electronic consent required for a full
                Clearinghouse query.
              </p>
            </div>
          </section>

          <section class="mt-1">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              J. DRIVER EDUCATION / EFFECTS OF DRUGS AND ALCOHOL
            </div>

            <div class="mt-5 text-[14px] leading-[1.28]">
              <p class="mb-4">
                The Company will provide covered drivers with educational
                materials explaining the DOT/FMCSA program and Company policy,
                including the effects and consequences of alcohol misuse and
                controlled-substances use on health, safety, work, and personal
                life; signs and symptoms; and available methods of intervention.
                Drivers may contact the DER for additional information and
                resources.
              </p>
            </div>
          </section>

          <section class="mt-1">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              K. COMPANY-SPECIFIC PROVISIONS - COMPLETE BEFORE ISSUING POLICY
            </div>
            <br />
            <br />

            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-[13.5px]">
                <tbody>
                  <tr>
                    <td className=" px-[6px] py-[7px] align-top leading-[1.22]">
                      DER Name / Title
                    </td>
                    <td
                      colspan="2"
                      className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                    >
                      <input
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
                      colspan="2"
                      className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                    >
                      <input
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
                      colspan="2"
                      className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                    >
                      <input
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
                      colspan="2"
                      className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                    >
                      <input
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
                      colspan="2"
                      className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                    >
                      <input
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
                      colspan="2"
                      className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                    >
                      <input
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
                      colspan="2"
                      className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                    >
                      <input
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
      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div>
          <section class="mt-1">
            <div class="mt-5 text-[14px] leading-[1.28]">
              <p class="mb-4">
                <b>
                  Separate non-DOT / Company-authority testing policy, if any
                </b>
              </p>
            </div>
          </section>

          <section class="mt-[33px]">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              L. CERTIFICATE OF RECEIPT OF COMPANY POLICY & EDUCATIONAL
              MATERIALS
            </div>

            <div class="mt-5 px-[-2px]">
              <p class="text-[14px] leading-[1.28] mb-3">
                I certify that I received a copy of the Company DOT Drug &
                Alcohol Policy and Procedures and the educational materials
                provided under the Company FMCSA drug and alcohol program. My
                signature confirms receipt of these materials.
              </p>

              <section class="mt-1">
                <div class="mt-5 space-y-[25px]">
                  <div class="flex w-[100%]">
                    <div className="w-[50%]">
                      <label class="font-bold text-[14px]">
                        Driver Printed Name:
                      </label>

                      <input
                        type="text"
                        class="h-[30px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                      />
                    </div>
                    <div className="w-[50%] text-right">
                      <label class="font-bold text-[14px] pl-1">
                        CDL No. / State:
                      </label>

                      <input
                        type="text"
                        class="h-[26px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                      />
                    </div>
                  </div>

                  <div class="flex w-[100%]">
                    <div className="w-[50%]">
                      <label class="font-bold text-[14px]">
                        Driver Signature:
                      </label>

                      <input
                        type="text"
                        class="h-[30px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                      />
                    </div>
                    <div className="w-[50%] text-right">
                      <label class="font-bold text-[14px] pl-1">Date:</label>

                      <input
                        type="date"
                        class="h-[26px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                      />
                    </div>
                  </div>

                  <div class="flex w-[100%]">
                    <div className="w-[50%]">
                      <label class="font-bold text-[14px]">
                        Company Representative:
                      </label>

                      <input
                        type="text"
                        class="h-[30px] w-[50%] border-[1.5px] border-[#26364d] outline-none px-1"
                      />
                    </div>
                    <div className="w-[50%] text-right">
                      <label class="font-bold text-[14px] pl-1">Title:</label>

                      <input
                        type="text"
                        class="h-[26px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                      />
                    </div>
                  </div>

                  <div class="flex w-[100%]">
                    <div className="w-[50%]">
                      <label class="font-bold text-[14px]">
                        Representative Signature:
                      </label>

                      <input
                        type="text"
                        class="h-[30px] w-[50%] border-[1.5px] border-[#26364d] outline-none px-1"
                      />
                    </div>
                    <div className="w-[50%] text-right">
                      <label class="font-bold text-[14px] pl-1">Date:</label>

                      <input
                        type="date"
                        class="h-[26px] w-[60%] border-[1.5px] border-[#26364d] outline-none px-1"
                      />
                    </div>
                  </div>
                  <br />
                </div>
              </section>
            </div>
          </section>

          <section class="mt-1">
            <div
              class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
            >
              M. EMPLOYER DRUG & ALCOHOL COMPLIANCE CHECKLIST
            </div>

            <div class="mt-5 text-[14px] leading-[1.28]">
              <p class="mb-4">
                <input type="checkbox" /> Written Part 382 drug and alcohol
                policy completed with company-specific information.
                <br />
                <input type="checkbox" />
                Driver received policy and educational materials.
                <br />
                <input type="checkbox" />
                Signed certificate of receipt retained by employer.
                <br />
                <input type="checkbox" />
                Pre-employment drug test or qualifying exception documented
                before first safety-sensitive function.
                <br />
                <input type="checkbox" />
                Clearinghouse pre-employment query completed and driver not
                prohibited.
                <br />
                <input type="checkbox" />
                Driver enrolled in random testing pool/consortium when required.
                <br />
                <input type="checkbox" />
                Annual Clearinghouse query tracked and completed.
                <br />
                <input type="checkbox" />
                Prior-employer DOT drug/alcohol information request completed
                when required.
                <br />
                <input type="checkbox" />
                Supervisor reasonable-suspicion training documented (at least 60
                minutes alcohol and 60 minutes controlled substances) for
                persons who make determinations.
                <br />
                <input type="checkbox" />
                DOT drug/alcohol records maintained securely with appropriate
                access controls.
                <br />
                <input type="checkbox" />
                DER and service-agent contact information current.
                <br />
                <input type="checkbox" />
                Any non-DOT testing program separately documented and clearly
                distinguished from DOT testing.
                <br />
                <span className="text-[10px] leading-tight">
                  <i>
                    Company completion note: Before issuing this policy,
                    complete all company-specific fields and review any
                    disciplinary provisions, state-law requirements, collective
                    bargaining obligations, and non-DOT testing provisions
                    applicable to the motor carrier.
                  </i>
                </span>
              </p>
            </div>
          </section>
        </div>
      </div>

      {/*****page 9 start********/}

      <br />
      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div class="w-full">
          <h1
            class="text-center font-bold
           text-[16px] sm:text-[18px] md:text-[20px]
           leading-[20px] sm:leading-[22px]
           mb-[6px]"
          >
            SAFETY PERFORMANCE HISTORY RECORDS REQUEST
          </h1>

          <div
            class="border border-[#26364d] bg-[#dbe4f1]
           min-h-[32px]
           flex flex-col
           md:flex-row md:items-center
           text-[13px] sm:text-[14px] md:text-[15px]
           font-bold"
          >
            <div
              class="w-full md:w-[75px]
             min-h-[32px]
             flex items-center
             px-[5px]
             border-b md:border-b-0
             md:border-r border-[#26364d]"
            >
              PART 1:
            </div>

            <div
              class="w-full md:flex-1
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
            class="border-x border-b border-[#333]
           px-[5px]
           pt-[5px]
           pb-[6px]"
          >
            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             min-h-[20px]
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">I, (Print Name):</span>

              <input
                class="w-full sm:flex-1 md:flex-none
               md:w-[378px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />

              <span class="ml-0 sm:ml-[8px] whitespace-nowrap">XXX-XX-___</span>

              <span class="ml-0 sm:ml-[7px] whitespace-nowrap">
                Social Security Number
              </span>
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             min-h-[20px]
             mt-2 sm:mt-0
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">Date of Birth:</span>

              <input
                class="w-full sm:w-[190px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             min-h-[26px]
             mt-2 sm:mt-0
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">Hereby authorize:</span>

              <input
                class="w-full
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[26px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">Previous Employer:</span>

              <input
                class="w-full sm:flex-1 md:flex-none
               md:w-[337px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />

              <span
                class="ml-0 sm:ml-[5px]
               whitespace-nowrap"
              >
                Email:
              </span>

              <input
                class="w-full sm:w-[142px]
               ml-0 sm:ml-[4px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">Street:</span>

              <input
                class="w-full sm:flex-1 md:flex-none
               md:w-[333px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />

              <span
                class="ml-0 sm:ml-[5px]
               whitespace-nowrap"
              >
                Telephone:
              </span>

              <input
                class="w-full sm:w-[125px]
               ml-0 sm:ml-[4px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">City, State, Zip:</span>

              <input
                class="w-full sm:flex-1 md:flex-none
               md:w-[340px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />

              <span
                class="ml-0 sm:ml-[5px]
               whitespace-nowrap"
              >
                Fax No.:
              </span>

              <input
                class="w-full sm:w-[125px]
               ml-0 sm:ml-[4px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="text-[13px] sm:text-[14px]
             leading-[17px]
             mt-[8px] sm:mt-[3px]"
            >
              To release and forward the information requested by section 3 of
              this document concerning my Alcohol and Controlled Substances
              Testing records within the previous 3 years from
              <input
                class="inline-block
               w-full sm:w-[174px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               align-middle
               outline-none
               mt-1 sm:mt-0"
              />
              <br />
              (employment application date)
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">Prospective Employer:</span>

              <input
                class="w-full sm:flex-1 md:flex-none
               md:w-[355px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">Attention:</span>

              <input
                class="w-full sm:flex-1 md:flex-none
               md:w-[380px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />

              <span
                class="ml-0 sm:ml-[5px]
               whitespace-nowrap"
              >
                Telephone:
              </span>

              <input
                class="w-full sm:w-[120px]
               ml-0 sm:ml-[4px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">To: &nbsp;Street:</span>

              <input
                class="w-full sm:flex-1 md:flex-none
               md:w-[380px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[13px] sm:text-[14px]"
            >
              <span
                class="ml-0 sm:ml-[32px]
               whitespace-nowrap"
              >
                City, State, Zip:
              </span>

              <input
                class="w-full sm:w-[340px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <p
              class="text-[12px] sm:text-[13px]
             leading-[16px]
             mt-[8px] sm:mt-[4px]
             mb-[5px]"
            >
              In compliance with §40.25(g) and 391.23(h), release of this
              information must be made in a written form that ensures
              confidentiality, such as fax, email, or letter.
            </p>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">
                Prospective employer's fax number:
              </span>

              <input
                class="w-full sm:flex-1 md:flex-none
               md:w-[315px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">
                Prospective employer's email address:
              </span>

              <input
                class="w-full sm:flex-1 md:flex-none
               md:w-[285px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             mt-2 sm:mt-0
             text-[13px] sm:text-[14px]"
            >
              <span class="whitespace-nowrap">Driver Signature:</span>

              <input
                class="w-full sm:w-[360px]
               ml-0 sm:ml-[5px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="flex flex-wrap
             sm:items-center
             text-[12px] sm:text-[13px]
             mt-2"
            >
              <div class="hidden sm:block sm:w-[365px]"></div>

              <span class="whitespace-nowrap">Applicant's Signature</span>

              <span
                class="ml-4 sm:ml-[38px]
               whitespace-nowrap"
              >
                Date
              </span>
            </div>

            <div class="mt-1">
              <input
                class="w-full sm:w-[355px]
               sm:ml-[365px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <p
              class="text-[12px] sm:text-[13px]
             leading-[16px]
             mt-[5px]"
            >
              This information is being requested in compliance with §40.25(g)
              and 391.23.
            </p>
          </div>

          <div
            class="border-x border-b border-[#26364d]
           bg-[#dbe4f1]
           min-h-[32px]
           flex flex-col
           md:flex-row md:items-center
           text-[13px] sm:text-[14px] md:text-[15px]
           font-bold"
          >
            <div
              class="w-full md:w-[72px]
             min-h-[32px]
             flex items-center
             px-[5px]
             border-b md:border-b-0
             md:border-r border-[#26364d]"
            >
              PART 2:
            </div>

            <div
              class="w-full md:flex-1
             min-h-[32px]
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
            class="border-x border-b border-[#333]
           px-[5px]
           pt-[7px]
           pb-[6px]"
          >
            <h2
              class="text-center font-bold
             text-[15px] sm:text-[17px]
             leading-[19px]
             mb-[4px]"
            >
              ACCIDENT HISTORY
            </h2>

            <div
              class="font-bold
             text-[12px] sm:text-[13px]
             leading-[17px]"
            >
              The applicant named above was employed by us.
              <span class="ml-[3px]">Yes</span>
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              <span class="ml-[3px]">No</span>
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              <br />
              Employed as
              <input
                class="w-[120px] sm:w-[160px]
               h-[24px]
               border border-[#26364d]
               align-middle
               outline-none"
              />
              from (m/y)
              <input
                class="w-[65px] sm:w-[80px]
               h-[24px]
               border border-[#26364d]
               align-middle
               outline-none"
              />
              to (m/y)
              <input
                class="w-[65px] sm:w-[80px]
               h-[24px]
               border border-[#26364d]
               align-middle
               outline-none"
              />
              <br />
              1. Did he/she drive motor vehicle for you? Yes
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              No
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              If yes, what type? Straight Truck
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              Tractor-Semitrailer
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              Bus
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              Cargo Tank
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              <br />
              Doubles/Triples
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              Other (Specify)
              <input
                class="w-[90px] sm:w-[105px]
               h-[24px]
               border border-[#26364d]
               align-middle
               outline-none"
              />
              <br />
              2. Reason for leaving your employment: Discharged
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              Resignation
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              Lay Off
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              Military Duty
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              If there is no safety performance history to report, check here
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              sign below and return.
            </div>

            <div
              class="font-bold
             text-[12px] sm:text-[13px]
             leading-[17px]
             mt-[3px]"
            >
              ACCIDENTS: Complete the following for any accidents included in
              your accident register (§390.15(b)) that involved the applicant in
              the 3 years prior to the application date shown above, or check
              <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
              here if there is no accident register data for this driver.
            </div>

            <div class="w-full overflow-x-auto mt-[4px]">
              <table
                class="w-full min-w-[600px]
               border-collapse
               border border-[#333]
               text-[12px]"
              >
                <thead>
                  <tr class="h-[28px]">
                    <th class="border border-[#333] w-[20%]">Date</th>

                    <th class="border border-[#333] w-[20%]">Location</th>

                    <th class="border border-[#333] w-[20%]"># Injuries</th>

                    <th class="border border-[#333] w-[20%]"># Fatalities</th>

                    <th class="border border-[#333] w-[20%]">Hazmat Spill</th>
                  </tr>
                </thead>

                <tbody>
                  <tr class="h-[34px]">
                    <td class="border border-[#333] p-[3px]">
                      <input
                        class="w-full h-[27px]
                       border border-[#26364d]
                       outline-none"
                      />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input
                        class="w-full h-[27px]
                       border border-[#26364d]
                       outline-none"
                      />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input
                        class="w-full h-[27px]
                       border border-[#26364d]
                       outline-none"
                      />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input
                        class="w-full h-[27px]
                       border border-[#26364d]
                       outline-none"
                      />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input
                        class="w-full h-[27px]
                       border border-[#26364d]
                       outline-none"
                      />
                    </td>
                  </tr>

                  <tr class="h-[34px]">
                    <td class="border border-[#333] p-[3px]">
                      <input class="w-full h-[27px] border border-[#26364d] outline-none" />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input class="w-full h-[27px] border border-[#26364d] outline-none" />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input class="w-full h-[27px] border border-[#26364d] outline-none" />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input class="w-full h-[27px] border border-[#26364d] outline-none" />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input class="w-full h-[27px] border border-[#26364d] outline-none" />
                    </td>
                  </tr>

                  <tr class="h-[34px]">
                    <td class="border border-[#333] p-[3px]">
                      <input class="w-full h-[27px] border border-[#26364d] outline-none" />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input class="w-full h-[27px] border border-[#26364d] outline-none" />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input class="w-full h-[27px] border border-[#26364d] outline-none" />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input class="w-full h-[27px] border border-[#26364d] outline-none" />
                    </td>

                    <td class="border border-[#333] p-[3px]">
                      <input class="w-full h-[27px] border border-[#26364d] outline-none" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              class="mt-[15px] sm:mt-[20px]
             text-[12px] sm:text-[13px]
             leading-[17px]"
            >
              Please provide information concerning any other accidents
              involving the applicant that were reported to government agencies
              or insurers or retained under internal company policies:
              <input
                class="w-full
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none
               align-middle
               mt-1"
              />
            </div>

            <div class="mt-[3px]">
              <input
                class="w-full
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none block"
              />

              <input
                class="w-full
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none block"
              />
            </div>

            <div
              class="mt-[4px]
             text-[12px] sm:text-[13px]
             font-bold"
            >
              Any other remarks:
              <input
                class="w-full
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none
               align-middle
               mt-1"
              />
            </div>

            <div class="mt-[3px]">
              <input
                class="w-full
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none block"
              />

              <input
                class="w-full
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none block"
              />
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             text-[12px] sm:text-[13px]
             mt-[3px]"
            >
              <span class="whitespace-nowrap">Signature:</span>

              <input
                class="w-full sm:w-[340px]
               ml-0 sm:ml-[3px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>

            <div
              class="flex flex-col sm:flex-row
             sm:items-center
             gap-1 sm:gap-0
             text-[12px] sm:text-[13px]
             mt-[3px]"
            >
              <span>Title:</span>

              <input
                class="w-full sm:w-[180px]
               ml-0 sm:ml-[3px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />

              <span class="ml-0 sm:ml-[8px]">Date:</span>

              <input
                class="w-full sm:w-[190px]
               ml-0 sm:ml-[3px]
               h-[28px] sm:h-[24px]
               border border-[#26364d]
               outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/*****page 10 start********/}

      <br />
      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div class="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div class="w-full">
            <h1 className="m-0 text-[24px] text-center font-bold leading-[1.22] tracking-[0.3px] text-[#173f69]">
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

            <section class="mt-1">
              <div
                class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
              >
                DRIVER / CARRIER / VEHICLE INFORMATION
              </div>

              <div className="overflow-x-auto">
                <table className="bg-gray-200 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr>
                      <td className="border border-[#555] text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Driver Full Name</b>
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
                          <b>CDL Number / State / Class</b>
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
                          <b>Motor Carrier Legal Name</b>
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
                          <b>USDOT Number</b>
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
                          <b>Test Date / Start Time / End Time</b>
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
                          <b>Test Location / Route</b>
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
                          <b>Power Unit Year / Make / Unit No.</b>
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
                          <b>Trailer Type / Unit No.</b>
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
                          <b>Transmission</b>
                        </span>
                      </td>
                      <td className="border border-[#555] text-left">
                        <div className="flex pl-2">
                          <input
                            className="border border-black"
                            type="checkbox"
                          />
                          &nbsp;Manual &nbsp;
                          <input
                            className="border border-black"
                            type="checkbox"
                          />
                          &nbsp;Automatic
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-[#555] text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Approximate Road-Test Miles</b>
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
                          <b>Weather / Road Conditions</b>
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
                  </tbody>
                </table>
              </div>
              <div
                class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
              >
                PROFICIENCY RATING SCALE
              </div>

              <p className="text-[11px]">
                Rate each applicable item: 4 = Excellent, 3 = Satisfactory, 2 =
                Needs Improvement, 1 = Unsatisfactory, N/A = Not Applicable. Any
                safety- critical unsatisfactory performance should be explained
                in the remarks section.
              </p>
            </section>

            <section class="mt-1">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse border-black text-[13.5px]">
                  <thead className="bg-[#1d3b61] text-white">
                    <tr>
                      <th className="text-[11px]">Evaluation Item </th>
                      <th className="text-[11px]">Performance Standard </th>
                      <th>4</th>
                      <th>3</th>
                      <th>2</th>
                      <th>1</th>
                      <th>N/A</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Pre-trip inspection
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Vehicle condition, tires/wheels, lights, brakes, leaks,
                        emergency equipment, required documents
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Coupling / uncoupling
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Fifth wheel, kingpin, airlines/electrical, landing gear,
                        tug test, visual verification
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Cab setup / controls
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Seat/mirrors, seat belt, gauges, warning devices,
                        controls, safe start
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Brake system knowledge
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Air-brake checks if applicable, parking/service brake,
                        low-air warnings, proper use
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Starting / shifting
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Smooth starts, gear selection, clutch use if applicable,
                        avoids rollback/stall
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
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
      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div class="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div class="w-full">
            <section class="mt-1">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse border-black text-[13.5px]">
                  <tbody>
                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Steering / lane control
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Maintains lane, tracks turns, proper hand control,
                        avoids curb/objects
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Intersections / right-of-way
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Scanning, controlled approach, signs/signals, right-
                        of-way decisions
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Turns
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Signal timing, lane position, off- tracking awareness,
                        clearance, speed control
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Lane changes / merging
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Mirrors, signal, blind-spot awareness, spacing, smooth
                        merge
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Following distance
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Maintains adequate space and adjusts for speed, traffic
                        and conditions
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Speed management
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Complies with limits and conditions; controls speed on
                        grades/curves
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Passing / being passed
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Safe decision, clearance, mirrors, signaling, lane
                        return
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Railroad crossings
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Proper approach, observation and compliance when
                        applicable
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Braking / stopping
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Smooth, controlled stops; anticipates traffic; avoids
                        harsh braking
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Backing
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        GOAL when needed, mirror use, controlled speed, setup,
                        clearance, spotter communication
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Parking / securement
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Safe parking, brake application, transmission, wheel
                        position/chocks as applicable
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Hazard perception
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Identifies hazards early, escape routes, construction,
                        pedestrians, cyclists
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Defensive driving
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Space management, patience, distraction avoidance, safe
                        decision-making
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Communication
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Signals, horn/lights when appropriate, professional
                        interaction
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          ELD / HOS basic proficiency
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Can locate duty status, logs, annotations and
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
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
      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div class="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div class="w-full">
            <section class="mt-1">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse border-black text-[13.5px]">
                  <tbody>
                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Missing_salman
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        roadside display/transfer if evaluated
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>

                    <tr className="border border-[#555]">
                      <td className="border border-[#555] text-[17px] p-1">
                        <div className="text-xs font-bold leading-tight">
                          Post-trip / defect reporting
                        </div>
                      </td>

                      <td className="border border-[#555] text-[11px] p-1 leading-[14px]">
                        Identifies/report defects and secures vehicle at end of
                        test
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] text-center p-1 align-middle">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>

                      <td className="border border-[#555] p-1 align-top">
                        <textarea className="w-full min-w-0 h-[80px] sm:h-[120px] border border-black resize-none outline-none text-[11px] p-1"></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section class="mt-1">
              <div
                class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
              >
                SAFETY-CRITICAL OBSERVATIONS / REMARKS
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed text-[13.5px]">
                  <tbody>
                    <tr>
                      <td
                        colspan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td
                        colspan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td
                        colspan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td
                        colspan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td
                        colspan="2"
                        className=" px-[6px] py-[7px] align-middle text-left text-[17px]"
                      >
                        <input
                          className="w-full border border-black"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section class="mt-1">
              <div
                class="bg-[#1d3b61] text-white font-bold uppercase
               text-[16px] px-2 py-[7px]"
              >
                EXAMINER FINAL DETERMINATION
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed text-[13.5px]">
                  <tbody>
                    <tr>
                      <td>
                        <input type="checkbox" /> PASS - Driver demonstrated
                        sufficient skill to safely operate the vehicle/equipment
                        tested.
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input type="checkbox" /> PASS WITH COACHING - Driver
                        passed; non-critical coaching items are documented
                        above.
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input type="checkbox" /> FAIL / RETEST REQUIRED -
                        Driver did not demonstrate sufficient skill. Driver may
                        not be assigned based on this test until carrier
                        requirements are satisfied.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section class="mt-1">
              <div className="overflow-x-auto">
                <table className="bg-gray-200 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr>
                      <td className="border border-[#555] text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Examiner Name</b>
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
                          <b>Examiner Title / Organization</b>
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
                          <b>Date</b>
                        </span>
                      </td>
                      <td className="border border-[#555]  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-[#555] text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Driver Signature acknowledging results</b>
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
                          <b>Date</b>
                        </span>
                      </td>
                      <td className="border border-[#555]  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
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
      <div className="mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div class="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div class="w-full">
            <h1 className="m-0 text-[24px] text-center font-bold leading-[1.22] tracking-[0.3px] text-[#173f69]">
              CERTIFICATE OF DRIVER'S ROAD TEST
            </h1>

            <p className="text-center text-[12px] mt-2">49 CFR 391.31</p>

            <p className="text-[12px] mt-2">
              Complete after the driver successfully completes the road test,
              unless the carrier relies on a permitted equivalent under the
              applicable regulation.
            </p>

            <section class="mt-1">
              <div className="overflow-x-auto">
                <table className="bg-gray-200 w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr>
                      <td className="border border-[#555] text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Driver Full Name</b>
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
                          <b>CDL / Operator License Number</b>
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
                          <b>State / Class / Endorsements</b>
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
                          <b>Motor Carrier Legal Name</b>
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
                          <b>USDOT Number</b>
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
                          <b>Power Unit Type</b>
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
                          <b>Trailer(s) / Equipment Type</b>
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
                          <b>Date of Road Test</b>
                        </span>
                      </td>
                      <td className="border border-[#555]  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-[#555] text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Approximate Miles</b>
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
                  </tbody>
                </table>
              </div>

              <p className="text-[11px]">
                I certify that the above-named driver was given a road test
                under my supervision on the date shown and that the driver
                demonstrated sufficient driving skill to operate safely the type
                of commercial motor vehicle and equipment identified above,
                subject to the motor carrier’s qualification determination and
                applicable Federal Motor Carrier Safety Regulations.
              </p>
            </section>

            <section class="mt-1">
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
                            className="h-[28px] w-full border border-black p-2"
                            type="date"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[11px]">
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

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <h4 className="m-0 mb-2 text-[13px] text-center font-bold leading-[1.22] tracking-[0.3px] text-black">
              THE BELOW DISCLOSURE AND AUTHORIZATION LANGUAGE IS FOR MANDATORY
              USE BY ALL ACCOUNT HOLDERS
            </h4>
            <h4 className="mb-2 text-[15px] text-center font-bold leading-[1.22] tracking-[0.3px] text-black">
              IMPORTANT DISCLOSURE
              <br />
              REGARDING BACKGROUND REPORTS FROM THE PSP Online Service
            </h4>
            <p className="text-[12px] mb-1">
              In connection with your application for employment with{" "}
              <input className="border border-black" type="text" />{" "}
              (“Prospective Employer”), Prospective Employer, its employees,
              agents or contractors may obtain one or more reports regarding
              your driving, and safety inspection history from the Federal Motor
              Carrier Safety Administration (FMCSA).
            </p>
            <p className="text-[12px] mb-1">
              When the application for employment is submitted in person, if the
              Prospective Employer uses any information it obtains from FMCSA in
              a decision to not hire you or to make any other adverse employment
              decision regarding you, the Prospective Employer will provide you
              with a copy of the report upon which its decision was based and a
              written summary of your rights under the Fair Credit Reporting Act
              before taking any final adverse action. If any final adverse
              action is taken against you based upon your driving history or
              safety report, the Prospective Employer will notify you that the
              action has been taken and that the action was based in part or in
              whole on this report.
            </p>
            <p className="text-[12px] mb-1">
              When the application for employment is submitted by mail,
              telephone, computer, or other similar means, if the Prospective
              Employer uses any information it obtains from FMCSA in a decision
              to not hire you or to make any other adverse employment decision
              regarding you, the Prospective Employer must provide you within
              three business days of taking adverse action oral, written or
              electronic notification: that adverse action has been taken based
              in whole or in part on information obtained from FMCSA; the name,
              address, and the toll free telephone number of FMCSA; that the
              FMCSA did not make the decision to take the adverse action and is
              unable to provide you the specific reasons why the adverse action
              was taken; and that you may, upon providing proper identification,
              request a free copy of the report and may dispute with the FMCSA
              the accuracy or completeness of any information or report. If you
              request a copy of a driver record from the Prospective Employer
              who procured the report, then, within 3 business days of receiving
              your request, together with proper identification, the Prospective
              Employer must send or provide to you a copy of your report and a
              summary of your rights under the Fair Credit Reporting Act.
            </p>
            <p className="text-[12px] mb-1">
              Neither the Prospective Employer nor the FMCSA contractor
              supplying the crash and safety information has the capability to
              correct any safety data that appears to be incorrect. You may
              challenge the accuracy of the data by submitting a request to
              https://dataqs.fmcsa.dot.gov. If you challenge crash or inspection
              information reported by a State, FMCSA cannot change or correct
              this data. Your request will be forwarded by the DataQs system to
              the appropriate State for adjudication.
            </p>
            <p className="text-[12px] mb-1">
              Any crash or inspection in which you were involved will display on
              your PSP report. Since the PSP report does not report, or assign,
              or imply fault, it will include all Commercial Motor Vehicle (CMV)
              crashes where you were a driver or co-driver and where those
              crashes were reported to FMCSA, regardless of fault. Similarly,
              all inspections, with or without violations, appear on the PSP
              report. State citations associated with Federal Motor Carrier
              Safety Regulations (FMCSR) violations that have been adjudicated
              by a court of law will also appear, and remain, on a PSP report.
            </p>
            <p className="text-[12px] mb-1">
              The Prospective Employer cannot obtain background reports from
              FMCSA without your authorization.
            </p>
            <h4 className="m-0 mb-2 text-[13px] text-center font-bold leading-[1.22] tracking-[0.3px] text-black">
              AUTHORIZATION
            </h4>
            <p className="text-[12px] mb-1">
              If you agree that the Prospective Employer may obtain such
              background reports, please read the following and sign below:
            </p>
            <p className="text-[12px] mb-1">
              I authorize <input className="border border-black" type="text" />{" "}
              (“Prospective Employer”) to access the FMCSA Pre-Employment
              Screening Program (PSP) system to seek information regarding my
              commercial driving safety record and information regarding my
              safety inspection history. I understand that I am authorizing the
              release of safety performance information including crash data
              from the previous five (5) years and inspection history from the
              previous three (3) years. I understand and acknowledge that this
              release of information may assist the Prospective Employer to make
              a determination regarding my suitability as an employee.
            </p>
            <p className="text-[12px] mb-1">
              I further understand that neither the Prospective Employer nor the
              FMCSA contractor supplying the crash and safety information has
              the capability to correct any safety data that appears to be
              incorrect. I understand I may challenge the accuracy of the data
              by submitting a request to https://dataqs.fmcsa.dot.gov. If I
              challenge crash or inspection information reported by a State,
              FMCSA cannot change or correct this data. I understand my request
              will be forwarded by the DataQs system to the appropriate State
              for adjudication.
            </p>
            <p className="text-[12px] mb-1">
              I understand that any crash or inspection in which I was involved
              will display on my PSP report. Since the PSP report does not
              report, or assign, or imply fault, I acknowledge it will include
              all CMV crashes where I was a driver or co-driver and where those
              crashes were reported to FMCSA, regardless of fault. Similarly, I
              understand all inspections, with or without violations, will
              appear on my PSP report, and State citations associated with FMCSR
              violations that have been adjudicated by a court of law will also
              appear, and remain, on my PSP report.
            </p>
            <p className="text-[12px] mb-1">
              I have read the above Disclosure Regarding Background Reports
              provided to me by Prospective Employer and I understand that if I
              sign this Disclosure and Authorization, Prospective Employer may
              obtain a report of my crash and inspection history. I hereby
              authorize Prospective Employer and its employees, authorized
              agents, and/or affiliates to obtain the information authorized
              above.
            </p>
            <br />
            <section class="mt-1">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr>
                      <td>
                        Date:
                        <input className="border border-black" type="date" />
                      </td>
                      <td>
                        Signature:
                        <input className="border border-black" type="text" />
                      </td>
                    </tr>
                    <br />
                    <br />
                    <tr>
                      <td>
                        <input className="border border-black" type="text" />
                        <br />
                        Name (Please Print)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />

              <p className="text-[11px] text-bold mb-2">
                <b>
                  NOTICE: This form is made available to monthly account holders
                  by NIC on behalf of the U.S. Department of Transportation,
                  Federal Motor Carrier Safety Administration (FMCSA). Account
                  holders are required by federal law to obtain an Applicant’s
                  written or electronic consent prior to accessing the
                  Applicant’s PSP report. Further, account holders are required
                  by FMCSA to use the language contained in this Disclosure and
                  Authorization form to obtain an Applicant’s consent. The
                  language must be used in whole, exactly as provided. Further,
                  the language on this form must exist as one stand- alone
                  document. The language may NOT be included with other consent
                  forms or any other language.
                </b>
              </p>

              <p className="text-[10px]">
                <b>
                  NOTICE: The prospective employment concept referenced in this
                  form contemplates the definition of “employee” contained at 49
                  C.F.R. 383.5.
                </b>
              </p>
            </section>
          </div>
        </div>
      </div>

      {/*****page 15 start********/}

      <br />

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <h4 className="m-0 mb-2 text-[13px] font-bold leading-[1.22] tracking-[0.3px] text-black">
              LAST UPDATED 2/11/2016
            </h4>
          </div>
        </div>
      </div>

      {/*****page 16 start********/}

      <br />

      <div className="relative mx-auto w-full max-w-[240mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full"></div>
        </div>
      </div>

      {/*****page 17 start********/}

      <br />

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[24px] font-bold leading-[1.2] text-[#174875]">
                26 COMPANY DRIVER SAFETY POLICIES & OPERATING PROCEDURES
              </h2>
              <p className="text-[12px] mb-2">
                <i>
                  Motor-carrier policy template - carrier-specific fields must
                  be completed before issue
                </i>
              </p>

              <div className="mb-2 text-[12.5px]">
                These policies apply to drivers while operating, possessing, or
                being responsible for Company equipment, and supplement
                applicable federal, state, and local law. Where a law,
                regulation, lease, collective agreement, or written Company
                directive imposes a stricter lawful requirement, the stricter
                requirement controls. Nothing in this policy authorizes a driver
                or the Company to violate the FMCSRs or other applicable law.
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr>
                      <td>
                        <span className="text-[11px]">
                          Motor Carrier Legal Name:
                        </span>
                        <br />
                        <input className="border border-black" type="text" />
                      </td>
                      <td>
                        <span className="text-[11px]">USDOT #:</span>
                        <input className="border border-black" type="text" />
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
                        <span className="text-[11px]">DBA (if any):</span>
                        <br />
                        <input className="border border-black" type="text" />
                      </td>
                      <td>
                        <span className="text-[11px]">
                          Policy Effective Date:{" "}
                        </span>
                        <input className="border border-black" type="date" />
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
                        <span className="text-[11px]">
                          Safety/Compliance Contact:
                        </span>
                        <br />
                        <input className="border border-black" type="text" />
                      </td>
                      <td>
                        <span className="text-[11px]">
                          24-Hour Incident Contact:{" "}
                        </span>
                        <input className="border border-black" type="text" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                A. ELD & HOURS-OF-SERVICE (HOS) POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Drivers must comply with 49 CFR Part 395 and all applicable
                  HOS and ELD requirements. Drivers may not drive or remain on
                  duty when prohibited by applicable HOS limits, and no
                  dispatcher, manager, customer, or delivery schedule authorizes
                  a violation.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Log in only under your own ELD credentials and accurately
                  record all duty statuses, locations, annotations, shipping
                  information, vehicles, trailers, and other required entries.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Review and certify each required record of duty status as
                  complete and accurate. Respond to proposed edits truthfully;
                  never accept an edit that makes the record inaccurate.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Never falsify, erase, conceal, disable, unplug, bypass,
                  manipulate, or tamper with the ELD, ECM connection, GPS/data
                  source, unidentified-driving records, or supporting documents.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Report an ELD malfunction or diagnostic issue to the Company
                  immediately and follow the required malfunction procedure,
                  including reconstruction and use of paper logs when required.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Keep required ELD instructions, transfer instructions,
                  malfunction instructions, and required blank graph-grid logs
                  in the vehicle when applicable.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not use personal conveyance, yard move, team-driver
                  assignment, or any other special driving category to conceal
                  on-duty or driving time.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Submit supporting documents and requested logs promptly.
                  Never destroy or alter fuel, toll, dispatch, scale, repair,
                  trip, or other records used to verify HOS.
                </p>
                Company commitment: The Company will not require or permit a
                driver to violate HOS rules and will not harass a driver through
                ELD information or connected technology. Drivers must promptly
                report any instruction they believe would require an HOS
                violation.
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 18 start********/}
      <br />
      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                B. CAMERA, DASH-CAM & SAFETY-EQUIPMENT NON-TAMPERING POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Company-installed outward-facing cameras, inward-facing
                  cameras, dash cameras, telematics devices, collision-avoidance
                  systems, GPS units, ELD hardware, and related safety equipment
                  are Company safety assets. Drivers may not interfere with
                  their normal operation except as specifically authorized in
                  writing by the Company or required for an emergency.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not cover, block, turn, reposition, unplug, disconnect,
                  remove, damage, disable, reset, modify, or obstruct any
                  camera, lens, microphone (where lawfully used), cable, sensor,
                  telematics unit, or recording system.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not place tape, clothing, sunshades, stickers, objects,
                  or other material over a camera or sensor.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not delete, overwrite, conceal, download, copy,
                  distribute, or attempt to access recordings unless authorized
                  by Company officials.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Immediately report a damaged, malfunctioning, loose,
                  obstructed, or non-operating camera or safety device.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Never retaliate against, threaten, or interfere with
                  personnel who review safety footage in accordance with Company
                  policy and applicable law.
                </p>
                Camera use and access must comply with applicable privacy,
                notice, audio-recording, labor, and employment laws. The Company
                should provide any jurisdiction-specific camera notice or
                consent required where the vehicle or driver operates.
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                C. SEAT-BELT POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  The driver must wear a properly installed and adjusted seat
                  belt whenever operating a commercial motor vehicle and must
                  comply with all applicable seat-belt laws. The driver must not
                  move the vehicle if the driver seat belt is unavailable,
                  materially damaged, or cannot be properly secured, unless
                  movement is specifically permitted by law for repair or safety
                  purposes.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Seat belts must be worn correctly; disabling, defeating,
                  clipping behind the body, or otherwise bypassing the restraint
                  is prohibited.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Authorized passengers must use available required
                  restraints.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Any seat-belt defect must be reported promptly and
                  documented through the Company maintenance/defect-reporting
                  process.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                D. NO HAND-HELD DEVICE / DISTRACTED-DRIVING POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Drivers are prohibited from texting or using a hand-held
                  mobile telephone while driving a CMV. Company policy also
                  prohibits holding or manually operating tablets, dispatch
                  devices, or other electronic devices while the vehicle is
                  moving or temporarily stationary in traffic, except as allowed
                  for emergency communications under applicable law.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Use only lawful hands-free/voice-activated functions and
                  keep the device positioned so it can be operated without
                  unsafe reaching.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Program navigation, ELD entries not permitted while driving,
                  messages, load information, and other manual tasks only when
                  safely parked.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • No watching videos, social media, gaming, typing, reading
                  messages, photographing, or other distracting device use while
                  driving.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • A dispatcher or customer request never authorizes unsafe or
                  unlawful device use. Safely park before responding when manual
                  interaction is required.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 19 start********/}

      <br />
      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                E. VEHICLE / TRUCK ABANDONMENT & RETURN-OF-EQUIPMENT POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Company equipment must not be abandoned. Upon termination,
                  resignation, removal from service, end of assignment, or
                  written Company direction, the driver must return the truck,
                  trailer, keys, fuel cards, permits, toll devices, ELD
                  equipment, documents, and other Company property to the
                  location designated by the Company.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not leave Company equipment at a residence, truck stop,
                  repair shop, tow yard, customer facility, airport, roadside
                  location, or other location without Company authorization,
                  except when an emergency makes continued operation unsafe or
                  unlawful.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • If an emergency prevents return to the assigned location,
                  immediately contact Company management, secure the equipment,
                  provide the exact location, and follow written recovery
                  instructions.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not transfer possession, keys, fuel cards, access
                  credentials, or equipment to another person without
                  authorization.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Before surrendering equipment, complete the required
                  post-trip inspection, report known defects/damage, remove
                  personal belongings, and return Company records/property.
                </p>
                The Company may pursue lawful recovery of documented losses or
                expenses caused by unauthorized abandonment. Any reimbursement,
                deduction, offset, or collection will be handled only to the
                extent permitted by applicable wage-and-hour, employment,
                contract, and other law; this policy does not authorize an
                unlawful payroll deduction.
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                F. PASSENGER & PET POLICY - DRIVER ONLY UNLESS WRITTEN
                AUTHORIZATION
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Company vehicles are DRIVER ONLY unless the Company provides
                  prior written authorization. No passenger, family member,
                  friend, child, trainee, team driver not assigned by the
                  Company, hitchhiker, or other person may ride in or operate
                  Company equipment without the required written authorization.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • No pets or animals are permitted in Company equipment
                  without prior written Company authorization. Service animals
                  and other legally protected accommodations will be handled as
                  required by applicable law.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Authorization must identify the approved passenger/pet or
                  approved category and any conditions, dates, insurance
                  requirements, or documentation required by the Company.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Verbal permission from a dispatcher, customer, another
                  driver, or non-authorized employee is not sufficient when
                  written approval is required.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • The driver must ensure every authorized occupant complies
                  with safety rules, seat-belt requirements, site restrictions,
                  and Company instructions.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 20 start********/}

      <br />
      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                G. ACCIDENT, CITATION, INSPECTION & VIOLATION IMMEDIATE-
                REPORTING POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Drivers must immediately report any crash/accident, vehicle
                  damage, cargo incident, roadside inspection, citation/ticket,
                  warning, out-of-service order, arrest affecting driving
                  duties, license action, tow, impound, hazardous-material
                  incident, or alleged safety violation arising while operating
                  or responsible for Company equipment. When immediate reporting
                  is impossible because of an emergency, report as soon as
                  safely possible.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • For an accident: stop safely, protect the scene, call
                  911/law enforcement when required, obtain medical assistance
                  when needed, and notify the Company immediately.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not admit fault, promise payment, argue about liability,
                  or sign non-required statements for another party. Cooperate
                  with law enforcement and provide legally required information.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Photograph/video the scene when safe and lawful, including
                  vehicle positions, damage, plates/unit numbers, road
                  conditions, traffic controls, cargo, and relevant
                  surroundings.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Collect other-party, witness, law-enforcement, tow, and
                  insurance information when available. Preserve dash-camera/ELD
                  data and all documents.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Send the Company every citation, inspection report, warning,
                  court notice, repair order, accident exchange, tow document,
                  and related record immediately.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not conceal, discard, alter, or delay reporting a
                  citation or inspection. Notify the Company of the final
                  court/agency disposition and provide supporting documentation.
                </p>
                Responsibility for citations and costs: A driver is responsible
                for complying with laws applicable to the driver and may be
                responsible for driver-attributable fines, penalties, or costs
                to the extent permitted by law and Company agreement. The
                Company does not assume personal responsibility for a driver’s
                unlawful conduct merely because the driver was operating Company
                equipment. However, nothing in this policy transfers a legal
                duty, fine, liability, insurance obligation, or carrier
                responsibility that applicable law places on the motor carrier
                or another party.
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                H. DAMAGE TO COMPANY / LEASED EQUIPMENT & PROPERTY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Drivers must exercise reasonable care over trucks, trailers,
                  cargo equipment, fuel cards, keys, permits, technology, and
                  other property in their possession. All damage, loss, theft,
                  misuse, or suspected mechanical failure must be reported
                  immediately.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not continue operating equipment when doing so would be
                  unsafe, unlawful, or likely to cause additional damage.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not authorize non-emergency repairs, towing, parts
                  replacement, or major expenditures beyond Company limits
                  without approval, unless immediate action is reasonably
                  necessary to protect life/property and Company contact is
                  unavailable.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • The Company may investigate whether damage resulted from
                  normal wear, mechanical failure, third-party conduct, an
                  unavoidable event, negligence, willful misconduct,
                  unauthorized use, or violation of Company policy.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Where a driver is legally responsible for damage caused by
                  the driver’s negligent, intentional, unauthorized, or
                  prohibited use, the Company may seek reimbursement for
                  documented repair/recovery costs to the extent allowed by
                  applicable law and enforceable agreement.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • No wage deduction or chargeback is automatically authorized
                  by this policy. Any deduction from wages/pay must comply with
                  applicable federal and state law and any required written
                  authorization.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 21 start********/}

      <br />
      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                I. VEHICLE CARE, INSPECTION, MAINTENANCE & SECURITY PROCEDURES
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • Conduct required pre-trip/post-trip inspections and monitor
                  the vehicle during operation. Promptly report defects
                  affecting safe operation.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not operate an out-of-service vehicle or equipment with a
                  condition that makes operation unsafe or unlawful.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Keep the cab, sleeper, windshield, mirrors, lights, cameras,
                  license plates, and safety equipment reasonably clean and
                  unobstructed.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Secure the truck, trailer, cargo, keys, fuel cards, permits,
                  and electronic devices whenever unattended. Follow Company
                  parking and high-value cargo instructions.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not make unauthorized mechanical, electrical, emissions,
                  speed-governor, ECM, camera, ELD, or safety-system
                  modifications.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Follow fuel, DEF, tire, fluid, preventive-maintenance,
                  roadside-repair, and approved-vendor procedures issued by the
                  Company.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                J. SAFE DRIVING & GENERAL CONDUCT
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • Operate at a safe and lawful speed for traffic, weather,
                  visibility, road, grade, vehicle, and cargo conditions.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Maintain safe following distance and space management. Avoid
                  aggressive driving, unsafe lane changes, tailgating, racing,
                  road rage, and retaliatory driving.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Never operate while ill, fatigued, impaired, distracted, or
                  otherwise unable to drive safely. Notify dispatch/safety when
                  conditions prevent safe operation.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Obey traffic-control devices, railroad-crossing
                  requirements, size/weight restrictions, route restrictions,
                  bridge/clearance limits, and hazardous-material rules when
                  applicable.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • No alcohol, illegal drugs, unauthorized controlled
                  substances, weapons prohibited by Company policy/law, or other
                  prohibited items in Company equipment. DOT drug/alcohol
                  requirements are addressed separately in the Company DOT Drug
                  & Alcohol Policy.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Follow lawful shipper/receiver rules, cargo securement
                  procedures, seal procedures, parking rules, and customer-site
                  safety requirements.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                K. POLICY VIOLATIONS, INVESTIGATION & CORRECTIVE ACTION
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  The Company may investigate reported or observed policy
                  violations using lawful sources such as driver statements,
                  inspection/citation records, ELD data, telematics, camera
                  footage, maintenance records, dispatch records, and other
                  relevant evidence. Corrective action may include coaching,
                  retraining, written warning, suspension from driving duties,
                  removal from a customer/account, or termination of
                  employment/contract, subject to applicable law and Company
                  policy. Regulatory reporting will be completed when required.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  Nothing in these policies requires a driver to operate
                  unsafely, violate the FMCSRs, falsify records, or waive rights
                  that cannot lawfully be waived.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 22 start********/}

      <br />

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[24px] font-bold leading-[1.2] text-[#174875]">
                27 DRIVER RECEIPT, ACKNOWLEDGMENT & AGREEMENT
              </h2>
              <p className="text-[12px] mb-2">
                <i>Company Safety Policies & Operating Procedures</i>
              </p>

              <div className="mb-2 text-[12.5px]">
                I acknowledge that I received, read, and had an opportunity to
                ask questions about the Company Driver Safety Policies &
                Operating Procedures. I understand that compliance with
                applicable law and Company safety rules is a condition of being
                authorized to operate Company equipment. I agree to promptly
                report safety events, equipment defects, accidents, citations,
                inspections, and other matters required by these policies.
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed text-[13.5px]">
                  <tbody>
                    <tr>
                      <td>
                        <input type="checkbox" /> I received and reviewed: ELD &
                        Hours-of-Service Policy
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input type="checkbox" /> I received and reviewed:
                        Camera / Dash-Cam / Safety-Equipment Non-Tampering
                        Policy
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input type="checkbox" /> I received and reviewed:
                        Seat-Belt Policy
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input type="checkbox" /> I received and reviewed: No
                        Hand-Held Device / Distracted-Driving Policy
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input type="checkbox" /> I received and reviewed:
                        Vehicle / Truck Abandonment & Return-of-Equipment Policy
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input type="checkbox" /> I received and reviewed:
                        Passenger & Pet Policy
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input type="checkbox" /> I received and reviewed:
                        Accident, Citation, Inspection & Violation Reporting
                        Policy
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input type="checkbox" /> I received and reviewed:
                        Damage to Company / Leased Equipment & Property Policy
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input type="checkbox" /> I received and reviewed:
                        Vehicle Care, Inspection, Maintenance & Security
                        Procedures
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input type="checkbox" /> I received and reviewed: Safe
                        Driving & General Conduct
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[12px] mb-2">
                I understand that this acknowledgment does not create an
                unlawful wage deduction, shift a legal duty that applicable law
                places on the motor carrier, or waive any non-waivable right.
                Company reimbursement or disciplinary decisions will be made
                under applicable law and the facts of the incident.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-[13.5px]">
                  <tbody>
                    <tr>
                      <td>
                        <span className="text-[11px]">
                          Driver Printed Name:
                        </span>
                        <br />
                        <input className="border border-black" type="text" />
                      </td>
                      <td>
                        <span className="text-[11px]">Driver ID / Unit:</span>
                        <input className="border border-black" type="text" />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span className="text-[11px]">Driver Signature:</span>
                        <br />
                        <input className="border border-black" type="text" />
                      </td>
                      <td>
                        <span className="text-[11px]">Date:</span>
                        <input className="border border-black" type="date" />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span className="text-[11px]">
                          Company Representative:
                        </span>
                        <br />
                        <input className="border border-black" type="text" />
                      </td>
                      <td>
                        <span className="text-[11px]">Title:</span>
                        <input className="border border-black" type="text" />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span className="text-[11px]">
                          Representative Signature:
                        </span>
                        <br />
                        <input className="border border-black" type="text" />
                      </td>
                      <td>
                        <span className="text-[11px]">Date:</span>
                        <input className="border border-black" type="date" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[22px] font-bold leading-[1.2] text-[#174875]">
                EMPLOYER IMPLEMENTATION CHECKLIST
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • Complete the motor-carrier legal name, USDOT number,
                  effective date, and safety contact before issuing the policy.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Provide any state-specific wage-deduction,
                  camera/audio-recording, privacy, passenger, pet/accommodation,
                  or employment- law addenda required for the driver’s work
                  locations.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Train drivers on ELD/HOS, incident reporting, camera/device
                  rules, and return-of-equipment procedures.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Retain the signed acknowledgment in the appropriate
                  personnel/safety file and document later policy revisions and
                  re- acknowledgments.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 23 start********/}

      <br />

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[24px] font-bold leading-[1.2] text-[#174875]">
                28 DETAILED COMPANY DRIVER SAFETY POLICIES & PROCEDURES
              </h2>

              <div className="mb-2 text-[12.5px]">
                This section expands the Company Driver Safety Policies &
                Operating Procedures into a detailed operating manual. It is
                intended to be adopted by the motor carrier identified below and
                used together with the signed Driver Receipt & Acknowledgment.
                Company-specific fields must be completed before issue.
              </div>
            </section>

            <section class="mt-1">
              <div>
                <table className="bg-gray-200 w-full table-fixed text-[13.5px]">
                  <tbody>
                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Motor Carrier Legal Name</b>
                        </span>
                      </td>
                      <td
                        colspan="3"
                        className="  align-middle text-left text-[17px]"
                      >
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>USDOT Number</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>

                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Effective Date:</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Safety / Compliance Contact</b>
                        </span>
                      </td>
                      <td
                        colspan="3"
                        className="  align-middle text-left text-[17px]"
                      >
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>24-Hour Accident / Emergency Contact</b>
                        </span>
                      </td>
                      <td
                        colspan="3"
                        className=" align-middle text-left text-[17px]"
                      >
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>DER / Drug & Alcohol Contact</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-[12px]">
              <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[13px] font-semibold leading-[1.35] text-[#173f69]">
                IMPORTANT: These policies establish minimum Company
                expectations. They do not authorize a driver or motor carrier to
                violate federal, state, or local law. When a lawful rule is
                stricter, the stricter rule controls.
              </div>
            </section>
            <br />
            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.1 ELD & HOURS-OF-SERVICE POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  The Company requires every driver subject to 49 CFR Part 395
                  to plan, record, and perform work within all applicable
                  hours-of-service limits. Dispatch schedules, customer
                  appointments, detention, traffic, weather, parking
                  availability, or load urgency do not authorize an HOS
                  violation.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Property-carrying drivers subject to the standard rule may
                  drive a maximum of 11 hours after 10 consecutive hours off
                  duty and may not drive beyond the 14th consecutive hour after
                  coming on duty following 10 consecutive hours off duty. A 30-
                  minute non-driving interruption is required after 8 cumulative
                  hours of driving without such an interruption. Applicable
                  60/70-hour limits, sleeper-berth provisions, short-haul
                  exceptions, adverse-driving provisions, and other lawful
                  exceptions must be used only when the facts actually qualify.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Log in only to the driver account assigned to you. Never
                  share ELD usernames, passwords, PINs, or credentials. Review
                  unidentified driving events and accept only driving that you
                  actually performed; annotate events that do not belong to you.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Accurately record driving, on-duty not driving, sleeper
                  berth, and off-duty time. Accurately enter required vehicle,
                  trailer, shipping-document, location, co-driver, and
                  annotation information.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Certify required records of duty status only after reviewing
                  them. Proposed carrier edits must be accepted only when they
                  make the record accurate. Drivers must never be instructed to
                  approve an inaccurate edit.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Personal conveyance and yard move may be used only when
                  authorized by Company policy and permitted by FMCSA rules.
                  They may never be used to hide driving time, reposition a load
                  for the Company, extend available hours, or avoid an HOS
                  violation.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • ELD tampering is prohibited. Do not disconnect power/data,
                  unplug the ECM connection, block GPS, alter device settings,
                  create false driver accounts, erase or conceal supporting
                  records, or otherwise manipulate the system.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Immediately report an ELD malfunction, data diagnostic, loss
                  of power, missing driving event, transfer problem, or other
                  issue. Follow the ELD malfunction instructions, reconstruct
                  required records, and use paper logs when required until the
                  device is restored or replaced.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Keep the required ELD information packet and blank
                  graph-grid logs in the CMV when applicable. Be able to display
                  and transfer records to an authorized safety official using
                  the ELD methods supported by the device.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Keep fuel, toll, dispatch, scale, repair, trip,
                  bill-of-lading, and other supporting documents accurate and
                  available as required. Never destroy or alter a supporting
                  document to make a log appear compliant.
                </p>

                <p className="text-[11px] text-bold mb-2">
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

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.2 PRE-TRIP, POST-TRIP & EQUIPMENT INSPECTION POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  No driver may operate Company-controlled equipment until the
                  driver is satisfied that the vehicle and combination are in
                  safe operating condition. A driver may not rely solely on a
                  prior driver, shipper, customer, yard employee, maintenance
                  vendor, or another carrier to determine that equipment is
                  safe.
                </p>{" "}
                <p className="text-[11px] text-bold mb-2">
                  Before movement, the driver must conduct a systematic
                  walk-around and cab inspection appropriate to the equipment.
                  At a minimum, inspect or verify the following as applicable:
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Service brakes, parking brake, air-brake system, air lines,
                  glad hands, trailer brake connections, air pressure, warning
                  devices, and observable air leaks.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Steering components, suspension, axles, springs, hangers,
                  torque rods, frame condition, and visible structural defects.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Tires for inflation/condition, tread, cuts/bulges, exposed
                  cord, and obvious damage; wheels/rims, hubs, lug nuts,
                  spacers, and signs of looseness or leakage.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Headlamps, high beams, turn signals, four-way flashers,
                  brake lamps, tail lamps, marker/clearance lamps, reflectors,
                  and conspicuity markings.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Windshield, wipers/washers, mirrors, horn, seat belt,
                  gauges, warning indicators, heater/defroster, and required
                  safety equipment.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Fifth wheel, locking jaws, kingpin, mounting hardware,
                  release handle, platform, sliding fifth-wheel pins, pintle
                  hooks or other coupling devices; verify a proper connection
                  and perform a tug test when appropriate.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Trailer landing gear, crossmembers, floor, roof/walls as
                  visible, doors, hinges, latches, seals, rear-impact guard,
                  mudflaps, and obvious cargo-area damage.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Emergency equipment including required warning devices and a
                  properly secured/charged fire extinguisher.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Fluid leaks, engine compartment concerns, fuel/DEF caps,
                  exhaust components as visible, and any condition likely to
                  cause a breakdown or unsafe operation.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Cargo distribution and securement, straps/chains/load locks
                  where applicable, trailer doors, seal requirements, and
                  weight/axle considerations.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • License plates, registration/cab card, permits, insurance
                  documentation where carried, ELD materials, shipping
                  documents, and other required operating documents.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  Defects and out-of-service conditions. Any defect that could
                  affect safe operation must be reported immediately. The driver
                  must not operate equipment placed out of service or equipment
                  with an unresolved condition that makes operation unsafe or
                  unlawful. Safety/Maintenance must determine the disposition
                  and required repair. The driver must not sign or certify a
                  repair that the driver knows was not completed.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  Drop-and-hook / trailer interchange. Before accepting or
                  moving a trailer, inspect it and document material
                  pre-existing damage or defects. If the trailer is unsafe, do
                  not move it except as specifically permitted for a lawful
                  repair/safety purpose. Photograph significant pre-existing
                  damage when practicable and notify Dispatch/Safety before
                  departure.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  Roadside inspection reports. Immediately transmit roadside
                  inspection reports to the Company. Defects must be reviewed
                  and corrected as required. The driver must cooperate with
                  Company instructions for repair documentation and return of
                  certified inspection reports.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  Post-trip. At the end of the work period or equipment
                  assignment, inspect for new damage, tire/brake/light concerns,
                  leaks, cargo/equipment issues, and other defects. Report
                  defects before the next dispatch so repairs can be scheduled.
                  Complete any DVIR or electronic defect report required for the
                  operation.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.3 CAMERA, DASH-CAM & SAFETY-EQUIPMENT NON-TAMPERING POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Forward-facing cameras, inward-facing cameras, telematics,
                  collision-warning devices, GPS, ELD hardware, sensors, and
                  other Company-installed safety systems are safety equipment.
                  Drivers must not interfere with their normal operation.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not cover, block, turn, reposition, unplug, disconnect,
                  remove, damage, reset, disable, modify, obstruct, or interfere
                  with any camera, lens, sensor, cable, microphone where
                  lawfully used, telematics unit, or recording system.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not place tape, clothing, paper, stickers, sunshades,
                  electronic devices, or other objects over or in front of a
                  camera or sensor.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not delete, download, copy, distribute, post, or attempt
                  unauthorized access to recordings or system data.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Report a malfunction, loose mount, damaged lens, obstructed
                  view, warning message, or other problem immediately. Do not
                  attempt repairs unless specifically authorized.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 25 start********/}

      <br />

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • Company access and use of camera/audio information must
                  follow applicable privacy, notice, audio-recording, labor, and
                  employment laws. Required state-specific notices or consents
                  must be provided separately.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.4 SEAT-BELT & OCCUPANT-RESTRAINT POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  The driver must wear a properly installed and adjusted seat
                  belt whenever operating a CMV. Authorized occupants must use
                  required restraints. Disabling, bypassing, clipping behind the
                  body, or otherwise defeating the restraint is prohibited. A
                  material seat-belt defect must be reported before operation
                  and handled through the maintenance/defect process.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.5 NO HAND-HELD DEVICE / DISTRACTED-DRIVING POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • No texting or hand-held mobile telephone use while driving a
                  CMV. Do not hold or manually manipulate a phone, tablet,
                  dispatch unit, or other device while the vehicle is moving or
                  temporarily stopped in traffic.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Use only lawful hands-free/voice functions that do not
                  require unsafe reaching. Program navigation, review dispatch
                  messages, enter ELD information, photograph documents, or
                  perform other manual tasks only when safely parked.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Watching videos, social media, gaming, typing, reading
                  messages, photographing, video calling, or other distracting
                  electronic activity while driving is prohibited.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • No dispatcher, customer, or load requirement authorizes
                  unsafe device use. Park safely before responding when manual
                  interaction is necessary.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.6 TRUCK ABANDONMENT & RETURN-OF-EQUIPMENT POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Company equipment must not be abandoned. Resignation,
                  termination, refusal of dispatch, disagreement, breakdown, or
                  the end of an assignment does not authorize the driver to
                  leave Company equipment at an unapproved location.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Upon Company direction or separation, return the tractor,
                  trailer, keys, fuel cards, toll devices, permits, ELD
                  equipment, paperwork, and other Company property to the
                  location designated by an authorized Company official.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not leave equipment at a residence, truck stop, repair
                  facility, tow yard, customer, airport, roadside location,
                  another carrier, or any other location without Company
                  authorization, except when an emergency makes continued
                  operation unsafe or unlawful.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • If an emergency prevents return, immediately notify the
                  Company, provide the exact equipment location and condition,
                  secure the unit, protect cargo/property, and follow written
                  recovery instructions.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Do not transfer keys, credentials, fuel cards, or possession
                  to another person without authorization.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Before surrendering equipment, perform a post-trip
                  inspection, report known damage/defects, remove personal
                  belongings, and return all Company property.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  The Company may seek lawful recovery of documented losses
                  resulting from unauthorized abandonment. Any reimbursement,
                  deduction, offset, or collection must comply with applicable
                  law and enforceable agreements; this policy does not authorize
                  an unlawful wage deduction.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.7 UNAUTHORIZED PASSENGER & PET POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Company vehicles are DRIVER ONLY unless prior written
                  authorization is issued by an authorized Company official. No
                  family member, friend, child, hitchhiker, trainee, team driver
                  not assigned by the Company, or other passenger may ride in or
                  operate Company equipment without required written approval.
                  Pets/animals are prohibited without written approval, subject
                  to legally required accommodations.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  Written authorization may specify the approved person/animal,
                  dates, route, insurance/document requirements, and other
                  conditions. Verbal permission from a dispatcher, customer,
                  another driver, or unauthorized employee is not sufficient.
                  Authorized occupants must comply with seat-belt, site-access,
                  and Company safety rules.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.8 ACCIDENT, CITATION, INSPECTION & VIOLATION REPORTING POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Drivers must report immediately any crash, collision, cargo
                  incident, vehicle/property damage, roadside inspection,
                  citation, warning, out-of-service order, tow/impound, arrest
                  affecting driving duties, license
                  suspension/revocation/disqualification, hazardous-material
                  incident, or alleged safety violation connected with Company
                  operations. If emergency conditions prevent immediate contact,
                  report as soon as safely possible.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • At an accident scene: stop safely; protect life and the
                  scene; call 911/law enforcement when required; request medical
                  assistance; and notify the Company immediately.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 26 start********/}

      <br />

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
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
                  notices, accident exchanges, tow documents, repair orders, and
                  related records to the Company immediately and provide final
                  court/agency disposition when available.
                  <br />• Follow post-accident drug/alcohol testing instructions
                  when FMCSA criteria or a separately identified lawful Company-
                  authority policy requires testing.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  Responsibility. Drivers are responsible for obeying laws
                  applicable to their conduct and may be responsible for driver-
                  attributable fines, penalties, or costs to the extent
                  permitted by law and Company agreement. Nothing in this policy
                  transfers a legal duty or carrier responsibility that
                  applicable law places on the motor carrier or another party.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.9 DRIVER-CAUSED DAMAGE / EQUIPMENT RESPONSIBILITY POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Drivers must exercise reasonable care over tractors, trailers,
                  cargo equipment, keys, fuel cards, permits, technology, and
                  other property placed in their possession. Damage, loss,
                  theft, misuse, or suspected mechanical failure must be
                  reported immediately.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Do not continue operating equipment when continued operation
                  would be unsafe, unlawful, or likely to cause additional
                  damage.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Do not authorize non-emergency towing, major repairs, parts
                  replacement, or expenses outside Company limits without
                  approval unless immediate action is reasonably necessary to
                  protect life/property and Company contact is unavailable.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • The Company may investigate whether damage resulted from
                  normal wear, mechanical failure, third-party conduct,
                  unavoidable conditions, negligence, willful misconduct,
                  unauthorized use, or a policy violation.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • If a driver is legally responsible for damage caused by
                  negligent, intentional, unauthorized, or prohibited use, the
                  Company may seek reimbursement for documented losses/repair
                  costs only to the extent allowed by applicable law and an
                  enforceable agreement.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • No payroll deduction or chargeback is automatically
                  authorized by this policy. Any deduction from wages or
                  settlement must comply with applicable law and any required
                  written authorization.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.10 VEHICLE MAINTENANCE, DEFECT & ROADSIDE-REPAIR POLICY
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • Promptly report mechanical defects, warning lights,
                  brake/tire issues, fluid leaks, lighting defects,
                  steering/suspension concerns, coupling defects, and other
                  safety problems.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Do not operate a vehicle that has been placed out of service
                  or that the driver knows is unsafe or unlawful to operate.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Use only Company-approved repair vendors and procedures
                  except where an emergency requires immediate protective action
                  and Company contact is unavailable.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Do not make unauthorized ECM, emissions, speed-governor,
                  electrical, camera, ELD, telematics, or safety-system
                  modifications.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Keep the cab, sleeper, windshield, mirrors, lights, cameras,
                  plates, and safety equipment reasonably clean and
                  unobstructed. Secure keys, fuel cards, permits, cargo, and
                  equipment when unattended.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Follow preventive-maintenance, tire, fuel, DEF,
                  roadside-repair, and documentation instructions issued by the
                  Company.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.11 SAFE DRIVING, FATIGUE & GENERAL CONDUCT
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • Operate at a lawful and safe speed for traffic, weather,
                  visibility, grade, road surface, vehicle condition, and cargo.
                  Posted speed is not always a safe speed.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Maintain safe following distance and adequate space. No
                  tailgating, aggressive driving, unsafe lane changes, racing,
                  road rage, retaliatory driving, or intentionally blocking
                  other traffic.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • Never drive while ill, fatigued, impaired, distracted, or
                  otherwise unable to operate safely. Notify Dispatch/Safety
                  when conditions prevent safe operation.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Obey traffic-control devices, railroad-crossing rules, route
                  restrictions, bridge/clearance limits, size/weight
                  restrictions, hazardous-material requirements when applicable,
                  and customer/site safety rules.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 27 start********/}

      <br />

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • Secure cargo and doors and comply with seal/load-security
                  procedures. Stop and correct a cargo-securement issue when
                  required.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • No alcohol, illegal drugs, or other prohibited items may be
                  possessed or used contrary to Company policy or law. DOT
                  drug/alcohol requirements are governed by the separate
                  detailed policy in this packet.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                28.12 POLICY VIOLATIONS, INVESTIGATION & CORRECTIVE ACTION
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
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

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section class="mt-1">
              <div>
                <table className="bg-gray-200 w-full table-fixed text-[13.5px]">
                  <tbody>
                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Motor Carrier / Employer</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>USDOT Number</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Designated Employer Representative (DER)</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>DER Phone / Email</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>C/TPA</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Medical Review Officer (MRO)</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Primary Collection Site / Instructions</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Effective / Revision Date</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Driver Printed Name</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>CDL Number / State</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Driver Signature / Date</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
                            className="h-[28px] w-full border border-black p-2"
                            type="text"
                          />
                        </div>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td className=" text-left text-[17px]">
                        <span className=" px-[6px] py-[7px] align-middle text-xs">
                          <b>Company / DER Representative / Date</b>
                        </span>
                      </td>
                      <td className="  align-middle text-left text-[17px]">
                        <div className="flex items-center justify-center">
                          <input
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

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[24px] font-bold leading-[1.2] text-[#174875]">
                29 DETAILED FMCSA/DOT DRUG & ALCOHOL POLICY
              </h2>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                49 CFR Part 382 / 49 CFR Part 40 - Motor Carrier Policy Template
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  IMPORTANT CARRIER ADOPTION NOTICE: Before using this policy,
                  the adopting motor carrier must complete all company-specific
                  fields, identify its Designated Employer Representative (DER)
                  and service agents, confirm its current random testing rates,
                  and review any state/local employment requirements.
                  DOT-required testing and any company- authority/non-DOT
                  testing must be administered and documented separately.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[23px] font-bold leading-[1.2] text-[#174875]">
                DOCUMENTS TO SUBMIT WITH YOUR DRIVER APPLICATION
              </h2>

              <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[13px] font-semibold leading-[1.35] text-[#173f69]">
                Upload clear, complete, readable copies. Documents marked
                <strong>"if applicable"</strong> are required only when they
                apply to the driver or position. Employment-eligibility
                documents are handled under Form I-9 rules; applicants may
                choose which acceptable I-9 documents to present.
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-[13.5px]">
                  <thead>
                    <tr>
                      <th className="w-[34%] border border-[#1b3e5c] bg-[#174875] px-[6px] py-[8px] text-center align-middle text-[14px] font-bold text-white">
                        Motor Carrier Legal Name
                      </th>
                      <th className="w-[34%] border border-[#1b3e5c] bg-[#174875] px-[6px] py-[8px] text-center align-middle text-[14px] font-bold text-white">
                        USDOT Number
                      </th>
                      <th className="w-[34%] border border-[#1b3e5c] bg-[#174875] px-[6px] py-[8px] text-center align-middle text-[14px] font-bold text-white">
                        Effective / Revision Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        <input
                          className="border border-black w-full"
                          type="text"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        <input
                          className="border border-black w-full"
                          type="text"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        <input
                          className="border border-black w-full"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        Designated Employer Representative (DER)
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        DER Phone / Email{" "}
                        <input
                          className="border border-black w-full"
                          type="text"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        C/TPA
                        <input
                          className="border border-black w-full"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        <input
                          className="border border-black w-full"
                          type="text"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        <input
                          className="border border-black w-full"
                          type="text"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        <input
                          className="border border-black w-full"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        Medical Review Officer (MRO)
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        Primary Collection Site / Network
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        SAP Resource Contact
                        <input
                          className="border border-black w-full"
                          type="text"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        <input
                          className="border border-black w-full"
                          type="text"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        <input
                          className="border border-black w-full"
                          type="text"
                        />
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        <input
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
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                29.1 Purpose, Authority and Policy Objective
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
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

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
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
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                29.2 Covered Drivers and Safety-Sensitive Functions
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  This policy applies to each driver who is required to hold a
                  commercial driver's license (CDL) or commercial learner's
                  permit (CLP) to operate a commercial motor vehicle subject to
                  Part 382, including covered full-time, part-time, casual,
                  intermittent, leased and other drivers operating at the
                  Company's direction. Coverage is determined by the
                  safety-sensitive function actually performed, not merely by
                  job title.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Safety-sensitive time includes all time from the time a
                  driver begins work or is required to be ready to work until
                  relieved from work and all responsibility for performing work,
                  including waiting to be dispatched, inspecting or servicing
                  equipment, driving, loading/unloading or supervising
                  loading/unloading, attending a disabled vehicle, and other
                  functions within the regulatory definition.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • A manager, supervisor, mechanic, owner, or other employee
                  who is required or expected to operate a covered CMV must be
                  included when Part 382 applies to that individual.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                29.3 Designated Employer Representative (DER) and Service Agents
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  The DER is the Company official authorized to receive test
                  results and other communications, make required decisions,
                  remove drivers from safety-sensitive functions, direct drivers
                  to testing, and coordinate with the C/TPA, MRO, collection
                  site, laboratory, BAT/STT, and SAP. The Company may use
                  qualified service agents, but the motor carrier remains
                  responsible for compliance with applicable DOT/FMCSA
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
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                29.4 Prohibited Alcohol Conduct
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  A covered driver must not engage in conduct prohibited by Part
                  382. The following rules apply in addition to any separately
                  identified lawful Company-authority rule:
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • No alcohol use while performing safety-sensitive functions.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • No alcohol use within four (4) hours before performing a
                  safety-sensitive function.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • No reporting for or remaining on duty requiring
                  safety-sensitive functions with an alcohol concentration of
                  0.04 or greater.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • A driver with an alcohol concentration of 0.02 through 0.039
                  must be removed from safety-sensitive functions for the period
                  required by FMCSA regulations; this is distinct from a
                  0.04-or-greater DOT violation.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • No prohibited alcohol use following an accident when the
                  driver is required to remain available for FMCSA post-
                  accident testing, subject to the regulatory time limits.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • No refusal to submit to a required alcohol test or failure
                  to cooperate with the testing process.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                29.5 Prohibited Controlled-Substances Conduct
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • No reporting for duty or remaining on duty requiring
                  safety-sensitive functions when the driver uses a controlled
                  substance in a manner prohibited by Part 382 or is otherwise
                  not medically qualified to safely perform the function.
                </p>

                <p className="text-[11px] text-bold mb-2">
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

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • Marijuana remains prohibited under the DOT drug-testing
                  program regardless of state recreational or medical marijuana
                  laws. Drivers are responsible for understanding that products
                  marketed as hemp/CBD may create testing or qualification
                  risks; a product label or state legality does not excuse a
                  verified DOT positive result.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Adulterating, substituting, attempting to defeat a
                  collection, possessing a device intended to interfere with a
                  collection, or otherwise engaging in conduct defined as a
                  refusal is prohibited.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                29.6 Prescription and Over-the-Counter Medication
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  The Company does not instruct drivers to disclose private
                  diagnoses or medication information to dispatch unless
                  disclosure is required for safety or qualification purposes. A
                  driver remains responsible for being medically qualified and
                  able to safely perform safety-sensitive functions.
                  Prescription or over-the-counter medication must be used only
                  as directed and in a manner consistent with safe performance
                  of the driver's duties. Questions concerning a drug-test
                  result are handled through the MRO process as required by Part
                  40.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  If a medication may impair alertness, coordination, judgment,
                  reaction time, or the ability to safely operate a CMV, the
                  driver must not perform safety-sensitive functions until
                  medically cleared or otherwise legally qualified to do so. The
                  MRO may make safety-related medication disclosures when Part
                  40 permits or requires them.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 31 start********/}

      <br />

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                29.7 DOT Drug Testing Panel and Specimen Procedures
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  DOT drug testing is limited to the drugs/drug classes
                  authorized by Part 40, including marijuana metabolites,
                  cocaine metabolites, amphetamines, opioids, and phencyclidine
                  (PCP). DOT specimens may not be used to test for additional
                  non- DOT drugs. DOT tests and non-DOT tests must remain
                  completely separate.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  DOT drug collections must use the current Federal Drug Testing
                  Custody and Control Form (CCF) and qualified
                  collection/testing personnel. Part 40 authorizes urine and
                  oral-fluid methodologies; however, the Company will use only
                  specimen types and procedures that are authorized and
                  operationally available under current DOT/HHS requirements at
                  the time of collection. Point-of-collection/instant drug tests
                  and hair tests are not DOT drug tests.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  Where Part 40 requires a directly observed collection, the
                  Company and its service agents will follow the current Part 40
                  procedure. If a required collection methodology is
                  unavailable, the DER/service agent will follow the current
                  regulatory fallback procedure rather than improvising a
                  noncompliant test.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                29.8 Required Testing Circumstances
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-[13.5px]">
                  <thead>
                    <tr>
                      <th className="w-[34%] border border-[#1b3e5c] bg-[#174875] px-[6px] py-[8px] text-center align-middle text-[14px] font-bold text-white">
                        Testing Type
                      </th>
                      <th className="w-[34%] border border-[#1b3e5c] bg-[#174875] px-[6px] py-[8px] text-center align-middle text-[14px] font-bold text-white">
                        Company Procedure
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                        Pre-employment
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        A covered driver must receive the required negative DOT
                        drug- test result before first performing a covered
                        safety-sensitive function, unless a specific regulatory
                        exception applies and is documented. A pre-employment
                        alcohol test is not federally required by FMCSA but may
                        be conducted only when permitted and administered
                        consistently with applicable rules.
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                        Random
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
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
                      <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                        Reasonable suspicion
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        A trained supervisor may require drug and/or alcohol
                        testing based on specific, contemporaneous, articulable
                        observations concerning appearance, behavior, speech,
                        body odors, or other regulatory indicators. A hunch,
                        rumor, or unsupported accusation is not sufficient.
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                        Post-accident
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        The DER will determine whether the accident meets FMCSA
                        post-accident testing criteria. Not every accident
                        requires a DOT post-accident test. Drivers must
                        immediately report accidents and remain available when
                        testing may be required.
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                        Return-to-duty
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                        Required after a DOT violation and completion of the SAP
                        process before the driver may resume DOT
                        safety-sensitive functions. The test must meet Part 40
                        direct-observation requirements.
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                        Follow-up
                      </td>

                      <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
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
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                29.9 Pre-Employment Testing and Hiring Controls
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • The Company will identify whether the position is subject to
                  Part 382 before allowing the applicant to perform covered
                  duties.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • The Company will obtain the required negative pre-employment
                  DOT drug-test result, or document a valid regulatory
                  exception, before first safety-sensitive performance.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • The Company will complete the required FMCSA Drug & Alcohol
                  Clearinghouse pre-employment query and will not use a driver
                  in a prohibited status.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 32 start********/}

      <br />

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  • A conditional job offer, orientation, paperwork, or
                  non-driving work does not authorize covered driving before all
                  applicable pre-employment requirements are satisfied.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                29.10 Random Testing Program
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Random selections will be made through the Company or its
                  C/TPA using a scientifically valid method. Once notified, the
                  driver must proceed immediately to the collection/testing site
                  as directed, allowing only the time reasonably necessary to
                  cease the safety-sensitive function safely and travel to the
                  testing location. Random alcohol testing will occur only just
                  before, during, or just after the performance of
                  safety-sensitive functions as required by FMCSA.
                </p>

                <p className="text-[11px] text-bold mb-2">
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
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#174875]">
                29.11 Reasonable-Suspicion Testing
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  Reasonable-suspicion determinations will be made by a
                  supervisor or Company official who has completed the required
                  training. Observations must be specific, contemporaneous and
                  articulable and must relate to the appearance, behavior,
                  speech or body odors of the driver, or other observations
                  recognized by the applicable rule. The Company will document
                  the basis for the determination as required.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Supervisors authorized to make reasonable-suspicion
                  determinations must receive at least 60 minutes of training on
                  alcohol misuse and at least 60 minutes on
                  controlled-substances use.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • The driver must follow the testing direction and must not
                  drive a CMV to the collection site when the Company determines
                  transportation should be provided for safety reasons.
                </p>

                <p className="text-[11px] text-bold mb-2">
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

      <div className="relative mx-auto w-[210mm] h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div className="w-full">
            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#1F355A]">
                29.12 Post-Accident Testing and Driver Availability
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  The driver must immediately report every accident/incident to
                  the Company in accordance with the accident-reporting policy.
                  The DER will determine whether FMCSA post-accident testing is
                  required based on the applicable regulatory criteria,
                  including fatalities and qualifying injury/tow-away accidents
                  associated with a moving-traffic citation within the
                  applicable time period.
                </p>
                <p className="text-[11px] text-bold mb-2">
                  • When required, alcohol testing must be attempted as soon as
                  practicable. If not completed within 2 hours, the Company will
                  document the reason for delay and continue attempts as
                  required; attempts cease after 8 hours.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • When required, controlled-substances testing must be
                  attempted as soon as practicable; attempts cease after 32
                  hours if the test cannot be completed, with required
                  documentation maintained.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • A driver subject to post-accident testing must remain
                  readily available. Leaving the scene for necessary medical
                  care, emergency assistance, or compliance with law-enforcement
                  instructions does not by itself excuse the driver from
                  promptly communicating with the Company and remaining
                  available when practicable.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • A driver who may be subject to post-accident alcohol testing
                  must not consume alcohol during the prohibited post- accident
                  period or until the required alcohol test is completed,
                  whichever occurs first under the applicable rule.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#1F355A]">
                29.13 Refusal to Test
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  A refusal is treated as a serious DOT violation. Refusal is
                  not limited to verbally saying “no.” Conduct may constitute a
                  refusal when Part 40 or Part 382 defines it as such. Examples
                  include, as applicable:
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Failure to appear for a required test within the
                  required/reasonable time after being directed to report.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Failure to remain at the testing site until the testing
                  process is complete.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Failure to provide a required specimen or sufficient
                  specimen without an adequate medical explanation established
                  through the required process.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Failure to permit a directly observed or monitored
                  collection when required.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Failure to undergo a required medical evaluation or second
                  collection when directed under Part 40.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Failure to cooperate with the collection/testing process,
                  including conduct that prevents completion of the test.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Providing a specimen verified as adulterated or substituted,
                  or admitting adulteration/substitution, when Part 40 treats
                  the conduct as a refusal.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • For alcohol testing, failure to sign the required
                  certification on the Alcohol Testing Form or failure to
                  provide breath when required, when the regulation defines the
                  conduct as a refusal.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  The DER will rely on the determination of the authorized
                  collector, MRO, BAT/STT, or other responsible party as
                  specified by Part 40. The Company will not create its own DOT
                  refusal category outside the regulation.
                </p>
              </div>
            </section>

            <section className="mt-[12px]">
              <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#1F355A]">
                29.14 Drug Collection, Laboratory and MRO Process
              </h2>

              <div className="mb-2 text-[12.5px]">
                <p className="text-[11px] text-bold mb-2">
                  DOT drug testing will follow the current Part 40
                  chain-of-custody and laboratory procedures. The collector
                  verifies identity, secures the collection, completes the CCF,
                  and transmits the specimen to an HHS-certified laboratory as
                  required. The laboratory conducts the authorized
                  initial/confirmatory and specimen-validity testing. The MRO
                  independently reviews laboratory results before reporting a
                  verified result to the employer.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Drivers must cooperate with collector instructions and
                  provide accurate contact information so the MRO can reach them
                  when necessary.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • When a non-negative laboratory result requires MRO review,
                  the driver will have the opportunity provided by Part 40 to
                  present a legitimate medical explanation.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • When applicable, the driver has the Part 40 right to request
                  testing of the split specimen within the prescribed time after
                  MRO notification.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Failure to permit a directly observed or monitored
                  collection when required.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Failure to undergo a required medical evaluation or second
                  collection when directed under Part 40.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Failure to cooperate with the collection/testing process,
                  including conduct that prevents completion of the test.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • Providing a specimen verified as adulterated or substituted,
                  or admitting adulteration/substitution, when Part 40 treats
                  the conduct as a refusal.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  • For alcohol testing, failure to sign the required
                  certification on the Alcohol Testing Form or failure to
                  provide breath when required, when the regulation defines the
                  conduct as a refusal.
                </p>

                <p className="text-[11px] text-bold mb-2">
                  The DER will rely on the determination of the authorized
                  collector, MRO, BAT/STT, or other responsible party as
                  specified by Part 40. The Company will not create its own DOT
                  refusal category outside the regulation.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*****page 34 start********/}

      <br />

      <div className="a4-page relative m-[240mm] h-[297mm] bg-white px-[17mm] py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full">
          {/* 29.15 */}
          <section className="mt-[12px]">
            <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#1F355A]">
              29.15 Alcohol Testing Procedures and Result Consequences
            </h2>

            <div className="mb-2">
              <p className="mb-2 text-[11px] leading-[1.3] font-bold text-[#1F2933]">
                DOT alcohol screening tests are conducted by qualified personnel
                using approved devices and the DOT Alcohol Testing Form. A
                screening result below 0.02 requires no action under Part 40. A
                screening result of 0.02 or greater requires a confirmation test
                under Part 40. For FMCSA-covered drivers, a confirmed result of
                0.02 through 0.039 requires temporary removal from
                safety-sensitive functions as required by §382.505; a result of
                0.04 or greater is a DOT alcohol violation requiring immediate
                removal and the return-to-duty process before resumption of
                covered functions.
              </p>
            </div>
          </section>

          {/* 29.16 */}
          <section className="mt-[12px]">
            <h2 className="mb-[8px] text-[18px] font-bold leading-[1.2] text-[#1F355A]">
              29.16 Immediate Removal From Safety-Sensitive Functions
            </h2>

            <div className="mb-2">
              <p className="mb-2 text-[11px] leading-[1.3] font-bold text-[#1F2933]">
                Upon notice of a verified positive DOT drug test, an alcohol
                concentration of 0.04 or greater, a DOT refusal, or another
                violation that prohibits safety-sensitive performance, the
                Company will immediately remove the driver from DOT safety-
                sensitive functions. The driver may not be dispatched, operate a
                covered CMV, or perform another prohibited safety- sensitive
                function until legally eligible to do so.
              </p>

              <p className="mb-2 text-[11px] leading-[1.3] font-bold text-[#1F2933]">
                Federal removal from safety-sensitive functions is separate from
                the Company's employment decision. Subject to applicable law and
                Company policy, the Company may terminate
                employment/contracting, place the driver in a non-
                safety-sensitive status, or consider return after successful
                completion of the federal return-to-duty process. DOT
                regulations do not require the Company to reinstate a driver.
              </p>
            </div>
          </section>

          {/* 29.17 */}
          <section className="mt-[12px]">
            <h2 className="mb-[8px] text-[17.4px] font-bold leading-[1.2] text-[#133B63]">
              29.17 SAP Evaluation, Return-to-Duty and Follow-Up Testing
            </h2>

            <div className="mb-2">
              <p className="mb-2 text-[13.4px] leading-[1.3] font-bold text-[#1F2933]">
                When required, the Company will provide the driver with
                information identifying qualified Substance Abuse Professional
                (SAP) resources as required by Part 40. Before returning to any
                DOT safety-sensitive function after a violation, the driver must
                complete the SAP evaluation and prescribed education/treatment
                process, be determined eligible for return-to-duty testing, and
                obtain the required negative drug result and/or alcohol result
                below 0.02 on a directly observed return-to-duty test, as
                applicable.
              </p>

              <p className="text-[13.4px] leading-[1.3] font-bold text-[#1F2933]">
                The SAP establishes the follow-up testing plan. The plan must
                include at least six unannounced directly observed follow- up
                tests during the first 12 months of safety-sensitive service and
                may extend for up to 60 months. Follow-up testing is in addition
                to random testing and other testing requirements. The Company
                will not substitute random tests for SAP- prescribed follow-up
                tests.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/*****page 35 start********/}
    </div>
  );
}
