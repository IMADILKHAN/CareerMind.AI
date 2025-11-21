"use client"
import { format, formatDistanceToNow } from "date-fns";
import { log } from "console";
import { Brain, Briefcase, LineChart, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Rectangle,
    ResponsiveContainer,
  } from "recharts";
  
export default function DashboardView({insights}){
    console.log(insights)
    const salaryData = insights.salaryRanges.map((range)=>({
        name:range.role,
        min:range.min/100000, 
        max:range.max/100000,
        median:range.median/100000,
    }));
    const getDemandLevelColor = (level)=>{
        switch(level.toLowerCase()){
            case "high":
                return "bg-green-500";
            case "medium":
                return "bg-yellow-500"; 
            case "low":
                return "bg-red-500"; 
            default:
                return "bg-gray-500";
        }
    }
    const getMarketOutlookInfo = (outlook)=>{
        switch(outlook.toLowerCase()){
            case "positive":
                return {icon:TrendingUp,color:"text-green-500"};
            case "neutral":
                return {icon:LineChart,color:"text-yellow-500"}
            case "negative":
                return {icon:TrendingDown,color:"text-red-500"}; 
            default:
                return {icon:LineChart,color:"text-gray-500"};
        }
    }
    const { icon: OutlookIcon, color: OutlookColor } = getMarketOutlookInfo(insights.marketOutlook);
    const lastUpdated = format(new Date(insights.lastUpdated),"dd/MM/yyyy");
    const nextUpdate = formatDistanceToNow(
        new Date(insights.nextUpdate),

    )
    return(
        <div className="space-y-6">
   {/* Last updated */}
<div className="flex items-center justify-between">
  <Badge
    variant="outline"
    className="bg-zinc-900/60 border-zinc-800 text-zinc-300 backdrop-blur-sm"
  >
    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400/80 shadow-[0_0_8px_2px_rgba(52,211,153,0.35)]" />
    Last updated: {lastUpdated}
  </Badge>
</div>

{/* KPI cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
  {/* Market Outlook */}
  <Card className="bg-[#0b0b0f] border border-zinc-800 hover:border-zinc-700 transition-colors shadow-lg shadow-purple-500/5">
    <CardHeader className="flex flex-row items-center justify-between gap-x-2 pb-2">
      <CardTitle className="text-sm font-medium text-zinc-200">Market Outlook</CardTitle>
      <span className="rounded-md p-1.5 bg-zinc-900/70 border border-zinc-800">
        <OutlookIcon className={`h-5 w-5 ${OutlookColor}`} />
      </span>
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold tracking-tight ${OutlookColor}`}>
        {insights.marketOutlook}
      </div>
      <p className="text-xs text-zinc-400 mt-1">Next update {nextUpdate}</p>
    </CardContent>
  </Card>

  {/* Industry Growth */}
  <Card className="bg-[#0b0b0f] border border-zinc-800 hover:border-zinc-700 transition-colors shadow-lg shadow-purple-500/5">
    <CardHeader className="flex flex-row items-center justify-between gap-x-2 pb-2">
      <CardTitle className="text-sm font-medium text-zinc-200">Industry Growth</CardTitle>
      <span className="rounded-md p-1.5 bg-zinc-900/70 border border-zinc-800">
        <TrendingUp className="h-5 w-5 text-indigo-400" />
      </span>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-zinc-100">
        {insights.growthRate.toFixed(1)}%
      </div>
    </CardContent>
  </Card>

  {/* Demand Level */}
  <Card className="bg-[#0b0b0f] border border-zinc-800 hover:border-zinc-700 transition-colors shadow-lg shadow-purple-500/5">
    <CardHeader className="flex flex-row items-center justify-between gap-x-2 pb-2">
      <CardTitle className="text-sm font-medium text-zinc-200">Demand Level</CardTitle>
      <span className="rounded-md p-1.5 bg-zinc-900/70 border border-zinc-800">
        <Briefcase className="h-5 w-5 text-cyan-400" />
      </span>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-zinc-100">{insights.demandLevel}</div>

      {/* Gradient progress bar based on demand */}
      {(() => {
        const map: Record<string, number> = { Low: 33, Medium: 66, High: 100 };
        const pct = map[insights.demandLevel] ?? 50;
        return (
          <div className="mt-3 h-2 w-full rounded-full bg-zinc-800/80 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500 shadow-[0_0_10px_rgba(168,85,247,0.35)]"
              style={{ width: `${pct}%` }}
            />
          </div>
        );
      })()}
    </CardContent>
  </Card>

  {/* Top Skills */}
  <Card className="bg-[#0b0b0f] border border-zinc-800 hover:border-zinc-700 transition-colors shadow-lg shadow-purple-500/5">
    <CardHeader className="flex flex-row items-center justify-between gap-x-2 pb-2">
      <CardTitle className="text-sm font-medium text-zinc-200">Top Skills</CardTitle>
      <span className="rounded-md p-1.5 bg-zinc-900/70 border border-zinc-800">
        <Brain className="h-5 w-5 text-pink-400" />
      </span>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-1.5">
        {insights.topSkills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="bg-zinc-900/70 border border-zinc-800 text-zinc-200 hover:bg-zinc-900"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
</div>


            {/* Bar Graph */}
            <Card className="bg-[#0b0b0f] border border-zinc-800 shadow-lg shadow-purple-500/5">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Salary Ranges by Role
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Displaying minimum, median, and maximum salaries (LPA)
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salaryData}
              margin={{ top: 30, right: 20, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="minGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} /> {/* blue */}
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                </linearGradient>

                <linearGradient id="medianGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9} /> {/* purple */}
                  <stop offset="100%" stopColor="#c084fc" stopOpacity={0.8} />
                </linearGradient>

                <linearGradient id="maxGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.9} /> {/* pink */}
                  <stop offset="100%" stopColor="#f472b6" stopOpacity={0.8} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f22" />

              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `${v}L`}
                axisLine={false}
                tickLine={false}
              />


              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                contentStyle={{
                  backgroundColor: "rgba(20,20,24,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  boxShadow: "0 0 12px rgba(168,85,247,0.2)",
                  color: "#f3f4f6",
                }}
                labelStyle={{ color: "#a855f7", fontWeight: 600 }}
                itemStyle={{ color: "#f3f4f6", fontSize: 13 }}
                formatter={(value, name) => [`${value} LPA`, name]}
              />

              <Legend
                wrapperStyle={{
                  color: "#d1d5db",
                  fontSize: "13px",
                  paddingTop: "10px",
                }}
              />

              <Bar
                dataKey="min"
                name="Min Salary"
                fill="url(#minGradient)"
                radius={[8, 8, 0, 0]}
                barSize={20}
                activeBar={<Rectangle stroke="#3b82f6" strokeWidth={1.5} />}
              />
              <Bar
                dataKey="median"
                name="Median Salary"
                fill="url(#medianGradient)"
                radius={[8, 8, 0, 0]}
                barSize={20}
                activeBar={<Rectangle stroke="#a855f7" strokeWidth={1.5} />}
              />
              <Bar
                dataKey="max"
                name="Max Salary"
                fill="url(#maxGradient)"
                radius={[8, 8, 0, 0]}
                barSize={20}
                activeBar={<Rectangle stroke="#ec4899" strokeWidth={1.5} />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

{/* Career-Shaping Industry Trends */}
<Card className="bg-gradient-to-b from-[#07070a] via-[#0b0b0f] to-[#060608] border border-zinc-800/60 shadow-2xl shadow-purple-600/5 rounded-2xl overflow-hidden">
  <CardHeader className="px-6 py-4">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-purple-700/20 to-indigo-700/10 ring-1 ring-purple-700/10">
          <TrendingUp className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <CardTitle className="text-base font-semibold text-white leading-tight">
            Career-Shaping Industry Trends
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400 mt-1">
            Key shifts in your industry that are redefining roles, demand, and growth paths.
          </CardDescription>
        </div>
      </div>
    </div>
  </CardHeader>

  <CardContent className="px-6 pb-6 pt-2">
    <ul className="space-y-3">
      {insights.keyTrends && insights.keyTrends.length ? (
        insights.keyTrends.map((trend, index) => (
          <li
            key={index}
            className="flex items-start gap-3 rounded-xl p-3 hover:bg-zinc-900/40 transition-colors duration-150"
          >
            <div className="flex-shrink-0 mt-1">
              <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 ring-1 ring-white/5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-white font-medium truncate">
                {typeof trend === "string" ? trend : trend.title}
              </p>
              {trend && typeof trend === "object" && trend.description ? (
                <p className="text-xs text-zinc-400 mt-0.5">
                  {trend.description}
                </p>
              ) : null}
            </div>

            {trend && trend.impact ? (
              <div className="ml-auto hidden md:flex items-center">
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                  {trend.impact}
                </span>
              </div>
            ) : null}
          </li>
        ))
      ) : (
        <li className="text-sm text-zinc-400">
          No trends available yet.
        </li>
      )}
    </ul>
  </CardContent>
</Card>

{/* Recommended Skills */}
<Card className="bg-gradient-to-b from-[#07070a] via-[#0b0b0f] to-[#060608] border border-zinc-800/60 shadow-2xl shadow-purple-600/5 rounded-2xl overflow-hidden">
  <CardHeader className="px-6 py-4">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-purple-700/20 to-indigo-700/10 ring-1 ring-purple-700/10">
          {/* you can use a different icon if you want, e.g. Sparkles / Lightbulb */}
          <TrendingUp className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <CardTitle className="text-base font-semibold text-white leading-tight">
            Recommended Skills to Develop
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400 mt-1">
            High-priority skills aligned with current industry trends and your target roles.
          </CardDescription>
        </div>
      </div>
    </div>
  </CardHeader>

  <CardContent className="px-6 pb-6 pt-2">
    <ul className="space-y-3">
      {insights.recommendedSkills && insights.recommendedSkills.length ? (
        insights.recommendedSkills.map((skill, index) => (
          <li
            key={index}
            className="flex items-start gap-3 rounded-xl p-3 hover:bg-zinc-900/40 transition-colors duration-150"
          >
            <div className="flex-shrink-0 mt-1">
              <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 ring-1 ring-white/5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-white font-medium truncate">
                {typeof skill === "string" ? skill : skill.title}
              </p>
              {skill && typeof skill === "object" && skill.description ? (
                <p className="text-xs text-zinc-400 mt-0.5">
                  {skill.description}
                </p>
              ) : null}
            </div>

            {skill && (skill.priority || skill.impact) ? (
              <div className="ml-auto hidden md:flex items-center">
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                  {skill.priority || skill.impact}
                </span>
              </div>
            ) : null}
          </li>
        ))
      ) : (
        <li className="text-sm text-zinc-400">
          No recommended skills available yet.
        </li>
      )}
    </ul>
  </CardContent>
</Card>

</div>


        </div>
    )
}