//const pool = require("../config/mysqldb");
const getPool = require("../config/mysqldb");
//const getHierarchyBySalesCode = async (salesCode) => {
    const getHierarchyBySalesCode = async (
    salesCode,
    env = "dev"
) => {
      const valueOrDefault = (value) => {
    return value === null || value === undefined || value === ""
        ? "No Data in DB"
        : value;
};

const headValue = (headId, joinedValue) => {

    if (!headId || headId === "") {
        return "Data Not Available in DB";
    }

    if (!joinedValue) {
        return "Invalid Sales Code";
    }

    return joinedValue;

};

    const sql = `

SELECT

a.agent_id,
a.sales_code,
a.first_name,
a.last_name,

a.unit_id,
u.unit_code,
u.unit_name,
u.unit_head_id,

a.branch_id,
b.branch_code,
b.branch_name,
b.branch_head_id,

a.cluster1_id,
c1.cluster1_code,
c1.cluster1_name,
c1.cluster1_head_id,

a.cluster2_id,
c2.cluster2_code,
c2.cluster2_name,
c2.cluster2_head_id,

a.group_id,
g.group_code,
g.group_name,
g.group_head_id,

a.category_id,
c.category_name,

a.designation_id,
d.designation_name,

a.supervisor_id,

gha.sales_code as group_head_sales_code,
ghc.category_name as group_head_category_name,
ghd.designation_name as group_head_designation_name,

c2ha.sales_code as cluster2_head_sales_code,
c2hc.category_name as cluster2_head_category_name,
c2hd.designation_name as cluster2_head_designation_name,

c1ha.sales_code as cluster1_head_sales_code,
c1hc.category_name as cluster1_head_category_name,
c1hd.designation_name as cluster1_head_designation_name,

bha.sales_code as branch_head_sales_code,
bhc.category_name as branch_head_category_name,
bhd.designation_name as branch_head_designation_name,

uha.sales_code as unit_head_sales_code,
uhc.category_name as unit_head_category_name,
uhd.designation_name as unit_head_designation_name

FROM al_agent_master a

LEFT JOIN al_unit_master u
ON a.unit_id=u.unit_id

LEFT JOIN al_branch_master b
ON a.branch_id=b.branch_id

LEFT JOIN al_cluster1_master c1
ON a.cluster1_id=c1.cluster1_id

LEFT JOIN al_cluster2_master c2
ON a.cluster2_id=c2.cluster2_id

LEFT JOIN al_group_master g
ON a.group_id=g.group_id

LEFT JOIN al_category_master c
ON a.category_id=c.category_id

LEFT JOIN al_designation_master d
ON a.designation_id=d.designation_id

-- GROUP HEAD

LEFT JOIN al_agent_master gha
ON g.group_head_id = gha.sales_code
AND gha.is_active = 1

LEFT JOIN al_category_master ghc
ON gha.category_id = ghc.category_id

LEFT JOIN al_designation_master ghd
ON gha.designation_id = ghd.designation_id


-- CLUSTER2 HEAD

LEFT JOIN al_agent_master c2ha
ON c2.cluster2_head_id = c2ha.sales_code
AND c2ha.is_active = 1

LEFT JOIN al_category_master c2hc
ON c2ha.category_id = c2hc.category_id

LEFT JOIN al_designation_master c2hd
ON c2ha.designation_id = c2hd.designation_id


-- CLUSTER1 HEAD

LEFT JOIN al_agent_master c1ha
ON c1.cluster1_head_id = c1ha.sales_code
AND c1ha.is_active = 1

LEFT JOIN al_category_master c1hc
ON c1ha.category_id = c1hc.category_id

LEFT JOIN al_designation_master c1hd
ON c1ha.designation_id = c1hd.designation_id


-- BRANCH HEAD

LEFT JOIN al_agent_master bha
ON b.branch_head_id = bha.sales_code
AND bha.is_active = 1

LEFT JOIN al_category_master bhc
ON bha.category_id = bhc.category_id

LEFT JOIN al_designation_master bhd
ON bha.designation_id = bhd.designation_id


-- UNIT HEAD

LEFT JOIN al_agent_master uha
ON u.unit_head_id = uha.sales_code
AND uha.is_active = 1

LEFT JOIN al_category_master uhc
ON uha.category_id = uhc.category_id

LEFT JOIN al_designation_master uhd
ON uha.designation_id = uhd.designation_id

WHERE
a.sales_code=?
AND a.is_active=1

LIMIT 1

`;

   // const [rows] = await pool.execute(sql, [salesCode]);
   const pool = getPool(env);

const [rows] = await pool.execute(
    sql,
    [salesCode]
);

    if (rows.length === 0) {

        return {

            success: false,
            message: "No active agent found."

        };

    }

    const data = rows[0];

    return {

        success: true,

        data: {

            agent: {

                agent_id: valueOrDefault(data.agent_id),
                sales_code: valueOrDefault(data.sales_code),
                first_name: valueOrDefault(data.first_name),
                last_name: valueOrDefault(data.last_name)

            },

            
// unit: {
//     unit_id: valueOrDefault(data.unit_id),
//     unit_code: valueOrDefault(data.unit_code),
//     unit_name: valueOrDefault(data.unit_name),
//     unit_head_id: valueOrDefault(data.unit_head_id)
// },
unit: {

    unit_id: valueOrDefault(data.unit_id),

    unit_code: valueOrDefault(data.unit_code),

    unit_name: valueOrDefault(data.unit_name),

    unit_head_id: valueOrDefault(data.unit_head_id),

    unit_head_category_name: headValue(
        data.unit_head_id,
        data.unit_head_category_name
    ),

    unit_head_designation_name: headValue(
        data.unit_head_id,
        data.unit_head_designation_name
    )

},

            // branch: {

            //     branch_id: valueOrDefault(data.branch_id),
            //     branch_code: valueOrDefault(data.branch_code),
            //     branch_name: valueOrDefault(data.branch_name),
            //     branch_head_id: valueOrDefault(data.branch_head_id)

            // },
            branch: {

    branch_id: valueOrDefault(data.branch_id),

    branch_code: valueOrDefault(data.branch_code),

    branch_name: valueOrDefault(data.branch_name),

    branch_head_id: valueOrDefault(data.branch_head_id),

    branch_head_category_name: headValue(
        data.branch_head_id,
        data.branch_head_category_name
    ),

    branch_head_designation_name: headValue(
        data.branch_head_id,
        data.branch_head_designation_name
    )

},

            // cluster1: {

            //     cluster1_id: valueOrDefault(data.cluster1_id),
            //     cluster1_code: valueOrDefault(data.cluster1_code),
            //     cluster1_name: valueOrDefault(data.cluster1_name),
            //     cluster1_head_id: valueOrDefault(data.cluster1_head_id)

            // },
            cluster1: {

    cluster1_id: valueOrDefault(data.cluster1_id),

    cluster1_code: valueOrDefault(data.cluster1_code),

    cluster1_name: valueOrDefault(data.cluster1_name),

    cluster1_head_id: valueOrDefault(data.cluster1_head_id),

    cluster1_head_category_name: headValue(
        data.cluster1_head_id,
        data.cluster1_head_category_name
    ),

    cluster1_head_designation_name: headValue(
        data.cluster1_head_id,
        data.cluster1_head_designation_name
    )

},

            // cluster2: {

            //     cluster2_id: valueOrDefault(data.cluster2_id),
            //     cluster2_code: valueOrDefault(data.cluster2_code),
            //     cluster2_name: valueOrDefault(data.cluster2_name),
            //     cluster2_head_id: valueOrDefault(data.cluster2_head_id)

            // },
            cluster2: {

    cluster2_id: valueOrDefault(data.cluster2_id),

    cluster2_code: valueOrDefault(data.cluster2_code),

    cluster2_name: valueOrDefault(data.cluster2_name),

    cluster2_head_id: valueOrDefault(data.cluster2_head_id),

    cluster2_head_category_name: headValue(
        data.cluster2_head_id,
        data.cluster2_head_category_name
    ),

    cluster2_head_designation_name: headValue(
        data.cluster2_head_id,
        data.cluster2_head_designation_name
    )

},

            // group: {

            //     group_id: valueOrDefault(data.group_id),
            //     group_code: valueOrDefault(data.group_code),
            //     group_name: valueOrDefault(data.group_name),
            //     group_head_id: valueOrDefault(data.group_head_id)

            // },
            group: {

    group_id: valueOrDefault(data.group_id),

    group_code: valueOrDefault(data.group_code),

    group_name: valueOrDefault(data.group_name),

    group_head_id: valueOrDefault(data.group_head_id),

    group_head_category_name: headValue(
        data.group_head_id,
        data.group_head_category_name
    ),

    group_head_designation_name: headValue(
        data.group_head_id,
        data.group_head_designation_name
    )

},

            category: {

                category_id: valueOrDefault(data.category_id),
                category_name: valueOrDefault(data.category_name)

            },

            designation: {

                designation_id: valueOrDefault(data.designation_id),
                designation_name: valueOrDefault(data.designation_name)

            },

            supervisor: {

                supervisor_id: valueOrDefault(data.supervisor_id),

            }

        }

    };
  

};

module.exports = {
    getHierarchyBySalesCode
};