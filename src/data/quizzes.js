export const quizzes = [
  {
    id: 'password-security',
    moduleId: 'password-security',
    title: 'Password Security Quiz',
    description: 'Test your knowledge of password best practices',
    questions: [
      {
        id: 'q1',
        text: 'You need a new password for your bank account. Which of the following is the strongest?',
        options: [
          'Rahul@1990',
          'P@ssw0rd123',
          'mango-TRAIN-purple-42',
          'RaHuL1990!',
        ],
        correctAnswer: 2,
        explanation:
          'A passphrase like "mango-TRAIN-purple-42" is long (20+ characters), random, and hard to brute-force. The others follow predictable patterns — name + birth year, common substitutions (@ for a, 0 for o), or capitalised dictionary words — which attackers test first with dictionary and rule-based attacks.',
      },
      {
        id: 'q2',
        text: 'You use the same password for Gmail, Facebook, and your banking app. A data breach exposes your Gmail password. What is the most immediate risk?',
        options: [
          'Your Gmail account will be deleted by the hackers',
          'Attackers will try that same password on your bank and Facebook accounts',
          'Google will automatically reset your password within 24 hours',
          'The risk is limited because breach databases are only used by researchers',
        ],
        correctAnswer: 1,
        explanation:
          'This attack is called "credential stuffing." Automated tools take leaked username/password pairs and try them on hundreds of popular services within minutes. Because people reuse passwords, a single breach often cascades into account takeovers across banking, shopping, and social platforms.',
      },
      {
        id: 'q3',
        text: 'What is the primary benefit of using a password manager over memorising passwords?',
        options: [
          'Password managers share your passwords with the website for verification',
          'They allow you to use one master password for every site, reducing memory load',
          'They generate and store long, unique passwords for every account, so you only remember one master password',
          'They make your passwords visible to your browser so autofill works faster',
        ],
        correctAnswer: 2,
        explanation:
          'Password managers (like Bitwarden or 1Password) generate random, unique, strong passwords for every site and encrypt them locally behind a single master password. This eliminates password reuse — the #1 cause of account takeovers — without requiring you to memorise dozens of complex strings.',
      },
      {
        id: 'q4',
        text: 'A website asks you to create a password but only allows 8 characters maximum and no special characters. What should this tell you?',
        options: [
          'The site is very secure because it enforces strict rules',
          'The site likely stores passwords as plain text or uses weak hashing, indicating poor security practices',
          'Short passwords are safer because they are harder to guess',
          'All government websites have this restriction by law',
        ],
        correctAnswer: 1,
        explanation:
          'Legitimate, well-secured sites let you use long passwords (16+ characters) and all character types. Restricting length often means passwords are stored in a fixed-width column — a sign of plain-text or weak encryption storage. Such sites are higher risk; consider using a unique password and enabling any available 2FA.',
      },
      {
        id: 'q5',
        text: 'Two-Factor Authentication (2FA) is enabled on your account. An attacker steals your password from a data breach. What can they still NOT do?',
        options: [
          'See your email address',
          'Log into your account without also having access to your second factor (e.g., your phone)',
          'Reset your password using your security questions',
          'Find out which other sites you are registered on',
        ],
        correctAnswer: 1,
        explanation:
          'With 2FA, your password is only one of two required proofs. Even with the correct password, the attacker is blocked unless they also control your second factor — typically a one-time code from an authenticator app or SMS. This dramatically reduces the value of stolen passwords. App-based 2FA (TOTP) is more secure than SMS-based, as SIM-swap attacks can intercept SMS codes.',
      },
    ],
  },
  {
    id: 'phishing-scams',
    moduleId: 'phishing-scams',
    title: 'Phishing Scams Quiz',
    description: 'Learn to identify and avoid phishing attempts',
    questions: [
      {
        id: 'q1',
        text: 'You receive a WhatsApp message from an unknown number: "Congratulations! You have won ₹50,000 in the KBC lottery. Send your Aadhaar and bank details to claim your prize." What is the correct response?',
        options: [
          'Reply with your details quickly before the offer expires',
          'Ask a family member to verify it first, then share your details',
          'Report and block the number immediately — this is a classic prize/lottery scam',
          'Send only your Aadhaar number, not your bank details, to stay safe',
        ],
        correctAnswer: 2,
        explanation:
          'No legitimate lottery or contest contacts you unsolicited on WhatsApp demanding personal documents. This is a "prize scam" — a common fraud pattern in India where scammers impersonate KBC, government schemes, or telecom companies. Any prize that requires you to share identity or financial details first is fraudulent. Report to the Cyber Crime portal (cybercrime.gov.in) or helpline 1930.',
      },
      {
        id: 'q2',
        text: 'You get an SMS: "Your SBI account is blocked. Click http://sbi-secure-login.in to verify." The link looks official. What should you do?',
        options: [
          'Click the link since your bank account may actually be blocked',
          'Forward it to your bank manager to confirm',
          "Do NOT click the link. Open your browser and go directly to sbi.co.in or call SBI's official helpline",
          'Reply STOP to unsubscribe from the alerts',
        ],
        correctAnswer: 2,
        explanation:
          'Banks never send SMS links asking you to log in or verify credentials. The domain "sbi-secure-login.in" is NOT sbi.co.in — attackers register lookalike domains to harvest credentials. Always navigate directly to your bank\'s official URL or use the official app. If you\'re unsure, call the number on the back of your debit card.',
      },
      {
        id: 'q3',
        text: 'Which of these email addresses is most likely to be a phishing attempt impersonating HDFC Bank?',
        options: [
          'support@hdfcbank.com',
          'alerts@hdfcbank.com',
          'noreply@hdfc-bank-secure.net',
          'customercare@hdfcbank.com',
        ],
        correctAnswer: 2,
        explanation:
          'Phishing emails use domains that look similar but are not the real company domain. "hdfc-bank-secure.net" is NOT the official "hdfcbank.com" domain. Attackers register these lookalike domains cheaply. Always check the full domain after the @ symbol, not just the display name or the beginning of the address, which can be easily faked.',
      },
      {
        id: 'q4',
        text: 'Your "friend" messages you on WhatsApp: "I am stuck in Pune without money. Can you do a UPI transfer of ₹5,000? I will return it tomorrow." The message feels slightly odd. What is the safest action?',
        options: [
          'Transfer immediately because a friend in trouble should not wait',
          'Transfer half the amount as a compromise',
          'Call your friend on a known phone number to verify before sending anything',
          'Ask them to send their Aadhaar card as proof of identity first',
        ],
        correctAnswer: 2,
        explanation:
          'WhatsApp accounts are frequently compromised or cloned. Scammers message all contacts impersonating the owner. The only reliable verification is a voice or video call to the person\'s known phone number. Even if the message comes from your friend\'s actual WhatsApp, their account could be hacked. Never send money based on a text message alone.',
      },
      {
        id: 'q5',
        text: 'You receive an email saying you owe tax and must pay immediately via a gift card or face arrest. This is:',
        options: [
          'A legitimate IT Department notice — the government does use email for tax demands',
          'A scam — government agencies never demand payment via gift cards, and legitimate notices always have a formal process',
          'Possibly real — you should buy the gift cards to avoid arrest and dispute the charge later',
          'A mistake — forward it to the IT Department email to correct their records',
        ],
        correctAnswer: 1,
        explanation:
          'No government body — Income Tax Department, Police, CBI, or any other — will demand immediate payment via gift cards, UPI transfers to personal numbers, or cryptocurrency. Legitimate tax dues are communicated through formal notices on the IT portal (incometax.gov.in) with time for response and legal recourse. The threat of "immediate arrest" is a pressure tactic designed to bypass your critical thinking.',
      },
    ],
  },
  {
    id: 'social-media-safety',
    moduleId: 'social-media-safety',
    title: 'Social Media Safety Quiz',
    description: 'Understand how to stay safe on social platforms',
    questions: [
      {
        id: 'q1',
        text: 'You post a photo from your vacation with the caption "Off to Goa for 10 days!" Your privacy setting is Public. What risk does this create?',
        options: [
          'None — photos on the internet are automatically protected by copyright',
          'You signal to anyone watching that your home is unoccupied for 10 days',
          'Instagram will automatically flag this as location data and delete it',
          'Your followers might copy your holiday idea',
        ],
        correctAnswer: 1,
        explanation:
          'Real-time location sharing and announcing long absences publicly can alert burglars. Social media scraping for home-empty signals is a documented tactic. Best practice: post vacation photos after you return, keep your location private, and restrict posts to people you actually know.',
      },
      {
        id: 'q2',
        text: 'A stranger sends you a friend request on Facebook. Their profile shows very few photos, was created recently, and they have only 12 friends. What is the most cautious interpretation?',
        options: [
          'This is probably a shy person who is new to social media — accept the request',
          'This profile shows several signs of a fake or bot account — decline or ignore',
          'Report it immediately to police because they must be a criminal',
          'Accept the request but do not interact with them',
        ],
        correctAnswer: 1,
        explanation:
          'Fake profiles (used for romance scams, information harvesting, or spreading misinformation) often have few photos, a recent creation date, and sparse friend lists. Legitimate users accumulate activity over time. You are not obligated to accept every request. Accepting fake profiles can expose your real friends list, posts, and personal information to bad actors.',
      },
      {
        id: 'q3',
        text: 'Which piece of information is MOST dangerous to share publicly on social media?',
        options: [
          'Your favourite movie',
          'Your home city',
          'Your date of birth combined with your mother\'s maiden name',
          'Your professional job title',
        ],
        correctAnswer: 2,
        explanation:
          'Date of birth and mother\'s maiden name are two of the most common security questions used by banks, telecom operators, and government portals to verify identity or reset account access. Combined, they can help attackers impersonate you to customer service. Never post these together publicly.',
      },
      {
        id: 'q4',
        text: 'You want to comment critically on a government policy on X (Twitter). What is the safest practice regarding your account?',
        options: [
          'Create a fully anonymous account with no real details to protect your identity',
          'Use your real name so people take your opinion seriously',
          'Understand that fully anonymous accounts are difficult to maintain and that your writing style and behaviour can still identify you over time',
          'Avoid commenting on political topics entirely because it is illegal',
        ],
        correctAnswer: 2,
        explanation:
          'True anonymity online is very hard — even pseudonymous accounts can be linked through consistent writing patterns, timing, device fingerprints, or metadata. Additionally, expressing critical opinions is a legal right in India, but hate speech and incitement are not. If you use a pseudonym, avoid cross-posting content that links to your real identity and use separate email and device where possible.',
      },
      {
        id: 'q5',
        text: 'An app asks permission to access your contacts, camera, microphone, and location before you can use a simple quiz feature. What should you do?',
        options: [
          'Grant all permissions so the app works smoothly',
          'Grant only the permissions that make sense for the stated feature — a quiz app needs none of these',
          'Delete your phone and start fresh',
          'Permissions are automatically managed by the OS, so it does not matter what you approve',
        ],
        correctAnswer: 1,
        explanation:
          'Each permission you grant is a potential data stream to the app developer and their partners. A quiz app has no legitimate need for your contacts, camera, microphone, or location. This kind of "permission overreach" is a common way apps harvest and monetise personal data. On Android and iOS, you can grant permissions per-use or deny them entirely; most features will still work.',
      },
    ],
  },
  {
    id: 'online-privacy',
    moduleId: 'online-privacy',
    title: 'Online Privacy Quiz',
    description: 'Discover how to protect your digital privacy',
    questions: [
      {
        id: 'q1',
        text: 'You search for "diabetes symptoms" on Google. A week later, you notice ads for diabetes medicines on unrelated websites. What technology is responsible?',
        options: [
          'Coincidence — advertisers cannot see your search history',
          'Third-party cookies and cross-site tracking used by ad networks to build a profile of your interests',
          'Your ISP selling your browsing data to pharmaceutical companies',
          'Your phone\'s microphone recording your conversations',
        ],
        correctAnswer: 1,
        explanation:
          'Ad networks (like Google Ads) link your search behaviour to a persistent advertising ID. When you visit other sites that use the same ad network, they serve ads based on your search history. This is called behavioural retargeting. Using a browser with tracker blocking (Firefox, Brave) or installing uBlock Origin significantly reduces this tracking.',
      },
      {
        id: 'q2',
        text: 'What does "browsing in Incognito/Private mode" actually prevent?',
        options: [
          'Your ISP and employer seeing which sites you visit',
          'Google from tracking your searches',
          'Your browser from saving history, cookies, and form data on your local device',
          'Websites from logging your IP address',
        ],
        correctAnswer: 2,
        explanation:
          'Incognito mode is a local privacy feature only. It stops your browser from saving history, cookies, and form data on your device — useful if sharing a device. However, your ISP, network administrator (school, office), and the websites you visit can still see your traffic. For network-level privacy, you need a VPN or Tor.',
      },
      {
        id: 'q3',
        text: 'A website shows a cookie consent banner with two buttons: "Accept All" and a greyed-out "Manage Preferences." What is the correct action to protect your privacy?',
        options: [
          'Click "Accept All" to make the banner disappear quickly',
          'Ignore the banner — cookies are harmless',
          'Look for and use "Manage Preferences" or "Reject Non-Essential" to block tracking cookies',
          'Close the browser tab to avoid accepting any cookies',
        ],
        correctAnswer: 2,
        explanation:
          'Cookie banners are legally required to offer genuine choice. Greying out the "Manage Preferences" button is a dark pattern designed to push you towards "Accept All." Accepting all cookies often grants dozens of ad companies the ability to track you across the web. Under GDPR and Indian data protection principles, you are entitled to reject non-essential cookies. Take the extra few seconds to manage preferences.',
      },
      {
        id: 'q4',
        text: 'You use public Wi-Fi at a café to check your bank balance. What is the main risk?',
        options: [
          'The Wi-Fi will be slower, so your session might time out',
          'The café could charge you for bandwidth used',
          'An attacker on the same network could intercept unencrypted traffic or run a man-in-the-middle attack',
          'Public Wi-Fi automatically disables HTTPS on banking sites',
        ],
        correctAnswer: 2,
        explanation:
          'Public Wi-Fi is often unsecured, and an attacker can set up a rogue access point with the same name ("Café Free Wi-Fi") or passively capture traffic. While HTTPS encrypts the content of banking sessions, metadata and session tokens can still be exposed. Best practice: use mobile data for sensitive transactions, or connect through a reputable VPN on public Wi-Fi.',
      },
      {
        id: 'q5',
        text: 'A free mobile app claims it does not collect your data. Where can you independently verify this claim?',
        options: [
          'You cannot — you must trust the app developer\'s word',
          'By reading the app\'s Privacy Policy and checking its data safety section in the Play Store / App Store',
          'By running the app for a week and seeing if you get more ads',
          'By asking friends who have already installed the app',
        ],
        correctAnswer: 1,
        explanation:
          'Google Play\'s "Data safety" section and Apple\'s "App Privacy" label require developers to self-declare what data they collect. While not independently audited, they create legal accountability. Read the Privacy Policy for details on third-party sharing. Tools like Exodus Privacy (exodus-privacy.eu.org) can audit Android apps for known trackers without you needing to install them.',
      },
    ],
  },
  {
    id: 'cyberbullying',
    moduleId: 'cyberbullying',
    title: 'Cyberbullying Awareness Quiz',
    description: 'Understand cyberbullying and how to respond',
    questions: [
      {
        id: 'q1',
        text: 'Someone keeps sending you hurtful messages online at all hours. When you block them, they create a new account to continue. This pattern is called:',
        options: [
          'Trolling — an occasional rude comment',
          'Cyberstalking/persistent cyberbullying — a sustained campaign that may require escalation beyond blocking',
          'Flaming — a one-off heated argument',
          'Doxing — revealing your personal information publicly',
        ],
        correctAnswer: 1,
        explanation:
          'Blocking is a good first step, but when someone creates new accounts to continue harassment, this escalates to cyberstalking, which is a cognisable offence under Section 354D of the Indian Penal Code and Section 67 of the IT Act. Document every incident (screenshots with timestamps), report to the platform, and file a complaint at cybercrime.gov.in or your local police station.',
      },
      {
        id: 'q2',
        text: 'You witness a classmate being publicly mocked in a group chat. As a bystander, what is the MOST helpful action?',
        options: [
          'Stay silent to avoid being targeted yourself',
          'Send a laughing reaction so the bullies do not suspect you are going to report them',
          'Privately message the targeted person to show support, and report the behaviour to a trusted adult or platform',
          'Post a public counter-argument in the group, which may escalate the situation',
        ],
        correctAnswer: 2,
        explanation:
          'Research shows that private support from even one bystander significantly reduces the psychological harm to the victim. Public confrontation in the group can escalate. Reporting to the platform or a trusted adult (teacher, parent, school counsellor) activates systems designed to intervene. Doing nothing implicitly signals that the behaviour is acceptable.',
      },
      {
        id: 'q3',
        text: 'Someone shares a manipulated/edited photo of a classmate to embarrass them online. Under Indian law, this could be classified as:',
        options: [
          'Free speech, as long as the person\'s face is not fully shown',
          'Cyberbullying with potential legal consequences under the IT Act and IPC, especially if the content is of a sexual nature',
          'Only a school disciplinary matter, with no criminal implications',
          'Legal, as the photo was originally publicly posted',
        ],
        correctAnswer: 1,
        explanation:
          'Sharing manipulated images to harass someone is punishable under multiple Indian laws: Section 66A (now struck down but replaced by other sections), Section 67 of the IT Act (obscene material), and IPC Sections 509 (insulting modesty), 499 (defamation), and 354 (assault on dignity). The fact that an original photo was public does not give permission to alter and misuse it.',
      },
      {
        id: 'q4',
        text: 'A friend tells you they are being cyberbullied and shows you the messages. They ask you NOT to tell any adult. What should you do?',
        options: [
          'Respect their wish and keep it secret — it is their decision',
          'Immediately tell every adult you know so the problem gets fixed fast',
          'Acknowledge their feelings, encourage them to seek support, and explain that if you believe they are in serious distress you may need to involve a trusted adult for their safety',
          'Take screenshots and post them publicly to expose the bully',
        ],
        correctAnswer: 2,
        explanation:
          'Cyberbullying victims often fear that adult involvement will make things worse or that they will lose device access. Validating their feelings builds trust. However, if there are signs of serious emotional harm or self-harm risk, their safety must come first. Explain this honestly. Help them report directly to the platform (which is anonymous) as a first step they control.',
      },
      {
        id: 'q5',
        text: 'What is "doxing" and why is it dangerous even when done against a bully?',
        options: [
          'Doxing is blocking someone; it is dangerous because they can create new accounts',
          'Doxing is researching and publicly exposing someone\'s personal information; it is dangerous because it can incite real-world harm and is illegal regardless of the target\'s behaviour',
          'Doxing is a type of virus that steals contact lists',
          'Doxing is safe and legal when used against someone who broke the law first',
        ],
        correctAnswer: 1,
        explanation:
          'Doxing (publishing private information like home address, phone, workplace) can lead to physical harassment, stalking, or mob violence against the target — even if that person behaved badly online. Two wrongs do not make a right, and you can face serious legal consequences for doxing under Indian cybercrime laws. The correct response to online harassment is to use official reporting channels.',
      },
    ],
  },
  {
    id: 'digital-payments',
    moduleId: 'digital-payments',
    title: 'Digital Payments Safety Quiz',
    description: 'Stay safe while making digital transactions',
    questions: [
      {
        id: 'q1',
        text: 'Someone sends you ₹1 on UPI and then calls saying "I sent money by mistake, please send it back via this QR code." You scan the QR code — what happens?',
        options: [
          'You send back ₹1 to the caller',
          'The QR code initiates a payment FROM your account, not to it — you lose money',
          'The QR code verifies the transaction and refunds the original ₹1',
          'Nothing — scanning a QR code alone cannot transfer money',
        ],
        correctAnswer: 1,
        explanation:
          'This is the most common UPI scam in India. A QR code for receiving money does not exist in UPI — scanning a QR code always initiates a payment FROM you. Scammers send a small amount to build trust, then send a "collect request" or QR code that drains your account. If you receive money by mistake, contact the sender through official channels; never scan QR codes to "refund."',
      },
      {
        id: 'q2',
        text: 'You receive a call from "Amazon customer care" saying your order has an issue and they need your UPI PIN to process a refund. What do you do?',
        options: [
          'Share the PIN — Amazon needs it to credit the refund to the right account',
          'Share only the first two digits as partial verification',
          'Refuse — no legitimate company ever needs your UPI PIN to send you money',
          'Ask them to send an email instead, then share the PIN via email',
        ],
        correctAnswer: 2,
        explanation:
          'Your UPI PIN is your payment authorisation secret — equivalent to your ATM PIN. No company, bank, or government body ever needs your PIN to send you a refund, credit, or prize. To receive money, the sender only needs your UPI ID or mobile number. Anyone asking for your PIN is trying to steal from your account.',
      },
      {
        id: 'q3',
        text: 'You receive an OTP for a transaction you did NOT initiate. What should you do immediately?',
        options: [
          'Share the OTP with whoever calls asking for it — they probably triggered it accidentally',
          'Ignore the OTP — if you did not initiate a transaction it will expire harmlessly',
          'Do NOT share the OTP. Contact your bank immediately to block your account/card and report potential fraud',
          'Enter the OTP yourself to see what transaction it relates to',
        ],
        correctAnswer: 2,
        explanation:
          'An OTP you did not request means someone else has your card/account details and is trying to complete a transaction using you as the OTP source. Sharing the OTP completes their theft. Even ignoring it is risky if they can try again. Immediately call your bank\'s 24-hour helpline (number on your card) to block the account. Then file a complaint at cybercrime.gov.in or call 1930.',
      },
      {
        id: 'q4',
        text: 'Which of these is the safest practice when using UPI apps like PhonePe or GPay?',
        options: [
          'Save your UPI PIN in your phone\'s notes app for easy access',
          'Use the same UPI PIN as your bank ATM PIN for consistency',
          'Enable app lock, set a unique UPI PIN different from your ATM PIN, and never screenshot the UPI PIN screen',
          'Share your UPI PIN with trusted family members in case you forget it',
        ],
        correctAnswer: 2,
        explanation:
          'Your UPI PIN should be known only by you and memorised, not stored. Using the same PIN for UPI and ATM means a single compromise exposes both channels. App lock prevents physical access if your phone is stolen. Screenshots of PIN setup screens can be accessed by photo-scanning malware. Never share your PIN with anyone, even family — your bank will never ask for it either.',
      },
      {
        id: 'q5',
        text: 'You want to pay a shopkeeper. They show you two QR codes — one on a printed standee and one taped over it. Which should you scan and why?',
        options: [
          'Scan the taped one — it is the most recent update from the merchant',
          'Scan either — QR codes are just links, so both are equally safe',
          'Scan the printed standee QR if the taped code looks recently added, and verify the payee name on the payment screen before confirming',
          'Ask the shopkeeper to send their UPI ID via SMS instead',
        ],
        correctAnswer: 2,
        explanation:
          'A common physical scam is placing a fake QR code sticker over a merchant\'s legitimate QR code. Payments then go to the scammer\'s account. Always check the name displayed on the payment confirmation screen before entering your PIN. If the name does not match the shop or looks suspicious, cancel and ask the merchant directly for their UPI ID.',
      },
    ],
  },
  {
    id: 'safe-browsing',
    moduleId: 'safe-browsing',
    title: 'Safe Browsing Quiz',
    description: 'Navigate the web securely and confidently',
    questions: [
      {
        id: 'q1',
        text: 'You visit a website and see a padlock icon (🔒) in the address bar. This means:',
        options: [
          'The website is safe, legitimate, and cannot be used for phishing',
          'The connection between your browser and the website is encrypted, but it says nothing about the website\'s trustworthiness',
          'The website has been verified by the Indian government',
          'Your personal data on that website is protected from hackers',
        ],
        correctAnswer: 1,
        explanation:
          'HTTPS (shown by the padlock) means your connection is encrypted in transit — no one can intercept data between you and the server. However, phishing sites, scam websites, and malware distributors routinely use HTTPS. The padlock is a minimum bar, not a trust badge. Always verify the full domain name, not just the padlock.',
      },
      {
        id: 'q2',
        text: 'A pop-up appears saying "Your computer has a virus! Call Microsoft Support at +91-XXXX immediately!" What should you do?',
        options: [
          'Call the number — Microsoft would not display a warning unless it was real',
          'Download the antivirus tool the pop-up recommends',
          'Close the browser tab or window. This is a tech support scam; Microsoft never shows phone numbers in browser pop-ups',
          'Restart your computer and then call the number to be safe',
        ],
        correctAnswer: 2,
        explanation:
          'This is a "scareware" or tech support scam. Legitimate antivirus or OS alerts never appear as browser pop-ups with phone numbers. Calling the number connects you to fraudsters who will ask to remotely access your computer and then charge money, steal data, or install actual malware. Simply close the tab (use Task Manager if the page freezes) and run a scan with your existing antivirus.',
      },
      {
        id: 'q3',
        text: 'You need to download a free PDF editor. Which source is safest?',
        options: [
          'The first Google result for "free PDF editor download"',
          'A site offering a "cracked" version of a paid PDF tool',
          'The official website of the software (e.g., libreoffice.org) or the official app store',
          'A file shared in a WhatsApp group by a friend who already downloaded it',
        ],
        correctAnswer: 2,
        explanation:
          'Malware is most commonly distributed through unofficial download sites, cracked software, and peer-to-peer sharing. Search results can be gamed by attackers with malicious lookalike sites. Cracked software frequently contains trojans or keyloggers. Official websites and verified app stores (Play Store, App Store, Microsoft Store) vet their software and provide authentic downloads.',
      },
      {
        id: 'q4',
        text: 'What does a browser extension do that makes it a potential privacy risk?',
        options: [
          'Extensions slow down your browser, which can expose your session tokens',
          'Extensions can read and modify everything on every webpage you visit, including passwords and banking pages',
          'Extensions contact Google servers, exposing your identity',
          'Extensions are only risky on mobile browsers, not on desktop',
        ],
        correctAnswer: 1,
        explanation:
          'Most browser extensions request permission to "read and change all data on websites you visit." This means a malicious or compromised extension can see your login forms, passwords, bank account numbers, and OTPs. Install extensions only from trusted developers, minimise the total number installed, review permissions, and periodically audit your extension list.',
      },
      {
        id: 'q5',
        text: 'You are on a shopping website and notice the URL is "http://greatdeals.in" (not HTTPS). You are about to enter your credit card number. What should you do?',
        options: [
          'Proceed — Indian websites often skip HTTPS to save costs',
          'Do NOT enter your card details. Leave the site and find an HTTPS alternative, as your data would be transmitted without encryption',
          'Use a prepaid card — this will protect your data even without HTTPS',
          'Check if the site has a "Secure Checkout" button, which overrides the lack of HTTPS',
        ],
        correctAnswer: 1,
        explanation:
          'HTTP (without S) means your payment data is transmitted in plain text, readable by anyone intercepting your connection — such as on the same Wi-Fi network or at the ISP level. No legitimate e-commerce or payment page should ever be HTTP-only. No button, badge, or trust seal compensates for missing encryption. Leave the site immediately.',
      },
    ],
  },
  {
    id: 'identity-protection',
    moduleId: 'identity-protection',
    title: 'Identity Protection Quiz',
    description: 'Protect your personal and financial identity online',
    questions: [
      {
        id: 'q1',
        text: 'Someone asks for a photocopy of your Aadhaar card to verify your address for renting a room. What precaution should you take?',
        options: [
          'Refuse to share Aadhaar entirely — it should never be photocopied',
          'Write "Shared with [Name/Purpose] on [Date]" across the photocopy before providing it, and use a masked Aadhaar where possible',
          'Share a photo on WhatsApp instead of a photocopy — photos are safer',
          'Share only the front side of the card, keeping the back (which has your fingerprint) private',
        ],
        correctAnswer: 1,
        explanation:
          'Aadhaar can legitimately be used for KYC. UIDAI recommends using Masked Aadhaar (available from myaadhaar.uidai.gov.in) which shows only the last 4 digits. When a full copy is unavoidable, write the purpose and date on it to prevent reuse. Never share your Aadhaar OTP or biometrics. Report misuse to 1947 (UIDAI helpline). Your Aadhaar can be locked/unlocked on the UIDAI portal.',
      },
      {
        id: 'q2',
        text: 'A fraudster gets your name, date of birth, PAN number, and mobile number. What can they potentially do with this information?',
        options: [
          'Nothing significant — they still need your physical documents to cause harm',
          'Open fraudulent loans or credit cards in your name, file fake GST registrations, or conduct KYC for illegal accounts',
          'Only access your social media accounts',
          'They can view your bank balance but cannot withdraw money',
        ],
        correctAnswer: 1,
        explanation:
          'PAN + DOB + mobile number is enough for many digital KYC processes. Fraudsters have used such data to take instant loans (via lending apps), open mule bank accounts, file fraudulent income tax returns to claim refunds, and register fake businesses. This is why protecting documents and their details is critical — monitor your CIBIL/credit report regularly at cibil.com to catch unauthorised credit lines.',
      },
      {
        id: 'q3',
        text: 'You notice an unknown transaction on your bank statement. What is the FIRST thing you should do?',
        options: [
          'Wait a few days to see if it resolves automatically',
          'Post about it on social media to warn others',
          'Call your bank\'s 24-hour helpline immediately to dispute the transaction and block your card if necessary',
          'Change your social media passwords',
        ],
        correctAnswer: 2,
        explanation:
          'Time is critical in fraud recovery. Banks in India are required by RBI guidelines to investigate disputed transactions. If you report within 3 days of an unauthorised transaction, your liability is zero in most cases. Waiting reduces your chances of recovery. After calling, also file a complaint at cybercrime.gov.in and call the Cyber Crime helpline 1930.',
      },
      {
        id: 'q4',
        text: 'What is the safest way to dispose of a document containing your PAN number or bank account details?',
        options: [
          'Tear it into two pieces and throw it in the bin',
          'Burn it, shred it into small pieces, or render the sensitive text unreadable before disposal',
          'Throw it in a public dustbin away from your home',
          'Scan and store it digitally, then throw away the physical copy',
        ],
        correctAnswer: 1,
        explanation:
          '"Dumpster diving" — searching through discarded documents — is a real identity theft technique. Bank statements, credit card offers, utility bills, and form printouts contain enough data to impersonate you. Cross-cut shredding (not strip-cut) or burning makes document reconstruction impossible. If you scan digitally, store in an encrypted location.',
      },
      {
        id: 'q5',
        text: 'You receive an SMS: "Your DigiLocker account is about to expire. Verify at digilocker-secure.com to avoid deletion of your documents." What is happening?',
        options: [
          'DigiLocker government accounts do expire — you should click and verify',
          'This is a phishing attempt — DigiLocker accounts do not expire and the domain is not official',
          'This is a legitimate notification from MEITY (Ministry of Electronics)',
          'You should forward this to contacts who also use DigiLocker',
        ],
        correctAnswer: 1,
        explanation:
          'DigiLocker (digilocker.gov.in) accounts do not expire and the government never sends expiry warnings via SMS links. The fake domain "digilocker-secure.com" is designed to steal your login credentials and access to officially stored documents like Aadhaar, driving licence, and marksheets. All government digital services communicate through official .gov.in domains only.',
      },
    ],
  },
  {
    id: 'misinformation',
    moduleId: 'misinformation',
    title: 'Misinformation & Fake News Quiz',
    description: 'Identify false information and think critically online',
    questions: [
      {
        id: 'q1',
        text: 'A WhatsApp forward claims: "BREAKING: Government to impose internet shutdown from midnight tonight. Forward to all contacts." This message has been forwarded 1,000+ times. What should you do first?',
        options: [
          'Forward it immediately — it has been shared so many times, it must be true',
          'Verify it on official government websites (pib.gov.in, mygov.in) or credible news sources before sharing or acting on it',
          'Call your local MLA to confirm',
          'Save mobile data by switching to airplane mode immediately',
        ],
        correctAnswer: 1,
        explanation:
          'Forward count is not evidence of truth — misinformation spreads faster than facts because it triggers fear or urgency. PIB (Press Information Bureau) runs a Fact Check unit at pib.gov.in/factcheck. For viral health or policy claims, also check ANI, PTI wire services, or use fact-checkers like Alt News (altnews.in) or Boom Live (boomlive.in). WhatsApp itself labels frequently forwarded messages to prompt caution.',
      },
      {
        id: 'q2',
        text: 'You see a video claiming to show a politician saying something shocking. The video looks real. What is the most responsible approach before sharing?',
        options: [
          'Share immediately — videos are harder to fake than text',
          'Check the date, source, and original context. Use reverse image/video search and check whether credible outlets have reported on it',
          'Ask friends in a WhatsApp group whether the video is real',
          'Report the video for misinformation so others cannot see it',
        ],
        correctAnswer: 1,
        explanation:
          'Deepfake videos and out-of-context clips are increasingly used to manipulate public opinion. InVID/WeVerify browser plugin helps analyse video metadata and frame-by-frame context. Reverse image search (Google Images or TinEye) can trace the origin of images. A genuine news event involving a public figure will be reported by multiple independent credible outlets — if only one or two fringe pages carry it, that is a red flag.',
      },
      {
        id: 'q3',
        text: 'A message circulates: "Home remedy: Drink hot water with lemon and turmeric every 2 hours to cure COVID-19." A doctor friend forwards it in a group. What level of trust should you give this claim?',
        options: [
          'High trust — a doctor forwarded it, so it must be medically validated',
          'Medium trust — it uses natural ingredients, so it cannot cause harm',
          'Low trust — medical treatment claims require peer-reviewed evidence, not WhatsApp endorsements, even from doctors',
          'Complete trust — the Ministry of AYUSH has endorsed such remedies',
        ],
        correctAnswer: 2,
        explanation:
          'Health misinformation is particularly dangerous because it can delay real treatment. Even doctors can share unverified information casually. Medical claims should be verified through official health bodies (WHO, ICMR, MoHFW) or peer-reviewed sources. The Indian Medical Association (IMA) has warned against unverified home remedies. "Cannot cause harm" is also false — excessive citrus with underlying conditions, or delaying hospital care, causes real harm.',
      },
      {
        id: 'q4',
        text: 'What is a reliable way to check if a news headline you saw online is accurate?',
        options: [
          'See how many likes and shares the post has received',
          'Check whether the same story is reported by multiple independent, established news organisations',
          'Read the comments section to see what others think',
          'Google the headline and click the first result',
        ],
        correctAnswer: 1,
        explanation:
          'Corroboration across multiple independent sources is the gold standard of news verification. If a dramatic claim is only on one obscure website, it is likely fabricated or heavily distorted. Major genuine news events are reported by PTI, ANI, The Hindu, NDTV, Indian Express, etc. Social media engagement (likes, shares) has no correlation with accuracy — false stories often receive more engagement due to their emotional impact.',
      },
      {
        id: 'q5',
        text: 'You realise you have already shared a piece of misinformation with your WhatsApp contacts. What is the right thing to do?',
        options: [
          'Nothing — deleting your message removes all copies',
          'Post a correction in the same groups/chats where you shared the false information',
          'Wait and see if anyone else corrects it first',
          'Delete your WhatsApp account to avoid embarrassment',
        ],
        correctAnswer: 1,
        explanation:
          'Deleting a WhatsApp message removes it only before it has been read; people who already saw it still have the information. The ethical responsibility is to correct the record in the same channels. Studies show that corrections from the original sharer are more effective than corrections from others. A simple message like "I shared this earlier — it has been fact-checked as false. Please ignore and do not forward" is enough.',
      },
    ],
  },
  {
    id: 'smartphone-security',
    moduleId: 'smartphone-security',
    title: 'Smartphone Security Quiz',
    description: 'Keep your phone and its data secure',
    questions: [
      {
        id: 'q1',
        text: 'You install an APK file sent via WhatsApp that claims to be a "new version" of an official banking app. What is the primary risk?',
        options: [
          'The app may not look as polished as the official version',
          'The APK could be malware designed to steal banking credentials, SMS OTPs, and contacts',
          'Your phone warranty will be voided',
          'The app will use more data than the official version',
        ],
        correctAnswer: 1,
        explanation:
          'Sideloaded APKs from outside the Play Store are a primary malware distribution vector in India. A fake banking app can overlay your screen on the real app to capture credentials (overlay attack), read your SMS to intercept OTPs, or run as a background keylogger. Only download banking, payment, and government apps from the official Google Play Store or App Store. Enable "Block unknown sources" in Android security settings.',
      },
      {
        id: 'q2',
        text: 'Your phone prompts you to install an operating system update. You have been postponing it for weeks because "the phone works fine." Why is updating important?',
        options: [
          'Updates only add new features; they do not affect security',
          'Updates patch known security vulnerabilities that attackers actively exploit once they become public knowledge',
          'Updates are mainly for improving battery life',
          'Updates only matter if you use public Wi-Fi frequently',
        ],
        correctAnswer: 1,
        explanation:
          'Once a security vulnerability is publicly announced with a patch, attackers begin exploiting it on unpatched devices immediately. The delay between "patch released" and "user installs it" is a window attackers call the "exploitation window." Google releases monthly Android security patches specifically to close these gaps. Enable automatic updates to minimise this window.',
      },
      {
        id: 'q3',
        text: 'You lend your phone to a stranger to make an "emergency call." They spend 3 minutes on it. What should you check afterwards?',
        options: [
          'Whether they made international calls that could inflate your bill',
          'Whether they installed any apps, changed your screen lock, forwarded your WhatsApp to a new device, or accessed your photos and banking apps',
          'Whether they changed your ringtone or wallpaper',
          'Whether your battery level dropped significantly',
        ],
        correctAnswer: 1,
        explanation:
          'Three minutes is enough time to: install a small spyware APK, link your WhatsApp to a new device (WhatsApp Web), screenshot sensitive data, or disable your screen lock. After lending your phone, check "Recent apps" history, installed apps (sort by install date), WhatsApp Web linked devices, and your app permissions. Consider setting up a screen pinning feature so only the phone app is accessible during lending.',
      },
      {
        id: 'q4',
        text: 'What is a "SIM swap" attack, and what is the best protection against it?',
        options: [
          'Physically swapping SIM cards between phones; protected by using a SIM card lock PIN',
          'An attacker convincing your telecom provider to transfer your mobile number to a SIM they control, letting them receive your OTPs; protected by setting a port-out password with your carrier and using app-based 2FA instead of SMS',
          'A malware attack that reads your SIM contacts; protected by encrypting your SIM',
          'An attack where your SIM overheats and corrupts data; protected by keeping your phone cool',
        ],
        correctAnswer: 1,
        explanation:
          'In a SIM swap, the attacker uses your personal data (leaked or gathered through social engineering) to call your telecom provider (Jio, Airtel, Vi) and get your number ported to their SIM. They can then receive all your SMS OTPs, taking over bank accounts and email. Contact your carrier to add a verbal password for porting requests. Critically, switch to app-based authenticators (Google Authenticator, Authy) instead of SMS for 2FA wherever possible.',
      },
      {
        id: 'q5',
        text: 'Your phone is stolen. You had no screen lock set. What data is immediately at risk?',
        options: [
          'Only your photos, since other apps require passwords',
          'Everything — WhatsApp messages, banking apps that use biometric login (now accessible via face/fingerprint on the thief\'s registered phone), saved passwords, emails, and contacts',
          'Nothing if you had your SIM card locked with a PIN',
          'Only data stored on the SD card',
        ],
        correctAnswer: 1,
        explanation:
          'Without a screen lock, the thief has full access to every app on your device — including UPI apps, banking apps (which may use Face ID registered to whoever holds the phone), WhatsApp, Gmail, and password manager autofill. Immediately: call your carrier to block the SIM, use Google Find My Device or Apple Find My to remotely lock/wipe, call 1930 (Cyber Crime) and file a police complaint, change passwords for critical accounts from another device, and notify your bank.',
      },
    ],
  },
]

export function getQuizById(id) {
  return quizzes.find((q) => q.id === id)
}

export function getQuizByModuleId(moduleId) {
  return quizzes.find((q) => q.moduleId === moduleId)
}
