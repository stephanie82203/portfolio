const SKILLS = {
  intro: "",

  items: [
    {
      title: "Statistics & Analysis",
      tag: "Core Methodology",
      text: "Rigorous statistical analysis, experimentation, and exploratory modelling.",
      groups: [
        { name: "Statistical Modelling", other: ["Regression analysis", "ANOVA & experimental design","Probability", "Sampling methodology"] },
        { name: "Experimentation", other: ["A/B testing","Hypothesis testing"] },
        { name: "Machine Learning & Mining", other: ["Data mining", "Association rule mining","PCA & ICA", "K-means & hierarchical clustering"] },
        { name: "Data Preparation", other: ["Data cleaning"] },
      ],
    },
    {
      title: "Programming & Querying",
      text: "Clean, readable code for data wrangling, database management, and analysis.",
      other: ["SQL", "R","Python", "dplyr", "ggplot2", "arules", "MySQL", "PostgreSQL", "NumPy", "Pandas", "SQLite"],
    },
    {
      title: "Data Visualization & BI",
      text: "Transforming raw data into interactive dashboards and clear, actionable reporting.",
      other: ["Power BI", "Advanced Excel","Power Query (M)", "DAX", "Star schema modelling", "VBA macros"],
    },
    {
      title: "Tools",
      other: ["VS Code", "Microsoft Office (Word, Outlook, SharePoint, Teams)","RStudio", "Jupyter Notebook", "Git and GitHub"],
    },
    {
      title: "Languages",
      languages: [
        { name: "English", level: "Native", value: 100 },
        { name: "Cantonese", level: "Native", value: 100 },
        { name: "Mandarin", level: "Native", value: 100 },
        { name: "French", level: "Elementary", value: 10 },
        { name: "Japanese", level: "Elementary", value: 10 },
      ],
    },
    {
      title: "Automation",
      other: ["Power Automate", "Microsoft Lists","Claude API", "Google Sheets"],
    },
    {
      title: "Academic Experience",
      other: ["Java", "C", "MATLAB", "HTML & CSS","SPSS","SAS"],
    },
  ],
};
