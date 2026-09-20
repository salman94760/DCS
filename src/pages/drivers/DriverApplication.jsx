export default function DriverApplication() {
  return (
    <div className="min-h-screen bg-[#bdbdbd] px-2 py-5 sm:px-4 lg:px-6">
      <div className="mx-auto w-full max-w-[240mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="text-center">
          <h3 className="mb-[10px] text-[18px] font-bold tracking-[0.2px] text-[#202b36]">
            DOT COMPLIANCE SOLUTIONS LLC
          </h3>

          <h1 className="m-0 text-[31px] font-bold leading-[1.22] tracking-[0.3px] text-[#173f69]">
            COMMERCIAL DRIVER
            <br />
            APPLICATION &amp; QUALIFICATION PACKET
          </h1>

          <div className="mb-[10px] mt-[14px] text-[21px] leading-[1.3] text-[#174875]">
            Complete Driver Application, Qualification, Onboarding &amp; Safety
            Policy Packet
          </div>
        </div>

        <table className="mt-2 w-full border-collapse text-[14px]">
          <tbody>
            <tr>
              <td className="h-[25px] w-[30%] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#173f69]">
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
              <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#173f69]">
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
              <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#173f69]">
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
              <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#173f69]">
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
              <td className="h-[25px] border-b border-[#aebdcc] bg-[#e7eef5] px-[7px] py-[5px] font-bold text-[#173f69]">
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
          <h2 className="mb-[6px] text-[16px] font-bold text-[#173f69]">
            APPLICANT INSTRUCTIONS
          </h2>

          <p className="mx-auto my-0 max-w-[700px] text-[13.5px] leading-[1.35]">
            Complete every applicable section. Use full legal names, complete
            addresses, and accurate dates. If additional space is needed, attach
            a signed continuation sheet identifying the section and question. Do
            not omit prior employers or driving history.
          </p>
        </section>

        <section className="mt-[12px]">
          <h2 className="mb-[8px] text-[23px] font-bold leading-[1.2] text-[#174875]">
            DOCUMENTS TO SUBMIT WITH YOUR DRIVER APPLICATION
          </h2>

          <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[13px] font-semibold leading-[1.35] text-[#173f69]">
            Upload clear, complete, readable copies. Documents marked{" "}
            <strong>"if applicable"</strong> are required only when they apply
            to the driver or position. Employment-eligibility documents are
            handled under Form I-9 rules; applicants may choose which acceptable
            I-9 documents to present.
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-[13.5px]">
              <thead>
                <tr>
                  <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-left text-[14px] font-bold text-white">
                    <div className="flex">
                      <div className="mx-2">DOCUMENT </div>
                      <div>
                        <input className="w-full h-[25px] p-2" type="text" />
                      </div>
                    </div>
                  </th>

                  <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-left text-[14px] font-bold text-white">
                    <div className="flex">
                      <div className="mx-2">APPLICANT </div>
                      <div>
                        <input className="w-full h-[25px] p-2" type="text" />
                      </div>
                    </div>
                  </th>

                  <th className="w-[34%] border border-[#1b3e5c] bg-[#24557f] px-[6px] py-[8px] text-left text-[14px] font-bold text-white">
                    <div className="flex">
                      <div className="mx-2">OFFICE </div>
                      <div>
                        <input className="w-full h-[25px] p-2" type="text" />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Current Driver License / CDL - front and back
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Work authorization / acceptable Form I-9 documentation - as
                    applicable (employee chooses acceptable documents)
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-[56%] border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
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

      {/********page 2 start******/}
      <br />

      <div className="mx-auto w-full max-w-[240mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        

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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-[56%] border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-[56%] border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Any additional state, insurance, customer, endorsement,
                    TWIC, permit, or company-required credential
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      if applicable
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[20px]"
                      type="text"
                    />
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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
            <div className="mx-auto w-full max-w-[240mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">






        <section className="mt-[12px]">
          <h2 className="mb-[8px] text-[21px] font-bold leading-[1.2] text-[#174875]">
            23 DMV / MVR / CDLIS DRIVER RECORDS AUTHORIZATION & CONSENT
          </h2>

          <div className="bg-[#d8e9f6] px-[10px] py-[9px] text-[12px] font-semibold leading-[1.35] text-[#173f69]">
            This authorization is intended to permit the prospective motor carrier and its authorized screening provider to obtain driving-
record information for lawful employment and driver-qualification purposes. It does not replace any separate consent required by
a State agency or screening provider.
          </div>

           <div className="mb-2 text-[12.5px]">
            I authorize the prospective employer, its authorized agents, and its designated consumer reporting or records provider to obtain
and review motor vehicle records and driver-license information for lawful employment and driver-qualification purposes. This
authorization includes records from State Driver Licensing Agencies and, when lawfully available through an authorized source,
CDLIS-related information concerning my commercial driver license status, class, endorsements, restrictions, disqualifications,
convictions, suspensions/revocations, and medical-certification status.
          </div>
  
          <div className="mb-2 text-[12.5px]">
            I authorize such records to be obtained before employment and, to the extent permitted by law, periodically during employment
for driver qualification, safety, insurance, and compliance purposes. I understand that additional State-specific notices or
authorizations may be required.
          </div>


          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-[13.5px]">


              <tbody>
                        <tr>
                  

                  <td className="border border-[#555] px-[6px] py-[7px] text-left text-[17px]">
                    <span className=" px-[6px] py-[7px] align-middle text-xs">
                      Driver Full Legal Name
                    </span>
                    <br />
                    <input
                      className="w-full border border-black p-2 h-[20px]"
                      type="text"
                    />
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
                  <td className="border border-[#555] px-[6px] py-[7px] align-top leading-[1.22]">
                    Work authorization / acceptable Form I-9 documentation - as
                    applicable (employee chooses acceptable documents)
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-[56%] border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
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

                      <input
                        className="w-full border border-black p-2"
                        type="text"
                      />
                    </div>
                  </td>

                  <td className="border border-[#555] px-[6px] py-[7px] align-middle text-left text-[17px]">
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" />

                      <input
                        className="w-full border border-black p-2"
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
      {/******page 4 start*****/}

    </div>
  );
}
