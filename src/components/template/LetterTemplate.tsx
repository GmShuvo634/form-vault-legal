import React from "react";
import "./LetterTemplate.css";

type LetterProps = {
  name: string;
  date: string;
  signature: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
};

const LetterTemplate = React.forwardRef<HTMLDivElement, LetterProps>((props, ref) => {
  const {
    name,
    date,
    signature,
    addressLine1,
    addressLine2,
    addressLine3,
  } = props;

  return (
    <div ref={ref} className="letter-container">
      <div className="letter-header">
        <p>
          Appellate Court Administrator<br />
          Appellate Court Records<br />
          Court of Appeals<br />
          Supreme Court Building<br />
          1163 State Street NE<br />
          Salem, Oregon 97301
        </p>
      </div>

      <div className="letter-subject">
        <strong>Re:</strong> <em>Donice Noelle Smith v. Christine Kotek</em>, SC No. S071902
      </div>

      <div className="letter-body">
        <p>To whom it may concern:</p>

        <p>
          I, <strong>{name}</strong>, am a citizen of Oregon with express interest in representation from Oregon Governor’s office.
          I understand the burden of proof is on Christine Kotek; see <em>State ex rel. Brewster v. Ostrander</em>, 212 Or. 17, 318 P.2d 283 (1957)
          (Burden of proof for oust and induction considered separately, burden of proof shifts to [Respondent] for oust, burden of proof on [Petitioner] for oust is of nominal public interest.).
        </p>

        <p>
          I hereby instruct this court to conclusively resolve all legal issues of first impression; see e.g. <em>State v. Johnson</em>,
          329 Or. App. 57, 63, 540 P3d 73 (2023) (“To conclusively resolve this legal issue of first impression, we would have to engage in
          an in-depth analysis of statutory text, context, and legislative history...”)
        </p>
      </div>

      <div className="letter-footer">
        <div className="left">
          {date}
        </div>
        <div className="right">
          _s/_{signature}<br />
          {/* {printName}<br /> */}
          {addressLine1}<br />
          {addressLine2 && <>{addressLine2}<br /></>}
          {addressLine3 && <>{addressLine3}<br /></>}
        </div>
      </div>

      <div className="letter-cc">
        <p><strong>CC:</strong></p>
        <p>Donice Noelle Smith via email</p>
        <p>Benjamin Gutman via online portal or USPS</p>
        <p>Harmeet Dhillon via usps</p>
      </div>
    </div>
  );
});

export default LetterTemplate;
