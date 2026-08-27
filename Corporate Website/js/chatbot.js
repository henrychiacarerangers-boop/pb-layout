const CONTENT = {
  "en": {
    "code": "EN",
    "greet": "Hi, I'm the Public Mutual Assistant. Choose a topic below, or type your question.",
    "backHome": "Main Menu",
    "changeLang": "🌐 Change language",
    "helpfulQ": "Was this helpful?",
    "yes": "Yes",
    "no": "No",
    "thanksYes": "Glad it helped! Anything else I can assist with?",
    "fallbackIntro": "Sorry, I couldn't help with that. Would you like to:",
    "leaveMsg": "Leave a message",
    "callHotline": "Call our hotline",
    "formName": "Your name",
    "formContact": "Email or phone",
    "formDesc": "Briefly describe your enquiry",
    "consent": "I agree to Public Mutual's ",
    "privacyLink": "Privacy Notice",
    "submit": "Submit",
    "submitted": "Thanks, {name}. We've received your message and our Customer Service team will get back to you within 2 business days.",
    "routedTo": "Submitted to: cs-enquiries@publicmutual.com.my",
    "hotlineTitle": "Customer Service Hotline",
    "hotlineNum": "03-2687 5000",
    "hotlineHours": "Mon–Fri, 8:30am–5:30pm (excl. public holidays)",
    "menu": [
      {
        "id": "invest",
        "label": "📈 Getting Started",
        "qs": [
          {"q": "Who can invest with Public Mutual?", "a": "Malaysians and non-residents aged 18 and above can invest, as well as corporate investors. First-time investors must register as a new investor before their first transaction.", "kw": ["who can invest", "eligible", "eligibility", "age requirement", "non-resident", "foreigner invest"]},
          {"q": "How do I become an investor?", "a": "Individuals can register online (Malaysian residents 18+ with a local bank account) or submit forms at any Public Mutual/Public Bank branch. Corporate investors submit the required documents to their nearest branch for approval.", "kw": ["become investor", "register", "sign up", "new investor", "open account", "corporate investor"]},
          {"q": "What is a unit trust?", "a": "A unit trust pools money from investors to invest in a diversified portfolio of assets, managed by a professional fund manager.", "kw": ["unit trust", "what is", "definition"]},
          {"q": "What's the minimum investment amount?", "a": "Minimum initial investment is typically RM1,000 for lump sum, and RM100/month for regular savings plans like DDA — this varies by fund.", "kw": ["minimum", "how much", "lowest amount", "minimum investment"]},
          {"q": "How do I make payment for my investment?", "a": "Pay via PMO or PMO PLUS using your registered bank's online banking, or over the counter at Public Bank branches by bank transfer or personal cheque (cash isn't accepted), payable to 'Public Mutual Berhad'.", "kw": ["payment", "how to pay", "bank in", "cheque", "pay for investment"]},
          {"q": "How long does it take to process my investment?", "a": "A completed initial or additional investment transaction is processed within 3 business days of receiving your completed forms or electronic submission.", "kw": ["processing time", "how long", "investment take"]}
        ]
      },
      {
        "id": "prices",
        "label": "💹 Fund Prices & Valuation",
        "qs": [
          {"q": "How do I check daily fund prices?", "a": "Prices are published on the Public Mutual website under Funds > Fund Prices — local funds by 8:00pm the same day, and funds with foreign investments by 12:00pm the next business day.", "kw": ["fund price", "check price", "nav", "daily price"]},
          {"q": "What is the cut-off time for my transaction?", "a": "Public Mutual uses forward pricing: transactions before 4:00pm on a business day use that day's price; after 4:00pm or on non-business days, they're processed at the next business day's price.", "kw": ["cut-off time", "cutoff", "valuation point", "forward pricing", "4pm"]}
        ]
      },
      {
        "id": "switching",
        "label": "🔁 Switching Funds",
        "qs": [
          {"q": "What is switching?", "a": "Switching redeems units from one fund and uses the proceeds to buy units in another, helping you rebalance your portfolio. Frequent switching within 90 days may incur a small fee.", "kw": ["switching", "what is switch", "switch fund"]},
          {"q": "How do I switch funds?", "a": "Switch via PMO (select 'Switch', choose your funds, then authenticate via SecureSign) or submit a Switching Form with your MyKad at a branch or Customer Service Centre.", "kw": ["how to switch", "switch process", "switch account", "change fund", "transfer fund"]},
          {"q": "What are the switching charges?", "a": "Up to 5% (4.95% via PMO) into Equity/Balanced funds, or up to 1% into Bond funds, if switching from zero-load units. Switching loaded units within 90 days may incur a small fee; Privilege Circle members enjoy fee waivers via PMO after 90 days.", "kw": ["switching charge", "switching fee", "switch cost"]},
          {"q": "Can I cancel a switching request?", "a": "No, a successfully completed switching request cannot be cancelled.", "kw": ["cancel switch", "undo switch"]}
        ]
      },
      {
        "id": "redemption",
        "label": "💵 Redemption",
        "qs": [
          {"q": "What is redemption?", "a": "Redemption is withdrawing your investment — units are cashed out at the Net Asset Value at the close of the business day your request is received.", "kw": ["redemption", "what is redeem", "redeem meaning"]},
          {"q": "How do I redeem my units?", "a": "Redeem via PMO (select 'Redeem', enter units, authenticate via SecureSign) or submit a Redemption Form with your MyKad at a branch or Customer Service Centre.", "kw": ["redeem", "sell", "cash out", "withdraw", "how to redeem"]},
          {"q": "How long does redemption take?", "a": "Standard redemptions are banked in within 7 business days; e-Series via PMO within 4 days; Privilege Circle members within 2 days.", "kw": ["how long", "redemption time", "processing time", "when will i get my money"]},
          {"q": "Are there fees for redeeming units?", "a": "No, there is no charge for redeeming units.", "kw": ["redemption fee", "redeem charge", "redeem cost"]},
          {"q": "Can I redeem partially?", "a": "Yes — you can fully or partially redeem, as long as you maintain the minimum account balance. You can also set up a Scheduled Redemption Request for automatic periodic payouts.", "kw": ["partial redemption", "redeem some", "partial withdraw"]},
          {"q": "Can I cancel a redemption request?", "a": "No, a successfully completed redemption request cannot be cancelled.", "kw": ["cancel redemption", "undo redeem"]}
        ]
      },
      {
        "id": "auto",
        "label": "🔄 Auto-Investing & Payouts",
        "qs": [
          {"q": "What is Direct Debit Authorisation (DDA)?", "a": "DDA automatically deducts a fixed amount from your bank account at fixed intervals (from as low as RM100/month) to invest regularly — a simple way to build a consistent investing habit.", "kw": ["dda", "direct debit", "auto deduct", "automatic investment"]},
          {"q": "How do I set up or stop DDA?", "a": "Enrol via PMO/PMO PLUS (select 'DDA') or submit a form at a branch. To stop, submit a DDA Termination Form at least 2 weeks before your next deduction date.", "kw": ["set up dda", "stop dda", "terminate dda", "cancel dda"]},
          {"q": "What is Regular Investment Authorisation (RIA)?", "a": "RIA automatically switches units from your Bond/Money Market funds into Equity/Balanced funds at set intervals, fully manageable via PMO.", "kw": ["ria", "regular investment authorisation"]},
          {"q": "What is Regular Investment Instruction (RII)?", "a": "RII performs a monthly switch of low-load units from Bond/Money Market funds into Equity/Balanced funds, registered by submitting a form with your MyKad at a branch.", "kw": ["rii", "regular investment instruction"]},
          {"q": "What is a Scheduled Redemption Request (SRR)?", "a": "SRR automatically redeems units at set intervals and pays out to your registered bank account, giving you a steady income stream while your remaining units keep growing. Register or de-register via PMO under Accounts > Scheduled Redemption Request.", "kw": ["srr", "scheduled redemption", "regular payout", "regular income"]}
        ]
      },
      {
        "id": "fees",
        "label": "💰 Fees & Charges",
        "qs": [
          {"q": "What sales charges apply to my investment?", "a": "Up to 5% for Equity/Mixed Asset/Balanced funds, up to 1% for Bond/Fixed Income funds, and nil for Money Market funds. EPF investments are capped at 3%.", "kw": ["sales charge", "fees", "charges", "cost of investing"]},
          {"q": "Will I pay a sales charge on every investment?", "a": "Yes, a sales charge applies to all unit purchases, including top-ups to an existing investment.", "kw": ["sales charge again", "top up fee", "additional investment fee"]},
          {"q": "Are there switching fees?", "a": "Fees vary by fund and holding period — generally free switching into Bond/Money Market funds from zero-load units, up to 5% into Equity funds. Privilege Circle members enjoy waivers via PMO.", "kw": ["switching fee", "switch cost"]},
          {"q": "Are there redemption fees?", "a": "No, redemption is free of charge.", "kw": ["redemption fee", "redeem cost"]}
        ]
      },
      {
        "id": "account",
        "label": "💻 Account & PMO Online",
        "qs": [
          {"q": "How do I check my account balance?", "a": "Log in to PMO or the PMO PLUS mobile app to view your holdings and balance anytime.", "kw": ["balance", "check account", "portfolio value"]},
          {"q": "What is PMO / PMO PLUS?", "a": "PMO is Public Mutual's online platform for viewing accounts, statements, and making transactions; PMO PLUS is the companion mobile app, on iOS and Android.", "kw": ["pmo", "pmo plus", "what is pmo", "online platform"]},
          {"q": "What are PMO's operating hours?", "a": "PMO is available 24/7, though bank transfers depend on your own bank's service hours.", "kw": ["pmo hours", "operating hours pmo", "pmo available"]},
          {"q": "I forgot my PMO password / how do I register?", "a": "Click 'Registration for Public Mutual Online Service' on the website to register, or use 'Reset Credential' on the login page if you've forgotten your password.", "kw": ["forgot password", "reset password", "login problem", "register pmo", "pmonline"]},
          {"q": "SecureSign isn't available — how do I register?", "a": "Log in to the PMO PLUS mobile app to register for SecureSign, which is needed to authenticate your transactions.", "kw": ["securesign", "secure sign", "authenticate transaction"]},
          {"q": "How do I get my account statement?", "a": "Statements are available anytime on PMO. Hard copies can be requested via PMO (Services > Request Hard Copy Statements) or by writing in if you're not a PMO subscriber — not available for e-Series funds.", "kw": ["estatement", "statement", "download statement", "hard copy statement"]},
          {"q": "How do I add a Joint Holder to my account?", "a": "One Joint Holder (immediate family member, 18+) can be added via PMO. The First Holder sets up 'Maintain Family Relationships', the Joint Holder gives consent online, then the First Holder completes the addition.", "kw": ["joint holder", "add joint holder", "second holder", "family member account"]}
        ]
      },
      {
        "id": "agents",
        "label": "🧑‍💼 Agents & Branches",
        "qs": [
          {"q": "How do I find a Public Mutual agent near me?", "a": "Use the branch/agent locator on the Public Mutual website's 'Contact Us' page, or call our hotline for a referral.", "kw": ["find agent", "nearest agent", "locate agent"]},
          {"q": "How do I become an agent?", "a": "You can apply via the 'Careers' or 'Become an Agent' section on our website — you'll need to pass the relevant regulatory exam (e.g. UTC) first.", "kw": ["become agent", "join as agent", "career"]}
        ]
      },
      {
        "id": "company",
        "label": "🏢 About Public Mutual",
        "qs": [
          {"q": "What are your branch operating hours?", "a": "Most branches operate Mon–Fri, 8:30am–5:30pm, excluding public holidays. Hours may vary by branch.", "kw": ["operating hours", "branch hours", "opening time"]},
          {"q": "Is Public Mutual regulated?", "a": "Yes, Public Mutual is regulated by the Securities Commission Malaysia and is a licensed unit trust management company.", "kw": ["regulated", "licensed", "sc malaysia"]}
        ]
      }
    ]
  },
  "bm": {
    "code": "BM",
    "greet": "Hai, saya Pembantu Public Mutual. Pilih topik di bawah, atau taip soalan anda.",
    "backHome": "Menu Utama",
    "changeLang": "🌐 Tukar bahasa",
    "helpfulQ": "Adakah ini membantu?",
    "yes": "Ya",
    "no": "Tidak",
    "thanksYes": "Baguslah! Ada lagi yang boleh saya bantu?",
    "fallbackIntro": "Maaf, saya tidak dapat membantu dengan soalan itu. Adakah anda mahu:",
    "leaveMsg": "Tinggalkan mesej",
    "callHotline": "Hubungi talian bantuan",
    "formName": "Nama anda",
    "formContact": "E-mel atau nombor telefon",
    "formDesc": "Terangkan pertanyaan anda secara ringkas",
    "consent": "Saya bersetuju dengan ",
    "privacyLink": "Notis Privasi",
    "submit": "Hantar",
    "submitted": "Terima kasih, {name}. Mesej anda telah diterima dan pasukan Khidmat Pelanggan kami akan menghubungi anda dalam 2 hari bekerja.",
    "routedTo": "Dihantar ke: cs-enquiries@publicmutual.com.my",
    "hotlineTitle": "Talian Khidmat Pelanggan",
    "hotlineNum": "03-2687 5000",
    "hotlineHours": "Isnin–Jumaat, 8:30pg–5:30ptg (kecuali cuti umum)",
    "menu": [
      {
        "id": "invest",
        "label": "📈 Mula Melabur",
        "qs": [
          {"q": "Siapa yang boleh melabur dengan Public Mutual?", "a": "Warganegara Malaysia dan bukan pemastautin berumur 18 tahun ke atas boleh melabur, begitu juga pelabur korporat. Pelabur baharu perlu mendaftar sebagai pelabur baharu sebelum transaksi pertama.", "kw": ["siapa boleh melabur", "kelayakan", "umur"]},
          {"q": "Bagaimana saya menjadi pelabur?", "a": "Individu boleh mendaftar secara dalam talian (pemastautin Malaysia 18+ dengan akaun bank tempatan) atau serah borang di cawangan Public Mutual/Public Bank. Pelabur korporat perlu serah dokumen yang diperlukan di cawangan terdekat untuk kelulusan.", "kw": ["jadi pelabur", "daftar", "buka akaun", "pelabur korporat"]},
          {"q": "Apakah itu unit amanah?", "a": "Unit amanah menghimpunkan wang daripada pelabur untuk dilaburkan dalam portfolio pelbagai aset, diuruskan oleh pengurus dana profesional.", "kw": ["unit amanah", "apa itu"]},
          {"q": "Apakah jumlah minimum pelaburan?", "a": "Pelaburan awal minimum biasanya RM1,000 sekali gus, atau RM100/bulan untuk pelan simpanan tetap seperti DDA — ini berbeza mengikut dana.", "kw": ["minimum", "berapa", "jumlah terkecil"]},
          {"q": "Bagaimana saya membuat bayaran untuk pelaburan saya?", "a": "Bayar melalui PMO atau PMO PLUS menggunakan perbankan dalam talian bank berdaftar anda, atau di kaunter cawangan Public Bank melalui pindahan bank atau cek peribadi (tunai tidak diterima), dibayar kepada 'Public Mutual Berhad'.", "kw": ["bayaran", "cara bayar", "cek", "bank in"]},
          {"q": "Berapa lama proses pelaburan saya mengambil masa?", "a": "Transaksi pelaburan awal atau tambahan yang lengkap diproses dalam 3 hari bekerja selepas borang atau penyerahan elektronik diterima.", "kw": ["masa proses", "berapa lama", "proses pelaburan"]}
        ]
      },
      {
        "id": "prices",
        "label": "💹 Harga & Penilaian Dana",
        "qs": [
          {"q": "Bagaimana saya semak harga dana harian?", "a": "Harga disiarkan di laman web Public Mutual di bawah Funds > Fund Prices — dana tempatan menjelang 8:00pm hari yang sama, dana dengan pelaburan asing menjelang 12:00pm hari bekerja berikutnya.", "kw": ["harga dana", "semak harga", "nav"]},
          {"q": "Apakah waktu potong bagi transaksi saya?", "a": "Public Mutual menggunakan penetapan harga hadapan: transaksi sebelum 4:00pm pada hari bekerja menggunakan harga hari itu; selepas 4:00pm atau hari bukan bekerja, diproses pada harga hari bekerja berikutnya.", "kw": ["waktu potong", "cut-off", "harga hadapan", "4pm"]}
        ]
      },
      {
        "id": "switching",
        "label": "🔁 Pertukaran Dana",
        "qs": [
          {"q": "Apakah itu pertukaran (switching)?", "a": "Pertukaran menebus unit daripada satu dana dan menggunakan hasil untuk membeli unit dana lain, membantu anda mengimbangi semula portfolio. Pertukaran kerap dalam 90 hari mungkin dikenakan yuran kecil.", "kw": ["pertukaran", "switching", "tukar dana"]},
          {"q": "Bagaimana saya menukar dana?", "a": "Tukar melalui PMO (pilih 'Switch', pilih dana, sahkan melalui SecureSign) atau serah Borang Pertukaran bersama MyKad di cawangan atau Pusat Khidmat Pelanggan.", "kw": ["cara tukar", "proses tukar", "tukar akaun", "pindah dana"]},
          {"q": "Apakah caj pertukaran?", "a": "Sehingga 5% (4.95% melalui PMO) ke dana Ekuiti/Berimbang, atau sehingga 1% ke dana Bon, jika bertukar daripada unit tanpa caj. Menukar unit berciri dalam 90 hari mungkin dikenakan yuran kecil; ahli Privilege Circle menikmati pengecualian yuran melalui PMO selepas 90 hari.", "kw": ["caj pertukaran", "yuran tukar"]},
          {"q": "Bolehkah saya batalkan permintaan pertukaran?", "a": "Tidak, permintaan pertukaran yang telah lengkap tidak boleh dibatalkan.", "kw": ["batal tukar"]}
        ]
      },
      {
        "id": "redemption",
        "label": "💵 Penebusan",
        "qs": [
          {"q": "Apakah itu penebusan?", "a": "Penebusan adalah pengeluaran pelaburan anda — unit ditunaikan pada Nilai Aset Bersih semasa penutupan hari bekerja permintaan diterima.", "kw": ["penebusan", "apa itu tebus"]},
          {"q": "Bagaimana saya menebus unit saya?", "a": "Tebus melalui PMO (pilih 'Redeem', masukkan unit, sahkan melalui SecureSign) atau serah Borang Penebusan bersama MyKad di cawangan atau Pusat Khidmat Pelanggan.", "kw": ["tebus", "jual", "keluarkan wang", "cara tebus"]},
          {"q": "Berapa lama masa penebusan?", "a": "Penebusan standard dikreditkan dalam 7 hari bekerja; e-Series melalui PMO dalam 4 hari; ahli Privilege Circle dalam 2 hari.", "kw": ["berapa lama", "masa tebus", "bila dapat wang"]},
          {"q": "Adakah yuran untuk menebus unit?", "a": "Tidak, tiada caj dikenakan untuk penebusan unit.", "kw": ["yuran tebus", "caj tebus"]},
          {"q": "Bolehkah saya tebus sebahagian?", "a": "Boleh — anda boleh menebus sepenuhnya atau sebahagian, selagi baki minimum akaun dikekalkan. Anda juga boleh menetapkan Scheduled Redemption Request untuk bayaran automatik berkala.", "kw": ["tebus sebahagian", "tebus separa"]},
          {"q": "Bolehkah saya batalkan permintaan penebusan?", "a": "Tidak, permintaan penebusan yang telah lengkap tidak boleh dibatalkan.", "kw": ["batal tebus"]}
        ]
      },
      {
        "id": "auto",
        "label": "🔄 Pelaburan & Bayaran Automatik",
        "qs": [
          {"q": "Apakah itu Direct Debit Authorisation (DDA)?", "a": "DDA memotong jumlah tetap daripada akaun bank anda pada selang masa tetap (serendah RM100/bulan) untuk melabur secara berkala — cara mudah membina tabiat melabur yang konsisten.", "kw": ["dda", "potongan automatik", "pelaburan automatik"]},
          {"q": "Bagaimana saya menyediakan atau menghentikan DDA?", "a": "Daftar melalui PMO/PMO PLUS (pilih 'DDA') atau serah borang di cawangan. Untuk hentikan, serah Borang Penamatan DDA sekurang-kurangnya 2 minggu sebelum tarikh potongan seterusnya.", "kw": ["sediakan dda", "hentikan dda", "tamatkan dda"]},
          {"q": "Apakah itu Regular Investment Authorisation (RIA)?", "a": "RIA menukar unit secara automatik daripada dana Bon/Pasaran Wang anda ke dana Ekuiti/Berimbang pada selang masa ditetapkan, diuruskan sepenuhnya melalui PMO.", "kw": ["ria"]},
          {"q": "Apakah itu Regular Investment Instruction (RII)?", "a": "RII melaksanakan pertukaran bulanan unit berciri rendah daripada dana Bon/Pasaran Wang ke dana Ekuiti/Berimbang, didaftar dengan menyerah borang bersama MyKad di cawangan.", "kw": ["rii"]},
          {"q": "Apakah itu Scheduled Redemption Request (SRR)?", "a": "SRR menebus unit secara automatik pada selang masa ditetapkan dan membayar ke akaun bank berdaftar anda, memberi aliran pendapatan tetap sementara baki unit terus berkembang. Daftar atau nyahdaftar melalui PMO di bawah Accounts > Scheduled Redemption Request.", "kw": ["srr", "bayaran berkala"]}
        ]
      },
      {
        "id": "fees",
        "label": "💰 Yuran & Caj",
        "qs": [
          {"q": "Apakah caj jualan dikenakan pada pelaburan saya?", "a": "Sehingga 5% untuk dana Ekuiti/Campuran/Berimbang, sehingga 1% untuk dana Bon, dan tiada caj untuk dana Pasaran Wang. Pelaburan EPF dihadkan pada 3%.", "kw": ["caj jualan", "yuran", "kos melabur"]},
          {"q": "Adakah saya akan bayar caj jualan setiap kali melabur?", "a": "Ya, caj jualan dikenakan pada semua pembelian unit, termasuk tambahan kepada pelaburan sedia ada.", "kw": ["caj jualan lagi", "yuran tambahan"]},
          {"q": "Adakah yuran pertukaran?", "a": "Yuran berbeza mengikut dana dan tempoh pegangan — umumnya percuma bertukar ke dana Bon/Pasaran Wang daripada unit tanpa caj, sehingga 5% ke dana Ekuiti. Ahli Privilege Circle menikmati pengecualian melalui PMO.", "kw": ["yuran tukar"]},
          {"q": "Adakah yuran penebusan?", "a": "Tidak, penebusan adalah percuma.", "kw": ["yuran tebus"]}
        ]
      },
      {
        "id": "account",
        "label": "💻 Akaun & PMO Online",
        "qs": [
          {"q": "Bagaimana saya semak baki akaun saya?", "a": "Log masuk ke PMO atau aplikasi mudah alih PMO PLUS untuk melihat baki akaun anda pada bila-bila masa.", "kw": ["baki", "semak akaun"]},
          {"q": "Apakah itu PMO / PMO PLUS?", "a": "PMO ialah platform dalam talian Public Mutual untuk melihat akaun, penyata, dan membuat transaksi; PMO PLUS ialah aplikasi mudah alih pelengkap, tersedia di iOS dan Android.", "kw": ["pmo", "apa itu pmo"]},
          {"q": "Apakah waktu operasi PMO?", "a": "PMO tersedia 24/7, walaupun pemindahan bank bergantung pada waktu perkhidmatan bank anda sendiri.", "kw": ["waktu pmo", "pmo tersedia"]},
          {"q": "Saya terlupa kata laluan PMO / bagaimana saya daftar?", "a": "Klik 'Registration for Public Mutual Online Service' di laman web untuk daftar, atau guna 'Reset Credential' pada halaman log masuk jika terlupa kata laluan.", "kw": ["lupa kata laluan", "reset", "pmonline", "daftar pmo"]},
          {"q": "SecureSign tidak tersedia — bagaimana saya daftar?", "a": "Log masuk ke aplikasi PMO PLUS untuk mendaftar SecureSign, yang diperlukan untuk mengesahkan transaksi anda.", "kw": ["securesign", "sah transaksi"]},
          {"q": "Bagaimana saya dapatkan penyata akaun saya?", "a": "Penyata tersedia bila-bila masa di PMO. Salinan bercetak boleh dipohon melalui PMO (Services > Request Hard Copy Statements) atau menulis surat jika bukan pelanggan PMO — tidak tersedia untuk dana e-Series.", "kw": ["penyata", "salinan bercetak"]},
          {"q": "Bagaimana saya tambah Pemegang Bersama ke akaun saya?", "a": "Satu Pemegang Bersama (ahli keluarga terdekat, 18+) boleh ditambah melalui PMO. Pemegang Pertama menyediakan 'Maintain Family Relationships', Pemegang Bersama memberi kebenaran dalam talian, kemudian Pemegang Pertama melengkapkan penambahan.", "kw": ["pemegang bersama", "tambah pemegang", "joint holder"]}]
      },
      {
        "id": "agents",
        "label": "🧑‍💼 Ejen & Cawangan",
        "qs": [
          {"q": "Bagaimana saya cari ejen Public Mutual berdekatan?", "a": "Guna carian cawangan/ejen di laman 'Hubungi Kami' laman web kami, atau hubungi talian bantuan kami.", "kw": ["cari ejen", "ejen berdekatan"]},
          {"q": "Bagaimana saya menjadi ejen?", "a": "Anda boleh memohon melalui bahagian 'Kerjaya' atau 'Menjadi Ejen' di laman web kami — anda perlu lulus peperiksaan pengawalseliaan berkaitan (contohnya UTC) dahulu.", "kw": ["jadi ejen", "sertai sebagai ejen", "kerjaya"]}
        ]
      },
      {
        "id": "company",
        "label": "🏢 Tentang Public Mutual",
        "qs": [
          {"q": "Apakah waktu operasi cawangan?", "a": "Kebanyakan cawangan beroperasi Isnin–Jumaat, 8:30pg–5:30ptg, kecuali cuti umum.", "kw": ["waktu operasi", "waktu cawangan"]},
          {"q": "Adakah Public Mutual dikawal selia?", "a": "Ya, Public Mutual dikawal selia oleh Suruhanjaya Sekuriti Malaysia dan merupakan syarikat pengurusan unit amanah berlesen.", "kw": ["dikawal selia", "berlesen"]}
        ]
      }
    ]
  },
  "zh": {
    "code": "CN",
    "greet": "您好，我是大众信托的客服助手。请选择以下主题，或直接输入您的问题。",
    "backHome": "主菜单",
    "changeLang": "🌐 更改语言",
    "helpfulQ": "这个回答有帮助吗？",
    "yes": "有帮助",
    "no": "没有",
    "thanksYes": "很高兴能帮到您！还有其他问题吗？",
    "fallbackIntro": "抱歉，我无法解答这个问题。您想要：",
    "leaveMsg": "留言咨询",
    "callHotline": "拨打客服热线",
    "formName": "您的姓名",
    "formContact": "电邮或电话号码",
    "formDesc": "简要描述您的问题",
    "consent": "我同意大众信托的",
    "privacyLink": "隐私声明",
    "submit": "提交",
    "submitted": "谢谢您，{name}。我们已收到您的留言，客服团队将在2个工作日内回复您。",
    "routedTo": "已提交至：cs-enquiries@publicmutual.com.my",
    "hotlineTitle": "客服热线",
    "hotlineNum": "03-2687 5000",
    "hotlineHours": "周一至周五，上午8:30至下午5:30（公共假期除外）",
    "menu": [
      {
        "id": "invest",
        "label": "📈 开始投资",
        "qs": [
          {"q": "谁可以在大众信托投资？", "a": "年满18岁的马来西亚公民及非居民均可投资，公司投资者亦可。首次投资者须先注册为新投资者才可进行首次交易。", "kw": ["谁可以投资", "资格", "年龄"]},
          {"q": "如何成为投资者？", "a": "个人可在线注册（年满18岁、拥有本地银行账户的马来西亚居民）或在大众信托/大众银行分行提交表格。公司投资者须将所需文件提交至最近的分行以获批准。", "kw": ["成为投资者", "注册", "开户", "公司投资者"]},
          {"q": "什么是单位信托基金？", "a": "单位信托基金汇集投资者的资金，由专业基金经理管理，投资于多元化的资产组合。", "kw": ["单位信托", "什么是"]},
          {"q": "最低投资金额是多少？", "a": "一次性投资通常最低为RM1,000，定期储蓄计划（如DDA）最低为每月RM100，具体因基金而异。", "kw": ["最低", "多少钱"]},
          {"q": "如何为我的投资付款？", "a": "可通过PMO或PMO PLUS使用您注册银行的网上银行付款，或在大众银行柜台以银行转账或个人支票（不接受现金）付款，付款对象为'Public Mutual Berhad'。", "kw": ["付款", "如何付款", "支票", "银行转账"]},
          {"q": "我的投资处理需要多长时间？", "a": "完成的初次或额外投资交易，将在收到完整表格或电子提交后3个工作日内处理。", "kw": ["处理时间", "需要多久", "投资处理"]}
        ]
      },
      {
        "id": "prices",
        "label": "💹 基金价格与估值",
        "qs": [
          {"q": "如何查询每日基金价格？", "a": "价格公布于大众信托网站的Funds > Fund Prices栏目——本地基金于当天晚上8点前公布，涉及海外投资的基金于下一个工作日中午12点前公布。", "kw": ["基金价格", "查价", "净值"]},
          {"q": "我的交易截止时间是什么时候？", "a": "大众信托采用远期定价：工作日下午4点前的交易按当天价格处理；4点后或非工作日的交易，按下一个工作日的价格处理。", "kw": ["截止时间", "远期定价", "4点"]}
        ]
      },
      {
        "id": "switching",
        "label": "🔁 基金转换",
        "qs": [
          {"q": "什么是基金转换？", "a": "转换是赎回一个基金的单位，并用所得款项购买另一个基金的单位，帮助您重新平衡投资组合。90天内频繁转换可能会产生小额费用。", "kw": ["基金转换", "转换是什么"]},
          {"q": "如何转换基金？", "a": "可通过PMO转换（选择'Switch'，选择基金，通过SecureSign验证），或在分行/客户服务中心提交转换表格及身份证。", "kw": ["如何转换", "转换流程", "转基金"]},
          {"q": "转换费用是多少？", "a": "从无费单位转入股票/平衡基金最高5%（通过PMO为4.95%），转入债券基金最高1%。90天内转换有费单位可能产生小额费用；Privilege Circle会员通过PMO在90天后可获费用豁免。", "kw": ["转换费", "转换费用"]},
          {"q": "我可以取消转换申请吗？", "a": "不可以，已成功完成的转换申请无法取消。", "kw": ["取消转换"]}
        ]
      },
      {
        "id": "redemption",
        "label": "💵 赎回",
        "qs": [
          {"q": "什么是赎回？", "a": "赎回是提取您的投资——单位将按申请当日收市时的净资产价值兑现。", "kw": ["赎回是什么"]},
          {"q": "如何赎回我的单位？", "a": "可通过PMO赎回（选择'Redeem'，输入单位数，通过SecureSign验证），或在分行/客户服务中心提交赎回表格及身份证。", "kw": ["赎回", "卖出", "提款", "如何赎回"]},
          {"q": "赎回需要多长时间？", "a": "标准赎回在7个工作日内入账；通过PMO的e-Series基金为4天；Privilege Circle会员为2天。", "kw": ["多长时间", "赎回时间", "什么时候拿到钱"]},
          {"q": "赎回单位有费用吗？", "a": "没有，赎回单位不收取任何费用。", "kw": ["赎回费用", "赎回费"]},
          {"q": "我可以部分赎回吗？", "a": "可以——只要保留账户所需的最低余额，您可以全部或部分赎回。您也可以设置定期赎回申请（SRR）以获得自动定期派款。", "kw": ["部分赎回"]},
          {"q": "我可以取消赎回申请吗？", "a": "不可以，已成功完成的赎回申请无法取消。", "kw": ["取消赎回"]}
        ]
      },
      {
        "id": "auto",
        "label": "🔄 自动投资与派款计划",
        "qs": [
          {"q": "什么是直接扣款授权（DDA）？", "a": "DDA会按固定间隔从您的银行账户自动扣除固定金额（最低每月RM100）进行定期投资，是养成稳定投资习惯的简单方式。", "kw": ["dda", "自动扣款", "自动投资"]},
          {"q": "如何设置或停止DDA？", "a": "可通过PMO/PMO PLUS（选择'DDA'）注册，或在分行提交表格。若要停止，须在下次扣款日期前至少2周提交DDA终止表格。", "kw": ["设置dda", "停止dda", "终止dda"]},
          {"q": "什么是定期投资授权（RIA）？", "a": "RIA会按设定的间隔，自动将您债券/货币市场基金的单位转换为股票/平衡基金，完全可通过PMO管理。", "kw": ["ria"]},
          {"q": "什么是定期投资指示（RII）？", "a": "RII每月将低费单位从债券/货币市场基金转换为股票/平衡基金，须在分行提交表格及身份证进行注册。", "kw": ["rii"]},
          {"q": "什么是定期赎回申请（SRR）？", "a": "SRR会按设定的间隔自动赎回单位，并支付到您注册的银行账户，让您获得稳定的收入来源，同时剩余单位继续增长。可通过PMO在Accounts > Scheduled Redemption Request中注册或取消注册。", "kw": ["srr", "定期派款"]}
        ]
      },
      {
        "id": "fees",
        "label": "💰 费用与收费",
        "qs": [
          {"q": "我的投资需要支付什么销售费用？", "a": "股票/混合资产/平衡基金最高5%，债券/固定收益基金最高1%，货币市场基金不收费。公积金投资上限为3%。", "kw": ["销售费", "费用", "投资成本"]},
          {"q": "每次投资都要支付销售费用吗？", "a": "是的，所有单位购买（包括对现有投资的追加投资）均需支付销售费用。", "kw": ["再次收费", "追加投资费用"]},
          {"q": "转换基金有费用吗？", "a": "费用因基金及持有期而异——从无费单位转入债券/货币市场基金一般免费，转入股票基金最高5%。Privilege Circle会员可通过PMO获得豁免。", "kw": ["转换费用"]},
          {"q": "赎回有费用吗？", "a": "没有，赎回是免费的。", "kw": ["赎回费用"]}
        ]
      },
      {
        "id": "account",
        "label": "💻 账户与PMO网上服务",
        "qs": [
          {"q": "如何查询账户余额？", "a": "登录PMO或PMO PLUS手机应用程序，随时查看您的持仓和余额。", "kw": ["余额", "查账户"]},
          {"q": "什么是PMO / PMO PLUS？", "a": "PMO是大众信托的网上平台，用于查看账户、对账单及进行交易；PMO PLUS是其配套手机应用程序，支持iOS和Android。", "kw": ["pmo", "什么是pmo"]},
          {"q": "PMO的运作时间是？", "a": "PMO全天24小时开放，但银行转账服务须视您本身银行的服务时间而定。", "kw": ["pmo时间", "pmo运作"]},
          {"q": "我忘记了PMO密码 / 如何注册？", "a": "在网站点击'Registration for Public Mutual Online Service'进行注册，若忘记密码，可在登录页面使用'Reset Credential'重设。", "kw": ["忘记密码", "重设密码", "注册pmo"]},
          {"q": "SecureSign无法使用，如何注册？", "a": "登录PMO PLUS手机应用程序即可注册SecureSign，这是验证交易所需的功能。", "kw": ["securesign", "验证交易"]},
          {"q": "如何获取我的账户对账单？", "a": "对账单可随时在PMO查看。若需要纸本对账单，可通过PMO（Services > Request Hard Copy Statements）申请，非PMO用户可写信申请——e-Series基金不提供纸本对账单。", "kw": ["对账单", "纸本对账单"]},
          {"q": "如何为我的账户添加联名持有人？", "a": "可通过PMO添加一位联名持有人（近亲家属，18岁以上）。主要持有人先设置'Maintain Family Relationships'，联名持有人在线给予同意，然后主要持有人完成添加。", "kw": ["联名持有人", "添加持有人"]}
        ]
      },
      {
        "id": "agents",
        "label": "🧑‍💼 代理与分行",
        "qs": [
          {"q": "如何寻找附近的大众信托代理？", "a": "请使用官网'联系我们'页面的分行/代理查询工具，或致电客服热线咨询。", "kw": ["找代理", "附近代理"]},
          {"q": "如何成为代理？", "a": "您可以通过官网'招聘'或'成为代理'专区申请——您需要先通过相关监管考试（例如UTC）先。", "kw": ["成为代理", "加入代理", "职业"]}
        ]
      },
      {
        "id": "company",
        "label": "🏢 关于大众信托",
        "qs": [
          {"q": "分行的营业时间是？", "a": "大部分分行营业时间为周一至周五上午8:30至下午5:30，公共假期除外。", "kw": ["营业时间"]},
          {"q": "大众信托受监管吗？", "a": "是的，大众信托受马来西亚证券监督委员会监管，是一家持牌的单位信托管理公司。", "kw": ["监管", "持牌"]}
        ]
      }
    ]
  }
};

let state = { lang: 'en', path: [], isOpen: false };
const body = document.getElementById('chatBody');
const breadcrumb = document.getElementById('breadcrumb');
const langSwitch = document.getElementById('langSwitch');
const chatWidget = document.getElementById('chatWidget');
const fabLauncher = document.getElementById('fabLauncher');
const fabIcon = document.getElementById('fabIcon');
const chatTeaser = document.getElementById('chatTeaser');

function t(){ return CONTENT[state.lang]; }

function toggleChat(){
  state.isOpen = !state.isOpen;
  if(state.isOpen){
    chatWidget.classList.remove('hidden');
    fabLauncher.classList.add('is-open');
    fabLauncher.innerHTML = '<span style="font-size: 14px; font-weight: bold; margin-right: 6px;">✕</span><span>Close</span>';
    if(chatTeaser) chatTeaser.style.display = 'none';
  } else {
    chatWidget.classList.add('hidden');
    fabLauncher.classList.remove('is-open');
    fabLauncher.innerHTML = '<i class="iconoir-chat-bubble-empty me-2" style="font-size: 1.15rem;"></i><span>Let\'s Chat</span>';
  }
}

function openChat(){
  state.isOpen = true;
  chatWidget.classList.remove('hidden');
  fabLauncher.classList.add('is-open');
  fabLauncher.innerHTML = '<span style="font-size: 14px; font-weight: bold; margin-right: 6px;">✕</span><span>Close</span>';
  if(chatTeaser) chatTeaser.style.display = 'none';
}

function dismissTeaser(e){
  e.stopPropagation();
  if(chatTeaser) chatTeaser.style.display = 'none';
}


function renderLangSwitch(){
  langSwitch.innerHTML = '';
  ['en','bm','zh'].forEach(l => {
    const b = document.createElement('button');
    b.className = 'lang-btn' + (state.lang === l ? ' active' : '');
    b.textContent = CONTENT[l].code;
    b.onclick = () => { state.lang = l; state.path = []; resetChat(); };
    langSwitch.appendChild(b);
  });
}

function renderBreadcrumb(){
  breadcrumb.innerHTML = '';
  const home = document.createElement('span');
  home.className = 'crumb';
  home.textContent = t().backHome;
  home.onclick = () => { state.path = []; resetChat(); };
  breadcrumb.appendChild(home);
  state.path.forEach(p => {
    const sep = document.createElement('span'); sep.className = 'sep'; sep.textContent = '›';
    breadcrumb.appendChild(sep);
    const c = document.createElement('span'); c.textContent = p;
    breadcrumb.appendChild(c);
  });
}

function addBotBubble(text){
  const row = document.createElement('div'); row.className = 'row bot';
  const b = document.createElement('div'); b.className = 'bubble bot'; b.textContent = text;
  row.appendChild(b); body.appendChild(row);
  body.scrollTop = body.scrollHeight;
}

function addUserBubble(text){
  const row = document.createElement('div'); row.className = 'row user';
  const b = document.createElement('div'); b.className = 'bubble user'; b.textContent = text;
  row.appendChild(b); body.appendChild(row);
  body.scrollTop = body.scrollHeight;
}

function addOptions(opts){
  const wrap = document.createElement('div'); wrap.className = 'options';
  opts.forEach(o => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn' + (o.style ? (' ' + o.style) : '');
    btn.textContent = o.label;
    btn.onclick = o.onClick;
    wrap.appendChild(btn);
  });
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
}

function addCard(el){ body.appendChild(el); body.scrollTop = body.scrollHeight; }

function resetChat(){
  body.innerHTML = '';
  renderLangSwitch();
  renderBreadcrumb();
  addBotBubble(t().greet);
  showMainMenu();
}

function showMainMenu(){
  state.path = [];
  renderBreadcrumb();
  addOptions(t().menu.map(cat => ({
    label: cat.label,
    onClick: () => { addUserBubble(cat.label); showCategory(cat); }
  })).concat([{label: '💬 ' + t().leaveMsg, style: 'ghost', onClick: () => { addUserBubble(t().leaveMsg); showFallback(); }}]));
}



function showCategory(cat){
  state.path = [cat.label.replace(/^\S+\s/, '')];
  renderBreadcrumb();
  addOptions(cat.qs.map(item => ({
    label: item.q,
    onClick: () => { addUserBubble(item.q); showAnswer(item); }
  })).concat([{label: '← ' + t().backHome, style: 'ghost', onClick: () => resetToMenuBubble()}]));
}

function resetToMenuBubble(){
  addUserBubble(t().backHome);
  addBotBubble(t().greet);
  showMainMenu();
}

function showAnswer(item){
  addBotBubble(item.a);
  addOptions([
    {label: '👍 ' + t().yes, onClick: () => { addUserBubble(t().yes); addBotBubble(t().thanksYes); showMainMenu(); }},
    {label: '👎 ' + t().no, style: 'ghost', onClick: () => { addUserBubble(t().no); showFallback(); }},
  ]);
}

function showFallback(){
  addBotBubble(t().fallbackIntro);
  addOptions([
    {label: '✉️ ' + t().leaveMsg, onClick: () => { addUserBubble(t().leaveMsg); showContactForm(); }},
    {label: '📞 ' + t().callHotline, style: 'accent', onClick: () => { addUserBubble(t().callHotline); showHotlineCard(); }},
    {label: '← ' + t().backHome, style: 'ghost', onClick: () => resetChat()}
  ]);
}

function showHotlineCard(){
  const c = t();
  const card = document.createElement('div'); card.className = 'hotline-card';
  card.innerHTML = `<div style="font-size:11px;color:var(--color-muted);font-weight:600;text-transform:uppercase;font-family:'IBM Plex Mono',monospace;">${c.hotlineTitle}</div>
    <a href="tel:${c.hotlineNum.replace(/[^0-9]/g,'')}" class="hotline-num">${c.hotlineNum}</a>
    <div class="hotline-hours">${c.hotlineHours}</div>`;
  addCard(card);
}

function showContactForm(){
  const c = t();
  const card = document.createElement('div'); card.className = 'form-card';
  card.innerHTML = `
    <div>
      <label>${c.formName} *</label>
      <input type="text" id="fName" placeholder="${c.formName}" required>
    </div>
    <div>
      <label>${c.formContact} *</label>
      <input type="text" id="fContact" placeholder="${c.formContact}" required>
    </div>
    <div>
      <label>${c.formDesc}</label>
      <textarea id="fDesc" placeholder="${c.formDesc}" maxlength="500"></textarea>
    </div>
    <div class="consent-row">
      <input type="checkbox" id="fConsent">
      <label style="font-weight:400;text-transform:none;font-family:'Inter',sans-serif;" for="fConsent">${c.consent}<a href="#" onclick="return false;">${c.privacyLink}</a></label>
    </div>
    <button class="submit-btn" id="fSubmit" disabled>${c.submit}</button>
  `;
  addCard(card);
  const consent = card.querySelector('#fConsent');
  const submitBtn = card.querySelector('#fSubmit');
  consent.addEventListener('change', () => { submitBtn.disabled = !consent.checked; });
  submitBtn.addEventListener('click', () => {
    const name = card.querySelector('#fName').value || '—';
    card.querySelectorAll('input,textarea,button').forEach(el => el.disabled = true);
    addBotBubble(c.submitted.replace('{name}', name));
    addBotBubble(c.routedTo);
  });
}

function tryMatch(text){
  const q = text.toLowerCase();
  for(const cat of t().menu){
    for(const item of cat.qs){
      if(item.kw.some(k => q.includes(k.toLowerCase())) || item.q.toLowerCase().includes(q)){
        return item;
      }
    }
  }
  return null;
}

document.getElementById('sendBtn').onclick = handleTextInput;
document.getElementById('textInput').addEventListener('keydown', e => { if(e.key === 'Enter') handleTextInput(); });

function handleTextInput(){
  const input = document.getElementById('textInput');
  const val = input.value.trim();
  if(!val) return;
  addUserBubble(val);
  input.value = '';
  const match = tryMatch(val);
  if(match){ showAnswer(match); }
  else { showFallback(); }
}

// Initial boot
resetChat();