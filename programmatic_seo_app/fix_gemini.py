import re

with open('lib/gemini.ts', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix \` inside gemini.ts that aren't inside the NO ``` instructions
# Actually, the original gemini.ts has formatting issues. Let's just fix it carefully.
c = c.replace(r'return \`\n', 'return `\n')
c = c.replace(r'return \`', 'return `')
c = c.replace(r'\`;', '`;')
# Fix the error at line 37: it's missing the closing `}))`
# Wait, let's just make sure we don't break the object schema.
c = c.replace('keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\n});', 'keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\n  }))\n});')
c = c.replace('keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\r\n});', 'keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\r\n  }))\r\n});')

# The error on line 101: `Rule 1: NEVER use Markdown formatting (e.g., **bold**, *italics*, \`code\`).`
# Wait, in the original it's `\`code\``. That is correct INSIDE a template literal! So it should NOT be touched!
# And it wasn't an error in the FIRST build! It ONLY became an error when my `fix_everything.js` replaced `\`` with ` ``!
# But wait, what about the other `\`` in gemini.ts?
# Did `gemini.ts` have any errors in the VERY FIRST build? NO!
# `lib/gemini.ts` was PERFECT in the very first build EXCEPT for the missing `}))` which I didn't see at first because it bailed out on `bot-logs/route.ts`!
# So `lib/gemini.ts` ONLY has the `}))` missing issue!
# And what about `lib/sitemap-parser.ts`? Let's check it.

with open('lib/sitemap-parser.ts', 'r', encoding='utf-8') as f:
    s = f.read()

s = s.replace(r'fetch(\/sitemap.xml\)', "fetch('/sitemap.xml')")
s = s.replace(r'fetch(\${loc}\)', "fetch(`${loc}`)")
s = s.replace(r'fetch(\\/sitemap.xml\\)', "fetch('/sitemap.xml')")
s = s.replace(r'fetch(\\${loc}\\)', "fetch(`${loc}`)")

with open('lib/gemini.ts', 'w', encoding='utf-8') as f:
    f.write(c)
    
with open('lib/sitemap-parser.ts', 'w', encoding='utf-8') as f:
    f.write(s)

print("Done")
