# Legacy Asset Mapping

Source of truth: local legacy clone `D:\vault\forge\ccylab` (mirror of live legacy `https://www.ccylab.com/`).
All assets copied byte-for-byte (no recompress / resize / recolor / rewrite / convert).
Responsive sizing + cropping is delegated to `next/image` at render time.

**NTU institutional logo (`NTU_Logo.png`, `NTU_Logo.webp`) is NOT migrated** — remains under the D-E gate.
`NTU.png` IS migrated: legacy `index.html` confirms it is the Home **campus hero photograph**
(`<img src="NTU.png" alt="NTU Campus" class="hero-img" />`) — a photographic website asset, not the institutional logo.

## Migrated assets

| Legacy filename | Source absolute path | Legacy page | Semantic role | Destination path | Source SHA256 | Destination SHA256 | Status |
|---|---|---|---|---|---|---|---|
| `NTU.png` | `D:\vault\forge\ccylab\NTU.png` | index.html (hero) | Home campus hero photograph (`hero-img`, alt "NTU Campus") | `D:\vault\projects\lab-website\public\images\legacy\NTU.png` | `DD76B36905305C325252DB0504E918678C9A6794C579100502740FF08F685177` | `DD76B36905305C325252DB0504E918678C9A6794C579100502740FF08F685177` | MIGRATED |
| `researchmain.jpeg` | `D:\vault\forge\ccylab\researchmain.jpeg` | research.html (line 40) | Research overview banner (`research-main`) | `D:\vault\projects\lab-website\public\images\legacy\researchmain.jpeg` | `AE0691341FD13763F40BCAD4E0B630038E10BE7D36A891485240E5D4B1C289E6` | `AE0691341FD13763F40BCAD4E0B630038E10BE7D36A891485240E5D4B1C289E6` | MIGRATED |
| `research1.jpeg` | `D:\vault\forge\ccylab\research1.jpeg` | research.html (line 84) | "Solving Real-World Problems" section thumb | `D:\vault\projects\lab-website\public\images\legacy\research1.jpeg` | `6F0079B95ECCFDF09BB81F9C62DB6488D8F3A5851667E38AD2343E8D6F1A09DA` | `6F0079B95ECCFDF09BB81F9C62DB6488D8F3A5851667E38AD2343E8D6F1A09DA` | MIGRATED |
| `research2.jpeg` | `D:\vault\forge\ccylab\research2.jpeg` | research.html (line 69) | "Building Better Membranes" section thumb | `D:\vault\projects\lab-website\public\images\legacy\research2.jpeg` | `C5A76D949D0F7258A3083FBED096024133ED6D9DE2C0752D498C4D24E9EA3E30` | `C5A76D949D0F7258A3083FBED096024133ED6D9DE2C0752D498C4D24E9EA3E30` | MIGRATED |
| `research3.jpeg` | `D:\vault\forge\ccylab\research3.jpeg` | research.html (line 57) | "Designing Porous Materials" section thumb | `D:\vault\projects\lab-website\public\images\legacy\research3.jpeg` | `55A2DBD0F2CD857D328D04A4CCDC52E00F2102D4358B0789945F41FB20980986` | `55A2DBD0F2CD857D328D04A4CCDC52E00F2102D4358B0789945F41FB20980986` | MIGRATED |
| `labnewsMay1.jpg` | `D:\vault\forge\ccylab\labnewsMay1.jpg` | index.html (Lab News row 1) | "Apr 2026: Welcome Dr. Kaiping Zhu join us." | `D:\vault\projects\lab-website\public\images\legacy\labnewsMay1.jpg` | `1689C202A8E0FE7FFF80E3F4A55C1B603FA53D43A4B403952B5AC12EE5A82F37` | `1689C202A8E0FE7FFF80E3F4A55C1B603FA53D43A4B403952B5AC12EE5A82F37` | MIGRATED |
| `labnewsMay2.jpg` | `D:\vault\forge\ccylab\labnewsMay2.jpg` | index.html (Lab News row 2) | "Feb 2026: Welcome Kim (Jiayi) Wu join us." | `D:\vault\projects\lab-website\public\images\legacy\labnewsMay2.jpg` | `6B1F763C6D0B29FB3D09016C75F8E06387BED5E2F6522AE4E287615A82487644` | `6B1F763C6D0B29FB3D09016C75F8E06387BED5E2F6522AE4E287615A82487644` | MIGRATED |
| `labnewsMay3.jpg` | `D:\vault\forge\ccylab\labnewsMay3.jpg` | index.html (Lab News row 3) | "Jan 2026: Welcome our first PhD student Christine (Sunho)." | `D:\vault\projects\lab-website\public\images\legacy\labnewsMay3.jpg` | `2DC95FA41CFE73DF98FC1AE864677202E387C7BD6B6D87CDAA085956305814E5` | `2DC95FA41CFE73DF98FC1AE864677202E387C7BD6B6D87CDAA085956305814E5` | MIGRATED |
| `labnews1.png` | `D:\vault\forge\ccylab\labnews1.png` | index.html (Lab News row 4) | "We Are Hiring!" | `D:\vault\projects\lab-website\public\images\legacy\labnews1.png` | `4210A24FE0D2B747618D7BACADB5BDAB208D77B7A4D8179B0ADB5C4F8376F1E5` | `4210A24FE0D2B747618D7BACADB5BDAB208D77B7A4D8179B0ADB5C4F8376F1E5` | MIGRATED |
| `labnews2.png` | `D:\vault\forge\ccylab\labnews2.png` | index.html (Lab News row 5) | "A New Chapter in NTU" | `D:\vault\projects\lab-website\public\images\legacy\labnews2.png` | `A133285C76E5E215C3E068C2773D26813E943137D4793E6A7B30D39DF0CE88C9` | `A133285C76E5E215C3E068C2773D26813E943137D4793E6A7B30D39DF0CE88C9` | MIGRATED |

## Excluded

| Legacy filename | Reason |
|---|---|
| `NTU_Logo.png` | Institutional NTU logo — under D-E gate, not migrated. |
| `NTU_Logo.webp` | Institutional NTU logo — under D-E gate, not migrated. |

## Rules applied
- Each asset copied exactly once from the local legacy clone into `public/images/legacy/`.
- Original bytes preserved (SHA256 verified source == destination for all 10 assets).
- Original filenames preserved (no collision).
- No recompress / resize / recolor / rewrite / regenerate / format conversion.
- Responsive sizing/cropping happens at render time via `next/image`.
- No legacy image is relabelled as an article/publication figure.
