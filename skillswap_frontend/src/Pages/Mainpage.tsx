import { useState } from 'react';

// Dummy user data (replace with data from backend)
const users = [
    { name: "Alice", skillsOffered: ["Python", "C++"] },
    { name: "Bob", skillsOffered: ["React", "Figma"] },
    { name: "Charlie", skillsOffered: ["Java", "Python"] },
    { name: "Diana", skillsOffered: ["UI/UX Design", "Node.js"] },
];

// List of all possible skills
const skillOptions = [
    // Programming Languages
    "Python", "Java", "JavaScript", "C++", "C#", "TypeScript", "Go", "Kotlin", "Rust", "Ruby",

    // Web Development
    "HTML", "CSS", "React.js", "Angular", "Vue.js", "Next.js", "Node.js", "Tailwind CSS", "SASS", "Accessibility",

    // Mobile Development
    "Flutter", "React Native", "Swift", "Kotlin (Android)", "Ionic",

    // Cloud & DevOps
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible", "CI/CD", "GitOps",

    // Databases & Data Tools
    "MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "SQL Server", "Firebase", "ElasticSearch", "Supabase", "GraphQL",

    // Data Science & Analytics
    "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "TensorFlow", "PyTorch", "R", "Power BI", "Tableau", "Apache Spark",

    // Cybersecurity & Networking
    "Ethical Hacking", "Pen Testing", "Network Security", "Wireshark", "Metasploit", "Firewalls", "Kali Linux", "OWASP Top 10", "Zero Trust", "Secure Coding",

    // Software Testing & QA
    "Selenium", "JUnit", "Cypress", "Playwright", "Postman", "JMeter", "TDD/BDD", "Test Automation", "Smoke Testing", "QA Processes",

    // AI & Machine Learning
    "ML Algorithms", "NLP", "OpenAI API", "Hugging Face", "Computer Vision", "Deep Learning", "Model Deployment", "AutoML", "ML Ops", "Chatbots",

    // Tools & Practices
    "Git & GitHub", "Agile", "Scrum", "Jira", "Confluence", "VS Code", "Bash", "Regex", "JSON/XML", "REST/SOAP APIs",

    // UI/UX & Design
    "Figma", "Adobe XD", "Design Thinking", "Prototyping", "User Journey Mapping"
];

const Mainpage = () => {
    const [selectedSkill, setSelectedSkill] = useState('');
    const [searchResults, setSearchResults] = useState<{ name: string; skillsOffered: string[] }[]>([]);

    const handleSearch = () => {
        const results = users.filter(user =>
            user.skillsOffered.includes(selectedSkill)
        );
        setSearchResults(results);
    };

    return (
        <div className="min-h-screen bg-gray-950 p-8">
            <div className="bg-slate-950 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
                    Welcome to SkillSwap
                </h1>

                <div className="mb-6 text-center">
                    <label className="block text-lg font-medium mb-2">Search by Skill:</label>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <select
                            value={selectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value)}
                            className="border border-gray-600 rounded px-4 py-2 bg-black text-white"
                        >
                            <option value="">-- Select Skill --</option>
                            {skillOptions.map((skill, index) => (
                                <option key={index} value={skill}>
                                    {skill}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleSearch}
                            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Search Results:</h2>
                    {searchResults.length > 0 ? (
                        <ul className="list-disc list-inside space-y-2">
                            {searchResults.map((user, index) => (
                                <li key={index}>
                                    {user.name} — offers {selectedSkill}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        selectedSkill && (
                            <p className="text-gray-600">No users found for "{selectedSkill}"</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Mainpage;
