# برومبتات صور "ركّب قطعتك"

كل البرومبتات تتلصق في **Gemini → Create image** (اختر Create image من علامة + أول مرة).
الأفضل كلها في **نفس المحادثة** عشان الكنبة والزاوية يفضلوا ثابتين:
`https://gemini.google.com/u/1/app/1649642f0075a4c2` (فيها دلوقتي الهيكل البلوط وصورة السفنج).

لو هتفتح محادثة جديدة: ارفع `assets/build/frame-oak.jpg` و`assets/build/foam.jpg` أول ما تبدأ، واكتب قبل كل برومبت:
`Use the attached oak frame photo as the exact reference for the sofa, camera and lighting.`

بعد كل صورة: دوس تحميل (Download full size)، وسمّها بالاسم المكتوب جنبها، وحطها في `assets/build/`.
الموقع بيلقط الصور بالاسم تلقائيًا، وأي صورة ناقصة بيستخدم اللي قبلها.

---

## جاهزة بالفعل
- `frame-oak.jpg` هيكل بلوط
- `foam.jpg` مرحلة السفنج (لو لسه مش موجودة في الفولدر، أعد البرومبت رقم 2)

## 1) هيكل بلوط (موجود) — `frame-oak.jpg`
```text
A real unedited product photograph of a bare, unupholstered solid oak wooden three-seater sofa frame in a clean upholstery workshop: visible joinery and dowels, wooden slats, elastic webbing straps and zigzag springs across the seat base, no foam and no fabric at all. Placed on a clean light-grey workshop floor against a plain soft warm-grey backdrop, front view at eye height, centred, the whole sofa fully visible with space around it, soft even studio lighting, sharp natural wood grain. 4:3 landscape. Image only.
```

## 2) السفنج — `foam.jpg`
```text
Using exactly the same oak sofa frame, same workshop, same camera position, same framing and same lighting as the last image, now with the padding fitted but no fabric cover yet: thick white and cream foam blocks cut to shape for the seat cushions and the back and arms, cream cotton wadding wrapped over the foam, raw un-covered upholstery padding clearly visible, the oak legs and arm frame still visible. A real unedited photograph of an upholstery workshop in progress, 4:3 landscape. Image only.
```

## 3) هيكل جوز غامق — `frame-walnut.jpg`
```text
Using exactly the same sofa frame design, same workshop, same camera position, framing and lighting as the first oak frame image, but the wood is dark walnut with a rich brown grain. Still bare, no foam and no fabric, webbing straps and springs visible. Real unedited photograph, 4:3 landscape. Image only.
```

## 4) هيكل زان فاتح — `frame-beech.jpg`
```text
Using exactly the same sofa frame design, same workshop, same camera position, framing and lighting as the first oak frame image, but the wood is pale light beech with a fine even grain. Still bare, no foam and no fabric, webbing straps and springs visible. Real unedited photograph, 4:3 landscape. Image only.
```

---

## المرحلة الأخيرة: الكنبة بعد التنجيد (7 أقمشة)
نفس الكنبة ونفس الزاوية بالظبط، الأرجل وأعلى الأذرع بلوط ظاهرة.

## 5) مخمل — `finished-velvet.jpg`
```text
Using exactly the same sofa, same workshop, same camera position, framing and lighting as the last images, now fully upholstered and finished in deep navy blue velvet with a soft sheen, neat tailored seams, three seat cushions and three back cushions, the oak legs and the oak arm tops still visible. Real unedited photograph, 4:3 landscape. Image only.
```

## 6) كتان — `finished-linen.jpg`
```text
Using exactly the same sofa, same workshop, same camera position, framing and lighting as the last images, now fully upholstered and finished in natural oatmeal linen with a visible woven texture, neat tailored seams, three seat cushions and three back cushions, the oak legs and the oak arm tops still visible. Real unedited photograph, 4:3 landscape. Image only.
```

## 7) شنيل — `finished-chenille.jpg`
```text
Using exactly the same sofa, same workshop, same camera position, framing and lighting as the last images, now fully upholstered and finished in olive green chenille with a soft plush texture, neat tailored seams, three seat cushions and three back cushions, the oak legs and the oak arm tops still visible. Real unedited photograph, 4:3 landscape. Image only.
```

## 8) بوكليه — `finished-boucle.jpg`
```text
Using exactly the same sofa, same workshop, same camera position, framing and lighting as the last images, now fully upholstered and finished in ivory bouclé fabric with soft looped texture, neat tailored seams, three seat cushions and three back cushions, the oak legs and the oak arm tops still visible. Real unedited photograph, 4:3 landscape. Image only.
```

## 9) شمواه — `finished-suede.jpg`
```text
Using exactly the same sofa, same workshop, same camera position, framing and lighting as the last images, now fully upholstered and finished in chocolate brown microsuede with a soft matte nap, neat tailored seams, three seat cushions and three back cushions, the oak legs and the oak arm tops still visible. Real unedited photograph, 4:3 landscape. Image only.
```

## 10) جلد طبيعي — `finished-leather.jpg`
```text
Using exactly the same sofa, same workshop, same camera position, framing and lighting as the last images, now fully upholstered and finished in tan genuine leather with natural grain and subtle stitching, neat tailored seams, three seat cushions and three back cushions, the oak legs and the oak arm tops still visible. Real unedited photograph, 4:3 landscape. Image only.
```

## 11) جلد صناعي — `finished-pu.jpg`
```text
Using exactly the same sofa, same workshop, same camera position, framing and lighting as the last images, now fully upholstered and finished in smooth black faux leather with a clean satin finish, neat tailored seams, three seat cushions and three back cushions, the oak legs and the oak arm tops still visible. Real unedited photograph, 4:3 landscape. Image only.
```

---

## ملاحظات
- لو ظهرت رسالة Limit reached، استنى لحد ما تتجدد (بيكتب وقت التجديد)، أو استخدم حساب Gemini تاني.
- لو الكنبة اتغيّرت شكلها بين صورتين، أعد الصورة بإضافة: `Keep the sofa shape, camera and lighting identical to the first oak frame image.`
- خطوة "اللون" في الموقع بتغيّر لون الصورة تقريبيًا بفلتر. لو عايز لون حقيقي لقماش معين، اعمل له صورة بنفس البرومبت مع تغيير اللون وسمّيها `finished-<القماش>-<اللون>.jpg`.
