// ── uiStrings.js ──────────────────────────────────────────────────────────
// Flat English → Hindi dictionary used by the tr() helper (see
// LanguageContext.jsx) across every page except HomePage (which uses the
// structured `translations.js` object instead).
//
// Usage in a page component:
//   const { tr } = useLanguage();
//   <h1>{tr("Book a Lawyer")}</h1>
//
// Add new keys here whenever new visible English text is added to any page.

export const uiStrings = {
  "← Back to Home Page": "← होमपेज पर वापस जाएँ",

  // BookLawyerPage.jsx
  "Book a Lawyer": "वकील बुक करें",
  "When does your case need a lawyer —": "आपके केस को वकील की ज़रूरत कब है —",
  "now, or already underway?": "अभी, या केस पहले से चल रहा है?",
  "Pick the path that matches where you are. Both connect you to a verified criminal lawyer — the only difference is where in the case they step in.":
    "अपनी स्थिति के अनुसार रास्ता चुनें। दोनों रास्ते आपको एक सत्यापित आपराधिक वकील से जोड़ते हैं — फ़र्क़ सिर्फ़ इतना है कि वे केस में कब जुड़ते हैं।",
  Flagship: "फ्लैगशिप",
  "Lawyer from Day 1 of the Case": "केस के पहले दिन से वकील",
  "File your report and get a lawyer assigned the same day — before evidence goes cold and while every detail is still fresh.":
    "अपनी रिपोर्ट फाइल करें और उसी दिन वकील पाएं — सबूत ठंडे पड़ने से पहले और जब हर विवरण अभी भी ताज़ा हो।",
  "Start this path": "यह रास्ता शुरू करें",
  "Mid-Case": "केस के बीच में",
  "Lawyer in Between the Case": "केस के बीच में वकील",
  "Already have an ongoing case — with or without a lawyer — and need someone to step in now? Get matched based on where things currently stand.":
    "क्या आपका केस पहले से चल रहा है — वकील के साथ या बिना — और अभी किसी की ज़रूरत है? मौजूदा स्थिति के आधार पर मिलान पाएं।",

  // BookLawyerDay1Page.jsx
  "Lawyer · Day 1": "वकील · दिन 1",
  "Get a lawyer assigned": "वकील नियुक्त कराएं",
  "the same day you report.": "जिस दिन आप रिपोर्ट करें, उसी दिन।",
  "Tell us the basics and a criminal defence lawyer from our Day-1 response team is matched to your case immediately.":
    "हमें बुनियादी जानकारी बताएं और हमारी डे-1 रिस्पॉन्स टीम का एक आपराधिक बचाव वकील तुरंत आपके केस से जोड़ा जाएगा।",
  Email: "ईमेल",
  "you@example.com": "you@example.com",
  "Phone Number": "फ़ोन नंबर",
  "How can we reach you?": "हम आपसे कैसे संपर्क करें?",
  Address: "पता",
  "Your current address": "आपका वर्तमान पता",
  "Location of Crime": "अपराध का स्थान",
  "Where did it happen?": "यह कहाँ हुआ?",
  "FIR Number (if already filed)": "एफआईआर नंबर (यदि पहले से दर्ज है)",
  "e.g. FIR-2026-00231": "उदा. FIR-2026-00231",
  "Case Document": "केस दस्तावेज़",
  "Briefly Describe the Case": "केस का संक्षेप में विवरण दें",
  "What happened, and when?": "क्या हुआ, और कब?",
  "Assign a Lawyer Now": "अभी वकील नियुक्त करें",
  "Confidential. Free, demo booking flow — no charges, no obligation.":
    "गोपनीय। मुफ़्त, डेमो बुकिंग फ्लो — कोई शुल्क नहीं, कोई बाध्यता नहीं।",
  "Fill the form — your assigned lawyer and booking ID will appear here right away.":
    "फ़ॉर्म भरें — आपका नियुक्त वकील और बुकिंग आईडी यहाँ तुरंत दिखाई देगी।",
  "Lawyer Assigned": "वकील नियुक्त",
  "They'll reach out within approximately": "वे लगभग इस समय में संपर्क करेंगे",
  "hour(s)": "घंटे में",
  "to begin building your defence while the case is still fresh.":
    "ताकि केस अभी ताज़ा रहते हुए आपका बचाव तैयार करना शुरू किया जा सके।",
  "Booking Details": "बुकिंग विवरण",
  "Booking ID": "बुकिंग आईडी",
  "Demo flow — not yet connected to a live lawyer network.":
    "डेमो फ्लो — अभी तक किसी लाइव वकील नेटवर्क से जुड़ा नहीं है।",

  // BookLawyerInBetweenPage.jsx
  "Lawyer · In Between the Case": "वकील · केस के बीच में",
  "Bring in a lawyer": "वकील लाएं",
  "wherever your case currently stands.": "आपका केस चाहे किसी भी स्थिति में हो।",
  "Whether you're mid-investigation, awaiting a hearing, or switching representation, tell us the current stage and we'll match someone who can step in without losing time.":
    "चाहे आप जांच के बीच में हों, सुनवाई का इंतज़ार कर रहे हों, या वकील बदल रहे हों — हमें मौजूदा चरण बताएं और हम बिना समय गंवाए किसी को आपसे जोड़ देंगे।",
  "Current Stage of the Case": "केस का मौजूदा चरण",
  "Select the current stage": "मौजूदा चरण चुनें",
  "Under Police Investigation": "पुलिस जांच के अधीन",
  "Chargesheet Filed": "चार्जशीट दाखिल",
  "Trial in Progress": "मुकदमा चल रहा है",
  "Switching from Current Lawyer": "मौजूदा वकील बदल रहे हैं",
  "What's the case about, and where does it stand?": "केस किस बारे में है, और यह किस स्थिति में है?",
  "Find a Lawyer for My Stage": "मेरे चरण के लिए वकील खोजें",
  "Fill the form — your matched lawyer and booking ID will appear here right away.":
    "फ़ॉर्म भरें — आपका मिलान किया गया वकील और बुकिंग आईडी यहाँ तुरंत दिखाई देगी।",
  "Lawyer Matched": "वकील मिलान हुआ",
  "They'll review your case stage and reach out within approximately": "वे आपके केस के चरण की समीक्षा करेंगे और लगभग इस समय में संपर्क करेंगे",
  hours: "घंटों में",
  "to discuss next steps.": "अगले कदमों पर चर्चा करने के लिए।",

  // CaseStatusPage.jsx — GOVT_LINKS
  "eCourts Services": "ई-कोर्ट्स सेवाएँ",
  "Official case status, cause lists & orders for district/high courts.":
    "ज़िला/हाई कोर्ट के लिए आधिकारिक केस स्थिति, कॉज़ लिस्ट और आदेश।",
  "National Judicial Data Grid (NJDG)": "नेशनल ज्यूडिशियल डेटा ग्रिड (NJDG)",
  "Live pendency & disposal data for courts across India.":
    "भारत भर की अदालतों के लिए लाइव लंबित व निपटान डेटा।",
  "NALSA — Free Legal Aid": "नालसा — मुफ़्त कानूनी सहायता",
  "Apply for free legal aid under the Legal Services Authorities Act.":
    "विधिक सेवा प्राधिकरण अधिनियम के तहत मुफ़्त कानूनी सहायता के लिए आवेदन करें।",
  "Digital Police Portal": "डिजिटल पुलिस पोर्टल",
  "NCRB / MHA portal for FIR status, verification & citizen services.":
    "एफआईआर स्थिति, सत्यापन और नागरिक सेवाओं के लिए NCRB / MHA पोर्टल।",
  "India Code": "इंडिया कोड",
  "Official digital repository of all Central & State Acts.":
    "सभी केंद्रीय और राज्य अधिनियमों का आधिकारिक डिजिटल भंडार।",
  "National Cyber Crime Reporting Portal": "राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल",
  "Report cybercrime directly to the Ministry of Home Affairs (I4C).":
    "गृह मंत्रालय (I4C) को सीधे साइबर अपराध की रिपोर्ट करें।",
  "Free · No charges": "मुफ़्त · कोई शुल्क नहीं",

  // CaseStatusPage.jsx — stages
  "FIR Filed": "एफआईआर दर्ज",
  Investigation: "जांच",
  Chargesheet: "चार्जशीट",
  Trial: "मुकदमा",
  Judgment: "फैसला",

  // CaseStatusPage.jsx — validation
  "Please enter your name.": "कृपया अपना नाम दर्ज करें।",
  "Please enter your email.": "कृपया अपना ईमेल दर्ज करें।",
  "Please enter a valid email.": "कृपया एक मान्य ईमेल दर्ज करें।",
  "Please enter your phone number.": "कृपया अपना फ़ोन नंबर दर्ज करें।",
  "Please enter your address.": "कृपया अपना पता दर्ज करें।",
  "Please enter the location of the crime.": "कृपया अपराध का स्थान दर्ज करें।",
  "Please enter your case / FIR number.": "कृपया अपना केस / एफआईआर नंबर दर्ज करें।",
  "Please select a case type.": "कृपया केस का प्रकार चुनें।",

  // CaseStatusPage.jsx — page copy
  "Case Information": "केस जानकारी",
  "Track your": "अपने",
  "case status.": "केस की स्थिति ट्रैक करें।",
  "Enter your details and case number to see how far your case has progressed and your next hearing date.":
    "आपका केस कितना आगे बढ़ा है और आपकी अगली सुनवाई की तारीख देखने के लिए अपनी जानकारी और केस नंबर दर्ज करें।",
  "This is a demo tracker, not a live court database.": "यह एक डेमो ट्रैकर है, लाइव कोर्ट डेटाबेस नहीं।",
  "It is not connected to eCourts or any police/judicial system, so the result shown below is illustrative only. What you enter is sent to our team over WhatsApp so we can follow up, but no real case data is fetched from any court. For your actual case status, use the official":
    "यह ई-कोर्ट्स या किसी भी पुलिस/न्यायिक सिस्टम से जुड़ा नहीं है, इसलिए नीचे दिखाया गया परिणाम केवल उदाहरण के लिए है। आपके द्वारा दर्ज की गई जानकारी हमारी टीम को व्हाट्सएप पर भेजी जाती है ताकि हम फॉलो-अप कर सकें, लेकिन किसी भी अदालत से असली केस डेटा प्राप्त नहीं किया जाता। अपनी वास्तविक केस स्थिति के लिए, आधिकारिक",
  "eCourts India — Case Status": "ई-कोर्ट्स इंडिया — केस स्थिति",
  "page.": "पेज का उपयोग करें।",
  "Track your real case on the official eCourts portal": "आधिकारिक ई-कोर्ट्स पोर्टल पर अपना असली केस ट्रैक करें",
  "Free · Govt. of India · Opens in a new tab": "मुफ़्त · भारत सरकार · नए टैब में खुलता है",
  "or try the illustrative demo below": "या नीचे उदाहरण डेमो आज़माएं",
  "Your Name": "आपका नाम",
  "Full name": "पूरा नाम",
  "Your phone number": "आपका फ़ोन नंबर",
  "Case / FIR Number": "केस / एफआईआर नंबर",
  "Case Document (optional)": "केस दस्तावेज़ (वैकल्पिक)",
  "Type of Case": "केस का प्रकार",
  "Select a case type": "केस का प्रकार चुनें",
  "Cybercrime / Online Fraud": "साइबर अपराध / ऑनलाइन धोखाधड़ी",
  "Theft / Burglary": "चोरी / सेंधमारी",
  "Assault / Physical Violence": "हमला / शारीरिक हिंसा",
  "Domestic Violence": "घरेलू हिंसा",
  "Missing Person / Child": "लापता व्यक्ति / बच्चा",
  "Harassment / Cyberbullying": "उत्पीड़न / साइबरबुलिंग",
  "Financial Fraud / Cheating": "वित्तीय धोखाधड़ी / ठगी",
  "Drug-Related Crime": "नशीली दवाओं से जुड़ा अपराध",
  Other: "अन्य",
  "City / Court (optional)": "शहर / अदालत (वैकल्पिक)",
  "e.g. Ludhiana District Court": "उदा. लुधियाना ज़िला अदालत",
  "Find this court on eCourts": "ई-कोर्ट्स पर यह अदालत खोजें",
  "Check Case Status": "केस की स्थिति जांचें",
  "Free to use. No penalty or fee involved.": "उपयोग करना मुफ़्त है। कोई जुर्माना या शुल्क नहीं।",
  "Demo Result — Not Live Court Data": "डेमो परिणाम — लाइव कोर्ट डेटा नहीं",
  "This is a": "यह एक",
  "simulated demo result": "सिम्युलेटेड डेमो परिणाम है",
  "generated only from the case number you typed. It is": "जो केवल आपके द्वारा दर्ज किए गए केस नंबर से बनाया गया है। यह",
  "not fetched from eCourts or any real court/police database": "ई-कोर्ट्स या किसी भी वास्तविक अदालत/पुलिस डेटाबेस से प्राप्त नहीं किया गया है",
  "and must not be used to plan your actual hearing date. For your real case status, visit the official":
    "और इसका उपयोग आपकी वास्तविक सुनवाई की तारीख की योजना बनाने के लिए नहीं किया जाना चाहिए। अपनी असली केस स्थिति के लिए, आधिकारिक",
  "Case Status": "केस की स्थिति",
  for: "के लिए",
  Progress: "प्रगति",
  "Current Stage": "मौजूदा चरण",
  "Next Hearing Date": "अगली सुनवाई की तारीख",
  "Case Type": "केस का प्रकार",
  "City / Court": "शहर / अदालत",
  "Not specified": "निर्दिष्ट नहीं",
  "Track on Official eCourts Portal": "आधिकारिक ई-कोर्ट्स पोर्टल पर ट्रैक करें",
  "Check Another Case": "दूसरा केस जांचें",
  "Back to Home": "होम पर वापस जाएं",
  "Official Government Resources": "आधिकारिक सरकारी संसाधन",
  "Verified links, straight from the source": "स्रोत से सीधे, सत्यापित लिंक",
  "Every link below points to an official Government of India (.gov.in / .nic.in) portal. Nothing is proxied, embedded, or tracked — each opens directly in a new tab.":
    "नीचे दिया गया हर लिंक एक आधिकारिक भारत सरकार (.gov.in / .nic.in) पोर्टल की ओर इशारा करता है। कुछ भी प्रॉक्सी, एम्बेड या ट्रैक नहीं किया जाता — प्रत्येक सीधे नए टैब में खुलता है।",

  // ForensicExpertPage.jsx
  "Forensic Services": "फॉरेंसिक सेवाएँ",
  "Evidence fades fast —": "सबूत तेज़ी से मिटते हैं —",
  "secure it before it does.": "इससे पहले कि वे मिटें, उन्हें सुरक्षित करें।",
  "Certified forensic experts document and preserve digital and physical evidence so it holds up in court, however long the case takes to conclude.":
    "प्रमाणित फॉरेंसिक विशेषज्ञ डिजिटल और भौतिक सबूतों का दस्तावेज़ीकरण और संरक्षण करते हैं ताकि केस चाहे जितना लंबा चले, वे अदालत में टिके रहें।",
  Secure: "सुरक्षित करें",
  "Evidence is collected and sealed before it degrades or gets tampered with.":
    "सबूत के खराब होने या छेड़छाड़ होने से पहले उसे एकत्र और सील किया जाता है।",
  Analyze: "विश्लेषण करें",
  "Certified examiners document chain of custody and findings.":
    "प्रमाणित परीक्षक चेन ऑफ कस्टडी और निष्कर्षों का दस्तावेज़ीकरण करते हैं।",
  "Court-Ready Report": "कोर्ट के लिए तैयार रिपोर्ट",
  "A formal report your lawyer can submit directly as evidence.":
    "एक औपचारिक रिपोर्ट जिसे आपका वकील सीधे सबूत के रूप में प्रस्तुत कर सकता है।",
  "Type of Evidence": "सबूत का प्रकार",
  "Select what needs to be examined": "चुनें कि क्या जांचा जाना है",
  "Digital (phone, laptop, accounts)": "डिजिटल (फ़ोन, लैपटॉप, अकाउंट)",
  "Physical (objects, documents, scene)": "भौतिक (वस्तुएं, दस्तावेज़, घटनास्थल)",
  "Medical / Biological": "चिकित्सा / जैविक",
  "FIR Number (if any)": "एफआईआर नंबर (यदि है)",
  "What Needs to Be Preserved?": "क्या संरक्षित किया जाना चाहिए?",
  "Briefly describe the evidence and where it currently is":
    "सबूत और वह वर्तमान में कहाँ है, इसका संक्षेप में विवरण दें",
  "Book a Forensic Expert": "फॉरेंसिक विशेषज्ञ बुक करें",
  "Fill the form — your matched forensic expert and booking ID will appear here right away.":
    "फ़ॉर्म भरें — आपका मिलान किया गया फॉरेंसिक विशेषज्ञ और बुकिंग आईडी यहाँ तुरंत दिखाई देगी।",
  "Expert Matched": "विशेषज्ञ मिलान हुआ",
  "to begin securing and documenting the evidence.": "सबूत को सुरक्षित करने और दस्तावेज़ीकरण शुरू करने के लिए।",
  "Demo flow — not yet connected to a live forensic network.":
    "डेमो फ्लो — अभी तक किसी लाइव फॉरेंसिक नेटवर्क से जुड़ा नहीं है।",

  // LegalDraftingPage.jsx
  "Legal & Corporate Drafting": "कानूनी और कॉर्पोरेट ड्राफ्टिंग",
  "Notices, contracts, policies —": "नोटिस, अनुबंध, नीतियां —",
  "drafted right, drafted fast.": "सही ढंग से, तेज़ी से तैयार।",
  "Get legal notices, agreements, compliance reports, and corporate policy documents drafted by a qualified legal professional, ready for review or filing.":
    "एक योग्य कानूनी पेशेवर से कानूनी नोटिस, अनुबंध, अनुपालन रिपोर्ट और कॉर्पोरेट नीति दस्तावेज़ तैयार करवाएं, जो समीक्षा या फाइलिंग के लिए तैयार हों।",
  Brief: "जानकारी दें",
  "Tell us the document type and what it needs to cover.": "हमें दस्तावेज़ का प्रकार और उसमें क्या शामिल होना चाहिए, बताएं।",
  "Draft & Review": "ड्राफ्ट और समीक्षा",
  "A qualified drafter prepares the document and checks it against applicable law.":
    "एक योग्य ड्राफ्टर दस्तावेज़ तैयार करता है और लागू कानून के अनुसार उसकी जांच करता है।",
  "Ready to Use": "उपयोग के लिए तैयार",
  "Delivered in a format ready for signature, filing, or internal circulation.":
    "हस्ताक्षर, फाइलिंग, या आंतरिक प्रसार के लिए तैयार प्रारूप में दिया जाता है।",
  "Type of Document": "दस्तावेज़ का प्रकार",
  "Select what needs to be drafted": "चुनें कि क्या तैयार किया जाना है",
  "Legal Notice": "कानूनी नोटिस",
  "Contract / Agreement": "अनुबंध / समझौता",
  "Compliance Report": "अनुपालन रिपोर्ट",
  "Corporate Policy Document": "कॉर्पोरेट नीति दस्तावेज़",
  "Your Name / Organization": "आपका नाम / संगठन",
  "Full name or company name": "पूरा नाम या कंपनी का नाम",
  "Your current / registered address": "आपका वर्तमान / पंजीकृत पता",
  "Location of Crime / Incident (if applicable)": "अपराध / घटना का स्थान (यदि लागू हो)",
  "FIR Number (if applicable)": "एफआईआर नंबर (यदि लागू हो)",
  "What Should the Document Cover?": "दस्तावेज़ में क्या शामिल होना चाहिए?",
  "Key terms, parties involved, purpose, deadlines, etc.": "मुख्य शर्तें, शामिल पक्ष, उद्देश्य, समय-सीमा आदि।",
  "Request a Draft": "ड्राफ्ट का अनुरोध करें",
  "Fill the form — your matched drafter and booking ID will appear here right away.":
    "फ़ॉर्म भरें — आपका मिलान किया गया ड्राफ्टर और बुकिंग आईडी यहाँ तुरंत दिखाई देगी।",
  "Drafter Matched": "ड्राफ्टर मिलान हुआ",
  "Your document will be ready within approximately": "आपका दस्तावेज़ लगभग इस समय में तैयार हो जाएगा",
  "for your review before it's finalized.": "अंतिम रूप देने से पहले आपकी समीक्षा के लिए।",
  "Demo flow — not yet connected to a live drafting network.":
    "डेमो फ्लो — अभी तक किसी लाइव ड्राफ्टिंग नेटवर्क से जुड़ा नहीं है।",

  // NyayShieldPage.jsx (legacy quick-actions page)
  "We are here to support you": "हम आपकी मदद के लिए यहां हैं",
  "Pick one — each takes you straight to the right place, no digging through menus.":
    "एक चुनें — हर विकल्प आपको सीधे सही जगह ले जाता है, मेनू में खोजने की ज़रूरत नहीं।",
  "Report a Crime": "अपराध की रिपोर्ट करें",
  "File details, get routed instantly": "विवरण दर्ज करें, तुरंत सही जगह पहुंचें",
  "From Day 1, or later in the case": "पहले दिन से, या केस में बाद में",
  "Check Case Status": "केस की स्थिति जांचें",
  "Track progress & next hearing date": "प्रगति और अगली सुनवाई की तारीख ट्रैक करें",
  "Book a Forensic Expert": "फॉरेंसिक विशेषज्ञ बुक करें",
  "Secure evidence before it's gone": "सबूत खोने से पहले सुरक्षित करें",
  "Legal / Corporate Report Drafting": "कानूनी / कॉर्पोरेट रिपोर्ट ड्राफ्टिंग",
  "Notices, contracts & compliance docs": "नोटिस, अनुबंध और अनुपालन दस्तावेज़",

  // ReportCrimePage.jsx — hero
  "Not sure where to report?": "पता नहीं कहाँ रिपोर्ट करें?",
  "Report a Crime.": "अपराध की रिपोर्ट करें।",
  "Get to the": "सही प्राधिकरण तक",
  "right authority": "पहुंचें",
  ", fast.": ", तेज़ी से।",
  "Tell us what happened, and we'll match you with the correct official government portal — whether it's cyber crime, financial fraud, or a general police complaint.":
    "हमें बताएं क्या हुआ, और हम आपको सही आधिकारिक सरकारी पोर्टल से जोड़ देंगे — चाहे वह साइबर अपराध हो, वित्तीय धोखाधड़ी हो, या सामान्य पुलिस शिकायत।",
  "Register a Crime": "अपराध दर्ज करें",
  "Crime Categories Covered": "अपराध श्रेणियाँ शामिल",
  "Official Government Links": "आधिकारिक सरकारी लिंक",
  Min: "मिनट",
  "To Find the Right Portal": "सही पोर्टल खोजने में",

  // ReportCrimePage.jsx — form
  "Tell Us What Happened": "हमें बताएं क्या हुआ",
  "These details help us point you to the correct government authority. This form does not file a police report on your behalf.":
    "ये विवरण हमें आपको सही सरकारी प्राधिकरण तक पहुंचाने में मदद करते हैं। यह फॉर्म आपकी ओर से पुलिस रिपोर्ट दर्ज नहीं करता।",
  "Full Name": "पूरा नाम",
  "Your full name": "आपका पूरा नाम",
  "e.g. +91 98765 43210": "उदा. +91 98765 43210",
  "Email (optional)": "ईमेल (वैकल्पिक)",
  "Location of Incident": "घटना का स्थान",
  "City, State": "शहर, राज्य",
  "Type of Crime": "अपराध का प्रकार",
  "Select a category": "एक श्रेणी चुनें",
  "Date of Incident": "घटना की तारीख",
  "What Happened?": "क्या हुआ?",
  "Briefly describe the incident...": "घटना का संक्षेप में विवरण दें...",
  "Submit & Find Authorities": "जमा करें और प्राधिकरण खोजें",

  // ReportCrimePage.jsx — validation
  "Please enter a valid phone number.": "कृपया एक मान्य फ़ोन नंबर दर्ज करें।",
  "Please enter the location of the incident.": "कृपया घटना का स्थान दर्ज करें।",
  "Please select a crime type.": "कृपया अपराध का प्रकार चुनें।",
  "Please select the date of the incident.": "कृपया घटना की तारीख चुनें।",
  "Please describe what happened.": "कृपया बताएं क्या हुआ।",

  // ReportCrimePage.jsx — processing
  "Processing Your Report": "आपकी रिपोर्ट प्रोसेस हो रही है",
  "Reviewing the details you provided...": "आपके द्वारा दी गई जानकारी की समीक्षा हो रही है...",
  "Matching your case to the right authority...": "आपके केस को सही प्राधिकरण से मिलाया जा रहा है...",
  "Preparing your resource list...": "आपकी संसाधन सूची तैयार की जा रही है...",

  // ReportCrimePage.jsx — results
  "Thank You": "धन्यवाद",
  "Based on what you shared, this looks like a": "आपने जो साझा किया उसके आधार पर, यह एक",
  "case. We've highlighted the right authority below — you can also browse all categories.":
    "केस लगता है। हमने नीचे सही प्राधिकरण को हाइलाइट किया है — आप सभी श्रेणियां भी देख सकते हैं।",
  "Here are the official government authorities for every major crime category. Find the one that matches your situation.":
    "यहाँ हर प्रमुख अपराध श्रेणी के लिए आधिकारिक सरकारी प्राधिकरण हैं। अपनी स्थिति से मेल खाने वाला चुनें।",
  "This is not an FIR filing system.": "यह एक एफआईआर दाखिल करने की प्रणाली नहीं है।",
  "The details you shared were sent to our team over WhatsApp so we can follow up — but they are not filed with police or any court. This tool only helps you find the correct official portal. For urgent, life-threatening emergencies, call":
    "आपने जो विवरण साझा किए, वे हमारी टीम को व्हाट्सएप पर भेज दिए गए हैं ताकि हम फॉलो-अप कर सकें — लेकिन वे पुलिस या किसी अदालत में दर्ज नहीं किए गए हैं। यह टूल केवल आपको सही आधिकारिक पोर्टल खोजने में मदद करता है। तत्काल, जानलेवा आपात स्थिति के लिए, कॉल करें",
  "(India's national emergency number) immediately, or visit your nearest police station.":
    "(भारत का राष्ट्रीय आपातकालीन नंबर) तुरंत, या अपने नज़दीकी पुलिस स्टेशन पर जाएं।",
  Recommended: "अनुशंसित",
  "official resources": "आधिकारिक संसाधन",
  "official resource": "आधिकारिक संसाधन",
  "File Another Report": "एक और रिपोर्ट दर्ज करें",

  // ReportCrimePage.jsx — CATEGORIES (title / desc)
  "Cyber Crime": "साइबर अपराध",
  "Hacking, online fraud, phishing, identity theft, social media harassment, or any internet-based crime.":
    "हैकिंग, ऑनलाइन धोखाधड़ी, फ़िशिंग, पहचान की चोरी, सोशल मीडिया उत्पीड़न, या कोई भी इंटरनेट-आधारित अपराध।",
  "Women's Safety & Harassment": "महिला सुरक्षा और उत्पीड़न",
  "Harassment, domestic violence, stalking, or any crime against women.":
    "उत्पीड़न, घरेलू हिंसा, पीछा करना, या महिलाओं के खिलाफ कोई भी अपराध।",
  "Financial & Banking Fraud": "वित्तीय और बैंकिंग धोखाधड़ी",
  "Unauthorised transactions, loan scams, UPI fraud, or suspicious banking activity.":
    "अनधिकृत लेनदेन, ऋण घोटाले, यूपीआई धोखाधड़ी, या संदिग्ध बैंकिंग गतिविधि।",
  "Consumer Fraud": "उपभोक्ता धोखाधड़ी",
  "Fake products, defective goods, unfair trade practices, or e-commerce scams.":
    "नकली उत्पाद, दोषपूर्ण सामान, अनुचित व्यापार प्रथाएं, या ई-कॉमर्स घोटाले।",
  "Corporate & Financial Crime": "कॉर्पोरेट और वित्तीय अपराध",
  "Company fraud, embezzlement, or serious financial irregularities within an organisation.":
    "कंपनी धोखाधड़ी, गबन, या किसी संगठन के भीतर गंभीर वित्तीय अनियमितताएं।",
  "Tax Evasion": "कर चोरी",
  "Undisclosed income, GST fraud, or tax-related offences.":
    "अघोषित आय, जीएसटी धोखाधड़ी, या कर-संबंधी अपराध।",
  "General FIR / Local Crime": "सामान्य एफआईआर / स्थानीय अपराध",
  "Theft, assault, property crime, or anything that needs a First Information Report (FIR) — every state runs its own police portal.":
    "चोरी, हमला, संपत्ति अपराध, या कोई भी ऐसी चीज़ जिसके लिए प्रथम सूचना रिपोर्ट (एफआईआर) की आवश्यकता है — हर राज्य अपना पुलिस पोर्टल चलाता है।",
  "Missing Person / Child Safety": "लापता व्यक्ति / बाल सुरक्षा",
  "A missing person, missing child, or child-safety concern.":
    "एक लापता व्यक्ति, लापता बच्चा, या बाल-सुरक्षा संबंधी चिंता।",
};