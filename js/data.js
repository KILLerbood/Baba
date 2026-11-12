/* البيانات الافتراضية للموقع. الصور تُملأ لاحقًا (assets/...). الفارغ يعرض بديلًا أنيقًا. */
window.NOOR_DEFAULT = {
  settings: { whatsapp: "" },

  hero: {
    // مسارات صور مشاهد الدخول (من البيت من فوق إلى الباب). تُضاف بعد توليدها.
    frames: [
      "assets/hero/01-villa-aerial.jpg",
      "assets/hero/02-gate.jpg",
      "assets/hero/03-door.jpg"
    ]
  },

  categories: [
    { id: "chairs", ar: "كراسي", en: "Chairs", items: [
      { id: "ch1", src: "", ar: "كرسي سفرة منجّد", en: "Upholstered dining chair", dar: "هيكل خشب صلب وتنجيد مريح.", den: "Solid wood frame with comfortable upholstery." },
      { id: "ch2", src: "", ar: "كرسي استرخاء", en: "Lounge chair", dar: "مقعد عميق بسفنج عالي الكثافة.", den: "Deep seat with high-density foam." },
      { id: "ch3", src: "", ar: "كرسي مكتب جلد", en: "Leather office chair", dar: "جلد طبيعي وخياطة يدوية.", den: "Genuine leather, hand-stitched." }
    ]},
    { id: "tables", ar: "طاولات", en: "Tables", items: [
      { id: "tb1", src: "", ar: "طاولة سفرة", en: "Dining table", dar: "خشب طبيعي بمقاسات حسب الطلب.", den: "Natural wood, made to your size." },
      { id: "tb2", src: "", ar: "طاولة وسط", en: "Coffee table", dar: "تشطيب يدوي وحواف ناعمة.", den: "Hand-finished with soft edges." },
      { id: "tb3", src: "", ar: "طاولة اجتماعات", en: "Meeting table", dar: "تصنيع بالمقاس للمكاتب والمجالس.", den: "Custom built for offices and majlis." }
    ]},
    { id: "sofas", ar: "كنب", en: "Sofas", items: [
      { id: "sf1", src: "", ar: "كنب مودرن", en: "Modern sofa", dar: "هيكل خشب وسفنج وتنجيد بالقماش الذي تختاره.", den: "Wood frame, foam and your choice of fabric." },
      { id: "sf2", src: "", ar: "كنب زاوية", en: "Corner sofa", dar: "يُفصَّل على مقاس الصالة.", den: "Tailored to your living room." },
      { id: "sf3", src: "", ar: "كنب جلد", en: "Leather sofa", dar: "جلد طبيعي بألوان متعددة.", den: "Genuine leather in many colours." }
    ]},
    { id: "beds", ar: "سراير", en: "Beds", items: [
      { id: "bd1", src: "", ar: "سرير بظهر منجّد", en: "Upholstered headboard bed", dar: "ظهر مبطّن بالقماش أو الجلد.", den: "Padded headboard in fabric or leather." },
      { id: "bd2", src: "", ar: "سرير خشب", en: "Wooden bed", dar: "خشب صلب بتصميم حسب الطلب.", den: "Solid wood, custom design." },
      { id: "bd3", src: "", ar: "سرير أطفال", en: "Kids bed", dar: "تصميم آمن وألوان مرحة.", den: "Safe design, playful colours." }
    ]},
    { id: "walls", ar: "تنجيد الحيطان", en: "Wall panels", items: [
      { id: "wl1", src: "", ar: "جدار منجّد", en: "Upholstered wall", dar: "ألواح مبطّنة تضيف دفئًا وعزلًا.", den: "Padded panels for warmth and insulation." },
      { id: "wl2", src: "", ar: "ظهر سرير بالحائط", en: "Wall headboard", dar: "تنجيد كامل للجدار خلف السرير.", den: "Full wall upholstery behind the bed." },
      { id: "wl3", src: "", ar: "ألواح عزل صوت", en: "Acoustic panels", dar: "للسينما والاستوديو والجيمنج.", den: "For cinema, studio and gaming rooms." }
    ]},
    { id: "cinema", ar: "كراسي السينما", en: "Cinema seats", items: [
      { id: "cn1", src: "", ar: "مقعد سينما منزلي", en: "Home cinema seat", dar: "جلد وسفنج مريح لساعات طويلة.", den: "Leather and foam for long sessions." },
      { id: "cn2", src: "", ar: "صف مقاعد", en: "Seating row", dar: "صفوف متصلة بمسند وحامل كوب.", den: "Connected rows with armrests and cup holders." },
      { id: "cn3", src: "", ar: "مقعد مزدوج", en: "Loveseat", dar: "مقعدان متلاصقان بتنجيد فاخر.", den: "Two seats in luxury upholstery." }
    ]},
    { id: "curtains", ar: "ستاير", en: "Curtains", items: [
      { id: "cr1", src: "", ar: "ستارة قماش ثقيل", en: "Heavy fabric curtain", dar: "تفصيل حسب النافذة والغرفة.", den: "Tailored to your window and room." },
      { id: "cr2", src: "", ar: "ستارة شفافة", en: "Sheer curtain", dar: "إضاءة ناعمة وخصوصية خفيفة.", den: "Soft light with light privacy." },
      { id: "cr3", src: "", ar: "ستارة تعتيم", en: "Blackout curtain", dar: "لغرف النوم والسينما.", den: "For bedrooms and cinema rooms." }
    ]},
    { id: "swings", ar: "مراجيح", en: "Swings", items: [
      { id: "sw1", src: "", ar: "مرجيحة حديقة", en: "Garden swing", dar: "هيكل متين ومقعد مريح.", den: "Sturdy frame, comfortable seat." },
      { id: "sw2", src: "", ar: "مرجيحة معلّقة", en: "Hanging swing", dar: "للشرفات والجلسات الخارجية.", den: "For balconies and outdoor seating." }
    ]}
  ],

  rooms: [
    { id: "diwaniya", ar: "الديوانية", en: "Diwaniya",
      dar: "مجلس واسع بكنب مفصّل وتنجيد حيطان فاخر.", den: "A generous majlis with tailored seating and upholstered walls.",
      tags_ar: ["كنب مفصّل", "تنجيد حيطان", "ستاير"], tags_en: ["Tailored seating", "Wall upholstery", "Curtains"],
      angles: [], hotspots: [{ x: 38, y: 62, ar: "كنب الديوانية", en: "Diwaniya sofa", dar: "هيكل خشب صلب، سفنج عالي الكثافة، وقماش مقاوم للاستخدام اليومي.", den: "Solid wood frame, high-density foam and a hard-wearing fabric." }] },
    { id: "living", ar: "غرفة المعيشة", en: "Living room",
      dar: "جلسة عائلية بكنب مريح وطاولات خشب.", den: "Family seating with comfortable sofas and wooden tables.",
      tags_ar: ["كنب", "طاولة وسط", "ستاير"], tags_en: ["Sofas", "Coffee table", "Curtains"],
      angles: [], hotspots: [{ x: 45, y: 64, ar: "الكنبة", en: "The sofa", dar: "نختار معك القماش واللون والمقاس بما يناسب الغرفة.", den: "We choose fabric, colour and size with you." }] },
    { id: "dining", ar: "غرفة السفرة", en: "Dining room",
      dar: "طاولة وكراسي من الخشب المصمت بتنجيد مريح.", den: "Solid wood table and upholstered chairs.",
      tags_ar: ["طاولة سفرة", "كراسي منجّدة"], tags_en: ["Dining table", "Upholstered chairs"],
      angles: [], hotspots: [{ x: 50, y: 58, ar: "طاولة السفرة", en: "Dining table", dar: "خشب طبيعي بتشطيب يدوي ومقاس حسب عدد الأفراد.", den: "Natural wood, hand-finished, sized for your household." }] },
    { id: "master", ar: "غرفة الماستر", en: "Master bedroom",
      dar: "سرير بظهر منجّد وتنجيد جدار كامل.", den: "Upholstered bed with a full wall panel.",
      tags_ar: ["سرير", "ظهر منجّد", "ستاير تعتيم"], tags_en: ["Bed", "Padded headboard", "Blackout curtains"],
      angles: [], hotspots: [{ x: 50, y: 40, ar: "ظهر السرير", en: "Headboard", dar: "تبطين بالقماش أو الجلد بتصميم تختاره.", den: "Padded in fabric or leather, in a design you choose." }] },
    { id: "studio", ar: "الاستوديو", en: "Studio",
      dar: "ألواح عزل صوت وجلسة عملية.", den: "Acoustic panels and a practical seating corner.",
      tags_ar: ["عزل صوت", "جلسة", "إضاءة"], tags_en: ["Sound insulation", "Seating", "Lighting"],
      angles: [], hotspots: [{ x: 30, y: 45, ar: "ألواح العزل", en: "Acoustic panels", dar: "ألواح مبطّنة تخفف الصدى وتعزل الصوت.", den: "Padded panels reduce echo and insulate sound." }] },
    { id: "cinema", ar: "غرفة السينما", en: "Cinema room",
      dar: "عزل صوت كامل ومقاعد جلد مريحة.", den: "Full sound insulation and leather recliner seating.",
      tags_ar: ["عزل صوت", "مقاعد سينما", "ستاير تعتيم"], tags_en: ["Sound insulation", "Cinema seats", "Blackout curtains"],
      angles: [], hotspots: [{ x: 50, y: 66, ar: "مقاعد السينما", en: "Cinema seats", dar: "جلد وسفنج مريح بمسند وحامل كوب.", den: "Leather and foam with armrests and cup holders." }] },
    { id: "gaming", ar: "غرفة الجيمنج", en: "Gaming room",
      dar: "قعدات وكراسي وإضاءة مظبوطة.", den: "Seating, chairs and tuned lighting.",
      tags_ar: ["كراسي", "قعدات", "إضاءة"], tags_en: ["Chairs", "Lounge seating", "Lighting"],
      angles: [], hotspots: [{ x: 55, y: 62, ar: "قعدة الجيمنج", en: "Gaming seating", dar: "تنجيد مريح لجلسات طويلة.", den: "Comfortable upholstery for long sessions." }] }
  ],

  fabrics: [
    { id: "velvet", ar: "مخمل", en: "Velvet", color: "#7a2e3b", soft: 5, tough: 3, care: 3,
      dar: "ملمس ناعم فاخر وبريق هادئ. يناسب الكنب والكراسي والستاير الثقيلة.", den: "Plush, luxurious feel with a soft sheen. Great for sofas, chairs and heavy drapes." },
    { id: "linen", ar: "كتان", en: "Linen", color: "#cdbfa5", soft: 3, tough: 4, care: 3,
      dar: "خامة طبيعية تتنفس وتعطي مظهرًا هادئًا. مناسبة للجلسات والستاير.", den: "A breathable natural fibre with a calm look. Suits seating and curtains." },
    { id: "chenille", ar: "شنيل", en: "Chenille", color: "#5b6b57", soft: 5, tough: 4, care: 3,
      dar: "ملمس مخملي ناعم ومتانة جيدة. اختيار عملي للكنب العائلي.", den: "Soft, velvety hand with good durability. A practical pick for family sofas." },
    { id: "boucle", ar: "بوكليه", en: "Bouclé", color: "#e8e0d2", soft: 4, tough: 3, care: 2,
      dar: "خامة بحلقات ناعمة تعطي ملمسًا ومظهرًا مميزًا للكراسي والزوايا.", den: "A looped texture with a distinctive look, ideal for accent chairs." },
    { id: "suede", ar: "شمواه", en: "Microsuede", color: "#6a5646", soft: 4, tough: 4, care: 4,
      dar: "ناعمة الملمس وسهلة التنظيف نسبيًا ومقاومة جيدة للاستخدام.", den: "Soft to the touch, fairly easy to clean and hard-wearing." },
    { id: "leather", ar: "جلد طبيعي", en: "Genuine leather", color: "#3a2a20", soft: 3, tough: 5, care: 4,
      dar: "متانة عالية وعمر طويل، ويزداد جمالًا مع الاستخدام. للكنب والسينما والمكاتب.", den: "Very durable and long-lived, it ages beautifully. For sofas, cinema and offices." },
    { id: "pu", ar: "جلد صناعي", en: "Faux leather", color: "#8a7a6a", soft: 3, tough: 3, care: 5,
      dar: "سهل المسح والتنظيف وبسعر أقل. مناسب للاستخدام الكثيف.", den: "Easy to wipe clean and more affordable. Good for heavy use." }
  ],

  process: [
    { ar: "المعاينة", en: "Site visit", dar: "نزور بيتك ونأخذ المقاسات ونفهم فكرتك.", den: "We visit your home, take measurements and understand your idea." },
    { ar: "التصميم", en: "Design", dar: "ننفّذ أي تصميم في بالك، ونعدّله حتى ترضى.", den: "We build any design you have in mind and refine it until you are happy." },
    { ar: "التصنيع", en: "Building", dar: "نجهّز الهيكل الخشبي في ورشتنا بدقة.", den: "We craft the wooden frame in our workshop with precision." },
    { ar: "التنجيد", en: "Upholstery", dar: "سفنج وقماش أو جلد بالألوان التي تختارها.", den: "Foam and fabric or leather in the colours you choose." },
    { ar: "التركيب", en: "Installation", dar: "نوصّل ونركّب ونتأكد أن كل شيء في مكانه.", den: "We deliver, install and make sure everything is perfect." }
  ]
};
