import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type RequestType = {
    user: string;
    skill: string;
    status: "p" | "a" | "r";
    type: "r" | "s";
};

interface ProfileProps {
    isLoggedIn: boolean,
};

const Profile = ({ isLoggedIn }: ProfileProps) => {

    let forReloadingInfo: number = 10;

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const [user, setUser] = useState<{
        name: string;
        email: string;
        skillsOffered: string[];
        requests: RequestType[];
    }>({
        name: "",
        email: "",
        skillsOffered: [],
        requests: [],
    });

    const [newSkill, setNewSkill] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:64000/api/auth/current`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch");

                const data = await res.json();

                setUser({
                    name: data.username,
                    email: data.email,
                    skillsOffered: data.skillshave || [],
                    requests: data.requests || [],
                });

            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchUser();
    }, []);

    const handleAddSkill = () => {

        //API call
        fetch(`http://localhost:64000/api/skills/add_skill`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify({
                "skillName": newSkill,
            }),
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
                return;
            });

        forReloadingInfo = forReloadingInfo + 1;


        if (newSkill.trim() && !user.skillsOffered.includes(newSkill)) {
            setUser(prev => ({
                ...prev,
                skillsOffered: [...prev.skillsOffered, newSkill.trim()],
            }));
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (skill: string) => {

        //API call
        //request to server
        fetch(`http://localhost:64000/api/skills/remove_skill`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify({
                "skillName": skill,
            }),
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
                return;
            });

        forReloadingInfo = forReloadingInfo + 1;
        setUser(prev => ({
            ...prev,
            skillsOffered: prev.skillsOffered.filter(s => s !== skill),
        }));
    };

    const handleDecision = (fromUser: string, skill: string, decision: "a" | "r") => {


        //request to server
        fetch(`http://localhost:64000/api/skills/answer_request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify({
                "from_user": fromUser,
                "skillName": skill,
                "decision": decision
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
                return;
            });

        forReloadingInfo = forReloadingInfo + 1;
        setUser(prev => ({
            ...prev,
            requests: prev.requests.map(req =>
                req.type === "r" && req.user === fromUser && req.skill === skill
                    ? { ...req, status: decision }
                    : req
            ),
        }));
        // Normally, you'd also call an API here
    };

    const receivedRequests = user.requests.filter(req => req.type === "r");
    const sentRequests = user.requests.filter(req => req.type === "s");

    return (
        <div className="max-w-4xl mx-auto p-6 bg-slate-950 text-white rounded-lg shadow-lg space-y-8 mt-6">
            <h1 className="text-3xl font-bold">My Profile</h1>

            <section>
                <h2 className="text-xl font-semibold">Name:</h2>
                <p className="text-gray-300">{user.name}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold">Email:</h2>
                <p className="text-gray-300">{user.email}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Skills I Can Teach:</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                    {user.skillsOffered.map((skill, index) => (
                        <li key={index} className="flex justify-between">
                            {skill}
                            <button
                                onClick={() => handleRemoveSkill(skill)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="mt-3 flex gap-2">
                    <input
                        className="p-2 bg-slate-800 border border-slate-700 rounded text-white"
                        placeholder="New skill"
                        value={newSkill}
                        onChange={e => setNewSkill(e.target.value)}
                    />
                    <button
                        onClick={handleAddSkill}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Add
                    </button>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Requests Received</h2>
                {receivedRequests.length === 0 ? (
                    <p className="text-gray-400">No requests received.</p>
                ) : (
                    <ul className="space-y-2">
                        {receivedRequests.map((req, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center bg-slate-800 p-3 rounded"
                            >
                                <span>
                                    <strong>{req.user}</strong> wants to learn <strong>{req.skill}</strong>
                                </span>
                                {req.status === "p" ? (
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleDecision(req.user, req.skill, "a")}
                                            className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleDecision(req.user, req.skill, "r")}
                                            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <span className={`text-sm ${req.status === "a" ? "text-green-400" : "text-red-400"}`}>
                                        {req.status === "a" ? (
                                            <button
                                                onClick={() => navigate(`/chat/${req.user}`)}
                                                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-white"
                                            >
                                                Chat
                                            </button>
                                        ) : (
                                            <span className="text-sm text-red-400">Rejected</span>
                                        )}

                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Requests Sent</h2>
                {sentRequests.length === 0 ? (
                    <p className="text-gray-400">No requests sent.</p>
                ) : (
                    <ul className="space-y-2">
                        {sentRequests.map((req, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center bg-slate-800 p-3 rounded"
                            >
                                <span>
                                    You requested <strong>{req.user}</strong> for <strong>{req.skill}</strong>
                                </span>
                                {req.status === "a" ? (
                                    <button
                                        onClick={() => navigate(`/chat/${req.user}`)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                    >
                                        Chat
                                    </button>
                                ) : (
                                    <span
                                        className={`text-sm ${req.status === "p"
                                                ? "text-yellow-400"
                                                : "text-red-400"
                                            }`}
                                    >
                                        {req.status === "p" ? "Pending" : "Rejected"}
                                    </span>
                                )}
                            </li>

                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default Profile;
