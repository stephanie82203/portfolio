const EXPERIENCES = {
  intro: "I've worked part time in hospitality since 2022, while also completing internships in supply chain and business development and, most recently, working on the 2026 Census at Statistics Canada. On paper, these jobs don't have much in common. In practice, they taught me the same things an analyst needs: explaining things clearly to people who aren't technical, paying close attention to detail, staying calm when it gets busy, and noticing problems worth fixing. In three of these roles, I ended up building something on my own initiative: an FAQ tracker for the census team, a sales dashboard for the restaurant, and cleaner client records for a sales team.",

  items: [
    {
      role: "Census Helpline Operator",
      company: "Statistics Canada",
      location: "Ottawa, ON · Remote",
      start: "2026-04",
      end: "2026-08",
      description: [
        "My main objective was to help Canadian residents complete the census questionnaire and make sure every resident in Canada was counted. The census only happens every five years, and its results shape more than government policy. Local communities and organizations use the same data to decide where services and projects are needed most.",
        "Over five months, I resolved 1,500+ calls from residents, guiding them through census procedures and the online questionnaire while following Statistics Canada's protocols. I investigated dwelling discrepancies, corrected address records, and logged outcome codes in internal databases, all while following federal privacy law. For every call, I documented the interaction using our internal software (iceBar), the Census Knowledge Base, and Microsoft Word, so if a case needed to be escalated, the next person had everything they needed.",
        "For respondents who lived in rural areas with nonstandard mailing services, lived outside Canada, or had accessibility needs, I made quick judgments on how best to accommodate them and make sure they had full access to the census. Timing on every call was really important. The census is for all residents, and people made time to call us for help, so I made sure the solution was worth the time they gave up.",
        "During low call volume periods, I made outbound callbacks in Mandarin and Cantonese for respondents who needed language support. I also passed a data entry test, so I was given the task of reading illegible handwriting on paper questionnaires and entering accurate information into the Census database, following established protocols.",
      ],
      tools: ["Customer Service & Public Inquiries", "Cross-Cultural Communication", "Power Automate", "Microsoft Tools (Lists, Word, Excel)"],
      initiative: [
        "After my first two weeks, I realized our teams were running into a lot of respondent situations that were never covered in training. When that happened, we usually put respondents on hold to look for an available supervisor, asked our own team supervisor, or told them to call back later. Some respondents were already frustrated by the long wait, and sometimes the supervisor didn't know the answer either and had to ask higher management.",
        "Given the team structure (one supervisor for at least 15 agents, one manager for at least 10 supervisors, and so on) and how unpredictable respondents' situations were, I decided to build a frequently asked questions tracking system using Microsoft Lists and Power Automate. It detected group chat messages starting with &quot;Q:&quot;, logged them to a central Microsoft Lists database, and automatically notified people when a response was posted. This way, no one missed an answer, and if a similar question came up later, people could check the database before asking. If someone thought of a hypothetical situation outside of calls, anyone who knew the answer could respond without waiting for it to actually happen.",
        "By the second month, the tracker held about 18 answered questions. We put respondents on hold less often, management answered questions that had been missed before, and supervisors got fewer repeat questions. By the end of my contract, it held about 40 answered questions.",
        "I also noticed that my supervisor was overwhelmed with administrative tasks, like responding to emails, reminding us about breaks (we didn't always have a fixed break schedule), and alerting us to updates from higher management. We did receive those updates, but while we were on calls, our monitors were filled with the database, the knowledge base, and the other tools we needed, so we often missed the announcements. Since I was already using Power Automate for the FAQ tracker, I suggested automating these tasks and set up workflows that sent scheduled break reminders to the team chat and alerted the team to emails from senior management. That way, no one missed an important message.",
        "I also volunteered to lead daily morning team meetings to share updates and management directives, review call metrics and KPIs, and answer team questions.",
      ],
      journey: [
        "Volunteering and presenting at team and organization meetings gave me hands-on experience I wouldn't have expected from the job description when I applied, so I really appreciate the opportunities my supervisor gave me. I gained leadership experience and technical skills, as well as presentation skills from presenting my FAQ tracker.",
        "Communicating with respondents was the hardest part. Every respondent had their own culture, religion, and health situation, so I had to deliver messages and solutions properly without offending anyone. Learning from my mistakes helped a lot with similar situations later on. As a representative of the census and Statistics Canada, I had to show professional knowledge and appropriate sympathy to help people. Staying patient and calm through unexpected situations is the biggest thing I learned from this work. These conversations also helped me understand how systems work in different provinces and communities. My Canadian knowledge got an upgrade.",
        "This job also changed how I look at data. In class, I mostly worked with clean datasets. Here, I saw where the data actually comes from: dwelling records that didn't match, address errors, and handwriting that was hard to read. Now when I analyze a dataset, I think about how it was collected and where errors could have slipped in.",
        "Overall, my biggest challenges came at the start. I didn't have enough Canadian knowledge yet (like how rural addresses and general delivery work), and there wasn't enough support during high call volume. The first one got better with every call. The second one is what led me to build the FAQ tracker.",
      ],
    },

    {
      role: "Bartender / Server",
      company: "Izakaya Shingen",
      location: "Ottawa, ON",
      start: "2022-09",
      end: "present",
      description: [
        "Izakaya Shingen is one of Ottawa's two main Japanese izakayas, with an interior and drink menu close to what you'd find in Japan. As a bartender and server, I handle all daily front-of-house operations at the same time. I take orders, explain the menu, make drinks, run food, and guide guests through substitutions and allergy concerns. During peak hours, I work closely with the kitchen, manage phone calls and reservations, host guests, and adjust seating to fit in as many customers as possible. When a situation with a guest gets difficult, I handle it calmly and professionally. I also manage takeout orders by checking food quality, confirming special requests, and making sure every order is packed completely and correctly. On top of that, I train new staff.",
      ],
      tools: ["Customer Service","Hospitality","PostgreSQL","Power BI","Point-of-Sale (POS) systems"],
      initiative: [
        "Outside of service, I support the owner with the POS system by updating prices, changing system settings, and maintaining employee records. When the restaurant is quiet, I go through the POS to catch any errors we missed.",
        "When guests ask for recommendations, we usually suggest items based on their preferences, our most popular dishes, and specials that are hard to find elsewhere. But returning customers kept asking for recommendations too, and some guests wanted something affordable but still special. At the same time, some menu items weren't selling well, and we often had too much stock for them. I wanted to bring these problems to my boss with evidence, and I also wanted real practice with my analysis skills, so I told him my plan and got his permission.",
        "I exported the sales data from the POS, cleaned it, and stored it in PostgreSQL so I could analyze how food and drinks were performing, then connected it directly to Power BI. My boss had also been wondering how drink sales were doing, which matters a lot since izakayas are known for their Japanese drinks. Over two seasons, we ran A/B tests on promotions that let people try Japanese drinks without buying a whole bottle, switching between sake bombs and sake flights every two weeks to see how customers responded.",
        "I shared what I found with the owner to support menu and pricing decisions, and average drink order value went up by 10%. With data behind them, our recommendations got better too, with combinations for different tastes and budgets, like salty, sweet, or affordable. The owner also replaced the lowest-selling items with new dishes. Before that, when those ingredients were close to expiring, the staff usually ended up finishing them ourselves, so now less food goes to waste.",
        "To make tracking easier and avoid pulling reports from the POS by hand, I built a Power BI dashboard that lets the owner view and compare quarterly sales and item performance anytime.",
      ],
      journey: [
        "This job taught me how to handle everything at once during rush hour and decide what comes first. Paying close attention to details is what makes that possible, because you can't prioritize well if you miss things.",
        "The fun part is talking to customers. I get to learn about different backgrounds, cultures, and interests, and these conversations have definitely improved my communication skills. I read each table's vibe, try to connect with them, and make sure they feel at home while they enjoy their food.",
        "Even though I'm a server, working well with the back of house is just as important. The kitchen can't see what's happening out front, so they can feel lost while preparing food. We have to make sure there's enough food for the day and prep extra of the most ordered items. When the kitchen is busy and we aren't, I help out by sorting dirty dishes, putting away clean ones, and hyping them up. None of this is part of my job, but I enjoy helping.",
        "Getting close to my boss gave me the chance to get hands-on practice, which I really appreciate. He built and runs several restaurants from scratch and does almost everything himself: taxes, menus, ordering, and even decorations. I've learned a lot from him, especially about business mindset.",
        "One thing he shared has stuck with me. The core of running a restaurant isn't the rent, ingredient prices, or perfecting the taste of every dish. It's understanding why customers buy. You can't just sell a dish because it's rare in the area.",
        "1. <strong>Find what customers need and match it to the right occasion.</strong>",
        "Don't describe your food in general terms or state what everyone already knows. Speak to the people you're actually serving. My boss hired a Japanese chef to design the menu and hand-built the interior to feel as close to a real local izakaya in Japan as possible. Since we're in Centretown with lots of offices nearby, it works well for business dinners: a decent dining experience at a moderate price, in a setting that's casual but slightly formal. The soft lighting and atmosphere also make it great for dates, and the special dishes are perfect for photos.",
        "2. <strong>Make choosing easy and give customers worry-free options.</strong>",
        "This is what our recommendation combinations do. Instead of reading the whole menu, a guest can just ask for something salty, sweet, or affordable.",
        "3. <strong>Go beyond taste and connect with how people feel.</strong>",
        "A hot bowl of food after a busy day to shake off the fatigue, or a treat on the weekend after a hard week. A bowl of carefully cooked noodles can soothe a hectic day.",
        "This logic works in every industry. You have to deeply understand what customers need instead of just selling a product because you want to hit a KPI or because your company told you to. And you shouldn't give up on a product just because not many people are buying it. You have to put yourself in their shoes. That's exactly what my sales analysis was trying to do: use the data to find out what our customers actually wanted.",
      ],
    },

    {
      role: "Business Development & Sales Intern",
      company: "Motley Institute of Business & Technology",
      location: "Remote",
      start: "2023-10",
      end: "2024-02",
      description: [
        "MIBT is an institution in Lusaka, Zambia, that offers education in business, technology, and real estate and construction. It also partners with the AfCFTA Young Entrepreneurs Federation, which supports young entrepreneurs. As a Business Development and Sales Intern, I mainly supported client outreach, proposal preparation, and internal coordination.",
        "To find new partners, I looked at sales and marketing engagement data using Excel and our social media accounts: replies to our posts, website visits, past inquiries, which organizations engaged with our LinkedIn and Facebook posts, and which ones followed us. My focus was sponsors and organizations that needed training for their employees. I looked for organizations whose goals were similar to MIBT's and whose own posts showed real passion for what they do. For each one, I listed why it was a good fit and presented it to my manager, who made the final decision. This helped surface a few enterprise-level opportunities, and through outreach and follow-ups, it led to one new partnership and a stronger relationship with an existing partner.",
        "For existing clients, I sent follow-up emails and checked in regularly, which contributed to an improvement in client retention. I also worked with senior team members on more than three tailored proposals. Before drafting, I made sure we had everything covered: the deal, what we offered, and what the client wanted. I sent the drafts to partners to make sure nothing was missing, then the senior team adjusted and finalized them with managers from both sides. I joined all of those meetings and shared my feedback.",
        "Internally, I reorganized and standardized client and outreach records in Excel. The records were spread across several files and had duplicate contacts, including different companies with the same name but completely different businesses, like a community organization and a construction company. Cleaning this up made our data much more accurate.",
        "I also helped make reporting faster. The teams already had a shared document for progress updates, but it wasn't well organized, so I cleaned it up and gave it a clear structure. Before, each team held its own meeting every day before the main meeting. Once their progress and ideas were written in a document management could easily follow, teams only needed their own meetings every couple of days. Before the main meeting, I could check each team's progress in the document, so we didn't have to wait for every team meeting to finish. This cut the sales team's reporting time by about 2.5 hours per week.",
        "Every day, I joined the main meeting with all departments, collected updates, and summarized them for the CEO, so he had a clear view of what was happening across the company and where support was needed. This included updates from the departments preparing for the Africa FutureTech Summit 2025.",
      ],
      tools: ["Communication","Proposal Development","Microsoft Excel"],
      journey: [
        "This was a remote job, so I worked with people across different time zones and cultural backgrounds. The time difference was the biggest challenge. My manager and I often weren't online at the same time, so I made sure to write down everything I had done and planned to do, and he could always see my progress.",
        "My coworkers were mostly from Canada, the UK, and Zambia, and learning from their perspectives helped me think outside the box. I also got to see how entrepreneurs in Africa communicate and work with each other. Their style was pretty straightforward, so I picked it up quickly.",
        "At the time, AI tools existed but weren't widely used yet, and I got to see how the company ran AI webinars to help local people learn them step by step. Summarizing updates from every department for the CEO also taught me how to break down complex information and present it simply.",
        "Right before I started, the company had hosted the biggest beauty pageant in Africa, which shows how well known it is in the region. Since leaving, I've stayed in the group chat with my old coworkers and the CEO, and I still follow their events.",
        ],
    },

    {
      role: "Supply Chain Intern",
      company: "Westcoast Naturals",
      location: "Vancouver, BC · On-site",
      start: "2022-05",
      end: "2022-09",
      description: [
        "At Westcoast Naturals, I worked as a Supply Chain Intern under the supply chain manager, supporting daily purchasing and inventory operations in a manufacturing environment. I collected and consolidated purchase requests from different departments so orders could be placed more efficiently and materials wouldn't be delayed. I worked closely with more than ten suppliers, comparing prices, finding new suppliers, and following up on orders. Some new suppliers offered bundles, so we could buy two ingredients from one supplier instead of two, and some gave us discounts as a loyal customer. Compared to what we paid before, this reduced material costs by about 15% on average. I also worked directly with the purchaser and sometimes went along to receive or pick up supplies, which gave me hands-on experience with how materials move through the supply chain.",
        "I tracked inventory levels and vendor information in Excel and used Power Query (M) to automatically remove duplicate and empty entries every time the data refreshed. This reduced ordering errors and kept the supply flow stable, even during busy periods, maintaining about 98% availability for required materials. A large part of my day involved coordinating over email, updating records, and keeping managers informed so production decisions could be made on time.",
      ],
      tools: ["Inventory & Vendor Management", "Cross-Departmental Coordination", "Microsoft Excel"],
      journey: [
        "Working at a Canadian company showed me what a Canadian workplace looks like and what to expect. My biggest challenge was that I didn't know much about health supplements or supply chain. But I grew up around business. My family and relatives ran a hot pot restaurant and a small local convenience store, and I watched how they checked stock before reordering, compared suppliers, negotiated prices, kept track of imports and shipping containers, and dealt with late shipments and customs delays.",
        "I brought that experience with me, and in my own time, I taught myself the professional terms I was missing. I wrote all my questions in a Word document so I could ask my mentor when he had time. This helped a lot when negotiating with vendors and finding the right ones.",
        "This position isn't only about buying ingredients for the supplement lab and shipping the final product to customers. It's at the core of the whole company, because it uses skills from every department: communication like sales (talking to vendors), and tracking and prioritizing like admin (making sure every department gets what it needs on time).",
      ],
    },

    {
      role: "Real Estate Agent Assistant",
      company: "Century 21 Q Power",
      location: "Hong Kong · Remote",
      start: "2023-04",
      end: "2023-08",
      description: [
        "I worked part time as an assistant to a real estate agent at Century 21 Q Power, mostly supporting administrative and communication tasks. I translated and proofread real estate documents from Chinese to English so international clients could understand their contracts and listings. I also helped tailor lease agreements and supporting documents in English.",
        "On top of that, I organized property listings in Excel, uploaded listings to the company website, and helped make simple YouTube content to promote properties. The work was very practical and task-based, and it showed me how real estate transactions are handled behind the scenes, especially when working with clients from different language backgrounds.",
      ],
      tools: ["Document Translation & Proofreading","Client Communication","Microsoft Excel","Video Editing"],
      journey: [
        "This was a side job, but it really improved my English, especially my speaking and writing. I learned how to use professional English and how to write cold emails. I sent potential clients listings that matched what they were looking for, and checked in with past clients, especially those whose leases were almost up, to see if they were looking for a new place.",
      ],
    },

    {
      role: "Day Care Assistant",
      company: "Happy Feet Montessori Children's Centre",
      location: "Vancouver, BC · On-site",
      start: "2021-09",
      end: "2022-04",
      description: [
        "I supervised and cared for preschool-aged children, keeping the environment safe and nurturing to support their daily well-being and prevent injuries. I led educational and recreational activities, like interactive reading and guided play, to support their early social and cognitive development. I also kept clear and consistent communication with parents about their children's daily progress, and carefully followed special care instructions, including giving medication safely and sticking to specific daily routines.",
      ],
      tools: ["Early Childhood Development","Communication & Relationship Management"],
    },

  ],
};
