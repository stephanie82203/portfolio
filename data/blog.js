// post / plan
const BLOG = {
  intro: "Plans are what I'm working toward next. Posts are about my journey and what I've learned along the way.",

  items: [
    {
      id: "my-journey",
      type: "post",
      title: "Riding Every Turn to the Me I Am Today!",
      summary: "Moving across the country, adapting early, and how I finally stopped guessing and started tracking my rejections.",
      date: "Oct 2026",
      readTime: "6 min",
      tags: "Career · Statistics · Data Analytics · Resilience",
      body: [
        "I have spent a long time learning how to adapt. I came to Vancouver as an international student all the way back in Grade 10, staying with host families and managing life on my own before eventually moving to Ottawa for university. Back then, AI wasn't as advanced as it is today, and I had to rely entirely on translation apps that spat out clumsy, unnatural grammar. I was genuinely scared that people would laugh at me or look down on my English. Thankfully, the host family I stayed with—a completely French-Canadian household—encouraged me to speak as much as I could, patiently correcting my mistakes. That taught me my biggest lesson: don't be afraid to speak up. Express your ideas even if the grammar isn't perfect, as long as the core message comes through clearly.",
        { heading: "A New City" },
        "Moving from Vancouver to Ottawa for Carleton University brought a whole new kind of culture shock. Vancouver felt diverse and vibrant, but Ottawa felt much smaller and quieter, with a heavy government-town vibe. Coming into that environment while studying Statistics and Economics taught me how to observe systems closely, building a technical foundation from scratch and forcing me to grow up fast.",
        { heading: "The Reality of the Black Box" },
        "Even with that background, nothing quite prepares you for the emotional weight of modern job hunting. When you send application after application into the void and hear nothing back month after month, it starts wearing you down. You begin questioning everything. Am I good enough? Is my background too scattered? Sitting between my shifts at the izakaya, sending out resumes that seemed to disappear completely, the silence felt personal.",
        "Because I lacked traditional corporate experience right out of school, it felt like nobody wanted to give me a chance. Sometimes, heavy regret would creep in—I'd beat myself up wishing I had done co-op during my degree. But for personal reasons, doing co-op wasn't an option for me back then, so dwelling on it wouldn't pay the bills. Instead of letting the anxiety paralyze me, I had to channel that frustration into action.",
        { heading: "Treating My Job Search Like Data" },
        "When you're searching for analyst roles, everyone tells you to keep applying, but nobody tells you how to fix a broken strategy, which projects actually stand out, or what details you should put on your resume. I realized I was just guessing what employers wanted, or relying only on each job description.",
        "As someone who works with numbers every day, I figured I should treat my own job search like an analytical project. I built a tracking sheet in Power BI and Excel to log every single application, response, timeline, and requirement. Suddenly, I wasn't just spiraling in a black box anymore. I had clear metrics. I could see my response rates, my average turnaround times, and most importantly, which technical skills employers actually cared about. It gave me the clarity to stop guessing, adjust my focus, and build the exact workflows I needed, while also giving me a clear window into the actual tools and trends driving modern analyst roles.",
        { heading: "Finding Balance in the Process" },
        "Of course, staring at spreadsheets all day will drain you if you let it, so I needed physical outlets that cleared my head. Between hunting for jobs, working at the izakaya, practicing Python and SQL on Kaggle, and studying for certifications, I needed a total mental disconnect.",
        "On the tougher days, I leaned into nature. Whether I'm carving down a slope on my snowboard, feeling the rush of cold air and speed, or hiking steep trails uphill, those moments demand absolute focus. There is a specific kind of quiet that comes from breathing the crisp air on top of a mountain, taking in the view from the high ground, and feeling the static in your brain just quiet down. When you are physically pushing uphill or locked into a descent, there is no room left for rejection letters. Just the terrain, the movement, and a clear head.",
        { heading: "What Comes Next" },
        "Right now, my goal is simple: find an analyst role where I can do what I love most. I want to keep records clean, turn complex numbers into dashboards that actually make sense, and eventually move into predictive modelling, like forecasting.",
        "Statistics is a massive field because every industry needs it. I am ready to dive into different sectors, find where I fit best, and eventually head back to school for a specialized second degree. But no matter where I go next, who I am today was shaped by all of it: the early moves, the independence, the long hours, and the drive to figure out what went wrong instead of just guessing.",
      ],
    },

    {
      id: "rri-project-plan",
      type: "plan",
      title: "Canadian Recession Risk Index",
      summary: "Build a recession model to spot early signals of a Canadian economic downturn.",
      status: "In progress",
      progress: 10,
      started: "Nov 2025",
      target: "Apr 2027",
      intro: "A model that estimates the probability of Canada entering a recession in the next 3, 6, or 12 months.",
      github: "https://github.com/stephanie82203/Recession-Risk-Index",
      body: [
        "The Canadian Recession Risk Index (RRI) is a model I'm planning to build to spot early signals of an economic downturn. It will use five macroeconomic indicators to estimate the probability of Canada entering a recession within the next 1, 2, or 4 quarters (3, 6, or 12 months), producing a monthly risk score from 0 to 100%. The analysis will cover 2018 to 2025, including the pre-COVID expansion, the 2020 recession, the recovery, the high inflation period, and the period after the interest rate hikes.",
        "Traditional recession markers like GDP are lagging indicators. They're published quarterly, often revised, and only confirm a recession after months of contraction. To catch turning points earlier, the RRI uses indicators that have historically given early warnings in Canada:",
        { list: [
          "Yield curve spread",
          "Unemployment rate",
          "Manufacturing Purchasing Managers' Index (PMI)",
          "Consumer Price Index (CPI)",
          "Bank of Canada policy rate (target for the overnight rate)",
        ] },
        "Beyond early detection, the index could help investors manage risk, help economists interpret turning points, and give early signals for employment planning and fiscal and monetary policy expectations.",
        { heading: "The plan" },
        { steps: [
          "Import raw data [DONE]",
          "Data cleaning and transformation",
          "Automated data pipeline (Azure + Python)",
          "Time-series forecasting models (logistic regression, random forest, gradient boosting, or LSTM)",
          "Monthly RRI dashboard (Power BI)",
        ] },
      ],
    },

  ],
};
