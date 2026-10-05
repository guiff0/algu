"""
Generates public/algu-capabilities-statement.pdf (one page, US Letter).

Edit the constants below, then run:   python3 scripts/make_capabilities_statement.py
Blank values (UEI, CAGE, etc.) are omitted from the PDF automatically.
Keep these in sync with your SAM.gov record and app/content/alguContent.ts (GOV_PROFILE).
"""
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import Frame, Paragraph, Spacer, Table, TableStyle, KeepInFrame
from reportlab.pdfgen import canvas

OUT = "public/algu-capabilities-statement.pdf"

UEI = ""             # from SAM.gov
CAGE = ""            # from SAM.gov
BUSINESS_SIZE = ""   # e.g. "Small business (NAICS 541512)"; only if confirmed in SAM.gov
SOCIOECONOMIC = ""   # only certifications you actually hold
PHONE = ""
PAST_PERFORMANCE = []  # e.g. ["Agency / customer - scope - period - value"]; shown only if non-empty

INK = colors.HexColor("#0d1721"); BLUE = colors.HexColor("#2f6fe8"); DIM = colors.HexColor("#3b4655"); RULE = colors.HexColor("#c9ced6")

W, H = letter; M = 0.55 * inch
c = canvas.Canvas(OUT, pagesize=letter)
c.setTitle("ALGU Co. Capabilities Statement"); c.setAuthor("ALGU Co."); c.setSubject("Capabilities statement for government contracting officers")

# Header band
c.setFillColor(INK); c.rect(0, H - 1.25 * inch, W, 1.25 * inch, stroke=0, fill=1)
c.setFillColor(BLUE); c.rect(0, H - 1.25 * inch, 0.18 * inch, 1.25 * inch, stroke=0, fill=1)
c.setFillColor(colors.white); c.setFont("Helvetica-Bold", 26); c.drawString(M + 0.1 * inch, H - 0.62 * inch, "ALGU Co.")
c.setFont("Helvetica", 10.5); c.setFillColor(colors.HexColor("#a9b8cc")); c.drawString(M + 0.1 * inch, H - 0.84 * inch, "DBA algu  |  Charlotte, North Carolina")
c.setFillColor(colors.white); c.setFont("Helvetica-Bold", 13); c.drawRightString(W - M, H - 0.52 * inch, "CAPABILITIES STATEMENT")
c.setFont("Helvetica", 10); c.setFillColor(colors.HexColor("#a9b8cc")); c.drawRightString(W - M, H - 0.72 * inch, "Quantum, AI, and cybersecurity engineering")
c.drawRightString(W - M, H - 0.88 * inch, "for government missions")

h = ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=10.5, textColor=BLUE, spaceBefore=7, spaceAfter=3, leading=13)
b = ParagraphStyle("b", fontName="Helvetica", fontSize=8.8, textColor=DIM, leading=11.6)
bl = ParagraphStyle("bl", parent=b, leftIndent=9, bulletIndent=0, spaceAfter=1.6)
sm = ParagraphStyle("sm", parent=b, fontSize=8.1, leading=10.4)
def bullets(items): return [Paragraph(t, bl, bulletText="\u2022") for t in items]

left = [Paragraph("Company overview", h),
 Paragraph("ALGU Co. engineers and delivers next-generation technology for government and enterprise customers, specializing in quantum systems, artificial intelligence, cybersecurity, IT infrastructure, software engineering, and advanced hardware integration. We serve federal, state, and local agencies as a prime contractor and as a specialty teaming partner. Every engagement is scoped against a signed statement of work and the compliance requirements of the contract.", b),
 Paragraph("Core competencies", h)] + bullets([
 "<b>AI and machine learning:</b> ML pipelines, anomaly detection, data readiness, quantum-enhanced ML research",
 "<b>Cybersecurity and zero trust:</b> threat detection, identity and access architecture, secure-by-design software, CMMC and NIST SP 800-171 readiness support",
 "<b>Post-quantum cryptography:</b> cryptographic inventory, crypto-agility design, migration planning, PQC-ready engineering",
 "<b>Quantum software and R&amp;D:</b> hybrid quantum-classical algorithms, optimization, simulation, cloud quantum integration (Azure Quantum, AWS Braket, IBM Quantum)",
 "<b>Software, mobile, and DevSecOps:</b> custom web and mobile applications, APIs, secure CI/CD, legacy modernization",
 "<b>Cloud, data, and HPC:</b> cloud and hybrid HPC architecture, data platforms, analytics foundations",
 "<b>Hardware and infrastructure engineering:</b> custom quantum processors (five architectures), RF/microwave and cryogenic control, data-center and power systems"]) + [
 Paragraph("Differentiators", h)] + bullets([
 "<b>Full-stack ownership:</b> software, silicon, cryogenics, and power engineered as one system",
 "<b>Quantum-safe by default:</b> quantum-resistant cryptography across client and internal systems",
 "<b>Seven specialized divisions:</b> the right team owns each part of an engagement",
 "<b>Compliance-first delivery:</b> export-control and data-handling review on every engagement"])
if PAST_PERFORMANCE:
    left += [Paragraph("Past performance", h)] + bullets(PAST_PERFORMANCE)

rows = [("Legal name", "ALGU Co."), ("DBA", "algu"), ("State entity", "North Carolina Business Corporation, No. 1617133 (Current Active)"),
        ("Address", "2321 Dundeen St., Charlotte, NC 28216")]
for k, v in (("UEI", UEI), ("CAGE code", CAGE), ("Business size", BUSINESS_SIZE), ("Socioeconomic", SOCIOECONOMIC), ("Phone", PHONE)):
    if v: rows.append((k, v))
rows += [("Email", "algu@algu.net"), ("Website", "algu.net")]
tbl = Table([[Paragraph(f"<b>{k}</b>", sm), Paragraph(v, sm)] for k, v in rows], colWidths=[0.85 * inch, 2.0 * inch])
tbl.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.4, RULE), ("TOPPADDING", (0, 0), (-1, -1), 2.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5), ("LEFTPADDING", (0, 0), (-1, -1), 0)]))

naics = [("541511", "Custom Computer Programming"), ("541512", "Computer Systems Design"), ("541513", "Computer Facilities Management"), ("541519", "Other Computer Related Services"),
         ("518210", "Computing Infrastructure / Data Processing"), ("541715", "R&amp;D, Physical/Engineering/Life Sciences"), ("541330", "Engineering Services"),
         ("541690", "Scientific and Technical Consulting"), ("541618", "Other Management Consulting")]
right = [Paragraph("Company data", h), tbl, Spacer(1, 2), Paragraph("NAICS codes", h)] + [Paragraph(f"<b>{a}</b>  {t}", sm) for a, t in naics] + [
 Paragraph("Contract pathways", h)] + bullets([
 "Prime contracts and simplified acquisitions on SAM.gov", "Subcontracting and teaming under larger integrators", "SBIR/STTR and agency R&amp;D solicitations",
 "GSA schedules and GWACs, directly or through teaming", "State and local government procurement"])

colw = (W - 2 * M - 0.3 * inch)
lw, rw = colw * 0.60, colw * 0.40
top = H - 1.25 * inch - 0.12 * inch; bottom = 0.95 * inch
Frame(M, bottom, lw, top - bottom, 0, 0, 0, 0).addFromList([KeepInFrame(lw, top - bottom, left, mode="shrink")], c)
Frame(M + lw + 0.3 * inch, bottom, rw, top - bottom, 0, 0, 0, 0).addFromList([KeepInFrame(rw, top - bottom, right, mode="shrink")], c)

# Footer band
c.setStrokeColor(RULE); c.line(M, 0.82 * inch, W - M, 0.82 * inch)
c.setFillColor(INK); c.setFont("Helvetica-Bold", 10); c.drawString(M, 0.58 * inch, "To request a capability briefing or discuss teaming: algu@algu.net  |  algu.net")
c.setFont("Helvetica", 7.8); c.setFillColor(DIM)
c.drawString(M, 0.38 * inch, "Certifications, contract vehicles, and registration identifiers are listed only where shown above. Details available on request.")
c.save(); print("wrote", OUT)
