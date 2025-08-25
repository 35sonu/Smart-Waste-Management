import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/main.tsx", [
    index("routes/home.tsx"),
    route("schedule", "routes/schedule.tsx"),
    route("sort", "routes/sort.tsx"),
    route("recycling-hubs", "routes/recycling-hubs.tsx"),
    route("route-optimizer", "routes/route-optimizer.tsx"),
    route("rewards", "routes/rewards.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("admin", "routes/admin.tsx"),
  ]),
] satisfies RouteConfig;
