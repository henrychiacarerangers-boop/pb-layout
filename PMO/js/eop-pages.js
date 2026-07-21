/**
 * EOP inner pages — demo interactions. Scoped inside DOMContentLoaded.
 *
 * Schema type = Salary deduction | Employer contribution (batch / file category).
 * Contribution type = Salary Deduction (IND) for salary schema, or VSR / EMP / VSC per row for employer schema.
 */
document.addEventListener('DOMContentLoaded', () => {
    const EOP_SCHEMA_SALARY = 'Salary deduction';
    const EOP_SCHEMA_EMPLOYER = 'Employer contribution';
    const EOP_CONTRIB_SALARY_IND = 'Salary Deduction (IND)';
    const EOP_CONTRIB_EMPLOYER_MIXED =
        'Revolving Vesting (VSR), Immediate Vesting (EMP) & Straight Vesting (VSC)';
    const EOP_EMP_LABEL = {
        VSR: 'Revolving Vesting (VSR)',
        EMP: 'Immediate Vesting (EMP)',
        VSC: 'Straight Vesting (VSC)',
    };
    const btnDemoProcess = document.getElementById('eopDemoProcessBtn');
    const btnSpinner = document.getElementById('eopDemoBtnSpinner');
    const btnLabel = document.getElementById('eopDemoBtnLabel');
    if (btnDemoProcess && btnSpinner && btnLabel) {
        btnDemoProcess.addEventListener('click', () => {
            btnDemoProcess.disabled = true;
            btnSpinner.classList.remove('d-none');
            btnLabel.textContent = 'Processing...';
            window.setTimeout(() => {
                btnSpinner.classList.add('d-none');
                btnLabel.textContent = 'Complete';
                window.setTimeout(() => {
                    btnDemoProcess.disabled = false;
                    btnLabel.textContent = 'Submit draft';
                }, 900);
            }, 1500);
        });
    }

    /** Make contribution — salary vs employer tables + CSV download/import */
    let eopMakeResetTables = null;
    (function initEopMakeContribution() {
        const tabSalary = document.getElementById('eopMakeTabSalary');
        const tabEmployer = document.getElementById('eopMakeTabEmployer');
        const panelSalary = document.getElementById('eopMakePanelSalary');
        const panelEmployer = document.getElementById('eopMakePanelEmployer');
        const tbodySalary = document.getElementById('eopMakeSalaryTbody');
        const tbodyEmployer = document.getElementById('eopMakeEmployerTbody');
        const alertBox = document.getElementById('eopMakeImportAlert');
        const alertText = document.getElementById('eopMakeImportAlertText');

        if (!tabSalary || !tabEmployer || !panelSalary || !panelEmployer || !tbodySalary || !tbodyEmployer) {
            return;
        }

        const SALARY_TYPE_DISPLAY = EOP_CONTRIB_SALARY_IND;
        const SALARY_TYPE_CSV = EOP_CONTRIB_SALARY_IND;
        const SALARY_SCHEMA_DISPLAY = EOP_SCHEMA_SALARY;
        const EMPLOYER_SCHEMA_DISPLAY = EOP_SCHEMA_EMPLOYER;
        const EMP_LABEL = EOP_EMP_LABEL;
        const VALID_FUNDS = new Set(['PRS-SR', 'PRS-EQF']);

        const DEFAULT_SALARY = [
            { name: 'Siti Aminah bte Hassan', nric: '800101010001', fund: 'PRS-SR', amount: 350, isNew: false },
            { name: 'Lee Wei Chen', nric: '800101010002', fund: 'PRS-EQF', amount: 420.5, isNew: false },
            { name: 'Nor Haliza bte Rahman', nric: '800101010004', fund: 'PRS-SR', amount: 280, isNew: true },
            { name: 'Wong Kah Lok', nric: '800101010005', fund: 'PRS-EQF', amount: 310, isNew: true },
            { name: 'Sarah Tan Li Min', nric: '800101010006', fund: 'PRS-SR', amount: 195, isNew: true },
            { name: 'Muhamad Iqbal bin Zulkifli', nric: '800101010007', fund: 'PRS-EQF', amount: 440, isNew: true },
        ];
        const DEFAULT_EMPLOYER = [
            { name: 'Ahmad Razak bin Osman', nric: '800101010001', fund: 'PRS-SR', kind: 'VSR', amount: 200, isNew: false },
            { name: 'Kumar A/L Rajendran', nric: '800101010003', fund: 'PRS-EQF', kind: 'EMP', amount: 150, isNew: false },
            { name: 'Jessica Lim Pei Wen', nric: '800101010008', fund: 'PRS-SR', kind: 'EMP', amount: 320, isNew: true },
            { name: 'Rajesh A/L Muthu', nric: '800101010009', fund: 'PRS-EQF', kind: 'VSC', amount: 275.5, isNew: true },
        ];

        let salaryRows = DEFAULT_SALARY.map((r) => ({ ...r }));
        let employerRows = DEFAULT_EMPLOYER.map((r) => ({ ...r }));

        const summarySalaryEl = document.getElementById('eopMakeSalarySummary');
        const summaryEmployerEl = document.getElementById('eopMakeEmployerSummary');

        function makeNewRowBadge(idx, prefix) {
            const span = document.createElement('span');
            span.className = 'badge rounded-pill fs-10 fw-semibold';
            span.id = `${prefix}${idx}`;
            span.setAttribute('role', 'status');
            span.textContent = 'New';
            span.style.cssText = 'background-color:#fff3e0;color:#ce7226;border:1px solid #ce7226;';
            return span;
        }

        function renderSalarySummary() {
            if (!summarySalaryEl) return;
            const total = salaryRows.length;
            const nNew = salaryRows.filter((r) => r.isNew).length;
            let html = `<strong class="text-dark">${total}</strong> employees on file`;
            if (nNew) {
                html += ` · <span class="text-muted">including ${nNew} new to this schedule</span>`;
            }
            summarySalaryEl.innerHTML = html;
        }

        function renderEmployerSummary() {
            if (!summaryEmployerEl) return;
            const total = employerRows.length;
            const nNew = employerRows.filter((r) => r.isNew).length;
            let html = `<strong class="text-dark">${total}</strong> employees on file`;
            if (nNew) {
                html += ` · <span class="text-muted">including ${nNew} new to this schedule</span>`;
            }
            summaryEmployerEl.innerHTML = html;
        }

        function hideMakeAlert() {
            if (alertBox) alertBox.classList.add('d-none');
            if (alertText) alertText.textContent = '';
        }

        function showMakeAlert(msg) {
            if (alertText) alertText.textContent = msg;
            if (alertBox) alertBox.classList.remove('d-none');
        }

        function fmtAmt(n) {
            return Number(n).toLocaleString('en-MY', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        }

        function renderSalary() {
            tbodySalary.textContent = '';
            salaryRows.forEach((r, idx) => {
                const tr = document.createElement('tr');
                tr.className = 'border-bottom';
                const tdName = document.createElement('td');
                tdName.className = 'ps-4 py-3';
                const nameWrap = document.createElement('div');
                nameWrap.className = 'd-flex flex-wrap align-items-center gap-2';
                const nameSpan = document.createElement('span');
                nameSpan.className = 'text-dark';
                nameSpan.textContent = r.name;
                nameWrap.appendChild(nameSpan);
                if (r.isNew) {
                    nameWrap.appendChild(makeNewRowBadge(idx, 'eopMakeSalBadgeNew'));
                }
                tdName.appendChild(nameWrap);
                tr.appendChild(tdName);
                [r.nric, r.fund, SALARY_SCHEMA_DISPLAY, SALARY_TYPE_DISPLAY].forEach((text) => {
                    const td = document.createElement('td');
                    td.className = 'py-3';
                    td.textContent = text;
                    tr.appendChild(td);
                });
                const tdAmt = document.createElement('td');
                tdAmt.className = 'pe-4 py-3 text-end fw-semibold text-dark';
                tdAmt.textContent = fmtAmt(r.amount);
                tr.appendChild(tdAmt);
                tbodySalary.appendChild(tr);
            });
            renderSalarySummary();
        }

        function renderEmployer() {
            tbodyEmployer.textContent = '';
            employerRows.forEach((r, idx) => {
                const tr = document.createElement('tr');
                tr.className = 'border-bottom';
                const tdName = document.createElement('td');
                tdName.className = 'ps-4 py-3';
                const nameWrap = document.createElement('div');
                nameWrap.className = 'd-flex flex-wrap align-items-center gap-2';
                const nameSpan = document.createElement('span');
                nameSpan.className = 'text-dark';
                nameSpan.textContent = r.name;
                nameWrap.appendChild(nameSpan);
                if (r.isNew) {
                    nameWrap.appendChild(makeNewRowBadge(idx, 'eopMakeEmpBadgeNew'));
                }
                tdName.appendChild(nameWrap);
                tr.appendChild(tdName);
                [r.nric, r.fund, EMPLOYER_SCHEMA_DISPLAY, EMP_LABEL[r.kind] || r.kind].forEach((text) => {
                    const td = document.createElement('td');
                    td.className = 'py-3';
                    td.textContent = text;
                    tr.appendChild(td);
                });
                const tdAmt = document.createElement('td');
                tdAmt.className = 'pe-4 py-3 text-end fw-semibold text-dark';
                tdAmt.textContent = fmtAmt(r.amount);
                tr.appendChild(tdAmt);
                tbodyEmployer.appendChild(tr);
            });
            renderEmployerSummary();
        }

        function setMode(mode) {
            const isSal = mode === 'salary';
            if (isSal) {
                panelSalary.classList.add('show', 'active');
                panelEmployer.classList.remove('show', 'active');
            } else {
                panelEmployer.classList.add('show', 'active');
                panelSalary.classList.remove('show', 'active');
            }
            tabSalary.classList.toggle('active', isSal);
            tabEmployer.classList.toggle('active', !isSal);
            tabSalary.setAttribute('aria-selected', String(isSal));
            tabEmployer.setAttribute('aria-selected', String(!isSal));
            hideMakeAlert();
        }

        tabSalary.addEventListener('click', (e) => {
            e.preventDefault();
            setMode('salary');
        });
        tabEmployer.addEventListener('click', (e) => {
            e.preventDefault();
            setMode('employer');
        });

        function csvEscape(field) {
            const s = String(field ?? '');
            if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
            return s;
        }

        function triggerDownload(filename, csvBody) {
            const blob = new Blob([`\uFEFF${csvBody}`], { type: 'text/csv;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.rel = 'noopener';
            a.click();
            URL.revokeObjectURL(url);
        }

        function buildSalaryCsv() {
            const header = ['Name', 'NRIC', 'FundName', 'SchemaType', 'ContributionType', 'Amount'];
            const lines = [header.join(',')];
            salaryRows.forEach((r) => {
                lines.push(
                    [r.name, r.nric, r.fund, SALARY_SCHEMA_DISPLAY, SALARY_TYPE_CSV, r.amount].map(csvEscape).join(',')
                );
            });
            return lines.join('\r\n');
        }

        function buildEmployerCsv() {
            const header = ['Name', 'NRIC', 'FundName', 'SchemaType', 'ContributionType', 'Amount'];
            const lines = [header.join(',')];
            employerRows.forEach((r) => {
                lines.push(
                    [r.name, r.nric, r.fund, EMPLOYER_SCHEMA_DISPLAY, r.kind, r.amount].map(csvEscape).join(',')
                );
            });
            return lines.join('\r\n');
        }

        document.getElementById('eopMakeDownloadCsvSalary')?.addEventListener('click', () => {
            hideMakeAlert();
            triggerDownload('eop-salary-deduction.csv', buildSalaryCsv());
        });
        document.getElementById('eopMakeDownloadCsvEmployer')?.addEventListener('click', () => {
            hideMakeAlert();
            triggerDownload('eop-employer-contribution.csv', buildEmployerCsv());
        });

        function parseCsvLine(line) {
            const out = [];
            let cur = '';
            let q = false;
            for (let i = 0; i < line.length; i++) {
                const c = line[i];
                if (c === '"') {
                    if (q && line[i + 1] === '"') {
                        cur += '"';
                        i++;
                    } else q = !q;
                } else if (c === ',' && !q) {
                    out.push(cur.trim());
                    cur = '';
                } else cur += c;
            }
            out.push(cur.trim());
            return out.map((x) => x.replace(/^\uFEFF/, '').replace(/^"|"$/g, ''));
        }

        function normHeader(h) {
            return h
                .replace(/^\uFEFF/, '')
                .trim()
                .toLowerCase()
                .replace(/\./g, '')
                .replace(/\s+/g, '');
        }

        function headerMap(cells) {
            const idx = {};
            cells.forEach((raw, i) => {
                const h = normHeader(raw);
                if (h === 'name') idx.name = i;
                else if (h === 'nric' || h === 'nricno' || h === 'employeeic') idx.nric = i;
                else if (h === 'fundname' || h === 'fund') idx.fund = i;
                else if (h === 'schematype' || h === 'schema') idx.schema = i;
                else if (h === 'contributiontype' || h === 'type') idx.type = i;
                else if (h === 'amount') idx.amount = i;
            });
            return idx;
        }

        function validSalaryType(cell) {
            const c = String(cell || '').toLowerCase();
            return c.includes('salary') && c.includes('deduction');
        }

        function parseEmployerKind(cell) {
            const u = String(cell || '').trim().toUpperCase();
            if (u === 'VSR' || u.includes('REVOLVING')) return 'VSR';
            if (u === 'EMP' || u.includes('IMMEDIATE')) return 'EMP';
            if (u === 'VSC' || u.includes('STRAIGHT')) return 'VSC';
            return null;
        }

        function importSalaryCsv(text) {
            const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length);
            if (!lines.length) return { error: 'Empty file.' };
            const h = parseCsvLine(lines[0]);
            const map = headerMap(h);
            if (map.name === undefined || map.nric === undefined || map.fund === undefined || map.amount === undefined) {
                return {
                    error: 'Need columns: Name, NRIC, FundName, Amount, and ContributionType (Salary Deduction IND). Optional: SchemaType (Salary deduction).',
                };
            }
            const next = [];
            for (let li = 1; li < lines.length; li++) {
                const cols = parseCsvLine(lines[li]);
                if (cols.every((c) => !c)) continue;
                const name = cols[map.name];
                const nric = cols[map.nric].replace(/\D/g, '');
                const fund = cols[map.fund].trim();
                const typeCell = map.type !== undefined ? cols[map.type] : SALARY_TYPE_CSV;
                const amt = parseFloat(String(cols[map.amount]).replace(/,/g, ''));
                if (!name) return { error: `Row ${li + 1}: Name is required.` };
                if (!/^\d{12}$/.test(nric)) return { error: `Row ${li + 1}: NRIC must be 12 digits.` };
                if (!VALID_FUNDS.has(fund)) return { error: `Row ${li + 1}: Fund must be PRS-SR or PRS-EQF.` };
                if (!validSalaryType(typeCell)) {
                    return {
                        error: `Row ${li + 1}: Contribution type must be Salary Deduction IND (salary deduction).`,
                    };
                }
                if (map.schema !== undefined) {
                    const sc = String(cols[map.schema] || '').toLowerCase();
                    if (!sc.includes('salary') || !sc.includes('deduction')) {
                        return {
                            error: `Row ${li + 1}: Schema type must be "${EOP_SCHEMA_SALARY}" for salary deduction imports.`,
                        };
                    }
                }
                if (Number.isNaN(amt) || amt <= 0) return { error: `Row ${li + 1}: Amount must be a positive number.` };
                next.push({ name, nric, fund, amount: amt, isNew: false });
            }
            if (!next.length) return { error: 'No data rows in CSV.' };
            return { rows: next };
        }

        function importEmployerCsv(text) {
            const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length);
            if (!lines.length) return { error: 'Empty file.' };
            const h = parseCsvLine(lines[0]);
            const map = headerMap(h);
            if (map.name === undefined || map.nric === undefined || map.fund === undefined || map.amount === undefined) {
                return { error: 'Need columns: Name, NRIC, FundName, ContributionType (VSR, EMP, or VSC), Amount. Optional: SchemaType (Employer contribution).' };
            }
            if (map.type === undefined) {
                return { error: 'ContributionType column required (use VSR, EMP, or VSC in CSV).' };
            }
            const next = [];
            for (let li = 1; li < lines.length; li++) {
                const cols = parseCsvLine(lines[li]);
                if (cols.every((c) => !c)) continue;
                const name = cols[map.name];
                const nric = cols[map.nric].replace(/\D/g, '');
                const fund = cols[map.fund].trim();
                const kind = parseEmployerKind(cols[map.type]);
                const amt = parseFloat(String(cols[map.amount]).replace(/,/g, ''));
                if (!name) return { error: `Row ${li + 1}: Name is required.` };
                if (!/^\d{12}$/.test(nric)) return { error: `Row ${li + 1}: NRIC must be 12 digits.` };
                if (!VALID_FUNDS.has(fund)) return { error: `Row ${li + 1}: Fund must be PRS-SR or PRS-EQF.` };
                if (!kind) {
                    return {
                        error: `Row ${li + 1}: Contribution type must be VSR (Revolving), EMP (Immediate), or VSC (Straight vesting).`,
                    };
                }
                if (map.schema !== undefined) {
                    const sc = String(cols[map.schema] || '').toLowerCase();
                    if (!sc.includes('employer')) {
                        return {
                            error: `Row ${li + 1}: Schema type must be "${EOP_SCHEMA_EMPLOYER}" for employer contribution imports.`,
                        };
                    }
                }
                if (Number.isNaN(amt) || amt <= 0) return { error: `Row ${li + 1}: Amount must be a positive number.` };
                next.push({ name, nric, fund, kind, amount: amt, isNew: false });
            }
            if (!next.length) return { error: 'No data rows in CSV.' };
            return { rows: next };
        }

        function wireImport(inputId, mode) {
            const inp = document.getElementById(inputId);
            if (!inp) return;
            inp.addEventListener('change', () => {
                hideMakeAlert();
                const file = inp.files && inp.files[0];
                inp.value = '';
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                    const text = String(reader.result || '');
                    const res = mode === 'salary' ? importSalaryCsv(text) : importEmployerCsv(text);
                    if (res.error) {
                        showMakeAlert(res.error);
                        return;
                    }
                    const prevList = mode === 'salary' ? salaryRows : employerRows;
                    const prevNrics = new Set(prevList.map((row) => row.nric));
                    const oldByNric = new Map(prevList.map((row) => [row.nric, row]));
                    const stamped = res.rows.map((row) => {
                        const had = prevNrics.has(row.nric);
                        const prevRow = oldByNric.get(row.nric);
                        return {
                            ...row,
                            isNew: !had ? true : Boolean(prevRow?.isNew),
                        };
                    });
                    if (mode === 'salary') {
                        salaryRows = stamped;
                        renderSalary();
                    } else {
                        employerRows = stamped;
                        renderEmployer();
                    }
                };
                reader.onerror = () => showMakeAlert('Could not read the file.');
                reader.readAsText(file, 'UTF-8');
            });
        }

        document.getElementById('eopMakeImportBtnSalary')?.addEventListener('click', () => {
            document.getElementById('eopMakeImportCsvSalary')?.click();
        });
        document.getElementById('eopMakeImportBtnEmployer')?.addEventListener('click', () => {
            document.getElementById('eopMakeImportCsvEmployer')?.click();
        });
        wireImport('eopMakeImportCsvSalary', 'salary');
        wireImport('eopMakeImportCsvEmployer', 'employer');

        eopMakeResetTables = () => {
            salaryRows = DEFAULT_SALARY.map((r) => ({ ...r }));
            employerRows = DEFAULT_EMPLOYER.map((r) => ({ ...r }));
            renderSalary();
            renderEmployer();
            hideMakeAlert();
            setMode('salary');
        };

        renderSalary();
        renderEmployer();
    })();

    const uploadPick = document.getElementById('eopUploadPickBtn');
    const uploadInput = document.getElementById('eopUploadFileInput');
    const uploadDropZone = document.getElementById('eopUploadDropZone');
    const uploadSelectedName = document.getElementById('eopUploadSelectedName');
    const uploadChannel = document.getElementById('eopUploadChannelSelect');
    const uploadSubmit = document.getElementById('eopUploadSubmitBtn');
    const uploadSubmitSpin = document.getElementById('eopUploadSubmitSpinner');
    const uploadSubmitLabel = document.getElementById('eopUploadSubmitLabel');
    const uploadReset = document.getElementById('eopUploadResetBtn');
    const uploadErrBox = document.getElementById('eopUploadMatchError');
    const uploadErrText = document.getElementById('eopUploadMatchErrorText');
    const uploadResultCard = document.getElementById('eopUploadResultCard');
    const uploadAnother = document.getElementById('eopUploadAnotherBtn');

    /** Demo employer master — CSV EmployeeIC must match these (prototype). */
    const EOP_UPLOAD_MASTER_IC = new Set(['800101010001', '800101010002', '800101010003']);

    function hideUploadError() {
        if (uploadErrBox) uploadErrBox.classList.add('d-none');
        if (uploadErrText) uploadErrText.textContent = '';
    }

    function showUploadError(msg) {
        if (uploadErrText) uploadErrText.textContent = msg;
        if (uploadErrBox) uploadErrBox.classList.remove('d-none');
        if (uploadResultCard) uploadResultCard.classList.add('d-none');
    }

    function normalizeCell(s) {
        return String(s || '')
            .replace(/^\uFEFF/, '')
            .trim()
            .replace(/^"|"$/g, '');
    }

    function parseContributionCsv(text) {
        const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length);
        if (!lines.length) return { error: 'File is empty.' };

        const headerCells = lines[0].split(',').map(normalizeCell);
        const lower = headerCells.map((h) => h.toLowerCase());
        let icIdx = lower.findIndex(
            (h) => h === 'employeeic' || h === 'ic' || h === 'employee_id'
        );
        let amtIdx = lower.findIndex((h) => h === 'amount' || h === 'contribution' || h === 'amt');

        if (icIdx === -1 || amtIdx === -1) {
            return {
                error: 'CSV must include EmployeeIC and Amount columns (check spelling on the first row).',
            };
        }

        const rows = [];
        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(normalizeCell);
            const ic = cols[icIdx];
            const rawAmt = cols[amtIdx];
            if (!ic && !rawAmt) continue;
            const amt = parseFloat(String(rawAmt).replace(/,/g, ''));
            if (!/^\d{12}$/.test(ic)) {
                return { error: `Row ${i + 1}: EmployeeIC must be a 12-digit number (got "${ic || 'blank'}").` };
            }
            if (Number.isNaN(amt) || amt <= 0) {
                return { error: `Row ${i + 1}: Amount must be a positive number.` };
            }
            rows.push({ ic, amt });
        }

        if (!rows.length) return { error: 'No data rows found after the header.' };

        const seen = new Set();
        for (let r = 0; r < rows.length; r++) {
            if (seen.has(rows[r].ic)) {
                return { error: `Duplicate EmployeeIC in file: ${rows[r].ic}.` };
            }
            seen.add(rows[r].ic);
            if (!EOP_UPLOAD_MASTER_IC.has(rows[r].ic)) {
                return {
                    error: `EmployeeIC ${rows[r].ic} does not match employer records (not found on file).`,
                };
            }
        }

        const total = rows.reduce((s, r) => s + r.amt, 0);
        return { rows, total };
    }

    function uploadSchemaLabel(value) {
        return value === 'employer' ? EOP_SCHEMA_EMPLOYER : EOP_SCHEMA_SALARY;
    }

    function uploadContributionSummary(value) {
        return value === 'employer' ? EOP_CONTRIB_EMPLOYER_MIXED : EOP_CONTRIB_SALARY_IND;
    }

    function resetUploadUi(keepChannel) {
        hideUploadError();
        if (uploadInput) uploadInput.value = '';
        if (uploadSelectedName) {
            uploadSelectedName.innerHTML = '<span class="text-muted fw-normal">No file selected</span>';
        }
        if (uploadResultCard) uploadResultCard.classList.add('d-none');
        if (!keepChannel && uploadChannel) uploadChannel.selectedIndex = 0;
        if (uploadSubmit) uploadSubmit.disabled = false;
        if (uploadSubmitSpin) uploadSubmitSpin.classList.add('d-none');
        if (uploadSubmitLabel) uploadSubmitLabel.textContent = 'Upload & validate';
    }

    if (uploadPick && uploadInput) {
        uploadPick.addEventListener('click', () => uploadInput.click());
    }

    if (uploadInput && uploadSelectedName) {
        uploadInput.addEventListener('change', () => {
            hideUploadError();
            const f = uploadInput.files && uploadInput.files[0];
            if (f) {
                uploadSelectedName.textContent = f.name;
            } else {
                uploadSelectedName.innerHTML = '<span class="text-muted fw-normal">No file selected</span>';
            }
        });
    }

    if (uploadDropZone && uploadInput) {
        ['dragenter', 'dragover'].forEach((ev) => {
            uploadDropZone.addEventListener(ev, (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadDropZone.classList.add('eop-upload-dropzone-active');
            });
        });
        ['dragleave', 'drop'].forEach((ev) => {
            uploadDropZone.addEventListener(ev, (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadDropZone.classList.remove('eop-upload-dropzone-active');
            });
        });
        uploadDropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            if (!dt || !dt.files || !dt.files.length) return;
            const f = dt.files[0];
            if (!/\.csv$/i.test(f.name)) {
                showUploadError('Please drop a .csv file only (prototype).');
                return;
            }
            try {
                const dti = new DataTransfer();
                dti.items.add(f);
                uploadInput.files = dti.files;
            } catch {
                showUploadError('Could not attach dropped file; use Choose CSV.');
                return;
            }
            hideUploadError();
            if (uploadSelectedName) uploadSelectedName.textContent = f.name;
        });
    }

    if (uploadReset) {
        uploadReset.addEventListener('click', () => resetUploadUi(false));
    }

    if (uploadAnother) {
        uploadAnother.addEventListener('click', () => resetUploadUi(true));
    }

    if (uploadSubmit && uploadInput && uploadChannel && uploadSubmitSpin && uploadSubmitLabel) {
        uploadSubmit.addEventListener('click', () => {
            hideUploadError();
            const file = uploadInput.files && uploadInput.files[0];
            if (!file) {
                showUploadError('Select a CSV file first.');
                return;
            }
            if (!/\.csv$/i.test(file.name)) {
                showUploadError('Only CSV files are accepted in this prototype.');
                return;
            }

            const ch = uploadChannel.value;
            uploadSubmit.disabled = true;
            uploadSubmitSpin.classList.remove('d-none');
            uploadSubmitLabel.textContent = 'Matching…';

            const reader = new FileReader();
            reader.onload = () => {
                window.setTimeout(() => {
                    const text = String(reader.result || '');
                    const parsed = parseContributionCsv(text);
                    uploadSubmitSpin.classList.add('d-none');
                    uploadSubmitLabel.textContent = 'Upload & validate';
                    uploadSubmit.disabled = false;

                    if (parsed.error) {
                        showUploadError(parsed.error);
                        return;
                    }

                    const ref = `EOP-UP-${Date.now().toString(36).toUpperCase()}`;
                    const now = new Date();
                    const dtStr = now.toLocaleString('en-MY', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    });

                    const elStatus = document.getElementById('eopUploadResultStatus');
                    const elRef = document.getElementById('eopUploadResultRef');
                    const elDt = document.getElementById('eopUploadResultDateTime');
                    const elCh = document.getElementById('eopUploadResultSchema');
                    const elContrib = document.getElementById('eopUploadResultContribution');
                    const elEmp = document.getElementById('eopUploadResultEmpCount');
                    const elAmt = document.getElementById('eopUploadResultAmount');

                    if (elStatus) elStatus.textContent = 'Completed';
                    if (elRef) elRef.textContent = ref;
                    if (elDt) elDt.textContent = dtStr;
                    if (elCh) elCh.textContent = uploadSchemaLabel(ch);
                    if (elContrib) elContrib.textContent = uploadContributionSummary(ch);
                    if (elEmp) elEmp.textContent = String(parsed.rows.length);
                    if (elAmt) {
                        elAmt.textContent = parsed.total.toLocaleString('en-MY', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        });
                    }
                    if (uploadResultCard) uploadResultCard.classList.remove('d-none');
                    uploadResultCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 1400);
            };
            reader.onerror = () => {
                uploadSubmitSpin.classList.add('d-none');
                uploadSubmitLabel.textContent = 'Upload & validate';
                uploadSubmit.disabled = false;
                showUploadError('Could not read the file.');
            };
            reader.readAsText(file, 'UTF-8');
        });
    }

    const clearMake = document.getElementById('eopMakeClearBtn');
    if (clearMake) {
        clearMake.addEventListener('click', () => {
            const m = document.getElementById('eopMakeMonth');
            const s = document.getElementById('eopMakeScheme');
            if (m) m.selectedIndex = 0;
            if (s) s.selectedIndex = 0;
            if (typeof eopMakeResetTables === 'function') eopMakeResetTables();
            if (m) m.focus();
        });
    }

    /** EOP Payment list page — row actions (open detail page / Cancel) */
    (function initEopPaymentWizard() {
        const step0 = document.getElementById('eopPayStep0');
        if (!step0) return;

        const payTabSalary = document.getElementById('eopPayTabSalary');
        const payTabEmployer = document.getElementById('eopPayTabEmployer');
        const payPaneSalary = document.getElementById('eopPayPaneSalary');
        const payPaneEmployer = document.getElementById('eopPayPaneEmployer');
        const CancelBanner = document.getElementById('eopPayCancelBanner');

        function setPayTab(mode) {
            const isSalary = mode === 'salary';
            payTabSalary?.classList.toggle('active', isSalary);
            payTabEmployer?.classList.toggle('active', !isSalary);
            payTabSalary?.setAttribute('aria-selected', String(isSalary));
            payTabEmployer?.setAttribute('aria-selected', String(!isSalary));
            payPaneSalary?.classList.toggle('show', isSalary);
            payPaneSalary?.classList.toggle('active', isSalary);
            payPaneEmployer?.classList.toggle('show', !isSalary);
            payPaneEmployer?.classList.toggle('active', !isSalary);
        }

        payTabSalary?.addEventListener('click', (e) => {
            e.preventDefault();
            setPayTab('salary');
        });
        payTabEmployer?.addEventListener('click', (e) => {
            e.preventDefault();
            setPayTab('employer');
        });

        const pendingBannerBtn = document.getElementById('eopPayPendingBannerAction');
        pendingBannerBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('eopPayTabCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        step0.addEventListener('click', (e) => {
            const action = e.target.closest('.eop-pay-action-link, .eop-pay-Cancel-link');
            if (!action || !step0.contains(action)) return;
            const ddRoot = action.closest('.dropdown');
            const toggle = ddRoot?.querySelector('[data-bs-toggle="dropdown"]');
            if (toggle && window.bootstrap?.Dropdown) {
                const inst = bootstrap.Dropdown.getInstance(toggle);
                inst?.hide();
            }
        });
    })();

    /** EOP Payment detail page — single transaction wizard */
    (function initEopPaymentDetailWizard() {
        const step1 = document.getElementById('eopPayStep1');
        if (!step1) return;

        const step2 = document.getElementById('eopPayStep2');
        const step3 = document.getElementById('eopPayStep3');
        const detailHeaderRef = document.getElementById('eopPayDetailHeaderRef');
        const detailHeaderContrib = document.getElementById('eopPayDetailHeaderContrib');
        const detailHeaderSchemaLine = document.getElementById('eopPayDetailHeaderSchemaLine');
        const detailRef = document.getElementById('eopPayDetailRef');
        const detailSchema = document.getElementById('eopPayDetailSchema');
        const detailContribType = document.getElementById('eopPayDetailContribType');
        const detailEmp = document.getElementById('eopPayDetailEmp');
        const detailAmount = document.getElementById('eopPayDetailAmount');
        const sumSchema = document.getElementById('eopPaySumSchema');
        const sumContribution = document.getElementById('eopPaySumContribution');
        const sumRef = document.getElementById('eopPaySumRef');
        const sumEmp = document.getElementById('eopPaySumEmp');
        const sumTotal = document.getElementById('eopPaySumTotal');
        const printDateTime = document.getElementById('eopPayPrintDateTime');
        const declareRead = document.getElementById('eopPayDeclareRead');
        const captchaBox = document.getElementById('eopPayCaptchaBox');
        const captchaInput = document.getElementById('eopPayCaptchaInput');
        const pacInput = document.getElementById('eopPayPacInput');
        const pacErr = document.getElementById('eopPayPacErr');
        const bankSelect = document.getElementById('eopPayBankSelect');
        const methodSelect = document.getElementById('eopPayMethodSelect');
        const sideMethod = document.getElementById('eopPaySideMethod');
        const sideBank = document.getElementById('eopPaySideBank');
        const sideTotal = document.getElementById('eopPaySideTotal');
        const confirmBtn = document.getElementById('eopPayBtnConfirmPay');
        const confirmSpin = document.getElementById('eopPayConfirmSpinner');
        const confirmLab = document.getElementById('eopPayConfirmLabel');
        const CAPTCHA_POOL = ['EOP9A2', 'PRS3X7', 'FPX8K1', 'RM42Z9'];

        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref') || 'RC00000000000124';
        const chRaw = (params.get('ch') || 'salary').toLowerCase();
        const employees = parseInt(params.get('emp') || '18', 10) || 18;
        const amt = parseInt(params.get('amt') || '42500', 10) || 42500;
        const schemaLabel = chRaw === 'employer' ? EOP_SCHEMA_EMPLOYER : EOP_SCHEMA_SALARY;
        const contribLabel = chRaw === 'employer' ? EOP_CONTRIB_EMPLOYER_MIXED : EOP_CONTRIB_SALARY_IND;

        // Sample Employee Lists for each reference batch
        const EMPLOYEE_DATA = {
            'RC00000000000124': [
                { name: 'Ahmad bin Ridzuan', nric: '860512-14-5531', fund: 'PRS-SR', type: 'Salary Deduction IND', amount: '2,500.00' },
                { name: 'Tan Kah Sheng', nric: '891104-08-6623', fund: 'PRS-EQF', type: 'Salary Deduction IND', amount: '3,000.00' },
                { name: 'Priyah a/p Ganesan', nric: '920215-10-5884', fund: 'PRS-GRF', type: 'Salary Deduction IND', amount: '1,800.00' },
                { name: 'Mohd Fadzil bin Razali', nric: '880820-09-5117', fund: 'PRS-IMDF', type: 'Salary Deduction IND', amount: '4,000.00' },
                { name: 'Chew Mei Ling', nric: '910403-14-5332', fund: 'PRS-MDF', type: 'Salary Deduction IND', amount: '2,200.00' },
                { name: 'Nurul Farhana binti Ismail', nric: '940608-03-5126', fund: 'PRS-CVF', type: 'Salary Deduction IND', amount: '3,500.00' },
                { name: 'Syahrul bin Hassan', nric: '870125-08-5441', fund: 'PRS-SR', type: 'Salary Deduction IND', amount: '2,000.00' },
                { name: 'Lim Wei Kiat', nric: '900518-10-5229', fund: 'PRS-EQF', type: 'Salary Deduction IND', amount: '2,800.00' },
                { name: 'Saraswathy a/p Raman', nric: '851022-14-5996', fund: 'PRS-GRF', type: 'Salary Deduction IND', amount: '1,500.00' },
                { name: 'Muhammad Zaim bin Yusof', nric: '931214-03-5221', fund: 'PRS-IMDF', type: 'Salary Deduction IND', amount: '3,200.00' },
                { name: 'Wong Siew Lan', nric: '890730-14-5662', fund: 'PRS-MDF', type: 'Salary Deduction IND', amount: '2,400.00' },
                { name: 'Amira binti Mansor', nric: '950311-09-5228', fund: 'PRS-CVF', type: 'Salary Deduction IND', amount: '1,900.00' },
                { name: 'Khairul Anuar bin Zulkifli', nric: '860904-10-5663', fund: 'PRS-SR', type: 'Salary Deduction IND', amount: '2,100.00' },
                { name: 'Ng Kok Leong', nric: '921105-08-5775', fund: 'PRS-EQF', type: 'Salary Deduction IND', amount: '3,100.00' },
                { name: 'Divya a/p Murugan', nric: '940218-14-5882', fund: 'PRS-GRF', type: 'Salary Deduction IND', amount: '1,700.00' },
                { name: 'Zulhelmi bin Osman', nric: '881229-03-5339', fund: 'PRS-IMDF', type: 'Salary Deduction IND', amount: '1,600.00' },
                { name: 'Chan Yoke Wah', nric: '901002-14-5110', fund: 'PRS-MDF', type: 'Salary Deduction IND', amount: '2,300.00' },
                { name: 'Hanim binti Mohd Nor', nric: '920807-09-5334', fund: 'PRS-CVF', type: 'Salary Deduction IND', amount: '900.00' }
            ],
            'RC00000000000320': [
                { name: 'Syahrul bin Hassan', nric: '870125-08-5441', fund: 'PRS-SR', type: 'Salary Deduction IND', amount: '3,000.00' },
                { name: 'Lim Wei Kiat', nric: '900518-10-5229', fund: 'PRS-EQF', type: 'Salary Deduction IND', amount: '4,500.00' },
                { name: 'Saraswathy a/p Raman', nric: '851022-14-5996', fund: 'PRS-GRF', type: 'Salary Deduction IND', amount: '2,200.00' },
                { name: 'Muhammad Zaim bin Yusof', nric: '931214-03-5221', fund: 'PRS-IMDF', type: 'Salary Deduction IND', amount: '5,000.00' },
                { name: 'Wong Siew Lan', nric: '890730-14-5662', fund: 'PRS-MDF', type: 'Salary Deduction IND', amount: '1,500.00' },
                { name: 'Amira binti Mansor', nric: '950311-09-5228', fund: 'PRS-CVF', type: 'Salary Deduction IND', amount: '2,000.00' }
            ],
            'RC00000000000502': [
                { name: 'Ahmad bin Ridzuan', nric: '860512-14-5531', fund: 'PRS-SR', type: 'Revolving Vesting (VSR)', amount: '4,500.00' },
                { name: 'Tan Kah Sheng', nric: '891104-08-6623', fund: 'PRS-EQF', type: 'Immediate Vesting (EMP)', amount: '5,000.00' },
                { name: 'Priyah a/p Ganesan', nric: '920215-10-5884', fund: 'PRS-GRF', type: 'Straight Vesting (VSC)', amount: '3,800.00' },
                { name: 'Mohd Fadzil bin Razali', nric: '880820-09-5117', fund: 'PRS-IMDF', type: 'Revolving Vesting (VSR)', amount: '4,000.00' },
                { name: 'Chew Mei Ling', nric: '910403-14-5332', fund: 'PRS-MDF', type: 'Immediate Vesting (EMP)', amount: '4,200.00' },
                { name: 'Nurul Farhana binti Ismail', nric: '940608-03-5126', fund: 'PRS-CVF', type: 'Straight Vesting (VSC)', amount: '3,500.00' },
                { name: 'Syahrul bin Hassan', nric: '870125-08-5441', fund: 'PRS-SR', type: 'Revolving Vesting (VSR)', amount: '3,000.00' },
                { name: 'Lim Wei Kiat', nric: '900518-10-5229', fund: 'PRS-EQF', type: 'Immediate Vesting (EMP)', amount: '3,800.00' },
                { name: 'Saraswathy a/p Raman', nric: '851022-14-5996', fund: 'PRS-GRF', type: 'Straight Vesting (VSC)', amount: '2,500.00' },
                { name: 'Muhammad Zaim bin Yusof', nric: '931214-03-5221', fund: 'PRS-IMDF', type: 'Revolving Vesting (VSR)', amount: '4,200.00' },
                { name: 'Wong Siew Lan', nric: '890730-14-5662', fund: 'PRS-MDF', type: 'Immediate Vesting (EMP)', amount: '3,400.00' },
                { name: 'Amira binti Mansor', nric: '950311-09-5228', fund: 'PRS-CVF', type: 'Straight Vesting (VSC)', amount: '2,900.00' },
                { name: 'Khairul Anuar bin Zulkifli', nric: '860904-10-5663', fund: 'PRS-SR', type: 'Revolving Vesting (VSR)', amount: '3,100.00' },
                { name: 'Ng Kok Leong', nric: '921105-08-5775', fund: 'PRS-EQF', type: 'Immediate Vesting (EMP)', amount: '4,100.00' },
                { name: 'Divya a/p Murugan', nric: '940218-14-5882', fund: 'PRS-GRF', type: 'Straight Vesting (VSC)', amount: '2,700.00' },
                { name: 'Zulhelmi bin Osman', nric: '881229-03-5339', fund: 'PRS-IMDF', type: 'Revolving Vesting (VSR)', amount: '2,600.00' },
                { name: 'Chan Yoke Wah', nric: '901002-14-5110', fund: 'PRS-MDF', type: 'Immediate Vesting (EMP)', amount: '3,300.00' },
                { name: 'Hanim binti Mohd Nor', nric: '920807-09-5334', fund: 'PRS-CVF', type: 'Straight Vesting (VSC)', amount: '2,900.00' },
                { name: 'Siti Aminah binti Yusuf', nric: '870420-10-5112', fund: 'PRS-SR', type: 'Revolving Vesting (VSR)', amount: '3,600.00' },
                { name: 'Lee Wei Seng', nric: '850115-08-5221', fund: 'PRS-EQF', type: 'Immediate Vesting (EMP)', amount: '3,500.00' },
                { name: 'Fatima binti Ibrahim', nric: '910930-14-5336', fund: 'PRS-GRF', type: 'Straight Vesting (VSC)', amount: '2,800.00' },
                { name: 'Tan Ah Kow', nric: '790408-10-5445', fund: 'PRS-IMDF', type: 'Revolving Vesting (VSR)', amount: '4,200.00' },
                { name: 'Ramasamy a/l Muniandy', nric: '821014-14-5553', fund: 'PRS-MDF', type: 'Immediate Vesting (EMP)', amount: '3,000.00' },
                { name: 'Ng Mei Yee', nric: '880312-08-5664', fund: 'PRS-CVF', type: 'Straight Vesting (VSC)', amount: '2,500.00' },
                { name: 'Mohamad Ali bin Abu', nric: '861102-10-5771', fund: 'PRS-SR', type: 'Revolving Vesting (VSR)', amount: '3,200.00' },
                { name: 'Vigneswaran a/l Raja', nric: '900228-14-5883', fund: 'PRS-EQF', type: 'Immediate Vesting (EMP)', amount: '3,100.00' },
                { name: 'Cheah Siew Fong', nric: '840715-08-5992', fund: 'PRS-GRF', type: 'Straight Vesting (VSC)', amount: '2,400.00' },
                { name: 'Farah binti Ahmad', nric: '931012-09-5114', fund: 'PRS-IMDF', type: 'Revolving Vesting (VSR)', amount: '1,900.00' }
            ]
        };

        function renderEmployeeList() {
            const tbody = document.getElementById('eopPayDetailTbody');
            const empBadge = document.getElementById('eopPayDetailEmpBadge');
            if (!tbody) return;

            const rows = EMPLOYEE_DATA[ref] || EMPLOYEE_DATA['RC00000000000124'];
            if (empBadge) empBadge.textContent = `${rows.length} Employees`;

            let html = '';
            rows.forEach((r) => {
                html += `
                    <tr class="border-bottom">
                        <td class="ps-3 py-3 fw-bold text-dark">${r.name}</td>
                        <td class="py-3 text-secondary font-monospace">${r.nric}</td>
                        <td class="py-3"><span class="badge bg-light text-dark border px-2 py-1 fs-9 fw-semibold">${r.fund}</span></td>
                        <td class="py-3 text-secondary">${r.type}</td>
                        <td class="pe-3 py-3 text-end fw-bold text-dark">RM ${r.amount}</td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;
        }

        function fmtMoney(n) {
            return Number(n).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        function fmtRmSen(n) {
            return `RM ${fmtMoney(n)}`;
        }
        function showStep(idx) {
            [step1, step2, step3].forEach((el, i) => {
                if (el) el.classList.toggle('d-none', i !== idx);
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function renderStep1() {
            if (detailHeaderRef) detailHeaderRef.textContent = ref;
            if (detailHeaderContrib) detailHeaderContrib.textContent = contribLabel;
            if (detailHeaderSchemaLine) detailHeaderSchemaLine.textContent = `Schema: ${schemaLabel}`;
            if (detailRef) detailRef.textContent = ref;
            if (detailSchema) detailSchema.textContent = schemaLabel;
            if (detailContribType) detailContribType.textContent = contribLabel;
            if (detailEmp) detailEmp.textContent = String(employees);
            if (detailAmount) detailAmount.textContent = fmtRmSen(amt);
            if (sumSchema) sumSchema.textContent = schemaLabel;
            if (sumContribution) sumContribution.textContent = contribLabel;
            if (sumRef) sumRef.textContent = ref;
            if (sumEmp) sumEmp.textContent = String(employees);
            if (sumTotal) sumTotal.textContent = fmtRmSen(amt);
            if (sideTotal) sideTotal.textContent = fmtRmSen(amt);
            if (printDateTime) printDateTime.textContent = new Date().toLocaleString('en-MY');
            const step2Line = document.getElementById('eopPayStep2BatchLine');
            if (step2Line) step2Line.textContent = `${ref} · ${contribLabel}`;

            // Populate the employee contributions table list
            renderEmployeeList();
        }
        function syncSidePanel() {
            if (sideBank && bankSelect) sideBank.textContent = bankSelect.value;
            if (sideMethod && methodSelect) {
                const opt = methodSelect.options[methodSelect.selectedIndex];
                sideMethod.textContent = opt ? opt.textContent : 'FPX';
            }
            if (sideTotal) sideTotal.textContent = fmtRmSen(amt);
        }

        renderStep1();
        syncSidePanel();

        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((t) => {
            if (window.bootstrap?.Tooltip) new bootstrap.Tooltip(t);
        });

        document.getElementById('eopPayBtnToPayment')?.addEventListener('click', () => {
            if (declareRead && !declareRead.checked) {
                window.alert('Please confirm the declaration to continue.');
                return;
            }
            syncSidePanel();
            showStep(1);
        });
        document.getElementById('eopPayBtnBackToStep1')?.addEventListener('click', () => showStep(0));
        document.getElementById('eopPayBtnBackStep2')?.addEventListener('click', () => showStep(0));
        bankSelect?.addEventListener('change', syncSidePanel);
        methodSelect?.addEventListener('change', syncSidePanel);

        document.getElementById('eopPayCaptchaRefresh')?.addEventListener('click', (e) => {
            e.preventDefault();
            const next = CAPTCHA_POOL[Math.floor(Math.random() * CAPTCHA_POOL.length)];
            if (captchaBox) captchaBox.textContent = next;
            if (captchaInput) captchaInput.value = '';
            captchaInput?.classList.remove('is-invalid');
        });
        document.getElementById('eopPayBtnRequestPac')?.addEventListener('click', () => {
            if (pacInput) pacInput.value = '12345678';
            pacInput?.classList.remove('is-invalid');
            pacErr?.classList.add('d-none');
        });

        confirmBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            const cap = (captchaInput?.value || '').trim().toUpperCase();
            const code = (captchaBox?.textContent || '').trim().toUpperCase();
            if (cap !== code) {
                captchaInput?.classList.add('is-invalid');
                return;
            }
            captchaInput?.classList.remove('is-invalid');
            if ((pacInput?.value || '').trim() !== '12345678') {
                pacInput?.classList.add('is-invalid');
                pacErr?.classList.remove('d-none');
                return;
            }
            pacInput?.classList.remove('is-invalid');
            pacErr?.classList.add('d-none');

            confirmBtn.disabled = true;
            confirmSpin?.classList.remove('d-none');
            if (confirmLab) confirmLab.textContent = 'Processing…';

            window.setTimeout(() => {
                const txn = `EOP-FPX-${Date.now().toString(36).toUpperCase()}`;
                const dt = new Date().toLocaleString('en-MY');
                document.getElementById('eopPayOkRef').textContent = txn;
                document.getElementById('eopPayOkBatches').textContent = ref;
                document.getElementById('eopPayOkEmpCount').textContent = String(employees);
                document.getElementById('eopPayOkAmount').textContent = fmtRmSen(amt);
                document.getElementById('eopPayOkCompany').textContent = 'Ativa Studio Solution Sdn Bhd';
                document.getElementById('eopPayOkBank').textContent = bankSelect?.value || '—';
                document.getElementById('eopPayOkTxn').textContent = txn;
                document.getElementById('eopPayOkDt').textContent = dt;
                confirmSpin?.classList.add('d-none');
                if (confirmLab) confirmLab.textContent = 'Confirm & Pay';
                confirmBtn.disabled = false;
                showStep(2);
            }, 1600);
        });
    })();

    /** EOP Authorise — same tab + dropdown behaviour pattern as unit-trust authorise.html */
    const eopAuthTabSalary = document.getElementById('eopAuthTabSalary');
    const eopAuthTabEmployer = document.getElementById('eopAuthTabEmployer');
    const eopAuthPaneSalary = document.getElementById('eopAuthPaneSalary');
    const eopAuthPaneEmployer = document.getElementById('eopAuthPaneEmployer');
    const eopAuthoriseTabContent = document.getElementById('eopAuthoriseTabContent');
    if (eopAuthTabSalary && eopAuthTabEmployer && eopAuthPaneSalary && eopAuthPaneEmployer) {
        eopAuthTabSalary.addEventListener('click', (e) => {
            e.preventDefault();
            eopAuthTabSalary.classList.add('active');
            eopAuthTabEmployer.classList.remove('active');
            eopAuthTabSalary.setAttribute('aria-selected', 'true');
            eopAuthTabEmployer.setAttribute('aria-selected', 'false');
            eopAuthPaneSalary.classList.add('show', 'active');
            eopAuthPaneEmployer.classList.remove('show', 'active');
        });
        eopAuthTabEmployer.addEventListener('click', (e) => {
            e.preventDefault();
            eopAuthTabEmployer.classList.add('active');
            eopAuthTabSalary.classList.remove('active');
            eopAuthTabEmployer.setAttribute('aria-selected', 'true');
            eopAuthTabSalary.setAttribute('aria-selected', 'false');
            eopAuthPaneEmployer.classList.add('show', 'active');
            eopAuthPaneSalary.classList.remove('show', 'active');
        });

        eopAuthoriseTabContent?.addEventListener('click', (e) => {
            const a = e.target.closest('.dropdown-item');
            if (!a || !eopAuthoriseTabContent.contains(a)) return;
            const href = (a.getAttribute('href') || '').trim();
            if (href && href !== '#' && !href.startsWith('#')) {
                return;
            }
            e.preventDefault();
            const ddRoot = a.closest('.dropdown');
            const toggle = ddRoot?.querySelector('[data-bs-toggle="dropdown"]');
            if (toggle && window.bootstrap?.Dropdown) {
                const inst = bootstrap.Dropdown.getInstance(toggle);
                inst?.hide();
            }
            const label = (a.textContent || '').trim();
            if (label === 'View details') return;
            const row = a.closest('tr');
            if (row && (label === 'Approve' || label === 'Reject')) {
                row.style.transition = 'opacity 0.3s ease';
                row.style.opacity = '0.45';
                window.setTimeout(() => {
                    row.style.opacity = '1';
                }, 900);
            }
        });
    }

    const einvBtn = document.getElementById('eopEinvDownloadBtn');
    const einvSpin = document.getElementById('eopEinvSpinner');
    const einvLab = document.getElementById('eopEinvLabel');
    if (einvBtn && einvSpin && einvLab) {
        einvBtn.addEventListener('click', () => {
            einvBtn.disabled = true;
            einvSpin.classList.remove('d-none');
            einvLab.textContent = 'Preparing...';
            window.setTimeout(() => {
                einvSpin.classList.add('d-none');
                einvLab.textContent = 'Download sample PRS e-Invoice (PDF)';
                einvBtn.disabled = false;
            }, 1400);
        });
    }

    const invBtn = document.getElementById('eopInvListBtn');
    const invSpin = document.getElementById('eopInvSpinner');
    const invLab = document.getElementById('eopInvLabel');
    if (invBtn && invSpin && invLab) {
        invBtn.addEventListener('click', () => {
            invBtn.disabled = true;
            invSpin.classList.remove('d-none');
            invLab.textContent = 'Loading...';
            window.setTimeout(() => {
                invSpin.classList.add('d-none');
                invLab.textContent = 'View PRS invoice list (demo)';
                invBtn.disabled = false;
            }, 1300);
        });
    }
});
