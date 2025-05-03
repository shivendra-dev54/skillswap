

const Profile = () => {
    // Dummy user data — this would typically come from a database or context
    const user = {
        name: "Shivendra",
        email: "shivendra@example.com",
        skillsOffered: ["Python", "JavaScript", "Node.js"],
        skillsWanted: ["UI/UX Design", "React", "Figma"],
        rating: 4.8,
        sessionsCompleted: 12,
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-slate-950 shadow-lg rounded-lg mt-6">
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Name:</h2>
                <p>{user.name}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Email:</h2>
                <p>{user.email}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Skills I Can Teach:</h2>
                <ul className="list-disc list-inside">
                    {user.skillsOffered.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Skills I Want to Learn:</h2>
                <ul className="list-disc list-inside">
                    {user.skillsWanted.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Rating:</h2>
                <p>{user.rating} / 5</p>
            </div>

            <div>
                <h2 className="text-xl font-semibold">Sessions Completed:</h2>
                <p>{user.sessionsCompleted}</p>
            </div>
        </div>
    );
};

export default Profile;
