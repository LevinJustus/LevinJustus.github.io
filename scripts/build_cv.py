"""Build the one-page English academic CV. Requires reportlab.

Run from any directory: python scripts/build_cv.py
Personal profile values are read from ../data/profile.json.
"""
from pathlib import Path
import json
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
p = json.loads((ROOT / 'data/profile.json').read_text(encoding='utf-8'))
OUTPUT = ROOT / 'files/CV_Yuting_Zou.pdf'
INK = colors.HexColor('#202028')
ACCENT = colors.HexColor('#514578')
MUTED = colors.HexColor('#63616b')
body = ParagraphStyle('body', fontName='Times-Roman', fontSize=10.2, leading=13.1, textColor=INK, spaceAfter=4)
small = ParagraphStyle('small', parent=body, fontSize=9.4, leading=12, textColor=MUTED)
title = ParagraphStyle('name', parent=body, fontName='Times-Bold', fontSize=24, leading=27, alignment=TA_CENTER, spaceAfter=6)
subtitle = ParagraphStyle('subtitle', parent=body, alignment=TA_CENTER, fontSize=10.3, leading=14, spaceAfter=4)
contact = ParagraphStyle('contact', parent=subtitle, fontSize=9.4, leading=13)
section_style = ParagraphStyle('section', parent=body, fontName='Times-Bold', fontSize=11.1, leading=14, textColor=ACCENT, spaceBefore=10, spaceAfter=5)
bullet_style = ParagraphStyle('bullet', parent=body, leftIndent=10, firstLineIndent=-7, spaceAfter=3)
story = []

def para(text, style=body):
    return Paragraph(text, style)

def section(text):
    story.append(para(text.upper(), section_style))

def row(left, right, bold=True):
    t = Table([[para(('<b>'+left+'</b>') if bold else left), para(right, small)]], colWidths=[365, 145])
    t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),1),('TOPPADDING',(0,0),(-1,-1),0)]))
    story.append(t)

def bullet(text):
    story.append(para('• '+text, bullet_style))

story.append(para(escape(p['name']), title))
story.append(para('Undergraduate | Electrical Engineering and Automation', subtitle))
story.append(para(escape(p['university']), subtitle))
story.append(para('<link href="mailto:'+p['email']+'">'+p['email']+'</link> | <link href="https://github.com/'+p['github']+'">GitHub</link> | <link href="https://'+p['github'].lower()+'.github.io/">Homepage</link> | <link href="'+escape(p['scholar'])+'">Google Scholar</link> | <link href="https://orcid.org/'+p['orcid']+'">ORCID</link>', contact))

section('Education')
row(escape(p['university']), p['education_start']+' – '+p['education_end']+' (expected)')
story.append(para('Undergraduate, '+escape(p['major'])))
story.append(para(escape(p['school']), small))
bullet('GPA: '+p['gpa']+'; '+p['rank'].lower()+' in major.')
bullet('Selected coursework: Circuit Theory, Electric Machines and Drives, Automatic Control, Power System Analysis, Digital Electronics, Analog Electronics.')

section('Research')
story.append(para('<b>Research interests:</b> '+', '.join(p['interests'])+'.'))
story.append(para('<b>Research mentors:</b> Liang Shen (former electrical engineering instructor; supervised two papers on motor control and drive circuits); Wei Dong (Dean, School of Transportation and Electrical Engineering, Dalian University of Science and Technology).'))
row('Rail Surface Defect Detection with Motion Compensation', 'Ongoing')
bullet('Investigating lightweight segmentation, motion-assisted alignment, and reliability-aware multi-frame fusion for rail surface inspection.')
bullet('Current evaluation uses real static rail images and controlled synthetic sequences. Real-time performance and field deployment remain to be evaluated.')

section('Publications & Presentations')
story.append(para('[1] Liang Shen, <b>Yuting Zou</b>. <b>'+escape(p['publications'][0]['title'])+'</b>. In: <i>The Proceedings of 2025 Annual National Conference of Electrical Theory and New Technologies</i> (CETNT 2025), LNEE 1547, pp. 376–383. Springer, 2026. <link href="https://doi.org/'+p['publications'][0]['doi']+'">DOI: '+p['publications'][0]['doi']+'</link>.'))
story.append(Spacer(1, 3))
story.append(para('[2] Liang Shen, <b>Yuting Zou</b>, Luqing Jia, Xinyi Huang. <b>'+escape(p['publications'][1]['title'])+'</b>. In: <i>'+escape(p['publications'][1]['venue'])+'</i>, pp. '+p['publications'][1]['pages']+'. IEEE, '+p['publications'][1]['year']+'. <link href="https://doi.org/'+p['publications'][1]['doi']+'">DOI: '+p['publications'][1]['doi']+'</link>.'))

section('Experience')
row('SKF (Dalian) | Quality Department Intern', '2026.07 – 2026.08')
bullet('Supported quality operations, quality data migration, and documentation involving inspection cards and control plans.')

row("Founder | Qingyu Wu'an (Dalian) Network Technology Co., Ltd.", '2024')
bullet('Founded and registered an internet technology venture; gained early-stage entrepreneurship experience. The company has since been deregistered.')

section('Selected Honors & Awards')
bullet('<b>National Second Prize</b>, National College Business Elite Challenge, Innovation &amp; Entrepreneurship, Entrepreneurship Simulation Track (2025).')
bullet('<b>Provincial Second Prize</b>, National 3D Digital Innovation Design Competition (2025).')
bullet('<b>Provincial Second Prize</b>, Liaoning College Student Transportation Science &amp; Technology Competition (2025).')

section('Skills')
story.append(para('<b>Technical:</b> MATLAB, motor control, embedded development, circuit and power system analysis.'))
story.append(para('<b>Tools &amp; communication:</b> Microsoft Office, technical documentation, teamwork and coordination.'))

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor('#dedbe4'))
    canvas.line(43, 35, A4[0]-43, 35)
    canvas.setFont('Times-Roman', 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(43, 23, 'Yuting Zou | Curriculum Vitae')
    canvas.drawRightString(A4[0]-43, 23, str(doc.page))
    canvas.restoreState()

doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=43, leftMargin=43, topMargin=33, bottomMargin=45, title='Yuting Zou - Curriculum Vitae', author='Yuting Zou')
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUTPUT)



