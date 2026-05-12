import { BACKEND_URL } from "../config";

export interface CareerInquiryPayload {
  first_name: string;
  last_name: string;
  email: string;
  business_email?: string;
  mobile_number: string;
  phone_number?: string;
  role_applied_for: string;
  role_applying_for: string;
  role_title?: string;
  organization_name?: string;
  organization_type?: string;
  primary_interest?: string;
  challenge_or_initiative?: string;
  years_of_experience: string;
  linkedin_url?: string;
  linkedin_profile_url: string;
  resume_file?: File;
  resume_link?: string;
  portfolio_link?: string;
  portfolio_site?: string;
  cover_letter?: string;
  tell_us_about_yourself: string;
  how_did_you_hear?: string;
  referral_source?: string;
  other_source?: string;
}

export interface CareerInquiryResult {
  name: string;
}

async function uploadFileViaBackend(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file, file.name);

  const res = await fetch(`${BACKEND_URL}/erpnext/upload-file`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`File upload failed: ${res.status}`);
  }

  const data = await res.json();
  const fileUrl: string = data?.message?.file_url;
  if (!fileUrl) throw new Error("ERPNext did not return a file URL");
  return fileUrl;
}

export async function submitCareerInquiry(
  payload: CareerInquiryPayload
): Promise<CareerInquiryResult> {
  const { resume_file, ...rest } = payload;

  let resume_link = rest.resume_link;
  if (resume_file) {
    resume_link = await uploadFileViaBackend(resume_file);
  }

  const res = await fetch(`${BACKEND_URL}/erpnext/career-inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...rest,
      resume_link,
      ...(resume_file && resume_link
        ? { resume_file_url: resume_link, resume_file_name: resume_file.name }
        : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as Record<string, unknown>;
    const msg = (err.message || JSON.stringify(err)) as string;
    throw new Error(`ERPNext ${res.status}: ${msg}`);
  }

  const data = await res.json();
  return data.message as CareerInquiryResult;
}
