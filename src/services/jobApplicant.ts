import { BACKEND_URL } from "../config";

export interface JobApplicantPayload {
  applicant_name: string;
  email_id: string;
  phone_number?: string;
  country?: string;
  cover_letter?: string;
  job_title: string;           // Job Opening name (e.g. HR-OPP-2026-00001)
  designation?: string;
  resume_file?: File;
  resume_attachment?: string;
  source?: string;
  source_name?: string;
  // Native fields from updated HRMS job_applicant.json (corporaterulers fork)
  role_applying_for?: string;
  years_of_experience?: string;
  linkedin_profile_url?: string;
  portfolio_site?: string;
  how_did_you_hear?: string;
  other_source?: string;
  custom_fields?: Record<string, unknown>;
}

export interface JobApplicantResult {
  name: string;
  job_opening_id: string;
}

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file, file.name);

  const res = await fetch(`${BACKEND_URL}/erpnext/upload-file`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error(`File upload failed: ${res.status}`);
  const data = await res.json();
  const fileUrl: string = data?.message?.file_url;
  if (!fileUrl) throw new Error("ERPNext did not return a file URL");
  return fileUrl;
}

export async function submitJobApplicant(
  payload: JobApplicantPayload
): Promise<JobApplicantResult> {
  const { resume_file, ...rest } = payload;

  let resume_attachment = rest.resume_attachment;
  let resume_file_name: string | undefined;
  if (resume_file) {
    resume_attachment = await uploadFile(resume_file);
    resume_file_name = resume_file.name;
  }

  const res = await fetch(`${BACKEND_URL}/erpnext/job-applicant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...rest, resume_attachment, resume_file_name }),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const msg = (err.message || JSON.stringify(err)) as string;
    throw new Error(`ERPNext ${res.status}: ${msg}`);
  }

  const data = await res.json();
  return data.message as JobApplicantResult;
}
