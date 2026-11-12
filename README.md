# نور · Noor

موقع ثابت (HTML/CSS/JS) لورشة تصنيع وتنجيد الأثاث في الكويت، يعمل على GitHub Pages بدون بناء.

## التشغيل محليًا

```bash
npx --yes serve -l 4173 .
```

ثم افتح `http://localhost:4173`، ولوحة الأدمن على `/admin/`.

## الأدمن

- بدون إعداد: وضع تجريبي، البيانات تُحفظ في متصفحك فقط. أول دخول يطلب اختيار كلمة سر.
- للحفظ العام واستعادة كلمة السر بالإيميل: اربط Supabase.

### ربط Supabase

1. أنشئ مشروعًا على supabase.com.
2. SQL Editor ← الصق محتوى `supabase/setup.sql` ← Run.
3. Authentication ← Users ← Add user: ضع إيميل الأدمن وكلمة سر، وفعّل Auto Confirm.
4. Authentication ← Sign In / Providers: **عطّل** السماح بتسجيل مستخدمين جدد (Allow new users to sign up)، لأن أي مستخدم مسجّل يستطيع التعديل.
5. Authentication ← URL Configuration: أضف رابط الأدمن (`https://<user>.github.io/<repo>/admin/`) في Redirect URLs.
6. Project Settings ← API: انسخ `Project URL` و `anon public key` إلى `config.js`.

مفتاح `anon` عام بطبيعته، الحماية في سياسات الصفوف (RLS) في `setup.sql`.

## الواتساب

ضع الرقم في لوحة الأدمن ← الإعدادات، أو في `config.js` (`WHATSAPP`) بصيغة دولية بدون `+`.

## الصور

- صور الدخول: `js/data.js` ← `hero.frames`.
- صور الغرف: `rooms[].angles`.
- صور الكتالوج: من لوحة الأدمن.
