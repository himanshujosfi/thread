import React from 'react';

const RightBar = () => {
    const users = [
        { id: 1, name: "Aarav Sharma", email: "aarav.sharma@example.com", image: "/file.svg" },
        { id: 2, name: "Priya Mehta", email: "priya.mehta@example.com", image: "/file.svg" },
        { id: 3, name: "Rohan Kapoor", email: "rohan.kapoor@example.com", image: "/file.svg" },
        { id: 4, name: "Neha Singh", email: "neha.singh@example.com", image: "/file.svg" },
        { id: 5, name: "Ishaan Verma", email: "ishaan.verma@example.com", image: "/file.svg" },
        { id: 6, name: "Simran Kaur", email: "simran.kaur@example.com", image: "/file.svg" },
        // { id: 7, name: "Ananya Das", email: "ananya.das@example.com", image: "/file.svg" },
        // { id: 8, name: "Kunal Joshi", email: "kunal.joshi@example.com", image: "/file.svg" },
        // { id: 9, name: "Meera Iyer", email: "meera.iyer@example.com", image: "/file.svg" },
        // { id: 10, name: "Vikram Chauhan", email: "vikram.chauhan@example.com", image: "/file.svg" },
        // { id: 11, name: "Sneha Nair", email: "sneha.nair@example.com", image: "/file.svg" },
        // { id: 12, name: "Rajesh Kumar", email: "rajesh.kumar@example.com", image: "/file.svg" },
    ];

    return (
        <div className="fixed right-0 top-0 h-screen bg-black md:w-1/4 lg:w-1/5 xl:w-1/4 p-4 shadow-md border-l-2 hidden md:flex flex-col">
            <div className="overflow-y-auto flex-1">
                <div className="mt-7 mb-8">
                    <h1 className="text-xl text-white font-bold">Suggestion for You</h1>
                </div>

                {users.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gray-400 shadow-lg rounded-lg w-full max-w-sm text-white p-2 mb-3"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.image}
                                alt="profile"
                                width={25}
                                height={20}
                                className="rounded-lg bg-red-400"
                            />
                            <h2 className="text-lg font-bold flex-1">{item.name}</h2>
                            <button className="px-4 py-1 bg-blue-500 rounded hover:bg-blue-600 text-sm">
                                View
                            </button>
                        </div>
                        <div className="text-gray-100 mt-1 pl-10">{item.email}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightBar;
