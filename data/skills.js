const SKILLS = {
  intro: "",

  items: [
    {
      title: "Statistics & Analysis",
      tag: "Core Methodology",
      text: "Rigorous statistical analysis, experimentation, and exploratory modelling.",
      groups: [
        { name: "Statistical Modelling", main: ["Regression analysis", "ANOVA & experimental design"], other: ["Probability", "Sampling methodology"] },
        { name: "Experimentation", main: ["A/B testing"], other: ["Hypothesis testing"] },
        { name: "Machine Learning & Mining", main: ["Data mining", "Association rule mining"], other: ["PCA & ICA", "K-means & hierarchical clustering"] },
        { name: "Data Preparation", main: ["Data cleaning"], other: [] },
      ],
    },
    {
      title: "Programming & Querying",
      text: "Clean, readable code for data wrangling, database management, and analysis.",
      main: ["SQL", "R"],
      other: ["Python", "dplyr", "ggplot2", "arules", "MySQL", "PostgreSQL", "NumPy", "Pandas", "SQLite"],
    },
    {
      title: "Data Visualization & BI",
      text: "Transforming raw data into interactive dashboards and clear, actionable reporting.",
      main: ["Power BI", "Excel"],
      other: ["Power Query (M)", "DAX", "Star schema modelling", "Dashboards", "Data validation", "Tracking and reporting"],
    },
    {
      title: "Tools",
      main: ["VS Code", "Microsoft Office (Excel, Word, Outlook, SharePoint, Teams)"],
      other: ["RStudio", "Jupyter Notebook", "Git and GitHub"],
    },
    {
      title: "Languages",
      languages: [
        { name: "English", level: "Professional", value: 90 },
        { name: "Cantonese", level: "Native", value: 100 },
        { name: "Mandarin", level: "Native", value: 100 },
        { name: "French", level: "Elementary", value: 10 },
        { name: "Japanese", level: "Elementary", value: 10 },
      ],
    },
    {
      title: "Automation",
      main: ["Power Automate", "Microsoft Lists"],
      other: ["Claude API", "Google Sheets"],
    },
    {
      title: "Academic Experience",
      other: ["Java", "C", "MATLAB", "HTML & CSS"],
    },
  ],
};
