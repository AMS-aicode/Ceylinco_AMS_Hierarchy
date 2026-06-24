interface Props {

    data: any;

}

const HierarchyTable = ({ data }: Props) => {

    const rows = [

        {

            level: "Group",

            name: data.group.group_name,

            head: data.group.group_head_id,
            category: data.group.group_head_category_name,
            designation: data.group.group_head_designation_name

        },

        {

            level: "Cluster 2",

            code: data.cluster2.cluster2_code,

            name: data.cluster2.cluster2_name,

            head: data.cluster2.cluster2_head_id,
            category: data.cluster2.cluster2_head_category_name,
            designation: data.cluster2.cluster2_head_designation_name

        },

        {

            level: "Cluster 1",

            code: data.cluster1.cluster1_code,

            name: data.cluster1.cluster1_name,

            head: data.cluster1.cluster1_head_id,
            category: data.cluster1.cluster1_head_category_name,
            designation: data.cluster1.cluster1_head_designation_name

        },

        {

            level: "Branch",

            code: data.branch.branch_code,

            name: data.branch.branch_name,

            head: data.branch.branch_head_id,
            category: data.branch.branch_head_category_name,
            designation: data.branch.branch_head_designation_name

        },

        {

            level: "Unit",

            code: data.unit.unit_code,

            name: data.unit.unit_name,

            head: data.unit.unit_head_id,
            category: data.unit.unit_head_category_name,
            designation: data.unit.unit_head_designation_name

        }

    ]

    return (

        <div className="mt-6 bg-white rounded-3xl shadow-2xl overflow-hidden">

            <div className="bg-gradient-to-r from-blue-700 to-purple-700 text-white text-2xl font-bold p-4">

                Organization Hierarchy

            </div>

            <table className="w-full table-fixed">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="w-[15%] p-4 text-left">Level</th>
                        <th className="w-[15%] p-4 text-left">Name</th>
                        <th className="w-[15%] p-4 text-center">Head ID</th>
                        <th className="w-[25%] p-4 text-center">Head Category</th>
                        <th className="w-[30%] p-4 text-center">Head Designation</th>

                    </tr>

                </thead>

                <tbody>

                    {rows.map((row, index) => (

                        <tr
                            key={index}
                            className="border-b hover:bg-blue-50 transition-all duration-200"
                        >

                            <td className="p-4 font-semibold text-left">
                                {row.level}
                            </td>

                            <td className="p-4 text-left">
                                {row.name}
                            </td>

                            <td className="p-4 text-center">
                                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                                    {row.head || "-"}
                                </span>
                            </td>

                            <td className="p-4 text-center">
                                {row.category}
                            </td>
                            <td className="p-4 text-center">
                                {row.designation}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default HierarchyTable;