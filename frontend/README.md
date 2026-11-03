# Home-Care Central: frontend (Next.js)

Pages: login, public sign-up, public job application (`/apply`), and one portal per role
(Admin, HR, Staff, Caregiver, Client).

## Run
```bash
npm install
npm run dev        # http://localhost:3001
```
The browser only talks to this app. `/api/*` is forwarded to the backend (default `http://localhost:5000`).
To use another backend address set `BACKEND_URL` before `npm run dev` or `npm run build`.

Start the backend first and make its `CLIENT_ORIGIN` match this address (`http://localhost:3001`).

## Hiring
HR moves an applicant to **Offer**, then clicks **Hire**. A caregiver login is created with the
applicant's email and the default password **Test@1234**.

## Notes
Email notifications are not part of this release, so there is no Emails page and no set-password page.
