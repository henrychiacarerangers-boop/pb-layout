import fs from 'node:fs/promises';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const root = '/Users/henrychia/Desktop/PB design/Public Mutual';
const output = `${root}/Public-Mutual-Corporate-PMO-Portal-Walkthrough.pptx`;
const asset = (p) => fs.readFile(`${root}/${p}`);

async function writeBlob(path, blob) {
  await fs.writeFile(path, new Uint8Array(await blob.arrayBuffer()));
}

const deck = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const C = { navy: '#26247B', red: '#ED1C24', ink: '#15172A', muted: '#596174', pale: '#F4F5F9', rule: '#D9DCE6', white: '#FFFFFF', green: '#1B8A5A' };
const logo = await asset('PMO corporate/images/logo.png');
const pmoLogo = await asset('PMO corporate/images/pmo-logo-corporate.png');
const dashboardSvg = await asset('Adobe-XD-Import/PMO-corporate/unit-trust/dashboard.svg');
const dashboardPng = Buffer.from(dashboardSvg.toString().match(/data:image\/png;base64,([^"']+)/)?.[1] ?? '', 'base64');

function box(slide, pos, fill = C.white, line = C.rule) {
  return slide.shapes.add({ geometry: 'roundRect', position: pos, fill, line: { style: 'solid', fill: line, width: 1 }, borderRadius: 18 });
}
function text(slide, value, pos, size = 20, color = C.ink, bold = false, align = 'left') {
  const s = slide.shapes.add({ geometry: 'textbox', position: pos, fill: 'none', line: { style: 'solid', fill: 'none', width: 0 } });
  s.text = value; s.text.style = { fontFace: 'Montserrat', fontSize: size, color, bold, alignment: align, verticalAlignment: 'middle' }; return s;
}
function rule(slide, left, top, width, color = C.rule, height = 2) {
  slide.shapes.add({ geometry: 'rect', position: { left, top, width, height }, fill: color, line: { style: 'solid', fill: color, width: 0 } });
}
function header(slide, index, label) {
  text(slide, 'CORPORATE PMO PORTAL', { left: 64, top: 40, width: 420, height: 22 }, 12, C.red, true);
  text(slide, label, { left: 1040, top: 40, width: 176, height: 22 }, 12, C.muted, true, 'right');
  rule(slide, 64, 74, 1152);
  text(slide, String(index).padStart(2, '0'), { left: 64, top: 672, width: 45, height: 20 }, 12, C.muted, true);
}
function bullet(slide, y, title, body, accent = C.red, left = 76, width = 465) {
  slide.shapes.add({ geometry: 'ellipse', position: { left, top: y + 10, width: 12, height: 12 }, fill: accent, line: { style: 'solid', fill: accent, width: 0 } });
  text(slide, title, { left: left + 32, top: y, width, height: 30 }, 22, C.ink, true);
  text(slide, body, { left: left + 32, top: y + 34, width, height: 54 }, 17, C.muted, false);
}

// 1 — Cover
{
  const s = deck.slides.add(); s.background.fill = C.white;
  s.images.add({ blob: logo, contentType: 'image/png', alt: 'Public Mutual logo', fit: 'contain', position: { left: 72, top: 52, width: 138, height: 44 } });
  s.images.add({ blob: pmoLogo, contentType: 'image/png', alt: 'Corporate PMO logo', fit: 'contain', position: { left: 222, top: 54, width: 146, height: 42 } });
  text(s, 'Corporate PMO Portal', { left: 72, top: 190, width: 900, height: 86 }, 58, C.ink, true);
  text(s, 'A guided walkthrough of registration, login and corporate investment management', { left: 76, top: 292, width: 720, height: 64 }, 25, C.muted, false);
  rule(s, 76, 397, 245, C.red, 8);
  text(s, 'Designed for trusted corporate self-service across Unit Trust and Employer Online Portal workflows.', { left: 76, top: 438, width: 600, height: 62 }, 19, C.ink, false);
  box(s, { left: 832, top: 150, width: 330, height: 350 }, C.navy, C.navy);
  text(s, 'One corporate portal\nfor investment visibility,\naction and control.', { left: 872, top: 215, width: 245, height: 178 }, 31, C.white, true);
  text(s, 'REGISTRATION → LOGIN → MANAGE', { left: 872, top: 430, width: 245, height: 28 }, 13, '#D7D7F8', true);
}

// 2 — Story
{
  const s = deck.slides.add(); s.background.fill = C.white; header(s, 2, 'THE EXPERIENCE');
  text(s, 'A controlled path from enrolment to action', { left: 64, top: 110, width: 850, height: 60 }, 39, C.ink, true);
  text(s, 'The portal creates a clear hand-off between onboarding, secure access and day-to-day investment operations.', { left: 64, top: 176, width: 880, height: 52 }, 20, C.muted);
  const stages = [
    ['01', 'Register', 'Agree to service terms and identify the corporate user.'],
    ['02', 'Verify', 'Set credentials, confirm role context and validate with PAC.'],
    ['03', 'Manage', 'Review holdings, submit requests and authorise transactions.'],
  ];
  stages.forEach((a, i) => { const x = 64 + i * 385; box(s, { left: x, top: 300, width: 334, height: 228 }, i === 1 ? '#F7F7FD' : C.pale); text(s, a[0], { left: x + 26, top: 326, width: 65, height: 34 }, 18, C.red, true); text(s, a[1], { left: x + 26, top: 382, width: 260, height: 43 }, 29, C.ink, true); text(s, a[2], { left: x + 26, top: 438, width: 256, height: 56 }, 18, C.muted); if (i < 2) text(s, '→', { left: x + 342, top: 386, width: 38, height: 40 }, 30, C.red, true, 'center'); });
}

// 3 — Terms
{
  const s = deck.slides.add(); s.background.fill = C.white; header(s, 3, 'REGISTRATION · STEP 1');
  text(s, 'Registration begins with a clear service commitment', { left: 64, top: 110, width: 950, height: 60 }, 38, C.ink, true);
  text(s, 'The first screen establishes the terms, mandate and authorised-access context before any user details are collected.', { left: 64, top: 176, width: 920, height: 50 }, 20, C.muted);
  box(s, { left: 678, top: 125, width: 470, height: 430 }, '#FAFAFC');
  text(s, 'Corporate PMO Registration', { left: 720, top: 168, width: 360, height: 30 }, 22, C.ink, true);
  rule(s, 720, 218, 362, C.rule);
  ['Terms and Conditions accepted', 'Corporate mandate acknowledged', 'Authorised users confirmed'].forEach((v, i) => { text(s, '✓', { left: 724, top: 254 + i * 69, width: 28, height: 28 }, 20, C.green, true); text(s, v, { left: 762, top: 250 + i * 69, width: 292, height: 36 }, 18, C.ink, true); });
  box(s, { left: 720, top: 466, width: 170, height: 43 }, C.white); text(s, 'Disagree', { left: 732, top: 474, width: 145, height: 24 }, 15, C.muted, true, 'center');
  box(s, { left: 912, top: 466, width: 170, height: 43 }, C.red, C.red); text(s, 'Agree', { left: 924, top: 474, width: 145, height: 24 }, 15, C.white, true, 'center');
  bullet(s, 295, 'Set the right expectations', 'The opening makes the service boundaries and account authority explicit.');
  bullet(s, 420, 'Move forward only when ready', 'An affirmative “Agree” action advances the user into the registration form.');
}

// 4 — Details
{
  const s = deck.slides.add(); s.background.fill = C.white; header(s, 4, 'REGISTRATION · STEP 2');
  text(s, 'Company identity and login credentials are collected together', { left: 64, top: 110, width: 1050, height: 60 }, 38, C.ink, true);
  text(s, 'The portal pairs corporate registration details with secure account setup, keeping the onboarding journey in one place.', { left: 64, top: 176, width: 920, height: 52 }, 20, C.muted);
  const fields = [['Company Registration No.', 'Corporate identity'], ['Full Name & IC No.', 'Authorised individual'], ['Mobile & security code', 'Contact validation'], ['User ID & password', 'Login credentials']];
  fields.forEach((f, i) => { const x = i % 2 ? 670 : 64; const y = i < 2 ? 296 : 444; box(s, { left: x, top: y, width: 522, height: 114 }, C.pale); text(s, f[0], { left: x + 28, top: y + 22, width: 260, height: 27 }, 20, C.ink, true); text(s, f[1], { left: x + 28, top: y + 59, width: 310, height: 25 }, 17, C.muted); text(s, 'Required', { left: x + 398, top: y + 43, width: 90, height: 22 }, 14, C.red, true, 'right'); });
  text(s, 'Built-in password rules help the user create a credential that meets the portal’s requirements.', { left: 64, top: 600, width: 1050, height: 30 }, 18, C.ink, false);
}

// 5 — PAC
{
  const s = deck.slides.add(); s.background.fill = C.white; header(s, 5, 'REGISTRATION · STEP 3');
  text(s, 'Security verification confirms access and role context', { left: 64, top: 110, width: 950, height: 60 }, 38, C.ink, true);
  text(s, 'Before access is granted, the applicant confirms the company, the Unit Trust and EOP role assignments, and a PAC verification method.', { left: 64, top: 176, width: 970, height: 50 }, 20, C.muted);
  box(s, { left: 64, top: 285, width: 530, height: 246 }, '#F7F7FD');
  text(s, 'Role context', { left: 96, top: 316, width: 220, height: 28 }, 22, C.ink, true);
  text(s, 'Unit Trust', { left: 96, top: 370, width: 140, height: 28 }, 18, C.muted); text(s, 'User & Authoriser', { left: 280, top: 370, width: 250, height: 28 }, 18, C.ink, true);
  text(s, 'Employer Online Portal', { left: 96, top: 416, width: 178, height: 28 }, 18, C.muted); text(s, 'Admin', { left: 280, top: 416, width: 250, height: 28 }, 18, C.ink, true);
  text(s, 'Ativa Studio Solution Sdn Bhd', { left: 96, top: 471, width: 370, height: 25 }, 15, C.muted, true);
  box(s, { left: 662, top: 285, width: 486, height: 246 }, C.pale);
  text(s, 'PAC verification', { left: 696, top: 316, width: 240, height: 28 }, 22, C.ink, true);
  text(s, 'SMS Personal Authentication Code', { left: 696, top: 366, width: 330, height: 25 }, 17, C.muted);
  box(s, { left: 696, top: 413, width: 230, height: 45 }, C.white); text(s, 'Enter 8-digit PAC', { left: 712, top: 424, width: 170, height: 20 }, 15, C.muted);
  box(s, { left: 945, top: 413, width: 160, height: 45 }, C.red, C.red); text(s, 'COMPLETE', { left: 959, top: 424, width: 132, height: 20 }, 14, C.white, true, 'center');
  text(s, 'Result: a verified user is ready to enter the portal with the appropriate operating permissions.', { left: 64, top: 590, width: 1010, height: 30 }, 18, C.ink, false);
}

// 6 — dashboard visual
{
  const s = deck.slides.add(); s.background.fill = C.white; header(s, 6, 'AFTER LOGIN · DASHBOARD');
  text(s, 'The dashboard puts portfolio health and next actions in view', { left: 64, top: 104, width: 1040, height: 54 }, 36, C.ink, true);
  text(s, 'On login, corporate users land on a consolidated command centre for holdings, transactions, fund performance and analytics.', { left: 64, top: 164, width: 1030, height: 44 }, 19, C.muted);
  s.images.add({ blob: dashboardPng, contentType: 'image/png', alt: 'Corporate PMO dashboard from prototype', fit: 'contain', position: { left: 64, top: 244, width: 730, height: 405 }, geometry: 'roundRect', borderRadius: 18 });
  bullet(s, 268, 'Portfolio at a glance', 'Holdings, investment cost and returns are surfaced prominently.', C.red, 834, 310);
  bullet(s, 392, 'Work that needs attention', 'Pending approvals are flagged with a direct route to action.', C.red, 834, 310);
  bullet(s, 516, 'Investment intelligence', 'Recent transactions, price performance and fund analytics sit together.', C.red, 834, 310);
}

// 7 — capabilities
{
  const s = deck.slides.add(); s.background.fill = C.white; header(s, 7, 'AFTER LOGIN · WHAT USERS CAN DO');
  text(s, 'A single portal supports visibility, execution and governance', { left: 64, top: 110, width: 1030, height: 58 }, 38, C.ink, true);
  text(s, 'The logged-in navigation makes routine servicing and control tasks easy to find without losing the high-level portfolio view.', { left: 64, top: 176, width: 1030, height: 48 }, 20, C.muted);
  const caps = [
    ['Review accounts', 'View holdings, account details, fund performance and analytics.'],
    ['Make investments', 'Top up and submit investment or redemption requests.'],
    ['Authorise work', 'Review and approve pending transactions using role-based controls.'],
    ['Stay informed', 'Search transaction history, download statements and view online activities.'],
  ];
  caps.forEach((c, i) => { const x = i % 2 ? 672 : 64; const y = i < 2 ? 300 : 468; text(s, c[0], { left: x, top: y, width: 420, height: 30 }, 24, C.ink, true); rule(s, x, y + 43, 88, C.red, 4); text(s, c[1], { left: x, top: y + 63, width: 440, height: 55 }, 18, C.muted); });
  text(s, 'Corporate PMO combines a polished onboarding experience with operational tools that help users act confidently after login.', { left: 64, top: 634, width: 1110, height: 28 }, 18, C.navy, true);
}

for (let i = 0; i < deck.slides.items.length; i++) {
  const png = await deck.export({ slide: deck.slides.items[i], format: 'png', scale: 1 });
  await writeBlob(`${root}/.tmp-presentation/output/slide-${i + 1}.png`, png);
}
const montage = await deck.export({ format: 'webp', montage: true, scale: 1 });
await writeBlob(`${root}/.tmp-presentation/output/montage.webp`, montage);
const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(output);
