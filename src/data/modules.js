export const modules = [
  {
    id: 'password-security',
    slug: 'password-security',
    icon: '🔐',
    title: 'Password Security',
    description: 'Strong passwords are your first line of defence. Learn why they matter and how to create them.',
    category: 'Security Fundamentals',
    difficulty: 'Beginner',
    estimatedMinutes: 8,
    tagColor: 'bg-emerald-100 text-emerald-700',
    objectives: [
      'Understand why weak passwords are dangerous',
      'Create strong, memorable passwords',
      'Use a password manager effectively',
      'Enable two-factor authentication (2FA)',
    ],
    sections: [
      {
        title: 'Why Passwords Matter',
        content: `Every online account you have — your email, bank, social media, government portals — is protected primarily by a password. When that password is weak or reused, attackers can access your entire digital life with minimal effort.

In India, millions of people use passwords like "12345678", their mobile number, or their own name. These passwords can be cracked in seconds using automated tools. Cybercriminals use dictionaries of billions of leaked passwords and can try millions of combinations per second.

A breach in one account often cascades. If you use the same password for Gmail and your net banking app, stealing one means owning both. This is called credential stuffing — attackers buy leaked password databases and try them on other websites.

The good news: a strong, unique password for each account eliminates this entire category of risk.`,
        warnings: ['Never share your password with anyone — not even bank staff or government officials.'],
      },
      {
        title: 'What Makes a Password Strong?',
        content: `A strong password has three qualities: length, complexity, and uniqueness.

Length is the most important factor. A 12-character password of random letters is exponentially harder to crack than an 8-character one. Aim for at least 12 characters, and 16+ for sensitive accounts like banking and email.

Complexity means mixing uppercase letters, lowercase letters, numbers, and symbols. "Cyber$afe2024!" is far stronger than "cybersafe2024".

Uniqueness means using a different password for every account. If the same password appears in a data breach from one website, attackers cannot use it to access your other accounts.

A practical technique is the passphrase: combine four or five random words — "correct-horse-battery-staple" — to get something both long and memorable. Add a number and symbol for extra strength: "Red!Tree9River#Cloud".`,
        dos: [
          'Use at least 12 characters',
          'Mix uppercase, lowercase, numbers, and symbols',
          'Use a unique password for every account',
          'Use a passphrase for memorable passwords',
        ],
        donts: [
          "Don't use your name, mobile number, or date of birth",
          "Don't reuse passwords across different websites",
          "Don't use dictionary words alone",
          "Don't use keyboard patterns like qwerty or 1234",
        ],
      },
      {
        title: 'Using a Password Manager',
        content: `Remembering dozens of unique, complex passwords is impossible — which is why most people reuse them. The solution is a password manager: an app that stores all your passwords in an encrypted vault, locked by one strong master password.

Popular options include Bitwarden (free and open-source), 1Password, and Google Password Manager (built into Chrome and Android). The Indian government has not recommended any specific tool, but independent security organisations consistently endorse Bitwarden for free users.

A password manager generates strong random passwords for you, fills them in automatically on websites and apps, and alerts you when a password has appeared in a known data breach.

Your master password should be a long passphrase you can memorise — something you have never used anywhere else. Write it down and store the paper in a secure physical location, not digitally.`,
        tips: [
          'Use Bitwarden (free) or your browser\'s built-in manager if you\'re just starting.',
          'Enable 2FA on your password manager account itself.',
        ],
      },
      {
        title: 'Two-Factor Authentication (2FA)',
        content: `Even a perfect password can be stolen through phishing or data breaches. Two-factor authentication (2FA) adds a second layer: even if someone has your password, they cannot log in without a second proof of identity.

The most common forms of 2FA are:
• OTP via SMS — a code sent to your registered mobile number. This is better than nothing, but SMS can be intercepted (SIM swap fraud).
• Authenticator apps (Google Authenticator, Microsoft Authenticator, Authy) — these generate time-based codes on your device. These are significantly more secure than SMS.
• Hardware keys (YubiKey) — a physical device you plug in. Highest security, used by security professionals.

Enable 2FA on your most important accounts first: email, banking, UPI apps, and social media. Most platforms support it under Settings → Security.

In India, UPI apps like GPAY, PhonePe, and Paytm have built-in security PINs — treat your UPI PIN as a password and never share it.`,
        warnings: [
          'Never share an OTP with anyone who calls or messages you. No bank, government body, or company will ever ask for your OTP.',
        ],
      },
    ],
    keyTakeaways: [
      'Use passwords of at least 12 characters with mixed character types',
      'Never reuse the same password across different accounts',
      'A password manager removes the burden of memorisation',
      'Enable 2FA on email, banking, and social media accounts',
      'Never share passwords or OTPs with anyone',
    ],
    relatedQuizId: 'password-security',
  },

  {
    id: 'phishing-scams',
    slug: 'phishing-scams',
    icon: '🎣',
    title: 'Phishing & Online Scams',
    description: 'Recognise tricks scammers use to steal your information through fake messages and websites.',
    category: 'Scams & Fraud',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    tagColor: 'bg-red-100 text-red-700',
    objectives: [
      'Identify phishing messages in email, SMS, and WhatsApp',
      'Spot fake websites designed to steal your credentials',
      'Understand common scam techniques used in India',
      'Know what to do after a phishing attempt',
    ],
    sections: [
      {
        title: 'What Is Phishing?',
        content: `Phishing is a type of social engineering attack where criminals impersonate trusted organisations — your bank, government agencies, delivery companies, or family members — to trick you into revealing sensitive information or transferring money.

The name comes from "fishing": scammers cast a wide net and wait for someone to take the bait. Even sophisticated, educated people fall for phishing because the messages are designed to trigger panic, excitement, or urgency — emotions that suppress critical thinking.

In India, phishing attacks impersonate SBI, HDFC, ICICI, Paytm, and government portals like income tax and Aadhaar. The India Cybercrime Reporting Portal (cybercrime.gov.in) receives hundreds of thousands of phishing-related complaints every year.

Phishing happens across every channel: email, SMS (called smishing), phone calls (vishing), and WhatsApp. The technique is the same regardless of channel.`,
      },
      {
        title: 'The Red Flags',
        content: `Every phishing attempt uses at least one of these psychological triggers. Learning to recognise them is your best defence.

**Urgency**: "Your account will be blocked in 24 hours." "Act now or lose your refund." Urgency is designed to prevent you from thinking carefully. Legitimate organisations give you reasonable time to act.

**Fear**: "Suspicious activity detected on your account." "Your Aadhaar has been linked to criminal activity." Fear bypasses rational thinking. Verify any such claim directly by calling the bank's official number.

**Greed**: "You've won ₹1,00,000 in the KBC lottery." "Your UPI refund of ₹5,000 is pending — claim now." If it sounds too good to be true, it is.

**Impersonation**: Messages appear to come from TRAI, UIDAI, SBI, or Amazon. Check the sender's actual email or phone number — not just the name displayed.

**Fake links**: Phishing links look almost right — sbi-kyc-update.tk, amazon-india-refund.com, uidai-aadhaar-verify.in. Legitimate government sites end in .gov.in. Banks use their official domains.`,
        warnings: [
          'The 2-second rule: before clicking any link in a message, pause and read the actual URL carefully.',
          'Hover over links on desktop to see the real destination before clicking.',
        ],
      },
      {
        title: 'Common Scam Patterns in India',
        content: `**KYC Update Scams**: You receive an SMS or WhatsApp message claiming your bank KYC is expired and your account will be frozen. The link leads to a fake bank website that harvests your credentials. Banks update KYC through branch visits or their official apps — never through links in SMSes.

**OTP Scams**: A caller claims to be from your bank, verifies some personal details (which they obtained from data breaches), and asks you to share the OTP sent to your mobile. The moment you share the OTP, they access your account. No legitimate caller ever needs your OTP.

**Fake Customer Care**: Searching "Amazon customer care number" or "Paytm helpline" on Google can return fake numbers from paid ads. These fake agents ask for remote access to your phone via apps like AnyDesk or TeamViewer, then drain your accounts.

**Courier Delivery Fraud**: "Your parcel is stuck at customs. Pay ₹500 to release it." There is no parcel.

**Investment Scams**: WhatsApp groups offering guaranteed high returns through stock tips or crypto. Victims invest small amounts first, see fake profits, invest more, then lose everything when the group disappears.`,
        dos: [
          'Call the official number on the back of your bank card if you are worried about your account',
          'Go directly to the official website by typing the URL — never click links in messages',
          'Verify any prize or lottery claim via the organisation\'s official website',
        ],
        donts: [
          "Don't share OTPs with anyone who calls or messages you",
          "Don't install remote-access apps on the instructions of a caller",
          "Don't click links in SMSes or WhatsApp messages from unknown numbers",
          "Don't search for customer care numbers on Google — find them on the official website",
        ],
      },
      {
        title: 'What To Do After a Phishing Attempt',
        content: `If you accidentally clicked a phishing link or shared information:

**Immediately**: Change the password of the affected account and any other accounts using the same password. If banking credentials were shared, call your bank immediately on the official number and ask them to freeze your account.

**Within the hour**: Call 1930 (National Cyber Crime Helpline) to report financial fraud. The faster you report, the higher the chance of blocking the transaction.

**File a report**: Go to cybercrime.gov.in and file a formal complaint. Keep all screenshots, transaction IDs, and messages as evidence.

**Secure other accounts**: Check if the same email or phone number is used on other platforms. Use haveibeenpwned.com to check if your email appeared in a data breach.

If you only clicked the link but did not enter any information, you are likely safe — but run a malware scan and change the account password as a precaution.`,
        tips: ['Save 1930 in your phone contacts right now for quick access.'],
      },
    ],
    keyTakeaways: [
      'Phishing exploits urgency, fear, and greed — slow down before acting',
      'Never click links in SMSes or WhatsApp — go directly to official websites',
      'Never share OTPs with anyone, ever',
      'Report financial fraud immediately to 1930 and cybercrime.gov.in',
      'Legitimate banks never ask for OTPs, passwords, or CVVs over phone or message',
    ],
    relatedQuizId: 'phishing-scams',
  },

  {
    id: 'social-media-safety',
    slug: 'social-media-safety',
    icon: '📲',
    title: 'Social Media Safety',
    description: 'Control what you share, who sees it, and how to stay safe across social platforms.',
    category: 'Social Media',
    difficulty: 'Intermediate',
    estimatedMinutes: 10,
    tagColor: 'bg-blue-100 text-blue-700',
    objectives: [
      'Configure privacy settings on major social platforms',
      'Recognise social engineering through social media',
      'Manage your digital footprint',
      'Handle online harassment safely and effectively',
    ],
    sections: [
      {
        title: 'Your Digital Footprint on Social Media',
        content: `Social media platforms are designed to encourage sharing — but every piece of information you post becomes part of your permanent digital footprint, potentially visible to employers, scammers, estranged relatives, and even criminals.

Consider what a determined stranger can learn from a typical public social media profile: your full name, face, city, employer, school, family members' names, your daily routine, your home neighbourhood (from geotagged photos), your interests, and your economic status (from holiday photos, gadget purchases, etc.).

This information is gold for social engineering attacks. A scammer who knows your bank, your city, your parents' names, and your mobile number can craft a highly convincing phishing call.

Oversharing also creates risks offline — advertising expensive purchases or holiday travel on a public profile has led to real-world burglaries.

The solution is not to stop using social media, but to be intentional about what you share and who can see it.`,
      },
      {
        title: 'Privacy Settings: What to Change Today',
        content: `Most platforms default to maximum sharing. You need to actively configure them.

**Instagram**: Go to Settings → Privacy → Account Privacy → switch to Private. Under Story controls, disable sharing to Facebook and limit who can share your stories. Turn off similar account suggestions.

**Facebook**: Settings → Privacy → "Who can see your future posts?" → Friends. Review "Limit Past Post Visibility" to restrict old public posts. Under Profile → "Who can see your friends list?" → Only Me or Friends.

**WhatsApp**: Settings → Privacy → "Last Seen and Online" → My Contacts. "Profile Photo" → My Contacts. "About" → My Contacts. Turn off "Read Receipts" if desired. Disable "Live Location" sharing by default.

**LinkedIn**: Settings → Visibility → Turn off "Share profile updates with your network" to prevent broadcasting every edit. Control who can see your connections.

Review these settings every few months — platforms often reset them after updates.`,
        dos: [
          'Set all social media accounts to private or friends-only',
          'Review your privacy settings after every major app update',
          'Remove your phone number from public display where possible',
          'Turn off location sharing and geotagging on photo uploads',
        ],
      },
      {
        title: 'Social Engineering on Social Media',
        content: `Social engineering uses information gathered from your social profiles to manipulate you. Here are the most common patterns:

**Fake friendship requests**: Attractive strangers, army personnel, or foreign nationals request to connect. After building a relationship over weeks, they introduce a financial need or investment opportunity.

**Account impersonation**: Someone creates a fake account mimicking your friend or family member (using their public photos). They message you claiming to be in trouble and need money urgently. Always verify by calling the actual person.

**Fake contests and giveaways**: "Share this post and win an iPhone." These harvest your profile data and spread the scam to your network.

**Quizzes and games**: "What's your Bollywood name? Use your mother's name and birth city!" These seemingly innocent quizzes collect answers to common security questions.

**Romance scams**: Prolonged fake relationships that end in financial requests. Victims lose lakhs of rupees. If someone you've never met in person asks for money, it is almost certainly a scam.`,
        warnings: [
          'Never send money to someone you have only met online, regardless of how long you have been in contact.',
          'Avoid quizzes that ask for information matching your security questions (mother\'s name, birth city, pet\'s name).',
        ],
      },
      {
        title: 'Handling Online Harassment',
        content: `Online harassment — including trolling, threats, stalking, and sharing personal information without consent (doxxing) — is a serious issue affecting millions of Indians, particularly women and young people.

If you experience harassment: document everything first. Take screenshots of all messages, posts, and profiles before blocking. Many platforms allow harassers to delete evidence once blocked.

Then: use the platform's reporting tools. All major platforms (Instagram, Twitter/X, Facebook, WhatsApp) have reporting mechanisms for harassment, threats, and impersonation. Report the content and block the account.

For serious threats, file a police complaint at your local cyber cell, or report online at cybercrime.gov.in. If the harassment involves intimate images or sexual threats, the National Commission for Women (NCW) has a specific helpline: 7827170170.

For children being harassed, the CHILDLINE helpline is 1098. Schools have obligations to address cyberbullying that extends from school interactions.`,
        tips: [
          'Enable comment filters on Instagram and Facebook to auto-hide abusive words.',
          'On Instagram, enable "Restrict" mode for accounts you suspect — they can\'t see when you\'re online.',
        ],
      },
    ],
    keyTakeaways: [
      'Review and restrict your social media privacy settings on every platform',
      'Think before sharing: once posted, information is difficult to fully remove',
      'Verify any urgent money request by calling the person directly',
      'Document harassment before blocking — screenshots preserve evidence',
      'Report serious harassment to cybercrime.gov.in and local cyber cells',
    ],
    relatedQuizId: 'social-media-safety',
  },

  {
    id: 'online-privacy',
    slug: 'online-privacy',
    icon: '🔒',
    title: 'Online Privacy',
    description: 'Understand how your data is collected and what you can do to protect it.',
    category: 'Privacy',
    difficulty: 'Intermediate',
    estimatedMinutes: 9,
    tagColor: 'bg-purple-100 text-purple-700',
    objectives: [
      'Understand how apps and websites collect your data',
      'Manage app permissions on your smartphone',
      'Read and interpret privacy policies effectively',
      'Reduce your data footprint with practical steps',
    ],
    sections: [
      {
        title: 'How Your Data Is Collected',
        content: `Every time you use an app, visit a website, or make a search, data about you is being collected. This happens across multiple layers simultaneously.

Apps on your phone may access your camera, microphone, location, contacts, and storage. Many apps request permissions they don't strictly need — a flashlight app that requests your contacts is a red flag.

Websites use cookies and tracking pixels to follow you across the internet. Even after you leave a website, its advertising partners continue to track your browsing through cookies stored on your device.

Search engines record every query you make, linking them to your account or IP address. Social media platforms analyse your behaviour — what you pause on, what you like, what you share — to build detailed profiles.

Data brokers compile this information from multiple sources and sell it to advertisers, insurance companies, and other buyers. In India, the Personal Data Protection Act (now the DPDP Act 2023) governs how companies must handle personal data, but enforcement is still developing.`,
      },
      {
        title: 'Managing App Permissions',
        content: `Your smartphone gives you significant control over what data apps can access — but only if you actively manage it.

On Android: Go to Settings → Apps → [App name] → Permissions. Review each app's permissions and revoke any that seem unnecessary. On Android 12 and later, you can grant location access "only while using the app" rather than always.

On iPhone: Settings → Privacy & Security shows a list of data types (Location, Camera, Microphone, Contacts, Photos) and which apps have requested access. Revoke access for apps that don't need it.

Key questions to ask for each permission:
• Location: Does this app genuinely need my location to function? (Maps yes; a recipe app, no)
• Microphone/Camera: Is this a communication or media app? If not, deny.
• Contacts: Does this app need to see everyone in my phone book? Could it function without this?
• Storage: Does this app need to read all files, or just save its own files?

Also disable Bluetooth and Wi-Fi when not in use — these can be used to track your location even when GPS is off.`,
        dos: [
          'Review app permissions after every installation',
          'Use "Only while using the app" for location rather than "Always"',
          'Delete apps you no longer use — they may still collect data in the background',
          'Use privacy-focused browsers like Firefox or Brave for sensitive browsing',
        ],
      },
      {
        title: 'Understanding Privacy Policies',
        content: `Privacy policies are long and deliberately complex. But you don't need to read every word — you need to find answers to three key questions.

**What data do they collect?** Look for sections titled "Data We Collect" or "Information Collection." Be wary of vague language like "information that helps us improve your experience."

**Who do they share it with?** Look for "Third Parties," "Partners," or "Affiliates." Legitimate services share limited data with payment processors or analytics providers. Suspect any policy that shares data with broad "advertising partners."

**Can you delete your data?** Under the DPDP Act 2023, Indian residents have the right to request data deletion. Look for a "Data Deletion" or "Account Deletion" option, or contact the company's Data Protection Officer (DPO).

A useful shortcut: search for the company's privacy score on websites like tosdr.org (Terms of Service; Didn't Read) which summarises policies in plain language.

When an app or service is free, your data is usually part of the business model. This isn't inherently wrong, but you deserve to know what you're exchanging.`,
      },
      {
        title: 'Reducing Your Data Footprint',
        content: `You cannot achieve perfect privacy without disconnecting from the internet entirely — but you can significantly reduce your exposure with practical steps.

**Browser**: Use Firefox with uBlock Origin (a free, open-source ad and tracker blocker). Enable "Strict" tracking protection in Firefox settings. Alternatively, Brave browser blocks trackers by default.

**Search engine**: DuckDuckGo and Startpage do not track your searches or build profiles. These are practical replacements for Google Search for most queries.

**Email**: Consider creating a separate email address for shopping and service sign-ups, to protect your primary address from spam and breaches.

**Data deletion**: Many services allow you to download and delete your data — Google Takeout lets you download everything Google has about you, then delete it. Use the "Delete My Account" option on services you no longer use.

**Two useful tools**: Privacy Badger (browser extension by EFF) automatically learns to block trackers. Have I Been Pwned (haveibeenpwned.com) shows if your email has appeared in known data breaches.`,
        tips: [
          'Use temporary email addresses (like temp-mail.org) for one-time sign-ups.',
          'Regularly clear browser cookies and site data: Settings → Privacy → Clear browsing data.',
        ],
      },
    ],
    keyTakeaways: [
      'Apps, websites, and advertisers collect far more data than most people realise',
      'Review and restrict app permissions on your smartphone regularly',
      'Use tracker-blocking browsers and extensions like uBlock Origin',
      'You have the right under Indian law to request deletion of your data',
      'Free services often fund themselves with your data — read the privacy policy key sections',
    ],
    relatedQuizId: 'online-privacy',
  },

  {
    id: 'cyberbullying',
    slug: 'cyberbullying',
    icon: '🤝',
    title: 'Cyberbullying',
    description: 'Understand, recognise, and respond to cyberbullying — whether victim, bystander, or parent.',
    category: 'Safety',
    difficulty: 'Beginner',
    estimatedMinutes: 7,
    tagColor: 'bg-amber-100 text-amber-700',
    objectives: [
      'Define cyberbullying and its different forms',
      'Recognise the signs that someone is being bullied online',
      'Know the right steps to take as a victim or bystander',
      'Understand the legal protections available in India',
    ],
    sections: [
      {
        title: 'What Is Cyberbullying?',
        content: `Cyberbullying is the use of digital technology — smartphones, social media, messaging apps, gaming platforms, or email — to harass, intimidate, humiliate, or harm another person. Unlike physical bullying, cyberbullying follows the victim home, into their bedroom, and into every moment of their day.

Forms of cyberbullying include:
• **Harassment**: Sending repeatedly offensive or threatening messages
• **Exclusion**: Deliberately leaving someone out of group chats or online activities
• **Outing**: Sharing someone's private information or secrets online without consent
• **Impersonation**: Creating a fake profile to damage someone's reputation
• **Cyberstalking**: Persistent following and monitoring of someone online
• **Trolling**: Deliberately provoking or upsetting people for entertainment
• **Sexting without consent**: Sharing intimate images without the person's permission (also a criminal offence in India)

In India, a 2023 survey found that 1 in 4 children between ages 8 and 17 had experienced some form of cyberbullying. The issue disproportionately affects girls.`,
      },
      {
        title: 'Signs and Effects',
        content: `Cyberbullying is often hidden because victims fear that reporting it will make things worse or result in having devices taken away. Parents and teachers should watch for these signs:

**Behavioural changes**: Withdrawal from family and friends, reluctance to attend school, changes in sleep patterns, unexplained mood changes (anger, sadness, anxiety) particularly after using devices.

**Device avoidance or obsession**: Either avoiding devices entirely (suggesting the online environment feels unsafe) or compulsively checking devices with visible distress.

**Academic decline**: Difficulty concentrating, declining grades, disinterest in activities they previously enjoyed.

**Physical symptoms**: Headaches, stomach-aches (often stress-related), disrupted eating patterns.

The effects of cyberbullying are serious and well-documented: increased risk of depression, anxiety, self-harm, and in severe cases, suicide. It should never be dismissed as "just online drama" or "part of growing up."

If you are a young person experiencing cyberbullying, your feelings are valid and help is available. You are not alone, and it is not your fault.`,
        tips: ['The iCall helpline (9152987821) provides free mental health support for young people in India.'],
      },
      {
        title: 'What To Do: Victim, Bystander, Parent',
        content: `**If you are being bullied:**
1. Don't respond or retaliate — this often escalates the situation
2. Document everything before blocking — screenshots with timestamps
3. Block the person on all platforms
4. Tell a trusted adult — a parent, teacher, or counsellor
5. Report to the platform using the report function
6. If threats are involved, file a complaint at cybercrime.gov.in or your local police station

**If you are a bystander:**
Don't share, like, or comment on content that is bullying someone — this amplifies harm. Don't screenshot and reshare humiliating content. Do privately message the victim to offer support. Report the content to the platform. Tell an adult or authority figure.

**If you are a parent:**
Create an open environment where your child feels safe to talk without fear of punishment. Listen without immediately taking away devices. Work with your child on the response steps above. Contact the school — schools have a duty of care even for incidents that originate outside school hours. If serious threats are involved, involve police.`,
        dos: [
          'Document before you block — screenshots preserve evidence',
          'Report bullying content to the platform',
          'Seek emotional support from a trusted person',
          'Contact cybercrime.gov.in for serious harassment',
        ],
      },
      {
        title: 'Legal Protections in India',
        content: `India has several legal provisions that address cyberbullying, though a single dedicated law does not yet exist.

**IT Act 2000 (and 2008 Amendment)**: Section 66A was struck down but Section 66C (identity theft), 66D (cheating by impersonation), 67 (publishing obscene material), and 67B (child pornography — mandatory reporting required) remain in force.

**IPC Sections**: 503 (criminal intimidation), 506 (punishment for criminal intimidation), 354A/354C/354D (sexual harassment, voyeurism, stalking), 499/500 (defamation) can all apply to online harassment.

**Protection of Children from Sexual Offences (POCSO) Act**: Covers online sexual exploitation of minors.

**Sharing intimate images without consent** is an offence. Victims can file a complaint at any police station, at the cyber cell, or online at cybercrime.gov.in.

If police are unresponsive, approach the State Human Rights Commission or file a complaint with the National Commission for Women (for female victims) at mahilathana@nic.in.

Always retain evidence (screenshots, URLs, messages) before filing a complaint.`,
        warnings: ['Sharing intimate images of someone without consent is a criminal offence in India, regardless of how the images were originally obtained.'],
      },
    ],
    keyTakeaways: [
      'Cyberbullying has serious psychological effects and should never be dismissed',
      'Document everything before blocking — evidence is crucial for reports',
      'As a bystander, do not share or amplify bullying content',
      'India has legal provisions under the IT Act and IPC that apply to cyberbullying',
      'Support is available: iCall (9152987821), cybercrime.gov.in, NCW helpline',
    ],
    relatedQuizId: 'cyberbullying',
  },

  {
    id: 'digital-payments',
    slug: 'digital-payments',
    icon: '💳',
    title: 'Digital Payment Safety',
    description: 'Stay safe when using UPI, net banking, and digital wallets. Protect yourself from payment fraud.',
    category: 'Payments',
    difficulty: 'Beginner',
    estimatedMinutes: 11,
    tagColor: 'bg-emerald-100 text-emerald-700',
    objectives: [
      'Understand how UPI and digital payment fraud works',
      'Protect your UPI PIN and banking credentials',
      'Identify and avoid common payment scams',
      'Know exactly what to do if money is fraudulently transferred',
    ],
    sections: [
      {
        title: 'The UPI Revolution and Its Risks',
        content: `India's Unified Payments Interface (UPI) processed over 100 billion transactions in 2023, making digital payments mainstream across income levels and age groups. With this scale comes significant criminal opportunity.

UPI fraud in India has grown rapidly. Common fraud types include fake payment requests, QR code scams, screen sharing scams, and social engineering calls impersonating bank staff.

The fundamental principle of UPI that you must remember: **To receive money, you never need to enter your UPI PIN.** Your PIN is only required when you are sending money. Any request to "enter your PIN to receive a refund" or "scan this QR code to get money" is a scam, every time, without exception.

UPI apps like GPAY, PhonePe, Paytm, and banking apps are secure when used correctly. The weaknesses are always human: being tricked into authorising payments or sharing credentials.`,
        warnings: ['You NEVER enter your UPI PIN to receive money. If someone asks you to, it is 100% a scam.'],
      },
      {
        title: 'Common UPI and Payment Scams',
        content: `**Collect Request Scams**: The scammer sends you a "collect" or "payment request" through UPI. These look like incoming payment notifications, but accepting them causes money to leave your account. Read every UPI notification carefully — "Pay ₹500" means you are sending money.

**Fake QR Code Scams**: Someone selling something online sends you a QR code to "receive your payment." Scanning a QR code and entering your PIN sends money — it doesn't receive it. The scammer receives your money.

**Screen Sharing Scams**: A caller claiming to be from customer support asks you to install AnyDesk, TeamViewer, or QuickSupport for "technical help." Once installed, they watch your screen, capture your banking details, and drain accounts. Never install remote access apps on a stranger's request.

**Fake Helpline Numbers**: Internet searches for bank or payment app helplines may show fraudulent numbers in paid ads. These fake agents capture your credentials. Find official numbers only on the back of your card or on the bank's official website.

**Lottery and Prize Fraud**: "You've won ₹2 lakhs! Share your bank details to receive the transfer." Legitimate prizes don't require your banking credentials in advance.`,
        donts: [
          "Don't scan QR codes sent by strangers to 'receive' money",
          "Don't install remote access apps (AnyDesk, TeamViewer) for support calls",
          "Don't share your UPI PIN, card number, CVV, or OTP with anyone",
          "Don't use Google to find customer care numbers — use the official website or card",
        ],
      },
      {
        title: 'Securing Your Mobile Banking',
        content: `Your mobile banking and UPI apps are only as secure as your phone. Take these steps:

**Lock your apps**: Enable fingerprint or PIN lock within each banking app, separately from your phone's lock screen. Most banking apps offer this in Settings → Security.

**Use strong, unique PINs**: Your UPI PIN should not be your date of birth, mobile number, or a simple sequence like 1234 or 0000. It should be something only you know.

**Transaction limits**: Set daily transfer limits in your banking app that reflect your actual needs. A lower limit reduces potential losses from fraud.

**SMS alerts**: Ensure transaction SMS alerts are enabled for all accounts. Debit alerts let you spot unauthorised transactions immediately.

**Registered mobile number**: Keep your bank's registered mobile number updated. This is where OTPs and transaction alerts go. If you change your SIM, update this at the bank.

**SIM swap awareness**: If your SIM suddenly stops working and you haven't changed operators, contact your telecom provider immediately — this could indicate SIM swap fraud where criminals have transferred your number to a new SIM they control.`,
        tips: [
          'Check your bank statement weekly, not just when you notice something wrong.',
          'Enable "Pay Later" or credit features only if you understand the repayment terms completely.',
        ],
      },
      {
        title: 'If Fraud Happens: Act in the First Hour',
        content: `Speed is critical. Banks and payment processors can sometimes reverse fraudulent transactions if reported within minutes, but this window closes quickly.

**Step 1 — Call 1930 immediately.** This is the National Cyber Crime Financial Fraud Helpline, operational 24/7. Have your transaction ID, amount, and the recipient UPI ID ready. The helpline can initiate a fraud flag that prevents the fraudster from withdrawing the money.

**Step 2 — Block your cards and account.** Call your bank's 24/7 emergency number (printed on the back of your card) and ask them to freeze your account or block the card.

**Step 3 — File on cybercrime.gov.in.** Register a complaint with all details: transaction time, amount, UPI IDs involved, and screenshots of any communications.

**Step 4 — Preserve evidence.** Do not delete any messages, calls, or apps that might be evidence. Take screenshots of everything.

**Step 5 — File a local police complaint.** Visit your nearest police station and file an FIR. Banks sometimes require a copy of the FIR to process refund claims.

Don't feel embarrassed — these scams are sophisticated and affect people of all backgrounds. Reporting helps build data to catch the criminals.`,
        warnings: ['Report financial fraud to 1930 within the first hour for the best chance of recovery.'],
      },
    ],
    keyTakeaways: [
      'You NEVER need your UPI PIN to receive money — requests to enter it are always scams',
      'Never install remote-access apps for customer support calls',
      'Only find helpline numbers on the official bank website or card — not search engines',
      'Report financial fraud immediately to 1930 (available 24/7)',
      'File a formal complaint at cybercrime.gov.in after any fraud',
    ],
    relatedQuizId: 'digital-payments',
  },

  {
    id: 'safe-browsing',
    slug: 'safe-browsing',
    icon: '🌐',
    title: 'Safe Browsing & Public Wi-Fi',
    description: 'Browse securely, identify safe websites, and understand the dangers of public Wi-Fi.',
    category: 'Security Fundamentals',
    difficulty: 'Beginner',
    estimatedMinutes: 6,
    tagColor: 'bg-blue-100 text-blue-700',
    objectives: [
      'Identify secure websites using HTTPS and other signals',
      'Understand the risks of public Wi-Fi',
      'Avoid malicious downloads and browser extensions',
      'Configure browser security settings',
    ],
    sections: [
      {
        title: 'HTTPS: The Lock Icon',
        content: `When you visit a website, your browser shows either a lock icon (🔒) or a warning in the address bar. This indicates whether the connection is encrypted using HTTPS (HyperText Transfer Protocol Secure).

HTTPS means data between your browser and the website is encrypted. Without it, anyone on the same network — at a café, airport, or hotel — can see exactly what you are sending and receiving. This includes your login credentials and personal information.

What HTTPS does NOT guarantee: it does not mean the website is legitimate. Phishing websites also use HTTPS now. A padlock means the connection is encrypted, not that the destination is trustworthy.

Always look at the full domain name in the address bar. For important websites, verify: sbi.co.in is correct; sbi-secure.tk is not. Indian government sites always end in .gov.in. Banks use their official domains (hdfcbank.com, icicibank.com) — not variations.

Modern browsers like Chrome and Firefox warn you when a site is not using HTTPS. Treat these warnings seriously — click "Back to safety" unless you are absolutely certain the site is legitimate.`,
        dos: ['Always check the full URL before entering any personal information or passwords'],
      },
      {
        title: 'The Danger of Public Wi-Fi',
        content: `Free Wi-Fi at airports, cafés, hotels, and malls is convenient — and risky. When you connect to a public network, you share it with every other person connected to it. Without additional protection, a knowledgeable person on the same network can intercept your traffic.

**What attackers can do on public Wi-Fi:**
• Intercept unencrypted communications
• Create a fake "evil twin" Wi-Fi hotspot with a name like "Starbucks_Free_WiFi" that looks legitimate
• Conduct man-in-the-middle attacks, positioning themselves between you and websites you visit

**Rules for public Wi-Fi:**
• Never conduct banking transactions or enter passwords on public Wi-Fi
• Prefer your mobile data connection (4G/5G) for sensitive activities
• If you must use public Wi-Fi, use a VPN (Virtual Private Network) which encrypts your entire connection
• Disable automatic Wi-Fi connection in your phone settings — your phone should not connect to networks without your explicit approval
• Forget networks you no longer use: Settings → Wi-Fi → [Network] → Forget`,
        warnings: [
          'Never do banking, shopping, or login to important accounts on public Wi-Fi without a VPN.',
        ],
      },
      {
        title: 'Safe Downloads and Extensions',
        content: `Malicious software (malware) is frequently distributed through disguised downloads. A file that appears to be a movie, PDF, or software installer can contain viruses, ransomware, or spyware.

**Safe download practices:**
• Only download software from official sources: the developer's own website, the Google Play Store, or Apple App Store
• Be very cautious of files shared via WhatsApp, email, or unknown websites — verify the sender before opening
• PDF files from unknown sources can contain malicious code — open them in Google Drive's PDF viewer rather than a local application
• Avoid downloading pirated software, movies, or books — these are common malware vectors

**Browser extensions:**
Browser extensions have access to everything you do in your browser. Install only extensions from developers you trust, with many reputable reviews. Remove extensions you no longer use.

Safe, reputable extensions: uBlock Origin (ad/tracker blocker), Bitwarden (password manager), HTTPS Everywhere (forces HTTPS connections). Avoid any extension that offers to "speed up your browser" or "clean your computer" for free — these are frequently spyware.`,
        donts: [
          "Don't download software from random websites — use official sources only",
          "Don't open file attachments from people you don't recognise",
          "Don't install browser extensions with few reviews or from unknown developers",
        ],
      },
    ],
    keyTakeaways: [
      'HTTPS encrypts your connection but does not guarantee the website is legitimate',
      'Avoid banking and sensitive activities on public Wi-Fi — use mobile data instead',
      'Only download software from official sources and app stores',
      'Review and remove browser extensions you no longer trust or need',
      'Disable automatic Wi-Fi connections on your devices',
    ],
    relatedQuizId: 'safe-browsing',
  },

  {
    id: 'identity-protection',
    slug: 'identity-protection',
    icon: '🪪',
    title: 'Identity Protection',
    description: 'Protect your digital identity and learn how to respond if your information is compromised.',
    category: 'Identity',
    difficulty: 'Advanced',
    estimatedMinutes: 14,
    tagColor: 'bg-slate-100 text-slate-700',
    objectives: [
      'Understand what digital identity comprises and what can be stolen',
      'Protect sensitive documents like Aadhaar, PAN, and passports online',
      'Detect signs that your identity may have been misused',
      'Respond effectively if your identity is compromised',
    ],
    sections: [
      {
        title: 'What Is Digital Identity?',
        content: `Your digital identity is the collection of information that uniquely identifies you online. It goes far beyond a username and password.

In India, digital identity is closely tied to official documents: your Aadhaar number, PAN card, Voter ID, passport number, mobile number (linked to Aadhaar), and financial account numbers. These are the keys to your financial and legal existence.

When criminals steal identity information, they can: open bank accounts in your name, apply for loans without your knowledge, file fake tax returns to claim refunds, obtain SIM cards linked to your Aadhaar (SIM swap fraud), create fake government document copies, or commit crimes and use your identity when caught.

Identity theft is not always immediately visible. Victims often discover it months later when they receive loan default notices for loans they never took, or when their credit score drops unexpectedly.

Your digital identity also includes your behavioural patterns — your location history, purchasing habits, and health data — which are increasingly valuable to data brokers and can be misused in subtler ways.`,
      },
      {
        title: 'Protecting Your Official Documents Online',
        content: `Aadhaar, PAN, and passport details must be treated with the highest sensitivity. Once stolen, these cannot be easily changed.

**Aadhaar specific precautions:**
• Use the "Masked Aadhaar" (which hides the first 8 digits) when sharing with services that only need to verify identity — not store the number.
• Use Virtual IDs (VID) generated on the UIDAI portal (uidai.gov.in) for authentication — the VID is a temporary number that maps to your Aadhaar but can be changed.
• Lock your Aadhaar biometrics on the UIDAI portal when not actively using them. This prevents anyone from using your fingerprints to authenticate at government kiosks without your knowledge.
• Regularly check your Aadhaar authentication history on uidai.gov.in to see where your Aadhaar has been used.

**PAN Card:**
• Never share your PAN card photo with individuals for personal transactions. PAN is required for financial transactions above ₹50,000 and must be shared with banks and investment platforms — but not with private individuals.
• Monitor your PAN for misuse: file your ITR (income tax return) every year and check if there are entries you don't recognise.

**When uploading documents online:**
• Only use government portals (ending in .gov.in) or verified financial institutions
• Never email or WhatsApp your Aadhaar, PAN, or passport to strangers`,
        warnings: [
          'Lock your Aadhaar biometrics on uidai.gov.in when not in active use at government service centres.',
        ],
      },
      {
        title: 'Recognising Identity Theft',
        content: `Identity theft often goes undetected for months. Here are the warning signs:

**Financial signals:**
• Unexpected bills, loan statements, or credit card statements in your name
• Money deducted from accounts without your knowledge
• Rejection of loan applications due to poor credit history you didn't create
• Calls from collection agencies about debts you don't recognise

**Document signals:**
• You stop receiving official mail (the thief may have changed your address)
• You receive unexpected tax documents (W2s or refund notifications you didn't file)
• Official agencies contact you about activities you have no knowledge of

**Digital signals:**
• Login alerts from services you use, from locations you don't recognise
• Password reset emails you did not request
• New accounts or devices in your cloud services you didn't add
• Data breach notifications from services where you have accounts (check haveibeenpwned.com)

If you notice any of these, act immediately — time is critical in limiting the damage.`,
        tips: [
          'Check your credit report annually for free at CIBIL, Equifax, or Experian India — look for loans or credit cards you don\'t recognise.',
        ],
      },
      {
        title: 'Responding to Identity Theft',
        content: `Discovering that your identity has been stolen is alarming, but a structured response minimises the damage.

**Immediate steps (first 24 hours):**
1. Change passwords on all major accounts immediately, starting with email (which is the master key to other accounts)
2. Enable 2FA on all accounts
3. Contact your bank to freeze accounts and dispute fraudulent transactions
4. File a complaint at cybercrime.gov.in
5. For Aadhaar misuse: call 1947 (UIDAI helpline) and file a complaint at help@uidai.gov.in

**Within the first week:**
6. File a First Information Report (FIR) at your local police station — many institutions require this for insurance and reversal processes
7. Notify your credit bureau: contact CIBIL (1800-200-6655) to place a fraud alert on your credit file, making it harder for anyone to open new credit in your name
8. Check all your linked mobile numbers, email addresses, and addresses registered with banks and change any that were modified without your knowledge

**Document everything:** Create a detailed log of every conversation (name, date, time, what was said), every complaint number, and every document submitted.

Recovery can take months or years in complex cases. Free legal aid is available through the District Legal Services Authority (DLSA) in your district.`,
        dos: [
          'File an FIR at the police station — many processes require it',
          'Place a fraud alert with CIBIL to prevent new fraudulent credit',
          'Check all accounts linked to your email for unauthorised changes',
          'Monitor your credit report for the next 12 months after any identity theft',
        ],
      },
    ],
    keyTakeaways: [
      'Use Masked Aadhaar and Virtual IDs rather than sharing your full Aadhaar number',
      'Lock your Aadhaar biometrics on uidai.gov.in when not in use',
      'Monitor your credit report and bank statements regularly for signs of misuse',
      'Report identity theft to 1947 (UIDAI), cybercrime.gov.in, and local police',
      'Check haveibeenpwned.com to see if your email appeared in known data breaches',
    ],
    relatedQuizId: 'identity-protection',
  },

  {
    id: 'misinformation',
    slug: 'misinformation',
    icon: '📰',
    title: 'Misinformation & Fake News',
    description: 'Learn to verify news and information before acting on it or sharing it with others.',
    category: 'Media Literacy',
    difficulty: 'Intermediate',
    estimatedMinutes: 10,
    tagColor: 'bg-orange-100 text-orange-700',
    objectives: [
      'Understand how misinformation spreads and why people believe it',
      'Use fact-checking tools to verify claims',
      'Identify manipulated images and videos',
      'Build habits that reduce misinformation spread',
    ],
    sections: [
      {
        title: 'The Misinformation Ecosystem',
        content: `Misinformation — false or inaccurate information — has existed throughout history. What has changed is the speed and scale at which it spreads. A false WhatsApp forward can reach millions of people in hours, long before any correction.

India is one of the world's most affected countries. With hundreds of millions of WhatsApp users, misinformation spreads rapidly through family groups and community channels. India has also experienced real-world violence triggered by viral false information — making this a genuine public safety issue.

Misinformation takes several forms:
• **Disinformation**: Deliberately false information created to deceive
• **Misinformation**: False information shared without intent to deceive (the person believes it)
• **Malinformation**: True information shared with intent to harm (selective leaking, doxing)
• **Deepfakes**: Artificially generated or manipulated images, audio, and video

Understanding why people believe and share misinformation helps: emotional content spreads faster, repeated exposure creates familiarity that feels like truth (the "illusory truth effect"), and confirmation bias makes us accept information that fits our existing beliefs.`,
      },
      {
        title: 'How to Fact-Check',
        content: `Before sharing any news, claim, or image — especially in family WhatsApp groups — spend 60 seconds checking it. Here's how.

**Established Indian fact-checkers:**
• **Alt News** (altnews.in) — India's most prominent fact-checking site, covers politics, health, viral claims
• **Boom** (boomlive.in) — specialises in viral misinformation in multiple Indian languages
• **Factly** (factly.in) — data journalism and fact-checking
• **The Quint's WebQoof** — factchecks of viral claims
• **Vishvas News** (vishvasnews.com) — fact-checking in multiple Indian languages

**International fact-checkers:**
• Snopes, PolitiFact, AFP Fact Check

**For images:**
1. Right-click any image → "Search image with Google" (or use Google Lens on mobile)
2. Check if the image is old and being recycled in a new false context
3. Use TinEye (tineye.com) for reverse image search

**For videos:**
• Use InVID/WeVerify browser extension to break videos into frames and reverse-search them
• Check the YouTube Data Viewer (at citizenevidence.amnestyusa.org) for upload dates

**The SIFT method:** Stop, Investigate the source, Find better coverage, Trace claims, images, and quotes to their original context.`,
        tips: [
          'If you can\'t verify something in 2 minutes, don\'t share it. Silence is better than spreading false information.',
        ],
      },
      {
        title: 'Spotting Manipulated Media',
        content: `With AI image generators and video editing tools increasingly accessible, visual "proof" is no longer reliable. Learning to spot manipulation is an essential 21st century skill.

**Signs of a manipulated image:**
• Unnatural lighting that doesn't match across the image
• Blurry edges around people or objects that don't match the background sharpness
• Reflections that don't add up (look at eyes, glasses, water surfaces)
• Text in the image that appears blurry or in a different font
• Metadata inconsistencies — the EXIF data embedded in image files can reveal the original creation date and location

**Deepfake video signs:**
• Unnatural eye blinking patterns
• Inconsistent skin tone, particularly at the edges of the face
• Audio that slightly doesn't sync with lip movements
• Blurry or morphing areas around the hairline and ears
• Unusual lighting consistency across the face

**Verification tools:**
• FotoForensics (fotoforensics.com) analyses image metadata and inconsistencies
• Deepware Scanner can analyse videos for deepfake indicators
• Google Fact Check Tools (toolbox.google.com/factcheck) aggregates fact-checks from verified organisations

Don't share any video of a public figure making extreme statements without independent verification from established news sources.`,
        warnings: [
          'Even AI detection tools are not 100% accurate. Use multiple methods and err on the side of not sharing unverified dramatic content.',
        ],
      },
      {
        title: 'Building Good Information Habits',
        content: `Long-term resistance to misinformation comes from building daily habits, not just checking individual facts.

**Diversify your news sources**: Read at least two or three news outlets with different perspectives. If the same story appears only in one outlet, treat it with more scepticism. Major verified news organisations include The Hindu, Indian Express, NDTV, and regional language papers of record.

**Slow down before sharing**: The impulse to share immediately — especially content that makes you feel outraged, shocked, or delighted — is exactly when misinformation is most likely to spread. Pause for 30 seconds and ask: Do I know this is true?

**Understand emotional manipulation**: Misinformation is often designed to trigger strong emotions. If a piece of content makes you feel intense anger, fear, or triumph, that's a signal to verify it more carefully, not less.

**Talk to your family and community**: Sharing fact-checking practices within your WhatsApp family groups is one of the most effective ways to reduce misinformation locally. If you spot a false forward in a group, politely share the fact-check without attacking the person who shared it.

**Acknowledge uncertainty**: It's okay to say "I don't know." Sharing information with the caveat "this needs to be verified" is far better than spreading unverified claims as fact.`,
        dos: [
          'Use alt.news, boomlive.in, or factly.in to check Indian viral claims',
          'Reverse-search images before sharing them as evidence',
          'Acknowledge and correct your own past shares if they turn out to be false',
          'Subscribe to verified news notifications rather than relying on WhatsApp forwards',
        ],
      },
    ],
    keyTakeaways: [
      'Misinformation in India spreads primarily through WhatsApp — verify before forwarding',
      'Use Indian fact-checkers: Alt News, Boom, Factly, Vishvas News',
      'Reverse image search is the fastest way to check if an image is being misused',
      'Strong emotional reactions to content are a signal to verify it more carefully',
      'Sharing false information — even without intent — contributes to real-world harm',
    ],
    relatedQuizId: 'misinformation',
  },

  {
    id: 'smartphone-security',
    slug: 'smartphone-security',
    icon: '📱',
    title: 'Smartphone Security',
    description: 'Secure your Android or iPhone against common threats and privacy risks.',
    category: 'Security Fundamentals',
    difficulty: 'Intermediate',
    estimatedMinutes: 8,
    tagColor: 'bg-blue-100 text-blue-700',
    objectives: [
      'Configure essential security settings on your smartphone',
      'Keep apps and operating systems updated safely',
      'Identify and remove potentially dangerous apps',
      'Protect your phone if it is lost or stolen',
    ],
    sections: [
      {
        title: 'Your Phone Is Your Identity',
        content: `Your smartphone holds more sensitive information than any other device you own. It has access to your bank accounts, your email, your social media, your photos, your contacts, your location history, and your documents. For most Indians, it is also the primary authentication device — OTPs and 2FA codes arrive on your phone.

Losing your phone, or having it compromised by malware, is therefore a major security event that can have cascading consequences across your entire digital life.

The good news is that both Android and iPhone have strong built-in security features — but many are disabled by default or require active configuration. Indian users in particular should be aware that Android devices (which have higher market share in India) show more variation in security update schedules depending on the manufacturer, with budget devices often receiving fewer and less timely updates.`,
      },
      {
        title: 'Essential Security Settings',
        content: `**Screen Lock**: Enable a strong lock — at minimum a 6-digit PIN, ideally a passphrase or fingerprint + PIN backup. Avoid 4-digit PINs (10,000 combinations, easily cracked) and swipe patterns (oil traces on the screen often reveal the pattern).

**Automatic Updates**: Enable automatic OS and app updates. Security patches fix vulnerabilities that attackers actively exploit. Settings → System → Software Update (Android) or Settings → General → Software Update (iPhone).

**Find My Device**: Enable this so you can locate, lock, or wipe your phone if lost. Android: Settings → Security → Find My Device. iPhone: Settings → [Your Name] → Find My → Find My iPhone.

**Encryption**: Modern iPhones are encrypted by default. Android phones from Android 10+ should also be encrypted by default — verify this under Settings → Security → Encryption & Credentials.

**USB Debug Mode**: Keep this disabled (Settings → Developer Options) unless you specifically need it for development. Enabled debug mode allows a connected computer to access files on your phone.

**Lock screen notifications**: Consider showing "sensitive notifications" on the lock screen only when unlocked — this prevents someone who finds your phone from seeing your OTPs without unlocking it.`,
        dos: [
          'Enable automatic security updates',
          'Use fingerprint + PIN (not just fingerprint alone)',
          'Enable Find My Device / Find My iPhone immediately',
        ],
      },
      {
        title: 'App Safety and the Play Store',
        content: `The Google Play Store and Apple App Store both vet apps, but malicious apps still occasionally appear. Here's how to minimise risk.

**Install only from official stores.** On Android, the ability to "sideload" apps from outside the Play Store (called "Unknown Sources") is both useful and dangerous. Only enable it temporarily for specific trusted applications, then disable it immediately after. Many UPI fraud cases in India have involved victims being tricked into installing fake apps outside the Play Store.

**Check app permissions before installing.** An app's permission requirements should make intuitive sense. A calculator that requests contact access is suspicious. Review permissions before installation.

**Check app developer and reviews.** Be sceptical of apps with very few reviews, recently published dates, or developer names that don't match the company they claim to represent. "HDFC Bank Ltd." is likely legitimate; "HDFC Bank Services LLC" is probably not.

**Uninstall apps you no longer use.** Every installed app is a potential entry point. Regularly audit your app list.

**Beware of RATs (Remote Access Trojans).** Fake tech support will sometimes direct victims to install apps like AnyDesk, TeamViewer, or Quick Support — legitimate remote access tools that become dangerous when a scammer has the connection ID. Never install these at someone else's request.`,
        warnings: [
          'Never install APK files sent via WhatsApp, SMS, or email — these are frequently malware.',
        ],
      },
      {
        title: 'If Your Phone Is Lost or Stolen',
        content: `Acting quickly when a phone is lost or stolen can prevent significant harm.

**Within minutes:**
1. Use Find My Device (Android) or Find My (iPhone) from another device or computer to locate the phone, play a sound, or remotely lock it.
2. Call your telecom provider to block the SIM card — this prevents fraudulent OTP interception.

**Within the hour:**
3. Change the passwords for your most critical accounts — email, banking, UPI — from another device.
4. Sign out of all sessions on major accounts: Google (security.google.com → Manage Devices), Apple ID, Facebook, WhatsApp Web.
5. Contact your bank to temporarily freeze accounts and block UPI.
6. File a police complaint — you will need this for insurance claims and for the telecoms provider to permanently block the IMEI (the phone's unique hardware ID, found on the original box or in Settings → About Phone).

**Remote wipe:** If you cannot recover the phone and have confirmed it is stolen, use Find My Device / Find My to perform a factory reset. This permanently erases all data, including photos, so only do this if recovery is hopeless.

Take a photo of your IMEI number right now and save it in cloud notes — you'll need it for the police complaint.`,
        tips: ['Find your IMEI: dial *#06# on your Android phone. Save the number somewhere safe.'],
      },
    ],
    keyTakeaways: [
      'Enable screen lock, Find My Device, and automatic updates immediately',
      'Only install apps from official app stores — never from WhatsApp forwards',
      'Uninstall apps you don\'t use and review permissions for apps you keep',
      'If your phone is lost, block the SIM and change critical passwords within the hour',
      'Save your IMEI number — you\'ll need it for police and insurance',
    ],
    relatedQuizId: 'smartphone-security',
  },
]

export function getModuleBySlug(slug) {
  return modules.find(m => m.slug === slug)
}

export function getModuleById(id) {
  return modules.find(m => m.id === id)
}
