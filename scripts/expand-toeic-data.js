const fs = require("fs");

const sourcePath = "data/toeic-starter.json";
const data = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const toeicCoreTopics = [
  {
    id: "contracts",
    label: "Contracts",
    example: (term) => `Both companies agreed to ${term} the contract terms.`,
    words: [
      ["abide by", "tuan thu"],
      ["agreement", "thoa thuan"],
      ["assurance", "su dam bao"],
      ["cancellation", "su huy bo"],
      ["determine", "xac dinh"],
      ["engage", "tham gia, thue"],
      ["establish", "thiet lap"],
      ["obligate", "bat buoc"],
      ["party", "ben trong hop dong"],
      ["provision", "dieu khoan"],
      ["resolve", "giai quyet"],
      ["specific", "cu the"]
    ]
  },
  {
    id: "marketing-core",
    label: "Marketing Core",
    example: (term) => `The marketing department discussed the ${term} before the product launch.`,
    words: [
      ["attract", "thu hut"],
      ["compare", "so sanh"],
      ["competition", "su canh tranh"],
      ["consume", "tieu thu"],
      ["convince", "thuyet phuc"],
      ["currently", "hien tai"],
      ["fad", "trao luu nhat thoi"],
      ["inspiration", "cam hung"],
      ["market", "thi truong"],
      ["persuasion", "su thuyet phuc"],
      ["productive", "hieu qua"],
      ["satisfaction", "su hai long"]
    ]
  },
  {
    id: "warranties-core",
    label: "Warranties Core",
    example: (term) => `The customer service agent explained the ${term} policy clearly.`,
    words: [
      ["characteristic", "dac tinh"],
      ["consequence", "hau qua"],
      ["consider", "can nhac"],
      ["cover", "bao gom, bao hanh"],
      ["expiration", "su het han"],
      ["frequently", "thuong xuyen"],
      ["imply", "ham y"],
      ["promise", "loi hua"],
      ["protect", "bao ve"],
      ["reputation", "danh tieng"],
      ["require", "yeu cau"],
      ["variety", "su da dang"]
    ]
  },
  {
    id: "business-planning-core",
    label: "Business Planning Core",
    example: (term) => `The manager used the ${term} to improve the business plan.`,
    words: [
      ["address", "giai quyet, dia chi"],
      ["avoid", "tranh"],
      ["demonstrate", "chung minh"],
      ["develop", "phat trien"],
      ["evaluate", "danh gia"],
      ["gather", "thu thap"],
      ["offer", "de nghi, uu dai"],
      ["primarily", "chu yeu"],
      ["risk", "rui ro"],
      ["strategy", "chien luoc"],
      ["strong", "manh"],
      ["substitution", "su thay the"]
    ]
  }
];

const topics = [
  ...toeicCoreTopics,
  {
    id: "office",
    label: "Office",
    example: (term) => `Please review the ${term} before the team meeting.`,
    words: [
      ["appointment", "cuoc hen"], ["agenda", "chuong trinh hop"], ["assistant", "tro ly"], ["boardroom", "phong hop lon"], ["briefing", "buoi thong tin ngan"], ["cabinet", "tu dung ho so"], ["calendar", "lich"], ["candidate", "ung vien"], ["clerk", "nhan vien van phong"], ["colleague", "dong nghiep"], ["conference", "hoi nghi"], ["copy", "ban sao"], ["cubicle", "o lam viec"], ["deadline", "han chot"], ["department", "phong ban"], ["directory", "danh ba"], ["document", "tai lieu"], ["extension", "so may le"], ["file", "ho so"], ["folder", "bia dung tai lieu"], ["headquarters", "tru so chinh"], ["memo", "ban ghi nho"], ["notice", "thong bao"], ["paperwork", "thu tuc giay to"], ["proposal", "de xuat"], ["receptionist", "nhan vien le tan"], ["report", "bao cao"], ["schedule", "lich trinh"], ["supervisor", "giam sat vien"], ["workstation", "ban lam viec"]
    ]
  },
  {
    id: "meetings",
    label: "Meetings",
    example: (term) => `The manager mentioned the ${term} during the morning meeting.`,
    words: [
      ["attendance", "su tham du"], ["attendee", "nguoi tham du"], ["brainstorm", "dong gop y tuong"], ["chairperson", "chu toa"], ["comment", "nhan xet"], ["committee", "uy ban"], ["conclude", "ket luan"], ["consensus", "su dong thuan"], ["discussion", "cuoc thao luan"], ["feedback", "phan hoi"], ["handout", "tai lieu phat"], ["interrupt", "ngat loi"], ["minute", "bien ban hop"], ["moderator", "nguoi dieu phoi"], ["objective", "muc tieu"], ["participant", "nguoi tham gia"], ["presentation", "bai thuyet trinh"], ["questionnaire", "bang cau hoi"], ["recommendation", "khuyen nghi"], ["reminder", "loi nhac"], ["reschedule", "doi lich"], ["session", "phien hop"], ["speaker", "dien gia"], ["summary", "tom tat"], ["teleconference", "hoi nghi tu xa"], ["topic", "chu de"], ["update", "cap nhat"], ["venue", "dia diem to chuc"], ["vote", "bo phieu"], ["workshop", "hoi thao thuc hanh"]
    ]
  },
  {
    id: "travel",
    label: "Travel",
    example: (term) => `Please check the ${term} before you leave for the airport.`,
    words: [
      ["accommodation", "cho o"], ["aisle", "loi di"], ["arrival", "su den noi"], ["baggage", "hanh ly"], ["boarding", "len tau bay"], ["booking", "viec dat truoc"], ["carry-on", "hanh ly xach tay"], ["customs", "hai quan"], ["delay", "su cham tre"], ["departure", "su khoi hanh"], ["destination", "diem den"], ["fare", "gia ve"], ["flight", "chuyen bay"], ["gate", "cong len may bay"], ["itinerary", "lich trinh chuyen di"], ["luggage", "hanh ly"], ["passport", "ho chieu"], ["platform", "san ga"], ["reservation", "dat cho"], ["route", "tuyen duong"], ["schedule", "lich trinh"], ["seat", "cho ngoi"], ["shuttle", "xe dua don"], ["terminal", "nha ga"], ["ticket", "ve"], ["transfer", "chuyen tuyen"], ["traveler", "nguoi di du lich"], ["visa", "thi thuc"], ["waiting area", "khu vuc cho"], ["window seat", "ghe gan cua so"]
    ]
  },
  {
    id: "hotels",
    label: "Hotels",
    example: (term) => `The guest asked about the ${term} at the front desk.`,
    words: [
      ["amenity", "tien nghi"], ["bellhop", "nhan vien hanh ly"], ["checkout", "tra phong"], ["concierge", "nhan vien ho tro khach"], ["confirmation", "xac nhan"], ["double room", "phong doi"], ["front desk", "quay le tan"], ["guest", "khach luu tru"], ["housekeeping", "bo phan don phong"], ["key card", "the phong"], ["lobby", "sanh"], ["manager", "quan ly"], ["minibar", "tu do uong nho"], ["occupancy", "ti le phong co khach"], ["rate", "gia phong"], ["reception", "le tan"], ["refund", "hoan tien"], ["renovation", "su cai tao"], ["reservation", "dat phong"], ["room service", "dich vu phong"], ["single room", "phong don"], ["suite", "phong cao cap"], ["vacancy", "phong trong"], ["valet", "nhan vien do xe"], ["wake-up call", "cuoc goi bao thuc"], ["wifi", "mang khong day"], ["deposit", "tien dat coc"], ["laundry", "giat ui"], ["complimentary", "mien phi"], ["receipt", "bien lai"]
    ]
  },
  {
    id: "restaurants",
    label: "Restaurants",
    example: (term) => `The customer asked the server about the ${term}.`,
    words: [
      ["appetizer", "mon khai vi"], ["beverage", "do uong"], ["bill", "hoa don"], ["buffet", "tiec tu chon"], ["cater", "phuc vu tiec"], ["chef", "dau bep"], ["course", "mon trong bua an"], ["dessert", "mon trang mieng"], ["dish", "mon an"], ["gratuity", "tien boa"], ["ingredient", "nguyen lieu"], ["menu", "thuc don"], ["napkin", "khan an"], ["order", "goi mon"], ["portion", "khau phan"], ["reservation", "dat ban"], ["server", "nhan vien phuc vu"], ["special", "mon dac biet"], ["takeout", "do an mang di"], ["utensil", "dung cu an"], ["vegetarian", "an chay"], ["waiter", "nam phuc vu"], ["waitress", "nu phuc vu"], ["water refill", "them nuoc"], ["table", "ban an"], ["kitchen", "nha bep"], ["receipt", "bien lai"], ["allergy", "di ung"], ["fresh", "tuoi"], ["recommend", "gioi thieu"]
    ]
  },
  {
    id: "shopping",
    label: "Shopping",
    example: (term) => `The store assistant explained the ${term} to the customer.`,
    words: [
      ["aisle", "loi di trong cua hang"], ["barcode", "ma vach"], ["cashier", "thu ngan"], ["checkout", "quay thanh toan"], ["coupon", "phieu giam gia"], ["discount", "giam gia"], ["exchange", "doi hang"], ["fitting room", "phong thu do"], ["gift card", "the qua tang"], ["inventory", "hang ton kho"], ["item", "mat hang"], ["label", "nhan hang"], ["merchandise", "hang hoa"], ["price tag", "nhan gia"], ["purchase", "mua hang"], ["receipt", "bien lai"], ["refund", "hoan tien"], ["return", "tra hang"], ["sale", "dot giam gia"], ["sample", "hang mau"], ["shelf", "ke hang"], ["shopper", "nguoi mua sam"], ["stock", "hang trong kho"], ["supplier", "nha cung cap"], ["warranty", "bao hanh"], ["wholesale", "ban si"], ["retail", "ban le"], ["register", "may tinh tien"], ["outlet", "cua hang ban le"], ["customer", "khach hang"]
    ]
  },
  {
    id: "finance",
    label: "Finance",
    example: (term) => `The accounting team checked the ${term} before closing the file.`,
    words: [
      ["account", "tai khoan"], ["accounting", "ke toan"], ["balance", "so du"], ["budget", "ngan sach"], ["cash flow", "dong tien"], ["charge", "khoan phi"], ["cost", "chi phi"], ["credit", "tin dung"], ["currency", "tien te"], ["deposit", "tien gui"], ["expense", "chi phi"], ["fee", "phi"], ["fund", "quy tien"], ["income", "thu nhap"], ["interest", "lai suat"], ["invoice", "hoa don"], ["loan", "khoan vay"], ["payment", "thanh toan"], ["payroll", "bang luong"], ["profit", "loi nhuan"], ["quote", "bao gia"], ["rate", "ti le"], ["receipt", "bien lai"], ["refund", "hoan tien"], ["revenue", "doanh thu"], ["savings", "tien tiet kiem"], ["statement", "sao ke"], ["tax", "thue"], ["transaction", "giao dich"], ["withdrawal", "rut tien"]
    ]
  },
  {
    id: "sales",
    label: "Sales",
    example: (term) => `The sales team reviewed the ${term} for the new product.`,
    words: [
      ["advertisement", "quang cao"], ["brand", "thuong hieu"], ["brochure", "tap gioi thieu"], ["campaign", "chien dich"], ["client", "khach hang"], ["commission", "hoa hong"], ["competitor", "doi thu"], ["contract", "hop dong"], ["customer base", "tap khach hang"], ["deal", "thoa thuan"], ["demand", "nhu cau"], ["estimate", "uoc tinh"], ["lead", "khach hang tiem nang"], ["market", "thi truong"], ["offer", "uu dai"], ["order", "don hang"], ["product line", "dong san pham"], ["promotion", "khuyen mai"], ["prospect", "khach tiem nang"], ["purchase order", "don dat hang"], ["quota", "chi tieu"], ["representative", "dai dien"], ["retailer", "nha ban le"], ["revenue", "doanh thu"], ["sample", "mau thu"], ["salesperson", "nhan vien ban hang"], ["survey", "khao sat"], ["target", "muc tieu"], ["trend", "xu huong"], ["vendor", "nguoi ban"]
    ]
  },
  {
    id: "marketing",
    label: "Marketing",
    example: (term) => `The marketing team prepared the ${term} for next month.`,
    words: [
      ["audience", "doi tuong khan gia"], ["banner", "bieu ngu"], ["billboard", "bang quang cao"], ["campaign", "chien dich"], ["channel", "kenh"], ["content", "noi dung"], ["demographic", "nhom nhan khau"], ["engagement", "tuong tac"], ["launch", "ra mat"], ["logo", "bieu trung"], ["media", "truyen thong"], ["newsletter", "ban tin"], ["online ad", "quang cao truc tuyen"], ["placement", "vi tri dat quang cao"], ["press release", "thong cao bao chi"], ["promotion", "khuyen mai"], ["publicity", "su quang ba"], ["reach", "pham vi tiep can"], ["research", "nghien cuu"], ["response", "phan hoi"], ["segment", "phan khuc"], ["slogan", "khau hieu"], ["sponsor", "nha tai tro"], ["strategy", "chien luoc"], ["subscriber", "nguoi dang ky"], ["traffic", "luu luong truy cap"], ["visibility", "do nhan dien"], ["website", "trang web"], ["campaign budget", "ngan sach chien dich"], ["brand awareness", "nhan dien thuong hieu"]
    ]
  },
  {
    id: "hr",
    label: "Human Resources",
    example: (term) => `Human resources updated the ${term} for all employees.`,
    words: [
      ["applicant", "nguoi nop don"], ["application", "don ung tuyen"], ["benefit", "phuc loi"], ["candidate", "ung vien"], ["career", "su nghiep"], ["contract", "hop dong"], ["department", "phong ban"], ["employee", "nhan vien"], ["employer", "nguoi su dung lao dong"], ["employment", "viec lam"], ["evaluation", "danh gia"], ["hire", "tuyen dung"], ["interview", "phong van"], ["job opening", "vi tri trong"], ["manager", "quan ly"], ["orientation", "dinh huong nhan vien moi"], ["overtime", "lam them gio"], ["position", "vi tri"], ["promotion", "thang chuc"], ["recruit", "tuyen mo"], ["reference", "nguoi tham chieu"], ["resume", "so yeu ly lich"], ["salary", "luong"], ["shift", "ca lam"], ["staff", "nhan su"], ["supervisor", "giam sat vien"], ["training", "dao tao"], ["vacancy", "vi tri trong"], ["wage", "tien cong"], ["workforce", "luc luong lao dong"]
    ]
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    example: (term) => `The factory manager inspected the ${term} this morning.`,
    words: [
      ["assembly", "lap rap"], ["component", "bo phan"], ["defect", "loi san pham"], ["equipment", "thiet bi"], ["facility", "co so"], ["factory", "nha may"], ["inspection", "kiem tra"], ["machinery", "may moc"], ["maintenance", "bao tri"], ["manufacturer", "nha san xuat"], ["material", "vat lieu"], ["operator", "nguoi van hanh"], ["output", "san luong"], ["packaging", "dong goi"], ["plant", "nha may"], ["process", "quy trinh"], ["production", "san xuat"], ["quality control", "kiem soat chat luong"], ["raw material", "nguyen lieu tho"], ["safety", "an toan"], ["schedule", "lich san xuat"], ["shift", "ca lam"], ["specification", "thong so ky thuat"], ["storage", "luu tru"], ["supervisor", "giam sat vien"], ["technician", "ky thuat vien"], ["tool", "cong cu"], ["warehouse", "nha kho"], ["workshop", "xuong"], ["yield", "san luong dat"]
    ]
  },
  {
    id: "shipping",
    label: "Shipping",
    example: (term) => `The logistics team confirmed the ${term} with the customer.`,
    words: [
      ["address", "dia chi"], ["carrier", "don vi van chuyen"], ["carton", "thung carton"], ["container", "container"], ["courier", "nguoi chuyen phat"], ["delivery", "giao hang"], ["dispatch", "gui di"], ["distribution", "phan phoi"], ["freight", "hang van tai"], ["handle", "xu ly"], ["label", "nhan"], ["load", "chat hang"], ["logistics", "hau can"], ["package", "goi hang"], ["parcel", "buu kien"], ["postage", "cuoc buu dien"], ["receiver", "nguoi nhan"], ["route", "tuyen duong"], ["shipment", "lo hang"], ["shipping fee", "phi van chuyen"], ["tracking", "theo doi don"], ["transport", "van chuyen"], ["truck", "xe tai"], ["unload", "do hang"], ["warehouse", "kho"], ["weight", "trong luong"], ["destination", "diem den"], ["origin", "diem xuat phat"], ["delivery date", "ngay giao"], ["supply chain", "chuoi cung ung"]
    ]
  },
  {
    id: "technology",
    label: "Technology",
    example: (term) => `The IT department fixed the ${term} before lunch.`,
    words: [
      ["access", "quyen truy cap"], ["account", "tai khoan"], ["backup", "sao luu"], ["browser", "trinh duyet"], ["bug", "loi phan mem"], ["cable", "day cap"], ["database", "co so du lieu"], ["device", "thiet bi"], ["download", "tai xuong"], ["email", "thu dien tu"], ["file", "tep tin"], ["hardware", "phan cung"], ["install", "cai dat"], ["keyboard", "ban phim"], ["laptop", "may tinh xach tay"], ["login", "dang nhap"], ["network", "mang"], ["password", "mat khau"], ["printer", "may in"], ["program", "chuong trinh"], ["screen", "man hinh"], ["server", "may chu"], ["software", "phan mem"], ["support", "ho tro"], ["system", "he thong"], ["tablet", "may tinh bang"], ["update", "cap nhat"], ["upload", "tai len"], ["username", "ten dang nhap"], ["wireless", "khong day"]
    ]
  },
  {
    id: "health",
    label: "Health",
    example: (term) => `The clinic sent a reminder about the ${term}.`,
    words: [
      ["appointment", "cuoc hen"], ["clinic", "phong kham"], ["dentist", "nha si"], ["doctor", "bac si"], ["emergency", "cap cuu"], ["examination", "kham benh"], ["health insurance", "bao hiem y te"], ["medicine", "thuoc"], ["nurse", "y ta"], ["patient", "benh nhan"], ["pharmacy", "nha thuoc"], ["prescription", "don thuoc"], ["recovery", "su hoi phuc"], ["symptom", "trieu chung"], ["treatment", "dieu tri"], ["vaccination", "tiem chung"], ["wellness", "suc khoe tong quat"], ["checkup", "kiem tra suc khoe"], ["medical form", "mau y te"], ["blood pressure", "huyet ap"], ["allergy", "di ung"], ["injury", "chan thuong"], ["operation", "ca phau thuat"], ["specialist", "bac si chuyen khoa"], ["therapy", "lieu phap"], ["insurance card", "the bao hiem"], ["waiting room", "phong cho"], ["diagnosis", "chan doan"], ["laboratory", "phong xet nghiem"], ["result", "ket qua"]
    ]
  },
  {
    id: "real-estate",
    label: "Real Estate",
    example: (term) => `The agent discussed the ${term} with the new tenant.`,
    words: [
      ["address", "dia chi"], ["apartment", "can ho"], ["building", "toa nha"], ["contract", "hop dong"], ["deposit", "tien dat coc"], ["elevator", "thang may"], ["facility", "tien ich"], ["floor", "tang"], ["heating", "he thong suoi"], ["inspection", "kiem tra"], ["landlord", "chu nha"], ["lease", "hop dong thue"], ["location", "vi tri"], ["maintenance", "bao tri"], ["mortgage", "the chap"], ["neighborhood", "khu lan can"], ["property", "bat dong san"], ["rent", "tien thue"], ["repair", "sua chua"], ["resident", "cu dan"], ["security", "bao ve"], ["tenant", "nguoi thue"], ["utility", "tien ich dien nuoc"], ["vacant", "con trong"], ["viewing", "buoi xem nha"], ["warehouse", "nha kho"], ["parking lot", "bai do xe"], ["renovation", "cai tao"], ["office space", "mat bang van phong"], ["listing", "tin dang"]
    ]
  },
  {
    id: "events",
    label: "Events",
    example: (term) => `The organizer confirmed the ${term} for the event.`,
    words: [
      ["admission", "ve vao cua"], ["announcement", "thong bao"], ["audience", "khan gia"], ["banquet", "tiec lon"], ["ceremony", "buoi le"], ["concert", "hoa nhac"], ["conference", "hoi nghi"], ["exhibit", "trien lam"], ["guest", "khach moi"], ["invitation", "thu moi"], ["organizer", "nguoi to chuc"], ["performance", "buoi bieu dien"], ["registration", "dang ky"], ["rehearsal", "tap duot"], ["schedule", "lich trinh"], ["seminar", "hoi thao"], ["speaker", "dien gia"], ["sponsor", "nha tai tro"], ["stage", "san khau"], ["ticket", "ve"], ["venue", "dia diem"], ["volunteer", "tinh nguyen vien"], ["workshop", "hoi thao thuc hanh"], ["booth", "gian hang"], ["badge", "the ten"], ["capacity", "suc chua"], ["catering", "phuc vu an uong"], ["exhibitor", "don vi trien lam"], ["program", "chuong trinh"], ["raffle", "rut tham"]
    ]
  },
  {
    id: "customer-service",
    label: "Customer Service",
    example: (term) => `The representative handled the ${term} politely.`,
    words: [
      ["apology", "loi xin loi"], ["assistance", "su ho tro"], ["complaint", "loi phan nan"], ["customer", "khach hang"], ["exchange", "doi hang"], ["feedback", "phan hoi"], ["inquiry", "cau hoi"], ["issue", "van de"], ["policy", "chinh sach"], ["product", "san pham"], ["refund", "hoan tien"], ["replacement", "hang thay the"], ["representative", "dai dien"], ["request", "yeu cau"], ["resolution", "cach giai quyet"], ["response", "phan hoi"], ["return", "tra hang"], ["service desk", "quay dich vu"], ["support", "ho tro"], ["survey", "khao sat"], ["warranty", "bao hanh"], ["agent", "nhan vien ho tro"], ["case number", "ma ho so"], ["courtesy", "su lich su"], ["follow-up", "theo doi sau"], ["hotline", "duong day nong"], ["satisfaction", "su hai long"], ["troubleshoot", "khac phuc su co"], ["wait time", "thoi gian cho"], ["upgrade", "nang cap"]
    ]
  },
  {
    id: "communication",
    label: "Communication",
    example: (term) => `The office sent the ${term} to all staff members.`,
    words: [
      ["announcement", "thong bao"], ["attachment", "tep dinh kem"], ["bulletin", "ban tin"], ["call", "cuoc goi"], ["chat", "tro chuyen"], ["contact", "lien he"], ["email", "email"], ["extension", "so may le"], ["fax", "fax"], ["message", "tin nhan"], ["notice", "thong bao"], ["phone call", "cuoc dien thoai"], ["postcard", "buu thiep"], ["recipient", "nguoi nhan"], ["reply", "tra loi"], ["sender", "nguoi gui"], ["signature", "chu ky"], ["subject line", "dong tieu de"], ["text message", "tin nhan"], ["voicemail", "thu thoai"], ["brief", "ngan gon"], ["clarify", "lam ro"], ["confirm", "xac nhan"], ["forward", "chuyen tiep"], ["inform", "thong bao"], ["notify", "bao cho biet"], ["request", "yeu cau"], ["respond", "phan hoi"], ["state", "trinh bay"], ["summarize", "tom tat"]
    ]
  },
  {
    id: "documents",
    label: "Documents",
    example: (term) => `Please attach the ${term} to the email before sending it.`,
    words: [
      ["application", "don dang ky"], ["certificate", "chung chi"], ["contract", "hop dong"], ["copy", "ban sao"], ["draft", "ban nhap"], ["file", "tep"], ["form", "mau don"], ["manual", "sach huong dan"], ["note", "ghi chu"], ["permit", "giay phep"], ["policy", "chinh sach"], ["proposal", "de xuat"], ["receipt", "bien lai"], ["record", "ho so"], ["report", "bao cao"], ["resume", "so yeu ly lich"], ["statement", "ban sao ke"], ["survey", "khao sat"], ["template", "mau"], ["transcript", "bang diem"], ["brochure", "tai lieu gioi thieu"], ["catalog", "danh muc"], ["checklist", "danh sach kiem tra"], ["document", "tai lieu"], ["invoice", "hoa don"], ["license", "giay phep"], ["newsletter", "ban tin"], ["pamphlet", "to roi"], ["reference", "tham chieu"], ["worksheet", "phieu bai tap"]
    ]
  },
  {
    id: "environment",
    label: "Environment",
    example: (term) => `The company introduced a policy to reduce ${term}.`,
    words: [
      ["air quality", "chat luong khong khi"], ["conservation", "bao ton"], ["container", "thung chua"], ["electricity", "dien"], ["emission", "khi thai"], ["energy", "nang luong"], ["environment", "moi truong"], ["fuel", "nhien lieu"], ["garbage", "rac"], ["green policy", "chinh sach xanh"], ["recycle", "tai che"], ["reduction", "su cat giam"], ["resource", "tai nguyen"], ["solar panel", "tam pin mat troi"], ["sustainability", "tinh ben vung"], ["waste", "chat thai"], ["water usage", "luong nuoc su dung"], ["wind power", "dien gio"], ["pollution", "o nhiem"], ["efficient", "hieu qua"], ["organic", "huu co"], ["renewable", "tai tao"], ["reuse", "tai su dung"], ["paperless", "khong dung giay"], ["battery", "pin"], ["climate", "khi hau"], ["cleanup", "don dep"], ["plant", "cay trong"], ["regulation", "quy dinh"], ["transportation", "giao thong van tai"]
    ]
  },
  {
    id: "general-business",
    label: "General Business",
    example: (term) => `The director discussed the ${term} with the leadership team.`,
    words: [
      ["agreement", "thoa thuan"], ["analysis", "phan tich"], ["approval", "phe duyet"], ["branch", "chi nhanh"], ["business plan", "ke hoach kinh doanh"], ["competition", "su canh tranh"], ["corporation", "tap doan"], ["decision", "quyet dinh"], ["development", "phat trien"], ["expansion", "mo rong"], ["forecast", "du bao"], ["growth", "tang truong"], ["industry", "nganh cong nghiep"], ["investment", "dau tu"], ["management", "quan ly"], ["negotiation", "dam phan"], ["operation", "hoat dong"], ["partnership", "quan he doi tac"], ["policy", "chinh sach"], ["priority", "uu tien"], ["procedure", "quy trinh"], ["project", "du an"], ["quarter", "quy"], ["review", "danh gia"], ["risk", "rui ro"], ["service", "dich vu"], ["strategy", "chien luoc"], ["supplier", "nha cung cap"], ["target", "muc tieu"], ["update", "cap nhat"]
    ]
  }
];

const seen = new Map();
const vocabulary = [];
for (const topic of topics) {
  for (const [term, meaning] of topic.words) {
    const key = `${topic.id}:${term}`;
    if (seen.has(key)) continue;
    seen.set(key, true);
    vocabulary.push({
      id: vocabulary.length + 1,
      term,
      meaning,
      topic: topic.id,
      example: topic.example(term)
    });
  }
}

vocabulary.forEach((item, index) => {
  item.id = index + 1;
});

if (vocabulary.length < 600) {
  throw new Error(`Expected at least 600 vocabulary items, got ${vocabulary.length}`);
}

const termExamples = {
  "abide by": [
    "Both companies agreed to abide by the contract terms.",
    "Employees must abide by the safety policy in the warehouse."
  ],
  agreement: [
    "The agreement was signed after two weeks of negotiation.",
    "A copy of the agreement was sent to the legal department."
  ],
  assurance: [
    "The supplier gave assurance that the order would arrive on time.",
    "Customers need assurance that the warranty covers replacement parts."
  ],
  cancellation: [
    "The hotel charges a fee for late cancellation.",
    "The cancellation notice was sent to all registered guests."
  ],
  determine: [
    "The manager will determine whether the project needs more staff.",
    "A short survey helped determine customer satisfaction."
  ],
  engage: [
    "The company plans to engage a consultant for the expansion.",
    "The speaker used examples to engage the audience."
  ],
  establish: [
    "The firm will establish a new branch downtown.",
    "The contract establishes clear delivery responsibilities."
  ],
  obligate: [
    "The lease may obligate tenants to pay for minor repairs.",
    "The policy does not obligate employees to work overtime."
  ],
  party: [
    "Each party must keep a signed copy of the contract.",
    "The injured party requested compensation from the supplier."
  ],
  provision: [
    "One provision allows customers to cancel within seven days.",
    "The legal team reviewed every provision in the agreement."
  ],
  resolve: [
    "Customer service tried to resolve the complaint quickly.",
    "The two departments met to resolve the scheduling issue."
  ],
  specific: [
    "Please provide specific instructions for the delivery team.",
    "The advertisement targets a specific group of customers."
  ]
};

const sentenceFrames = [
  "The {topic} team used \"{word}\" in a short email to a client.",
  "A supervisor explained how \"{word}\" appears in everyday workplace English.",
  "The TOEIC practice question asked learners to choose the meaning of \"{word}\".",
  "During training, new employees wrote a sentence that included \"{word}\".",
  "The instructor asked the class to compare \"{word}\" with a related business term.",
  "A customer message included \"{word}\", so the agent checked the context carefully.",
  "The notice board displayed an example sentence with \"{word}\".",
  "The team leader asked everyone to pronounce \"{word}\" before reading the passage.",
  "The workbook used \"{word}\" in a short announcement about office procedures.",
  "A sample email showed how \"{word}\" can be used in a polite request.",
  "The reading passage included \"{word}\" in a sentence about company policy.",
  "The listening script used \"{word}\" during a conversation at the front desk.",
  "The trainer wrote \"{word}\" on the board and asked for a quick definition.",
  "The exercise asked learners to match \"{word}\" with the correct Vietnamese meaning.",
  "A short memo used \"{word}\" to describe a change in the schedule.",
  "The receptionist heard \"{word}\" during a phone call with a customer.",
  "The manager highlighted \"{word}\" because it is common in TOEIC Part 5.",
  "The worksheet placed \"{word}\" in a sentence about travel and service.",
  "The speaker repeated \"{word}\" so beginners could hear the stress clearly.",
  "A practice email used \"{word}\" in the opening paragraph."
];

const sentencePatterns = vocabulary.flatMap((item, index) => {
  const topicName = item.topic.replace(/-/g, " ");
  const defaults = [
    item.example,
    sentenceFrames[index % sentenceFrames.length].replace("{word}", item.term).replace("{topic}", topicName)
  ];
  const examples = termExamples[item.term] ?? defaults;
  const first = examples[0];
  const second = examples[1] ?? defaults[1];
  return [
    {
      id: index * 2 + 1,
      vocabularyId: item.id,
      term: item.term,
      topic: item.topic,
      sentence: first,
      meaning: `Mau cau 1 voi "${item.term}" (${item.meaning}).`
    },
    {
      id: index * 2 + 2,
      vocabularyId: item.id,
      term: item.term,
      topic: item.topic,
      sentence: second,
      meaning: `Mau cau 2 voi "${item.term}" (${item.meaning}).`
    }
  ];
});

vocabulary.forEach((item) => {
  const linked = sentencePatterns.filter((sentence) => sentence.vocabularyId === item.id);
  item.sentenceIds = linked.map((sentence) => sentence.id);
  item.examples = linked.map((sentence) => sentence.sentence);
  item.example = item.examples[0];
});

const quiz = vocabulary.slice(0, 120).map((item, index) => {
  const pool = vocabulary.filter((candidate) => candidate.topic !== item.topic);
  const wrong = [pool[index % pool.length], pool[(index + 37) % pool.length], pool[(index + 79) % pool.length]].map(
    (candidate) => candidate.term
  );
  const options = [item.term, ...wrong].sort((a, b) => a.localeCompare(b));
  return {
    id: index + 1,
    question: `Choose the best word: ${item.example.replace(item.term, "___")}`,
    options,
    answer: item.term,
    explanation: `${item.term} nghia la ${item.meaning}; chu de ${item.topic}.`
  };
});

const grammarBank = [
  {
    id: "present-simple",
    title: "Present Simple",
    use: "Dung cho thoi quen, lich trinh, su that chung.",
    form: "S + V(s/es) + O",
    signal: "usually, often, every day, on Mondays",
    toeicExample: "The office opens at 8 a.m. every weekday."
  },
  {
    id: "present-continuous",
    title: "Present Continuous",
    use: "Dung cho hanh dong dang dien ra hoac ke hoach gan.",
    form: "S + am/is/are + V-ing",
    signal: "now, at the moment, this week",
    toeicExample: "The workers are installing new lights in the lobby."
  },
  {
    id: "past-simple",
    title: "Past Simple",
    use: "Dung cho hanh dong da ket thuc trong qua khu.",
    form: "S + V2/ed + O",
    signal: "yesterday, last week, in 2025, ago",
    toeicExample: "The shipment arrived yesterday afternoon."
  },
  {
    id: "past-continuous",
    title: "Past Continuous",
    use: "Dung cho hanh dong dang dien ra tai mot thoi diem trong qua khu.",
    form: "S + was/were + V-ing",
    signal: "at 3 p.m. yesterday, while, when",
    toeicExample: "The receptionist was answering calls when the client arrived."
  },
  {
    id: "present-perfect",
    title: "Present Perfect",
    use: "Dung cho trai nghiem, ket qua hien tai, hanh dong vua hoan thanh.",
    form: "S + have/has + V3/ed",
    signal: "already, yet, since, for, recently",
    toeicExample: "The company has opened three new branches."
  },
  {
    id: "past-perfect",
    title: "Past Perfect",
    use: "Dung cho hanh dong xay ra truoc mot moc qua khu khac.",
    form: "S + had + V3/ed",
    signal: "before, after, by the time",
    toeicExample: "The meeting had started before the director arrived."
  },
  {
    id: "future-forms",
    title: "Future Forms",
    use: "Will cho quyet dinh/du doan; be going to cho ke hoach.",
    form: "S + will + V / S + am/is/are going to + V",
    signal: "tomorrow, next month, soon",
    toeicExample: "The training session will begin at 9 a.m."
  },
  {
    id: "future-continuous",
    title: "Future Continuous",
    use: "Dung cho hanh dong se dang dien ra tai mot thoi diem tuong lai.",
    form: "S + will be + V-ing",
    signal: "at this time tomorrow, by noon tomorrow",
    toeicExample: "The team will be reviewing applications at 10 a.m. tomorrow."
  },
  {
    id: "subject-verb-agreement",
    title: "Subject Verb Agreement",
    use: "Dong tu phai phu hop voi chu ngu so it hoac so nhieu.",
    form: "Singular S + V(s/es); Plural S + V",
    signal: "each, every, either, neither, along with",
    toeicExample: "Each employee receives a security badge."
  },
  {
    id: "nouns-countable",
    title: "Countable and Uncountable Nouns",
    use: "Phan biet danh tu dem duoc va khong dem duoc de dung many/much, few/little.",
    form: "many/few + plural noun; much/little + uncountable noun",
    signal: "many, much, several, a few, a little",
    toeicExample: "The office needs several chairs and a little extra space."
  },
  {
    id: "articles",
    title: "Articles",
    use: "Dung a/an cho danh tu so it lan dau; the cho doi tuong da xac dinh.",
    form: "a/an + singular noun; the + specific noun",
    signal: "a, an, the, no article",
    toeicExample: "Please send the invoice to an accountant."
  },
  {
    id: "pronouns",
    title: "Pronouns",
    use: "Chon dai tu dung vi tri: chu ngu, tan ngu, so huu, phan than.",
    form: "I/me/my/mine/myself; they/them/their/theirs/themselves",
    signal: "subject, object, possessive, reflexive",
    toeicExample: "Ms. Carter prepared the report herself."
  },
  {
    id: "adjectives-adverbs",
    title: "Adjectives and Adverbs",
    use: "Tinh tu bo nghia danh tu; trang tu bo nghia dong tu, tinh tu hoac ca cau.",
    form: "adj + noun; verb + adv; adv + adj",
    signal: "quick/quickly, careful/carefully",
    toeicExample: "The technician completed the repair quickly."
  },
  {
    id: "comparatives",
    title: "Comparatives",
    use: "So sanh hon giua hai nguoi/vat/su viec.",
    form: "adj-er/more + adj + than",
    signal: "than, much, slightly, far",
    toeicExample: "This printer is more reliable than the old one."
  },
  {
    id: "superlatives",
    title: "Superlatives",
    use: "So sanh nhat trong mot nhom.",
    form: "the + adj-est / the most + adj",
    signal: "the, in the company, of all",
    toeicExample: "This is the most popular item in the catalog."
  },
  {
    id: "modals",
    title: "Modals",
    use: "Dung de noi ve kha nang, yeu cau, loi khuyen, nghia vu.",
    form: "S + can/could/should/must/may/might + V",
    signal: "can, could, should, must, may, might",
    toeicExample: "Passengers must show a valid ticket before boarding."
  },
  {
    id: "passive-voice",
    title: "Passive Voice",
    use: "Dung khi tap trung vao vat/nguoi bi tac dong hon la nguoi thuc hien.",
    form: "S + be + V3/ed",
    signal: "is delivered, was repaired, will be announced",
    toeicExample: "The conference room was reserved for the marketing team."
  },
  {
    id: "gerunds-infinitives",
    title: "Gerunds and Infinitives",
    use: "Mot so dong tu theo sau boi V-ing, mot so theo sau boi to V.",
    form: "enjoy + V-ing; decide + to V",
    signal: "avoid, finish, plan, decide, hope",
    toeicExample: "The manager decided to postpone the interview."
  },
  {
    id: "to-infinitive-purpose",
    title: "To Infinitive of Purpose",
    use: "Dung to V de noi muc dich.",
    form: "S + V + to + V",
    signal: "to reduce costs, to improve service",
    toeicExample: "The company hired a consultant to improve productivity."
  },
  {
    id: "prepositions-time",
    title: "Prepositions of Time",
    use: "Dung gioi tu thoi gian dung voi ngay, gio, thang, nam.",
    form: "at + time; on + day/date; in + month/year",
    signal: "at 9 a.m., on Monday, in June",
    toeicExample: "The workshop begins at 9 a.m. on Friday."
  },
  {
    id: "prepositions-place",
    title: "Prepositions of Place",
    use: "Mo ta vi tri trong van phong, cua hang, nha ga, khach san.",
    form: "in, on, at, beside, between, across from",
    signal: "next to, near, behind, above, below",
    toeicExample: "The registration desk is across from the elevator."
  },
  {
    id: "conjunctions",
    title: "Coordinating Conjunctions",
    use: "Noi hai tu, cum tu hoac menh de cung cap do.",
    form: "and, but, or, so, for, yet",
    signal: "and, but, or, so",
    toeicExample: "The hotel is small, but it is close to the station."
  },
  {
    id: "subordinators",
    title: "Subordinating Conjunctions",
    use: "Tao menh de phu chi thoi gian, ly do, dieu kien, tuong phan.",
    form: "because, although, while, if, unless, when",
    signal: "because, although, while, since, unless",
    toeicExample: "Although the order was late, the customer accepted it."
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses",
    use: "Dung who/which/that/where de bo sung thong tin cho danh tu.",
    form: "noun + who/which/that/where + clause",
    signal: "who, which, that, where, whose",
    toeicExample: "The applicant who submitted the resume early was selected."
  },
  {
    id: "noun-clauses",
    title: "Noun Clauses",
    use: "Menh de danh tu lam chu ngu, tan ngu hoac bo ngu.",
    form: "that/what/whether/if + S + V",
    signal: "that, what, whether, if",
    toeicExample: "The manager explained why the schedule had changed."
  },
  {
    id: "conditionals-zero-first",
    title: "Zero and First Conditionals",
    use: "Zero cho su that chung; first cho dieu kien co the xay ra.",
    form: "If + present, present/will + V",
    signal: "if, unless, provided that",
    toeicExample: "If the shipment arrives today, we will notify the client."
  },
  {
    id: "conditionals-second-third",
    title: "Second and Third Conditionals",
    use: "Second cho gia dinh hien tai; third cho gia dinh trai qua khu.",
    form: "If + past, would + V; If + had V3, would have V3",
    signal: "if, would, had",
    toeicExample: "If the supplier had shipped earlier, the store would have received the items on time."
  },
  {
    id: "reported-speech",
    title: "Reported Speech",
    use: "Tuong thuat lai loi noi, thong bao, yeu cau.",
    form: "said/told/asked + that/if/to V",
    signal: "said, told, asked, reported",
    toeicExample: "The supervisor said that the policy would change next month."
  },
  {
    id: "questions",
    title: "Question Forms",
    use: "Tao cau hoi yes/no va wh-question trong giao tiep TOEIC.",
    form: "Aux + S + V? / Wh + aux + S + V?",
    signal: "who, what, where, when, why, how",
    toeicExample: "When will the replacement parts arrive?"
  },
  {
    id: "imperatives",
    title: "Imperatives",
    use: "Dung de huong dan, yeu cau, canh bao trong thong bao va email.",
    form: "V + object / Do not + V",
    signal: "please, do not, make sure, remember to",
    toeicExample: "Please attach the receipt to the form."
  },
  {
    id: "parallel-structure",
    title: "Parallel Structure",
    use: "Cac thanh phan trong danh sach hoac cau so sanh can cung dang ngu phap.",
    form: "V-ing, V-ing, and V-ing / noun, noun, and noun",
    signal: "and, or, both...and, either...or",
    toeicExample: "The job requires filing documents, answering calls, and greeting visitors."
  },
  {
    id: "word-forms",
    title: "Word Forms",
    use: "Chon dung danh tu, dong tu, tinh tu, trang tu theo vi tri trong cau.",
    form: "noun / verb / adjective / adverb",
    signal: "suffixes: -tion, -ment, -ive, -ly",
    toeicExample: "The manager gave a detailed explanation of the new rule."
  },
  {
    id: "participial-adjectives",
    title: "Participial Adjectives",
    use: "Phan biet V-ing va V-ed khi lam tinh tu.",
    form: "interesting/interested, confusing/confused",
    signal: "-ing describes cause; -ed describes feeling/state",
    toeicExample: "The instructions were confusing, so several employees asked questions."
  },
  {
    id: "quantifiers",
    title: "Quantifiers",
    use: "Dung tu chi luong voi danh tu dem duoc va khong dem duoc.",
    form: "some, any, much, many, a few, a little, enough",
    signal: "some, any, enough, plenty of",
    toeicExample: "There is enough space in the warehouse for the shipment."
  },
  {
    id: "causative",
    title: "Causative Forms",
    use: "Noi ve viec nho/yeu cau ai lam gi hoac sap xep dich vu.",
    form: "have/get + object + V3; have + person + V",
    signal: "have, get, make, let",
    toeicExample: "We had the copier repaired yesterday."
  },
  {
    id: "inversion",
    title: "Inversion",
    use: "Dao ngu sau cum phu dinh hoac han che, hay gap o cau trang trong.",
    form: "Never/Rarely/Only then + aux + S + V",
    signal: "never, rarely, only after, not only",
    toeicExample: "Only after the contract was signed did production begin."
  }
];

const conversations = [
  {
    id: 1,
    topic: "Contract review",
    lines: [
      "A: Thanks for joining the contract review meeting.",
      "B: No problem. I read the agreement last night.",
      "A: Good. The supplier must abide by the delivery schedule.",
      "B: I noticed a provision about late shipment fees.",
      "A: Yes, that provision protects both parties.",
      "B: Should we ask for written assurance before we sign?",
      "A: Definitely. We need specific confirmation from their legal team.",
      "B: If there is a cancellation, who pays the administrative fee?",
      "A: The contract says the party that cancels must cover it.",
      "B: Then we should resolve that point before Friday.",
      "A: I will contact the supplier and determine their position.",
      "B: Great. Once they respond, we can establish the final terms."
    ]
  },
  {
    id: 2,
    topic: "Marketing launch",
    lines: [
      "A: The marketing campaign will launch next month.",
      "B: Have we compared our product with the main competitor?",
      "A: Yes, the report shows our price is more attractive.",
      "B: That should help convince new customers.",
      "A: The current market is crowded, so the message must be clear.",
      "B: Are we using online ads or printed brochures?",
      "A: Both. The online channel should increase traffic quickly.",
      "B: What is the main inspiration for the slogan?",
      "A: We want to focus on customer satisfaction.",
      "B: Good. A productive campaign needs a simple promise.",
      "A: The team will review the banner design tomorrow.",
      "B: I will prepare a short comparison chart for the meeting."
    ]
  },
  {
    id: 3,
    topic: "Hotel check-in",
    lines: [
      "A: Good evening. I have a reservation under Tran.",
      "B: Welcome. May I see your passport and confirmation email?",
      "A: Here they are. Is the room available now?",
      "B: Yes, your double room is ready on the eighth floor.",
      "A: Does the rate include breakfast?",
      "B: Breakfast is complimentary and served in the restaurant.",
      "A: Great. Could I also schedule a wake-up call?",
      "B: Of course. What time would you like the call?",
      "A: Please call me at 6:30 because my departure is early.",
      "B: I have added it to the system.",
      "A: Is there a shuttle to the airport?",
      "B: Yes, the shuttle leaves from the lobby every hour."
    ]
  },
  {
    id: 4,
    topic: "Office equipment issue",
    lines: [
      "A: The copier stopped working during the morning shift.",
      "B: Did you contact technical support?",
      "A: Not yet. I checked the paper tray and the screen first.",
      "B: What does the error message say?",
      "A: It says a component needs maintenance.",
      "B: Then we should call the technician before noon.",
      "A: The supervisor needs copies for the training session.",
      "B: We can use the printer in the accounting department.",
      "A: Good idea. Could you reserve it for thirty minutes?",
      "B: Sure. I will notify the staff by email.",
      "A: Please mention that the copier is temporarily out of service.",
      "B: I will also ask the technician for an estimated repair time."
    ]
  },
  {
    id: 5,
    topic: "Shipping delay",
    lines: [
      "A: I am calling about shipment number 4082.",
      "B: Let me check the tracking information.",
      "A: The customer expected the package yesterday.",
      "B: It looks like the carrier reported a weather delay.",
      "A: Do we have a new delivery date?",
      "B: The parcel should arrive at the warehouse tomorrow morning.",
      "A: Please notify the customer and apologize for the inconvenience.",
      "B: Should we offer a discount on the shipping fee?",
      "A: Yes, that would be appropriate for this issue.",
      "B: I will update the case number after the call.",
      "A: Also confirm the destination address again.",
      "B: Understood. I will send a follow-up email today."
    ]
  },
  {
    id: 6,
    topic: "Job interview",
    lines: [
      "A: Thank you for coming in for the interview.",
      "B: Thank you for inviting me.",
      "A: Could you briefly describe your previous position?",
      "B: I worked as an office assistant for two years.",
      "A: What duties did you handle most frequently?",
      "B: I answered phone calls, scheduled appointments, and filed documents.",
      "A: This position also requires customer service experience.",
      "B: I often helped visitors at the reception desk.",
      "A: Are you available for training next Monday?",
      "B: Yes, I can attend the full session.",
      "A: We will evaluate all candidates by Friday.",
      "B: I look forward to hearing from you."
    ]
  },
  {
    id: 7,
    topic: "Restaurant reservation",
    lines: [
      "A: Good afternoon. I would like to make a reservation.",
      "B: Certainly. What date would you prefer?",
      "A: This Saturday at seven o'clock for six people.",
      "B: We have a table available near the window.",
      "A: That sounds nice. Do you offer vegetarian dishes?",
      "B: Yes, the menu includes several vegetarian options.",
      "A: One guest has a food allergy.",
      "B: Please inform your server when you arrive.",
      "A: Can we order a dessert in advance?",
      "B: Yes, our chef can prepare a special cake.",
      "A: Great. Please confirm the reservation by email.",
      "B: I will send the confirmation in a few minutes."
    ]
  },
  {
    id: 8,
    topic: "Customer return",
    lines: [
      "A: I would like to return this tablet.",
      "B: I am sorry to hear that. What is the issue?",
      "A: The screen stopped working after two days.",
      "B: Do you have the receipt and warranty card?",
      "A: Yes, both are in the box.",
      "B: We can offer a replacement or a refund.",
      "A: I would prefer a replacement if it is available.",
      "B: Let me check our inventory.",
      "A: Thank you. I need it for work this week.",
      "B: We have the same model in stock.",
      "A: Great. Is there any additional charge?",
      "B: No, the warranty covers the replacement."
    ]
  }
];

const passageTopics = topics.slice(0, 24);
const readingPassages = passageTopics.map((topic, index) => {
  const topicWords = vocabulary.filter((item) => item.topic === topic.id).slice(0, 10);
  const terms = topicWords.map((item) => item.term);
  const text = `On Monday morning, the ${topic.label.toLowerCase()} team held a short review to prepare for a busy week. The supervisor asked everyone to focus on ${terms[0]}, ${terms[1]}, and ${terms[2]} because these items often appear in daily messages and customer requests. During the meeting, one employee gave an example using ${terms[3]}, while another explained how ${terms[4]} could affect the schedule. The team also checked documents related to ${terms[5]} and ${terms[6]}. Before the session ended, the manager assigned a quick exercise with ${terms[7]}, ${terms[8]}, and ${terms[9]}. Everyone had to write two clear sentences and one short email. This practice helped new staff understand the vocabulary in a realistic business situation and prepared them for TOEIC reading questions.`;
  return {
    id: index + 1,
    title: `${topic.label} practice passage`,
    topic: topic.id,
    wordCount: text.trim().split(/\s+/).length,
    targetTerms: terms,
    text
  };
});

data.sources = [
  ...data.sources,
  {
    title: "TOEIC content focus",
    url: "https://www.ets.org/toeic/test-takers/listening-reading/about.html",
    note: "Expanded dataset follows common TOEIC workplace, travel, service, and business contexts."
  }
];
data.stats = {
  words: vocabulary.length,
  grammar: grammarBank.length,
  sentences: sentencePatterns.length,
  conversations: conversations.length,
  readings: readingPassages.length,
  exercises: quiz.length
};
data.vocabulary = vocabulary;
data.grammar = grammarBank;
data.sentencePatterns = sentencePatterns;
data.sentences = sentencePatterns.map((item) => item.sentence);
data.conversations = conversations;
data.readingPassages = readingPassages;
data.quiz = quiz;
data.studyPlan = [
  "Tuan 1: hoc chu de office, meetings, travel, hotels; moi ngay 30 tu va 10 cau vi du.",
  "Tuan 2: hoc restaurants, shopping, finance, sales; lam quiz sau moi chu de.",
  "Tuan 3: hoc marketing, HR, manufacturing, shipping; viet lai 5 cau voi tu moi moi ngay.",
  "Tuan 4: hoc technology, health, real estate, events; luyen doc nhanh cau hoi va dap an.",
  "Tuan 5: hoc customer service, communication, documents, environment, general business.",
  "Tuan 6: tron 120 bai tap, ghi lai tu sai va on lai theo chu de yeu."
];

fs.writeFileSync(sourcePath, `${JSON.stringify(data, null, 2)}\n`);

const apiData = {
  ...data,
  stats: [{ id: 1, ...data.stats }],
  sentences: data.sentences.map((text, index) => ({ id: index + 1, text })),
  studyPlan: data.studyPlan.map((text, index) => ({ id: index + 1, text }))
};

fs.writeFileSync("db.json", `${JSON.stringify(apiData, null, 2)}\n`);
console.log(`Expanded TOEIC data: ${vocabulary.length} words, ${sentencePatterns.length} sentence patterns, ${quiz.length} exercises.`);
