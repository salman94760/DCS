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
      <div className="mx-auto w-full max-w-[240mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
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
      <div className="mx-auto w-full max-w-[240mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
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
      <div className="mx-auto w-full max-w-[240mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
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
      <div className="mx-auto w-full max-w-[240mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
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
      <div className="mx-auto w-full max-w-[240mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
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
      <div className="mx-auto w-full max-w-[240mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
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
              class="w-full md:w-auto
             px-[4px] py-[4px]
             md:p-0"
            >
              <input
                type="text"
                class="w-full md:w-[378px]
               h-[26px] md:h-[22px]
               border border-[#26364d]
               bg-white outline-none"
              />
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
              class="w-full md:w-auto
             px-[4px] py-[4px]
             md:p-0"
            >
              <input
                type="text"
                class="w-full md:w-[378px]
               h-[26px] md:h-[22px]
               border border-[#26364d]
               bg-white outline-none"
              />
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
      <div className="mx-auto w-full max-w-[240mm] min-h-[297mm] bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[17mm] lg:py-[17mm] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div class="w-full max-w-[900px] mx-auto px-2 sm:px-3">
          <div class="w-full">
            <h1 class="text-center font-bold text-[18px] sm:text-[20px] leading-[22px] mb-[6px]">
              DRIVER'S ROAD TEST & PROFICIENCY EVALUATION
            </h1>

            <div class="border border-[#26364d] bg-[#dbe4f1] min-h-[32px] flex flex-col sm:flex-row sm:items-center text-[14px] sm:text-[15px] font-bold">
              <div class="w-full sm:w-[75px] min-h-[32px] flex items-center px-[5px] border-b sm:border-b-0 sm:border-r border-[#26364d]">
                PART 1:
              </div>

              <input
                type="text"
                class="w-full sm:w-[378px] h-[24px] sm:h-[22px] my-[4px] sm:my-0 sm:ml-[4px] border border-[#26364d] bg-white outline-none"
              />

              <div class="w-full sm:flex-1 border-t sm:border-t-0 sm:border-l border-[#26364d] min-h-[32px] flex items-center px-[5px] whitespace-normal sm:whitespace-nowrap">
                TO BE COMPLETED BY PROSPECTIVE EMPLOYEE
              </div>
            </div>

            <div class="border-x border-b border-[#333] px-[5px] pt-[5px] pb-[6px]">
              <div class="flex flex-col sm:flex-row sm:items-center min-h-[20px] text-[14px] gap-y-[4px]">
                <span class="whitespace-nowrap">I, (Print Name):</span>

                <input class="w-full sm:w-[378px] h-[24px] sm:ml-[5px] border border-[#26364d] outline-none" />

                <div class="flex items-center gap-[7px]">
                  <span class="whitespace-nowrap">XXX-XX-___</span>
                  <span class="whitespace-nowrap">Social Security Number</span>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center min-h-[20px] text-[14px] gap-y-[4px] mt-[4px] sm:mt-0">
                <span class="whitespace-nowrap">Date of Birth:</span>

                <input class="w-full sm:w-[190px] h-[24px] sm:ml-[5px] border border-[#26364d] outline-none" />
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center min-h-[26px] text-[14px] gap-y-[4px] mt-[4px] sm:mt-0">
                <span class="whitespace-nowrap">Hereby authorize:</span>

                <input class="w-full flex-1 h-[26px] sm:ml-[5px] border border-[#26364d] outline-none" />
              </div>

              <div class="flex flex-col md:flex-row md:items-center text-[14px] gap-y-[4px] mt-[4px] md:mt-0">
                <span class="whitespace-nowrap">Previous Employer:</span>

                <input class="w-full md:w-[337px] h-[24px] md:ml-[5px] border border-[#26364d] outline-none" />

                <span class="md:ml-[5px] whitespace-nowrap">Email:</span>

                <input class="w-full md:w-[142px] h-[24px] md:ml-[4px] border border-[#26364d] outline-none" />
              </div>

              <div class="flex flex-col md:flex-row md:items-center text-[14px] gap-y-[4px] mt-[4px] md:mt-0">
                <span>Street:</span>

                <input class="w-full md:w-[333px] h-[24px] md:ml-[5px] border border-[#26364d] outline-none" />

                <span class="md:ml-[5px]">Telephone:</span>

                <input class="w-full md:w-[125px] h-[24px] md:ml-[4px] border border-[#26364d] outline-none" />
              </div>

              <div class="flex flex-col md:flex-row md:items-center text-[14px] gap-y-[4px] mt-[4px] md:mt-0">
                <span>City, State, Zip:</span>

                <input class="w-full md:w-[340px] h-[24px] md:ml-[5px] border border-[#26364d] outline-none" />

                <span class="md:ml-[5px]">Fax No.:</span>

                <input class="w-full md:w-[125px] h-[24px] md:ml-[4px] border border-[#26364d] outline-none" />
              </div>

              <div class="text-[14px] leading-[17px] mt-[5px]">
                To release and forward the information requested by section 3 of
                this document concerning my Alcohol and Controlled Substances
                Testing records within the previous 3 years from
                <input class="inline-block w-full sm:w-[174px] h-[24px] border border-[#26364d] align-middle outline-none mt-[3px] sm:mt-0" />
                <br class="hidden sm:block" />
                (employment application date)
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center min-h-[25px] text-[14px] mt-[4px]">
                <span class="whitespace-nowrap">Prospective Employer:</span>

                <input class="w-full sm:w-[355px] h-[24px] sm:ml-[5px] border border-[#26364d] outline-none" />
              </div>

              <div class="flex flex-col md:flex-row md:items-center text-[14px] gap-y-[4px] mt-[4px] md:mt-0">
                <span>Attention:</span>

                <input class="w-full md:w-[380px] h-[24px] md:ml-[5px] border border-[#26364d] outline-none" />

                <span class="md:ml-[5px] whitespace-nowrap">Telephone:</span>

                <input class="w-full md:w-[120px] h-[24px] md:ml-[4px] border border-[#26364d] outline-none" />
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center text-[14px] gap-y-[4px] mt-[4px] sm:mt-0">
                <span class="whitespace-nowrap">To: &nbsp;Street:</span>

                <input class="w-full sm:w-[380px] h-[24px] sm:ml-[5px] border border-[#26364d] outline-none" />
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center text-[14px] gap-y-[4px] mt-[4px] sm:mt-0">
                <span class="sm:ml-[32px] whitespace-nowrap">
                  City, State, Zip:
                </span>

                <input class="w-full sm:w-[340px] h-[24px] sm:ml-[5px] border border-[#26364d] outline-none" />
              </div>

              <p class="text-[13px] leading-[16px] mt-[5px] mb-[5px]">
                In compliance with §40.25(g) and 391.23(h), release of this
                information must be made in a written form that ensures
                confidentiality, such as fax, email, or letter.
              </p>

              <div class="flex flex-col sm:flex-row sm:items-center text-[14px] gap-y-[4px] mt-[4px]">
                <span>Prospective employer's fax number:</span>

                <input class="w-full sm:w-[315px] h-[24px] sm:ml-[5px] border border-[#26364d] outline-none" />
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center text-[14px] gap-y-[4px] mt-[4px]">
                <span>Prospective employer's email address:</span>

                <input class="w-full sm:w-[285px] h-[24px] sm:ml-[5px] border border-[#26364d] outline-none" />
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center text-[14px] gap-y-[4px] mt-[4px]">
                <span>Driver Signature:</span>

                <input class="w-full sm:w-[360px] h-[24px] sm:ml-[5px] border border-[#26364d] outline-none" />
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center text-[13px] mt-[4px] gap-[4px]">
                <div class="hidden sm:block w-[365px]"></div>

                <span class="whitespace-nowrap">Applicant's Signature</span>
                <span class="sm:ml-[38px] whitespace-nowrap">Date</span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center mt-[4px]">
                <div class="hidden sm:block w-[365px]"></div>

                <input class="w-full sm:w-[355px] h-[24px] border border-[#26364d] outline-none" />
              </div>

              <p class="text-[13px] leading-[16px] mt-[4px]">
                This information is being requested in compliance with §40.25(g)
                and 391.23.
              </p>
            </div>

            <div class="border-x border-b border-[#26364d] bg-[#dbe4f1] min-h-[32px] flex flex-col sm:flex-row sm:items-center text-[14px] sm:text-[15px] font-bold">
              <div class="w-full sm:w-[72px] min-h-[32px] flex items-center px-[5px] border-b sm:border-b-0 sm:border-r border-[#26364d]">
                PART 2:
              </div>

              <input
                type="text"
                class="w-full sm:w-[378px] h-[24px] sm:h-[22px] my-[4px] sm:my-0 sm:ml-[4px] border border-[#26364d] bg-white outline-none"
              />

              <div class="w-full sm:flex-1 border-t sm:border-t-0 sm:border-l border-[#26364d] min-h-[32px] flex items-center px-[5px] whitespace-normal sm:whitespace-nowrap">
                TO BE COMPLETED BY PREVIOUS EMPLOYER
              </div>
            </div>

            <div class="border-x border-b border-[#333] px-[5px] pt-[7px] pb-[6px]">
              <h2 class="text-center font-bold text-[16px] sm:text-[17px] leading-[19px] mb-[2px]">
                ACCIDENT HISTORY
              </h2>

              <div class="font-bold text-[13px] leading-[17px]">
                The applicant named above was employed by us.
                <span class="ml-[3px]">Yes</span>
                <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
                <span class="ml-[3px]">No</span>
                <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
                <div class="mt-[4px]">
                  Employed as
                  <input class="w-full sm:w-[160px] h-[23px] border border-[#26364d] align-middle outline-none" />
                  <span class="inline-block mt-[3px] sm:mt-0">from (m/y)</span>
                  <input class="w-[80px] h-[23px] border border-[#26364d] align-middle outline-none" />
                  <span>to (m/y)</span>
                  <input class="w-[80px] h-[23px] border border-[#26364d] align-middle outline-none" />
                </div>
                <div class="mt-[4px]">
                  1. Did he/she drive motor vehicle for you? Yes
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                  No
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                  If yes, what type? Straight Truck
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                  Tractor-Semitrailer
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                  Bus
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                  Cargo Tank
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                </div>
                <div class="mt-[4px]">
                  Doubles/Triples
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                  Other (Specify)
                  <input class="w-[105px] h-[23px] border border-[#26364d] align-middle outline-none" />
                </div>
                <div class="mt-[4px]">
                  2. Reason for leaving your employment: Discharged
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                  Resignation
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                  Lay Off
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                  Military Duty
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                  If there is no safety performance history to report, check
                  here
                  <input
                    type="checkbox"
                    class="w-[17px] h-[17px] align-middle"
                  />
                  sign below and return.
                </div>
              </div>

              <div class="font-bold text-[13px] leading-[17px] mt-[4px]">
                ACCIDENTS: Complete the following for any accidents included in
                your accident register (§390.15(b)) that involved the applicant
                in the 3 years prior to the application date shown above, or
                check
                <input type="checkbox" class="w-[17px] h-[17px] align-middle" />
                here if there is no accident register data for this driver.
              </div>

              <div class="w-full overflow-x-auto mt-[4px]">
                <table class="w-full min-w-[600px] border-collapse border border-[#333] text-[12px]">
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

              <div class="mt-[20px] text-[13px] leading-[17px]">
                Please provide information concerning any other accidents
                involving the applicant that were reported to government
                agencies or insurers or retained under internal company
                policies:
                <input class="w-full h-[24px] border border-[#26364d] outline-none align-middle mt-[4px]" />
              </div>

              <div class="mt-[3px] space-y-[3px]">
                <input class="w-full h-[24px] border border-[#26364d] outline-none block" />
                <input class="w-full h-[24px] border border-[#26364d] outline-none block" />
              </div>

              <div class="mt-[4px] text-[13px] font-bold">
                <span>Any other remarks:</span>
                <input class="w-full h-[24px] border border-[#26364d] outline-none align-middle mt-[4px]" />
              </div>

              <div class="mt-[3px] space-y-[3px]">
                <input class="w-full h-[24px] border border-[#26364d] outline-none block" />
                <input class="w-full h-[24px] border border-[#26364d] outline-none block" />
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center text-[13px] mt-[4px] gap-y-[4px]">
                <span>Signature:</span>

                <input class="w-full sm:w-[340px] h-[24px] sm:ml-[3px] border border-[#26364d] outline-none" />
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center text-[13px] mt-[4px] gap-y-[4px]">
                <span>Title:</span>

                <input class="w-full sm:w-[180px] h-[24px] sm:ml-[3px] border border-[#26364d] outline-none" />

                <span class="sm:ml-[8px]">Date:</span>

                <input class="w-full sm:w-[190px] h-[24px] sm:ml-[3px] border border-[#26364d] outline-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*****page 11 start********/}
    </div>
  );
}
