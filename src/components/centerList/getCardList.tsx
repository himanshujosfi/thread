
type InputListProps = {
    users: string;
};

export default function GetCardList({ users }: InputListProps) {

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col items-center gap-3">
                {users.map((item) => (
                    <div
                        key={item.id}
                        className="shadow-lg rounded-lg w-full p-4 bg-white border border-gray-200"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.image}
                                alt="profile"
                                width={40}
                                height={40}
                                className="rounded-lg bg-red-400 shrink-0"
                            />
                            <h2 className="text-lg font-bold flex-1 truncate">
                                {item.name}
                            </h2>
                            <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm shrink-0">
                                View
                            </button>
                        </div>
                        <div className="text-gray-600 mt-1 pl-14 break-words">
                            {item.email}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}