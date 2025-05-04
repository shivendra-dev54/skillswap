import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// Dummy user data (replace with data from backend)
const users = [
    { name: "user", skillsOffered: ["skill"] },
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



interface MainpageProps{
    isLoggedIn: boolean
};


const Mainpage = ({isLoggedIn}: MainpageProps) => {

  const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const [selectedSkill, setSelectedSkill] = useState('');
    const [searchResults, setSearchResults] = useState<{ name: string; skillsOffered: string[] }[]>([]);
    const [searchSubmitted, setSearchSubmitted] = useState(false); // NEW STATE

    const handleSearch = () => {
        setSearchSubmitted(true); // Show results after clicking search

        const results = users.filter(user =>
            user.skillsOffered.includes(selectedSkill)
        );

        // API request to backend
        fetch(`http://localhost:64000/api/skills/get_users?skillName=${selectedSkill}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to search in DB");
                }
                return response.json();
            })
            .then((data) => {
                const userNames = data["users"]["usersHaving"];
                const skillNames = data["users"]["name"];

                const apiResults = userNames.map((name: string, index: number) => ({
                    name: name,
                    skillsOffered: [skillNames[index]]
                }));

                setSearchResults(apiResults);
            })
            .catch((error) => {
                console.error("unable to make req", error);
            });
        
        setSearchResults(results); // In case backend fails, fallback to dummy filter
    };



    //for sending requests to other users
    const sendRequest = (to_user: string, skillName: string) => {
        // API request to backend
        fetch(`http://localhost:64000/api/skills/make_request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify({
                "to_user": to_user,
                "skillName": skillName
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to search in DB");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("unable to make req", error);
                return 'failed';
            });
        return 's';
    }


    return (
        <div className="bg-gray-950 p-8">
            <div className="bg-slate-950 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
                    Welcome to SkillSwap
                </h1>

                <div className="mb-6 text-center">
                    <label className="block text-lg font-medium mb-2">Search by Skill:</label>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <select
                            value={selectedSkill}
                            onChange={(e) => {
                                setSelectedSkill(e.target.value);
                                setSearchSubmitted(false); // Hide results when skill changes
                            }}
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
                            disabled={!selectedSkill}
                            className={`px-4 py-2 rounded transition ${selectedSkill
                                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                                : "bg-gray-600 text-gray-300 cursor-not-allowed"
                                }`}
                        >
                            Search
                        </button>
                    </div>
                </div>

                {searchSubmitted && (
                    <div id='searchResultDiv'>
                        <h2 className="text-xl font-semibold mb-4">Search Results:</h2>
                        {searchResults.length > 0 ? (
                            <ul className="list-disc list-inside space-y-2">
                                {searchResults.map((user, index) => (
                                    <li key={index}>
                                        {user.name} — offers {selectedSkill}
                                        <button
                                            className="ml-4 text-sm text-blue-400 hover:underline"
                                            id={`request-button-${index}`}
                                            onClick={() => {
                                                const data = sendRequest(user.name, selectedSkill);
                                                if (data === 's') {
                                                    const button = document.getElementById(`request-button-${index}`);
                                                    if (button) {
                                                        button.textContent = "Sent";
                                                        button.classList.remove("text-blue-400", "hover:underline");
                                                        button.classList.add("text-green-500");
                                                    }
                                                }
                                            }}
                                        >
                                            Send Request
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No users found for "{selectedSkill}"</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mainpage;
