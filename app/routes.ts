import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/main-simple.tsx", [
    index("routes/home-beautiful.tsx"),
    route("dashboard", "routes/dashboard-simple.tsx"),
    route("schedule", "routes/schedule-beautiful.tsx"),
    route("sort", "routes/sort-beautiful.tsx"),
    route("hubs", "routes/hubs-beautiful.tsx"),
    route("route-optimizer", "routes/route-optimizer.tsx"),
    route("rewards", "routes/rewards-beautiful.tsx"),
    route("admin", "routes/admin.tsx"),
  ]),
] satisfies RouteConfig;
