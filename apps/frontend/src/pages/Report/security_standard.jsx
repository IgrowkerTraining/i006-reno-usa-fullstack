const safetyStandards = [
    {
        id: "phase-1",
        name: "Planning and Design",
        planned_start: "2026-03-06T21:40:50.561Z",
        planned_end: "2026-03-13T21:40:50.561Z",
        status: "pending",
        tasks: [
            { id: "task-1", name: "Needs assessment", status: "pending", completedAt: null, completedBy: null },
            { id: "task-2", name: "Preliminary design", status: "pending", completedAt: null, completedBy: null },
            { id: "task-3", name: "Architectural drawings", status: "pending", completedAt: null, completedBy: null },
            { id: "task-4", name: "Structural and systems drawings", status: "pending", completedAt: null, completedBy: null },
            { id: "task-5", name: "Estimated budget", status: "pending", completedAt: null, completedBy: null },
            { id: "task-6", name: "Municipal permits", status: "pending", completedAt: null, completedBy: null }
        ]
    },
    {
        id: "phase-2",
        name: "Site Preparation",
        planned_start: "2026-03-14T21:40:50.561Z",
        planned_end: "2026-03-16T21:40:50.561Z",
        status: "pending",
        tasks: [
            { id: "task-7", name: "Site clearing", status: "pending", completedAt: null, completedBy: null },
            { id: "task-8", name: "Land leveling", status: "pending", completedAt: null, completedBy: null },
            { id: "task-9", name: "Soil study", status: "pending", completedAt: null, completedBy: null },
            { id: "task-10", name: "Site layout and staking", status: "pending", completedAt: null, completedBy: null }
        ]
    },
    {
        id: "phase-3",
        name: "Foundation",
        planned_start: "2026-03-18T21:40:50.561Z",
        planned_end: "2026-03-20T21:40:50.561Z",
        status: "pending",
        tasks: [
            { id: "task-11", name: "Excavation", status: "pending", completedAt: null, completedBy: null },
            { id: "task-12", name: "Footings and foundations", status: "pending", completedAt: null, completedBy: null },
            { id: "task-13", name: "Foundation slab", status: "pending", completedAt: null, completedBy: null },
            { id: "task-14", name: "Waterproofing", status: "pending", completedAt: null, completedBy: null }
        ]
    },
    {
        id: "phase-4",
        name: "Structure",
        planned_start: "2026-03-20T21:40:50.561Z",
        planned_end: "2026-03-25T21:40:50.561Z",
        status: "pending",
        tasks: [
            { id: "task-15", name: "Columns and beams", status: "pending", completedAt: null, completedBy: null },
            { id: "task-16", name: "Slab construction", status: "pending", completedAt: null, completedBy: null },
            { id: "task-17", name: "Load-bearing walls", status: "pending", completedAt: null, completedBy: null },
            { id: "task-18", name: "Roof structure", status: "pending", completedAt: null, completedBy: null }
        ]
    },
    {
        id: "phase-5",
        name: "Installations",
        planned_start: "2026-03-25T21:40:50.561Z",
        planned_end: "2026-03-27T21:40:50.561Z",
        status: "pending",
        tasks: [
            { id: "task-19", name: "Electrical installation", status: "pending", completedAt: null, completedBy: null },
            { id: "task-20", name: "Plumbing installation", status: "pending", completedAt: null, completedBy: null },
            { id: "task-21", name: "Gas installation", status: "pending", completedAt: null, completedBy: null },
            { id: "task-22", name: "Drainage system", status: "pending", completedAt: null, completedBy: null },
            { id: "task-23", name: "Stormwater system", status: "pending", completedAt: null, completedBy: null }
        ]
    },
    {
        id: "phase-6",
        name: "Masonry and Enclosures",
        planned_start: "2026-03-27T21:40:50.561Z",
        planned_end: "2026-03-28T21:40:50.561Z",
        status: "pending",
        tasks: [
            { id: "task-24", name: "Wall construction", status: "pending", completedAt: null, completedBy: null },
            { id: "task-25", name: "Window and door installation", status: "pending", completedAt: null, completedBy: null },
            { id: "task-26", name: "Rough plastering", status: "pending", completedAt: null, completedBy: null },
            { id: "task-27", name: "Fine plastering", status: "pending", completedAt: null, completedBy: null }
        ]
    },
    {
        id: "phase-7",
        name: "Roofing and Insulation",
        planned_start: "2026-03-06T21:40:50.561Z",
        planned_end: "2026-03-13T21:40:50.561Z",
        status: "pending",
        tasks: [
            { id: "task-28", name: "Roof covering installation", status: "pending", completedAt: null, completedBy: null },
            { id: "task-29", name: "Thermal insulation", status: "pending", completedAt: null, completedBy: null },
            { id: "task-30", name: "Waterproof insulation", status: "pending", completedAt: null, completedBy: null }
        ]
    },
    {
        id: "phase-8",
        name: "Finishes",
        planned_start: "2026-03-06T21:40:50.561Z",
        planned_end: "2026-03-13T21:40:50.561Z",
        status: "pending",
        tasks: [
            { id: "task-31", name: "Flooring installation", status: "pending", completedAt: null, completedBy: null },
            { id: "task-32", name: "Wall coverings installation", status: "pending", completedAt: null, completedBy: null },
            { id: "task-33", name: "Painting", status: "pending", completedAt: null, completedBy: null },
            { id: "task-34", name: "Interior carpentry", status: "pending", completedAt: null, completedBy: null },
            { id: "task-35", name: "Fixture installation", status: "pending", completedAt: null, completedBy: null },
            { id: "task-36", name: "Sanitary fixtures and faucets", status: "pending", completedAt: null, completedBy: null }
        ]
    },
    {
        id: "phase-9",
        name: "Final Inspection and Details",
        planned_start: "2026-03-06T21:40:50.561Z",
        planned_end: "2026-03-13T21:40:50.561Z",
        status: "pending",
        tasks: [
            { id: "task-37", name: "Quality control", status: "pending", completedAt: null, completedBy: null },
            { id: "task-38", name: "Detail corrections", status: "pending", completedAt: null, completedBy: null },
            { id: "task-39", name: "Final site cleaning", status: "pending", completedAt: null, completedBy: null }
        ]
    }
];

export default safetyStandards;