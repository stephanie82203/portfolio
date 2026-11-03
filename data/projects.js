/* =========================================================
   PROJECTS — each one is a card on the home page.

   Card (all projects):
     id, title, type, year, summary, tools, github
     image    → optional
     pdf      → optional, e.g. "assets/projects/my-report.pdf" (put the file in that folder).
                No report: the card's "Read the report (PDF)" button opens the PDF.
                With a report: the card and the report page also get a PDF button.

   Details page (optional):
     report   → leave it out and the project has no details page
                (no "Read the report" button). Add it and the page
                lives at project.html#<id>.

   Inside report — everything is optional except sections:
     kicker   → small label above the title (default "Project report")
     title    → page title (default: the card title)
     intro    → the line under the title
     facts    → [["Label", "Value"], ...] (default: Type, Year, Role, Tools)
     role     → used by the default facts
     cover    → picture on the page (default: the card image; false = none)
     sections → [{ title, subtitle, body: [...] }, ...] in the order you want.
                subtitle is optional. body uses blocks:
                "a paragraph", { heading: "..." }, { list: [...] }, { steps: [...] },
                { quote: "..." }, { callout: { label, text } }, { kpis: [["0.84", "AUC"]] },
                { chart: {...} }, { image: "path", caption: "..." },
                { links: [{ label, hint, url }] }
                { pdf: "assets/projects/my-report.pdf" } shows the PDF inside the page
   ========================================================= */
const PROJECTS = {
  intro: "These projects are what I'm proudest of. School taught me a lot of theory, mostly practised on paper, so I learned the technical skills on my own and combined both to build these. Together, they show how my skills have grown over time. Friends with senior experience at large companies also gave me advice along the way. Each project has a short summary here, a full write-up of what I did and what I found, and a link to the code on GitHub.",

  items: [
    {
      id: "personal-website",
      title: "Profile Website",
      type: "Website",
      year: 2026,
      tools: ["HTML", "CSS","JavaScript"],
      summary: "The site you're on right now. Click to see details",
      github: "https://github.com/stephanie82203/portfolio",
    },
    {
      id: "resume-tool",
      title: "Resume Tailoring & Scoring",
      type: "Website",
      year: 2026,
      summary: "An affordable and effective tool for creating a standout CV when job hunting.",
      tools: ["Python", "Claude API"],
    
      report: {
        intro: "An affordable and effective tool for creating a standout CV when job hunting.",
        role: "Solo",
        sections: [
          { title: "Objective", body: [
            "A website where users enter their work experience, projects, and skills, then compare their profile against job postings. It works as both a resume tailoring tool and an application tracker.",
            { list: [
            "Uses the Claude API to tailor resumes to a specific job posting and give a compatibility score between the user's profile and the posting",
            "Automatically labels job application emails, then logs and updates each application's status in Google Sheets",
          ] },
          ] },
          { title: "Links", body: [
            "GitHub link coming soon.",
            // { links: [{ label: "GitHub repository", hint: "code + notebooks", url: "" }] },
          ] },
        ],
      },
    },
    {
      id: "bakery-arm",
      title: "Market Basket Analysis",
      type: "Association Rule Mining",
      year: 2025,
      summary: "Find which products customers tend to buy together. The results can help with product placement, product recommendations, inventory management, and ad targeting.",
      tools: ["R"],
      github: "https://github.com/stephanie82203/Bakery_ARM",
      pdf: "assets/projects/Bakery_ARM_Report.pdf"
    },
    {
      id: "HR-Analy",
      title: "HR Analytics: Workforce Insights",
      type: "Visualization",
      year: 2025,
      summary: "Graphical representation of human resources data: performance ratings, diversity profiles, recruitment sources, staff turnover rates and pay equity",
      tools: ["R"],
      github: "https://github.com/stephanie82203/Bakery_ARM",
      pdf: "assets/projects/HR_Analytics_Report.pdf"
    },
    {
      id: "BCW-Class",
      title: "Breast Cancer Wisconsin Classification",
      type: "Classification",
      year: 2025,
      summary: "A group project using the Breast Cancer Wisconsin dataset to classify tumours as benign or malignant. We built and compared two models: K nearest neighbours (KNN) and logistic regression. The code is on GitHub, and a full report is coming.",
      tools: ["R"],
      github: "https://github.com/stephanie82203/Breast-Cancer-Wisconsin-Classification",
    },
    {
      id: "Pred-NYC",
      title: "New York City Condominium Price",
      type: "Prediction",
      year: 2025,
      summary: "Analyze New York City condominium sales data to predict condo prices based on property size. We also compare model performance across NYC's five boroughs (Manhattan, Brooklyn, Queens, The Bronx, and Staten Island), providing insights into real estate trends.",
      tools: ["R"],
      github: "https://github.com/stephanie82203/Stat4601-Final-Project/tree/main",
    
      report: {
        role: "Group Project",
        sections: [
          { title: "Overview", body: [
            "A group project analyzing New York City condo sales data to predict prices based on property size, and comparing how well the model works across the five boroughs: Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. We used PCA and ICA for dimensionality reduction, K means and hierarchical clustering, and linear regression.",
          ] },
          { title: "My Part", body: [
            "I drafted the outline for the whole project, maintained the GitHub repository, and handled the unsupervised learning: K means and hierarchical clustering, plus visualizing the results with WSS and DBI plots.",
          ] },
          { title: "Improvement", body: [
            "My teammates did the supervised learning part. The code is on GitHub, and I plan to write the full report, including my teammates' part.",
          ]},
          { title: "Links", body: [
            { links: [{ label: "GitHub repository", hint: "code + report", url: "https://github.com/stephanie82203/Stat4601-Final-Project/tree/main" }] },
          ] },
        ],
      },
    },
    {
      id: "job-tracker",
      title: "Job Application Tracker",
      type: "Data Report",
      year: 2025,
      summary: "Job searching is a manual and overwhelming process, and it's hard to track progress or know which skills employers want most. I built a Power BI dashboard from my own job applications to see my success rates, find the skills that come up most often, and figure out where to focus my search.",
      tools: ["Power BI","Excel","Jupyter Notebook"],
      github: "https://github.com/stephanie82203/Job-Application-Tracker-Project",
    },
  ],
};
