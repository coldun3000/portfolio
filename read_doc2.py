from docx import Document

doc = Document(r'C:\Users\egor2\OneDrive\Desktop\Рената диплом\Диплом Пугач Рената 2.docx')

# Find paragraph index for section 2.3
in_section = False
with open('doc2_section23.txt', 'w', encoding='utf-8') as f:
    for i, p in enumerate(doc.paragraphs):
        text = p.text.strip()
        if '2.3.' in text or ('2.3' in text and 'Практические рекомендации' in text):
            in_section = True
        if in_section:
            if not text:
                f.write(f'\n')
                continue
            is_bold = any(run.bold for run in p.runs if run.text.strip())
            all_bold = all(run.bold for run in p.runs if run.text.strip()) if any(run.text.strip() for run in p.runs) else False
            marker = '[BOLD]' if all_bold else '[pb]' if is_bold else ''
            f.write(f'P{i}: {marker} {text}\n\n')
            # Stop at next chapter or conclusion
            if ('ГЛАВА 3' in text or 'ЗАКЛЮЧЕНИЕ' in text) and i > 250:
                break

print("Done!")
