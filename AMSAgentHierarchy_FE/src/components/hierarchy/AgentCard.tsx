interface Props {

    data: any;

}

const AgentCard = ({ data }: Props) => {

    return (

        <div className="mt-6 bg-white rounded-3xl shadow-2xl p-5">

            <h2 className="text-2xl font-bold text-blue-700 mb-3">

                👤 Agent Information

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>

                    <p className="text-gray-500">

                        Agent ID

                    </p>

                    <p className="font-bold text-lg">

                        {data.agent.agent_id}

                    </p>

                </div>

                <div>

                    <p className="text-gray-500">

                        Sales Code

                    </p>

                    <p className="font-bold text-lg">

                        {data.agent.sales_code}

                    </p>

                </div>

                <div>

                    <p className="text-gray-500">

                        Agent Name

                    </p>

                    <p className="font-bold text-lg">

                        {data.agent.first_name} {data.agent.last_name}

                    </p>

                </div>
                <div>

                    <p className="text-gray-500">

                        Agent Category

                    </p>

                    <p className="font-bold text-lg">

                        {data.category.category_id} : {data.category.category_name}

                    </p>

                </div>
                <div>

                    <p className="text-gray-500">

                        Agent Designation

                    </p>

                    <p className="font-bold text-lg">

                        {data.designation.designation_id} : {data.designation.designation_name}

                    </p>

                </div>
                <div>

                    <p className="text-gray-500">

                        Immediate Supervisor ID

                    </p>

                    <p className="font-bold text-lg">

                        {data.supervisor.supervisor_id}

                    </p>

                </div>

            </div>

        </div>

    )

}

export default AgentCard;